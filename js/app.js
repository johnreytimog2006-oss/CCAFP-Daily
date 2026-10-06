// CCAFP Daily - Alfacoy Portal Logic, S1 Sub-Sections & Live Sheets Engine

(function () {
  'use strict';

  // Live Sheet Sync Manager (Reading from COUNCIL_SHEET_URLS in data.js)
  const syncManager = new SheetSyncManager();

  // Application State
  const state = {
    currentTab: 'home',
    s1ActiveSubTab: 'strength',
    activeCouncilId: 's1',
    liveCache: {},
    staffLevel: 'regiment',
    punishmentQuery: '',
    s1RosterQuery: '',
    isSyncing: false
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
    // Home View
    priorityBulletinsGrid: document.getElementById('priorityBulletinsGrid'),
    // S1 View & Subtabs
    s1SubTabs: document.querySelectorAll('.s1-subtab'),
    s1SubPanes: document.querySelectorAll('.s1-subpane'),
    s1StrengthTableBody: document.getElementById('s1StrengthTableBody'),
    s1RosterTableBody: document.getElementById('s1RosterTableBody'),
    s1RosterSearch: document.getElementById('s1RosterSearch'),
    s1StaffGrid: document.getElementById('s1StaffGrid'),
    s1NonEffectiveTableBody: document.getElementById('s1NonEffectiveTableBody'),
    // Staff View
    staffDisplayContainer: document.getElementById('staffDisplayContainer'),
    staffTabs: document.querySelectorAll('.staff-tab'),
    // Duty View
    dutyRoutineList: document.getElementById('dutyRoutineList'),
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
      duty: 'DUTY OFFICERS',
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
  }

  // --- Render S1 Sub-Sections Data ---
  function renderS1Data() {
    // 1. Strength Summary by Company & Gender
    if (dom.s1StrengthTableBody) {
      const summary = CCAFP_CONFIG.s1Data.strengthSummary;
      dom.s1StrengthTableBody.innerHTML = summary.map(row => `
        <tr class="hover:bg-slate-50/70 transition-colors">
          <td class="py-3 px-3 font-sans font-bold text-slate-900">${row.company} Coy</td>
          <td class="py-3 px-2 text-center text-slate-700">${row.firstCL_M} / <span class="text-blue-600 font-semibold">${row.firstCL_F}</span></td>
          <td class="py-3 px-2 text-center text-slate-700">${row.secondCL_M} / <span class="text-blue-600 font-semibold">${row.secondCL_F}</span></td>
          <td class="py-3 px-2 text-center text-slate-700">${row.thirdCL_M} / <span class="text-blue-600 font-semibold">${row.thirdCL_F}</span></td>
          <td class="py-3 px-2 text-center text-slate-700">${row.fourthCL_M} / <span class="text-blue-600 font-semibold">${row.fourthCL_F}</span></td>
          <td class="py-3 px-3 text-right font-bold text-blue-950 font-mono-clean text-sm">${row.total}</td>
        </tr>
      `).join('');
    }

    // 2. Master Cadet Roster
    renderS1Roster();

    // 3. Staff for Personnel
    if (dom.s1StaffGrid) {
      dom.s1StaffGrid.innerHTML = CCAFP_CONFIG.s1Data.staff.map(st => `
        <div class="bulletin-card stripe-blue p-5 space-y-2">
          <div class="flex items-center justify-between text-xs text-slate-500 font-mono-clean">
            <span class="text-blue-700 font-bold">${st.company}</span>
            <span class="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[10px] font-bold">STAFF</span>
          </div>
          <h4 class="font-bold text-sm text-slate-900">${st.name}</h4>
          <p class="text-xs text-blue-900 font-semibold">${st.role}</p>
          <p class="text-xs text-slate-500 pt-2 border-t border-slate-100 leading-relaxed">${st.task}</p>
        </div>
      `).join('');
    }

    // 4. Non-Effective Status
    if (dom.s1NonEffectiveTableBody) {
      dom.s1NonEffectiveTableBody.innerHTML = CCAFP_CONFIG.s1Data.nonEffective.map(ne => `
        <tr class="hover:bg-slate-50/70 transition-colors">
          <td class="py-3 px-3 font-sans font-bold text-slate-900">${ne.name}</td>
          <td class="py-3 px-2 text-slate-500">${ne.serial}</td>
          <td class="py-3 px-2 text-blue-700 font-semibold">${ne.company} Coy</td>
          <td class="py-3 px-3">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
              ne.status.includes('Hospital') ? 'bg-amber-50 text-amber-800 border border-amber-200' :
              ne.status.includes('Leave') ? 'bg-blue-50 text-blue-700 border border-blue-200' :
              'bg-purple-50 text-purple-700 border border-purple-200'
            }">${ne.status}</span>
          </td>
          <td class="py-3 px-3 text-slate-600 font-sans">${ne.reason}</td>
          <td class="py-3 px-3 text-slate-500 font-semibold">${ne.authorizedBy}</td>
        </tr>
      `).join('');
    }
  }

  // Render S1 Roster with Search Filter
  function renderS1Roster() {
    if (!dom.s1RosterTableBody) return;
    const q = state.s1RosterQuery.toLowerCase();
    const filtered = CCAFP_CONFIG.s1Data.roster.filter(c => {
      return c.name.toLowerCase().includes(q) ||
             c.classYr.toLowerCase().includes(q) ||
             c.branch.toLowerCase().includes(q) ||
             c.company.toLowerCase().includes(q) ||
             c.designation.toLowerCase().includes(q);
    });

    if (filtered.length === 0) {
      dom.s1RosterTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="p-8 text-center text-slate-400 font-sans">
            No cadet records match your search filter.
          </td>
        </tr>
      `;
    } else {
      dom.s1RosterTableBody.innerHTML = filtered.map(c => `
        <tr class="hover:bg-slate-50/70 transition-colors">
          <td class="py-3 px-3 font-sans font-bold text-slate-900">${c.name}</td>
          <td class="py-3 px-2 text-slate-600">${c.classYr}</td>
          <td class="py-3 px-2 text-blue-900 font-bold">${c.branch}</td>
          <td class="py-3 px-2 text-blue-700 font-semibold">${c.company} Coy</td>
          <td class="py-3 px-3 text-slate-700 font-sans">${c.designation}</td>
          <td class="py-3 px-3">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
              c.status.includes('Present') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
              c.status.includes('Hospital') ? 'bg-amber-50 text-amber-800 border border-amber-200' :
              'bg-blue-50 text-blue-700 border border-blue-200'
            }">${c.status}</span>
          </td>
        </tr>
      `).join('');
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

    lucide.createIcons();
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

    lucide.createIcons();
  }

  // --- Routine Schedule ---
  function renderDutyRoutine() {
    if (!dom.dutyRoutineList) return;
    dom.dutyRoutineList.innerHTML = CCAFP_CONFIG.dailySchedule.map(item => `
      <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
        <div class="flex items-center gap-2.5">
          <span class="font-bold font-mono-clean text-blue-900 bg-blue-100 px-2 py-0.5 rounded">${item.time}</span>
          <span class="font-semibold text-slate-800">${item.event}</span>
          <span class="text-slate-400">(${item.venue})</span>
        </div>
        <span class="text-[11px] font-mono-clean text-slate-500">${item.uniform}</span>
      </div>
    `).join('');
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
    lucide.createIcons();
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
          ${CCAFP_CONFIG.staffDirectory.regiment.map(s => `
            <div class="bulletin-card stripe-blue p-5 space-y-2">
              <div class="flex items-center justify-between text-xs text-slate-500">
                <span class="text-blue-700 font-bold">${s.company} Coy</span>
                <span class="font-mono-clean">Class of ${s.class}</span>
              </div>
              <h4 class="font-bold text-sm text-slate-900">${s.name}</h4>
              <p class="text-xs text-blue-900 font-semibold">${s.role}</p>
            </div>
          `).join('')}
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

  // --- Live Google Sheets Sync ---
  async function performLiveSync() {
    if (state.isSyncing) return;
    state.isSyncing = true;

    if (dom.manualSyncBtn) {
      dom.manualSyncBtn.querySelector('i')?.classList.add('animate-spin');
    }
    showToast('Fetching latest updates from Google Sheets...', 'info');

    let synced = 0;
    for (const council of CCAFP_CONFIG.councils) {
      const link = syncManager.getLink(council.id);
      if (link && link.startsWith('http')) {
        const data = await syncManager.fetchLiveCSV(link);
        if (data && data.length > 0) {
          state.liveCache[council.id] = data;
          synced++;
        }
      }
    }

    if (state.currentTab === 's1') {
      renderS1Data();
    } else if (state.currentTab === 'council') {
      const council = CCAFP_CONFIG.councils.find(c => c.id === state.activeCouncilId);
      renderActiveCouncilView(council);
    }

    state.isSyncing = false;
    if (dom.manualSyncBtn) {
      dom.manualSyncBtn.querySelector('i')?.classList.remove('animate-spin');
    }

    updateTime();
    if (synced > 0) {
      showToast(`Synchronized S1 & councils live from Google Sheets!`, 'success');
    } else {
      showToast('Cadet Corps bulletin records are current.', 'success');
    }
  }

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

    // S1 Roster Search
    if (dom.s1RosterSearch) {
      dom.s1RosterSearch.addEventListener('input', (e) => {
        state.s1RosterQuery = e.target.value;
        renderS1Roster();
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
    if (dom.manualSyncBtn) dom.manualSyncBtn.addEventListener('click', performLiveSync);
  }

  // --- Bootstrap Initialization ---
  function init() {
    updateTime();
    setInterval(updateTime, 1000);

    renderSidebarCouncils();
    renderPriorityBulletins();
    renderS1Data();
    renderDutyRoutine();
    renderCalendar();
    renderPunishments();
    renderStaffDirectory();
    setupEventListeners();

    // Auto-polling live sheets every 45s
    setInterval(performLiveSync, 45000);

    lucide.createIcons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
