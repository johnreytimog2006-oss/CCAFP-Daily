#!/usr/bin/env python3
"""
🎖️ CCAFP Daily - Centralized Multi-Device HTTP & REST API Server
==================================================================
Provides a single, unified database across all devices (Macs, phones,
tablets, PCs) connecting to the CCAFP Portal on the local network or web.

All user accounts, roles, suspensions, and disciplinary appeals are stored
in a single centralized database file: `data/ccafp_accounts.json`.

Usage:
    python3 server.py              # Starts on default port 8080
    python3 server.py --port 8000   # Starts on port 8000
"""

import sys
import os
import json
import time
import socket
import secrets
import hashlib
import threading
from datetime import datetime, timedelta
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
DB_FILE = os.path.join(DATA_DIR, "ccafp_accounts.json")
DB_LOCK = threading.Lock()

# Ensure data directory exists
os.makedirs(DATA_DIR, exist_ok=True)

def load_db():
    with DB_LOCK:
        if not os.path.exists(DB_FILE):
            initial = {
                "version": "3.0",
                "updatedAt": datetime.utcnow().isoformat() + "Z",
                "accounts": [],
                "roles": [],
                "appeals": []
            }
            with open(DB_FILE, "w", encoding="utf-8") as f:
                json.dump(initial, f, indent=2)
            return initial
        try:
            with open(DB_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {"version": "3.0", "updatedAt": datetime.utcnow().isoformat() + "Z", "accounts": [], "roles": [], "appeals": []}

def save_db(data):
    with DB_LOCK:
        data["updatedAt"] = datetime.utcnow().isoformat() + "Z"
        tmp_file = DB_FILE + ".tmp"
        with open(tmp_file, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        os.replace(tmp_file, DB_FILE)

def hash_password(password, salt_hex):
    salt = bytes.fromhex(salt_hex)
    key = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 50000)
    return key.hex()

def get_lan_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("10.255.255.255", 1))
        ip = s.getsockname()[0]
    except Exception:
        ip = "127.0.0.1"
    finally:
        s.close()
    return ip

class CentralAuthHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")

    def send_json(self, status_code, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_cors_headers()
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_cors_headers()
        self.end_headers()

    def do_GET(self):
        if self.path.startswith("/api/auth/state"):
            db = load_db()
            accounts = db.get("accounts", [])
            has_mother = any(bool(a.get("isMother")) for a in accounts)

            # Sanitize accounts for roster display (omit raw hash & salt)
            sanitized = []
            now = datetime.utcnow()
            accounts_updated = False

            for a in accounts:
                # Auto-check expired suspension
                if a.get("status") == "suspended" and a.get("suspendedUntil") and a.get("suspendedUntil") != "permanent":
                    try:
                        exp_str = a["suspendedUntil"].replace("Z", "")
                        exp_dt = datetime.fromisoformat(exp_str)
                        if now >= exp_dt:
                            a["status"] = "active"
                            a["suspendedUntil"] = None
                            a["suspendedReason"] = None
                            accounts_updated = True
                    except Exception:
                        pass

                sanitized.append({
                    "username": a.get("username"),
                    "isMother": bool(a.get("isMother")),
                    "role": a.get("role", "viewer"),
                    "roles": a.get("roles", [a.get("role", "viewer")]),
                    "status": a.get("status", "active"),
                    "suspendedUntil": a.get("suspendedUntil"),
                    "suspendedReason": a.get("suspendedReason"),
                    "createdAt": a.get("createdAt", now.isoformat() + "Z")
                })

            if accounts_updated:
                save_db(db)

            return self.send_json(200, {
                "success": True,
                "serverMode": True,
                "databasePath": DB_FILE,
                "hasPrimaryAdmin": has_mother,
                "accounts": sanitized,
                "roles": db.get("roles", []),
                "appeals": db.get("appeals", []),
                "updatedAt": db.get("updatedAt")
            })

        # Static assets
        return super().do_GET()

    def read_json_body(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
            if length == 0:
                return {}
            raw = self.rfile.read(length).decode("utf-8")
            return json.loads(raw)
        except Exception:
            return None

    def do_POST(self):
        body = self.read_json_body()
        if body is None:
            return self.send_json(400, {"success": False, "error": "Invalid JSON body"})

        path = self.path.split("?")[0]

        # ---------------- REGISTER ----------------
        if path == "/api/auth/register":
            username = str(body.get("username", "")).strip()
            password = str(body.get("password", ""))
            admin_code = str(body.get("adminCode", "")).strip()

            if not username.isdigit():
                return self.send_json(400, {"success": False, "error": "Username must be strictly numeric (digits 0-9 only)."})
            if len(password) < 3:
                return self.send_json(400, {"success": False, "error": "Password must be at least 3 characters long."})

            db = load_db()
            accounts = db.setdefault("accounts", [])

            if any(a.get("username") == username for a in accounts):
                return self.send_json(400, {"success": False, "error": f"Username {username} is already registered."})

            has_primary_admin = any(bool(a.get("isMother")) for a in accounts)
            is_mother = False
            assigned_role = "viewer"
            assigned_roles = ["viewer"]

            # One-time Primary Admin code authorization
            if not has_primary_admin:
                if admin_code == "Regimental6_CEIS":
                    is_mother = True
                    assigned_role = "admin"
                    assigned_roles = ["admin"]

            salt_hex = secrets.token_hex(16)
            pwd_hash = hash_password(password, salt_hex)

            new_account = {
                "username": username,
                "salt": salt_hex,
                "hash": pwd_hash,
                "isMother": is_mother,
                "role": assigned_role,
                "roles": assigned_roles,
                "status": "active",
                "suspendedUntil": None,
                "suspendedReason": None,
                "createdAt": datetime.utcnow().isoformat() + "Z"
            }

            accounts.append(new_account)
            save_db(db)

            return self.send_json(200, {
                "success": True,
                "isMother": is_mother,
                "account": {
                    "username": username,
                    "isMother": is_mother,
                    "role": assigned_role,
                    "roles": assigned_roles,
                    "status": "active"
                }
            })

        # ---------------- LOGIN ----------------
        elif path == "/api/auth/login":
            username = str(body.get("username", "")).strip()
            password = str(body.get("password", ""))

            if not username.isdigit():
                return self.send_json(400, {"success": False, "error": "Username must be strictly numeric."})

            db = load_db()
            accounts = db.get("accounts", [])
            target = next((a for a in accounts if a.get("username") == username), None)

            if not target:
                return self.send_json(401, {"success": False, "error": "Invalid numeric username or password."})

            expected_hash = hash_password(password, target["salt"])
            if expected_hash != target["hash"]:
                return self.send_json(401, {"success": False, "error": "Invalid numeric username or password."})

            # Check suspension
            if target.get("status") == "suspended":
                until = target.get("suspendedUntil")
                if until and until != "permanent":
                    try:
                        exp_dt = datetime.fromisoformat(until.replace("Z", ""))
                        if datetime.utcnow() >= exp_dt:
                            target["status"] = "active"
                            target["suspendedUntil"] = None
                            target["suspendedReason"] = None
                            save_db(db)
                        else:
                            return self.send_json(403, {
                                "success": False,
                                "isSuspended": True,
                                "error": "Account suspended under disciplinary hold.",
                                "account": {
                                    "username": target["username"],
                                    "suspendedUntil": target.get("suspendedUntil"),
                                    "suspendedReason": target.get("suspendedReason")
                                }
                            })
                    except Exception:
                        return self.send_json(403, {
                            "success": False,
                            "isSuspended": True,
                            "error": "Account suspended under disciplinary hold.",
                            "account": {
                                "username": target["username"],
                                "suspendedUntil": target.get("suspendedUntil"),
                                "suspendedReason": target.get("suspendedReason")
                            }
                        })
                else:
                    return self.send_json(403, {
                        "success": False,
                        "isSuspended": True,
                        "error": "Account suspended indefinitely.",
                        "account": {
                            "username": target["username"],
                            "suspendedUntil": "permanent",
                            "suspendedReason": target.get("suspendedReason")
                        }
                    })

            return self.send_json(200, {
                "success": True,
                "account": {
                    "username": target["username"],
                    "isMother": bool(target.get("isMother")),
                    "role": target.get("role", "viewer"),
                    "roles": target.get("roles", [target.get("role", "viewer")]),
                    "status": target.get("status", "active")
                },
                "token": secrets.token_hex(16)
            })

        # ---------------- MULTI-ROLE ASSIGNMENT ----------------
        elif path == "/api/auth/roles/assign":
            username = str(body.get("username", "")).strip()
            roles = body.get("roles", [])
            if not isinstance(roles, list) or len(roles) == 0:
                roles = ["viewer"]

            db = load_db()
            accounts = db.get("accounts", [])
            target = next((a for a in accounts if a.get("username") == username), None)
            if not target:
                return self.send_json(404, {"success": False, "error": f"Cadet {username} not found."})

            target["roles"] = roles
            target["role"] = roles[0]
            save_db(db)
            return self.send_json(200, {"success": True, "account": target})

        # ---------------- CREATE CUSTOM ROLE ----------------
        elif path == "/api/auth/roles/create":
            role_obj = body.get("role", {})
            role_id = role_obj.get("id")
            if not role_id:
                return self.send_json(400, {"success": False, "error": "Role ID required."})

            db = load_db()
            roles_list = db.setdefault("roles", [])
            if any(r.get("id") == role_id for r in roles_list):
                return self.send_json(400, {"success": False, "error": "Role with this ID already exists."})

            roles_list.append(role_obj)
            save_db(db)
            return self.send_json(200, {"success": True, "roles": roles_list})

        # ---------------- SAVE ROLE PERMISSIONS ----------------
        elif path == "/api/auth/roles/permissions":
            role_id = body.get("roleId")
            permissions = body.get("permissions", [])
            db = load_db()
            roles_list = db.get("roles", [])
            target_role = next((r for r in roles_list if r.get("id") == role_id), None)
            if not target_role:
                target_role = {"id": role_id, "permissions": permissions}
                roles_list.append(target_role)
            else:
                target_role["permissions"] = permissions
            save_db(db)
            return self.send_json(200, {"success": True})

        # ---------------- SUSPEND CADET ACCOUNT ----------------
        elif path == "/api/auth/suspend":
            username = str(body.get("username", "")).strip()
            duration = body.get("duration", "24h")
            reason = body.get("reason", "Disciplinary hold")

            now = datetime.utcnow()
            if duration == "24h":
                suspended_until = (now + timedelta(hours=24)).isoformat() + "Z"
            elif duration == "7d":
                suspended_until = (now + timedelta(days=7)).isoformat() + "Z"
            elif duration == "30d":
                suspended_until = (now + timedelta(days=30)).isoformat() + "Z"
            elif duration == "permanent":
                suspended_until = "permanent"
            else:
                suspended_until = (now + timedelta(hours=24)).isoformat() + "Z"

            db = load_db()
            accounts = db.get("accounts", [])
            target = next((a for a in accounts if a.get("username") == username), None)
            if not target:
                return self.send_json(404, {"success": False, "error": f"Cadet {username} not found."})

            target["status"] = "suspended"
            target["suspendedUntil"] = suspended_until
            target["suspendedReason"] = reason
            save_db(db)
            return self.send_json(200, {"success": True, "suspendedUntil": suspended_until})

        # ---------------- UNSUSPEND CADET ACCOUNT ----------------
        elif path == "/api/auth/unsuspend":
            username = str(body.get("username", "")).strip()
            db = load_db()
            accounts = db.get("accounts", [])
            target = next((a for a in accounts if a.get("username") == username), None)
            if not target:
                return self.send_json(404, {"success": False, "error": f"Cadet {username} not found."})

            target["status"] = "active"
            target["suspendedUntil"] = None
            target["suspendedReason"] = None

            # Mark pending appeals as approved
            for app in db.get("appeals", []):
                if app.get("username") == username and app.get("status") == "pending":
                    app["status"] = "approved"

            save_db(db)
            return self.send_json(200, {"success": True})

        # ---------------- SUBMIT APPEAL ----------------
        elif path == "/api/auth/appeals/submit":
            username = str(body.get("username", "")).strip()
            statement = str(body.get("statement", "")).strip()

            db = load_db()
            accounts = db.get("accounts", [])
            target = next((a for a in accounts if a.get("username") == username), None)

            appeal = {
                "id": "APP-" + str(int(time.time() * 1000)),
                "username": username,
                "reason": target.get("suspendedReason", "Disciplinary infraction") if target else "General hold",
                "statement": statement,
                "submittedAt": datetime.utcnow().isoformat() + "Z",
                "status": "pending"
            }

            db.setdefault("appeals", []).append(appeal)
            save_db(db)
            return self.send_json(200, {"success": True, "appeal": appeal})

        # ---------------- ADJUDICATE APPEAL ----------------
        elif path == "/api/auth/appeals/adjudicate":
            appeal_id = body.get("appealId")
            action = body.get("action")  # "approve" | "reject"

            db = load_db()
            appeals = db.get("appeals", [])
            target_app = next((a for a in appeals if a.get("id") == appeal_id), None)
            if not target_app:
                return self.send_json(404, {"success": False, "error": "Appeal not found."})

            target_app["status"] = "approved" if action == "approve" else "rejected"

            if action == "approve":
                target_user = next((a for a in db.get("accounts", []) if a.get("username") == target_app["username"]), None)
                if target_user:
                    target_user["status"] = "active"
                    target_user["suspendedUntil"] = None
                    target_user["suspendedReason"] = None

            save_db(db)
            return self.send_json(200, {"success": True, "status": target_app["status"]})

        # ---------------- RESET DATABASE ACROSS ALL DEVICES ----------------
        elif path == "/api/auth/reset":
            db = {
                "version": "3.0",
                "resetAt": datetime.utcnow().isoformat() + "Z",
                "updatedAt": datetime.utcnow().isoformat() + "Z",
                "accounts": [],
                "roles": [],
                "appeals": []
            }
            save_db(db)
            return self.send_json(200, {
                "success": True,
                "message": "All accounts across all devices have been completely reset."
            })

        return self.send_json(404, {"success": False, "error": "Endpoint not found"})

def run_server(port=8080):
    lan_ip = get_lan_ip()
    server_address = ("", port)
    httpd = ThreadingHTTPServer(server_address, CentralAuthHandler)

    print("=" * 66, flush=True)
    print("🎖️  CCAFP DAILY - CENTRALIZED MULTI-DEVICE SERVER", flush=True)
    print("=" * 66, flush=True)
    print(f"📡 Central Database File: {DB_FILE}", flush=True)
    print(f"💻 Local (Mac) URL:       http://localhost:{port}", flush=True)
    print(f"📱 Network (Phones/All):  http://{lan_ip}:{port}", flush=True)
    print("=" * 66, flush=True)
    print("ℹ️  Any device on your WiFi or network accessing the Network URL", flush=True)
    print("   will share the EXACT same single central accounts database!", flush=True)
    print("=" * 66, flush=True)

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[Server] Shutting down gracefully...")
        httpd.shutdown()

if __name__ == "__main__":
    port = 8080
    if len(sys.argv) > 1 and sys.argv[1] == "--port" and len(sys.argv) > 2:
        port = int(sys.argv[2])
    run_server(port)
