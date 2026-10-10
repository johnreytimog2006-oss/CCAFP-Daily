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
    s1ExpandedClass: 'all',
    s1ExpandedCoy: 'all',
    s1ExpandedPage: 1,
    s1ExpandedPageSize: 50,
    s1RosterQuery: '',
    s1RosterClass: 'all',
    s1SquadCoy: 'ALFA',
    s1SquadActive: '1ST SQUAD',
    s1ApeQuery: '',
    s1ApeClass: 'all',
    s1ApeCompany: 'all',
    s1ApePage: 1,
    s1ApePageSize: 50,
    s1ClubsQuery: '',
    s1TinQuery: '',
    s1TinClass: 'all',
    s1TinCoy: 'all',
    s1TinPage: 1,
    s1TinPageSize: 50,
    spiritualQuery: '',
    spiritualClass: 'all',
    spiritualReligion: 'all',
    spiritualCoy: 'all',
    messActiveSubTab: 'shares-roster',
    messQuery: '',
    messBattalion: 'all',
    messCoy: 'all',
    messClass: 'all',
    messBOS: 'all',
    messStatus: 'all',
    messActiveDiet: 'all',
    messMenuDay: 'MONDAY',
    messPage: 1,
    messPageSize: 50,
    socGuardQuery: '',
    socCallsQuery: '',
    activeCouncilId: 's1',
    liveCache: {},
    staffLevel: 'regiment',
    staffRegimentCat: 'all',
    staffRegimentQuery: '',
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
    s1ExpandedPagination: document.getElementById('s1ExpandedPagination'),
    s1RosterSearchInput: document.getElementById('s1RosterSearchInput'),
    s1RosterTableBody: document.getElementById('s1RosterTableBody'),
    s1SquadTitleBadge: document.getElementById('s1SquadTitleBadge'),
    s1SquadGridContainer: document.getElementById('s1SquadGridContainer'),
    s1ApeSearchInput: document.getElementById('s1ApeSearchInput'),
    s1ApeTableBody: document.getElementById('s1ApeTableBody'),
    s1ApeTotalCountBadge: document.getElementById('s1ApeTotalCountBadge'),
    s1ApePaginationInfo: document.getElementById('s1ApePaginationInfo'),
    s1ApePageSizeSelect: document.getElementById('s1ApePageSizeSelect'),
    s1ApePrevBtn: document.getElementById('s1ApePrevBtn'),
    s1ApeNextBtn: document.getElementById('s1ApeNextBtn'),
    s1ApePageNumber: document.getElementById('s1ApePageNumber'),
    s1ClubsSearchInput: document.getElementById('s1ClubsSearchInput'),
    s1ClubsTableBody: document.getElementById('s1ClubsTableBody'),
    s1TinSearchInput: document.getElementById('s1TinSearchInput'),
    s1TinTableBody: document.getElementById('s1TinTableBody'),
    s1TinTotalBadge: document.getElementById('s1TinTotalBadge'),
    s1TinPagination: document.getElementById('s1TinPagination'),
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
    guardMountingCountdown: document.getElementById('guardMountingCountdown'),
    socOC: document.getElementById('socOC'),
    socAOC: document.getElementById('socAOC'),
    socUniform: document.getElementById('socUniform'),
    socUniformDesc: document.getElementById('socUniformDesc'),
    socUniformGuideGrid: document.getElementById('socUniformGuideGrid'),
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
  function updateGuardMountingCountdown() {
    const el = dom.guardMountingCountdown || document.getElementById('guardMountingCountdown');
    if (!el) return;
    const now = new Date();
    // Guard Mounting resets daily at 1830H (18:30:00)
    const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 30, 0, 0);
    if (now.getTime() >= target.getTime()) {
      target.setDate(target.getDate() + 1);
    }
    const diffMs = target.getTime() - now.getTime();
    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);
    el.textContent = `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
  }

  function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    if (dom.lastUpdatedClock) {
      dom.lastUpdatedClock.textContent = timeStr;
    }
    updateGuardMountingCountdown();
  }

  // --- Automated 15-Minute Sync Manager & Local Storage Persistence ---
  const CACHE_STORAGE_KEY = 'ccafp_daily_cache_v3';
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
      // Clear legacy cache that may contain incomplete schema
      localStorage.removeItem('ccafp_daily_live_cache');

      const raw = localStorage.getItem(CACHE_STORAGE_KEY);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      if (parsed && parsed.version === CCAFP_CONFIG.version && parsed.s1Data && Array.isArray(parsed.s1Data.disposition?.companies)) {
        if (!CCAFP_CONFIG.s1Data) CCAFP_CONFIG.s1Data = {};
        if (parsed.s1Data.scheduleOfCalls && Array.isArray(parsed.s1Data.scheduleOfCalls.guardRoster)) {
          CCAFP_CONFIG.s1Data.scheduleOfCalls = parsed.s1Data.scheduleOfCalls;
        }
        if (parsed.s1Data.disposition && Array.isArray(parsed.s1Data.disposition.companies)) {
          CCAFP_CONFIG.s1Data.disposition = parsed.s1Data.disposition;
        }
        if (parsed.s1Data.armory && Array.isArray(parsed.s1Data.armory.rows)) {
          CCAFP_CONFIG.s1Data.armory = parsed.s1Data.armory;
        }
        if (parsed.s1Data.attachment && Array.isArray(parsed.s1Data.attachment.fadList)) {
          CCAFP_CONFIG.s1Data.attachment = parsed.s1Data.attachment;
        }
        if (parsed.s1Data.regimentStaff && Array.isArray(parsed.s1Data.regimentStaff.commandSection)) {
          CCAFP_CONFIG.s1Data.regimentStaff = parsed.s1Data.regimentStaff;
        }
        if (Array.isArray(parsed.s1Data.expanded)) CCAFP_CONFIG.s1Data.expanded = parsed.s1Data.expanded;
        if (Array.isArray(parsed.s1Data.roster)) CCAFP_CONFIG.s1Data.roster = parsed.s1Data.roster;
        if (parsed.s1Data.squads) CCAFP_CONFIG.s1Data.squads = parsed.s1Data.squads;
        if (Array.isArray(parsed.s1Data.clubs)) CCAFP_CONFIG.s1Data.clubs = parsed.s1Data.clubs;
        if (Array.isArray(parsed.s1Data.tin)) CCAFP_CONFIG.s1Data.tin = parsed.s1Data.tin;
        if (Array.isArray(parsed.s1Data.ape)) CCAFP_CONFIG.s1Data.ape = parsed.s1Data.ape;
        if (Array.isArray(parsed.spiritualData)) CCAFP_CONFIG.spiritualData = parsed.spiritualData;
        if (Array.isArray(parsed.punishmentList)) CCAFP_CONFIG.punishmentList = parsed.punishmentList;
        if (parsed.punishmentTotals) CCAFP_CONFIG.punishmentTotals = parsed.punishmentTotals;
        if (parsed.punishmentMeta) CCAFP_CONFIG.punishmentMeta = parsed.punishmentMeta;
        return true;
      } else {
        localStorage.removeItem(CACHE_STORAGE_KEY);
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
      staff: 'TASK ORGANIZATION',
      duty: 'SCHEDULE OF CALLS (SOC)',
      calendar: 'EVENT CALENDAR',
      honor: 'HONOR COMMITTEE',
      punishments: 'CCAFP PUNISHMENT LIST',
      mess: 'MESS COUNCIL',
      council: breadcrumbName || 'COUNCILS DIRECTORY'
    };
    if (dom.activeBreadcrumb) {
      dom.activeBreadcrumb.textContent = labels[tabId] || (breadcrumbName ? breadcrumbName.toUpperCase() : 'BULLETIN');
    }

    if (tabId === 'rso') {
      renderRsoArmory();
    } else if (tabId === 'punishments') {
      renderPunishments();
    } else if (tabId === 'mess') {
      selectCouncil('mess');
    } else if (tabId === 'duty') {
      renderScheduleOfCallsView();
    }

    closeMobileSidebar();
    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
    const disp = CCAFP_CONFIG.s1Data?.disposition || {};
    const rows = Array.isArray(disp.companies) ? disp.companies : [];

    let t1CLM = 0, t1CLF = 0, t2CLM = 0, t2CLF = 0;
    let t3CLM = 0, t3CLF = 0, t4CLM = 0, t4CLF = 0;
    let grandEff = 0, grandIneff = 0, grandTotal = 0;

    dom.s1DispositionTableBody.innerHTML = rows.map(r => {
      t1CLM += (r.firstCL_M || 0); t1CLF += (r.firstCL_F || 0);
      t2CLM += (r.secondCL_M || 0); t2CLF += (r.secondCL_F || 0);
      t3CLM += (r.thirdCL_M || 0); t3CLF += (r.thirdCL_F || 0);
      t4CLM += (r.fourthCL_M || 0); t4CLF += (r.fourthCL_F || 0);
      grandEff += (r.effectiveTotal || 0);
      grandIneff += (r.ineffectiveTotal || 0);
      grandTotal += (r.total || 0);

      return `
        <tr class="hover:bg-slate-50/70 transition-colors">
          <td class="py-3 px-3 font-sans font-bold text-slate-900">${r.name || 'Coy'} Company ('${r.code || '-'}')</td>
          <td class="py-3 px-2 text-center text-slate-700">${r.firstCL_M || 0} / <span class="text-blue-600 font-semibold">${r.firstCL_F || 0}</span></td>
          <td class="py-3 px-2 text-center text-slate-700">${r.secondCL_M || 0} / <span class="text-blue-600 font-semibold">${r.secondCL_F || 0}</span></td>
          <td class="py-3 px-2 text-center text-slate-700">${r.thirdCL_M || 0} / <span class="text-blue-600 font-semibold">${r.thirdCL_F || 0}</span></td>
          <td class="py-3 px-2 text-center text-slate-700">${r.fourthCL_M || 0} / <span class="text-blue-600 font-semibold">${r.fourthCL_F || 0}</span></td>
          <td class="py-3 px-2 text-center font-bold text-emerald-700 bg-emerald-50/40 rounded">${r.effectiveTotal || 0}</td>
          <td class="py-3 px-2 text-center font-bold ${(r.ineffectiveTotal || 0) > 0 ? 'text-amber-700 bg-amber-50/40' : 'text-slate-400'} rounded">${r.ineffectiveTotal || 0}</td>
          <td class="py-3 px-3 text-right font-bold text-blue-950 font-mono-clean text-sm">${r.total || 0}</td>
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
      const extList = Array.isArray(disp.externalPersonnel) ? disp.externalPersonnel : [];
      dom.s1ExternalPersonnelGrid.innerHTML = extList.map(ext => `
        <div class="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1">
          <div class="flex items-center justify-between">
            <span class="font-bold text-slate-800 text-[11px]">${ext.category || 'External'}</span>
            <span class="px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 text-[9px] font-bold uppercase">${ext.status || 'Active'}</span>
          </div>
          <div class="flex items-baseline justify-between pt-1">
            <span class="text-slate-500 text-[10px]">M: ${ext.male || 0} &bull; F: ${ext.female || 0}</span>
            <span class="font-mono-clean font-bold text-blue-900 text-sm">${ext.total || 0}</span>
          </div>
        </div>
      `).join('');
    }
  }

  // 2. ARMORY & RSO RENDERER
  function renderS1Armory() {
    if (!dom.s1ArmoryTableBody) return;
    const arm = CCAFP_CONFIG.s1Data?.armory;
    if (!arm) return;
    const rows = Array.isArray(arm.rows) ? arm.rows : (Array.isArray(arm.items) ? arm.items : []);

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

    // Dynamic Verification Signatures (Always Real-Time & Live from SOC)
    const sched = CCAFP_CONFIG.scheduleOfCalls || {};
    const odEntry = (sched.guardRoster || []).find(g => g.postCode === 'OD' || (g.post && g.post.startsWith('OD')));
    let odName = (odEntry && odEntry.posted) ? odEntry.posted : "JHOPRILYN S MANGAGOM C-27151 'D' CO";
    if (!odName.toUpperCase().includes('CDT')) odName = `CDT LT ${odName}`;
    const prep = `${odName} (Officer-of-the-Day)`;

    const chk = "CDT 1CL CARLO JOSEPH G MAGAYANES C-26226 (AC of RS for Supply / RSO)";

    const ocName = sched.officers?.oc || "MAJ JAMES A MARTINEZ PA";
    const noted = `${ocName} (Officer-in-Charge)`;

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

  // 3. ATTACHMENT RENDERER (ALL 12 CATEGORIES)
  function renderS1Attachment() {
    if (!dom.s1AttachmentTableBody) return;
    const att = CCAFP_CONFIG.s1Data?.attachment || {};

    const fadList = Array.isArray(att.fadList) ? att.fadList : [];
    const siqList = Array.isArray(att.siqList) ? att.siqList : [];
    const fdpshList = Array.isArray(att.fdpshList) ? att.fdpshList : [];
    const vlunaList = Array.isArray(att.vlunaList) ? att.vlunaList : [];
    const obList = Array.isArray(att.obList) ? att.obList : [];
    const entruckingList = Array.isArray(att.entruckingList) ? att.entruckingList : [];
    const leaveList = Array.isArray(att.leaveList) ? att.leaveList : [];
    const holdingCenterList = Array.isArray(att.holdingCenterList) ? att.holdingCenterList : [];
    const clearingOutList = Array.isArray(att.clearingOutList) ? att.clearingOutList : [];
    const clearingInList = Array.isArray(att.clearingInList) ? att.clearingInList : [];
    const ghqList = Array.isArray(att.ghqList) ? att.ghqList : [];
    const stockadeList = Array.isArray(att.stockadeList) ? att.stockadeList : [];

    const allItems = [
      ...fadList.map(x => ({ ...x, category: 'FAD', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200', details: x.condition || x.reason, extra: x.remarks || x.release || '-' })),
      ...siqList.map(x => ({ ...x, category: 'SIQ', badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200', details: x.reason || x.condition, extra: x.remarks || x.release || '-' })),
      ...fdpshList.map(x => ({ ...x, category: 'FDPSH', badgeColor: 'bg-red-50 text-red-700 border-red-200', details: x.reason || x.condition, extra: x.remarks || x.release || 'FDPSH' })),
      ...vlunaList.map(x => ({ ...x, category: 'VLUNA', badgeColor: 'bg-rose-50 text-rose-700 border-rose-200', details: x.reason || x.condition, extra: x.remarks || x.release || 'V-Luna Hosp' })),
      ...obList.map(x => ({ ...x, category: 'OB', badgeColor: 'bg-teal-50 text-teal-700 border-teal-200', details: x.reason || x.condition, extra: x.remarks || 'Official Business' })),
      ...entruckingList.map(x => ({ ...x, category: 'Entrucking', badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200', details: x.reason || x.condition, extra: x.remarks || 'Detailed Duty' })),
      ...leaveList.map(x => ({ ...x, category: 'Leave', badgeColor: 'bg-violet-50 text-violet-700 border-violet-200', details: x.reason || x.condition, extra: x.remarks || 'Emergency Leave' })),
      ...holdingCenterList.map(x => ({ ...x, category: 'Holding Center', badgeColor: 'bg-amber-50 text-amber-800 border-amber-200', details: x.reason || x.condition, extra: x.barracks || x.remarks || '1st Floor FH' })),
      ...clearingOutList.map(x => ({ ...x, category: 'Clearing-Out', badgeColor: 'bg-orange-50 text-orange-700 border-orange-200', details: x.reason || x.condition, extra: x.remarks || '-' })),
      ...clearingInList.map(x => ({ ...x, category: 'Clearing-In', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', details: x.reason || x.condition, extra: x.remarks || 'Regis Hall' })),
      ...ghqList.map(x => ({ ...x, category: 'GHQ Detail', badgeColor: 'bg-purple-50 text-purple-700 border-purple-200', details: x.reason || x.condition, extra: x.remarks || 'GHQ' })),
      ...stockadeList.map(x => ({ ...x, category: 'PMA Stockade', badgeColor: 'bg-slate-100 text-slate-800 border-slate-300', details: x.reason || x.condition, extra: x.remarks || 'PMA Stockade' }))
    ];

    // Update counts
    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setEl('count-all', allItems.length);
    setEl('count-fad', fadList.length);
    setEl('count-siq', siqList.length);
    setEl('count-fdpsh', fdpshList.length);
    setEl('count-vluna', vlunaList.length);
    setEl('count-ob', obList.length);
    setEl('count-entrucking', entruckingList.length);
    setEl('count-leave', leaveList.length);
    setEl('count-holding', holdingCenterList.length);
    setEl('count-clearingout', clearingOutList.length);
    setEl('count-clearingin', clearingInList.length);
    setEl('count-ghq', ghqList.length);
    setEl('count-stockade', stockadeList.length);

    let filtered = allItems;
    const cat = (state.s1AttachmentCat || 'all').toLowerCase();
    if (cat === 'fad') filtered = filtered.filter(i => i.category === 'FAD');
    else if (cat === 'siq') filtered = filtered.filter(i => i.category === 'SIQ');
    else if (cat === 'fdpsh') filtered = filtered.filter(i => i.category === 'FDPSH');
    else if (cat === 'vluna') filtered = filtered.filter(i => i.category === 'VLUNA');
    else if (cat === 'ob') filtered = filtered.filter(i => i.category === 'OB');
    else if (cat === 'entrucking') filtered = filtered.filter(i => i.category === 'Entrucking');
    else if (cat === 'leave') filtered = filtered.filter(i => i.category === 'Leave');
    else if (cat === 'holding') filtered = filtered.filter(i => i.category === 'Holding Center');
    else if (cat === 'clearing-out') filtered = filtered.filter(i => i.category === 'Clearing-Out');
    else if (cat === 'clearing-in') filtered = filtered.filter(i => i.category === 'Clearing-In');
    else if (cat === 'ghq') filtered = filtered.filter(i => i.category.includes('GHQ'));
    else if (cat === 'stockade') filtered = filtered.filter(i => i.category.includes('Stockade'));

    const q = (state.s1AttachmentQuery || '').toLowerCase().trim();
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
            No cadet attachment records found matching current category or search criteria.
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
    const staffData = CCAFP_CONFIG.s1Data?.regimentStaff2027 || CCAFP_CONFIG.s1Data?.regimentStaff || {};

    const cmd = Array.isArray(staffData.commandSection) ? staffData.commandSection : [];
    const coord = Array.isArray(staffData.coordinatingStaff) ? staffData.coordinatingStaff : [];
    const spec = Array.isArray(staffData.specialStaff) ? staffData.specialStaff : [];
    const ncos = Array.isArray(staffData.ncos) ? staffData.ncos : [];

    const allEntries = [
      ...cmd.map(s => ({ ...s, section: 'command', sectionLabel: 'COMMAND SECTION', borderClass: 'stripe-red' })),
      ...coord.map(s => ({ ...s, section: 'coordinating', sectionLabel: `COORDINATING STAFF (${s.code || ''})`, borderClass: 'stripe-blue' })),
      ...spec.map(s => ({ ...s, section: 'special', sectionLabel: 'SPECIAL STAFF OFFICER', borderClass: 'stripe-amber' })),
      ...ncos.map(s => ({ ...s, section: 'ncos', sectionLabel: 'REGIMENTAL NCO', borderClass: 'stripe-emerald' }))
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

  // 6. EXPANDED ROLL RENDERER (1,235 CADETS - 1CL, 2CL, 3CL, 4CL)
  function renderS1Expanded() {
    if (!dom.s1ExpandedTableBody) return;
    const list = CCAFP_CONFIG.s1Data?.expanded || (window.S1_SPIRITUAL_DATA && window.S1_SPIRITUAL_DATA.expanded) || [];
    const q = (state.s1ExpandedQuery || '').toLowerCase().trim();
    const classFilter = (state.s1ExpandedClass || 'all').toUpperCase();
    const coyFilter = (state.s1ExpandedCoy || 'all').toUpperCase();

    const filtered = list.filter(item => {
      if (classFilter !== 'ALL' && (item.class || '').toUpperCase() !== classFilter) {
        return false;
      }
      if (coyFilter !== 'ALL' && (item.coy || '').toUpperCase() !== coyFilter) {
        return false;
      }
      if (!q) return true;
      return (item.name || '').toLowerCase().includes(q) ||
             (item.sn || '').toLowerCase().includes(q) ||
             (item.designation || '').toLowerCase().includes(q) ||
             (item.religion || '').toLowerCase().includes(q) ||
             (item.region || '').toLowerCase().includes(q) ||
             (item.bos || '').toLowerCase().includes(q) ||
             (item.coy || '').toLowerCase().includes(q) ||
             (item.class || '').toLowerCase().includes(q) ||
             (item.contact || '').toLowerCase().includes(q);
    });

    // Update active class pills UI
    document.querySelectorAll('.s1-expanded-class-pill').forEach(pill => {
      const c = (pill.getAttribute('data-expanded-class') || '').toUpperCase();
      if (c === classFilter) {
        pill.className = 's1-expanded-class-pill active-pill px-3 py-1 rounded-lg bg-blue-900 text-white font-semibold flex-shrink-0';
      } else {
        pill.className = 's1-expanded-class-pill px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 flex-shrink-0';
      }
    });

    // Update active coy pills UI
    document.querySelectorAll('.s1-expanded-coy-pill').forEach(pill => {
      const cy = (pill.getAttribute('data-expanded-coy') || '').toUpperCase();
      if (cy === coyFilter) {
        pill.className = 's1-expanded-coy-pill active-pill px-3 py-1 rounded-lg bg-blue-900 text-white font-semibold flex-shrink-0';
      } else {
        pill.className = 's1-expanded-coy-pill px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 flex-shrink-0';
      }
    });

    if (filtered.length === 0) {
      dom.s1ExpandedTableBody.innerHTML = `
        <tr>
          <td colspan="13" class="py-8 text-center text-slate-400 font-mono-clean text-xs">
            No matching cadets found in Master Expanded Roll.
          </td>
        </tr>
      `;
      if (dom.s1ExpandedPagination) dom.s1ExpandedPagination.innerHTML = '';
      return;
    }

    const pageSize = state.s1ExpandedPageSize === 'all' ? filtered.length : (parseInt(state.s1ExpandedPageSize, 10) || 50);
    const totalPages = Math.max(1, Math.ceil(filtered.length / (pageSize || 1)));
    if (state.s1ExpandedPage > totalPages) state.s1ExpandedPage = totalPages;
    if (state.s1ExpandedPage < 1) state.s1ExpandedPage = 1;
    const startIdx = (state.s1ExpandedPage - 1) * pageSize;
    const pageItems = state.s1ExpandedPageSize === 'all' ? filtered : filtered.slice(startIdx, startIdx + pageSize);

    const bosBadge = (bos) => {
      const b = (bos || '').toUpperCase();
      if (b.includes('PA') && !b.includes('PAF')) return '<span class="px-2 py-0.5 rounded font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">PA</span>';
      if (b.includes('PAF')) return '<span class="px-2 py-0.5 rounded font-bold bg-blue-50 text-blue-800 border border-blue-200">PAF</span>';
      if (b.includes('PN')) return '<span class="px-2 py-0.5 rounded font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">PN</span>';
      return `<span class="px-2 py-0.5 rounded font-bold bg-slate-100 text-slate-700">${b || '-'}</span>`;
    };

    const classBadge = (cl) => {
      const c = (cl || '').toUpperCase();
      if (c === '1CL') return '<span class="font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 text-[10px]">1CL</span>';
      if (c === '2CL') return '<span class="font-bold text-blue-800 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 text-[10px]">2CL</span>';
      if (c === '3CL') return '<span class="font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[10px]">3CL</span>';
      if (c === '4CL') return '<span class="font-bold text-purple-800 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200 text-[10px]">4CL</span>';
      return `<span class="font-bold text-slate-700 text-[10px]">${c || '-'}</span>`;
    };

    const coyBadge = (coy) => {
      const c = (coy || '').toUpperCase();
      return `<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">${c || '-'}</span>`;
    };

    dom.s1ExpandedTableBody.innerHTML = pageItems.map((c, idx) => `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="py-2.5 px-2 text-slate-400 text-[11px]">${startIdx + idx + 1}</td>
        <td class="py-2.5 px-2 text-center">${classBadge(c.class)}</td>
        <td class="py-2.5 px-3 font-semibold text-slate-900">${c.name || '-'}</td>
        <td class="py-2.5 px-2 text-blue-900 font-bold text-[11px]">${c.sn || '-'}</td>
        <td class="py-2.5 px-2 text-center">${coyBadge(c.coy)}</td>
        <td class="py-2.5 px-2 text-slate-600 text-[11px]">${c.platoon || '-'} / ${c.squad || '-'}</td>
        <td class="py-2.5 px-3 text-slate-700 font-medium text-[11px]">${c.designation || '-'}</td>
        <td class="py-2.5 px-2 text-center">${bosBadge(c.bos)}</td>
        <td class="py-2.5 px-2 text-center font-bold ${c.gender === 'F' ? 'text-rose-600' : 'text-slate-700'}">${c.gender || '-'}</td>
        <td class="py-2.5 px-2 text-center"><span class="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-100">${c.blood || '-'}</span></td>
        <td class="py-2.5 px-3 text-slate-600 text-[11px] truncate max-w-[150px]" title="${c.religion || ''}">${c.religion || '-'}</td>
        <td class="py-2.5 px-2 text-slate-600 text-[11px]">${c.region || '-'}</td>
        <td class="py-2.5 px-3 text-slate-600 text-[11px]">${c.contact || '—'}</td>
      </tr>
    `).join('');

    // Pagination container
    if (dom.s1ExpandedPagination) {
      const endIdx = state.s1ExpandedPageSize === 'all' ? filtered.length : Math.min(startIdx + pageSize, filtered.length);
      dom.s1ExpandedPagination.innerHTML = `
        <div class="text-xs text-slate-600 font-medium">
          Showing ${filtered.length > 0 ? startIdx + 1 : 0}-${endIdx} of ${filtered.length} cadets (${list.length} total)
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1 mr-2">
            <span class="text-[11px] text-slate-400">Rows:</span>
            <select id="s1ExpandedPageSizeSelect" class="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 focus:outline-none">
              <option value="50" ${state.s1ExpandedPageSize == 50 ? 'selected' : ''}>50</option>
              <option value="100" ${state.s1ExpandedPageSize == 100 ? 'selected' : ''}>100</option>
              <option value="250" ${state.s1ExpandedPageSize == 250 ? 'selected' : ''}>250</option>
              <option value="all" ${state.s1ExpandedPageSize === 'all' ? 'selected' : ''}>All</option>
            </select>
          </div>
          <button id="s1ExpandedPrevBtn" class="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors" ${state.s1ExpandedPage <= 1 ? 'disabled' : ''}>
            &larr; Prev
          </button>
          <span class="px-2 text-xs font-bold text-slate-800">${state.s1ExpandedPage} / ${totalPages}</span>
          <button id="s1ExpandedNextBtn" class="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors" ${state.s1ExpandedPage >= totalPages ? 'disabled' : ''}>
            Next &rarr;
          </button>
        </div>
      `;
      const prevBtn = document.getElementById('s1ExpandedPrevBtn');
      const nextBtn = document.getElementById('s1ExpandedNextBtn');
      const sizeSelect = document.getElementById('s1ExpandedPageSizeSelect');
      if (prevBtn) prevBtn.onclick = () => { if (state.s1ExpandedPage > 1) { state.s1ExpandedPage--; renderS1Expanded(); } };
      if (nextBtn) nextBtn.onclick = () => { if (state.s1ExpandedPage < totalPages) { state.s1ExpandedPage++; renderS1Expanded(); } };
      if (sizeSelect) sizeSelect.onchange = (e) => { state.s1ExpandedPageSize = e.target.value; state.s1ExpandedPage = 1; renderS1Expanded(); };
    }
  }

  // 7. CLASS ROSTER RENDERER (CONSOLIDATED INTO EXPANDED ROLL)
  function renderS1Roster() {
    renderS1Expanded();
  }

  // 8. SQUAD ORGANIZATION MATRIX RENDERER (ALL 8 COMPANIES)
  function renderS1Squads() {
    if (!dom.s1SquadGridContainer) return;
    const squads = CCAFP_CONFIG.s1Data?.squads || (window.S1_SPIRITUAL_DATA && window.S1_SPIRITUAL_DATA.squads) || {};
    const activeCoy = (state.s1SquadCoy || 'ALFA').toUpperCase();
    const activeSquadKey = state.s1SquadActive || '1ST SQUAD';

    const coyData = squads[activeCoy] || squads['ALFA'] || squads;
    const activeSquad = coyData[activeSquadKey] || (squads[activeSquadKey] ? squads[activeSquadKey] : { p1: [], p2: [], p3: [], p4: [] });

    // Update company pills UI
    document.querySelectorAll('.s1-squad-coy-pill').forEach(btn => {
      const c = (btn.getAttribute('data-squad-coy') || '').toUpperCase();
      if (c === activeCoy) {
        btn.className = 's1-squad-coy-pill active-pill px-3 py-1.5 rounded-xl bg-blue-900 text-white font-semibold flex-shrink-0';
      } else {
        btn.className = 's1-squad-coy-pill px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium flex-shrink-0';
      }
    });

    // Update squad pills UI
    document.querySelectorAll('.s1-squad-tab-pill').forEach(btn => {
      const sq = btn.getAttribute('data-squad');
      if (sq === activeSquadKey) {
        btn.className = 's1-squad-tab-pill active-pill px-3 py-1.5 rounded-xl bg-blue-900 text-white font-semibold flex-shrink-0';
      } else {
        btn.className = 's1-squad-tab-pill px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium flex-shrink-0';
      }
    });

    // Update title badge
    if (dom.s1SquadTitleBadge) {
      const totalCadets = (activeSquad.p1?.length || 0) + (activeSquad.p2?.length || 0) + (activeSquad.p3?.length || 0) + (activeSquad.p4?.length || 0);
      dom.s1SquadTitleBadge.textContent = `${activeCoy} COMPANY • ${activeSquadKey} (${totalCadets} CADETS)`;
    }

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
            const mUpper = m.toUpperCase();
            const is1CL = mUpper.includes('1CL');
            const is2CL = mUpper.includes('2CL');
            const is3CL = mUpper.includes('3CL');
            const is4CL = mUpper.includes('4CL');
            const badge = is1CL 
              ? '<span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">1CL</span>'
              : (is2CL ? '<span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">2CL</span>' : (is3CL ? '<span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">3CL</span>' : (is4CL ? '<span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">4CL</span>' : '<span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">CDT</span>')));
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

  // 9. APE MEDICAL MONITORING RENDERER (854 CADETS AUDITED)
  function renderS1Ape() {
    if (!dom.s1ApeTableBody) return;
    const list = CCAFP_CONFIG.s1Data?.ape || (window.S1_SPIRITUAL_DATA && window.S1_SPIRITUAL_DATA.ape) || [];
    const q = (state.s1ApeQuery || '').toLowerCase().trim();
    const classFilter = (state.s1ApeClass || 'all').toUpperCase();
    const coyFilter = (state.s1ApeCompany || 'all').toUpperCase();

    const filtered = list.filter(item => {
      // Cohort Filter
      if (classFilter !== 'ALL' && (item.class || '').toUpperCase() !== classFilter) {
        return false;
      }
      // Company Filter
      if (coyFilter !== 'ALL' && (item.coy || '').toUpperCase() !== coyFilter) {
        return false;
      }
      // Search Query
      if (!q) return true;
      return (item.name || '').toLowerCase().includes(q) ||
             (item.sn || '').toLowerCase().includes(q) ||
             (item.coy || '').toLowerCase().includes(q) ||
             (item.class || '').toLowerCase().includes(q) ||
             (item.remarks || '').toLowerCase().includes(q);
    });

    // Update Header Badges
    if (dom.s1ApeTotalCountBadge) {
      dom.s1ApeTotalCountBadge.textContent = `${filtered.length} CADETS AUDITED (${list.length} TOTAL)`;
    }

    if (filtered.length === 0) {
      dom.s1ApeTableBody.innerHTML = `
        <tr>
          <td colspan="17" class="py-12 text-center text-slate-400 font-mono-clean text-xs">
            No APE medical diagnostic records matching selected cohort, company, or search query.
          </td>
        </tr>
      `;
      if (dom.s1ApePaginationInfo) dom.s1ApePaginationInfo.textContent = 'Showing 0 of 0 cadets';
      if (dom.s1ApePageNumber) dom.s1ApePageNumber.textContent = '0 / 0';
      if (dom.s1ApePrevBtn) dom.s1ApePrevBtn.disabled = true;
      if (dom.s1ApeNextBtn) dom.s1ApeNextBtn.disabled = true;
      return;
    }

    // Pagination
    const pageSize = state.s1ApePageSize === 'all' ? filtered.length : (parseInt(state.s1ApePageSize, 10) || 50);
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    if (state.s1ApePage > totalPages) state.s1ApePage = totalPages;
    if (state.s1ApePage < 1) state.s1ApePage = 1;
    const startIdx = (state.s1ApePage - 1) * pageSize;
    const pageItems = state.s1ApePageSize === 'all' ? filtered : filtered.slice(startIdx, startIdx + pageSize);

    if (dom.s1ApePaginationInfo) {
      const endIdx = state.s1ApePageSize === 'all' ? filtered.length : Math.min(startIdx + pageSize, filtered.length);
      dom.s1ApePaginationInfo.textContent = `Showing ${startIdx + 1}-${endIdx} of ${filtered.length} cadets`;
    }
    if (dom.s1ApePageNumber) {
      dom.s1ApePageNumber.textContent = `${state.s1ApePage} / ${totalPages}`;
    }
    if (dom.s1ApePrevBtn) {
      dom.s1ApePrevBtn.disabled = state.s1ApePage <= 1;
    }
    if (dom.s1ApeNextBtn) {
      dom.s1ApeNextBtn.disabled = state.s1ApePage >= totalPages;
    }

    const checkIcon = (val, title) => {
      const isDone = String(val).trim().toUpperCase() === 'TRUE';
      return isDone
        ? `<span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold" title="${title}: Done">✓</span>`
        : `<span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-300 text-[10px]" title="${title}: Pending">✕</span>`;
    };

    const coyBadge = (coy) => {
      const c = (coy || '').toUpperCase();
      const map = {
        ALFA: { label: 'A Co', color: 'bg-red-50 text-red-700 border-red-200' },
        BRAVO: { label: 'B Co', color: 'bg-blue-50 text-blue-700 border-blue-200' },
        CHARLIE: { label: 'C Co', color: 'bg-amber-50 text-amber-700 border-amber-200' },
        DELTA: { label: 'D Co', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
        ECHO: { label: 'E Co', color: 'bg-purple-50 text-purple-700 border-purple-200' },
        FOXTROT: { label: 'F Co', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
        GOLF: { label: 'G Co', color: 'bg-teal-50 text-teal-700 border-teal-200' },
        HAWK: { label: 'H Co', color: 'bg-rose-50 text-rose-700 border-rose-200' },
      };
      const info = map[c] || { label: c || '-', color: 'bg-slate-100 text-slate-600 border-slate-200' };
      return `<span class="px-1.5 py-0.5 rounded text-[10px] font-bold border ${info.color}">${info.label}</span>`;
    };

    const classBadge = (cl) => {
      const c = (cl || '').toUpperCase();
      if (c === '1CL') return '<span class="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 text-[10px]">1CL</span>';
      if (c === '2CL') return '<span class="font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 text-[10px]">2CL</span>';
      if (c === '3CL') return '<span class="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[10px]">3CL</span>';
      return `<span class="font-bold text-slate-700 text-[10px]">${c}</span>`;
    };

    const tests = ['urinalysis', 'blood', 'vitals', 'eye', 'ecg', 'xray', 'npExam', 'npInterview', 'dental', 'physical'];

    dom.s1ApeTableBody.innerHTML = pageItems.map((c, idx) => {
      const doneCount = c.doneCount !== undefined
        ? c.doneCount
        : tests.filter(t => String(c[t]).trim().toUpperCase() === 'TRUE').length;

      let progressPill = '';
      if (doneCount === 10) {
        progressPill = '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">10/10 ✓</span>';
      } else if (doneCount >= 7) {
        progressPill = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">${doneCount}/10</span>`;
      } else if (doneCount > 0) {
        progressPill = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">${doneCount}/10</span>`;
      } else {
        progressPill = '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">0/10</span>';
      }

      const remarksText = c.remarks || (doneCount === 10 ? 'Complete' : 'In Progress');
      const isComplete = remarksText.toUpperCase().includes('COMPLET') || doneCount === 10;

      return `
        <tr class="hover:bg-slate-50/80 transition-colors">
          <td class="py-2.5 px-2 text-center text-slate-400 text-[11px]">${startIdx + idx + 1}</td>
          <td class="py-2.5 px-2 text-center">${classBadge(c.class)}</td>
          <td class="py-2.5 px-2 text-center">${coyBadge(c.coy)}</td>
          <td class="py-2.5 px-3 font-semibold text-slate-900">${c.name || '-'}</td>
          <td class="py-2.5 px-2.5 text-blue-900 font-bold text-[11px]">${c.sn || '-'}</td>
          <td class="py-2.5 px-1.5 text-center">${checkIcon(c.urinalysis, 'Urinalysis')}</td>
          <td class="py-2.5 px-1.5 text-center">${checkIcon(c.blood, 'Blood')}</td>
          <td class="py-2.5 px-1.5 text-center">${checkIcon(c.vitals, 'Vitals')}</td>
          <td class="py-2.5 px-1.5 text-center">${checkIcon(c.eye, 'Eye')}</td>
          <td class="py-2.5 px-1.5 text-center">${checkIcon(c.ecg, 'ECG')}</td>
          <td class="py-2.5 px-1.5 text-center">${checkIcon(c.xray, 'X-Ray')}</td>
          <td class="py-2.5 px-1.5 text-center">${checkIcon(c.npExam, 'NP Exam')}</td>
          <td class="py-2.5 px-1.5 text-center">${checkIcon(c.npInterview, 'NP Interview')}</td>
          <td class="py-2.5 px-1.5 text-center">${checkIcon(c.dental, 'Dental')}</td>
          <td class="py-2.5 px-1.5 text-center">${checkIcon(c.physical, 'Physical GPE')}</td>
          <td class="py-2.5 px-2 text-center">${progressPill}</td>
          <td class="py-2.5 px-3">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold truncate max-w-[150px] inline-block ${
              isComplete
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : remarksText.includes('lacking')
                  ? 'bg-rose-50 text-rose-800 border border-rose-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
            }" title="${remarksText}">
              ${remarksText}
            </span>
          </td>
        </tr>
      `;
    }).join('');
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

  // 11. TIN & PHILHEALTH RENDERER (822 CADETS - 1CL, 2CL, 3CL)
  function renderS1Tin() {
    if (!dom.s1TinTableBody) return;
    const list = CCAFP_CONFIG.s1Data?.tin || (window.S1_SPIRITUAL_DATA && window.S1_SPIRITUAL_DATA.tin) || [];
    const classFilter = (state.s1TinClass || 'all').toUpperCase();
    const coyFilter = (state.s1TinCoy || 'all').toUpperCase();
    const q = (state.s1TinQuery || '').toLowerCase().trim();

    const filtered = list.filter(item => {
      if (classFilter !== 'ALL' && (item.class || '').toUpperCase() !== classFilter) {
        return false;
      }
      if (coyFilter !== 'ALL' && (item.coy || '').toUpperCase() !== coyFilter) {
        return false;
      }
      if (!q) return true;
      return (item.name || '').toLowerCase().includes(q) ||
             (item.sn || '').toLowerCase().includes(q) ||
             (item.tin || '').toLowerCase().includes(q) ||
             (item.philhealth || '').toLowerCase().includes(q) ||
             (item.coy || '').toLowerCase().includes(q) ||
             (item.class || '').toLowerCase().includes(q);
    });

    if (dom.s1TinTotalBadge) {
      dom.s1TinTotalBadge.textContent = `${filtered.length} CADETS ON FILE (${list.length} TOTAL)`;
    }

    // Update active class pills UI
    document.querySelectorAll('.s1-tin-class-pill').forEach(btn => {
      const c = (btn.getAttribute('data-tin-class') || '').toUpperCase();
      if (c === classFilter) {
        btn.className = 's1-tin-class-pill active-pill px-3 py-1 rounded-lg bg-blue-900 text-white font-semibold flex-shrink-0';
      } else {
        btn.className = 's1-tin-class-pill px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 flex-shrink-0';
      }
    });

    // Update active company pills UI
    document.querySelectorAll('.s1-tin-coy-pill').forEach(btn => {
      const cy = (btn.getAttribute('data-tin-coy') || '').toUpperCase();
      if (cy === coyFilter) {
        btn.className = 's1-tin-coy-pill active-pill px-3 py-1 rounded-lg bg-blue-900 text-white font-semibold flex-shrink-0';
      } else {
        btn.className = 's1-tin-coy-pill px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 flex-shrink-0';
      }
    });

    if (filtered.length === 0) {
      dom.s1TinTableBody.innerHTML = `
        <tr>
          <td colspan="9" class="py-8 text-center text-slate-400 font-mono-clean text-xs">
            No TIN & PhilHealth records found matching current criteria.
          </td>
        </tr>
      `;
      if (dom.s1TinPagination) dom.s1TinPagination.innerHTML = '';
      return;
    }

    const pageSize = state.s1TinPageSize === 'all' ? filtered.length : (parseInt(state.s1TinPageSize, 10) || 50);
    const totalPages = Math.max(1, Math.ceil(filtered.length / (pageSize || 1)));
    if (state.s1TinPage > totalPages) state.s1TinPage = totalPages;
    if (state.s1TinPage < 1) state.s1TinPage = 1;
    const startIdx = (state.s1TinPage - 1) * pageSize;
    const pageItems = state.s1TinPageSize === 'all' ? filtered : filtered.slice(startIdx, startIdx + pageSize);

    const classBadge = (cl) => {
      const c = (cl || '').toUpperCase();
      if (c === '1CL') return '<span class="font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 text-[10px]">1CL</span>';
      if (c === '2CL') return '<span class="font-bold text-blue-800 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 text-[10px]">2CL</span>';
      if (c === '3CL') return '<span class="font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[10px]">3CL</span>';
      return `<span class="font-bold text-slate-700 text-[10px]">${c || '-'}</span>`;
    };

    const coyBadge = (coy) => {
      const c = (coy || '').toUpperCase();
      return `<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">${c || '-'}</span>`;
    };

    dom.s1TinTableBody.innerHTML = pageItems.map((c, idx) => `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="py-2.5 px-2 text-slate-400 text-[11px]">${startIdx + idx + 1}</td>
        <td class="py-2.5 px-2 text-center">${classBadge(c.class)}</td>
        <td class="py-2.5 px-3 font-semibold text-slate-900">${c.name || '-'}</td>
        <td class="py-2.5 px-3 text-blue-900 font-bold text-[11px]">${c.sn || '-'}</td>
        <td class="py-2.5 px-2 text-center">${coyBadge(c.coy)}</td>
        <td class="py-2.5 px-2 text-center font-bold ${c.gender === 'F' ? 'text-rose-600' : 'text-slate-700'}">${c.gender || '-'}</td>
        <td class="py-2.5 px-3 text-slate-600 text-[11px]">${c.bdate || '-'}</td>
        <td class="py-2.5 px-3 font-mono text-emerald-800 font-semibold bg-emerald-50/30 text-[11px]">${c.tin || '—'}</td>
        <td class="py-2.5 px-3 font-mono text-slate-800 text-[11px]">${c.philhealth || '—'}</td>
      </tr>
    `).join('');

    if (dom.s1TinPagination) {
      const endIdx = state.s1TinPageSize === 'all' ? filtered.length : Math.min(startIdx + pageSize, filtered.length);
      dom.s1TinPagination.innerHTML = `
        <div class="text-xs text-slate-600 font-medium">
          Showing ${filtered.length > 0 ? startIdx + 1 : 0}-${endIdx} of ${filtered.length} cadets (${list.length} total)
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1 mr-2">
            <span class="text-[11px] text-slate-400">Rows:</span>
            <select id="s1TinPageSizeSelect" class="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 focus:outline-none">
              <option value="50" ${state.s1TinPageSize == 50 ? 'selected' : ''}>50</option>
              <option value="100" ${state.s1TinPageSize == 100 ? 'selected' : ''}>100</option>
              <option value="250" ${state.s1TinPageSize == 250 ? 'selected' : ''}>250</option>
              <option value="all" ${state.s1TinPageSize === 'all' ? 'selected' : ''}>All</option>
            </select>
          </div>
          <button id="s1TinPrevBtn" class="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors" ${state.s1TinPage <= 1 ? 'disabled' : ''}>
            &larr; Prev
          </button>
          <span class="px-2 text-xs font-bold text-slate-800">${state.s1TinPage} / ${totalPages}</span>
          <button id="s1TinNextBtn" class="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors" ${state.s1TinPage >= totalPages ? 'disabled' : ''}>
            Next &rarr;
          </button>
        </div>
      `;
      const prevBtn = document.getElementById('s1TinPrevBtn');
      const nextBtn = document.getElementById('s1TinNextBtn');
      const sizeSelect = document.getElementById('s1TinPageSizeSelect');
      if (prevBtn) prevBtn.onclick = () => { if (state.s1TinPage > 1) { state.s1TinPage--; renderS1Tin(); } };
      if (nextBtn) nextBtn.onclick = () => { if (state.s1TinPage < totalPages) { state.s1TinPage++; renderS1Tin(); } };
      if (sizeSelect) sizeSelect.onchange = (e) => { state.s1TinPageSize = e.target.value; state.s1TinPage = 1; renderS1Tin(); };
    }
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

  // --- Daily Bible Verse Store & Laptop Bible Study Sync ---
  const BIBLE_VERSES_MONTHLY = [
    { text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", reference: "Joshua 1:9", reflection: "Courage in duty and steadfast faith." },
    { text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.", reference: "Proverbs 3:5-6", reflection: "Total surrender of plans into God's sovereign guidance." },
    { text: "I can do all this through him who gives me strength.", reference: "Philippians 4:13", reflection: "Endurance through spiritual reliance." },
    { text: "Those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.", reference: "Isaiah 40:31", reflection: "Unwearied perseverance in rigorous discipline." },
    { text: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.", reference: "Psalm 23:1-3", reflection: "Spiritual rest and replenishment." },
    { text: "God is our refuge and strength, an ever-present help in trouble. Therefore we will not fear, though the earth give way.", reference: "Psalm 46:1-2", reflection: "Divine anchor in life's tempests." },
    { text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", reference: "Romans 8:28", reflection: "All trials refine our character for higher purposes." },
    { text: "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.", reference: "Micah 6:8", reflection: "The hallmarks of true military and spiritual honor." },
    { text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.", reference: "2 Timothy 1:7", reflection: "Discipline, sound mind, and fearless purpose." },
    { text: "Your word is a lamp for my feet, a light on my path.", reference: "Psalm 119:105", reflection: "Divine guidance through daily scripture meditation." },
    { text: "Be on your guard; stand firm in the faith; be courageous; be strong. Do everything in love.", reference: "1 Corinthians 16:13-14", reflection: "Vigilance, courage, and unconditional love." },
    { text: "The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?", reference: "Psalm 27:1", reflection: "Fearless conviction in God's eternal protection." },
    { text: "Finally, be strong in the Lord and in his mighty power. Put on the full armor of God, so that you can take your stand against the devil's schemes.", reference: "Ephesians 6:10-11", reflection: "Spiritual armor for the warrior of Christ." },
    { text: "Come to me, all you who are weary and burdened, and I will give you rest.", reference: "Matthew 11:28", reflection: "Peace in Christ amidst demanding routines." },
    { text: "The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness.", reference: "Lamentations 3:22-23", reflection: "A fresh start every dawn." },
    { text: "Commit to the Lord whatever you do, and he will establish your plans.", reference: "Proverbs 16:3", reflection: "Dedicate all academic and tactical tasks to God." },
    { text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.", reference: "John 14:27", reflection: "Inner calm beyond human understanding." },
    { text: "For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future.", reference: "Jeremiah 29:11", reflection: "God's sovereign blueprint for our lives." },
    { text: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.", reference: "Galatians 6:9", reflection: "Persistence and faithful service." },
    { text: "The Lord will fight for you; you need only to be still.", reference: "Exodus 14:14", reflection: "Trusting God when obstacles seem insurmountable." },
    { text: "Cast all your anxiety on him because he cares for you.", reference: "1 Peter 5:7", reflection: "Releasing mental burdens into loving hands." },
    { text: "The name of the Lord is a fortified tower; the righteous run to it and are safe.", reference: "Proverbs 18:10", reflection: "Security in God's holy name." },
    { text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.", reference: "Colossians 3:23", reflection: "Excellence as worship in cadet duties." },
    { text: "Blessed is the one who perseveres under trial because, having stood the test, that person will receive the crown of life.", reference: "James 1:12", reflection: "Resilience in character and spirit." },
    { text: "Even youths grow tired and weary, and young men stumble and fall; but those who hope in the Lord will renew their strength.", reference: "Isaiah 40:30-31", reflection: "Supernatural endurance." },
    { text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", reference: "Philippians 4:6", reflection: "Turn every worry into a prayer of praise." },
    { text: "No weapon formed against you shall prosper.", reference: "Isaiah 54:17", reflection: "Divine defense in every battle." },
    { text: "The fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.", reference: "Galatians 5:22-23", reflection: "The virtues of a Christian military leader." },
    { text: "I have fought the good fight, I have finished the race, I have kept the faith.", reference: "2 Timothy 4:7", reflection: "Faithfulness until the very end." },
    { text: "Greater love has no one than this: to lay down one's life for one's friends.", reference: "John 15:13", reflection: "Sacrificial duty and brotherhood." },
    { text: "Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us.", reference: "Ephesians 3:20", reflection: "God's limitless power at work in you." }
  ];

  function getDailyBibleVerse() {
    try {
      const stored = localStorage.getItem('CCAFP_DAILY_BIBLE_VERSE');
      if (stored) {
        const item = JSON.parse(stored);
        if (item && item.text) return item;
      }
    } catch(e) {}
    const day = (new Date()).getDate();
    return BIBLE_VERSES_MONTHLY[Math.max(0, Math.min(BIBLE_VERSES_MONTHLY.length - 1, day - 1))];
  }

  // 13. SPIRITUAL DEVELOPMENT COUNCIL SPECIALIZED PORTAL RENDERER
  function renderSpiritualCouncilView(council) {
    if (!dom.councilDynamicContainer) return;
    const list = CCAFP_CONFIG.spiritualData || (window.S1_SPIRITUAL_DATA && window.S1_SPIRITUAL_DATA.spiritual) || [];
    const dailyVerse = getDailyBibleVerse();
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase();
    
    // Class Counts
    const totalAll = list.length;
    const total1CL = list.filter(c => (c.class || '').toUpperCase() === '1CL').length;
    const total2CL = list.filter(c => (c.class || '').toUpperCase() === '2CL').length;
    const total3CL = list.filter(c => (c.class || '').toUpperCase() === '3CL').length;

    // Filter by Active Class for statistics
    const currentClass = state.spiritualClass || 'all';
    const classFiltered = currentClass === 'all' 
      ? list 
      : list.filter(c => (c.class || '').toUpperCase() === currentClass.toUpperCase());

    const totalInView = classFiltered.length;
    const countCatholic = classFiltered.filter(c => (c.religion || '').toUpperCase().includes('CATHOLIC')).length;
    const countBaptist = classFiltered.filter(c => (c.religion || '').toUpperCase().includes('BAPTIST') || (c.religion || '').toUpperCase().includes('PMACF') || (c.religion || '').toUpperCase().includes('CCCC')).length;
    const countSDA = classFiltered.filter(c => (c.religion || '').toUpperCase().includes('ADVENTIST') || (c.religion || '').toUpperCase().includes('SDA')).length;
    const countLDS = classFiltered.filter(c => (c.religion || '').toUpperCase().includes('LATTER DAY SAINTS') || (c.religion || '').toUpperCase().includes('LDS')).length;
    const countINC = classFiltered.filter(c => (c.religion || '').toUpperCase().includes('CRISTO') || (c.religion || '').toUpperCase().includes('INC')).length;
    const countMuslim = classFiltered.filter(c => (c.religion || '').toUpperCase().includes('ISLAMIC') || (c.religion || '').toUpperCase().includes('MUSLIM')).length;

    // Denomination specific counts for pills
    const cntRel = (key) => classFiltered.filter(c => (c.religion || '').toUpperCase().includes(key)).length;
    const relCounts = {
      all: totalInView,
      catholic: cntRel('CATHOLIC'),
      grace: cntRel('GRACE BAPTIST'),
      pmacf: cntRel('PMACF'),
      sda: classFiltered.filter(c => (c.religion || '').toUpperCase().includes('ADVENTIST') || (c.religion || '').toUpperCase().includes('SDA')).length,
      cccc: cntRel('CCCC'),
      lds: classFiltered.filter(c => (c.religion || '').toUpperCase().includes('LATTER DAY SAINTS') || (c.religion || '').toUpperCase().includes('LDS')).length,
      inc: classFiltered.filter(c => (c.religion || '').toUpperCase().includes('CRISTO') || (c.religion || '').toUpperCase().includes('INC')).length,
      mcgi: cntRel('MCGI'),
      pmabaptist: cntRel('PMA BAPTIST'),
      anglican: classFiltered.filter(c => (c.religion || '').toUpperCase().includes('ANGLICAN') || (c.religion || '').toUpperCase().includes('AGLIPAYAN')).length,
      islamic: classFiltered.filter(c => (c.religion || '').toUpperCase().includes('ISLAMIC') || (c.religion || '').toUpperCase().includes('MUSLIM')).length
    };

    const urls = typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS : {};
    const link1CL = urls.spiritual_1cl_raw || "https://docs.google.com/spreadsheets/d/1GYusJlZTqArGYtWacs_ZjnhTQL4ZFXoWrFwSHarthyY/edit?gid=194404420#gid=194404420";
    const link2CL = urls.spiritual_2cl_raw || "https://docs.google.com/spreadsheets/d/1GYusJlZTqArGYtWacs_ZjnhTQL4ZFXoWrFwSHarthyY/edit?gid=666856956#gid=666856956";
    const link3CL = urls.spiritual_3cl_raw || "https://docs.google.com/spreadsheets/d/1GYusJlZTqArGYtWacs_ZjnhTQL4ZFXoWrFwSHarthyY/edit?gid=1748574266#gid=1748574266";

    dom.councilDynamicContainer.innerHTML = `
      <div class="space-y-6">
        <!-- Daily Bible Verse Featured Card (Synced with Laptop Bible Study App) -->
        <div class="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-amber-50 via-white to-purple-50/50 border border-amber-200/90 shadow-xs space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/60 pb-3">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold border border-amber-300/40">
                <i data-lucide="book-open" class="w-4 h-4 text-amber-700"></i>
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-[10px] font-bold font-mono-clean text-amber-900 uppercase tracking-widest bg-amber-100/90 px-2 py-0.5 rounded border border-amber-200">DAILY BIBLE VERSE</span>
                  <span class="text-[10px] font-mono-clean text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>BIBLE STUDY APP SYNCED</span>
                  </span>
                  <span class="text-xs text-slate-400 font-mono-clean ml-1">${todayStr}</span>
                </div>
                <h4 class="font-bold text-sm text-slate-900 mt-0.5 font-mono-clean">Scripture Meditation of the Day</h4>
              </div>
            </div>
            <button id="syncBibleVerseBtn" class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-amber-50 text-amber-950 font-mono-clean text-xs font-semibold border border-amber-300 shadow-2xs transition-colors self-start sm:self-auto" title="Update scripture from Bible Study app">
              <i data-lucide="edit-3" class="w-3.5 h-3.5 text-amber-700"></i>
              <span>Sync with Bible Study App</span>
            </button>
          </div>
          <div class="space-y-2.5">
            <blockquote class="text-base sm:text-lg font-serif italic text-slate-900 leading-relaxed font-medium">
              “${dailyVerse.text}”
            </blockquote>
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 font-mono-clean">
              <span class="text-xs sm:text-sm font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>${dailyVerse.reference}</span>
              </span>
              <span class="text-[11px] text-slate-500 italic">
                ${dailyVerse.reflection || 'Source: Bible Study App'}
              </span>
            </div>
          </div>
        </div>

        <!-- Live Cloud Sheet Connection Banner -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-3xl bg-purple-50/70 border border-purple-200">
          <div class="flex items-start sm:items-center gap-3.5">
            <div class="w-11 h-11 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold flex-shrink-0 shadow-xs border border-purple-200">
              <i data-lucide="heart-handshake" class="w-6 h-6"></i>
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-[10px] font-bold font-mono-clean text-purple-800 uppercase bg-purple-100/90 px-2 py-0.5 rounded border border-purple-200">CORPS OF CADETS • 1CL, 2CL & 3CL</span>
                <span class="text-[10px] font-bold font-mono-clean text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 live-beacon"></span>
                  <span>LIVE SPREADSHEETS CONNECTED</span>
                </span>
              </div>
              <h4 class="font-bold text-base text-slate-900 mt-0.5">Cadet Religious Services & Faith Denominations Roster</h4>
              <p class="text-xs text-slate-500 font-mono-clean">Moral and spiritual nourishment registry covering Class 2027, 2028, and 2029.</p>
            </div>
          </div>

          <!-- Direct Source Sheet Links -->
          <div class="flex items-center gap-2 flex-wrap sm:flex-nowrap font-mono-clean text-xs">
            <a href="${link1CL}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-purple-200 shadow-2xs transition-colors">
              <i data-lucide="external-link" class="w-3.5 h-3.5 text-purple-600"></i>
              <span>1CL Sheet</span>
            </a>
            <a href="${link2CL}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-white font-semibold shadow-2xs transition-colors">
              <i data-lucide="external-link" class="w-3.5 h-3.5 text-purple-200"></i>
              <span>2CL Sheet</span>
            </a>
            <a href="${link3CL}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-purple-200 shadow-2xs transition-colors">
              <i data-lucide="external-link" class="w-3.5 h-3.5 text-purple-600"></i>
              <span>3CL Sheet</span>
            </a>
          </div>
        </div>

        <!-- Class Filter Selector Bar -->
        <div class="flex items-center gap-2 p-2 rounded-2xl bg-white border border-slate-200 font-mono-clean text-xs overflow-x-auto no-scrollbar shadow-xs">
          <span class="text-slate-400 font-bold text-[11px] uppercase px-2 flex items-center gap-1">
            <i data-lucide="graduation-cap" class="w-3.5 h-3.5 text-slate-500"></i>
            <span>SELECT CLASS:</span>
          </span>
          <button class="spiritual-class-pill ${currentClass === 'all' ? 'active-pill bg-purple-900 text-white shadow-2xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'} px-3.5 py-1.5 rounded-xl font-semibold transition-colors flex-shrink-0" data-class="all">
            All Classes (${totalAll})
          </button>
          <button class="spiritual-class-pill ${currentClass === '1CL' ? 'active-pill bg-purple-900 text-white shadow-2xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'} px-3.5 py-1.5 rounded-xl font-semibold transition-colors flex-shrink-0" data-class="1CL">
            1CL Mandaraig '27 (${total1CL})
          </button>
          <button class="spiritual-class-pill ${currentClass === '2CL' ? 'active-pill bg-purple-900 text-white shadow-2xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'} px-3.5 py-1.5 rounded-xl font-semibold transition-colors flex-shrink-0" data-class="2CL">
            2CL Siglab Kasilag '28 (${total2CL})
          </button>
          <button class="spiritual-class-pill ${currentClass === '3CL' ? 'active-pill bg-purple-900 text-white shadow-2xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'} px-3.5 py-1.5 rounded-xl font-semibold transition-colors flex-shrink-0" data-class="3CL">
            3CL Madasilak '29 (${total3CL})
          </button>
        </div>

        <!-- KPI Metrics Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono-clean">
          <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <span class="text-[10px] text-slate-500 font-bold uppercase block">TOTAL ROSTER</span>
            <span class="text-xl font-bold text-slate-900">${totalInView}</span>
            <span class="text-[10px] text-slate-400 block mt-0.5">${currentClass === 'all' ? 'Corps-Wide' : currentClass}</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 shadow-2xs">
            <span class="text-[10px] text-blue-700 font-bold uppercase block">ROMAN CATHOLIC</span>
            <span class="text-xl font-bold text-blue-950">${countCatholic}</span>
            <span class="text-[10px] text-blue-600 block mt-0.5">${totalInView ? ((countCatholic/totalInView)*100).toFixed(0) : 0}% of Filter</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200/80 shadow-2xs">
            <span class="text-[10px] text-purple-700 font-bold uppercase block">PROTESTANT / EVANGELICAL</span>
            <span class="text-xl font-bold text-purple-950">${countBaptist}</span>
            <span class="text-[10px] text-purple-600 block mt-0.5">PMACF, Grace, CCCC</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 shadow-2xs">
            <span class="text-[10px] text-emerald-700 font-bold uppercase block">SEVENTH-DAY ADVENTIST</span>
            <span class="text-xl font-bold text-emerald-950">${countSDA}</span>
            <span class="text-[10px] text-emerald-600 block mt-0.5">Sabbath Worship</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 shadow-2xs">
            <span class="text-[10px] text-amber-700 font-bold uppercase block">LATTER-DAY SAINTS</span>
            <span class="text-xl font-bold text-amber-950">${countLDS}</span>
            <span class="text-[10px] text-amber-600 block mt-0.5">LDS / Mormon</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-cyan-50/70 border border-cyan-200/80 shadow-2xs">
            <span class="text-[10px] text-cyan-700 font-bold uppercase block">ISLAMIC FAITH</span>
            <span class="text-xl font-bold text-cyan-950">${countMuslim}</span>
            <span class="text-[10px] text-cyan-600 block mt-0.5">Jum'ah Prayers</span>
          </div>
        </div>

        <!-- Filter Controls Bar -->
        <div class="space-y-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <i data-lucide="search" class="w-4 h-4 text-slate-400"></i>
              <input id="spiritualSearchInput" type="text" value="${state.spiritualQuery}" placeholder="Search cadet, serial number, religion, company, class..." class="px-3.5 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64 sm:w-80 font-mono-clean">
            </div>
            <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs font-mono-clean">
              <span class="text-slate-400 font-bold text-[10px] uppercase mr-1">COY:</span>
              <button class="spiritual-coy-pill ${state.spiritualCoy === 'all' ? 'active-pill bg-purple-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold" data-coy="all">All</button>
              ${['A','B','C','D','E','F','G','H'].map(c => `
                <button class="spiritual-coy-pill ${state.spiritualCoy === c ? 'active-pill bg-purple-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-medium" data-coy="${c}">${c}</button>
              `).join('')}
            </div>
          </div>

          <!-- Religion Filter Pills -->
          <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 text-xs font-mono-clean border-t border-slate-100">
            <span class="text-slate-400 font-bold text-[10px] uppercase mr-1">FAITH:</span>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'all' ? 'active-pill bg-purple-900 text-white' : 'bg-slate-50 text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold flex-shrink-0" data-religion="all">All (${relCounts.all})</button>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'CATHOLIC' ? 'active-pill bg-purple-900 text-white' : 'bg-slate-50 text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-religion="CATHOLIC">Catholic (${relCounts.catholic})</button>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'GRACE BAPTIST' ? 'active-pill bg-purple-900 text-white' : 'bg-slate-50 text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-religion="GRACE BAPTIST">Grace Baptist (${relCounts.grace})</button>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'PMACF' ? 'active-pill bg-purple-900 text-white' : 'bg-slate-50 text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-religion="PMACF">PMACF (${relCounts.pmacf})</button>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'SEVENTH-DAY ADVENTIST' ? 'active-pill bg-purple-900 text-white' : 'bg-slate-50 text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-religion="SEVENTH-DAY ADVENTIST">SDA (${relCounts.sda})</button>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'CCCC' ? 'active-pill bg-purple-900 text-white' : 'bg-slate-50 text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-religion="CCCC">CCCC (${relCounts.cccc})</button>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'LATTER DAY SAINTS' ? 'active-pill bg-purple-900 text-white' : 'bg-slate-50 text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-religion="LATTER DAY SAINTS">LDS (${relCounts.lds})</button>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'IGLESIA NI CRISTO' ? 'active-pill bg-purple-900 text-white' : 'bg-slate-50 text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-religion="IGLESIA NI CRISTO">INC (${relCounts.inc})</button>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'MCGI' ? 'active-pill bg-purple-900 text-white' : 'bg-slate-50 text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-religion="MCGI">MCGI (${relCounts.mcgi})</button>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'PMA BAPTIST' ? 'active-pill bg-purple-900 text-white' : 'bg-slate-50 text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-religion="PMA BAPTIST">PMA Baptist (${relCounts.pmabaptist})</button>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'ANGLICAN' ? 'active-pill bg-purple-900 text-white' : 'bg-slate-50 text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-religion="ANGLICAN">Anglican (${relCounts.anglican})</button>
            <button class="spiritual-religion-pill ${state.spiritualReligion === 'ISLAMIC' ? 'active-pill bg-purple-900 text-white' : 'bg-slate-50 text-slate-700'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-religion="ISLAMIC">Islamic (${relCounts.islamic})</button>
          </div>
        </div>

        <!-- Cadets Table -->
        <div id="spiritualTableContainer" class="overflow-x-auto bg-white rounded-3xl border border-slate-200 p-4 shadow-xs">
          <!-- Dynamically filtered rows -->
        </div>
      </div>
    `;

    renderSpiritualTableRows(list);
    wireSpiritualEvents(council, list);
    if (window.lucide) window.lucide.createIcons();
  }

  function renderSpiritualTableRows(list) {
    const container = document.getElementById('spiritualTableContainer');
    if (!container) return;

    const q = (state.spiritualQuery || '').toLowerCase().trim();
    const classFilter = state.spiritualClass || 'all';
    const relFilter = state.spiritualReligion || 'all';
    const coyFilter = state.spiritualCoy || 'all';

    const filtered = list.filter(item => {
      if (classFilter !== 'all' && (item.class || '').toUpperCase() !== classFilter.toUpperCase()) {
        return false;
      }
      if (coyFilter !== 'all' && (item.coy || '').toUpperCase() !== coyFilter.toUpperCase()) {
        return false;
      }
      if (relFilter !== 'all') {
        const itemRel = (item.religion || '').toUpperCase();
        if (relFilter === 'ANGLICAN' && !(itemRel.includes('ANGLICAN') || itemRel.includes('AGLIPAYAN'))) return false;
        if (relFilter === 'ISLAMIC' && !(itemRel.includes('ISLAMIC') || itemRel.includes('MUSLIM'))) return false;
        if (relFilter === 'SEVENTH-DAY ADVENTIST' && !(itemRel.includes('ADVENTIST') || itemRel.includes('SDA'))) return false;
        if (relFilter === 'LATTER DAY SAINTS' && !(itemRel.includes('LATTER DAY SAINTS') || itemRel.includes('LDS'))) return false;
        if (relFilter === 'IGLESIA NI CRISTO' && !(itemRel.includes('CRISTO') || itemRel.includes('INC'))) return false;
        if (!['ANGLICAN', 'ISLAMIC', 'SEVENTH-DAY ADVENTIST', 'LATTER DAY SAINTS', 'IGLESIA NI CRISTO'].includes(relFilter)) {
          if (!itemRel.includes(relFilter)) return false;
        }
      }
      if (!q) return true;
      return (item.name || '').toLowerCase().includes(q) ||
             (item.sn || '').toLowerCase().includes(q) ||
             (item.coy || '').toLowerCase().includes(q) ||
             (item.class || '').toLowerCase().includes(q) ||
             (item.religion || '').toLowerCase().includes(q);
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="py-12 text-center text-slate-400 font-mono-clean text-xs">
          No cadets found matching religious affiliation and class filter criteria.
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
      if (r.includes('LATTER DAY SAINTS') || r.includes('LDS')) return '<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">Latter-day Saints</span>';
      if (r.includes('IGLESIA NI CRISTO') || r.includes('INC')) return '<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-800 border border-rose-200">Iglesia Ni Cristo</span>';
      if (r.includes('MCGI')) return '<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-violet-50 text-violet-800 border border-violet-200">MCGI</span>';
      if (r.includes('PMA BAPTIST')) return '<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">PMA Baptist</span>';
      if (r.includes('ANGLICAN') || r.includes('AGLIPAYAN')) return '<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-50 text-orange-800 border border-orange-200">Anglican / Aglipayan</span>';
      if (r.includes('ISLAMIC') || r.includes('MUSLIM')) return '<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-green-50 text-green-800 border border-green-200">Islamic Credence Society</span>';
      return `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800">${r}</span>`;
    };

    const classBadge = (cls) => {
      const c = (cls || '1CL').toUpperCase();
      if (c === '1CL') return '<span class="px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">1CL</span>';
      if (c === '2CL') return '<span class="px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold bg-blue-100 text-blue-900 border border-blue-300">2CL</span>';
      if (c === '3CL') return '<span class="px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">3CL</span>';
      return `<span class="px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold bg-slate-100 text-slate-800">${c}</span>`;
    };

    container.innerHTML = `
      <div class="flex items-center justify-between text-xs text-slate-500 font-mono-clean pb-3">
        <span>Showing <strong>${filtered.length}</strong> of ${list.length} Cadets</span>
        <span>${classFilter === 'all' ? 'All Classes Roster' : `${classFilter} Registered Cadets`}</span>
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
              <td class="py-2.5 px-2">${classBadge(c.class)}</td>
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

  function wireSpiritualEvents(council, list) {
    const search = document.getElementById('spiritualSearchInput');
    if (search) {
      search.addEventListener('input', (e) => {
        state.spiritualQuery = e.target.value;
        renderSpiritualTableRows(list);
      });
    }

    document.querySelectorAll('.spiritual-class-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        state.spiritualClass = pill.getAttribute('data-class') || 'all';
        renderSpiritualCouncilView(council);
      });
    });

    document.querySelectorAll('.spiritual-coy-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.spiritual-coy-pill').forEach(p => {
          p.className = 'spiritual-coy-pill bg-slate-50 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-medium hover:bg-slate-100';
        });
        pill.className = 'spiritual-coy-pill active-pill bg-purple-900 text-white px-2.5 py-1 rounded-lg border border-purple-900 text-xs font-semibold';
        state.spiritualCoy = pill.getAttribute('data-coy') || 'all';
        renderSpiritualTableRows(list);
      });
    });

    document.querySelectorAll('.spiritual-religion-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.spiritual-religion-pill').forEach(p => {
          p.className = 'spiritual-religion-pill bg-slate-50 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0';
        });
        pill.className = 'spiritual-religion-pill active-pill bg-purple-900 text-white px-2.5 py-1 rounded-lg border border-purple-900 text-xs font-semibold flex-shrink-0';
        state.spiritualReligion = pill.getAttribute('data-religion') || 'all';
        renderSpiritualTableRows(list);
      });
    });

    const syncBtn = document.getElementById('syncBibleVerseBtn');
    if (syncBtn) {
      syncBtn.addEventListener('click', () => {
        const cur = getDailyBibleVerse();
        const textPrompt = prompt("Enter Daily Bible Verse (from your laptop 'Bible Study' app):", cur.text || '');
        if (textPrompt === null) return;
        const refPrompt = prompt("Enter Book Chapter:Verse Reference (e.g. Proverbs 3:5-6):", cur.reference || '');
        if (refPrompt === null) return;
        const refNotes = prompt("Enter Devotional Reflection / Notes:", cur.reflection || 'Source: Bible Study App');
        if (textPrompt.trim()) {
          const newVerse = {
            text: textPrompt.trim(),
            reference: (refPrompt || 'Scripture').trim(),
            reflection: (refNotes || 'Source: Bible Study App').trim()
          };
          localStorage.setItem('CCAFP_DAILY_BIBLE_VERSE', JSON.stringify(newVerse));
          showToast('Daily Bible Verse synced successfully with Bible Study app!', 'success');
          renderSpiritualCouncilView(council);
        }
      });
    }
  }

  // --- Cadet Mess Council View Rendering ---
  function renderMessCouncilView(council) {
    if (!dom.councilDynamicContainer) return;
    const messData = CCAFP_CONFIG.messData || window.MESS_MASTER_DATA || { roster: [], menu: {}, disseminations: [] };
    const roster = messData.roster || [];
    const menu = messData.menu || {};
    const disseminations = messData.disseminations || [];

    const urls = typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS : {};
    const linkDb = urls.mess_raw || "https://docs.google.com/spreadsheets/d/14dSYE1ntxNrnBdgSn-mWU5z-GMHK7qdMcKFchgh0pAQ/edit?gid=482780671#gid=482780671";
    const linkViands = urls.mess_viands_raw || "https://docs.google.com/spreadsheets/d/14dSYE1ntxNrnBdgSn-mWU5z-GMHK7qdMcKFchgh0pAQ/edit?gid=143586769#gid=143586769";
    const linkDissem = "https://docs.google.com/spreadsheets/d/14dSYE1ntxNrnBdgSn-mWU5z-GMHK7qdMcKFchgh0pAQ/edit?gid=1204067800#gid=1204067800";

    const activeSubTab = state.messActiveSubTab || 'shares-roster';

    dom.councilDynamicContainer.innerHTML = `
      <div class="space-y-6">
        <!-- Live Cloud Sheet Connection Banner -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-3xl bg-amber-500/10 border border-amber-500/20">
          <div class="flex items-start sm:items-center gap-3.5">
            <div class="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold flex-shrink-0 shadow-xs border border-amber-500/30">
              <i data-lucide="utensils" class="w-6 h-6"></i>
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-[10px] font-bold font-mono-clean text-amber-700 uppercase bg-amber-100/90 px-2 py-0.5 rounded border border-amber-200">CORPS OF CADETS • 1,199 CADETS ACTIVE</span>
                <span class="text-[10px] font-bold font-mono-clean text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 live-beacon"></span>
                  <span>LIVE SPREADSHEETS CONNECTED</span>
                </span>
              </div>
              <h4 class="font-bold text-base text-slate-900 mt-0.5">Cadet Mess Council Portal</h4>
              <p class="text-xs text-slate-500 font-mono-clean">Kitchen Cooking Shares, Medical & Religious Dietary Restrictions, Battalion Breakdown & Weekly Viands Schedule.</p>
            </div>
          </div>

          <!-- Direct Source Sheet Links -->
          <div class="flex items-center gap-2 flex-wrap sm:flex-nowrap font-mono-clean text-xs">
            <a href="${linkDb}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-slate-200 shadow-2xs transition-colors">
              <i data-lucide="database" class="w-3.5 h-3.5 text-amber-600"></i>
              <span>Cadet Database</span>
            </a>
            <a href="${linkViands}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-2xs transition-colors">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-amber-100"></i>
              <span>Weekly Menu</span>
            </a>
            <a href="${linkDissem}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-slate-200 shadow-2xs transition-colors">
              <i data-lucide="bell" class="w-3.5 h-3.5 text-amber-600"></i>
              <span>Disseminations</span>
            </a>
          </div>
        </div>

        <!-- Mess Council Subtab Switcher -->
        <div class="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 font-mono-clean text-xs overflow-x-auto no-scrollbar shadow-xs">
          <button class="mess-subtab-pill flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all flex-shrink-0 ${
            activeSubTab === 'shares-roster'
              ? 'active-pill bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }" data-subtab="shares-roster">
            <i data-lucide="users" class="w-4 h-4"></i>
            <span>Kitchen Cooking Shares & Cadet Roster</span>
          </button>
          <button class="mess-subtab-pill flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all flex-shrink-0 ${
            activeSubTab === 'weekly-menu'
              ? 'active-pill bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }" data-subtab="weekly-menu">
            <i data-lucide="calendar" class="w-4 h-4"></i>
            <span>Weekly Menu Schedule</span>
          </button>
          <button class="mess-subtab-pill flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all flex-shrink-0 ${
            activeSubTab === 'disseminations'
              ? 'active-pill bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }" data-subtab="disseminations">
            <i data-lucide="bell" class="w-4 h-4"></i>
            <span>Disseminations & Bulletins</span>
            ${disseminations.length > 0 ? `<span class="px-1.5 py-0.2 bg-amber-500 text-white text-[10px] rounded-full font-bold">${disseminations.length}</span>` : ''}
          </button>
        </div>

        <!-- Dynamic Subtab Container -->
        <div id="messSubTabContainer"></div>
      </div>
    `;

    const subContainer = document.getElementById('messSubTabContainer');
    if (activeSubTab === 'shares-roster') {
      renderMessSharesRosterView(subContainer, messData);
    } else if (activeSubTab === 'weekly-menu') {
      renderMessWeeklyMenuView(subContainer, messData);
    } else if (activeSubTab === 'disseminations') {
      renderMessDisseminationsView(subContainer, messData);
    }

    wireMessEvents(council, messData);
    if (window.lucide) window.lucide.createIcons();
  }

  // --- Subtab 1: Kitchen Cooking Shares & Cadet Roster ---
  function renderMessSharesRosterView(container, messData) {
    if (!container) return;
    const roster = messData.roster || [];
    const totalCadets = roster.length;
    const total1st = roster.filter(c => c.bn === '1ST').length;
    const total2nd = roster.filter(c => c.bn === '2ND').length;
    const total3rd = roster.filter(c => c.bn === '3RD').length;
    const total4th = roster.filter(c => c.bn === '4TH').length;
    const totalHC = roster.filter(c => (c.status || '').toUpperCase() === 'HC').length;
    const totalSpecial = roster.filter(c => (c.diets || []).length > 0).length;

    // Diet counts
    const countDiet = (name) => roster.filter(c => (c.diets || []).includes(name)).length;

    const medicalDiets = [
      { id: 'NO FISH', name: 'No Fish', count: countDiet('NO FISH') },
      { id: 'NO SEAFOOD', name: 'No Seafood', count: countDiet('NO SEAFOOD') },
      { id: 'NO SHRIMP', name: 'No Shrimp', count: countDiet('NO SHRIMP') },
      { id: 'NO EGG', name: 'No Egg', count: countDiet('NO EGG') },
      { id: 'NO CHICKEN', name: 'No Chicken', count: countDiet('NO CHICKEN') },
      { id: 'NO BEANS', name: 'No Beans', count: countDiet('NO BEANS') },
      { id: 'NO TOFU', name: 'No Tofu', count: countDiet('NO TOFU') },
      { id: 'NO CITRUS', name: 'No Citrus', count: countDiet('NO CITRUS') },
      { id: 'NO SPICY', name: 'No Spicy', count: countDiet('NO SPICY') },
      { id: 'NO EGGPLANT', name: 'No Eggplant', count: countDiet('NO EGGPLANT') },
      { id: 'NO COCUMBER', name: 'No Cucumber', count: countDiet('NO COCUMBER') },
      { id: 'NO SOUR', name: 'No Sour', count: countDiet('NO SOUR') },
      { id: 'NO TOMATOES', name: 'No Tomatoes', count: countDiet('NO TOMATOES') }
    ];

    const religiousDiets = [
      { id: 'NO BLOOD', name: 'No Blood', count: countDiet('NO BLOOD'), desc: 'INC / SDA Doctrine' },
      { id: 'NO PORK', name: 'No Pork', count: countDiet('NO PORK'), desc: 'Halal / SDA Dietary' },
      { id: 'NO PROCESSED FOOD', name: 'No Processed Food', count: countDiet('NO PROCESSED FOOD'), desc: 'Health / Religious' },
      { id: 'NO COFFEE', name: 'No Coffee', count: countDiet('NO COFFEE'), desc: 'LDS / SDA Health' },
      { id: 'NO CHOCOLATE', name: 'No Chocolate', count: countDiet('NO CHOCOLATE'), desc: 'Medical Diet' },
      { id: 'NO BEEF', name: 'No Beef', count: countDiet('NO BEEF'), desc: 'Personal / Religious' },
      { id: 'NO JUICE', name: 'No Sugary Juice', count: countDiet('NO JUICE'), desc: 'Medical Diet' }
    ];

    // Battalion Breakdown calculations
    const battalions = [
      { name: '1st Battalion', code: '1ST', coys: 'Alfa & Bravo' },
      { name: '2nd Battalion', code: '2ND', coys: 'Charlie & Delta' },
      { name: '3rd Battalion', code: '3RD', coys: 'Echo & Foxtrot' },
      { name: '4th Battalion', code: '4TH', coys: 'Golf & Hawk' }
    ].map(bn => {
      const bnCadets = roster.filter(c => c.bn === bn.code);
      const bnTotal = bnCadets.length;
      const bnSpecial = bnCadets.filter(c => (c.diets || []).length > 0).length;
      const bnRegular = bnTotal - bnSpecial;
      const specialPct = bnTotal > 0 ? Math.round((bnSpecial / bnTotal) * 100) : 0;
      
      const dietTally = {};
      bnCadets.forEach(c => {
        (c.diets || []).forEach(d => {
          dietTally[d] = (dietTally[d] || 0) + 1;
        });
      });
      const topDiets = Object.entries(dietTally)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

      return {
        ...bn,
        total: bnTotal,
        special: bnSpecial,
        regular: bnRegular,
        specialPct,
        topDiets
      };
    });

    const activeDiet = state.messActiveDiet || 'all';

    container.innerHTML = `
      <div class="space-y-6">
        <!-- 1. KPI Top Metrics Grid (6 Cards) -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono-clean">
          <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <span class="text-[10px] text-slate-500 font-bold uppercase block">TOTAL ROSTER</span>
            <span class="text-xl font-bold text-slate-900">${totalCadets.toLocaleString()}</span>
            <span class="text-[10px] text-slate-400 block mt-0.5">Corps-Wide Disposition</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 shadow-2xs">
            <span class="text-[10px] text-blue-700 font-bold uppercase block">1ST BATTALION</span>
            <span class="text-xl font-bold text-blue-950">${total1st}</span>
            <span class="text-[10px] text-blue-600 block mt-0.5">Alfa & Bravo Coy</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 shadow-2xs">
            <span class="text-[10px] text-indigo-700 font-bold uppercase block">2ND BATTALION</span>
            <span class="text-xl font-bold text-indigo-950">${total2nd}</span>
            <span class="text-[10px] text-indigo-600 block mt-0.5">Charlie & Delta Coy</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200/80 shadow-2xs">
            <span class="text-[10px] text-purple-700 font-bold uppercase block">3RD BATTALION</span>
            <span class="text-xl font-bold text-purple-950">${total3rd}</span>
            <span class="text-[10px] text-purple-600 block mt-0.5">Echo & Foxtrot Coy</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200/80 shadow-2xs">
            <span class="text-[10px] text-teal-700 font-bold uppercase block">4TH BATTALION</span>
            <span class="text-xl font-bold text-teal-950">${total4th}</span>
            <span class="text-[10px] text-teal-600 block mt-0.5">Golf & Hawk Coy</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80 shadow-2xs">
            <span class="text-[10px] text-rose-700 font-bold uppercase block">HOLDING CENTER</span>
            <span class="text-xl font-bold text-rose-950">${totalHC}</span>
            <span class="text-[10px] text-rose-600 block mt-0.5">Medical / Quarantine</span>
          </div>
        </div>

        <!-- 2. Kitchen Cooking Shares Summary -->
        <div class="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold font-mono-clean text-amber-700 uppercase bg-amber-50 px-2 py-0.5 rounded border border-amber-200">KITCHEN PREPARATION DISPOSITION</span>
                <span class="text-xs text-slate-500 font-mono-clean"><strong>${totalSpecial}</strong> Cadets (${Math.round((totalSpecial/totalCadets)*100)}%) on Special Diets</span>
              </div>
              <h3 class="text-sm font-bold text-slate-900 mt-1">Kitchen Cooking Shares Summary</h3>
              <p class="text-xs text-slate-500">Interactive restriction metrics. Click any dietary card to instantly filter the cadet roster below.</p>
            </div>
            ${activeDiet !== 'all' ? `
              <button id="messClearDietFilterBtn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-2xs transition-all self-start sm:self-auto font-mono-clean">
                <i data-lucide="x" class="w-3.5 h-3.5"></i>
                <span>Clear Diet Filter (${activeDiet})</span>
              </button>
            ` : ''}
          </div>

          <!-- Section A: Medical & Allergies -->
          <div>
            <div class="flex items-center gap-2 mb-2.5">
              <span class="w-2 h-2 rounded-full bg-red-500"></span>
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono-clean">Medical Conditions & Food Allergens</h4>
              <span class="text-[11px] text-slate-400 font-mono-clean">(Strict Kitchen Separation Required)</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
              ${medicalDiets.map(item => {
                const isSelected = activeDiet === item.id;
                return `
                  <button class="mess-diet-card text-left p-2.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-white border-amber-600 shadow-xs ring-2 ring-amber-400/50'
                      : item.count > 0
                        ? 'bg-red-50/50 hover:bg-red-100/70 border-red-200/80 text-slate-800'
                        : 'bg-slate-50 border-slate-200/60 text-slate-400 hover:bg-slate-100/60'
                  }" data-diet="${item.id}">
                    <div class="flex items-center justify-between text-[11px]">
                      <span class="font-bold truncate">${item.name}</span>
                      <span class="font-mono-clean font-extrabold px-1.5 py-0.2 rounded-md ${
                        isSelected ? 'bg-white/20 text-white' : item.count > 0 ? 'bg-red-200 text-red-900' : 'bg-slate-200 text-slate-600'
                      }">${item.count}</span>
                    </div>
                    <span class="text-[9px] block mt-1 opacity-75 font-mono-clean">Special Prep</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Section B: Religious & Food Restrictions -->
          <div>
            <div class="flex items-center gap-2 mb-2.5">
              <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono-clean">Religious & Faith Food Restrictions</h4>
              <span class="text-[11px] text-slate-400 font-mono-clean">(Halal, Non-Blood, Christian Sabbath Provisions)</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
              ${religiousDiets.map(item => {
                const isSelected = activeDiet === item.id;
                return `
                  <button class="mess-diet-card text-left p-2.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs ring-2 ring-indigo-400/50'
                      : item.count > 0
                        ? 'bg-indigo-50/60 hover:bg-indigo-100/80 border-indigo-200/80 text-slate-800'
                        : 'bg-slate-50 border-slate-200/60 text-slate-400 hover:bg-slate-100/60'
                  }" data-diet="${item.id}">
                    <div class="flex items-center justify-between text-[11px]">
                      <span class="font-bold truncate">${item.name}</span>
                      <span class="font-mono-clean font-extrabold px-1.5 py-0.2 rounded-md ${
                        isSelected ? 'bg-white/20 text-white' : item.count > 0 ? 'bg-indigo-200 text-indigo-900' : 'bg-slate-200 text-slate-600'
                      }">${item.count}</span>
                    </div>
                    <span class="text-[9px] block mt-1 opacity-75 font-mono-clean truncate">${item.desc}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- 3. Battalion Cooking Shares Breakdown (4 Cards) -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <div>
              <h3 class="text-sm font-bold text-slate-900">Battalion Cooking Shares Breakdown</h3>
              <p class="text-xs text-slate-500">Distribution of regular vs special diet ratios per battalion cooking line.</p>
            </div>
            <span class="text-xs font-mono-clean text-slate-400">4 Cooking Lines Active</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            ${battalions.map(bn => `
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="font-bold text-sm text-slate-900">${bn.name}</h4>
                    <span class="text-[11px] text-slate-500 font-mono-clean">${bn.coys}</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-lg text-xs font-bold font-mono-clean bg-slate-100 text-slate-700">${bn.total} Cadets</span>
                </div>

                <!-- Progress Bar -->
                <div>
                  <div class="flex items-center justify-between text-[11px] font-mono-clean mb-1">
                    <span class="text-slate-500">Special Diet: <strong class="text-amber-700">${bn.special}</strong> (${bn.specialPct}%)</span>
                    <span class="text-slate-400">Regular: ${bn.regular}</span>
                  </div>
                  <div class="w-full h-2 rounded-full bg-slate-100 overflow-hidden flex">
                    <div class="h-full bg-amber-500 rounded-full" style="width: ${bn.specialPct}%"></div>
                  </div>
                </div>

                <!-- Top Diet Tags -->
                <div class="pt-2 border-t border-slate-100">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 font-mono-clean">Top Dietary Shares</span>
                  <div class="flex items-center gap-1.5 flex-wrap">
                    ${bn.topDiets.length > 0 ? bn.topDiets.map(([d, cnt]) => `
                      <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold font-mono-clean bg-slate-100 text-slate-700 border border-slate-200">
                        ${d}: <strong>${cnt}</strong>
                      </span>
                    `).join('') : '<span class="text-[11px] text-slate-400 font-mono-clean">None</span>'}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 4. Cadet Roster Filter Toolbar & Database Table -->
        <div class="space-y-4 p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <!-- Top Row: Search & Reset -->
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div class="flex items-center gap-2 flex-1 max-w-md">
              <i data-lucide="search" class="w-4 h-4 text-slate-400 flex-shrink-0"></i>
              <input id="messSearchInput" type="text" value="${state.messQuery || ''}" placeholder="Search cadet name, company, class, branch, status, diet..." class="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono-clean">
            </div>
            <div class="flex items-center gap-2">
              <button id="messResetFiltersBtn" class="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold font-mono-clean transition-colors">
                <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
                <span>Reset Filters</span>
              </button>
            </div>
          </div>

          <!-- Filter Pills Row 1: Battalion & Class -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-100 font-mono-clean text-xs">
            <!-- Battalion -->
            <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span class="text-slate-400 font-bold text-[10px] uppercase mr-1">BATTALION:</span>
              <button class="mess-bn-pill ${state.messBattalion === 'all' ? 'active-pill bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold flex-shrink-0" data-bn="all">All</button>
              ${['1ST', '2ND', '3RD', '4TH'].map(b => `
                <button class="mess-bn-pill ${state.messBattalion === b ? 'active-pill bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-medium flex-shrink-0" data-bn="${b}">${b} Bn</button>
              `).join('')}
            </div>

            <!-- Class -->
            <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span class="text-slate-400 font-bold text-[10px] uppercase mr-1">CLASS:</span>
              <button class="mess-class-pill ${state.messClass === 'all' ? 'active-pill bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold flex-shrink-0" data-class="all">All</button>
              <button class="mess-class-pill ${state.messClass === '1CL' ? 'active-pill bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-class="1CL">1CL '27</button>
              <button class="mess-class-pill ${state.messClass === '2CL' ? 'active-pill bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-class="2CL">2CL '28</button>
              <button class="mess-class-pill ${state.messClass === '3CL' ? 'active-pill bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-class="3CL">3CL '29</button>
              <button class="mess-class-pill ${state.messClass === '4CL' ? 'active-pill bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-class="4CL">4CL '30</button>
            </div>
          </div>

          <!-- Filter Pills Row 2: Company & BOS & Status -->
          <div class="flex items-center gap-2 overflow-x-auto no-scrollbar font-mono-clean text-xs pt-2 border-t border-slate-100">
            <span class="text-slate-400 font-bold text-[10px] uppercase mr-1 flex-shrink-0">COY:</span>
            <button class="mess-coy-pill ${state.messCoy === 'all' ? 'active-pill bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold flex-shrink-0" data-coy="all">All</button>
            ${['ALFA', 'BRAVO', 'CHARLIE', 'DELTA', 'ECHO', 'FOXTROT', 'GOLF', 'HAWK'].map(c => `
              <button class="mess-coy-pill ${state.messCoy === c ? 'active-pill bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'} px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-medium flex-shrink-0" data-coy="${c}">${c}</button>
            `).join('')}

            <span class="text-slate-300 mx-1">|</span>

            <span class="text-slate-400 font-bold text-[10px] uppercase mr-1 flex-shrink-0">BOS:</span>
            <button class="mess-bos-pill ${state.messBOS === 'all' ? 'active-pill bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'} px-2 py-1 rounded-lg border border-slate-200 text-xs font-semibold flex-shrink-0" data-bos="all">All</button>
            <button class="mess-bos-pill ${state.messBOS === 'PA' ? 'active-pill bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'} px-2 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-bos="PA">PA</button>
            <button class="mess-bos-pill ${state.messBOS === 'PAF' ? 'active-pill bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'} px-2 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-bos="PAF">PAF</button>
            <button class="mess-bos-pill ${state.messBOS === 'PN' ? 'active-pill bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'} px-2 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-bos="PN">PN</button>

            <span class="text-slate-300 mx-1">|</span>

            <span class="text-slate-400 font-bold text-[10px] uppercase mr-1 flex-shrink-0">STATUS:</span>
            <button class="mess-status-pill ${state.messStatus === 'all' ? 'active-pill bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'} px-2 py-1 rounded-lg border border-slate-200 text-xs font-semibold flex-shrink-0" data-status="all">All</button>
            <button class="mess-status-pill ${state.messStatus === 'FULL DUTY' ? 'active-pill bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'} px-2 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-status="FULL DUTY">Full Duty</button>
            <button class="mess-status-pill ${state.messStatus === 'HC' ? 'active-pill bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'} px-2 py-1 rounded-lg border border-slate-200 text-xs flex-shrink-0" data-status="HC">Holding Ctr</button>
          </div>

          <!-- Active Filter Announcement Badge -->
          ${activeDiet !== 'all' ? `
            <div class="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-mono-clean flex items-center justify-between">
              <div class="flex items-center gap-2">
                <i data-lucide="filter" class="w-4 h-4 text-amber-600"></i>
                <span>Filtering table by special diet: <strong>${activeDiet}</strong> (${countDiet(activeDiet)} cadets Corps-wide)</span>
              </div>
              <button class="text-amber-700 underline text-xs font-bold hover:text-amber-900" id="messClearActiveDietTag">Remove Filter</button>
            </div>
          ` : ''}

          <!-- Roster Table Container -->
          <div id="messRosterTableWrapper" class="overflow-x-auto rounded-2xl border border-slate-200">
            <!-- Dynamically populated by renderMessRosterTableRows -->
          </div>
        </div>
      </div>
    `;

    renderMessRosterTableRows(roster);
  }

  // --- Render Mess Roster Table Rows ---
  function renderMessRosterTableRows(roster) {
    const wrapper = document.getElementById('messRosterTableWrapper');
    if (!wrapper) return;

    const q = (state.messQuery || '').toLowerCase().trim();
    const bnFilter = state.messBattalion || 'all';
    const coyFilter = state.messCoy || 'all';
    const classFilter = state.messClass || 'all';
    const bosFilter = state.messBOS || 'all';
    const statusFilter = state.messStatus || 'all';
    const dietFilter = state.messActiveDiet || 'all';

    const filtered = roster.filter(c => {
      if (bnFilter !== 'all' && c.bn !== bnFilter) return false;
      if (coyFilter !== 'all' && c.coy !== coyFilter) return false;
      if (classFilter !== 'all' && c.class !== classFilter) return false;
      if (bosFilter !== 'all' && c.bos !== bosFilter) return false;
      if (statusFilter !== 'all' && c.status !== statusFilter) return false;
      if (dietFilter !== 'all' && !(c.diets || []).includes(dietFilter)) return false;

      if (!q) return true;
      const haystack = `${c.name} ${c.coy} ${c.bn} ${c.class} ${c.bos} ${c.status} ${(c.diets || []).join(' ')}`.toLowerCase();
      return haystack.includes(q);
    });

    if (filtered.length === 0) {
      wrapper.innerHTML = `
        <div class="py-12 text-center text-slate-400 font-mono-clean text-xs">
          No cadets found matching search criteria and dietary restriction filters.
        </div>
      `;
      return;
    }

    // Pagination
    const pageSize = state.messPageSize === 'all' ? filtered.length : (state.messPageSize || 50);
    const totalPages = Math.ceil(filtered.length / pageSize) || 1;
    let currentPage = state.messPage || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;
    state.messPage = currentPage;

    const startIndex = (currentPage - 1) * pageSize;
    const paginated = state.messPageSize === 'all' ? filtered : filtered.slice(startIndex, startIndex + pageSize);

    const classBadge = (cls) => {
      const c = (cls || '4CL').toUpperCase();
      if (c === '1CL') return '<span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">1CL</span>';
      if (c === '2CL') return '<span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-100 text-blue-900 border border-blue-300">2CL</span>';
      if (c === '3CL') return '<span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">3CL</span>';
      return '<span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-slate-100 text-slate-800 border border-slate-300">4CL</span>';
    };

    const bosBadge = (bos) => {
      const b = (bos || '').toUpperCase();
      if (b === 'PA') return '<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-50 text-green-800 border border-green-200">PA</span>';
      if (b === 'PAF') return '<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-50 text-sky-800 border border-sky-200">PAF</span>';
      if (b === 'PN') return '<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">PN</span>';
      return `<span class="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-600">${b || 'N/A'}</span>`;
    };

    const statusBadge = (st) => {
      const s = (st || 'FULL DUTY').toUpperCase();
      if (s === 'FULL DUTY') return '<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">Full Duty</span>';
      if (s === 'HC') return '<span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-rose-100 text-rose-900 border border-rose-300">Holding Ctr</span>';
      return `<span class="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-700">${s}</span>`;
    };

    const dietBadges = (diets) => {
      if (!diets || diets.length === 0) {
        return '<span class="text-[11px] text-slate-400 font-mono-clean">Regular Diet</span>';
      }
      return diets.map(d => {
        if (d === 'NO BLOOD') return '<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-200">NO BLOOD</span>';
        if (d === 'NO PORK') return '<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200">NO PORK</span>';
        if (d === 'NO SEAFOOD') return '<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">NO SEAFOOD</span>';
        if (d === 'NO FISH') return '<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">NO FISH</span>';
        if (d === 'NO SHRIMP') return '<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">NO SHRIMP</span>';
        return `<span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-red-50 text-red-800 border border-red-200">${d}</span>`;
      }).join(' ');
    };

    wrapper.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 font-mono-clean p-3 bg-slate-50 border-b border-slate-200 gap-2">
        <span>Showing <strong>${startIndex + 1}–${Math.min(startIndex + pageSize, filtered.length)}</strong> of <strong>${filtered.length}</strong> matching cadets (${roster.length} Total Roster)</span>
        <div class="flex items-center gap-2">
          <span>Rows per page:</span>
          <button class="mess-pagesize-btn px-2 py-0.5 rounded ${state.messPageSize === 50 ? 'bg-slate-900 text-white font-bold' : 'bg-white text-slate-700 border'}" data-size="50">50</button>
          <button class="mess-pagesize-btn px-2 py-0.5 rounded ${state.messPageSize === 100 ? 'bg-slate-900 text-white font-bold' : 'bg-white text-slate-700 border'}" data-size="100">100</button>
          <button class="mess-pagesize-btn px-2 py-0.5 rounded ${state.messPageSize === 'all' ? 'bg-slate-900 text-white font-bold' : 'bg-white text-slate-700 border'}" data-size="all">All</button>
        </div>
      </div>
      <table class="w-full text-left text-xs font-mono-clean">
        <thead class="bg-slate-50/50">
          <tr class="font-bold text-slate-500 border-b border-slate-200 pb-2 uppercase tracking-wider text-[11px]">
            <th class="py-3 px-3">#</th>
            <th class="py-3 px-2">Class</th>
            <th class="py-3 px-3 font-semibold text-slate-900">Cadet Full Name</th>
            <th class="py-3 px-2">Company</th>
            <th class="py-3 px-2">Battalion</th>
            <th class="py-3 px-2">BOS</th>
            <th class="py-3 px-2">Status</th>
            <th class="py-3 px-3">Dietary Restrictions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 bg-white">
          ${paginated.map((c, idx) => `
            <tr class="hover:bg-slate-50/80 transition-colors">
              <td class="py-2.5 px-3 text-slate-400 text-[11px]">${startIndex + idx + 1}</td>
              <td class="py-2.5 px-2">${classBadge(c.class)}</td>
              <td class="py-2.5 px-3 font-semibold text-slate-900">${c.name || '-'}</td>
              <td class="py-2.5 px-2 font-bold text-slate-800">${c.coy ? `${c.coy} CO` : '-'}</td>
              <td class="py-2.5 px-2 text-slate-600">${c.bn ? `${c.bn} BN` : '-'}</td>
              <td class="py-2.5 px-2">${bosBadge(c.bos)}</td>
              <td class="py-2.5 px-2">${statusBadge(c.status)}</td>
              <td class="py-2.5 px-3">${dietBadges(c.diets)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Bottom Pagination Bar -->
      ${totalPages > 1 ? `
        <div class="flex items-center justify-between p-3 bg-slate-50 border-t border-slate-200 text-xs font-mono-clean">
          <div class="text-slate-500">
            Page <strong>${currentPage}</strong> of <strong>${totalPages}</strong>
          </div>
          <div class="flex items-center gap-1.5">
            <button id="messPrevPageBtn" class="px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 font-semibold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed" ${currentPage <= 1 ? 'disabled' : ''}>Previous</button>
            <button id="messNextPageBtn" class="px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 font-semibold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed" ${currentPage >= totalPages ? 'disabled' : ''}>Next</button>
          </div>
        </div>
      ` : ''}
    `;

    // Wire pagination buttons
    const prevBtn = document.getElementById('messPrevPageBtn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (state.messPage > 1) {
          state.messPage--;
          renderMessRosterTableRows(roster);
          wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    const nextBtn = document.getElementById('messNextPageBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (state.messPage < totalPages) {
          state.messPage++;
          renderMessRosterTableRows(roster);
          wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    document.querySelectorAll('.mess-pagesize-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sz = btn.getAttribute('data-size');
        state.messPageSize = sz === 'all' ? 'all' : parseInt(sz, 10);
        state.messPage = 1;
        renderMessRosterTableRows(roster);
      });
    });
  }

  // --- Subtab 2: Weekly Menu Schedule ---
  function renderMessWeeklyMenuView(container, messData) {
    if (!container) return;
    const menu = messData.menu || {};
    const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    const activeDay = state.messMenuDay || 'MONDAY';
    const dayData = menu[activeDay] || {
      morning: { viands: [], drink: '', rice: 'Steamed Rice' },
      noon: { viands: [], drink: '', rice: 'Steamed Rice' },
      evening: { viands: [], drink: '', rice: 'Steamed Rice' },
      snack: ''
    };

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Day Selector Pills -->
        <div class="flex items-center gap-2 p-2 rounded-2xl bg-white border border-slate-200 font-mono-clean text-xs overflow-x-auto no-scrollbar shadow-xs">
          <span class="text-slate-400 font-bold text-[11px] uppercase px-2 flex items-center gap-1 flex-shrink-0">
            <i data-lucide="calendar" class="w-3.5 h-3.5 text-amber-500"></i>
            <span>SELECT DAY:</span>
          </span>
          ${days.map(d => `
            <button class="mess-day-pill px-4 py-2 rounded-xl font-bold transition-all flex-shrink-0 ${
              activeDay === d
                ? 'active-pill bg-amber-600 text-white shadow-2xs'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }" data-day="${d}">
              ${d}
            </button>
          `).join('')}
        </div>

        <!-- Meal Schedule Grid (4 Cards) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- 1. Morning Mess (0630H) -->
          <div class="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    <i data-lucide="sun" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-sm text-slate-900">Morning Mess</h4>
                    <span class="text-[10px] text-slate-400 font-mono-clean">0630H – 0730H Breakfast</span>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono-clean bg-amber-50 text-amber-800 border border-amber-200">BREAKFAST</span>
              </div>

              <!-- Viands -->
              <div class="space-y-2 mt-4 font-mono-clean text-xs">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Viands & Main Course</span>
                ${(dayData.morning?.viands && dayData.morning.viands.length > 0) ? `
                  <ul class="space-y-1.5">
                    ${dayData.morning.viands.map(v => `
                      <li class="flex items-start gap-2 text-slate-800 font-semibold">
                        <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5"></i>
                        <span>${v}</span>
                      </li>
                    `).join('')}
                  </ul>
                ` : '<span class="text-slate-400">Standard Morning Rations</span>'}
              </div>
            </div>

            <!-- Beverage & Rice -->
            <div class="pt-3 border-t border-slate-100 space-y-1.5 font-mono-clean text-[11px]">
              <div class="flex items-center justify-between">
                <span class="text-slate-500">Staple:</span>
                <span class="font-bold text-slate-800">${dayData.morning?.rice || 'Steamed Rice'}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-slate-500">Beverage:</span>
                <span class="font-bold text-amber-700">${dayData.morning?.drink || 'Hot Coffee / Cocoa'}</span>
              </div>
            </div>
          </div>

          <!-- 2. Noon Mess (1200H) -->
          <div class="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                    <i data-lucide="utensils" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-sm text-slate-900">Noon Mess</h4>
                    <span class="text-[10px] text-slate-400 font-mono-clean">1200H – 1300H Lunch</span>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono-clean bg-orange-50 text-orange-800 border border-orange-200">LUNCH</span>
              </div>

              <!-- Viands -->
              <div class="space-y-2 mt-4 font-mono-clean text-xs">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Viands & Sides</span>
                ${(dayData.noon?.viands && dayData.noon.viands.length > 0) ? `
                  <ul class="space-y-1.5">
                    ${dayData.noon.viands.map(v => `
                      <li class="flex items-start gap-2 text-slate-800 font-semibold">
                        <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5"></i>
                        <span>${v}</span>
                      </li>
                    `).join('')}
                  </ul>
                ` : '<span class="text-slate-400">Standard Noon Rations</span>'}
              </div>
            </div>

            <!-- Beverage & Rice -->
            <div class="pt-3 border-t border-slate-100 space-y-1.5 font-mono-clean text-[11px]">
              <div class="flex items-center justify-between">
                <span class="text-slate-500">Staple:</span>
                <span class="font-bold text-slate-800">${dayData.noon?.rice || 'Steamed Rice'}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-slate-500">Beverage:</span>
                <span class="font-bold text-orange-700">${dayData.noon?.drink || 'Chilled Juice / Iced Tea'}</span>
              </div>
            </div>
          </div>

          <!-- 3. Evening Mess (1830H) -->
          <div class="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    <i data-lucide="moon" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-sm text-slate-900">Evening Mess</h4>
                    <span class="text-[10px] text-slate-400 font-mono-clean">1830H – 1930H Dinner</span>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono-clean bg-indigo-50 text-indigo-800 border border-indigo-200">DINNER</span>
              </div>

              <!-- Viands -->
              <div class="space-y-2 mt-4 font-mono-clean text-xs">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Viands & Dessert</span>
                ${(dayData.evening?.viands && dayData.evening.viands.length > 0) ? `
                  <ul class="space-y-1.5">
                    ${dayData.evening.viands.map(v => `
                      <li class="flex items-start gap-2 text-slate-800 font-semibold">
                        <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5"></i>
                        <span>${v}</span>
                      </li>
                    `).join('')}
                  </ul>
                ` : '<span class="text-slate-400">Standard Evening Rations</span>'}
              </div>
            </div>

            <!-- Beverage & Rice -->
            <div class="pt-3 border-t border-slate-100 space-y-1.5 font-mono-clean text-[11px]">
              <div class="flex items-center justify-between">
                <span class="text-slate-500">Staple:</span>
                <span class="font-bold text-slate-800">${dayData.evening?.rice || 'Steamed Rice'}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-slate-500">Soup / Beverage:</span>
                <span class="font-bold text-indigo-700">${dayData.evening?.drink || 'Clear Broth / Water'}</span>
              </div>
            </div>
          </div>

          <!-- 4. PM Snack -->
          <div class="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                    <i data-lucide="coffee" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-sm text-slate-900">PM Snack</h4>
                    <span class="text-[10px] text-slate-400 font-mono-clean">1530H Cadets Merienda</span>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono-clean bg-purple-50 text-purple-800 border border-purple-200">SNACK</span>
              </div>

              <!-- Snack Item -->
              <div class="space-y-2 mt-4 font-mono-clean text-xs">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Merienda Item</span>
                <div class="p-3 rounded-2xl bg-purple-50/50 border border-purple-100">
                  <span class="font-bold text-sm text-purple-950 block">${dayData.snack || 'Cadet Refreshment / Pastry'}</span>
                  <span class="text-[11px] text-purple-700 block mt-1">Served at Company Mess Areas</span>
                </div>
              </div>
            </div>

            <!-- Snack Protocol -->
            <div class="pt-3 border-t border-slate-100 text-[11px] font-mono-clean text-slate-500">
              Distributed daily by Duty Mess Cadets per company barracks.
            </div>
          </div>
        </div>

        <!-- Food Safety & Diet Substitution Advisory -->
        <div class="p-5 rounded-3xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
          <div class="flex items-center gap-2 font-bold text-slate-900">
            <i data-lucide="info" class="w-4 h-4 text-amber-600"></i>
            <span>Kitchen Standing Orders & Diet Alternative Protocol</span>
          </div>
          <p class="leading-relaxed">
            Cadets on medical, allergic, or religious food restrictions are to proceed to the <strong>Special Diet Counter</strong> upon entry to Yap Hall. 
            Cross-contamination protocols are strictly maintained for all dishes flagged with allergens (Peanuts, Eggs, Seafood, Fish). 
            Unauthorized swapping or taking of special diet rations is strictly prohibited under Cadet Regulations.
          </p>
        </div>
      </div>
    `;

    document.querySelectorAll('.mess-day-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        state.messMenuDay = pill.getAttribute('data-day') || 'MONDAY';
        renderMessWeeklyMenuView(container, messData);
        if (window.lucide) window.lucide.createIcons();
      });
    });
  }

  // --- Subtab 3: Disseminations & Bulletins ---
  function renderMessDisseminationsView(container, messData) {
    if (!container) return;
    const disseminations = messData.disseminations || [];

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Official Bulletins from Regimental Mess Officer -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-slate-900">Official Disseminations & Bulletins</h3>
              <p class="text-xs text-slate-500">Standing policy directives from the Regimental Mess Officer.</p>
            </div>
            <span class="text-xs font-mono-clean text-amber-700 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 font-bold">
              ${disseminations.length} Active Notice${disseminations.length === 1 ? '' : 's'}
            </span>
          </div>

          <div class="grid grid-cols-1 gap-4">
            ${disseminations.map(d => `
              <div class="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 font-mono-clean text-xs">
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded-md font-bold text-[10px] bg-red-100 text-red-900 border border-red-300">MESS DIRECTIVE</span>
                    <span class="text-slate-400 font-bold">${d.id}</span>
                  </div>
                  <div class="flex items-center gap-2 text-slate-500">
                    <i data-lucide="clock" class="w-3.5 h-3.5 text-slate-400"></i>
                    <span>${d.date}</span>
                  </div>
                </div>

                <div>
                  <h4 class="font-extrabold text-base text-slate-900 uppercase tracking-tight">${d.headline}</h4>
                  <p class="text-xs text-slate-700 leading-relaxed mt-2 whitespace-pre-line font-mono-clean">${d.content}</p>
                </div>

                <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono-clean text-slate-500">
                  <span class="font-bold text-slate-800">AUTHORITY: ${d.author || 'REGIMENTAL MESS OFFICER'}</span>
                  <span class="text-emerald-700 font-semibold flex items-center gap-1">
                    <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
                    <span>OFFICIALLY PROMULGATED</span>
                  </span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Standing Mess Etiquette & Hall Protocols -->
        <div class="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div class="flex items-center gap-2">
            <i data-lucide="book-open" class="w-4 h-4 text-amber-600"></i>
            <h3 class="text-sm font-bold text-slate-900">Standing Mess Hall Regulations & Dining Decorum</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono-clean leading-relaxed text-slate-700">
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h5 class="font-bold text-slate-900 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>1. Table Decorum & Etiquette</span>
              </h5>
              <p class="text-slate-600 text-[11px]">
                Cadets shall maintain military bearing during all meals. Table appointments, correct cutlery handling, and silent order must be observed. First Class cadets at the table head oversee order and table discipline.
              </p>
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h5 class="font-bold text-slate-900 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>2. Packed Mess Eligibility</span>
              </h5>
              <p class="text-slate-600 text-[11px]">
                Packed meals are strictly reserved for sanctioned duty details, working parties, or cadets officially admitted to the Station Hospital / Holding Center. Unauthorized removal of food constitutes a violation of Cadet Regulations.
              </p>
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h5 class="font-bold text-slate-900 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>3. Special Dietary Registration</span>
              </h5>
              <p class="text-slate-600 text-[11px]">
                Any adjustments to medical allergies or faith-based dietary profiles must be validated by the Academy Medical Dispensary or Corps Chaplaincy and endorsed to the Cadet Mess Council before implementation.
              </p>
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h5 class="font-bold text-slate-900 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>4. Wastage & Tray Clearance</span>
              </h5>
              <p class="text-slate-600 text-[11px]">
                Zero food wastage is enforced. All cadets shall clear their plates, properly stack cutlery and trays at designated clearance stations, and segregate food waste according to Academy sanitation policies.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- Wire Mess Events ---
  function wireMessEvents(council, messData) {
    const roster = messData.roster || [];

    // Subtab pills
    document.querySelectorAll('.mess-subtab-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        state.messActiveSubTab = pill.getAttribute('data-subtab') || 'shares-roster';
        renderMessCouncilView(council);
      });
    });

    if (state.messActiveSubTab === 'shares-roster') {
      // Search input
      const search = document.getElementById('messSearchInput');
      if (search) {
        search.addEventListener('input', (e) => {
          state.messQuery = e.target.value;
          state.messPage = 1;
          renderMessRosterTableRows(roster);
        });
      }

      // Reset filters button
      const resetBtn = document.getElementById('messResetFiltersBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          state.messQuery = '';
          state.messBattalion = 'all';
          state.messCoy = 'all';
          state.messClass = 'all';
          state.messBOS = 'all';
          state.messStatus = 'all';
          state.messActiveDiet = 'all';
          state.messPage = 1;
          renderMessCouncilView(council);
        });
      }

      // Clear diet filter button
      const clearDietBtn = document.getElementById('messClearDietFilterBtn');
      if (clearDietBtn) {
        clearDietBtn.addEventListener('click', () => {
          state.messActiveDiet = 'all';
          state.messPage = 1;
          renderMessCouncilView(council);
        });
      }

      const clearDietTag = document.getElementById('messClearActiveDietTag');
      if (clearDietTag) {
        clearDietTag.addEventListener('click', () => {
          state.messActiveDiet = 'all';
          state.messPage = 1;
          renderMessCouncilView(council);
        });
      }

      // Diet cards
      document.querySelectorAll('.mess-diet-card').forEach(card => {
        card.addEventListener('click', () => {
          const diet = card.getAttribute('data-diet');
          if (state.messActiveDiet === diet) {
            state.messActiveDiet = 'all';
          } else {
            state.messActiveDiet = diet;
          }
          state.messPage = 1;
          renderMessCouncilView(council);
        });
      });

      // Battalion pills
      document.querySelectorAll('.mess-bn-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          state.messBattalion = pill.getAttribute('data-bn') || 'all';
          state.messPage = 1;
          renderMessCouncilView(council);
        });
      });

      // Class pills
      document.querySelectorAll('.mess-class-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          state.messClass = pill.getAttribute('data-class') || 'all';
          state.messPage = 1;
          renderMessCouncilView(council);
        });
      });

      // Company pills
      document.querySelectorAll('.mess-coy-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          state.messCoy = pill.getAttribute('data-coy') || 'all';
          state.messPage = 1;
          renderMessCouncilView(council);
        });
      });

      // BOS pills
      document.querySelectorAll('.mess-bos-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          state.messBOS = pill.getAttribute('data-bos') || 'all';
          state.messPage = 1;
          renderMessCouncilView(council);
        });
      });

      // Status pills
      document.querySelectorAll('.mess-status-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          state.messStatus = pill.getAttribute('data-status') || 'all';
          state.messPage = 1;
          renderMessCouncilView(council);
        });
      });
    }
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
      'CCPB': 'ccpb',
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

    if (council.id === 'mess') {
      if (dom.activeCouncilTag) dom.activeCouncilTag.textContent = "SPECIALIST COUNCIL";
      if (dom.activeCouncilTitle) dom.activeCouncilTitle.textContent = "Cadet Mess Council";
      if (dom.activeCouncilDesc) dom.activeCouncilDesc.textContent = "Cadet Disposition, Kitchen Cooking Shares, Dietary Restrictions & Weekly Menu";
      renderMessCouncilView(council);
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
    if (dom.socUniformDesc) {
      dom.socUniformDesc.textContent = (typeof window !== 'undefined' && window.getUniformFullName)
        ? window.getUniformFullName(sched.officers?.uniform || 'DA w/ CJ')
        : 'Drill A w/ Corps Jacket';
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
        dom.socChangesCountBadge.textContent = `${changes.length} ${changes.length === 1 ? 'CHANGE OF SCHEDULE' : 'CHANGES OF SCHEDULE'}`;
      }

      if (changes.length === 0) {
        dom.socChangesContainer.innerHTML = `
          <div class="col-span-full py-4 text-center text-xs font-mono-clean text-amber-900/80">
            No changes of schedule recorded for today.
          </div>
        `;
      } else {
        dom.socChangesContainer.innerHTML = changes.map(ch => {
          const uFull = (typeof window !== 'undefined' && window.getUniformFullName) ? window.getUniformFullName(ch.uniform) : ch.uniform;
          return `
            <div class="p-3.5 rounded-2xl bg-white border border-amber-200/90 shadow-xs space-y-2 hover:border-amber-400 transition-colors">
              <div class="flex items-center justify-between">
                <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-950 font-bold font-mono-clean text-[10px] tracking-wide">${ch.time}</span>
                <span class="text-[10px] font-mono-clean text-slate-500 uppercase tracking-wider">${ch.formation && ch.formation !== '-' ? 'VENUE: ' + ch.formation : 'CORPS CALL'}</span>
              </div>
              <h5 class="font-bold text-xs text-slate-900 font-mono-clean leading-snug">${ch.activity}</h5>
              <div class="flex items-center gap-2 pt-1 border-t border-slate-100 text-[10px] font-mono-clean text-slate-600 flex-wrap">
                <span>UNIFORM: <strong class="text-blue-900 font-bold" title="${uFull}">${ch.uniform || '-'}</strong>${uFull && uFull !== ch.uniform ? ` <span class="text-slate-400 font-normal">(${uFull})</span>` : ''}</span>
                ${ch.formation && ch.formation !== '-' ? `<span>&bull;</span><span>FORMATION: <strong class="text-slate-800 font-bold">${ch.formation}</strong></span>` : ''}
              </div>
            </div>
          `;
        }).join('');
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
        const today = new Date();
        const isFriOrSat = today.getDay() === 5 || today.getDay() === 6;

        dom.dutyGuardRosterTableBody.innerHTML = guards.map(g => {
          const isCal = (g.postCode && (g.postCode === 'CAL 1' || g.postCode === 'CAL 2')) ||
                        (g.post && (g.post.toUpperCase().includes('CAL 1') || g.post.toUpperCase().includes('CAL 2')));
          const isCalWeekend = isFriOrSat && isCal;
          const incomingDisplay = isCalWeekend ? 'N/A' : (g.incoming || '-');
          const statusText = isCalWeekend ? 'N/A' : (g.incoming && g.incoming !== '-' ? 'RELIEF DUE' : 'ON DUTY');
          const statusClass = isCalWeekend 
            ? 'bg-slate-100 text-slate-500 border border-slate-200' 
            : (g.incoming && g.incoming !== '-' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-slate-100 text-slate-600');

          return `
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
              <td class="py-3 px-4 font-mono-clean font-semibold ${isCalWeekend ? 'text-slate-500' : 'text-emerald-800'}">
                <span class="px-2 py-0.5 rounded ${isCalWeekend ? 'bg-slate-100 border border-slate-200 text-slate-500' : 'bg-emerald-50 border border-emerald-100 text-emerald-900'}">${incomingDisplay}</span>
              </td>
              <td class="py-3 px-4 text-center font-mono-clean">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold ${statusClass}">
                  ${statusText}
                </span>
              </td>
            </tr>
          `;
        }).join('');
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

    // 6. Authorized Corps Uniforms Guide Grid
    if (dom.socUniformGuideGrid) {
      const defs = (typeof window !== 'undefined' && window.UNIFORM_DEFINITIONS) ? window.UNIFORM_DEFINITIONS : [];
      dom.socUniformGuideGrid.innerHTML = defs.map(u => `
        <div class="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-blue-400 hover:bg-blue-50/30 transition-all flex flex-col justify-between space-y-2 shadow-xs group">
          <div class="flex items-center justify-between gap-1.5">
            <span class="px-2 py-0.5 rounded-md bg-blue-900 text-white font-bold text-[11px] tracking-wide font-mono-clean">${u.code}</span>
            <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">AUTHORIZED</span>
          </div>
          <div>
            <h5 class="font-bold text-xs text-slate-900 leading-snug font-mono-clean group-hover:text-blue-950 transition-colors">${u.name}</h5>
            <p class="text-[10px] text-slate-500 font-mono-clean mt-0.5 leading-tight">${u.desc}</p>
          </div>
        </div>
      `).join('');
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

    // 1. All Changes of Schedule from SCHEDULE OF CALLS spreadsheet
    if (sched && sched.changes && sched.changes.length > 0) {
      sched.changes.forEach(ch => {
        items.push(`
          <div class="ticker-item font-mono-clean">
            <span class="px-1.5 py-0.5 rounded bg-amber-500 text-white font-bold text-[10px]">CHANGES OF SCHEDULE</span>
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
          <span class="px-1.5 py-0.5 rounded bg-blue-900 text-white font-bold text-[10px]">POSTED OC & AOC</span>
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

    dom.punishmentTableBody.innerHTML = filtered.map(item => {
      const totalHours = Number(item.tours) || 0;
      const remHours = item.toursRem !== undefined ? Number(item.toursRem) : (item.remaining !== undefined ? Number(item.remaining) : totalHours);
      const servedHours = item.served !== undefined ? Number(item.served) : Math.max(0, totalHours - remHours);
      const pct = totalHours > 0 ? Math.min(100, Math.max(0, Math.round((servedHours / totalHours) * 100))) : 0;

      return `
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
          <td class="py-3 px-3 text-left">
            <div class="w-full max-w-[140px]">
              <div class="flex items-center justify-between text-[11px] font-mono-clean font-semibold text-slate-800 mb-1">
                <span>${remHours}h rem</span>
                <span class="text-slate-500 font-normal">${totalHours}h</span>
              </div>
              <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div class="bg-emerald-500 h-full rounded-full transition-all duration-300" style="width: ${pct}%;"></div>
              </div>
            </div>
          </td>
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
      `;
    }).join('');
  }

  // --- Staff Directory ---
  function renderStaffDirectory() {
    if (!dom.staffDisplayContainer) return;
    const level = state.staffLevel;

    if (level === 'regiment') {
      const staffData = CCAFP_CONFIG.s1Data?.regimentStaff2027 || CCAFP_CONFIG.s1Data?.regimentStaff || {};
      const cmd = Array.isArray(staffData.commandSection) ? staffData.commandSection : [];
      const coord = Array.isArray(staffData.coordinatingStaff) ? staffData.coordinatingStaff : [];
      const spec = Array.isArray(staffData.specialStaff) ? staffData.specialStaff : [];
      const ncos = Array.isArray(staffData.ncos) ? staffData.ncos : [];

      const allEntries = [
        ...cmd.map(s => ({ ...s, section: 'command', sectionLabel: 'COMMAND SECTION', borderClass: 'stripe-red' })),
        ...coord.map(s => ({ ...s, section: 'coordinating', sectionLabel: `COORDINATING STAFF (${s.code || ''})`, borderClass: 'stripe-blue' })),
        ...spec.map(s => ({ ...s, section: 'special', sectionLabel: 'SPECIAL STAFF OFFICER', borderClass: 'stripe-amber' })),
        ...ncos.map(s => ({ ...s, section: 'ncos', sectionLabel: 'REGIMENTAL NCO', borderClass: 'stripe-emerald' }))
      ];

      const catFilter = state.staffRegimentCat || 'all';
      let filtered = allEntries;
      if (catFilter !== 'all') {
        filtered = filtered.filter(s => s.section === catFilter);
      }

      const q = (state.staffRegimentQuery || '').toLowerCase().trim();
      if (q) {
        filtered = filtered.filter(s =>
          (s.name || '').toLowerCase().includes(q) ||
          (s.role || '').toLowerCase().includes(q) ||
          (s.coy || '').toLowerCase().includes(q) ||
          (s.serial || '').toLowerCase().includes(q)
        );
      }

      const bSum = staffData.branchSummary || { army: 9, aero: 9, navy: 9, total: 27 };
      const gSum = staffData.genderSummary || { male: 17, female: 10, total: 27 };

      dom.staffDisplayContainer.innerHTML = `
        <div class="space-y-5">
          <!-- Header Summary & KPI Cards -->
          <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 font-mono-clean text-xs">
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-[10px] text-slate-400 font-bold block uppercase">TOTAL STAFF</span>
              <span class="text-lg font-bold text-slate-900">${allEntries.length} Officers & NCOs</span>
              <span class="text-[10px] text-slate-500 block">Class 2027</span>
            </div>
            <div class="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <span class="text-[10px] text-emerald-700 font-bold block uppercase">PHIL ARMY (PA)</span>
              <span class="text-lg font-bold text-emerald-950">${bSum.army || 9} Cadets</span>
              <span class="text-[10px] text-emerald-600 block">Ground Combat</span>
            </div>
            <div class="p-3 rounded-2xl bg-blue-50/70 border border-blue-200">
              <span class="text-[10px] text-blue-700 font-bold block uppercase">AIR FORCE (PAF)</span>
              <span class="text-lg font-bold text-blue-950">${bSum.aero || 9} Cadets</span>
              <span class="text-[10px] text-blue-600 block">Aero Wings</span>
            </div>
            <div class="p-3 rounded-2xl bg-cyan-50/70 border border-cyan-200">
              <span class="text-[10px] text-cyan-700 font-bold block uppercase">PHIL NAVY (PN)</span>
              <span class="text-lg font-bold text-cyan-950">${bSum.navy || 9} Cadets</span>
              <span class="text-[10px] text-cyan-600 block">Naval Command</span>
            </div>
            <div class="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-200">
              <span class="text-[10px] text-indigo-700 font-bold block uppercase">MALE OFFICERS</span>
              <span class="text-lg font-bold text-indigo-950">${gSum.male || 17} Cadets</span>
              <span class="text-[10px] text-indigo-600 block">Commissioning</span>
            </div>
            <div class="p-3 rounded-2xl bg-rose-50/70 border border-rose-200">
              <span class="text-[10px] text-rose-700 font-bold block uppercase">FEMALE OFFICERS</span>
              <span class="text-lg font-bold text-rose-950">${gSum.female || 10} Cadets</span>
              <span class="text-[10px] text-rose-600 block">Commissioning</span>
            </div>
          </div>

          <!-- Filter Pills & Search Bar -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs font-mono-clean">
              <span class="text-slate-400 font-bold text-[10px] uppercase mr-1">BRANCH:</span>
              <button class="task-staff-cat-pill ${catFilter === 'all' ? 'active-pill bg-blue-900 text-white font-semibold' : 'bg-white text-slate-700 hover:bg-slate-100'} px-3 py-1 rounded-lg border border-slate-200 flex-shrink-0" data-staff-cat="all">All (${allEntries.length})</button>
              <button class="task-staff-cat-pill ${catFilter === 'command' ? 'active-pill bg-blue-900 text-white font-semibold' : 'bg-white text-slate-700 hover:bg-slate-100'} px-3 py-1 rounded-lg border border-slate-200 flex-shrink-0" data-staff-cat="command">Command (${cmd.length})</button>
              <button class="task-staff-cat-pill ${catFilter === 'coordinating' ? 'active-pill bg-blue-900 text-white font-semibold' : 'bg-white text-slate-700 hover:bg-slate-100'} px-3 py-1 rounded-lg border border-slate-200 flex-shrink-0" data-staff-cat="coordinating">Coordinating (${coord.length})</button>
              <button class="task-staff-cat-pill ${catFilter === 'special' ? 'active-pill bg-blue-900 text-white font-semibold' : 'bg-white text-slate-700 hover:bg-slate-100'} px-3 py-1 rounded-lg border border-slate-200 flex-shrink-0" data-staff-cat="special">Special Staff (${spec.length})</button>
              <button class="task-staff-cat-pill ${catFilter === 'ncos' ? 'active-pill bg-blue-900 text-white font-semibold' : 'bg-white text-slate-700 hover:bg-slate-100'} px-3 py-1 rounded-lg border border-slate-200 flex-shrink-0" data-staff-cat="ncos">Regt NCOs (${ncos.length})</button>
            </div>
            <div>
              <input id="taskStaffSearchInput" type="text" value="${state.staffRegimentQuery || ''}" placeholder="Search staff name, role, serial..." class="px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-56 font-mono-clean">
            </div>
          </div>

          <!-- Staff Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${filtered.map(s => {
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
                        <span>Active Duty</span>
                      </span>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;

      // Attach listeners for category pills & search
      document.querySelectorAll('.task-staff-cat-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          state.staffRegimentCat = pill.getAttribute('data-staff-cat') || 'all';
          renderStaffDirectory();
        });
      });

      const searchInput = document.getElementById('taskStaffSearchInput');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          state.staffRegimentQuery = e.target.value;
          renderStaffDirectory();
        });
        if (state.staffRegimentQuery) {
          searchInput.focus();
          searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
        }
      }
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
      const spiritual1clUrl = (typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS.spiritual_1cl : '');
      const spiritual2clUrl = (typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS.spiritual_2cl : '');
      const spiritual3clUrl = (typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS.spiritual_3cl : '');
      const messDbUrl = (typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS.mess_database : '');
      const messViandsUrl = (typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS.mess_viands : '');
      const messDissemUrl = (typeof COUNCIL_SHEET_URLS !== 'undefined' ? COUNCIL_SHEET_URLS.mess_disseminations : '');

      // Concurrently fetch all sheets with cache busting
      const [
        schedRes, dispRes, armoryRes, attachRes, punishConductRes, punishTotalsRes,
        expandedRes, rosterRes, squadsRes, ape1Res, ape2Res, clubsRes, tinRes,
        sp1Res, sp2Res, sp3Res, messDbRes, messViandsRes, messDissemRes
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
        syncManager.fetchLiveCSV(spiritual1clUrl),
        syncManager.fetchLiveCSV(spiritual2clUrl),
        syncManager.fetchLiveCSV(spiritual3clUrl),
        syncManager.fetchLiveCSV(messDbUrl),
        syncManager.fetchLiveCSV(messViandsUrl),
        syncManager.fetchLiveCSV(messDissemUrl)
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

      // 12. SPIRITUAL DEVELOPMENT COUNCIL (1CL, 2CL, 3CL)
      let freshSpiritual = [];
      if (sp1Res.status === 'fulfilled' && sp1Res.value && sp1Res.value.length > 0) {
        const p1 = syncManager.parseSpiritual ? syncManager.parseSpiritual(sp1Res.value, '1CL') : null;
        if (p1 && p1.length > 0) freshSpiritual = freshSpiritual.concat(p1);
      }
      if (sp2Res.status === 'fulfilled' && sp2Res.value && sp2Res.value.length > 0) {
        const p2 = syncManager.parseSpiritual ? syncManager.parseSpiritual(sp2Res.value, '2CL') : null;
        if (p2 && p2.length > 0) freshSpiritual = freshSpiritual.concat(p2);
      }
      if (sp3Res.status === 'fulfilled' && sp3Res.value && sp3Res.value.length > 0) {
        const p3 = syncManager.parseSpiritual ? syncManager.parseSpiritual(sp3Res.value, '3CL') : null;
        if (p3 && p3.length > 0) freshSpiritual = freshSpiritual.concat(p3);
      }
      if (freshSpiritual.length > 0) {
        CCAFP_CONFIG.spiritualData = freshSpiritual;
        hasNewData = true;
      }

      // 13. CADET MESS COUNCIL (ROSTER DATABASE, VIANDS, DISSEMINATIONS)
      if (!CCAFP_CONFIG.messData) {
        CCAFP_CONFIG.messData = window.MESS_MASTER_DATA || { roster: [], menu: {}, disseminations: [] };
      }
      if (messDbRes.status === 'fulfilled' && messDbRes.value && messDbRes.value.length > 0) {
        const parsedRoster = syncManager.parseMessRoster(messDbRes.value);
        if (parsedRoster && parsedRoster.length > 0) {
          CCAFP_CONFIG.messData.roster = parsedRoster;
          hasNewData = true;
        }
      }
      if (messViandsRes.status === 'fulfilled' && messViandsRes.value && messViandsRes.value.length > 0) {
        const parsedMenu = syncManager.parseMessMenu(messViandsRes.value);
        if (parsedMenu && Object.keys(parsedMenu).length > 0) {
          CCAFP_CONFIG.messData.menu = parsedMenu;
          hasNewData = true;
        }
      }
      if (messDissemRes.status === 'fulfilled' && messDissemRes.value && messDissemRes.value.length > 0) {
        const parsedDissem = syncManager.parseMessDisseminations(messDissemRes.value);
        if (parsedDissem && parsedDissem.length > 0) {
          CCAFP_CONFIG.messData.disseminations = parsedDissem;
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
        state.s1ApePage = 1;
        renderS1Ape();
      });
    }
    document.querySelectorAll('.s1-ape-class-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.s1-ape-class-pill').forEach(p => {
          p.className = 's1-ape-class-pill px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium flex-shrink-0';
        });
        pill.className = 's1-ape-class-pill active-pill px-3 py-1 rounded-lg bg-blue-900 text-white font-semibold flex-shrink-0';
        state.s1ApeClass = pill.getAttribute('data-ape-class') || 'all';
        state.s1ApePage = 1;
        renderS1Ape();
      });
    });

    // S1 APE Company Filter Pills
    document.querySelectorAll('.s1-ape-coy-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.s1-ape-coy-pill').forEach(p => {
          p.className = 's1-ape-coy-pill px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-[11px] flex-shrink-0';
        });
        pill.className = 's1-ape-coy-pill active-pill px-2.5 py-1 rounded-lg bg-slate-800 text-white font-semibold text-[11px] flex-shrink-0';
        state.s1ApeCompany = pill.getAttribute('data-ape-coy') || 'all';
        state.s1ApePage = 1;
        renderS1Ape();
      });
    });

    // S1 APE Pagination Controls
    if (dom.s1ApePrevBtn) {
      dom.s1ApePrevBtn.addEventListener('click', () => {
        if (state.s1ApePage > 1) {
          state.s1ApePage--;
          renderS1Ape();
        }
      });
    }
    if (dom.s1ApeNextBtn) {
      dom.s1ApeNextBtn.addEventListener('click', () => {
        state.s1ApePage++;
        renderS1Ape();
      });
    }
    if (dom.s1ApePageSizeSelect) {
      dom.s1ApePageSizeSelect.addEventListener('change', (e) => {
        state.s1ApePageSize = e.target.value;
        state.s1ApePage = 1;
        renderS1Ape();
      });
    }

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

    // S1 Expanded Class Filter Pills
    document.querySelectorAll('.s1-expanded-class-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.s1-expanded-class-pill').forEach(p => {
          p.className = 's1-expanded-class-pill px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 flex-shrink-0';
        });
        pill.className = 's1-expanded-class-pill active-pill px-3 py-1 rounded-lg bg-blue-900 text-white font-semibold flex-shrink-0';
        state.s1ExpandedClass = pill.getAttribute('data-expanded-class') || 'all';
        state.s1ExpandedPage = 1;
        renderS1Expanded();
      });
    });

    // S1 Squad Company Filter Pills
    document.querySelectorAll('.s1-squad-coy-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        state.s1SquadCoy = pill.getAttribute('data-squad-coy') || 'ALFA';
        renderS1Squads();
      });
    });

    // S1 TIN Class & Company Filter Pills
    document.querySelectorAll('.s1-tin-class-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        state.s1TinClass = pill.getAttribute('data-tin-class') || 'all';
        state.s1TinPage = 1;
        renderS1Tin();
      });
    });
    document.querySelectorAll('.s1-tin-coy-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        state.s1TinCoy = pill.getAttribute('data-tin-coy') || 'all';
        state.s1TinPage = 1;
        renderS1Tin();
      });
    });

    // Punishment Search Input
    if (dom.punishmentSearchInput) {
      dom.punishmentSearchInput.addEventListener('input', (e) => {
        state.punishmentQuery = e.target.value;
        renderPunishments();
      });
    }

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
    try { initTheme(); } catch(e) { console.error('initTheme error:', e); }
    try { setupEventListeners(); } catch(e) { console.error('setupEventListeners error:', e); }
    try { updateTime(); } catch(e) {}
    try { setInterval(updateTime, 1000); } catch(e) {}

    // 1. Restore cached state from previous 15-minute sync if available
    try { restoreLiveSnapshotFromStorage(); } catch(e) { console.warn('Cache restore skipped:', e); }

    // 2. Render all initial views with loaded/cached data safely
    try { renderSidebarCouncils(); } catch(e) { console.error('renderSidebarCouncils error:', e); }
    try { renderCouncilsDirectoryPills(); } catch(e) { console.error('renderCouncilsDirectoryPills error:', e); }
    try { renderPriorityBulletins(); } catch(e) { console.error('renderPriorityBulletins error:', e); }
    try { renderS1Data(); } catch(e) { console.error('renderS1Data error:', e); }
    try { renderRsoArmory(); } catch(e) { console.error('renderRsoArmory error:', e); }
    try { renderScheduleOfCallsView(); } catch(e) { console.error('renderScheduleOfCallsView error:', e); }
    try { updateMarqueeTicker(); } catch(e) { console.error('updateMarqueeTicker error:', e); }
    try { updateHeroStats(); } catch(e) { console.error('updateHeroStats error:', e); }
    try { renderCalendar(); } catch(e) { console.error('renderCalendar error:', e); }
    try { renderPunishments(); } catch(e) { console.error('renderPunishments error:', e); }
    try { renderStaffDirectory(); } catch(e) { console.error('renderStaffDirectory error:', e); }

    // 3. Start 15-Minute Countdown Timer
    try { startAutoSync15MinTimer(); } catch(e) {}

    // 4. Perform immediate live check in the background
    try { performAutomated15MinSync(false); } catch(e) {}

    try { if (window.lucide) window.lucide.createIcons(); } catch(e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
