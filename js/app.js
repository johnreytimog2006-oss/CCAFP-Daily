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
    s1ExpandedQuery: '',
    s1ExpandedCoy: 'all',
    s1RosterQuery: '',
    s1RosterClass: 'all',
    s1SquadActive: '1ST SQUAD',
    s1ApeQuery: '',
    s1ApeClass: 'all',
    s1ClubsQuery: '',
    s1TinQuery: '',
    spiritualQuery: '',
    spiritualReligion: 'all',
    spiritualCoy: 'all',
    socGuardQuery: '',
    socCallsQuery: '',
    activeCouncilId: 's1',
    liveCache: {},
    staffLevel: 'regiment',
    punishmentQuery: '',
    punishCoy: 'all',
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
    // S1 New Extended Sub-Panes
    s1ExpandedSearchInput: document.getElementById('s1ExpandedSearchInput'),
    s1ExpandedTableBody: document.getElementById('s1ExpandedTableBody'),
    s1RosterSearchInput: document.getElementById('s1RosterSearchInput'),
    s1RosterTableBody: document.getElementById('s1RosterTableBody'),
    s1SquadGridContainer: document.getElementById('s1SquadGridContainer'),
    s1ApeSearchInput: document.getElementById('s1ApeSearchInput'),
    s1ApeTableBody: document.getElementById('s1ApeTableBody'),
    s1ClubsSearchInput: document.getElementById('s1ClubsSearchInput'),
    s1ClubsTableBody: document.getElementById('s1ClubsTableBody'),
    s1TinSearchInput: document.getElementById('s1TinSearchInput'),
    s1TinTableBody: document.getElementById('s1TinTableBody'),
    s1SheetSelector: document.getElementById('s1SheetSelector'),
    s1SheetIframe: document.getElementById('s1SheetIframe'),
    s1SheetExternalLink: document.getElementById('s1SheetExternalLink'),
    // RSO View (HTG Armory)
    rsoSyncBadge: document.getElementById('rsoSyncBadge'),
    rsoSyncBtn: document.getElementById('rsoSyncBtn'),
    rsoReportDateBadge: document.getElementById('rsoReportDateBadge'),
    armoryPreparedBy: document.getElementById('armoryPreparedBy'),
    armoryCheckedBy: document.getElementById('armoryCheckedBy'),
    armoryNotedBy: document.getElementById('armoryNotedBy'),
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
    // Punishment View (CCPB)
    punishDateBadge: document.getElementById('punishDateBadge'),
    punishSyncBadge: document.getElementById('punishSyncBadge'),
    punishSyncBtn: document.getElementById('punishSyncBtn'),
    punishTouringCount: document.getElementById('punishTouringCount'),
    punishConfinedCount: document.getElementById('punishConfinedCount'),
    punishActiveCount: document.getElementById('punishActiveCount'),
    punishChairman: document.getElementById('punishChairman'),
    punishNotedBy: document.getElementById('punishNotedBy'),
    punishmentTableBody: document.getElementById('punishmentTableBody'),
    punishmentSearchInput: document.getElementById('punishmentSearchInput'),
    // Council View
    activeCouncilTag: document.getElementById('activeCouncilTag'),
    activeCouncilTitle: document.getElementById('activeCouncilTitle'),
    activeCouncilDesc: document.getElementById('activeCouncilDesc'),
    councilDynamicContainer: document.getElementById('councilDynamicContainer'),
    // Theme Switcher
    toggleDarkBtn: document.getElementById('toggleDarkBtn'),
    darkBtnText: document.getElementById('darkBtnText'),
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
        s1Data: CCAFP_CONFIG.s1Data,
        spiritualData: CCAFP_CONFIG.spiritualData,
        punishmentList: CCAFP_CONFIG.punishmentList,
        punishmentTotals: CCAFP_CONFIG.punishmentTotals,
        punishmentMeta: CCAFP_CONFIG.punishmentMeta
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
      if (parsed) {
        if (!CCAFP_CONFIG.s1Data) CCAFP_CONFIG.s1Data = {};
        if (parsed.s1Data) {
          if (parsed.s1Data.scheduleOfCalls) CCAFP_CONFIG.s1Data.scheduleOfCalls = parsed.s1Data.scheduleOfCalls;
          if (parsed.s1Data.disposition) CCAFP_CONFIG.s1Data.disposition = parsed.s1Data.disposition;
          if (parsed.s1Data.armory) CCAFP_CONFIG.s1Data.armory = parsed.s1Data.armory;
          if (parsed.s1Data.attachment) CCAFP_CONFIG.s1Data.attachment = parsed.s1Data.attachment;
          if (parsed.s1Data.regimentStaff) CCAFP_CONFIG.s1Data.regimentStaff = parsed.s1Data.regimentStaff;
          if (parsed.s1Data.expanded) CCAFP_CONFIG.s1Data.expanded = parsed.s1Data.expanded;
          if (parsed.s1Data.roster) CCAFP_CONFIG.s1Data.roster = parsed.s1Data.roster;
          if (parsed.s1Data.squads) CCAFP_CONFIG.s1Data.squads = parsed.s1Data.squads;
          if (parsed.s1Data.clubs) CCAFP_CONFIG.s1Data.clubs = parsed.s1Data.clubs;
          if (parsed.s1Data.tin) CCAFP_CONFIG.s1Data.tin = parsed.s1Data.tin;
          if (parsed.s1Data.ape) CCAFP_CONFIG.s1Data.ape = parsed.s1Data.ape;
        }
        if (parsed.spiritualData) CCAFP_CONFIG.spiritualData = parsed.spiritualData;
        if (parsed.punishmentList) CCAFP_CONFIG.punishmentList = parsed.punishmentList;
        if (parsed.punishmentTotals) CCAFP_CONFIG.punishmentTotals = parsed.punishmentTotals;
        if (parsed.punishmentMeta) CCAFP_CONFIG.punishmentMeta = parsed.punishmentMeta;
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
        changed.push('Cadet Attachments');
      }

      const oldExp = JSON.stringify(oldData.expanded || []);
      const newExp = JSON.stringify(newData.expanded || []);
      if (oldExp !== newExp) {
        changed.push('Expanded Roll');
      }

      const oldRost = JSON.stringify(oldData.roster || []);
      const newRost = JSON.stringify(newData.roster || []);
      if (oldRost !== newRost) {
        changed.push('Class Roster');
      }

      const oldClubs = JSON.stringify(oldData.clubs || []);
      const newClubs = JSON.stringify(newData.clubs || []);
      if (oldClubs !== newClubs) {
        changed.push('Clubs & Orgs');
      }

      const oldTin = JSON.stringify(oldData.tin || []);
      const newTin = JSON.stringify(newData.tin || []);
      if (oldTin !== newTin) {
        changed.push('TIN & PhilHealth');
      }

      const oldApe = JSON.stringify(oldData.ape || []);
      const newApe = JSON.stringify(newData.ape || []);
      if (oldApe !== newApe) {
        changed.push('APE Medical');
      }

      const oldPun = JSON.stringify(oldData.punishmentList || []);
      const newPun = JSON.stringify(CCAFP_CONFIG.punishmentList || []);
      if (oldPun !== newPun) {
        changed.push('Punishments');
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
  function navigateToTab(tabId, breadcrumbName = null) {
    state.currentTab = tabId;

    // 1. Update Sidebar Active Pills across ALL sidebar links (both static & dynamic)
    const allSidebarLinks = document.querySelectorAll('.sidebar-link');
    allSidebarLinks.forEach(link => {
      link.classList.remove('active-pill');
      const target = link.getAttribute('data-tab');
      const councilTarget = link.getAttribute('data-council-select');

      let isActive = false;
      if (tabId === 'council') {
        isActive = (councilTarget === state.activeCouncilId);
      } else if (tabId === 's1') {
        isActive = (target === 's1' || councilTarget === 's1');
      } else if (tabId === 'rso') {
        isActive = (target === 'rso' || councilTarget === 'rso');
      } else if (tabId === 'honor') {
        isActive = (target === 'honor' || councilTarget === 'honor');
      } else if (tabId === 'punishments') {
        isActive = (target === 'punishments' || councilTarget === 'ccpb');
      } else {
        isActive = (target === tabId);
      }

      if (isActive) {
        link.classList.add('active-pill');
      }
    });

    // 2. If navigating to council view without an active council or coming from s1/rso/honor/ccpb, pick a valid council
    if (tabId === 'council') {
      if (!state.activeCouncilId || state.activeCouncilId === 's1' || state.activeCouncilId === 'rso' || state.activeCouncilId === 'honor' || state.activeCouncilId === 'ccpb' || state.activeCouncilId === 'council') {
        state.activeCouncilId = 's2';
      }
      const c = (CCAFP_CONFIG.councils || []).find(x => x.id === state.activeCouncilId) || (CCAFP_CONFIG.councils && CCAFP_CONFIG.councils[1]);
      if (c) {
        renderActiveCouncilView(c);
        if (!breadcrumbName) breadcrumbName = c.name.toUpperCase();
      }
    }

    // 3. Toggle Panes dynamically querying all .tab-pane elements
    const allPanes = document.querySelectorAll('.tab-pane');
    allPanes.forEach(pane => {
      if (pane.id === `view-${tabId}`) {
        pane.classList.remove('hidden');
      } else {
        pane.classList.add('hidden');
      }
    });

    // 4. Update Breadcrumb
    const labels = {
      home: 'HOME',
      s1: 'S1 PERSONNEL',
      rso: 'RSO COUNCIL',
      staff: 'CADET STAFF',
      duty: 'SCHEDULE OF CALLS (SOC)',
      calendar: 'EVENT CALENDAR',
      honor: 'HONOR COMMITTEE',
      punishments: 'PUNISHMENT REGISTER (CCPB)',
      council: breadcrumbName || 'COUNCILS DIRECTORY'
    };
    if (dom.activeBreadcrumb) {
      dom.activeBreadcrumb.textContent = labels[tabId] || (breadcrumbName ? breadcrumbName.toUpperCase() : 'BULLETIN');
    }

    if (tabId === 'rso') {
      renderRsoArmory();
    } else if (tabId === 'punishments') {
      renderPunishments();
    }

    closeMobileSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  window.navigateToTab = navigateToTab;

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

    if (tabName === 'expanded') renderS1Expanded();
    else if (tabName === 'roster') renderS1Roster();
    else if (tabName === 'squads') renderS1Squads();
    else if (tabName === 'ape') renderS1Ape();
    else if (tabName === 'clubs') renderS1Clubs();
    else if (tabName === 'tin') renderS1Tin();
    else if (tabName === 'attachment') renderS1Attachment();
    else if (tabName === 'regiment-staff') renderS1RegimentStaff();
    else if (tabName === 'sheetview') initS1SheetViewer();

    if (window.lucide) window.lucide.createIcons();
  }

  // --- Render S1 Sub-Sections Data ---
  function renderS1Data() {
    renderS1Disposition();
    renderS1Expanded();
    renderS1Roster();
    renderS1Squads();
    renderS1Ape();
    renderS1Clubs();
    renderS1Tin();
    renderS1Attachment();
    renderS1RegimentStaff();
    initS1SheetViewer();
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

  // 2. ARMORY & RSO RENDERER
  function renderS1Armory() {
    if (!dom.s1ArmoryTableBody) return;
    const arm = CCAFP_CONFIG.s1Data?.armory;
    if (!arm || !arm.rows) return;
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
        <td class="py-2.5 px-2 text-center text-blue-900 font-bold">${arm.totals?.m14In || 831} <span class="text-blue-700 font-normal">(${arm.totals?.m14Mag || 818})</span></td>
        <td class="py-2.5 px-2 text-center">${arm.totals?.m16In || 342}</td>
        <td class="py-2.5 px-2 text-center">${arm.totals?.r4In || 130}</td>
        <td class="py-2.5 px-2 text-center text-amber-700">${arm.totals?.m1GarandIn || 21}</td>
        <td class="py-2.5 px-2 text-center text-emerald-700">${arm.totals?.pistol9mmIn || 13}</td>
        <td class="py-2.5 px-2 text-center text-amber-800">${arm.totals?.swordsIn || 38}</td>
        <td class="py-2.5 px-2 text-center text-amber-800">${arm.totals?.bayonetsIn || 51}</td>
        <td class="py-2.5 px-3 text-slate-600 text-[11px]">Full Inspection Verified by RSO</td>
      </tr>
    `;

    renderRsoArmoryCardsAndSignatures(arm);
  }

  function renderRsoArmoryCardsAndSignatures(arm) {
    if (!arm) return;

    // Update Totals Badges
    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    if (arm.totals) {
      setVal('armoryM14Tot', arm.totals.m14In || 831);
      setVal('armoryM14MagTot', `${arm.totals.m14Mag || 818} MAG`);
      setVal('armoryM16Tot', arm.totals.m16In || 342);
      setVal('armoryR4Tot', arm.totals.r4In || 130);
      setVal('armoryPistolTot', arm.totals.pistol9mmIn || 13);
      setVal('armoryGarandTot', arm.totals.m1GarandIn || 21);
      setVal('armoryK3Tot', arm.totals.k3In || 2);
      setVal('armorySwordsTot', arm.totals.swordsIn || 38);
      setVal('armoryBayonetsTot', arm.totals.bayonetsIn || 51);
    }

    if (arm.reportDate) {
      setVal('rsoReportDateBadge', arm.reportDate);
    }

    // Dynamic Verification Signatures (Always Real-Time)
    const prep = arm.signatures?.preparedBy || (typeof arm.signOff?.preparedBy === 'string' ? arm.signOff.preparedBy : "CDT LT 1CL JHOPRILYN S MANGAGOM C-27151 (Officer-of-the-Day)");
    const chk = arm.signatures?.checkedBy || (typeof arm.signOff?.checkedBy === 'string' ? arm.signOff.checkedBy : "CARL BENEDICT B ACOSTA C-26007 (AC of RS for Supply / RSO)");
    let noted = arm.signatures?.notedBy;
    if (!noted && arm.signOff?.notedBy) {
      noted = Array.isArray(arm.signOff.notedBy) ? arm.signOff.notedBy.join(' • ') : arm.signOff.notedBy;
    }
    if (!noted || noted.includes("GIRON")) {
      noted = "MAJ JAMES A MARTINEZ PA (Officer-in-Charge)";
    }

    const prepEl = document.getElementById('armoryPreparedBy');
    if (prepEl) prepEl.textContent = prep;
    const chkEl = document.getElementById('armoryCheckedBy');
    if (chkEl) chkEl.textContent = chk;
    const notedEl = document.getElementById('armoryNotedBy');
    if (notedEl) notedEl.textContent = noted;
  }

  function renderRsoArmory() {
    renderS1Armory();
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

  // 6. EXPANDED ROLL RENDERER (326 CADETS)
  function renderS1Expanded() {
    if (!dom.s1ExpandedTableBody) return;
    const list = CCAFP_CONFIG.s1Data?.expanded || (window.S1_SPIRITUAL_DATA && window.S1_SPIRITUAL_DATA.expanded) || [];
    const q = (state.s1ExpandedQuery || '').toLowerCase().trim();
    const coyFilter = state.s1ExpandedCoy || 'all';

    const filtered = list.filter(item => {
      if (coyFilter !== 'all' && (item.coy || '').toUpperCase() !== coyFilter.toUpperCase()) {
        return false;
      }
      if (!q) return true;
      return (item.name || '').toLowerCase().includes(q) ||
             (item.sn || '').toLowerCase().includes(q) ||
             (item.designation || '').toLowerCase().includes(q) ||
             (item.religion || '').toLowerCase().includes(q) ||
             (item.region || '').toLowerCase().includes(q) ||
             (item.bos || '').toLowerCase().includes(q) ||
             (item.contact || '').toLowerCase().includes(q);
    });

    if (filtered.length === 0) {
      dom.s1ExpandedTableBody.innerHTML = `
        <tr>
          <td colspan="12" class="py-8 text-center text-slate-400 font-mono-clean text-xs">
            No matching cadets found in Master Expanded Roll.
          </td>
        </tr>
      `;
      return;
    }

    const bosBadge = (bos) => {
      const b = (bos || '').toUpperCase();
      if (b.includes('PA') && !b.includes('PAF')) return '<span class="px-2 py-0.5 rounded font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">PA</span>';
      if (b.includes('PAF')) return '<span class="px-2 py-0.5 rounded font-bold bg-blue-50 text-blue-800 border border-blue-200">PAF</span>';
      if (b.includes('PN')) return '<span class="px-2 py-0.5 rounded font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">PN</span>';
      return `<span class="px-2 py-0.5 rounded font-bold bg-slate-100 text-slate-700">${b || '-'}</span>`;
    };

    dom.s1ExpandedTableBody.innerHTML = filtered.map((c, idx) => `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="py-2.5 px-2 text-slate-400 text-[11px]">${idx + 1}</td>
        <td class="py-2.5 px-3 font-semibold text-slate-900">${c.name || '-'}</td>
        <td class="py-2.5 px-2 text-blue-900 font-bold text-[11px]">${c.sn || '-'}</td>
        <td class="py-2.5 px-2 font-bold text-slate-800">${c.coy || '-'}</td>
        <td class="py-2.5 px-2 text-slate-600 text-[11px]">${c.platoon || '-'} / ${c.squad || '-'}</td>
        <td class="py-2.5 px-3 text-slate-700 font-medium text-[11px]">${c.designation || '-'}</td>
        <td class="py-2.5 px-2">${bosBadge(c.bos)}</td>
        <td class="py-2.5 px-2 font-bold ${c.gender === 'F' ? 'text-rose-600' : 'text-slate-700'}">${c.gender || '-'}</td>
        <td class="py-2.5 px-2"><span class="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-100">${c.blood || '-'}</span></td>
        <td class="py-2.5 px-3 text-slate-600 text-[11px] truncate max-w-[150px]" title="${c.religion || ''}">${c.religion || '-'}</td>
        <td class="py-2.5 px-2 text-slate-600 text-[11px]">${c.region || '-'}</td>
        <td class="py-2.5 px-3 text-slate-600 text-[11px]">${c.contact || '—'}</td>
      </tr>
    `).join('');
  }

  // 7. CLASS ROSTER RENDERER (374 CADETS)
  function renderS1Roster() {
    if (!dom.s1RosterTableBody) return;
    const list = CCAFP_CONFIG.s1Data?.roster || (window.S1_SPIRITUAL_DATA && window.S1_SPIRITUAL_DATA.roster) || [];
    const q = (state.s1RosterQuery || '').toLowerCase().trim();
    const classFilter = state.s1RosterClass || 'all';

    const filtered = list.filter(item => {
      if (classFilter !== 'all' && (item.class || '').toUpperCase() !== classFilter.toUpperCase()) {
        return false;
      }
      if (!q) return true;
      return (item.name || '').toLowerCase().includes(q) ||
             (item.sn || '').toLowerCase().includes(q) ||
             (item.coy || '').toLowerCase().includes(q);
    });

    if (filtered.length === 0) {
      dom.s1RosterTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="py-8 text-center text-slate-400 font-mono-clean text-xs">
            No cadets found in Class Roster matching criteria.
          </td>
        </tr>
      `;
      return;
    }

    const classBadge = (cls) => {
      const c = (cls || '').toUpperCase();
      if (c === '1CL') return '<span class="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold">1CL (2027)</span>';
      if (c === '2CL') return '<span class="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-bold">2CL (2028)</span>';
      if (c === '3CL') return '<span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">3CL (2029)</span>';
      if (c === '4CL') return '<span class="px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200 font-bold">4CL (2030)</span>';
      return `<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700">${c}</span>`;
    };

    dom.s1RosterTableBody.innerHTML = filtered.map((c, idx) => `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="py-2.5 px-2 text-slate-400 text-[11px]">${idx + 1}</td>
        <td class="py-2.5 px-2">${classBadge(c.class)}</td>
        <td class="py-2.5 px-3 font-semibold text-slate-900">${c.name || '-'}</td>
        <td class="py-2.5 px-3 text-blue-900 font-bold text-[11px]">${c.sn || '-'}</td>
        <td class="py-2.5 px-2 font-bold ${c.gender === 'F' ? 'text-rose-600' : 'text-slate-700'}">${c.gender || '-'}</td>
        <td class="py-2.5 px-2 font-bold text-slate-800">${c.coy ? `${c.coy} CO` : '-'}</td>
      </tr>
    `).join('');
  }

  // 8. SQUAD ORGANIZATION MATRIX RENDERER
  function renderS1Squads() {
    if (!dom.s1SquadGridContainer) return;
    const squads = CCAFP_CONFIG.s1Data?.squads || (window.S1_SPIRITUAL_DATA && window.S1_SPIRITUAL_DATA.squads) || {};
    const activeSquadKey = state.s1SquadActive || '1ST SQUAD';
    const activeSquad = squads[activeSquadKey] || { p1: [], p2: [], p3: [], p4: [] };

    const platoons = [
      { id: 'p1', name: '1ST PLATOON', members: activeSquad.p1 || [], border: 'stripe-blue', dot: 'bg-blue-600' },
      { id: 'p2', name: '2ND PLATOON', members: activeSquad.p2 || [], border: 'stripe-red', dot: 'bg-red-600' },
      { id: 'p3', name: '3RD PLATOON', members: activeSquad.p3 || [], border: 'stripe-emerald', dot: 'bg-emerald-600' },
      { id: 'p4', name: '4TH PLATOON', members: activeSquad.p4 || [], border: 'stripe-amber', dot: 'bg-amber-600' }
    ];

    dom.s1SquadGridContainer.innerHTML = platoons.map(p => `
      <div class="bulletin-card ${p.border} p-4 space-y-3">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full ${p.dot}"></span>
            <h4 class="font-bold text-xs text-slate-900 uppercase font-mono-clean">${p.name}</h4>
          </div>
          <span class="text-[10px] font-bold font-mono-clean px-2 py-0.5 rounded bg-slate-100 text-slate-600">${p.members.length} Cadets</span>
        </div>
        <div class="space-y-1.5 max-h-[480px] overflow-y-auto pr-1">
          ${p.members.map((m, idx) => {
            const is1CL = m.startsWith('1CL');
            const is2CL = m.startsWith('2CL');
            const badge = is1CL 
              ? '<span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">1CL</span>'
              : (is2CL ? '<span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">2CL</span>' : '<span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">CDT</span>');
            return `
              <div class="flex items-center justify-between p-2 rounded-xl bg-slate-50/80 hover:bg-slate-100 text-xs font-mono-clean transition-colors">
                <span class="text-slate-400 text-[10px] w-5">${idx + 1}.</span>
                <span class="font-semibold text-slate-800 flex-1 truncate ml-1">${m}</span>
                ${badge}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `).join('');
  }

  // 9. APE MEDICAL MONITORING RENDERER (108 CADETS)
  function renderS1Ape() {
    if (!dom.s1ApeTableBody) return;
    const list = CCAFP_CONFIG.s1Data?.ape || (window.S1_SPIRITUAL_DATA && window.S1_SPIRITUAL_DATA.ape) || [];
    const q = (state.s1ApeQuery || '').toLowerCase().trim();
    const classFilter = state.s1ApeClass || 'all';

    const filtered = list.filter(item => {
      if (classFilter !== 'all' && (item.class || '').toUpperCase() !== classFilter.toUpperCase()) {
        return false;
      }
      if (!q) return true;
      return (item.name || '').toLowerCase().includes(q) ||
             (item.sn || '').toLowerCase().includes(q) ||
             (item.remarks || '').toLowerCase().includes(q);
    });

    if (filtered.length === 0) {
      dom.s1ApeTableBody.innerHTML = `
        <tr>
          <td colspan="10" class="py-8 text-center text-slate-400 font-mono-clean text-xs">
            No APE medical records matching criteria.
          </td>
        </tr>
      `;
      return;
    }

    const checkIcon = (val) => {
      const isDone = String(val).toUpperCase() === 'TRUE';
      return isDone
        ? '<span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">✓</span>'
        : '<span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-400 text-xs">✕</span>';
    };

    dom.s1ApeTableBody.innerHTML = filtered.map((c, idx) => `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="py-2.5 px-2 text-slate-400 text-[11px]">${idx + 1}</td>
        <td class="py-2.5 px-2 font-bold ${c.class === '1CL' ? 'text-amber-700' : 'text-blue-700'}">${c.class}</td>
        <td class="py-2.5 px-3 font-semibold text-slate-900">${c.name || '-'}</td>
        <td class="py-2.5 px-3 text-blue-900 font-bold text-[11px]">${c.sn || '-'}</td>
        <td class="py-2.5 px-2 text-center">${checkIcon(c.urinalysis)}</td>
        <td class="py-2.5 px-2 text-center">${checkIcon(c.blood)}</td>
        <td class="py-2.5 px-2 text-center">${checkIcon(c.vitals)}</td>
        <td class="py-2.5 px-2 text-center">${checkIcon(c.dental)}</td>
        <td class="py-2.5 px-2 text-center">${checkIcon(c.physical)}</td>
        <td class="py-2.5 px-3">
          <span class="px-2 py-0.5 rounded text-[11px] font-bold ${c.remarks?.includes('Pending') ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'}">
            ${c.remarks || 'In Progress'}
          </span>
        </td>
      </tr>
    `).join('');
  }

  // 10. CLUBS & ORGANIZATIONS RENDERER (74 CLUBS)
  function renderS1Clubs() {
    if (!dom.s1ClubsTableBody) return;
    const list = CCAFP_CONFIG.s1Data?.clubs || (window.S1_SPIRITUAL_DATA && window.S1_SPIRITUAL_DATA.clubs) || [];
    const q = (state.s1ClubsQuery || '').toLowerCase().trim();

    const filtered = list.filter(item => {
      if (!q) return true;
      return (item.name || '').toLowerCase().includes(q) ||
             (item.cic || '').toLowerCase().includes(q) ||
             (item.acic || '').toLowerCase().includes(q) ||
             (item.oic || '').toLowerCase().includes(q) ||
             (item.venue || '').toLowerCase().includes(q);
    });

    if (filtered.length === 0) {
      dom.s1ClubsTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="py-8 text-center text-slate-400 font-mono-clean text-xs">
            No clubs found matching search query.
          </td>
        </tr>
      `;
      return;
    }

    dom.s1ClubsTableBody.innerHTML = filtered.map((c, idx) => `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="py-2.5 px-2 text-slate-400 text-[11px]">${idx + 1}</td>
        <td class="py-2.5 px-3 font-bold text-slate-900">${c.name || '-'}</td>
        <td class="py-2.5 px-3 text-slate-800 text-[11px]">${c.cic || '—'}</td>
        <td class="py-2.5 px-3 text-slate-600 text-[11px]">${c.acic || '—'}</td>
        <td class="py-2.5 px-3 text-slate-700 text-[11px] font-medium">${c.oic || '—'}</td>
        <td class="py-2.5 px-3 text-slate-600 text-[11px]">${c.venue || '—'}</td>
      </tr>
    `).join('');
  }

  // 11. TIN & PHILHEALTH RENDERER (320 CADETS)
  function renderS1Tin() {
    if (!dom.s1TinTableBody) return;
    const list = CCAFP_CONFIG.s1Data?.tin || (window.S1_SPIRITUAL_DATA && window.S1_SPIRITUAL_DATA.tin) || [];
    const q = (state.s1TinQuery || '').toLowerCase().trim();

    const filtered = list.filter(item => {
      if (!q) return true;
      return (item.name || '').toLowerCase().includes(q) ||
             (item.sn || '').toLowerCase().includes(q) ||
             (item.tin || '').toLowerCase().includes(q) ||
             (item.philhealth || '').toLowerCase().includes(q);
    });

    if (filtered.length === 0) {
      dom.s1TinTableBody.innerHTML = `
        <tr>
          <td colspan="7" class="py-8 text-center text-slate-400 font-mono-clean text-xs">
            No TIN records found matching search query.
          </td>
        </tr>
      `;
      return;
    }

    dom.s1TinTableBody.innerHTML = filtered.map((c, idx) => `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="py-2.5 px-2 text-slate-400 text-[11px]">${idx + 1}</td>
        <td class="py-2.5 px-3 font-semibold text-slate-900">${c.name || '-'}</td>
        <td class="py-2.5 px-3 text-blue-900 font-bold text-[11px]">${c.sn || '-'}</td>
        <td class="py-2.5 px-2 font-bold ${c.gender === 'F' ? 'text-rose-600' : 'text-slate-700'}">${c.gender || '-'}</td>
        <td class="py-2.5 px-3 text-slate-600 text-[11px]">${c.bdate || '-'}</td>
        <td class="py-2.5 px-3 font-mono text-emerald-800 font-semibold bg-emerald-50/30 text-[11px]">${c.tin || '—'}</td>
        <td class="py-2.5 px-3 font-mono text-slate-800 text-[11px]">${c.philhealth || '—'}</td>
      </tr>
    `).join('');
  }

  // 12. S1 MULTI-SHEET VIEWER ENGINE
  const S1_SHEET_MAP = {
    base: {
      embed: "https://docs.google.com/spreadsheets/d/1D2Mawvphp9UsY9NC8boG46FlksDkjXzLEf5c8afm-xI/htmlembed?gid=1901671722&widget=true&chrome=false",
      external: "https://docs.google.com/spreadsheets/d/1D2Mawvphp9UsY9NC8boG46FlksDkjXzLEf5c8afm-xI/edit?gid=1901671722#gid=1901671722"
    },
    expanded: {
      embed: "https://docs.google.com/spreadsheets/d/1sO3tlfX1l4S1ZBTCz2q2kVtgs9OicRztlzdS_OfNJiQ/htmlembed?gid=2074677523&widget=true&chrome=false",
      external: "https://docs.google.com/spreadsheets/d/1sO3tlfX1l4S1ZBTCz2q2kVtgs9OicRztlzdS_OfNJiQ/edit?gid=2074677523#gid=2074677523"
    },
    roster: {
      embed: "https://docs.google.com/spreadsheets/d/1RgBG_8zpjtFt2CCCEft-ryWa7PMKY49wM0yiAqsOeQA/htmlembed?gid=1849395053&widget=true&chrome=false",
      external: "https://docs.google.com/spreadsheets/d/1RgBG_8zpjtFt2CCCEft-ryWa7PMKY49wM0yiAqsOeQA/edit?gid=1849395053#gid=1849395053"
    },
    squads: {
      embed: "https://docs.google.com/spreadsheets/d/1WgSOcIMQVFFBTAOLnxgPtPn6uNJNjBkarlei5ebvCpQ/htmlembed?gid=1122746587&widget=true&chrome=false",
      external: "https://docs.google.com/spreadsheets/d/1WgSOcIMQVFFBTAOLnxgPtPn6uNJNjBkarlei5ebvCpQ/edit?gid=1122746587#gid=1122746587"
    },
    ape_1cl: {
      embed: "https://docs.google.com/spreadsheets/d/1gkPSf_DFNtxTXs5xz6zeF87q4ndpENIOBnkmAmBuVQE/htmlembed?gid=592993350&widget=true&chrome=false",
      external: "https://docs.google.com/spreadsheets/d/1gkPSf_DFNtxTXs5xz6zeF87q4ndpENIOBnkmAmBuVQE/edit?gid=592993350#gid=592993350"
    },
    ape_2cl: {
      embed: "https://docs.google.com/spreadsheets/d/1keQdjAC0zv9weMzNcvHcrxQdqpbW5KUpNqUNPeF2U5E/htmlembed?gid=1111921142&widget=true&chrome=false",
      external: "https://docs.google.com/spreadsheets/d/1keQdjAC0zv9weMzNcvHcrxQdqpbW5KUpNqUNPeF2U5E/edit?gid=1111921142#gid=1111921142"
    },
    clubs: {
      embed: "https://docs.google.com/spreadsheets/d/1luG6EKlAa1fPK_SoMzpI8r25HbQ0wu0_Uefaz9RI4DY/htmlembed?gid=0&widget=true&chrome=false",
      external: "https://docs.google.com/spreadsheets/d/1luG6EKlAa1fPK_SoMzpI8r25HbQ0wu0_Uefaz9RI4DY/edit?gid=0#gid=0"
    },
    tin: {
      embed: "https://docs.google.com/spreadsheets/d/1xcTrlevaAf-y07Vwp8G-ZkD25gCMCacuJDLMexiMqZc/htmlembed?gid=837476447&widget=true&chrome=false",
      external: "https://docs.google.com/spreadsheets/d/1xcTrlevaAf-y07Vwp8G-ZkD25gCMCacuJDLMexiMqZc/edit?pli=1&gid=837476447#gid=837476447"
    }
  };

  function initS1SheetViewer() {
    if (!dom.s1SheetSelector || !dom.s1SheetIframe) return;
    const key = dom.s1SheetSelector.value || 'base';
    const config = S1_SHEET_MAP[key] || S1_SHEET_MAP.base;
    if (dom.s1SheetIframe.getAttribute('src') !== config.embed) {
      dom.s1SheetIframe.setAttribute('src', config.embed);
    }
    if (dom.s1SheetExternalLink) {
      dom.s1SheetExternalLink.setAttribute('href', config.external);
    }
  }

  // 13. SPIRITUAL DEVELOPMENT COUNCIL SPECIALIZED PORTAL RENDERER
  function renderSpiritualCouncilView(council) {
    if (!dom.councilDynamicContainer) return;
    const list = CCAFP_CONFIG.spiritualData || (window.S1_SPIRITUAL_DATA && window.S1_SPIRITUAL_DATA.spiritual) || [];
    const sheetRaw = council?.sheetRaw || (typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS.spiritual_raw : (window.COUNCIL_SHEET_URLS && window.COUNCIL_SHEET_URLS.spiritual_raw) || '');

    const total = list.length;
    const countCatholic = list.filter(c => (c.religion || '').toUpperCase().includes('CATHOLIC')).length;
    const countBaptist = list.filter(c => (c.religion || '').toUpperCase().includes('BAPTIST') || (c.religion || '').toUpperCase().includes('PMACF') || (c.religion || '').toUpperCase().includes('CCCC')).length;
    const countSDA = list.filter(c => (c.religion || '').toUpperCase().includes('ADVENTIST') || (c.religion || '').toUpperCase().includes('SDA')).length;
    const countLDS = list.filter(c => (c.religion || '').toUpperCase().includes('LATTER DAY SAINTS') || (c.religion || '').toUpperCase().includes('LDS')).length;
    const countINC = list.filter(c => (c.religion || '').toUpperCase().includes('CRISTO') || (c.religion || '').toUpperCase().includes('INC')).length;
    const countMuslim = list.filter(c => (c.religion || '').toUpperCase().includes('ISLAMIC') || (c.religion || '').toUpperCase().includes('MUSLIM')).length;

    dom.councilDynamicContainer.innerHTML = `
      <div class="space-y-6">
        <!-- Live Cloud Sheet Connection Banner -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-purple-50/70 border border-purple-200">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <i data-lucide="heart-handshake" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold font-mono-clean text-purple-800 uppercase bg-purple-100/80 px-2 py-0.5 rounded border border-purple-200">CLASS 2027 MANDARAIG</span>
                <span class="text-[10px] font-bold font-mono-clean text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 live-beacon"></span>
                  <span>GOOGLE SHEET CONNECTED</span>
                </span>
              </div>
              <h4 class="font-bold text-sm text-slate-900 mt-0.5">Cadet Religious Services & Faith Denominations Roster</h4>
            </div>
          </div>
          <a href="${sheetRaw}" target="_blank" rel="noopener noreferrer" class="self-start sm:self-auto flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-white text-xs font-semibold shadow-xs transition-colors font-mono-clean">
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
            <span>Open Google Sheet</span>
          </a>
        </div>

        <!-- KPI Metrics Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono-clean">
          <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span class="text-[10px] text-slate-500 font-bold uppercase block">TOTAL ROSTER</span>
            <span class="text-xl font-bold text-slate-900">${total}</span>
            <span class="text-[10px] text-slate-400 block mt-0.5">Mandaraig '27</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-blue-50 border border-blue-200">
            <span class="text-[10px] text-blue-700 font-bold uppercase block">ROMAN CATHOLIC</span>
            <span class="text-xl font-bold text-blue-950">${countCatholic}</span>
            <span class="text-[10px] text-blue-600 block mt-0.5">${total ? ((countCatholic/total)*100).toFixed(0) : 0}% of Class</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-purple-50 border border-purple-200">
            <span class="text-[10px] text-purple-700 font-bold uppercase block">PROTESTANT / EVANGELICAL</span>
            <span class="text-xl font-bold text-purple-950">${countBaptist}</span>
            <span class="text-[10px] text-purple-600 block mt-0.5">PMACF, Grace, CCCC</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span class="text-[10px] text-emerald-700 font-bold uppercase block">SEVENTH-DAY ADVENTIST</span>
            <span class="text-xl font-bold text-emerald-950">${countSDA}</span>
            <span class="text-[10px] text-emerald-600 block mt-0.5">Sabbath Worship</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
            <span class="text-[10px] text-amber-700 font-bold uppercase block">LATTER-DAY SAINTS</span>
            <span class="text-xl font-bold text-amber-950">${countLDS}</span>
            <span class="text-[10px] text-amber-600 block mt-0.5">LDS / Mormon</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-cyan-50 border border-cyan-200">
            <span class="text-[10px] text-cyan-700 font-bold uppercase block">ISLAMIC FAITH</span>
            <span class="text-xl font-bold text-cyan-950">${countMuslim}</span>
            <span class="text-[10px] text-cyan-600 block mt-0.5">Jum'ah Prayers</span>
          </div>
        </div>

        <!-- Filter Controls Bar -->
        <div class="space-y-3 p-4 rounded-2xl bg-slate-50/70 border border-slate-200">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <i data-lucide="search" class="w-4 h-4 text-slate-400"></i>
              <input id="spiritualSearchInput" type="text" value="${state.spiritualQuery}" placeholder="Search cadet, serial number, religion, company..." class="px-3.5 py-1.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64 sm:w-80 font-mono-clean">
            </div>
            <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs font-mono-clean">
              <span class="text-slate-400 font-bold text-[10px] uppercase mr-1">COY:</span>
              <button class="spiritual-coy-pill ${state.spiritualCoy === 'all' ? 'active-pill bg-purple-900 text-white' : 'bg-white text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold" data-coy="all">All</button>
              ${['A','B','C','D','E','F','G','H'].map(c => `
                <button class="spiritual-coy-pill ${state.spiritualCoy === c ? 'active-pill bg-purple-900 text-white' : 'bg-white text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-medium" data-coy="${c}">${c}</button>
              `).join('')}
            </div>
          </div>

          <!-- Religion Filter Pills -->
          <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 text-xs font-mono-clean border-t border-slate-200/60">
            <span class="text-slate-400 font-bold text-[10px] uppercase mr-1">FAITH:</span>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'all' ? 'active-pill bg-purple-900 text-white' : 'bg-white text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold flex-shrink-0" data-religion="all">All Denominations (${total})</button>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'CATHOLIC' ? 'active-pill bg-purple-900 text-white' : 'bg-white text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-religion="CATHOLIC">Catholic (97)</button>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'GRACE BAPTIST' ? 'active-pill bg-purple-900 text-white' : 'bg-white text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-religion="GRACE BAPTIST">Grace Baptist (31)</button>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'PMACF' ? 'active-pill bg-purple-900 text-white' : 'bg-white text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-religion="PMACF">PMACF (25)</button>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'SEVENTH-DAY ADVENTIST' ? 'active-pill bg-purple-900 text-white' : 'bg-white text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-religion="SEVENTH-DAY ADVENTIST">SDA (18)</button>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'CCCC' ? 'active-pill bg-purple-900 text-white' : 'bg-white text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-religion="CCCC">CCCC (15)</button>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'LATTER DAY SAINTS' ? 'active-pill bg-purple-900 text-white' : 'bg-white text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-religion="LATTER DAY SAINTS">LDS (15)</button>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'IGLESIA NI CRISTO' ? 'active-pill bg-purple-900 text-white' : 'bg-white text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-religion="IGLESIA NI CRISTO">INC (11)</button>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'PMA BAPTIST' ? 'active-pill bg-purple-900 text-white' : 'bg-white text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-religion="PMA BAPTIST">PMA Baptist (9)</button>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'ANGLICAN/AGLIPAYAN' ? 'active-pill bg-purple-900 text-white' : 'bg-white text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-religion="ANGLICAN/AGLIPAYAN">Anglican (9)</button>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'ISLAMIC CREDENCE SOCIETY' ? 'active-pill bg-purple-900 text-white' : 'bg-white text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-religion="ISLAMIC CREDENCE SOCIETY">Islamic (7)</button>
          </div>
        </div>

        <!-- Cadets Table -->
        <div id="spiritualTableContainer" class="overflow-x-auto">
          <!-- Dynamically filtered rows -->
        </div>
      </div>
    `;

    renderSpiritualTableRows(list);
    wireSpiritualEvents(list);
  }

  function renderSpiritualTableRows(list) {
    const container = document.getElementById('spiritualTableContainer');
    if (!container) return;

    const q = (state.spiritualQuery || '').toLowerCase().trim();
    const relFilter = state.spiritualReligion || 'all';
    const coyFilter = state.spiritualCoy || 'all';

    const filtered = list.filter(item => {
      if (coyFilter !== 'all' && (item.coy || '').toUpperCase() !== coyFilter.toUpperCase()) {
        return false;
      }
      if (relFilter !== 'all' && !(item.religion || '').toUpperCase().includes(relFilter)) {
        return false;
      }
      if (!q) return true;
      return (item.name || '').toLowerCase().includes(q) ||
             (item.sn || '').toLowerCase().includes(q) ||
             (item.coy || '').toLowerCase().includes(q) ||
             (item.religion || '').toLowerCase().includes(q);
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="py-12 text-center text-slate-400 font-mono-clean text-xs">
          No cadets found matching religious affiliation criteria.
        </div>
      `;
      return;
    }

    const badgeForReligion = (rel) => {
      const r = (rel || '').toUpperCase();
      if (r.includes('CATHOLIC')) return '<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">Roman Catholic</span>';
      if (r.includes('GRACE BAPTIST')) return '<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-800 border border-purple-200">Grace Baptist</span>';
      if (r.includes('PMACF')) return '<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">PMACF Fellowship</span>';
      if (r.includes('SEVENTH-DAY ADVENTIST') || r.includes('SDA')) return '<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">Seventh-Day Adventist</span>';
      if (r.includes('CCCC')) return '<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200">CCCC Fellowship</span>';
      if (r.includes('LATTER DAY SAINTS')) return '<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">Latter-day Saints</span>';
      if (r.includes('IGLESIA NI CRISTO')) return '<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-800 border border-rose-200">Iglesia Ni Cristo</span>';
      if (r.includes('PMA BAPTIST')) return '<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">PMA Baptist</span>';
      if (r.includes('ANGLICAN')) return '<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-50 text-orange-800 border border-orange-200">Anglican / Aglipayan</span>';
      if (r.includes('ISLAMIC') || r.includes('MUSLIM')) return '<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-green-50 text-green-800 border border-green-200">Islamic Credence Society</span>';
      return `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800">${r}</span>`;
    };

    container.innerHTML = `
      <div class="flex items-center justify-between text-xs text-slate-500 font-mono-clean pb-2">
        <span>Showing <strong>${filtered.length}</strong> of ${list.length} Mandaraig Cadets</span>
        <span>Class of 2027 Roster</span>
      </div>
      <table class="w-full text-left text-xs font-mono-clean">
        <thead>
          <tr class="font-bold text-slate-500 border-b border-slate-200 pb-2 uppercase tracking-wider text-[11px]">
            <th class="py-3 px-2">#</th>
            <th class="py-3 px-2">Class</th>
            <th class="py-3 px-3 font-semibold text-slate-900">Cadet Full Name</th>
            <th class="py-3 px-3">Serial No.</th>
            <th class="py-3 px-2">Gender</th>
            <th class="py-3 px-2">Company</th>
            <th class="py-3 px-3">Faith / Religion Affiliation</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          ${filtered.map((c, idx) => `
            <tr class="hover:bg-slate-50/80 transition-colors">
              <td class="py-2.5 px-2 text-slate-400 text-[11px]">${idx + 1}</td>
              <td class="py-2.5 px-2 font-bold text-purple-900">${c.class || '1CL'}</td>
              <td class="py-2.5 px-3 font-semibold text-slate-900">${c.name || '-'}</td>
              <td class="py-2.5 px-3 text-blue-900 font-bold text-[11px]">${c.sn || '-'}</td>
              <td class="py-2.5 px-2 font-bold ${c.gender === 'F' ? 'text-rose-600' : 'text-slate-700'}">${c.gender || '-'}</td>
              <td class="py-2.5 px-2 font-bold text-slate-800">${c.coy ? `${c.coy} CO` : '-'}</td>
              <td class="py-2.5 px-3">${badgeForReligion(c.religion)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  function wireSpiritualEvents(list) {
    const search = document.getElementById('spiritualSearchInput');
    if (search) {
      search.addEventListener('input', (e) => {
        state.spiritualQuery = e.target.value;
        renderSpiritualTableRows(list);
      });
    }

    document.querySelectorAll('.spiritual-coy-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.spiritual-coy-pill').forEach(p => {
          p.className = 'spiritual-coy-pill bg-white text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-medium';
        });
        pill.className = 'spiritual-coy-pill active-pill bg-purple-900 text-white px-2.5 py-1 rounded-lg border border-purple-900 text-xs font-semibold';
        state.spiritualCoy = pill.getAttribute('data-coy') || 'all';
        renderSpiritualTableRows(list);
      });
    });

    document.querySelectorAll('.spiritual-religion-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.spiritual-religion-pill').forEach(p => {
          p.className = 'spiritual-religion-pill bg-white text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0';
        });
        pill.className = 'spiritual-religion-pill active-pill bg-purple-900 text-white px-2.5 py-1 rounded-lg border border-purple-900 text-xs font-semibold flex-shrink-0';
        state.spiritualReligion = pill.getAttribute('data-religion') || 'all';
        renderSpiritualTableRows(list);
      });
    });
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
    if (!councilId) return;
    if (councilId === 'council') councilId = 's2';
    state.activeCouncilId = councilId;

    if (councilId === 's1') {
      navigateToTab('s1', 'S1 PERSONNEL');
      return;
    }
    if (councilId === 'rso') {
      navigateToTab('rso', 'RSO COUNCIL');
      renderRsoArmory();
      return;
    }
    if (councilId === 'honor') {
      navigateToTab('honor', 'HONOR COMMITTEE');
      return;
    }
    if (councilId === 'ccpb') {
      navigateToTab('punishments', 'PUNISHMENT REGISTER (CCPB)');
      return;
    }

    const council = (CCAFP_CONFIG.councils || []).find(c => c.id === councilId) || (CCAFP_CONFIG.councils && CCAFP_CONFIG.councils[1]);
    renderActiveCouncilView(council);
    navigateToTab('council', council ? council.name.toUpperCase() : 'COUNCIL');
  }
  window.selectCouncil = selectCouncil;

  // --- Render Councils Directory Switcher Pills ---
  function renderCouncilsDirectoryPills() {
    const container = document.getElementById('councilsDirectoryPills');
    if (!container) return;
    const councils = CCAFP_CONFIG.councils || [];
    container.innerHTML = councils.map(c => {
      const isActive = c.id === state.activeCouncilId;
      return `
        <button data-council-select="${c.id}" class="council-directory-pill flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
          isActive
            ? 'active-pill bg-blue-900 text-white border-blue-950 shadow-xs'
            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
        }">
          <i data-lucide="${c.icon || 'shield'}" class="w-3.5 h-3.5 ${isActive ? 'text-blue-200' : 'text-slate-400'}"></i>
          <span class="whitespace-nowrap">${c.name}</span>
        </button>
      `;
    }).join('');
    if (window.lucide) window.lucide.createIcons();
  }

  // --- Render Priority Bulletins (Exact Alfacoy Cards) ---
  function renderPriorityBulletins() {
    if (!dom.priorityBulletinsGrid) return;
    const authorMap = {
      'ALL COUNCIL': 'council',
      'S1 PERSONNEL': 's1',
      'S2 INTELLIGENCE': 's2',
      'S3 OPERATIONS': 's3',
      'S4 LOGISTICS': 's4',
      'RSO COUNCIL': 'rso',
      'S5 PLANS & PROGRAMS': 's5',
      'S6 CEIS / SIGNAL': 's6',
      'S7 CIVIL-MILITARY': 's7',
      'S8 EDUCATION AND TRAINING': 's8',
      'S10 FINANCE': 's10',
      'ATHLETIC COUNCIL': 'athletic',
      'ACADEMIC COUNCIL': 'academic',
      'MTO COUNCIL': 'mto',
      'EXO COUNCIL': 'exo',
      'MESS COUNCIL': 'mess',
      'SPIRITUAL DEVELOPMENT': 'spiritual',
      'SAFETY COUNCIL': 'safety',
      'GAD COUNCIL': 'gad',
      'CCPB BOARD': 'ccpb',
      'HONOR COMMITTEE': 'honor'
    };

    dom.priorityBulletinsGrid.innerHTML = CCAFP_CONFIG.priorityBulletins.map(item => {
      const targetCouncil = authorMap[item.author?.toUpperCase()] || 'council';
      return `
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
            <button data-council-select="${targetCouncil}" class="font-semibold text-slate-600 hover:text-blue-900 hover:underline uppercase transition-colors text-left flex items-center gap-1" title="Click to open ${item.author} page">
              <span>${item.author}</span>
              <i data-lucide="arrow-up-right" class="w-3 h-3 text-slate-400"></i>
            </button>
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
    `;
    }).join('');
    if (window.lucide) window.lucide.createIcons();
  }

  // --- Active General Council View Rendering ---
  async function renderActiveCouncilView(council) {
    if (!council) return;
    renderCouncilsDirectoryPills();

    if (council.id === 'spiritual') {
      if (dom.activeCouncilTag) dom.activeCouncilTag.textContent = "SPECIALIST COUNCIL";
      if (dom.activeCouncilTitle) dom.activeCouncilTitle.textContent = "Spiritual Development Council";
      if (dom.activeCouncilDesc) dom.activeCouncilDesc.textContent = "Faith, Pastoral Care, Religious Services Roster & Chapel Fellowship";
      renderSpiritualCouncilView(council);
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    if (dom.activeCouncilTag) dom.activeCouncilTag.textContent = (council.category || 'COUNCIL').toUpperCase();
    if (dom.activeCouncilTitle) dom.activeCouncilTitle.textContent = council.title || council.name;
    if (dom.activeCouncilDesc) dom.activeCouncilDesc.textContent = council.description || '';

    if (council.sensitive) {
      const reminders = council.reminders || [];
      dom.councilDynamicContainer.innerHTML = `
        <div class="space-y-4">
          <div class="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 leading-relaxed flex items-center gap-3">
            <i data-lucide="shield-alert" class="w-5 h-5 text-red-600 flex-shrink-0"></i>
            <div>
              <strong>Restricted Policy Council:</strong> In compliance with Cadet Regulations, work of this council is restricted to ethical guidelines, security orders, and standing reminders only.
            </div>
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
      const sheetLink = (syncManager && syncManager.getLink) ? syncManager.getLink(council.id) : '';
      let headers = council.defaultHeaders || ["Item", "Detail", "Status"];
      let rows = council.defaultRows || [["Record 1", "Information", "Operational"]];
      let isLive = false;

      if (sheetLink) {
        if (state.liveCache[council.id]) {
          headers = state.liveCache[council.id][0];
          rows = state.liveCache[council.id].slice(1);
          isLive = true;
        } else {
          try {
            const fetched = await syncManager.fetchLiveCSV(sheetLink);
            if (fetched && fetched.length > 1) {
              state.liveCache[council.id] = fetched;
              headers = fetched[0];
              rows = fetched.slice(1);
              isLive = true;
            }
          } catch(e) {
            console.warn('Could not fetch live sheet for', council.id, e);
          }
        }
      }

      dom.councilDynamicContainer.innerHTML = `
        <div class="space-y-4">
          <div class="flex items-center justify-between text-xs text-slate-500 font-mono-clean">
            <span class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 live-beacon' : 'bg-blue-500'}"></span>
              <span>${isLive ? 'Synchronized Live from Google Sheets' : 'Official Baseline Records'}</span>
            </span>
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

    const list = CCAFP_CONFIG.punishmentList || [];
    const totals = CCAFP_CONFIG.punishmentTotals || { touring: 239, confined: 74, totalActive: list.length };
    const meta = CCAFP_CONFIG.punishmentMeta || {
      chairman: "CDT CPT 1CL APRIL JOY C GEROLA C-27112 'A' Co CCAFP",
      notedBy: "CDT SGT MAJ 2CL RASHEED SHANE C ABBAS 'A' Co CCAFP",
      updatedDate: "25 AUGUST 2026"
    };

    // Update Totals & Header Badges
    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setVal('punishTouringCount', totals.touring || 239);
    setVal('punishConfinedCount', totals.confined || 74);
    setVal('punishActiveCount', totals.totalActive || list.length);
    setVal('punishChairman', meta.chairman || "CDT CPT 1CL APRIL JOY C GEROLA");
    setVal('punishNotedBy', meta.notedBy || "CDT SGT MAJ 2CL RASHEED SHANE C ABBAS");
    if (meta.updatedDate && dom.punishDateBadge) dom.punishDateBadge.textContent = meta.updatedDate;

    // Filter by Company
    let filtered = list;
    if (state.punishCoy && state.punishCoy !== 'all') {
      filtered = filtered.filter(item => (item.company || '').toUpperCase() === state.punishCoy.toUpperCase());
    }

    // Filter by Query
    const q = (state.punishmentQuery || '').toLowerCase().trim();
    if (q) {
      filtered = filtered.filter(item => {
        return (item.cadetName || '').toLowerCase().includes(q) ||
               (item.rank || '').toLowerCase().includes(q) ||
               (item.serialNo || '').toLowerCase().includes(q) ||
               (item.offense || '').toLowerCase().includes(q) ||
               (item.nature || '').toLowerCase().includes(q) ||
               (item.company || '').toLowerCase().includes(q) ||
               (item.status || '').toLowerCase().includes(q);
      });
    }

    if (filtered.length === 0) {
      dom.punishmentTableBody.innerHTML = `
        <tr>
          <td colspan="10" class="py-8 text-center text-slate-400 font-mono-clean">
            No active cadet delinquency records found matching your filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    dom.punishmentTableBody.innerHTML = filtered.map(item => `
      <tr class="hover:bg-slate-50/70 transition-colors">
        <td class="py-3 px-3 font-sans font-semibold text-slate-900">${item.cadetName}</td>
        <td class="py-3 px-2 text-slate-500 font-mono-clean text-[11px]">${item.serialNo}</td>
        <td class="py-3 px-2 text-center text-slate-600 font-bold">${item.class || '1CL'}</td>
        <td class="py-3 px-2 text-center font-bold text-blue-900 bg-blue-50/40 rounded">${item.company} Coy</td>
        <td class="py-3 px-3 text-slate-800 font-sans">
          <div class="font-medium">${item.offense}</div>
          <span class="inline-block mt-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
            (item.offenseClass || '').includes('Class I') ? 'bg-red-50 text-red-700 border border-red-200' :
            (item.offenseClass || '').includes('Class II') ? 'bg-amber-50 text-amber-800 border border-amber-200' :
            'bg-slate-100 text-slate-700 border border-slate-200'
          }">${item.offenseClass || 'Class III'} &bull; ${item.nature || 'Negligence of Duty'}</span>
        </td>
        <td class="py-3 px-2 text-center text-red-600 font-bold font-mono-clean text-xs">${item.demerits || 0}</td>
        <td class="py-3 px-2 text-center text-amber-600 font-bold font-mono-clean text-xs">${item.tours || 0}</td>
        <td class="py-3 px-2 text-center">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
            item.confined === 'YES' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-slate-100 text-slate-600'
          }">${item.confined || 'NO'}</span>
        </td>
        <td class="py-3 px-2 text-center text-slate-500 text-[11px] font-mono-clean whitespace-nowrap">
          ${item.startDate && item.startDate !== '-' ? `${item.startDate} &rarr; ${item.endDate || '-'}` : '-'}
        </td>
        <td class="py-3 px-3 text-center">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
            item.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
            item.status === 'Confined' ? 'bg-red-50 text-red-700 border border-red-200' :
            'bg-amber-50 text-amber-800 border border-amber-200'
          }">${item.status || 'Ongoing'}</span>
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
      const punishConductUrl = (typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS.punishments_conduct : '');
      const punishTotalsUrl = (typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS.punishments_totals : '');
      const expandedUrl = (typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS.s1_expanded : '');
      const rosterUrl = (typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS.s1_roster : '');
      const squadsUrl = (typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS.s1_squads : '');
      const ape1Url = (typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS.s1_ape_1cl : '');
      const ape2Url = (typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS.s1_ape_2cl : '');
      const clubsUrl = (typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS.s1_clubs : '');
      const tinUrl = (typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS.s1_tin : '');
      const spiritualUrl = (typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS.spiritual : '');

      // Concurrently fetch all sheets with cache busting
      const [
        schedRes, dispRes, armoryRes, attachRes, punishConductRes, punishTotalsRes,
        expandedRes, rosterRes, squadsRes, ape1Res, ape2Res, clubsRes, tinRes, spiritualRes
      ] = await Promise.allSettled([
        syncManager.fetchLiveCSV(schedUrl),
        syncManager.fetchLiveCSV(dispUrl),
        syncManager.fetchLiveCSV(armoryUrl),
        syncManager.fetchLiveCSV(attachUrl),
        syncManager.fetchLiveCSV(punishConductUrl),
        syncManager.fetchLiveCSV(punishTotalsUrl),
        syncManager.fetchLiveCSV(expandedUrl),
        syncManager.fetchLiveCSV(rosterUrl),
        syncManager.fetchLiveCSV(squadsUrl),
        syncManager.fetchLiveCSV(ape1Url),
        syncManager.fetchLiveCSV(ape2Url),
        syncManager.fetchLiveCSV(clubsUrl),
        syncManager.fetchLiveCSV(tinUrl),
        syncManager.fetchLiveCSV(spiritualUrl)
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

      // 3. ARMORY / RSO
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

      // 5. PUNISHMENTS (EXO CONDUCT & TOTALS)
      if (punishConductRes.status === 'fulfilled' && punishConductRes.value && punishConductRes.value.length > 0) {
        const totalRows = (punishTotalsRes.status === 'fulfilled' && punishTotalsRes.value) ? punishTotalsRes.value : null;
        const parsedPunish = syncManager.parsePunishments(punishConductRes.value, totalRows);
        if (parsedPunish) {
          CCAFP_CONFIG.punishmentList = parsedPunish.list;
          CCAFP_CONFIG.punishmentTotals = parsedPunish.totals;
          CCAFP_CONFIG.punishmentMeta = {
            chairman: parsedPunish.chairman,
            notedBy: parsedPunish.notedBy,
            updatedDate: parsedPunish.updatedDate
          };
          hasNewData = true;
        }
      }

      // 6. S1 EXPANDED ROLL
      if (expandedRes.status === 'fulfilled' && expandedRes.value && expandedRes.value.length > 0) {
        const parsed = syncManager.parseExpanded ? syncManager.parseExpanded(expandedRes.value) : null;
        if (parsed && parsed.length > 0) {
          CCAFP_CONFIG.s1Data.expanded = parsed;
          hasNewData = true;
        }
      }

      // 7. S1 CLASS ROSTER
      if (rosterRes.status === 'fulfilled' && rosterRes.value && rosterRes.value.length > 0) {
        const parsed = syncManager.parseRoster ? syncManager.parseRoster(rosterRes.value) : null;
        if (parsed && parsed.length > 0) {
          CCAFP_CONFIG.s1Data.roster = parsed;
          hasNewData = true;
        }
      }

      // 8. S1 SQUADS ORGANIZATION
      if (squadsRes.status === 'fulfilled' && squadsRes.value && squadsRes.value.length > 0) {
        const rows = squadsRes.value;
        const squadsData = {};
        let currentSquad = null;
        for (const r of rows) {
          const line = r.join(' ');
          if (line.includes('1ST SQUAD')) {
            currentSquad = '1ST SQUAD';
            squadsData[currentSquad] = { p1: [], p2: [], p3: [], p4: [] };
            continue;
          } else if (line.includes('2ND SQUAD')) {
            currentSquad = '2ND SQUAD';
            squadsData[currentSquad] = { p1: [], p2: [], p3: [], p4: [] };
            continue;
          } else if (line.includes('3RD SQUAD')) {
            currentSquad = '3RD SQUAD';
            squadsData[currentSquad] = { p1: [], p2: [], p3: [], p4: [] };
            continue;
          }
          if (currentSquad && r.length >= 5) {
            const p1 = r[1]?.trim();
            const p2 = r[2]?.trim();
            const p3 = r[3]?.trim();
            const p4 = r[4]?.trim();
            if (p1) squadsData[currentSquad].p1.push(p1);
            if (p2) squadsData[currentSquad].p2.push(p2);
            if (p3) squadsData[currentSquad].p3.push(p3);
            if (p4) squadsData[currentSquad].p4.push(p4);
          }
        }
        if (Object.keys(squadsData).length > 0) {
          CCAFP_CONFIG.s1Data.squads = squadsData;
          hasNewData = true;
        }
      }

      // 9. S1 APE MEDICAL
      if (ape1Res.status === 'fulfilled' && ape1Res.value && ape1Res.value.length > 0) {
        const r2 = (ape2Res.status === 'fulfilled' && ape2Res.value) ? ape2Res.value : [];
        const parsed = syncManager.parseApe ? syncManager.parseApe(ape1Res.value, r2) : null;
        if (parsed && parsed.length > 0) {
          CCAFP_CONFIG.s1Data.ape = parsed;
          hasNewData = true;
        }
      }

      // 10. S1 CLUBS & ORGANIZATIONS
      if (clubsRes.status === 'fulfilled' && clubsRes.value && clubsRes.value.length > 0) {
        const parsed = syncManager.parseClubs ? syncManager.parseClubs(clubsRes.value) : null;
        if (parsed && parsed.length > 0) {
          CCAFP_CONFIG.s1Data.clubs = parsed;
          hasNewData = true;
        }
      }

      // 11. S1 TIN & PHILHEALTH
      if (tinRes.status === 'fulfilled' && tinRes.value && tinRes.value.length > 0) {
        const parsed = syncManager.parseTin ? syncManager.parseTin(tinRes.value) : null;
        if (parsed && parsed.length > 0) {
          CCAFP_CONFIG.s1Data.tin = parsed;
          hasNewData = true;
        }
      }

      // 12. SPIRITUAL DEVELOPMENT COUNCIL
      if (spiritualRes.status === 'fulfilled' && spiritualRes.value && spiritualRes.value.length > 0) {
        const parsed = syncManager.parseSpiritual ? syncManager.parseSpiritual(spiritualRes.value) : null;
        if (parsed && parsed.length > 0) {
          CCAFP_CONFIG.spiritualData = parsed;
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
        renderRsoArmory();
        renderPunishments();
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

        if (dom.rsoSyncBadge) {
          dom.rsoSyncBadge.innerHTML = `
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 live-beacon"></span>
            <span>LIVE ARMORY SYNCED (${timeStr})</span>
          `;
        }

        if (dom.punishSyncBadge) {
          dom.punishSyncBadge.innerHTML = `
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 live-beacon"></span>
            <span>LIVE CCPB SYNCED (${timeStr})</span>
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
      if (dom.rsoSyncBtn) {
        dom.rsoSyncBtn.querySelector('i')?.classList.remove('animate-spin');
      }
      if (dom.punishSyncBtn) {
        dom.punishSyncBtn.querySelector('i')?.classList.remove('animate-spin');
      }
      updateTime();
    }
  }

  const performLiveSync = performAutomated15MinSync;

  // --- Dark Mode Theme Manager ---
  function initTheme() {
    const saved = localStorage.getItem('ccafp_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === 'dark' || (!saved && prefersDark);
    applyTheme(isDark);

    const btn = document.getElementById('toggleDarkBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        const currentlyDark = document.documentElement.classList.contains('dark');
        applyTheme(!currentlyDark);
      });
    }
  }

  function applyTheme(isDark) {
    const html = document.documentElement;
    const btnText = document.getElementById('darkBtnText');
    const btn = document.getElementById('toggleDarkBtn');

    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('ccafp_theme', 'dark');
      if (btnText) btnText.textContent = 'LIGHT';
      if (btn) {
        btn.innerHTML = `
          <i data-lucide="sun" class="w-4 h-4 text-amber-400"></i>
          <span id="darkBtnText" class="font-mono-clean">LIGHT</span>
        `;
      }
    } else {
      html.classList.remove('dark');
      localStorage.setItem('ccafp_theme', 'light');
      if (btnText) btnText.textContent = 'DARK';
      if (btn) {
        btn.innerHTML = `
          <i data-lucide="moon" class="w-4 h-4 text-slate-600"></i>
          <span id="darkBtnText" class="font-mono-clean">DARK</span>
        `;
      }
    }
    if (window.lucide) window.lucide.createIcons();
  }

  // --- Toast ---
  function showToast(message, type = 'info') {
    if (!dom.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'flex items-center gap-2.5 px-4 py-3 rounded-xl border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700 shadow-xl text-xs font-semibold text-slate-800 dark:text-slate-100 pointer-events-auto transition-all transform duration-200';
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

    const homeAnnouncementsBtn = document.getElementById('homeStatsAnnouncementsBtn');
    if (homeAnnouncementsBtn) {
      homeAnnouncementsBtn.addEventListener('click', () => {
        const grid = document.getElementById('priorityBulletinsGrid');
        if (grid) grid.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Unified Global Navigation Click Handler (Tabs, Councils, Directory Pills, Bulletin Authors)
    document.addEventListener('click', (e) => {
      const councilBtn = e.target.closest('[data-council-select]');
      if (councilBtn) {
        e.preventDefault();
        const id = councilBtn.getAttribute('data-council-select');
        if (id) {
          selectCouncil(id);
        }
        return;
      }

      const tabBtn = e.target.closest('[data-tab]');
      if (tabBtn) {
        e.preventDefault();
        const tab = tabBtn.getAttribute('data-tab');
        if (tab) {
          navigateToTab(tab);
        }
        return;
      }
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

    // S1 Expanded Search & Company Pills
    if (dom.s1ExpandedSearchInput) {
      dom.s1ExpandedSearchInput.addEventListener('input', (e) => {
        state.s1ExpandedQuery = e.target.value;
        renderS1Expanded();
      });
    }
    document.querySelectorAll('.s1-expanded-coy-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.s1-expanded-coy-pill').forEach(p => {
          p.className = 's1-expanded-coy-pill px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200';
        });
        pill.className = 's1-expanded-coy-pill active-pill px-3 py-1 rounded-lg bg-blue-900 text-white font-semibold';
        state.s1ExpandedCoy = pill.getAttribute('data-expanded-coy') || 'all';
        renderS1Expanded();
      });
    });

    // S1 Roster Search & Class Pills
    if (dom.s1RosterSearchInput) {
      dom.s1RosterSearchInput.addEventListener('input', (e) => {
        state.s1RosterQuery = e.target.value;
        renderS1Roster();
      });
    }
    document.querySelectorAll('.s1-roster-class-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.s1-roster-class-pill').forEach(p => {
          p.className = 's1-roster-class-pill px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200';
        });
        pill.className = 's1-roster-class-pill active-pill px-3 py-1 rounded-lg bg-blue-900 text-white font-semibold';
        state.s1RosterClass = pill.getAttribute('data-roster-class') || 'all';
        renderS1Roster();
      });
    });

    // S1 Squad Tabs
    document.querySelectorAll('.s1-squad-tab-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.s1-squad-tab-pill').forEach(p => {
          p.className = 's1-squad-tab-pill px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium';
        });
        pill.className = 's1-squad-tab-pill active-pill px-3 py-1.5 rounded-xl bg-blue-900 text-white font-semibold';
        state.s1SquadActive = pill.getAttribute('data-squad') || '1ST SQUAD';
        renderS1Squads();
      });
    });

    // S1 APE Search & Cohort Pills
    if (dom.s1ApeSearchInput) {
      dom.s1ApeSearchInput.addEventListener('input', (e) => {
        state.s1ApeQuery = e.target.value;
        renderS1Ape();
      });
    }
    document.querySelectorAll('.s1-ape-class-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.s1-ape-class-pill').forEach(p => {
          p.className = 's1-ape-class-pill px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200';
        });
        pill.className = 's1-ape-class-pill active-pill px-3 py-1 rounded-lg bg-blue-900 text-white font-semibold';
        state.s1ApeClass = pill.getAttribute('data-ape-class') || 'all';
        renderS1Ape();
      });
    });

    // S1 Clubs Search
    if (dom.s1ClubsSearchInput) {
      dom.s1ClubsSearchInput.addEventListener('input', (e) => {
        state.s1ClubsQuery = e.target.value;
        renderS1Clubs();
      });
    }

    // S1 TIN Search
    if (dom.s1TinSearchInput) {
      dom.s1TinSearchInput.addEventListener('input', (e) => {
        state.s1TinQuery = e.target.value;
        renderS1Tin();
      });
    }

    // S1 Sheet Selector Dropdown
    if (dom.s1SheetSelector) {
      dom.s1SheetSelector.addEventListener('change', () => {
        initS1SheetViewer();
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

    // RSO Armory Sync Button
    if (dom.rsoSyncBtn) {
      dom.rsoSyncBtn.addEventListener('click', () => {
        performAutomated15MinSync(true);
      });
    }

    // Punishment Company Filter Pills
    document.querySelectorAll('.punish-coy-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.punish-coy-pill').forEach(p => {
          p.className = 'punish-coy-pill px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200';
        });
        pill.className = 'punish-coy-pill active-pill px-3 py-1 rounded-lg bg-blue-900 text-white font-semibold';
        state.punishCoy = pill.getAttribute('data-punish-coy') || 'all';
        renderPunishments();
      });
    });

    // Punishment Sync Button
    if (dom.punishSyncBtn) {
      dom.punishSyncBtn.addEventListener('click', () => {
        performAutomated15MinSync(true);
      });
    }



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
    initTheme();
    updateTime();
    setInterval(updateTime, 1000);

    // 1. Restore cached state from previous 15-minute sync if available
    restoreLiveSnapshotFromStorage();

    // 2. Render all initial views with loaded/cached data
    renderSidebarCouncils();
    renderCouncilsDirectoryPills();
    renderPriorityBulletins();
    renderS1Data();
    renderRsoArmory();
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
