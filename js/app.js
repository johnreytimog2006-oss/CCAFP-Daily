// CCAFP Daily - Alfacoy Portal Logic, S1 Sub-Sections & Live Sheets Engine

(function () {
  'use strict';

  // Live Sheet Sync Manager (Reading from COUNCIL_SHEET_URLS in data.js)
  const SyncClass = typeof SheetSyncManager !== 'undefined' ? SheetSyncManager : (typeof window !== 'undefined' ? window.SheetSyncManager : null);
  const syncManager = SyncClass ? new SyncClass() : { getLink: () => '', fetchLiveCSV: async () => null, parseScheduleOfCalls: () => null };
  const CCAFP_CONFIG = (typeof window !== 'undefined' && window.CCAFP_CONFIG) ? window.CCAFP_CONFIG : (typeof window !== 'undefined' ? window.CCAFP_CONFIG : {});

  // Application State
  const state = {
    currentTab: 'home',
    s1ActiveSubTab: 'disposition',
    s1AttachmentCat: 'all',
    s1AttachmentQuery: '',
    s1StaffCat: 'all',
    s1StaffQuery: '',
    socGuardQuery: '',
    socCallsQuery: '',
    activeCouncilId: 's1',
    liveCache: {},
    staffLevel: 'regiment',
    punishmentQuery: '',
    isSyncing: false,
    hasCompletedInitialSync: false
  };

  // DOM Cache
  const dom = {
    mainSidebar: document.getElementById('mainSidebar'),
    sidebarOverlay: document.getElementById('sidebarOverlay'),
    openSidebarBtn: document.getElementById('openSidebarBtn'),
    sidebarCouncilsList: document.getElementById('sidebarCouncilsList'),
    sidebarLinks: document.querySelectorAll('.sidebar-link'),
    tabPanes: document.querySelectorAll('.tab-pane'),
    activeBreadcrumb: document.getElementById('activeBreadcrumb'),
    lastUpdatedClock: document.getElementById('lastUpdatedClock'),
    manualSyncBtn: document.getElementById('manualSyncBtn'),
    autoSyncStatusContainer: document.getElementById('autoSyncStatusContainer'),
    autoSyncCountdown: document.getElementById('autoSyncCountdown'),
    liveFeedStatusText: document.getElementById('liveFeedStatusText'),
    homeStatsAnnouncements: document.getElementById('homeStatsAnnouncements'),
    homeStatsEvents: document.getElementById('homeStatsEvents'),
    homeStatsCouncils: document.getElementById('homeStatsCouncils'),
    homeStatsToday: document.getElementById('homeStatsToday'),
    // Moving Announcement Marquee
    dynamicTickerContent: document.getElementById('dynamicTickerContent'),
    // Home View
    priorityBulletinsGrid: document.getElementById('priorityBulletinsGrid'),
    // S1 View & Dedicated Subtabs
    s1SubTabs: document.querySelectorAll('.s1-subtab'),
    s1SubPanes: document.querySelectorAll('.s1-subpane'),
    s1DispositionTableBody: document.getElementById('s1DispositionTableBody'),
    s1ExternalPersonnelGrid: document.getElementById('s1ExternalPersonnelGrid'),
    s1ArmoryTableBody: document.getElementById('s1ArmoryTableBody'),
    s1AttachmentSearch: document.getElementById('s1AttachmentSearch'),
    s1AttachmentTableBody: document.getElementById('s1AttachmentTableBody'),
    s1StaffSearch: document.getElementById('s1StaffSearch'),
    s1StaffGridContainer: document.getElementById('s1StaffGridContainer'),
    // Schedule of Calls (SOC) View
    socDateBadge: document.getElementById('socDateBadge'),
    socSyncStatusBadge: document.getElementById('socSyncStatusBadge'),
    socSyncBtn: document.getElementById('socSyncBtn'),
    socOC: document.getElementById('socOC'),
    socAOC: document.getElementById('socAOC'),
    socUniform: document.getElementById('socUniform'),
    socOD: document.getElementById('socOD'),
    socChangesCountBadge: document.getElementById('socChangesCountBadge'),
    socChangesContainer: document.getElementById('socChangesContainer'),
    dutyGuardRosterTableBody: document.getElementById('dutyGuardRosterTableBody'),
    socGuardSearch: document.getElementById('socGuardSearch'),
    dutyCallsTableBody: document.getElementById('dutyCallsTableBody'),
    socCallsSearch: document.getElementById('socCallsSearch'),
    // Staff View
    staffDisplayContainer: document.getElementById('staffDisplayContainer'),
    staffTabs: document.querySelectorAll('.staff-tab'),
    // Calendar View
    calendarEventsGrid: document.getElementById('calendarEventsGrid'),
    // Punishment View
    punishmentTableBody: document.getElementById('punishmentTableBody'),
    punishmentSearchInput: document.getElementById('punishmentSearchInput'),
    // Council View
    activeCouncilTag: document.getElementById('activeCouncilTag'),
    activeCouncilTitle: document.getElementById('activeCouncilTitle'),
    activeCouncilDesc: document.getElementById('activeCouncilDesc'),
    councilDynamicContainer: document.getElementById('councilDynamicContainer'),
    toastContainer: document.getElementById('toastContainer')
  };

  // --- Clock & Timestamps ---
  function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    if (dom.lastUpdatedClock) {
      dom.lastUpdatedClock.textContent = timeStr;
    }
  }

  // --- Automated 15-Minute Sync Manager & Local Storage Persistence ---
  const CACHE_STORAGE_KEY = 'ccafp_daily_live_cache';
  const AUTO_SYNC_INTERVAL_SECONDS = 15 * 60; // 900 seconds (15 minutes)
  let autoSyncCountdownSeconds = AUTO_SYNC_INTERVAL_SECONDS;
  let autoSyncTimerId = null;

  function saveLiveSnapshotToStorage() {
    try {
      if (!CCAFP_CONFIG.s1Data) return;
      const payload = {
        savedAt: new Date().toISOString(),
        version: CCAFP_CONFIG.version,
        s1Data: CCAFP_CONFIG.s1Data
      };
      localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn('localStorage caching unavailable:', err);
    }
  }

  function restoreLiveSnapshotFromStorage() {
    try {
      const raw = localStorage.getItem(CACHE_STORAGE_KEY);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      if (parsed && parsed.s1Data) {
        if (!CCAFP_CONFIG.s1Data) CCAFP_CONFIG.s1Data = {};
        if (parsed.s1Data.scheduleOfCalls) CCAFP_CONFIG.s1Data.scheduleOfCalls = parsed.s1Data.scheduleOfCalls;
        if (parsed.s1Data.disposition) CCAFP_CONFIG.s1Data.disposition = parsed.s1Data.disposition;
        if (parsed.s1Data.armory) CCAFP_CONFIG.s1Data.armory = parsed.s1Data.armory;
        if (parsed.s1Data.attachment) CCAFP_CONFIG.s1Data.attachment = parsed.s1Data.attachment;
        if (parsed.s1Data.regimentStaff) CCAFP_CONFIG.s1Data.regimentStaff = parsed.s1Data.regimentStaff;
        return true;
      }
    } catch (err) {
      console.warn('Error restoring from localStorage cache:', err);
    }
    return false;
  }

  function detectChangedSections(oldData, newData) {
    const changed = [];
    if (!oldData || Object.keys(oldData).length === 0) {
      return changed;
    }
    try {
      const oldSoc = JSON.stringify(oldData.scheduleOfCalls || {});
      const newSoc = JSON.stringify(newData.scheduleOfCalls || {});
      if (oldSoc !== newSoc) {
        changed.push('Schedule of Calls (SOC)');
      }

      const oldDisp = JSON.stringify(oldData.disposition || {});
      const newDisp = JSON.stringify(newData.disposition || {});
      if (oldDisp !== newDisp) {
        changed.push('Cadet Disposition');
      }

      const oldArm = JSON.stringify(oldData.armory || {});
      const newArm = JSON.stringify(newData.armory || {});
      if (oldArm !== newArm) {
        changed.push('HTG Armory');
      }

      const oldAtt = JSON.stringify(oldData.attachment || {});
      const newAtt = JSON.stringify(newData.attachment || {});
      if (oldAtt !== newAtt) {
        changed.push('Cadet Attachments (FAD/SIQ)');
      }
    } catch (e) {
      console.warn('Error comparing data signatures:', e);
    }
    return changed;
  }

  function updateHeroStats() {
    if (dom.homeStatsAnnouncements) {
      const bulletinsCount = CCAFP_CONFIG.priorityBulletins?.length || 0;
      const socChangesCount = CCAFP_CONFIG.s1Data?.scheduleOfCalls?.changes?.length || 0;
      dom.homeStatsAnnouncements.textContent = bulletinsCount + socChangesCount;
    }
    if (dom.homeStatsEvents) {
      dom.homeStatsEvents.textContent = CCAFP_CONFIG.calendarEvents?.length || 3;
    }
    if (dom.homeStatsCouncils) {
      dom.homeStatsCouncils.textContent = CCAFP_CONFIG.councils?.length || 18;
    }
    if (dom.homeStatsToday) {
      const rawDate = CCAFP_CONFIG.s1Data?.scheduleOfCalls?.date || '';
      const match = rawDate.match(/(\d{1,2})\s+([A-Za-z]+)/);
      if (match) {
        dom.homeStatsToday.textContent = `${match[2].substring(0, 3)} ${parseInt(match[1], 10)}`;
      } else {
        const now = new Date();
        dom.homeStatsToday.textContent = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
    }
  }

  function updateCountdownDisplay() {
    if (!dom.autoSyncCountdown) return;
    const minutes = Math.floor(autoSyncCountdownSeconds / 60);
    const seconds = autoSyncCountdownSeconds % 60;
    dom.autoSyncCountdown.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function startAutoSync15MinTimer() {
    if (autoSyncTimerId) clearInterval(autoSyncTimerId);
    updateCountdownDisplay();
    autoSyncTimerId = setInterval(() => {
      autoSyncCountdownSeconds--;
      if (autoSyncCountdownSeconds <= 0) {
        autoSyncCountdownSeconds = AUTO_SYNC_INTERVAL_SECONDS;
        updateCountdownDisplay();
        performAutomated15MinSync(false);
      } else {
        updateCountdownDisplay();
      }
    }, 1000);
  }

  // --- Mobile Sidebar Controls ---
  function openMobileSidebar() {
    if (dom.mainSidebar) dom.mainSidebar.classList.remove('-translate-x-full');
    if (dom.sidebarOverlay) dom.sidebarOverlay.classList.remove('hidden');
  }

  function closeMobileSidebar() {
    if (dom.mainSidebar) dom.mainSidebar.classList.add('-translate-x-full');
    if (dom.sidebarOverlay) dom.sidebarOverlay.classList.add('hidden');
  }

  // --- Navigation & Tab Switching ---
  window.navigateToTab = function (tabId, breadcrumbName = null) {
    state.currentTab = tabId;

    // Update Sidebar active state
    dom.sidebarLinks.forEach(link => {
      const target = link.getAttribute('data-tab');
      const councilTarget = link.getAttribute('data-council-select');
      if ((target === tabId && tabId !== 'council') || (tabId === 's1' && councilTarget === 's1')) {
        link.classList.add('active-pill');
      } else {
        link.classList.remove('active-pill');
      }
    });

    if (tabId === 'council') {
      document.querySelectorAll('[data-council-select]').forEach(btn => {
        if (btn.getAttribute('data-council-select') === state.activeCouncilId) {
          btn.classList.add('active-pill');
        } else {
          btn.classList.remove('active-pill');
        }
      });
    }

    // Toggle Panes
    dom.tabPanes.forEach(pane => {
      if (pane.id === `view-${tabId}`) {
        pane.classList.remove('hidden');
      } else {
        pane.classList.add('hidden');
      }
    });

    // Update Breadcrumb
    const labels = {
      home: 'HOME',
      s1: 'S1 PERSONNEL',
      staff: 'CADET STAFF',
      duty: 'SCHEDULE OF CALLS (SOC)',
      calendar: 'EVENT CALENDAR',
      honor: 'HONOR COMMITTEE',
      punishments: 'PUNISHMENT LIST',
      council: breadcrumbName || 'COUNCIL'
    };
    if (dom.activeBreadcrumb) {
      dom.activeBreadcrumb.textContent = labels[tabId] || 'BULLETIN';
    }

    closeMobileSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- S1 Council Sub-Pages Switching ---
  function switchS1SubTab(tabName) {
    state.s1ActiveSubTab = tabName;

    // Subtab pills
    dom.s1SubTabs.forEach(btn => {
      if (btn.getAttribute('data-s1-tab') === tabName) {
        btn.className = 's1-subtab active-pill px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-900 text-white flex items-center gap-1.5 flex-shrink-0';
      } else {
        btn.className = 's1-subtab px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 flex items-center gap-1.5 flex-shrink-0';
      }
    });

    // Subpanes
    dom.s1SubPanes.forEach(pane => {
      if (pane.id === `s1-section-${tabName}`) {
        pane.classList.remove('hidden');
      } else {
        pane.classList.add('hidden');
      }
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // --- Render S1 Sub-Sections Data ---
  function renderS1Data() {
    renderS1Disposition();
    renderS1Armory();
    renderS1Attachment();
    renderS1RegimentStaff();
    if (window.lucide) window.lucide.createIcons();
  }

  // 1. DISPOSITION RENDERER
  function renderS1Disposition() {
    if (!dom.s1DispositionTableBody) return;
    const disp = CCAFP_CONFIG.s1Data.disposition;
    const rows = disp.companies;

    let t1CLM = 0, t1CLF = 0, t2CLM = 0, t2CLF = 0;
    let t3CLM = 0, t3CLF = 0, t4CLM = 0, t4CLF = 0;
    let grandEff = 0, grandIneff = 0, grandTotal = 0;

    dom.s1DispositionTableBody.innerHTML = rows.map(r => {
      t1CLM += r.firstCL_M; t1CLF += r.firstCL_F;
      t2CLM += r.secondCL_M; t2CLF += r.secondCL_F;
      t3CLM += r.thirdCL_M; t3CLF += r.thirdCL_F;
      t4CLM += r.fourthCL_M; t4CLF += r.fourthCL_F;
      grandEff += r.effectiveTotal;
      grandIneff += r.ineffectiveTotal;
      grandTotal += r.total;

      return `
        <tr class="hover:bg-slate-50/70 transition-colors">
          <td class="py-3 px-3 font-sans font-bold text-slate-900">${r.name} Company ('${r.code}')</td>
          <td class="py-3 px-2 text-center text-slate-700">${r.firstCL_M} / <span class="text-blue-600 font-semibold">${r.firstCL_F}</span></td>
          <td class="py-3 px-2 text-center text-slate-700">${r.secondCL_M} / <span class="text-blue-600 font-semibold">${r.secondCL_F}</span></td>
          <td class="py-3 px-2 text-center text-slate-700">${r.thirdCL_M} / <span class="text-blue-600 font-semibold">${r.thirdCL_F}</span></td>
          <td class="py-3 px-2 text-center text-slate-700">${r.fourthCL_M} / <span class="text-blue-600 font-semibold">${r.fourthCL_F}</span></td>
          <td class="py-3 px-2 text-center font-bold text-emerald-700 bg-emerald-50/40 rounded">${r.effectiveTotal}</td>
          <td class="py-3 px-2 text-center font-bold ${r.ineffectiveTotal > 0 ? 'text-amber-700 bg-amber-50/40' : 'text-slate-400'} rounded">${r.ineffectiveTotal}</td>
          <td class="py-3 px-3 text-right font-bold text-blue-950 font-mono-clean text-sm">${r.total}</td>
        </tr>
      `;
    }).join('') + `
      <tr class="bg-slate-50 font-bold border-t-2 border-slate-300 text-slate-900">
        <td class="py-3 px-3 uppercase tracking-wider font-mono-clean text-[11px]">TOTAL CCAFP ON-POST</td>
        <td class="py-3 px-2 text-center">${t1CLM} / <span class="text-blue-600">${t1CLF}</span></td>
        <td class="py-3 px-2 text-center">${t2CLM} / <span class="text-blue-600">${t2CLF}</span></td>
        <td class="py-3 px-2 text-center">${t3CLM} / <span class="text-blue-600">${t3CLF}</span></td>
        <td class="py-3 px-2 text-center">${t4CLM} / <span class="text-blue-600">${t4CLF}</span></td>
        <td class="py-3 px-2 text-center text-emerald-800 bg-emerald-100/50">${grandEff}</td>
        <td class="py-3 px-2 text-center text-amber-800 bg-amber-100/50">${grandIneff}</td>
        <td class="py-3 px-3 text-right text-blue-950 text-sm font-black">${grandTotal}</td>
      </tr>
    `;

    // External Strength summary
    if (dom.s1ExternalPersonnelGrid) {
      dom.s1ExternalPersonnelGrid.innerHTML = disp.externalPersonnel.map(ext => `
        <div class="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1">
          <div class="flex items-center justify-between">
            <span class="font-bold text-slate-800 text-[11px]">${ext.category}</span>
            <span class="px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 text-[9px] font-bold uppercase">${ext.status}</span>
          </div>
          <div class="flex items-baseline justify-between pt-1">
            <span class="text-slate-500 text-[10px]">M: ${ext.male} &bull; F: ${ext.female}</span>
            <span class="font-mono-clean font-bold text-blue-900 text-sm">${ext.total}</span>
          </div>
        </div>
      `).join('');
    }
  }

  // 2. ARMORY RENDERER
  function renderS1Armory() {
    if (!dom.s1ArmoryTableBody) return;
    const arm = CCAFP_CONFIG.s1Data.armory;
    const rows = arm.rows;

    dom.s1ArmoryTableBody.innerHTML = rows.map(r => `
      <tr class="hover:bg-slate-50/70 transition-colors">
        <td class="py-2.5 px-3 font-bold text-slate-900 font-sans">${r.loc}</td>
        <td class="py-2.5 px-2 text-center text-blue-950 font-bold">${r.m14} <span class="text-slate-400 font-normal">(${r.mag14})</span></td>
        <td class="py-2.5 px-2 text-center text-slate-700">${r.m16 || '-'}</td>
        <td class="py-2.5 px-2 text-center text-slate-700">${r.r4 || '-'}</td>
        <td class="py-2.5 px-2 text-center ${r.garand ? 'text-amber-700 font-bold' : 'text-slate-400'}">${r.garand || '-'}</td>
        <td class="py-2.5 px-2 text-center ${r.pistol ? 'text-emerald-700 font-bold' : 'text-slate-400'}">${r.pistol || '-'}</td>
        <td class="py-2.5 px-2 text-center ${r.swords ? 'text-amber-800 font-bold' : 'text-slate-400'}">${r.swords || '-'}</td>
        <td class="py-2.5 px-2 text-center ${r.bayonets ? 'text-amber-800 font-bold' : 'text-slate-400'}">${r.bayonets || '-'}</td>
        <td class="py-2.5 px-3 text-slate-500 font-sans text-[11px]">${r.notes || '-'}</td>
      </tr>
    `).join('') + `
      <tr class="bg-slate-50 font-bold border-t-2 border-slate-300 text-slate-900">
        <td class="py-2.5 px-3 font-mono-clean uppercase text-[11px]">TOTAL INVENTORY</td>
        <td class="py-2.5 px-2 text-center text-blue-900 font-bold">${arm.totals.m14In} <span class="text-blue-700 font-normal">(${arm.totals.m14Mag})</span></td>
        <td class="py-2.5 px-2 text-center">${arm.totals.m16In}</td>
        <td class="py-2.5 px-2 text-center">${arm.totals.r4In}</td>
        <td class="py-2.5 px-2 text-center text-amber-700">${arm.totals.m1GarandIn}</td>
        <td class="py-2.5 px-2 text-center text-emerald-700">${arm.totals.pistol9mmIn}</td>
        <td class="py-2.5 px-2 text-center text-amber-800">${arm.totals.swordsIn}</td>
        <td class="py-2.5 px-2 text-center text-amber-800">${arm.totals.bayonetsIn}</td>
        <td class="py-2.5 px-3 text-slate-600 text-[11px]">Full Inspection Verified by RSO</td>
      </tr>
    `;
  }

  // 3. ATTACHMENT RENDERER
  function renderS1Attachment() {
    if (!dom.s1AttachmentTableBody) return;
    const att = CCAFP_CONFIG.s1Data.attachment;

    const allItems = [
      ...att.fadList.map(x => ({ ...x, category: 'FAD', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200', details: x.condition, extra: x.release })),
      ...att.siqList.map(x => ({ ...x, category: 'SIQ', badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200', details: x.reason, extra: x.release })),
      ...att.fdpshList.map(x => ({ ...x, category: 'FDPSH Hospital', badgeColor: 'bg-red-50 text-red-700 border-red-200', details: x.reason, extra: x.release })),
      ...att.vlunaList.map(x => ({ ...x, category: 'V-Luna Hospital', badgeColor: 'bg-rose-50 text-rose-700 border-rose-200', details: x.reason, extra: x.release })),
      ...att.holdingCenterList.map(x => ({ ...x, category: 'Holding Center', badgeColor: 'bg-amber-50 text-amber-800 border-amber-200', details: x.reason, extra: x.barracks })),
      ...att.clearingInList.map(x => ({ ...x, category: 'Clearing-In', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', details: x.reason, extra: x.remarks })),
      ...att.clearingOutList.map(x => ({ ...x, category: 'Clearing-Out', badgeColor: 'bg-orange-50 text-orange-700 border-orange-200', details: x.reason, extra: x.remarks })),
      ...att.ghqList.map(x => ({ ...x, category: 'GHQ Detail', badgeColor: 'bg-purple-50 text-purple-700 border-purple-200', details: x.reason, extra: x.remarks })),
      ...att.stockadeList.map(x => ({ ...x, category: 'PMA Stockade', badgeColor: 'bg-slate-100 text-slate-800 border-slate-300', details: x.reason, extra: x.remarks }))
    ];

    // Update counts
    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setEl('count-all', allItems.length);
    setEl('count-fad', att.fadList.length);
    setEl('count-holding', att.holdingCenterList.length);
    setEl('count-clearingin', att.clearingInList.length);
    setEl('count-fdpsh', att.fdpshList.length);
    setEl('count-vluna', att.vlunaList.length);
    setEl('count-siq', att.siqList.length);
    setEl('count-clearingout', att.clearingOutList.length);
    setEl('count-stockade', att.ghqList.length + att.stockadeList.length);

    let filtered = allItems;
    const cat = state.s1AttachmentCat;
    if (cat === 'fad') filtered = filtered.filter(i => i.category === 'FAD');
    else if (cat === 'holding') filtered = filtered.filter(i => i.category === 'Holding Center');
    else if (cat === 'clearing-in') filtered = filtered.filter(i => i.category === 'Clearing-In');
    else if (cat === 'fdpsh') filtered = filtered.filter(i => i.category.includes('FDPSH'));
    else if (cat === 'vluna') filtered = filtered.filter(i => i.category.includes('V-Luna'));
    else if (cat === 'siq') filtered = filtered.filter(i => i.category === 'SIQ');
    else if (cat === 'clearing-out') filtered = filtered.filter(i => i.category === 'Clearing-Out');
    else if (cat === 'stockade') filtered = filtered.filter(i => i.category.includes('Stockade') || i.category.includes('GHQ'));

    const q = state.s1AttachmentQuery.toLowerCase();
    if (q) {
      filtered = filtered.filter(i =>
        (i.name && i.name.toLowerCase().includes(q)) ||
        (i.classYr && i.classYr.toLowerCase().includes(q)) ||
        (i.coy && i.coy.toLowerCase().includes(q)) ||
        (i.category && i.category.toLowerCase().includes(q)) ||
        (i.details && i.details.toLowerCase().includes(q)) ||
        (i.extra && i.extra.toLowerCase().includes(q))
      );
    }

    if (filtered.length === 0) {
      dom.s1AttachmentTableBody.innerHTML = `
        <tr>
          <td colspan="8" class="p-8 text-center text-slate-400 font-sans">
            No cadet attachment records found matching current search.
          </td>
        </tr>
      `;
      return;
    }

    dom.s1AttachmentTableBody.innerHTML = filtered.map((c, idx) => `
      <tr class="hover:bg-slate-50/70 transition-colors">
        <td class="py-2.5 px-3 text-slate-400 font-mono-clean text-[11px]">${idx + 1}</td>
        <td class="py-2.5 px-2 font-bold text-slate-700">${c.classYr || '-'}</td>
        <td class="py-2.5 px-3 font-sans font-bold text-slate-900">${c.name}</td>
        <td class="py-2.5 px-2 font-bold text-blue-800">${c.coy && c.coy !== '-' ? c.coy + ' Coy' : '-'}</td>
        <td class="py-2.5 px-3">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold border ${c.badgeColor}">${c.category}</span>
        </td>
        <td class="py-2.5 px-3 text-slate-700 font-sans text-xs">${c.details || '-'}</td>
        <td class="py-2.5 px-2 text-slate-500 text-[11px]">${c.start || '-'}</td>
        <td class="py-2.5 px-3 text-slate-800 font-semibold text-[11px]">${c.extra || '-'}</td>
      </tr>
    `).join('');
  }


  // 5. REGIMENT STAFF 2027 RENDERER
  function renderS1RegimentStaff() {
    if (!dom.s1StaffGridContainer) return;
    const staffData = CCAFP_CONFIG.s1Data.regimentStaff2027;

    const allEntries = [
      ...staffData.commandSection.map(s => ({ ...s, section: 'command', sectionLabel: 'COMMAND SECTION', borderClass: 'stripe-red' })),
      ...staffData.coordinatingStaff.map(s => ({ ...s, section: 'coordinating', sectionLabel: `COORDINATING STAFF (${s.code})`, borderClass: 'stripe-blue' })),
      ...staffData.specialStaff.map(s => ({ ...s, section: 'special', sectionLabel: 'SPECIAL STAFF OFFICER', borderClass: 'stripe-amber' })),
      ...staffData.ncos.map(s => ({ ...s, section: 'ncos', sectionLabel: 'REGIMENTAL NCO', borderClass: 'stripe-emerald' }))
    ];

    let filtered = allEntries;
    if (state.s1StaffCat !== 'all') {
      filtered = filtered.filter(s => s.section === state.s1StaffCat);
    }

    const q = state.s1StaffQuery.toLowerCase();
    if (q) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q) ||
        (s.coy && s.coy.toLowerCase().includes(q)) ||
        (s.serial && s.serial.toLowerCase().includes(q))
      );
    }

    if (filtered.length === 0) {
      dom.s1StaffGridContainer.innerHTML = `
        <div class="col-span-full p-8 text-center text-slate-400 font-sans">
          No staff officers or NCOs match your search query.
        </div>
      `;
      return;
    }

    dom.s1StaffGridContainer.innerHTML = filtered.map(s => {
      const initial = s.name.replace(/^(CDT|CPT|LT|SGT|S\/SGT|F\/CPT|MAJ|1CL|2CL|3CL|4CL|\s)+/g, '').trim().charAt(0) || 'C';
      return `
        <div class="pma-cadet-card">
          <div class="pma-cadet-header">
            <div class="pma-cadet-avatar">${initial}</div>
            <div class="min-w-0 flex-1">
              <span class="text-[10px] font-bold tracking-wider text-slate-400 uppercase block label-tracked">PMA CLASS 2027</span>
              <h4 class="font-extrabold text-base text-white tracking-tight leading-snug mt-0.5 uppercase truncate">${s.name}</h4>
              <div class="flex items-center gap-1.5 mt-2 flex-wrap">
                ${s.coy ? `<span class="pma-cadet-badge">${s.coy}</span>` : ''}
                ${s.rank ? `<span class="pma-cadet-badge">${s.rank}</span>` : ''}
              </div>
            </div>
          </div>
          <div class="pma-cadet-body">
            <div class="pma-cadet-field">
              <span class="text-[11px] font-medium text-slate-400 block">Appointment / Role</span>
              <span class="font-bold text-sm text-slate-900 block mt-0.5 leading-snug">${s.role}</span>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div class="pma-cadet-field">
                <span class="text-[11px] font-medium text-slate-400 block">Cadet Serial</span>
                <span class="font-bold text-sm text-slate-900 block mt-0.5 font-mono-clean">${s.serial || '—'}</span>
              </div>
              <div class="pma-cadet-field">
                <span class="text-[11px] font-medium text-slate-400 block">Staff Unit</span>
                <span class="font-bold text-xs text-blue-900 block mt-1">${s.sectionLabel}</span>
              </div>
            </div>
            <div class="pt-1 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Source: CCAFP Staff Roster 2027</span>
              <span class="text-emerald-600 font-semibold flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Active</span>
              </span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- Render Sidebar Councils ---
  function renderSidebarCouncils() {
    if (!dom.sidebarCouncilsList) return;
    dom.sidebarCouncilsList.innerHTML = CCAFP_CONFIG.councils.map(council => {
      const badge = council.badgeCount ? `<span class="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center font-mono-clean">${council.badgeCount}</span>` : '';
      return `
        <button data-council-select="${council.id}" class="sidebar-link w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium">
          <div class="flex items-center gap-2.5 truncate">
            <i data-lucide="${council.icon || 'shield'}" class="w-4 h-4 text-slate-400"></i>
            <span class="truncate">${council.name}</span>
          </div>
          ${badge}
        </button>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function selectCouncil(councilId) {
    state.activeCouncilId = councilId;
    if (councilId === 's1') {
      navigateToTab('s1', 'S1 PERSONNEL');
      return;
    }
    const council = CCAFP_CONFIG.councils.find(c => c.id === councilId);
    renderActiveCouncilView(council);
    navigateToTab('council', council ? council.name.toUpperCase() : 'COUNCIL');
  }

  // --- Render Priority Bulletins (Exact Alfacoy Cards) ---
  function renderPriorityBulletins() {
    if (!dom.priorityBulletinsGrid) return;
    dom.priorityBulletinsGrid.innerHTML = CCAFP_CONFIG.priorityBulletins.map(item => `
      <div class="bulletin-card ${item.stripe} p-5 flex flex-col justify-between space-y-4">
        <div>
          <!-- Tags & Date Header -->
          <div class="flex items-center justify-between gap-2 mb-3">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider font-mono-clean uppercase ${
                item.badge1 === 'URGENT' ? 'badge-urgent' : 'badge-important'
              }">${item.badge1}</span>
              ${item.badge2 ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider font-mono-clean uppercase ${
                item.badge2 === 'PRIORITY' ? 'badge-priority' : 'badge-policy'
              }">${item.badge2}</span>` : ''}
            </div>
            <span class="text-[11px] font-mono-clean text-slate-400">${item.date}</span>
          </div>

          <!-- Title -->
          <h4 class="font-bold text-sm sm:text-base text-slate-900 leading-snug tracking-tight">
            ${item.title}
          </h4>

          <!-- Body Text -->
          <p class="text-xs text-slate-600 mt-2.5 leading-relaxed">
            ${item.content}
          </p>
        </div>

        <!-- Footer: Author & Reactions -->
        <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div class="flex items-center gap-1.5 text-slate-400 font-mono-clean text-[11px]">
            <i class="fa-solid fa-folder-closed text-slate-400"></i>
            <span class="font-semibold text-slate-500 uppercase">${item.author}</span>
          </div>

          <!-- Interactive Reactions -->
          <div class="flex items-center gap-2">
            <button class="reaction-btn hover:scale-110 transition-transform flex items-center gap-1 text-[11px] text-slate-500 hover:text-red-600" data-id="${item.id}" data-type="heart">
              <span>❤️</span>
              <span class="font-mono-clean font-bold reaction-count">${item.reactions.heart}</span>
            </button>
            <button class="reaction-btn hover:scale-110 transition-transform flex items-center gap-1 text-[11px] text-slate-500 hover:text-amber-500" data-id="${item.id}" data-type="zap">
              <span>⚡</span>
              <span class="font-mono-clean font-bold reaction-count">${item.reactions.zap}</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // --- Active General Council View Rendering ---
  async function renderActiveCouncilView(council) {
    if (!council) return;

    if (dom.activeCouncilTag) dom.activeCouncilTag.textContent = council.category.toUpperCase();
    if (dom.activeCouncilTitle) dom.activeCouncilTitle.textContent = council.title;
    if (dom.activeCouncilDesc) dom.activeCouncilDesc.textContent = council.description;

    if (council.sensitive) {
      const reminders = council.reminders || [];
      dom.councilDynamicContainer.innerHTML = `
        <div class="space-y-4">
          <div class="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 leading-relaxed">
            <strong>Restricted Policy Council:</strong> In compliance with Cadet Regulations, work of this council is restricted to ethical guidelines, security orders, and standing reminders only.
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${reminders.map(r => `
              <div class="bulletin-card stripe-red p-5 space-y-2">
                <div class="flex items-center justify-between text-[11px] font-mono-clean">
                  <span class="px-2 py-0.5 rounded font-bold ${r.priority === 'CRITICAL' ? 'badge-urgent' : 'badge-important'}">${r.priority}</span>
                  <span class="text-slate-400">${r.date}</span>
                </div>
                <h4 class="font-bold text-sm text-slate-900">${r.title}</h4>
                <p class="text-xs text-slate-600 leading-relaxed whitespace-pre-line">${r.text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      const sheetLink = syncManager.getLink(council.id);
      let headers = council.defaultHeaders || ["Item", "Detail", "Status"];
      let rows = council.defaultRows || [["Record 1", "Information", "Operational"]];
      let isLive = false;

      if (sheetLink) {
        if (state.liveCache[council.id]) {
          headers = state.liveCache[council.id][0];
          rows = state.liveCache[council.id].slice(1);
          isLive = true;
        } else {
          const fetched = await syncManager.fetchLiveCSV(sheetLink);
          if (fetched && fetched.length > 1) {
            state.liveCache[council.id] = fetched;
            headers = fetched[0];
            rows = fetched.slice(1);
            isLive = true;
          }
        }
      }

      dom.councilDynamicContainer.innerHTML = `
        <div class="space-y-4">
          <div class="flex items-center justify-between text-xs text-slate-500 font-mono-clean">
            <span>${isLive ? '🟢 Synchronized Live from Google Sheets' : 'Official Baseline Records'}</span>
            <span>${rows.length} Records</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="font-semibold text-slate-500 border-b border-slate-200 pb-2 uppercase tracking-wider text-[11px] font-mono-clean">
                  ${headers.map(h => `<th class="py-3 px-3">${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-mono-clean">
                ${rows.map(row => `
                  <tr class="hover:bg-slate-50/70 transition-colors">
                    ${row.map((cell, idx) => `
                      <td class="py-3 px-3 ${idx === 0 ? 'font-sans font-semibold text-slate-900' : 'text-slate-600'}">${cell || '-'}</td>
                    `).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // =========================================================================
  // 🕒 SCHEDULE OF CALLS (SOC) VIEW RENDERER & LIVE SYNC ENGINE
  // =========================================================================

  function renderScheduleOfCallsView() {
    const sched = CCAFP_CONFIG.s1Data?.scheduleOfCalls;
    if (!sched) return;

    // 1. Date & Header Uniform Badges
    if (dom.socDateBadge) {
      dom.socDateBadge.textContent = (sched.date || "07 OCTOBER 2026").toUpperCase();
    }
    const uniformHeaderBadge = document.getElementById('socUniformHeaderBadge');
    if (uniformHeaderBadge) {
      uniformHeaderBadge.textContent = `UNIFORM: ${sched.officers?.uniform || 'DA w/ CJ'}`;
    }

    // 2. Command Tactical Officers Cards (OC, AOC, Uniform, OD)
    if (dom.socOC) {
      dom.socOC.textContent = sched.officers?.oc || 'MAJ JAMES A MARTINEZ PA';
    }
    if (dom.socAOC) {
      dom.socAOC.textContent = sched.officers?.aoc || 'MAJ PHILIP JOHN U BUGAYONG PA';
    }
    if (dom.socUniform) {
      dom.socUniform.textContent = sched.officers?.uniform || 'DA w/ CJ';
    }
    if (dom.socOD) {
      const odEntry = (sched.guardRoster || []).find(g => g.postCode === 'OD' || (g.post && g.post.startsWith('OD')));
      if (odEntry && odEntry.posted && odEntry.incoming) {
        dom.socOD.textContent = `${odEntry.posted} ➔ ${odEntry.incoming}`;
      } else {
        dom.socOD.textContent = "1CL MANGAGOM 'D' ➔ 1CL PLANTAR 'H'";
      }
    }

    // 3. Official Changes Alert Banner
    if (dom.socChangesContainer) {
      const changes = sched.changes || [];
      if (dom.socChangesCountBadge) {
        dom.socChangesCountBadge.textContent = `${changes.length} ${changes.length === 1 ? 'CHANGE' : 'CHANGES'}`;
      }

      if (changes.length === 0) {
        dom.socChangesContainer.innerHTML = `
          <div class="col-span-full py-4 text-center text-xs font-mono-clean text-amber-900/80">
            No official call changes recorded for today.
          </div>
        `;
      } else {
        dom.socChangesContainer.innerHTML = changes.map(ch => `
          <div class="p-3.5 rounded-2xl bg-white border border-amber-200/90 shadow-xs space-y-2 hover:border-amber-400 transition-colors">
            <div class="flex items-center justify-between">
              <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-950 font-bold font-mono-clean text-[10px] tracking-wide">${ch.time}</span>
              <span class="text-[10px] font-mono-clean text-slate-500 uppercase tracking-wider">${ch.formation && ch.formation !== '-' ? 'VENUE: ' + ch.formation : 'CORPS CALL'}</span>
            </div>
            <h5 class="font-bold text-xs text-slate-900 font-mono-clean leading-snug">${ch.activity}</h5>
            <div class="flex items-center gap-2 pt-1 border-t border-slate-100 text-[10px] font-mono-clean text-slate-600 flex-wrap">
              <span>UNIFORM: <strong class="text-blue-900 font-bold">${ch.uniform || '-'}</strong></span>
              ${ch.formation && ch.formation !== '-' ? `<span>&bull;</span><span>FORMATION: <strong class="text-slate-800 font-bold">${ch.formation}</strong></span>` : ''}
            </div>
          </div>
        `).join('');
      }
    }

    // 4. Tactical Guard Detail (Posted & Incoming)
    if (dom.dutyGuardRosterTableBody) {
      let guards = sched.guardRoster || [];
      const q = (state.socGuardQuery || '').toLowerCase();
      if (q) {
        guards = guards.filter(g =>
          (g.post && g.post.toLowerCase().includes(q)) ||
          (g.posted && g.posted.toLowerCase().includes(q)) ||
          (g.incoming && g.incoming.toLowerCase().includes(q))
        );
      }

      if (guards.length === 0) {
        dom.dutyGuardRosterTableBody.innerHTML = `
          <tr><td colspan="4" class="py-6 text-center text-xs font-mono-clean text-slate-400">No matching guard post found.</td></tr>
        `;
      } else {
        dom.dutyGuardRosterTableBody.innerHTML = guards.map(g => `
          <tr class="hover:bg-slate-50/70 transition-colors">
            <td class="py-3 px-4 font-bold text-slate-900 font-mono-clean">
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                <span>${g.post}</span>
              </div>
            </td>
            <td class="py-3 px-4 font-mono-clean font-semibold text-blue-950">
              <span class="px-2 py-0.5 rounded bg-blue-50 border border-blue-100 text-blue-900">${g.posted}</span>
            </td>
            <td class="py-3 px-4 font-mono-clean font-semibold text-emerald-800">
              <span class="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-100 text-emerald-900">${g.incoming}</span>
            </td>
            <td class="py-3 px-4 text-center font-mono-clean">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold ${g.incoming && g.incoming !== '-' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-slate-100 text-slate-600'}">
                ${g.incoming && g.incoming !== '-' ? 'RELIEF DUE' : 'ON DUTY'}
              </span>
            </td>
          </tr>
        `).join('');
      }
    }

    // 5. Daily Military Routine Timeline (0400H – 2230H)
    if (dom.dutyCallsTableBody) {
      let calls = sched.calls || [];
      const q = (state.socCallsQuery || '').toLowerCase();
      if (q) {
        calls = calls.filter(c =>
          (c.time && c.time.toLowerCase().includes(q)) ||
          (c.activity && c.activity.toLowerCase().includes(q)) ||
          (c.uniform && c.uniform.toLowerCase().includes(q)) ||
          (c.formation && c.formation.toLowerCase().includes(q))
        );
      }

      if (calls.length === 0) {
        dom.dutyCallsTableBody.innerHTML = `
          <tr><td colspan="4" class="py-6 text-center text-xs font-mono-clean text-slate-400">No matching military calls found.</td></tr>
        `;
      } else {
        dom.dutyCallsTableBody.innerHTML = calls.map(c => {
          const timeDisplay = c.time ? (c.time.endsWith('H') ? c.time : `${c.time}H`) : '-';

          let uBadgeClass = 'bg-slate-100 text-slate-700 border-slate-200';
          const uUpper = (c.uniform || '').toUpperCase();
          if (uUpper.includes('DA')) uBadgeClass = 'bg-blue-50 text-blue-900 border-blue-200 font-bold';
          else if (uUpper.includes('BDU')) uBadgeClass = 'bg-emerald-50 text-emerald-900 border-emerald-200 font-bold';
          else if (uUpper.includes('SDPU') || uUpper.includes('SDU')) uBadgeClass = 'bg-purple-50 text-purple-900 border-purple-200 font-bold';
          else if (uUpper.includes('AU')) uBadgeClass = 'bg-amber-50 text-amber-900 border-amber-200 font-bold';
          else if (uUpper.includes('RU')) uBadgeClass = 'bg-rose-50 text-rose-900 border-rose-200 font-bold';
          else if (uUpper.includes('GAU')) uBadgeClass = 'bg-slate-100 text-slate-800 border-slate-300 font-bold';

          return `
            <tr class="hover:bg-slate-50/70 transition-colors border-b border-slate-100 last:border-0">
              <td class="py-3 px-4 font-mono-clean font-bold text-blue-950 text-xs">${timeDisplay}</td>
              <td class="py-3 px-4 font-medium text-slate-900 text-xs">${c.activity}</td>
              <td class="py-3 px-3 font-mono-clean text-xs">
                ${c.uniform && c.uniform !== '-' ? `
                  <span class="px-2 py-0.5 rounded text-[11px] border ${uBadgeClass}">
                    ${c.uniform}
                  </span>
                ` : '<span class="text-slate-400">-</span>'}
              </td>
              <td class="py-3 px-3 font-mono-clean text-xs">
                ${c.formation && c.formation !== '-' ? `
                  <span class="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-semibold">
                    ${c.formation}
                  </span>
                ` : '<span class="text-slate-400">-</span>'}
              </td>
            </tr>
          `;
        }).join('');
      }
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // --- Dynamic Moving Marquee Announcement Ticker ---
  function updateMarqueeTicker() {
    if (!dom.dynamicTickerContent) return;
    const sched = CCAFP_CONFIG.s1Data?.scheduleOfCalls;
    const disp = CCAFP_CONFIG.s1Data?.disposition;
    const armory = CCAFP_CONFIG.s1Data?.armory;

    const items = [];

    // 1. All Schedule Changes from SCHEDULE OF CALLS spreadsheet
    if (sched && sched.changes && sched.changes.length > 0) {
      sched.changes.forEach(ch => {
        items.push(`
          <div class="ticker-item font-mono-clean">
            <span class="px-1.5 py-0.5 rounded bg-amber-500 text-white font-bold text-[10px]">SCHEDULE CHANGE</span>
            <span class="font-bold text-amber-950">${ch.time}:</span>
            <span class="font-bold text-slate-900">${ch.activity}</span>
            <span class="text-slate-600">(Uniform: <strong class="text-blue-900">${ch.uniform}</strong>${ch.formation && ch.formation !== '-' ? `, Venue: <strong class="text-slate-800">${ch.formation}</strong>` : ''})</span>
          </div>
        `);
      });
    }

    // 2. Tactical Officers on Post
    if (sched && sched.officers) {
      items.push(`
        <div class="ticker-item font-mono-clean">
          <span class="px-1.5 py-0.5 rounded bg-blue-900 text-white font-bold text-[10px]">DUTY COMMAND</span>
          <span class="text-slate-700">OC: <strong class="text-slate-900">${sched.officers.oc}</strong> &bull; AOC: <strong class="text-slate-900">${sched.officers.aoc}</strong> &bull; Uniform: <strong class="text-blue-700">${sched.officers.uniform}</strong></span>
        </div>
      `);
    }

    // 3. S1 Council - Cadet Information Sheets 2026-2027 Highlights
    const att = CCAFP_CONFIG.s1Data?.attachment;
    if (disp) {
      const grandTot = disp.summary?.grandTotal?.total || 1267;
      const onPost = disp.summary?.ccafpOnPost?.total || 1213;
      const effTot = disp.summary?.effective?.total || 1171;
      const ineffTot = disp.summary?.ineffective?.total || 42;
      const hc = disp.summary?.ineffective?.holdingCenter || 30;
      const siq = disp.summary?.ineffective?.siq || 4;
      items.push(`
        <div class="ticker-item font-mono-clean">
          <span class="px-1.5 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px]">S1 DISPOSITION</span>
          <span class="text-slate-700">Total Strength: <strong class="text-slate-900">${grandTot}</strong> &bull; On-Post: <strong class="text-slate-900">${onPost}</strong> &bull; Effective: <strong class="text-emerald-700">${effTot}</strong> &bull; Ineffective: <strong class="text-amber-700">${ineffTot}</strong> (Holding Ctr: ${hc}, SIQ: ${siq})</span>
        </div>
      `);
    }

    if (armory) {
      const m14 = armory.totals?.m14In || 831;
      const m16 = armory.totals?.m16In || 342;
      const r4 = armory.totals?.r4In || 130;
      items.push(`
        <div class="ticker-item font-mono-clean">
          <span class="px-1.5 py-0.5 rounded bg-indigo-600 text-white font-bold text-[10px]">S1 ARMORY</span>
          <span class="text-slate-700">Rifles: M14 (${m14}), M16 (${m16}), R4 (${r4}) &bull; 51 Bayonets & 14 Swords at RSO Stockroom</span>
        </div>
      `);
    }

    if (att) {
      const fadCount = att.counts?.fad || 43;
      const hcCount = att.counts?.holdingCenter || 30;
      const inCount = att.counts?.clearingIn || 9;
      items.push(`
        <div class="ticker-item font-mono-clean">
          <span class="px-1.5 py-0.5 rounded bg-slate-800 text-white font-bold text-[10px]">S1 ATTACHMENT</span>
          <span class="text-slate-700">${fadCount} Cadets on FAD Status &bull; ${hcCount} Cadets at Holding Center &bull; ${inCount} Cadets Clearing-In &bull; Master Roll Live Synced (${att.reportDate || '07 1140H OCT 2026'})</span>
        </div>
      `);
    }

    // Duplicate array items once for seamless continuous loop in CSS translateX(-50%)
    const duplicatedHtml = [...items, ...items].join(`
      <span class="text-amber-400 font-bold select-none">&bull;</span>
    `);

    dom.dynamicTickerContent.innerHTML = duplicatedHtml;
  }

  // --- Backward Compatibility Wrapper ---
  async function syncScheduleOfCallsLive(showFeedback = false) {
    return performAutomated15MinSync(showFeedback);
  }

  // --- Calendar ---
  function renderCalendar() {
    if (!dom.calendarEventsGrid) return;
    dom.calendarEventsGrid.innerHTML = CCAFP_CONFIG.calendarEvents.map(ev => `
      <div class="bulletin-card stripe-blue p-5 space-y-2">
        <div class="flex items-center justify-between text-[11px] font-mono-clean">
          <span class="px-2 py-0.5 rounded font-bold badge-policy">${ev.category.toUpperCase()}</span>
          <span class="text-slate-400">${ev.date} &bull; ${ev.time}</span>
        </div>
        <h4 class="font-bold text-sm text-slate-900">${ev.title}</h4>
        <p class="text-xs text-slate-500">${ev.location}</p>
        <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span>Uniform:</span>
          <span class="font-semibold">${ev.dress}</span>
        </div>
      </div>
    `).join('');
    if (window.lucide) window.lucide.createIcons();
  }

  // --- Punishments ---
  function renderPunishments() {
    if (!dom.punishmentTableBody) return;
    const q = state.punishmentQuery.toLowerCase();
    const filtered = CCAFP_CONFIG.punishmentList.filter(item => {
      return item.cadetName.toLowerCase().includes(q) ||
             item.serialNo.toLowerCase().includes(q) ||
             item.offense.toLowerCase().includes(q);
    });

    dom.punishmentTableBody.innerHTML = filtered.map(item => `
      <tr class="hover:bg-slate-50/70 transition-colors">
        <td class="py-3 px-3 font-sans font-semibold text-slate-900">${item.cadetName}</td>
        <td class="py-3 px-2 text-slate-500">${item.serialNo}</td>
        <td class="py-3 px-2 text-slate-600">${item.class}</td>
        <td class="py-3 px-2 text-blue-700 font-semibold">${item.company} Coy</td>
        <td class="py-3 px-3 text-slate-700 font-sans">${item.offense}</td>
        <td class="py-3 px-2 text-center text-red-600 font-bold">${item.demerits}</td>
        <td class="py-3 px-2 text-center text-amber-600 font-bold">${item.tours}</td>
        <td class="py-3 px-3">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
            item.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
            'bg-amber-50 text-amber-800 border border-amber-200'
          }">${item.status}</span>
        </td>
      </tr>
    `).join('');
  }

  // --- Staff Directory ---
  function renderStaffDirectory() {
    if (!dom.staffDisplayContainer) return;
    const level = state.staffLevel;

    if (level === 'regiment') {
      dom.staffDisplayContainer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${CCAFP_CONFIG.staffDirectory.regiment.map(s => {
            const initial = s.name.replace(/^(CDT|CPT|LT|SGT|S\/SGT|F\/CPT|MAJ|1CL|2CL|3CL|4CL|\s)+/g, '').trim().charAt(0) || 'C';
            return `
              <div class="pma-cadet-card">
                <div class="pma-cadet-header">
                  <div class="pma-cadet-avatar">${initial}</div>
                  <div class="min-w-0 flex-1">
                    <span class="text-[10px] font-bold tracking-wider text-slate-400 uppercase block label-tracked">PMA CLASS ${s.class}</span>
                    <h4 class="font-extrabold text-base text-white tracking-tight leading-snug mt-0.5 uppercase truncate">${s.name}</h4>
                    <div class="flex items-center gap-1.5 mt-2">
                      <span class="pma-cadet-badge">${s.company} Coy</span>
                      <span class="pma-cadet-badge">${s.badge || 'Staff'}</span>
                    </div>
                  </div>
                </div>
                <div class="pma-cadet-body">
                  <div class="pma-cadet-field">
                    <span class="text-[11px] font-medium text-slate-400 block">Appointment</span>
                    <span class="font-bold text-sm text-slate-900 block mt-0.5 leading-snug">${s.role}</span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else if (level === 'battalion') {
      dom.staffDisplayContainer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${CCAFP_CONFIG.staffDirectory.battalion.map(b => `
            <div class="bulletin-card stripe-amber p-5 space-y-3">
              <h4 class="font-bold text-base text-blue-950 pb-2 border-b border-slate-100">${b.battalion}</h4>
              <div class="text-xs space-y-2">
                <div><span class="text-slate-400 block text-[10px] uppercase font-semibold">Commander</span><span class="font-bold text-slate-800">${b.cmdr}</span></div>
                <div><span class="text-slate-400 block text-[10px] uppercase font-semibold">ExO</span><span class="font-semibold text-slate-800">${b.exo}</span></div>
                <div><span class="text-slate-400 block text-[10px] uppercase font-semibold">Adjutant</span><span class="font-semibold text-slate-800">${b.adjutant}</span></div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (level === 'companies') {
      dom.staffDisplayContainer.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${CCAFP_CONFIG.staffDirectory.companies.map(c => `
            <div class="bulletin-card stripe-emerald p-4 space-y-2">
              <h4 class="font-bold text-sm text-blue-900 border-b border-slate-100 pb-1">${c.name}</h4>
              <div class="text-xs space-y-1">
                <div><span class="text-slate-400 block text-[10px]">Commander:</span><span class="font-semibold">${c.cmdr}</span></div>
                <div><span class="text-slate-400 block text-[10px]">ExO:</span><span class="font-semibold">${c.exo}</span></div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  // --- Automated 15-Minute Google Sheets Sync Engine ---
  async function performAutomated15MinSync(isManual = false) {
    if (state.isSyncing) return;
    state.isSyncing = true;

    // Reset countdown timer on manual user action
    if (isManual) {
      autoSyncCountdownSeconds = AUTO_SYNC_INTERVAL_SECONDS;
      updateCountdownDisplay();
    }

    if (dom.manualSyncBtn) {
      dom.manualSyncBtn.querySelector('i')?.classList.add('animate-spin');
    }
    if (dom.socSyncBtn) {
      dom.socSyncBtn.querySelector('i')?.classList.add('animate-spin');
    }
    if (dom.liveFeedStatusText) {
      dom.liveFeedStatusText.textContent = 'CHECKING SHEETS...';
    }

    if (isManual) {
      showToast('Checking Google Sheets for updates in the past 15 minutes...', 'info');
    }

    try {
      const schedUrl = syncManager.getLink('s1_schedule') || (typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS.s1_schedule : '');
      const dispUrl = syncManager.getLink('s1_disposition') || (typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS.s1_disposition : '');
      const armoryUrl = syncManager.getLink('s1_armory') || (typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS.s1_armory : '');
      const attachUrl = syncManager.getLink('s1_attachment') || (typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS.s1_attachment : '');

      // Concurrently fetch all 4 S1 sheets with cache busting
      const [schedRes, dispRes, armoryRes, attachRes] = await Promise.allSettled([
        syncManager.fetchLiveCSV(schedUrl),
        syncManager.fetchLiveCSV(dispUrl),
        syncManager.fetchLiveCSV(armoryUrl),
        syncManager.fetchLiveCSV(attachUrl)
      ]);

      const oldDataSnapshot = JSON.parse(JSON.stringify(CCAFP_CONFIG.s1Data || {}));
      let hasNewData = false;

      // 1. SCHEDULE OF CALLS
      if (schedRes.status === 'fulfilled' && schedRes.value && schedRes.value.length > 0) {
        const parsed = syncManager.parseScheduleOfCalls(schedRes.value);
        if (parsed) {
          CCAFP_CONFIG.s1Data.scheduleOfCalls = parsed;
          hasNewData = true;
        }
      }

      // 2. DISPOSITION
      if (dispRes.status === 'fulfilled' && dispRes.value && dispRes.value.length > 0) {
        const parsed = syncManager.parseDisposition(dispRes.value);
        if (parsed) {
          CCAFP_CONFIG.s1Data.disposition = parsed;
          hasNewData = true;
        }
      }

      // 3. ARMORY
      if (armoryRes.status === 'fulfilled' && armoryRes.value && armoryRes.value.length > 0) {
        const parsed = syncManager.parseArmory(armoryRes.value);
        if (parsed) {
          CCAFP_CONFIG.s1Data.armory = parsed;
          hasNewData = true;
        }
      }

      // 4. ATTACHMENT
      if (attachRes.status === 'fulfilled' && attachRes.value && attachRes.value.length > 0) {
        const parsed = syncManager.parseAttachment(attachRes.value);
        if (parsed) {
          CCAFP_CONFIG.s1Data.attachment = parsed;
          hasNewData = true;
        }
      }

      // Also check other councils if any URL is provided
      for (const council of (CCAFP_CONFIG.councils || [])) {
        const link = syncManager.getLink(council.id);
        if (link && link.startsWith('http')) {
          const data = await syncManager.fetchLiveCSV(link);
          if (data && data.length > 0) {
            state.liveCache[council.id] = data;
          }
        }
      }

      const isFirstRun = !state.hasCompletedInitialSync;
      state.hasCompletedInitialSync = true;

      if (hasNewData) {
        const changedSections = detectChangedSections(oldDataSnapshot, CCAFP_CONFIG.s1Data);

        // Persist fresh data snapshot into localStorage
        saveLiveSnapshotToStorage();

        // Re-render all views
        renderScheduleOfCallsView();
        renderS1Data();
        updateMarqueeTicker();
        updateHeroStats();

        if (state.currentTab === 'council') {
          const council = CCAFP_CONFIG.councils.find(c => c.id === state.activeCouncilId);
          if (council) renderActiveCouncilView(council);
        }

        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (dom.socSyncStatusBadge) {
          dom.socSyncStatusBadge.innerHTML = `
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 live-beacon"></span>
            <span>LIVE SHEET SYNCED (${timeStr})</span>
          `;
        }

        if (dom.liveFeedStatusText) {
          dom.liveFeedStatusText.textContent = `LIVE FEED (${timeStr})`;
        }

        // Notify user about detected changes
        if (changedSections.length > 0) {
          if (!isFirstRun || isManual) {
            showToast(`⚡ Live Sheet Updates Detected: ${changedSections.join(', ')} automatically updated!`, 'success');
          }
        } else if (isManual) {
          showToast('✓ Google Sheets verified: All data is up to date (no changes in past 15 min).', 'info');
        }
      } else {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (dom.liveFeedStatusText) {
          dom.liveFeedStatusText.textContent = `LIVE FEED (${timeStr})`;
        }
        if (isManual) {
          showToast('✓ Connected to Google Sheets: Current records are verified.', 'info');
        }
      }
    } catch (err) {
      console.warn('Error during automated 15-minute sync:', err);
      if (isManual) {
        showToast('Using cached records (Google Sheets momentarily unreachable).', 'info');
      }
    } finally {
      state.isSyncing = false;
      if (dom.manualSyncBtn) {
        dom.manualSyncBtn.querySelector('i')?.classList.remove('animate-spin');
      }
      if (dom.socSyncBtn) {
        dom.socSyncBtn.querySelector('i')?.classList.remove('animate-spin');
      }
      updateTime();
    }
  }

  const performLiveSync = performAutomated15MinSync;

  // --- Toast ---
  function showToast(message, type = 'info') {
    if (!dom.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'flex items-center gap-2.5 px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-xl text-xs font-semibold text-slate-800 pointer-events-auto transition-all transform duration-200';
    toast.innerHTML = `
      <span class="text-blue-600 font-bold">•</span>
      <span>${message}</span>
    `;
    dom.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(6px)';
      setTimeout(() => toast.remove(), 200);
    }, 3000);
  }

  // --- Setup Event Listeners ---
  function setupEventListeners() {
    if (dom.openSidebarBtn) dom.openSidebarBtn.addEventListener('click', openMobileSidebar);
    if (dom.sidebarOverlay) dom.sidebarOverlay.addEventListener('click', closeMobileSidebar);

    dom.sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
        const tab = link.getAttribute('data-tab');
        const council = link.getAttribute('data-council-select');
        if (council) {
          selectCouncil(council);
        } else if (tab) {
          navigateToTab(tab);
        }
      });
    });

    // S1 Subtabs
    dom.s1SubTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const subTab = btn.getAttribute('data-s1-tab');
        if (subTab) switchS1SubTab(subTab);
      });
    });

    // S1 Attachment Category Pills
    document.querySelectorAll('.attachment-cat-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.attachment-cat-pill').forEach(p => {
          p.className = 'attachment-cat-pill px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200';
        });
        pill.className = 'attachment-cat-pill active-pill px-3 py-1 rounded-lg bg-blue-900 text-white font-semibold';
        state.s1AttachmentCat = pill.getAttribute('data-cat') || 'all';
        renderS1Attachment();
      });
    });

    // S1 Attachment Search
    if (dom.s1AttachmentSearch) {
      dom.s1AttachmentSearch.addEventListener('input', (e) => {
        state.s1AttachmentQuery = e.target.value;
        renderS1Attachment();
      });
    }

    // S1 Staff Category Pills
    document.querySelectorAll('.staff-category-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.staff-category-pill').forEach(p => {
          p.className = 'staff-category-pill px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200';
        });
        pill.className = 'staff-category-pill active-pill px-3 py-1 rounded-lg bg-blue-900 text-white font-semibold';
        state.s1StaffCat = pill.getAttribute('data-staff-cat') || 'all';
        renderS1RegimentStaff();
      });
    });

    // S1 Staff Search
    if (dom.s1StaffSearch) {
      dom.s1StaffSearch.addEventListener('input', (e) => {
        state.s1StaffQuery = e.target.value;
        renderS1RegimentStaff();
      });
    }

    // Schedule of Calls (SOC) Listeners
    if (dom.socGuardSearch) {
      dom.socGuardSearch.addEventListener('input', (e) => {
        state.socGuardQuery = e.target.value;
        renderScheduleOfCallsView();
      });
    }

    if (dom.socCallsSearch) {
      dom.socCallsSearch.addEventListener('input', (e) => {
        state.socCallsQuery = e.target.value;
        renderScheduleOfCallsView();
      });
    }

    if (dom.socSyncBtn) {
      dom.socSyncBtn.addEventListener('click', () => {
        performAutomated15MinSync(true);
      });
    }

    // General Council Click Handler
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-council-select]');
      if (btn) {
        const id = btn.getAttribute('data-council-select');
        selectCouncil(id);
      }
    });

    // Reactions Click Handler (Hearts & Zaps)
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.reaction-btn');
      if (btn) {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const type = btn.getAttribute('data-type');
        const bulletin = CCAFP_CONFIG.priorityBulletins.find(b => b.id === id);
        if (bulletin && bulletin.reactions) {
          bulletin.reactions[type] = (bulletin.reactions[type] || 0) + 1;
          const countSpan = btn.querySelector('.reaction-count');
          if (countSpan) countSpan.textContent = bulletin.reactions[type];
        }
      }
    });

    // Staff Tabs
    dom.staffTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        dom.staffTabs.forEach(t => {
          t.classList.remove('active-pill', 'bg-blue-900', 'text-white');
          t.classList.add('text-slate-600', 'hover:bg-slate-100');
        });
        tab.classList.add('active-pill', 'bg-blue-900', 'text-white');
        tab.classList.remove('text-slate-600', 'hover:bg-slate-100');
        state.staffLevel = tab.getAttribute('data-level');
        renderStaffDirectory();
      });
    });

    // Punishment Search
    if (dom.punishmentSearchInput) {
      dom.punishmentSearchInput.addEventListener('input', (e) => {
        state.punishmentQuery = e.target.value;
        renderPunishments();
      });
    }

    // Manual Refresh
    if (dom.manualSyncBtn) {
      dom.manualSyncBtn.addEventListener('click', () => performAutomated15MinSync(true));
    }
  }

  // --- Bootstrap Initialization ---
  function init() {
    updateTime();
    setInterval(updateTime, 1000);

    // 1. Restore cached state from previous 15-minute sync if available
    restoreLiveSnapshotFromStorage();

    // 2. Render all initial views with loaded/cached data
    renderSidebarCouncils();
    renderPriorityBulletins();
    renderS1Data();
    renderScheduleOfCallsView();
    updateMarqueeTicker();
    updateHeroStats();
    renderCalendar();
    renderPunishments();
    renderStaffDirectory();
    setupEventListeners();

    // 3. Start 15-Minute Countdown Timer
    startAutoSync15MinTimer();

    // 4. Perform immediate live check in the background
    performAutomated15MinSync(false);

    if (window.lucide) window.lucide.createIcons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
