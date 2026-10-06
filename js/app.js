// CCAFP Daily - Core Portal Logic & Live Sheets Engine

(function () {
  'use strict';

  // Instantiate Live Sheet Sync Manager
  const syncManager = new SheetSyncManager();

  // App State
  const state = {
    currentTab: 'daily',
    activeCouncilId: 's1',
    currentTheme: localStorage.getItem('ccafp_theme') || 'pma-crimson',
    liveCache: {}, // In-memory cache for fetched sheets
    calendarFilter: 'all',
    punishmentFilterCompany: 'all',
    punishmentSearchQuery: '',
    staffLevel: 'regiment',
    isSyncing: false
  };

  // DOM Elements Cache
  const dom = {
    body: document.body,
    html: document.documentElement,
    pstClock: document.getElementById('pstClock'),
    syncStatusBadge: document.getElementById('syncStatusBadge'),
    manualSyncBtn: document.getElementById('manualSyncBtn'),
    themeDropdownBtn: document.getElementById('themeDropdownBtn'),
    themeMenu: document.getElementById('themeMenu'),
    currentThemeLabel: document.getElementById('currentThemeLabel'),
    councilSliderStrip: document.getElementById('councilSliderStrip'),
    scrollCouncilLeft: document.getElementById('scrollCouncilLeft'),
    scrollCouncilRight: document.getElementById('scrollCouncilRight'),
    navTabs: document.querySelectorAll('.nav-tab'),
    tabPanes: document.querySelectorAll('.tab-pane'),
    // Daily View
    dailyRoutineTimeline: document.getElementById('dailyRoutineTimeline'),
    flashTickerText: document.getElementById('flashTickerText'),
    ocName: document.getElementById('ocName'),
    ocUnit: document.getElementById('ocUnit'),
    aocName: document.getElementById('aocName'),
    aocUnit: document.getElementById('aocUnit'),
    socName: document.getElementById('socName'),
    socUnit: document.getElementById('socUnit'),
    medicName: document.getElementById('medicName'),
    medicUnit: document.getElementById('medicUnit'),
    // Council View
    activeCouncilCategory: document.getElementById('activeCouncilCategory'),
    activeCouncilSensitiveTag: document.getElementById('activeCouncilSensitiveTag'),
    activeCouncilTitle: document.getElementById('activeCouncilTitle'),
    activeCouncilDesc: document.getElementById('activeCouncilDesc'),
    councilAnnouncementsBox: document.getElementById('councilAnnouncementsBox'),
    councilDynamicContainer: document.getElementById('councilDynamicContainer'),
    openActiveSheetBtn: document.getElementById('openActiveSheetBtn'),
    editActiveSheetLinkBtn: document.getElementById('editActiveSheetLinkBtn'),
    // Calendar View
    calendarEventsGrid: document.getElementById('calendarEventsGrid'),
    calFilters: document.querySelectorAll('.cal-filter'),
    // Punishment View
    punishmentTableBody: document.getElementById('punishmentTableBody'),
    punishmentSearchInput: document.getElementById('punishmentSearchInput'),
    punishmentCompanyFilter: document.getElementById('punishmentCompanyFilter'),
    // Staff View
    staffDisplayContainer: document.getElementById('staffDisplayContainer'),
    staffTabs: document.querySelectorAll('.staff-tab'),
    // Modal
    configModal: document.getElementById('configModal'),
    openConfigBtn: document.getElementById('openConfigBtn'),
    closeConfigBtn: document.getElementById('closeConfigBtn'),
    cancelConfigBtn: document.getElementById('cancelConfigBtn'),
    saveConfigBtn: document.getElementById('saveConfigBtn'),
    resetLinksBtn: document.getElementById('resetLinksBtn'),
    sheetLinksInputsList: document.getElementById('sheetLinksInputsList'),
    toastContainer: document.getElementById('toastContainer')
  };

  // --- Theme Management ---
  function initTheme() {
    applyTheme(state.currentTheme);
    renderThemeMenu();
  }

  function applyTheme(themeId) {
    state.currentTheme = themeId;
    localStorage.setItem('ccafp_theme', themeId);
    dom.html.setAttribute('data-theme', themeId);
    const found = CCAFP_CONFIG.pmaThemes.find(t => t.id === themeId);
    if (found && dom.currentThemeLabel) {
      dom.currentThemeLabel.textContent = found.name;
    }
  }

  function renderThemeMenu() {
    if (!dom.themeMenu) return;
    dom.themeMenu.innerHTML = CCAFP_CONFIG.pmaThemes.map(theme => `
      <button class="w-full text-left px-3.5 py-2.5 flex items-center justify-between hover:bg-slate-800 transition-colors ${state.currentTheme === theme.id ? 'text-amber-400 font-bold' : 'text-slate-300'}" data-theme-id="${theme.id}">
        <div>
          <span class="block text-xs">${theme.name}</span>
          <span class="block text-[10px] text-slate-500 font-normal">${theme.desc}</span>
        </div>
        ${state.currentTheme === theme.id ? '<i data-lucide="check" class="w-3.5 h-3.5 text-amber-400"></i>' : ''}
      </button>
    `).join('');
    lucide.createIcons();
  }

  // --- Clock & Military PST Julian Time ---
  function updateClock() {
    const now = new Date();
    // Format to Philippine Standard Time (UTC+8)
    const options = {
      timeZone: 'Asia/Manila',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const timeStr = now.toLocaleTimeString('en-GB', options);
    const dateOptions = { timeZone: 'Asia/Manila', month: 'short', day: '2-digit', year: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', dateOptions).toUpperCase();

    if (dom.pstClock) {
      dom.pstClock.textContent = `PST ${timeStr}H • ${dateStr}`;
    }
  }

  // --- Navigation & Tabs ---
  window.navigateToTab = function(tabId) {
    state.currentTab = tabId;

    // Update Nav buttons
    dom.navTabs.forEach(btn => {
      const target = btn.getAttribute('data-tab');
      if (target === tabId) {
        btn.classList.add('active-nav', 'bg-amber-500/15', 'text-amber-400', 'border', 'border-amber-500/30');
        btn.classList.remove('text-slate-400');
      } else {
        btn.classList.remove('active-nav', 'bg-amber-500/15', 'text-amber-400', 'border', 'border-amber-500/30');
        btn.classList.add('text-slate-400');
      }
    });

    // Update Panes
    dom.tabPanes.forEach(pane => {
      if (pane.id === `view-${tabId}`) {
        pane.classList.remove('hidden');
      } else {
        pane.classList.add('hidden');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Top Council Slider ---
  function renderCouncilSlider() {
    if (!dom.councilSliderStrip) return;
    dom.councilSliderStrip.innerHTML = CCAFP_CONFIG.councils.map(council => {
      const isSensitive = council.sensitive;
      const isActive = council.id === state.activeCouncilId;
      return `
        <button data-council-select="${council.id}" class="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
          isActive 
            ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm' 
            : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
        }">
          <i data-lucide="${council.icon || 'shield'}" class="w-3.5 h-3.5 ${isSensitive ? 'text-red-400' : 'text-amber-400'}"></i>
          <span>${council.name}</span>
          ${isSensitive ? '<span class="text-[9px] px-1 py-0.2 rounded bg-red-950 text-red-300 border border-red-800 font-mono-tactical">REMINDER</span>' : ''}
        </button>
      `;
    }).join('');
    lucide.createIcons();
  }

  function selectCouncil(councilId) {
    state.activeCouncilId = councilId;
    renderCouncilSlider();
    renderActiveCouncilView();
    navigateToTab('councils');
  }

  // --- Active Council View Rendering ---
  async function renderActiveCouncilView() {
    const council = CCAFP_CONFIG.councils.find(c => c.id === state.activeCouncilId) || CCAFP_CONFIG.councils[0];

    // Meta details
    if (dom.activeCouncilCategory) dom.activeCouncilCategory.textContent = council.category.toUpperCase();
    if (dom.activeCouncilTitle) dom.activeCouncilTitle.textContent = council.title;
    if (dom.activeCouncilDesc) dom.activeCouncilDesc.textContent = council.description;

    // Sensitive Tag
    if (council.sensitive) {
      dom.activeCouncilSensitiveTag.classList.remove('hidden');
    } else {
      dom.activeCouncilSensitiveTag.classList.add('hidden');
    }

    // Announcements
    if (dom.councilAnnouncementsBox) {
      if (council.announcements && council.announcements.length > 0) {
        dom.councilAnnouncementsBox.classList.remove('hidden');
        dom.councilAnnouncementsBox.innerHTML = `
          <div class="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-mono-tactical text-[11px] mb-1">
            <i data-lucide="bell-ring" class="w-3.5 h-3.5"></i>
            <span>COUNCIL FLASH ANNOUNCEMENTS</span>
          </div>
          ${council.announcements.map(a => `<p class="text-slate-300 flex items-center gap-2"><span class="text-amber-500">•</span> ${a}</p>`).join('')}
        `;
      } else {
        dom.councilAnnouncementsBox.classList.add('hidden');
      }
    }

    // Setup source sheet buttons
    const sheetLink = syncManager.getLink(council.id);
    if (dom.openActiveSheetBtn) {
      if (sheetLink) {
        dom.openActiveSheetBtn.classList.remove('opacity-50', 'pointer-events-none');
        dom.openActiveSheetBtn.onclick = () => window.open(sheetLink, '_blank');
      } else {
        dom.openActiveSheetBtn.classList.add('opacity-50');
        dom.openActiveSheetBtn.onclick = () => showToast(`No external sheet linked yet for ${council.name}. Showing default dataset.`, 'info');
      }
    }

    if (dom.editActiveSheetLinkBtn) {
      dom.editActiveSheetLinkBtn.onclick = () => openConfigModal(council.id);
    }

    // Container: Sensitive Policy View OR Live Spreadsheet Table
    if (council.sensitive) {
      renderSensitiveCouncilView(council);
    } else {
      await renderOperationalCouncilTable(council);
    }

    lucide.createIcons();
  }

  // Render Sensitive Council Guidelines (GAD, S2, CCPB, Honor)
  function renderSensitiveCouncilView(council) {
    const reminders = council.reminders || [];
    dom.councilDynamicContainer.innerHTML = `
      <div class="space-y-6">
        
        <!-- Sensitive Mandate Notice Banner -->
        <div class="sensitive-badge rounded-2xl p-5 border border-red-700/60 bg-red-950/30 flex items-start gap-4">
          <div class="w-10 h-10 rounded-xl bg-red-900/50 border border-red-700/80 flex items-center justify-center text-red-300 flex-shrink-0 mt-0.5">
            <i data-lucide="shield-alert" class="w-5 h-5"></i>
          </div>
          <div class="space-y-1">
            <h4 class="font-heading font-bold text-base text-red-200">Sensitive Council Confidentiality Notice</h4>
            <p class="text-xs text-red-300/90 leading-relaxed">
              By mandate of Cadet Regulations and Academy Directives, work of the <strong>${council.title}</strong> is restricted from public roster disclosure. 
              Only official ethical tenets, security directives, standing orders, and reminders are published here for Corps compliance.
            </p>
          </div>
        </div>

        <!-- Reminders Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${reminders.map(item => `
            <div class="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-red-900/60 transition-all space-y-4">
              <div>
                <div class="flex items-center justify-between gap-2 mb-2">
                  <span class="text-[10px] font-mono-tactical px-2 py-0.5 rounded font-bold ${
                    item.priority === 'CRITICAL' ? 'bg-red-900/60 text-red-300 border border-red-700' :
                    item.priority === 'HIGH' ? 'bg-amber-900/60 text-amber-300 border border-amber-700' :
                    'bg-slate-800 text-slate-300'
                  }">${item.priority}</span>
                  <span class="text-[10px] font-mono-tactical text-slate-500">${item.date}</span>
                </div>
                <h5 class="font-bold text-sm text-slate-100">${item.title}</h5>
                <p class="text-xs text-slate-300 mt-2 leading-relaxed whitespace-pre-line">${item.text}</p>
              </div>

              <div class="pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono-tactical text-slate-500">
                <span>Authority: ${council.name}</span>
                <span class="text-red-400 font-semibold">MANDATORY</span>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  // Render Operational Council Table (Live Sheets or Defaults)
  async function renderOperationalCouncilTable(council) {
    const sheetLink = syncManager.getLink(council.id);
    let headers = council.defaultHeaders;
    let rows = council.defaultRows;
    let isLiveFromSheet = false;

    // Check if live data is available
    if (sheetLink) {
      if (state.liveCache[council.id]) {
        const cached = state.liveCache[council.id];
        if (cached && cached.length > 1) {
          headers = cached[0];
          rows = cached.slice(1);
          isLiveFromSheet = true;
        }
      } else {
        // Fetch on the fly
        const fetched = await syncManager.fetchLiveCSV(sheetLink);
        if (fetched && fetched.length > 1) {
          state.liveCache[council.id] = fetched;
          headers = fetched[0];
          rows = fetched.slice(1);
          isLiveFromSheet = true;
        }
      }
    }

    dom.councilDynamicContainer.innerHTML = `
      <div class="space-y-4">
        <!-- Table Toolbar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div class="flex items-center gap-3">
            <span class="text-xs font-mono-tactical px-2.5 py-1 rounded ${
              isLiveFromSheet 
                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800 flex items-center gap-1.5' 
                : 'bg-slate-800 text-slate-400'
            }">
              ${isLiveFromSheet ? '<span class="w-2 h-2 rounded-full bg-emerald-400 live-beacon"></span> LIVE FROM GOOGLE SHEETS' : 'SHOWING OFFICIAL BASELINE DATA'}
            </span>
            <span class="text-xs text-slate-500 font-mono-tactical">${rows.length} Records</span>
          </div>

          <div class="flex items-center gap-2">
            <input id="councilTableSearch" type="text" placeholder="Filter rows..." class="px-3 py-1.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 w-48">
            <button id="exportCouncilCSVBtn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5">
              <i data-lucide="download" class="w-3.5 h-3.5 text-amber-400"></i>
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <!-- Table View -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="font-mono-tactical text-slate-400 border-b border-slate-800 pb-2 uppercase tracking-wider">
                ${headers.map(h => `<th class="py-3 px-3">${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody id="councilTableRowsContainer" class="divide-y divide-slate-800/80 font-mono-tactical">
              ${rows.map(row => `
                <tr class="hover:bg-slate-800/40 transition-colors">
                  ${row.map((cell, idx) => `
                    <td class="py-3 px-3 ${idx === 0 ? 'font-sans font-semibold text-slate-200' : 'text-slate-300'}">${cell || '-'}</td>
                  `).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Filter input search listener
    const searchInput = document.getElementById('councilTableSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const trs = document.querySelectorAll('#councilTableRowsContainer tr');
        trs.forEach(tr => {
          const text = tr.textContent.toLowerCase();
          tr.style.display = text.includes(query) ? '' : 'none';
        });
      });
    }

    // Export CSV listener
    const exportBtn = document.getElementById('exportCouncilCSVBtn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${council.id}-data-${Date.now()}.csv`;
        link.click();
        showToast(`Exported ${council.name} data to CSV`, 'success');
      });
    }
  }

  // --- Daily Happenings & Routine Rendering ---
  function renderDailyRoutine() {
    if (!dom.dailyRoutineTimeline) return;
    dom.dailyRoutineTimeline.innerHTML = CCAFP_CONFIG.dailySchedule.map(item => `
      <div class="flex items-start sm:items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <span class="font-mono-tactical text-xs font-bold px-2 py-1 rounded bg-slate-800 text-amber-400 flex-shrink-0">${item.time}</span>
          <div class="truncate">
            <span class="font-semibold text-sm text-slate-100 block truncate">${item.event}</span>
            <span class="text-xs text-slate-400 block truncate font-mono-tactical">${item.venue}</span>
          </div>
        </div>
        <span class="text-[11px] font-mono-tactical px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 flex-shrink-0">
          ${item.uniform}
        </span>
      </div>
    `).join('');
  }

  // --- Calendar Events Rendering ---
  function renderCalendar() {
    if (!dom.calendarEventsGrid) return;
    const filtered = CCAFP_CONFIG.calendarEvents.filter(ev => {
      if (state.calendarFilter === 'all') return true;
      return ev.category.toLowerCase() === state.calendarFilter.toLowerCase();
    });

    if (filtered.length === 0) {
      dom.calendarEventsGrid.innerHTML = `
        <div class="col-span-full p-8 text-center text-slate-500">
          <i data-lucide="calendar-x" class="w-8 h-8 mx-auto mb-2 text-slate-600"></i>
          <p class="text-xs">No scheduled events match the selected category.</p>
        </div>
      `;
    } else {
      dom.calendarEventsGrid.innerHTML = filtered.map(ev => `
        <div class="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2 font-mono-tactical text-[11px]">
              <span class="px-2 py-0.5 rounded font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">${ev.category.toUpperCase()}</span>
              <span class="text-slate-400">${ev.date} &bull; ${ev.time}</span>
            </div>
            <h4 class="font-bold text-base text-slate-100">${ev.title}</h4>
            <p class="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-amber-500"></i>
              <span>${ev.location}</span>
            </p>
          </div>
          <div class="pt-3 border-t border-slate-900 flex items-center justify-between text-xs font-mono-tactical">
            <span class="text-slate-500">Uniform:</span>
            <span class="text-slate-300 font-semibold">${ev.dress}</span>
          </div>
        </div>
      `).join('');
    }
    lucide.createIcons();
  }

  // --- Punishment List Rendering ---
  function renderPunishments() {
    if (!dom.punishmentTableBody) return;
    const q = state.punishmentSearchQuery.toLowerCase();
    const filtered = CCAFP_CONFIG.punishmentList.filter(item => {
      const matchesCompany = state.punishmentFilterCompany === 'all' || item.company.toLowerCase() === state.punishmentFilterCompany.toLowerCase();
      const matchesQuery = item.cadetName.toLowerCase().includes(q) ||
                           item.serialNo.toLowerCase().includes(q) ||
                           item.offense.toLowerCase().includes(q);
      return matchesCompany && matchesQuery;
    });

    if (filtered.length === 0) {
      dom.punishmentTableBody.innerHTML = `
        <tr>
          <td colspan="9" class="p-8 text-center text-slate-500">
            No disciplinary records match your search filter.
          </td>
        </tr>
      `;
    } else {
      dom.punishmentTableBody.innerHTML = filtered.map(item => `
        <tr class="hover:bg-slate-800/40 transition-colors">
          <td class="py-3 px-3 font-sans font-semibold text-slate-200">${item.cadetName}</td>
          <td class="py-3 px-2 text-slate-400">${item.serialNo}</td>
          <td class="py-3 px-2 text-slate-300">${item.class}</td>
          <td class="py-3 px-2 text-amber-400 font-semibold">${item.company} Coy</td>
          <td class="py-3 px-3 text-slate-300">${item.offense}</td>
          <td class="py-3 px-2 text-center text-red-400 font-bold">${item.demerits}</td>
          <td class="py-3 px-2 text-center text-amber-400 font-bold">${item.tours}</td>
          <td class="py-3 px-2 text-center text-slate-400">${item.confinement} hrs</td>
          <td class="py-3 px-3">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
              item.status === 'Completed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
              item.status === 'Serving Tours' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
              'bg-blue-950 text-blue-400 border border-blue-800'
            }">${item.status}</span>
          </td>
        </tr>
      `).join('');
    }
  }

  // --- Staff Directory Rendering ---
  function renderStaffDirectory() {
    if (!dom.staffDisplayContainer) return;
    const level = state.staffLevel;

    if (level === 'regiment') {
      dom.staffDisplayContainer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${CCAFP_CONFIG.staffDirectory.regiment.map(s => `
            <div class="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/40 transition-all space-y-3">
              <div class="flex items-center justify-between text-xs font-mono-tactical text-slate-400">
                <span class="text-amber-400 font-bold">${s.company} Coy</span>
                <span>Class of ${s.class}</span>
              </div>
              <div>
                <h4 class="font-bold text-base text-slate-100">${s.name}</h4>
                <p class="text-xs text-amber-300/90 font-mono-tactical mt-0.5">${s.role}</p>
              </div>
              <div class="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono-tactical text-slate-500">
                <span>Insignia: ${s.badge}</span>
                <span class="text-emerald-400 font-semibold">Active Staff</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (level === 'battalion') {
      dom.staffDisplayContainer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${CCAFP_CONFIG.staffDirectory.battalion.map(b => `
            <div class="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div class="border-b border-slate-800 pb-3">
                <h4 class="font-heading font-bold text-base text-amber-400">${b.battalion}</h4>
              </div>
              <div class="space-y-3 text-xs">
                <div>
                  <span class="text-slate-500 block text-[11px] font-mono-tactical uppercase">Battalion Commander</span>
                  <span class="font-bold text-slate-200">${b.cmdr}</span>
                </div>
                <div>
                  <span class="text-slate-500 block text-[11px] font-mono-tactical uppercase">Battalion Executive Officer</span>
                  <span class="font-bold text-slate-200">${b.exo}</span>
                </div>
                <div>
                  <span class="text-slate-500 block text-[11px] font-mono-tactical uppercase">Battalion Adjutant</span>
                  <span class="font-bold text-slate-200">${b.adjutant}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (level === 'companies') {
      dom.staffDisplayContainer.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${CCAFP_CONFIG.staffDirectory.companies.map(c => `
            <div class="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-amber-500/40 transition-all">
              <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 class="font-bold text-sm text-amber-400">${c.name}</h4>
                <span class="text-[10px] font-mono-tactical text-slate-500">${c.tag}</span>
              </div>
              <div class="space-y-2 text-xs">
                <div>
                  <span class="text-slate-500 block text-[10px] font-mono-tactical uppercase">Company Commander</span>
                  <span class="font-semibold text-slate-200">${c.cmdr}</span>
                </div>
                <div>
                  <span class="text-slate-500 block text-[10px] font-mono-tactical uppercase">Company ExO</span>
                  <span class="font-semibold text-slate-200">${c.exo}</span>
                </div>
                <div>
                  <span class="text-slate-500 block text-[10px] font-mono-tactical uppercase">First Sergeant</span>
                  <span class="font-semibold text-slate-200">${c.firstSgt}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  // --- Google Sheets Live Sync Process ---
  async function performLiveSync() {
    if (state.isSyncing) return;
    state.isSyncing = true;

    if (dom.manualSyncBtn) {
      dom.manualSyncBtn.querySelector('i')?.classList.add('animate-spin');
    }
    if (dom.syncStatusBadge) {
      dom.syncStatusBadge.textContent = 'SYNCING...';
      dom.syncStatusBadge.className = 'text-amber-400 font-medium';
    }

    showToast('Fetching latest updates from Google Sheets...', 'info');

    let syncedCount = 0;
    // Iterate through councils and check if links exist
    for (const council of CCAFP_CONFIG.councils) {
      const link = syncManager.getLink(council.id);
      if (link && link.startsWith('http')) {
        const data = await syncManager.fetchLiveCSV(link);
        if (data && data.length > 0) {
          state.liveCache[council.id] = data;
          syncedCount++;
        }
      }
    }

    // Refresh active council view
    if (state.currentTab === 'councils') {
      renderActiveCouncilView();
    }

    state.isSyncing = false;
    if (dom.manualSyncBtn) {
      dom.manualSyncBtn.querySelector('i')?.classList.remove('animate-spin');
    }
    if (dom.syncStatusBadge) {
      dom.syncStatusBadge.textContent = 'SHEETS LIVE';
      dom.syncStatusBadge.className = 'text-emerald-400 font-medium';
    }

    if (syncedCount > 0) {
      showToast(`Synchronized ${syncedCount} councils live from Google Sheets!`, 'success');
    } else {
      showToast('Live sync completed. Official cadet records are up to date.', 'success');
    }
  }

  // --- Spreadsheet Configuration Modal ---
  function openConfigModal(preselectCouncilId = null) {
    if (!dom.configModal || !dom.sheetLinksInputsList) return;

    dom.sheetLinksInputsList.innerHTML = CCAFP_CONFIG.councils.map(c => {
      const currentVal = syncManager.getLink(c.id);
      const isSensitive = c.sensitive;
      return `
        <div class="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5 ${c.id === preselectCouncilId ? 'ring-2 ring-amber-500' : ''}">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-slate-200 flex items-center gap-1.5">
              <i data-lucide="${c.icon || 'shield'}" class="w-3.5 h-3.5 text-amber-400"></i>
              <span>${c.name} (${c.title})</span>
            </span>
            ${isSensitive ? '<span class="text-[10px] font-mono-tactical px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 font-bold">SENSITIVE REMINDERS</span>' : '<span class="text-[10px] font-mono-tactical text-slate-500">PUBLIC DATA</span>'}
          </div>
          <input type="url" data-config-key="${c.id}" value="${currentVal}" placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv" class="w-full px-3 py-2 text-xs font-mono-tactical rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500">
        </div>
      `;
    }).join('');

    lucide.createIcons();
    dom.configModal.classList.remove('hidden');
  }

  function closeConfigModal() {
    if (dom.configModal) dom.configModal.classList.add('hidden');
  }

  function saveConfigModal() {
    const inputs = dom.sheetLinksInputsList.querySelectorAll('input[data-config-key]');
    const newLinks = {};
    inputs.forEach(input => {
      const key = input.getAttribute('data-config-key');
      newLinks[key] = input.value.trim();
    });
    syncManager.saveLinks(newLinks);
    closeConfigModal();
    showToast('Saved Google Sheet links! Synchronizing now...', 'success');
    performLiveSync();
  }

  function resetConfigModal() {
    if (confirm('Reset all council spreadsheet links to standard default data?')) {
      localStorage.removeItem(syncManager.storageKey);
      syncManager.links = syncManager.loadLinks();
      state.liveCache = {};
      closeConfigModal();
      showToast('Reset to official default cadet data', 'info');
      renderActiveCouncilView();
    }
  }

  // --- Toast Notifications ---
  function showToast(message, type = 'info') {
    if (!dom.toastContainer) return;
    const toast = document.createElement('div');
    const borderClasses = {
      info: 'border-amber-500 bg-slate-900 text-slate-100',
      success: 'border-emerald-500 bg-slate-900 text-slate-100',
      error: 'border-red-500 bg-slate-900 text-slate-100'
    };
    const iconName = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-triangle' : 'info';

    toast.className = `flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xl text-xs font-semibold ${borderClasses[type] || borderClasses.info} pointer-events-auto transition-all transform duration-300`;
    toast.innerHTML = `
      <i data-lucide="${iconName}" class="w-4 h-4 text-amber-400 flex-shrink-0"></i>
      <span class="flex-1">${message}</span>
    `;

    dom.toastContainer.appendChild(toast);
    lucide.createIcons({ root: toast });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // --- Event Listeners Setup ---
  function setupEventListeners() {
    // Theme Dropdown Toggle
    if (dom.themeDropdownBtn && dom.themeMenu) {
      dom.themeDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dom.themeMenu.classList.toggle('hidden');
      });
      document.addEventListener('click', () => {
        dom.themeMenu.classList.add('hidden');
      });
      dom.themeMenu.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-theme-id]');
        if (btn) {
          const themeId = btn.getAttribute('data-theme-id');
          applyTheme(themeId);
          renderThemeMenu();
          showToast(`Applied ${themeId.replace('pma-', '').toUpperCase()} theme`, 'info');
        }
      });
    }

    // Nav Tabs
    dom.navTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        if (tab) navigateToTab(tab);
      });
    });

    // Council Slider Scroll Buttons
    if (dom.scrollCouncilLeft && dom.councilSliderStrip) {
      dom.scrollCouncilLeft.addEventListener('click', () => {
        dom.councilSliderStrip.scrollBy({ left: -220, behavior: 'smooth' });
      });
    }
    if (dom.scrollCouncilRight && dom.councilSliderStrip) {
      dom.scrollCouncilRight.addEventListener('click', () => {
        dom.councilSliderStrip.scrollBy({ left: 220, behavior: 'smooth' });
      });
    }

    // Council Slider Selection
    document.addEventListener('click', (e) => {
      const selectBtn = e.target.closest('[data-council-select]');
      if (selectBtn) {
        const councilId = selectBtn.getAttribute('data-council-select');
        selectCouncil(councilId);
      }
    });

    // Calendar Filters
    dom.calFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        dom.calFilters.forEach(b => {
          b.classList.remove('active-filter', 'bg-amber-500/15', 'text-amber-300', 'border', 'border-amber-500/30');
          b.classList.add('text-slate-400');
        });
        btn.classList.add('active-filter', 'bg-amber-500/15', 'text-amber-300', 'border', 'border-amber-500/30');
        btn.classList.remove('text-slate-400');
        state.calendarFilter = btn.getAttribute('data-category');
        renderCalendar();
      });
    });

    // Punishment Search & Filter
    if (dom.punishmentSearchInput) {
      dom.punishmentSearchInput.addEventListener('input', (e) => {
        state.punishmentSearchQuery = e.target.value;
        renderPunishments();
      });
    }
    if (dom.punishmentCompanyFilter) {
      dom.punishmentCompanyFilter.addEventListener('change', (e) => {
        state.punishmentFilterCompany = e.target.value;
        renderPunishments();
      });
    }

    // Staff Level Tabs
    dom.staffTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        dom.staffTabs.forEach(b => {
          b.classList.remove('active-filter', 'bg-amber-500/15', 'text-amber-300', 'border', 'border-amber-500/30');
          b.classList.add('text-slate-400');
        });
        btn.classList.add('active-filter', 'bg-amber-500/15', 'text-amber-300', 'border', 'border-amber-500/30');
        btn.classList.remove('text-slate-400');
        state.staffLevel = btn.getAttribute('data-level');
        renderStaffDirectory();
      });
    });

    // Manual Sync Button
    if (dom.manualSyncBtn) {
      dom.manualSyncBtn.addEventListener('click', performLiveSync);
    }

    // Modal Triggers
    if (dom.openConfigBtn) dom.openConfigBtn.addEventListener('click', () => openConfigModal());
    if (dom.closeConfigBtn) dom.closeConfigBtn.addEventListener('click', closeConfigModal);
    if (dom.cancelConfigBtn) dom.cancelConfigBtn.addEventListener('click', closeConfigModal);
    if (dom.saveConfigBtn) dom.saveConfigBtn.addEventListener('click', saveConfigModal);
    if (dom.resetLinksBtn) dom.resetLinksBtn.addEventListener('click', resetConfigModal);
  }

  // --- Bootstrap Init ---
  function init() {
    initTheme();
    updateClock();
    setInterval(updateClock, 1000);

    renderCouncilSlider();
    renderDailyRoutine();
    renderCalendar();
    renderPunishments();
    renderStaffDirectory();
    renderActiveCouncilView();
    setupEventListeners();

    // Auto-polling live sync every 45 seconds (similar to alfacoy.com)
    setInterval(() => {
      performLiveSync();
    }, 45000);

    lucide.createIcons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
