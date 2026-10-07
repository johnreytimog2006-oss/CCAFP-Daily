# 🎖️ CCAFP Daily &mdash; Cadet Corps Armed Forces of the Philippines Operations Portal

**CCAFP Daily** is the official central web portal and live digital bulletin board for the **Cadet Corps Armed Forces of the Philippines (CCAFP)** at Fort Del Pilar, Baguio City. Inspired by company portals such as `alfacoy.com`, it serves the entire cadet brigade with live synchronized council displays, daily routine orders, punishment registers, event schedules, and leadership directories.

---

## 🛡️ Core Highlights & Architectural Features

### 1. 🔄 Live Google Sheets Integration
- Each council maintains its own Google Spreadsheet.
- When an authorized cadet council officer updates their Google Sheet, changes reflect **live on the website** via automatic background polling every 45 seconds or by clicking the **"SYNC SHEETS"** button.
- **How to connect any Council Sheet:**
  1. Open your Google Sheet.
  2. Click **File &rarr; Share &rarr; Publish to web**.
  3. Under *Link*, select **Comma-separated values (.csv)**.
  4. Copy that URL and paste it into the **"SHEET LINKS"** modal on the website.

### 2. 🔒 Sensitive Councils Policy Protection
In accordance with Cadet Regulations, the work of sensitive councils is restricted from public roster disclosure:
- **S2 (Intelligence)**: Displays Operational Security (OPSEC), Social Media directives, and Camp security reminders only.
- **GAD (Gender Awareness and Development)**: Displays Equality mandates, Respectful Conduct guidelines, and anti-bias principles only.
- **CCPB (Cadet Conduct Policy Board)**: Displays Due Process rules, Explanation windows, and Disciplinary standards only.
- **Honor Council**: Displays the sacred tenets of the Cadet Honor Code (*"We, the cadets, do not lie, cheat, steal, nor tolerate among us those who do"*) and moral integrity reminders only.

### 3. 📂 Directory of All 18 Cadet Councils
1. **S1 - Personnel**: Strength accountability, leaves, passes, hospital status.
2. **S2 - Intelligence**: *(Sensitive)* OPSEC & camp security directives.
3. **S3 - Operations**: Daily routine, tactical training syllabi, parade rehearsals.
4. **S4 - Logistics**: Uniform tailor schedules, saber care, armory requisitions.
5. **S5 - Plans and Programs**: Long-term calendar, Corps milestone tracking.
6. **S6 - CEIS**: Communications, PA system status, smart rack policies.
7. **S7 - CMO**: Civil-Military outreach, community relations, delegations.
8. **S8 - Education & Training**: Tactics curricula, academic review sessions.
9. **S10 - Finance**: Cadet welfare funds, mess rebates, transparent balances.
10. **Athletic Council**: PT standards, intramural sports, obstacle course.
11. **Academic Council**: Dean's list review, study hall hours, peer tutoring.
12. **MTO Council**: Military transport convoy buses, dispatch manifests.
13. **EXO Council**: Inter-company coordination, barracks inspection standards.
14. **Mess Council**: Daily breakfast, lunch, and supper menus & nutrition.
15. **Spiritual Development Council**: Catholic Mass, Protestant, Islamic prayers.
16. **Safety Council**: Wet Bulb Globe Temperature (WBGT) heat flags, clinic hotlines.
17. **GAD Council**: *(Sensitive)* Gender equality & anti-harassment directives.
18. **CCPB**: *(Sensitive)* Conduct policy, demerit reporting standards.
19. **Honor Council**: *(Sensitive)* Sacred Cadet Honor Code & non-toleration doctrine.

### 4. 🎨 PMA Theme Engine (Switchable Themes)
- 🎖️ **PMA Crimson & Gold** (Traditional Scarlet, Brass Gold & Cadet Navy)
- ⚔️ **PMA Dress White** (Crisp White with Gold & Red Trimmings)
- 🌲 **Tactical Field Green** (Army Olive Drab & Gold)
- 🌑 **Night Ops Stealth** (Deep Charcoal with Gold Typography)
- 🌊 **PMA Fleet Navy** (Navy Blue & Polished Brass)

### 5. 📋 Extra Key Modules
- **Officers of the Day (OD / OC / AOC / SOC)**: Live duty assignments, quarters, and direct station extensions.
- **Event Calendar**: Full master calendar filtered by Ceremonies, Academics, Athletics, and Spiritual activities.
- **CCAFP Punishment List**: Searchable and filterable registry of demerits, tours of duty, and confinement hours by cadet name and company.
- **Cadet Chains of Command**:
  - Regimental Staff (Brigade level)
  - Battalion Staffs (1st, 2nd, 3rd Battalions)
  - Respective Company Staffs (Alpha Coy through Hawk Coy)

---

## 🖥️ Instant Local Preview

On your Mac, test and view the portal immediately in your default browser:

```bash
open /Users/macbookairm315/.gemini/antigravity/scratch/ccafp-daily/index.html
```

---

## 🐙 Step-by-Step: Push to GitHub

### 1. Initialize Local Git Repository
```bash
cd /Users/macbookairm315/.gemini/antigravity/scratch/ccafp-daily
git init
git add .
git commit -m "feat: initial release of CCAFP Daily portal"
git branch -M main
```

### 2. Create Repository on GitHub
1. Visit [github.com/new](https://github.com/new).
2. Set repository name to `ccafp-daily`.
3. Choose **Public** or **Private**.
4. Leave *"Initialize with README"* unchecked.
5. Click **Create repository**.

### 3. Link Remote & Push
```bash
git remote add origin https://github.com/YOUR_USERNAME/ccafp-daily.git
git push -u origin main
```

---

## ▲ Step-by-Step: Deploy to Vercel

1. Log into [vercel.com](https://vercel.com) using your **GitHub account**.
2. Click **Add New...** &rarr; **Project** (or go to [vercel.com/new](https://vercel.com/new)).
3. Find `ccafp-daily` and click **Import**.
4. In the configuration dialog, leave Framework Preset as *Other* and Root Directory as `./`.
5. Click **Deploy**.
6. Within ~20 seconds, your site is live globally on `https://ccafp-daily.vercel.app` (or your chosen URL)!

---

## ⚡ 15-Minute Automated Google Sheets Synchronization

The portal includes a **100% automated synchronization engine** that eliminates manual daily updates:

1. **In-Browser Automated Polling**:
   - The top navigation bar features a live countdown timer (`AUTO-SYNC (15m): 15:00`).
   - Every 15 minutes, the web client silently queries Google Sheets in parallel for any updates made in the past 15 minutes.
   - If updates occurred (e.g. Schedule of Calls revised, FAD count adjusted, Duty Officers replaced), the portal immediately re-renders all views, updates the moving announcement marquee, saves a snapshot to `localStorage`, and displays a toast notification.
   - Clicking **SYNC NOW** triggers an immediate sync and resets the 15-minute countdown.

2. **Headless Background Daemon (`sync_daemon.py`)**:
   - A standalone Python service is included in the project root to run in the background on your Mac/server:
   ```bash
   python3 sync_daemon.py
   ```
   - Checks the spreadsheet every 15 minutes, computes MD5 hashes, and writes structured updates to `data/live_data.json`.
   - To run a one-time check: `python3 sync_daemon.py --once`.
