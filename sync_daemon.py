#!/usr/bin/env python3
"""
CCAFP Daily - 15-Minute Automated Google Sheets Synchronization Daemon
========================================================================
Continuously monitors the Cadet Information Sheets 2026-2027 Google Spreadsheet
every 15 minutes. Automatically detects any changes, parses the updated records,
and writes live snapshots to `data/live_data.json` so the portal remains perpetually
synchronized without manual daily intervention.

Usage:
    python3 sync_daemon.py              # Runs continuously every 15 minutes (900s)
    python3 sync_daemon.py --once       # Performs a single sync check and exits
    python3 sync_daemon.py --interval 60 # Polling interval in seconds
"""

import sys
import os
import time
import json
import hashlib
import urllib.request
import urllib.error
import csv
import io
from datetime import datetime

# Google Sheets Live GVIZ CSV Endpoints
BASE_DOC_ID = "1D2Mawvphp9UsY9NC8boG46FlksDkjXzLEf5c8afm-xI"
ENDPOINTS = {
    "schedule": f"https://docs.google.com/spreadsheets/d/{BASE_DOC_ID}/gviz/tq?tqx=out:csv&sheet=SCHEDULE%20OF%20CALLS",
    "disposition": f"https://docs.google.com/spreadsheets/d/{BASE_DOC_ID}/gviz/tq?tqx=out:csv&sheet=DISPOSITION",
    "armory": f"https://docs.google.com/spreadsheets/d/{BASE_DOC_ID}/gviz/tq?tqx=out:csv&sheet=ARMORY",
    "attachment": f"https://docs.google.com/spreadsheets/d/{BASE_DOC_ID}/gviz/tq?tqx=out:csv&sheet=ATTACHMENT",
    "regiment_staff": f"https://docs.google.com/spreadsheets/d/{BASE_DOC_ID}/gviz/tq?tqx=out:csv&sheet=REGIMENTAL%20STAFF%202027"
}

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(SCRIPT_DIR, "data")
CHECKSUMS_FILE = os.path.join(DATA_DIR, "checksums.json")
LIVE_DATA_FILE = os.path.join(DATA_DIR, "live_data.json")
LAST_SYNC_FILE = os.path.join(DATA_DIR, "last_sync.json")

def log(msg):
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{now}] [15m Sync Daemon] {msg}", flush=True)

import ssl

def fetch_csv(url):
    """Fetches CSV data from Google Sheets with cache-busting headers and query param."""
    cache_bust_url = f"{url}&_t={int(time.time() * 1000)}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache"
    }
    req = urllib.request.Request(cache_bust_url, headers=headers)
    try:
        ctx = ssl._create_unverified_context()
    except (AttributeError, Exception):
        ctx = None

    try:
        kwargs = {"timeout": 15}
        if ctx is not None:
            kwargs["context"] = ctx
        with urllib.request.urlopen(req, **kwargs) as resp:
            content = resp.read().decode("utf-8", errors="replace")
            return content
    except Exception as e:
        log(f"⚠️ Error fetching {url}: {e}")
        return None

def parse_csv_rows(csv_text):
    """Parses raw CSV string into list of rows."""
    reader = csv.reader(io.StringIO(csv_text))
    return [row for row in reader]

def md5_hash(text):
    return hashlib.md5(text.encode("utf-8")).hexdigest()

def load_checksums():
    if os.path.exists(CHECKSUMS_FILE):
        try:
            with open(CHECKSUMS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {}
    return {}

def save_checksums(checksums):
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(CHECKSUMS_FILE, "w", encoding="utf-8") as f:
        json.dump(checksums, f, indent=2)

def run_sync_cycle():
    """Checks all sheets, detects changes compared to last check, and writes live snapshots."""
    os.makedirs(DATA_DIR, exist_ok=True)
    previous_checksums = load_checksums()
    current_checksums = {}
    changed_sheets = []
    parsed_data = {}

    log("Initiating check on Google Sheets endpoints...")

    for key, url in ENDPOINTS.items():
        csv_text = fetch_csv(url)
        if csv_text is None:
            continue

        current_hash = md5_hash(csv_text)
        current_checksums[key] = current_hash
        rows = parse_csv_rows(csv_text)
        parsed_data[key] = {
            "rowCount": len(rows),
            "rows": rows
        }

        prev_hash = previous_checksums.get(key)
        if prev_hash != current_hash:
            changed_sheets.append(key)

    is_initial_run = len(previous_checksums) == 0

    if changed_sheets or is_initial_run:
        if is_initial_run:
            log("⚡ Initial synchronization completed for all sheets.")
        else:
            log(f"⚡ Changes detected in sheets: {', '.join(changed_sheets)}")

        # Save live snapshot
        snapshot = {
            "timestamp": datetime.now().isoformat(),
            "epoch": int(time.time()),
            "changedSheets": changed_sheets if not is_initial_run else list(ENDPOINTS.keys()),
            "sheets": parsed_data
        }

        with open(LIVE_DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(snapshot, f, indent=2)

        save_checksums(current_checksums)

        with open(LAST_SYNC_FILE, "w", encoding="utf-8") as f:
            json.dump({
                "lastSyncTime": datetime.now().isoformat(),
                "status": "updated" if not is_initial_run else "initialized",
                "changedSheets": changed_sheets
            }, f, indent=2)

        log(f"✓ Successfully wrote updated data to {LIVE_DATA_FILE}")
        return True
    else:
        log("✓ Google Sheets verified: No changes detected in the past 15 minutes.")
        with open(LAST_SYNC_FILE, "w", encoding="utf-8") as f:
            json.dump({
                "lastSyncTime": datetime.now().isoformat(),
                "status": "verified_up_to_date",
                "changedSheets": []
            }, f, indent=2)
        return False

def main():
    poll_interval = 15 * 60 # 900 seconds (15 minutes)
    run_once = False

    args = sys.argv[1:]
    if "--once" in args:
        run_once = True
    if "--interval" in args:
        try:
            idx = args.index("--interval")
            poll_interval = int(args[idx + 1])
        except (ValueError, IndexError):
            print("Invalid --interval argument, defaulting to 900 seconds.")

    log(f"CCAFP Daily 15-Minute Sync Daemon started (Interval: {poll_interval}s / 15m)")
    log(f"Tracking Google Sheet ID: {BASE_DOC_ID}")

    if run_once:
        run_sync_cycle()
        log("Run-once completed. Exiting.")
        return

    while True:
        try:
            run_sync_cycle()
        except Exception as e:
            log(f"Unexpected error during sync cycle: {e}")

        log(f"Next automated check in {poll_interval // 60} minutes ({poll_interval} seconds)...")
        time.sleep(poll_interval)

if __name__ == "__main__":
    main()
