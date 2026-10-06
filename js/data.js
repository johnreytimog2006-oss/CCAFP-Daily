// CCAFP Daily - Master Data Store & Alfacoy-Style Bulletin Engine

/**
 * =========================================================================
 * 📋 GOOGLE SPREADSHEET LIVE DATA SOURCES (CONFIGURED DIRECTLY VIA CODE)
 * =========================================================================
 */
const COUNCIL_SHEET_URLS = {
  // S1 Personnel Google Sheet (Configured from provided link)
  s1: "https://docs.google.com/spreadsheets/d/1D2Mawvphp9UsY9NC8boG46FlksDkjXzLEf5c8afm-xI/export?format=csv&gid=1901671722",
  s1_raw: "https://docs.google.com/spreadsheets/d/1D2Mawvphp9UsY9NC8boG46FlksDkjXzLEf5c8afm-xI/edit?gid=1901671722#gid=1901671722",

  s2: "",          // Sensitive - Security Reminders Only
  s3: "",
  s4: "",
  s5: "",
  s6: "",
  s7: "",
  s8: "",
  s10: "",
  athletic: "",
  academic: "",
  mto: "",
  exo: "",
  mess: "",
  spiritual: "",
  safety: "",
  gad: "",         // Sensitive - Gender Guidelines Only
  ccpb: "",        // Sensitive - Conduct Policies Only
  honor: "",       // Sensitive - Sacred Honor Code Tenets Only
  punishments: "",
  calendar: ""
};

const CCAFP_CONFIG = {
  version: "2.6.0",
  lastUpdated: "10:17:55 PM",

  // Priority Bulletins (Exact layout matching Alfacoy)
  priorityBulletins: [
    {
      id: 1,
      title: "COURSE & PEER EVALUATION",
      date: "2026-10-05",
      badge1: "URGENT",
      badge2: "PRIORITY",
      stripe: "stripe-red",
      content: "All cadets will complete their COURSE AND FACULTY EVALUATION as well as the PEER-TO-PEER rating in their respective CIS portal accounts. Likewise, the deadline is 04 Oct 2359H.",
      author: "ALL COUNCIL",
      reactions: { heart: 8, zap: 4 }
    },
    {
      id: 2,
      title: "AMMUNITION MAGAZINE TURN-IN",
      date: "2026-10-04",
      badge1: "IMPORTANT",
      badge2: "PRIORITY",
      stripe: "stripe-amber",
      content: "ALL CADETS WITH UNISSUED OR DEFECTIVE MAGAZINES WILL WITHDRAW THE SAME TO THE HTG ARMORY AS SOON AS POSSIBLE, LIKEWISE THEY WILL RENDER PROPER INVENTORY ACCOUNTABILITY.",
      author: "S4 LOGISTICS",
      reactions: { heart: 5, zap: 2 }
    },
    {
      id: 3,
      title: "MONTHLY CADET CORPS WELFARE FUND",
      date: "2026-10-01",
      badge1: "IMPORTANT",
      badge2: "PRIORITY",
      stripe: "stripe-amber",
      content: "Summary statement of Corps Welfare dues and mess rebates for the current cycle is now posted for company review. Inquiries must be logged through your respective Company Treasurers.",
      author: "S10 FINANCE",
      reactions: { heart: 12, zap: 6 }
    },
    {
      id: 4,
      title: "UNIFORM INSPECTION: GALA DRESS RETREAT",
      date: "2026-10-06",
      badge1: "URGENT",
      badge2: "PRIORITY",
      stripe: "stripe-red",
      content: "Full Gala Dress inspection at 1615H prior to the 1700H Retreat Ceremony on Borromeo Field. White gloves and saber scabbard shined to mirror finish.",
      author: "EXO COUNCIL",
      reactions: { heart: 14, zap: 9 }
    },
    {
      id: 5,
      title: "SMARTPHONE RACK LOCKER AUDIT",
      date: "2026-10-03",
      badge1: "IMPORTANT",
      badge2: "POLICY",
      stripe: "stripe-blue",
      content: "Authorized evening access window is 1930H - 2130H for 1CL and 2CL cadets. First Sergeants must secure all padlocks with two-signature logbook entries by 2200H.",
      author: "S6 CEIS / SIGNAL",
      reactions: { heart: 9, zap: 3 }
    },
    {
      id: 6,
      title: "INTER-BATTALION ATHLETIC TOURNAMENT",
      date: "2026-09-28",
      badge1: "IMPORTANT",
      badge2: "PRIORITY",
      stripe: "stripe-emerald",
      content: "Opening matches for Inter-Company Basketball and Volleyball scheduled this weekend at Gym 1 and Gym 2. Complete athletic rosters submitted to Athletic Officer.",
      author: "ATHLETIC COUNCIL",
      reactions: { heart: 18, zap: 7 }
    }
  ],

  // S1 Council Sub-Pages & Authentic Military Data Models
  s1Data: {
    // 1. Strength Summary by Company & Gender
    strengthSummary: [
      { company: "Alpha (Alfa)", firstCL_M: 32, firstCL_F: 10, secondCL_M: 34, secondCL_F: 9, thirdCL_M: 38, thirdCL_F: 11, fourthCL_M: 40, fourthCL_F: 12, total: 186 },
      { company: "Bravo", firstCL_M: 30, firstCL_F: 9, secondCL_M: 33, secondCL_F: 10, thirdCL_M: 36, thirdCL_F: 10, fourthCL_M: 39, fourthCL_F: 11, total: 178 },
      { company: "Charlie", firstCL_M: 31, firstCL_F: 11, secondCL_M: 32, secondCL_F: 8, thirdCL_M: 35, thirdCL_F: 9, fourthCL_M: 41, fourthCL_F: 13, total: 180 },
      { company: "Delta", firstCL_M: 29, firstCL_F: 10, secondCL_M: 35, secondCL_F: 11, thirdCL_M: 37, thirdCL_F: 10, fourthCL_M: 38, fourthCL_F: 10, total: 180 },
      { company: "Echo", firstCL_M: 33, firstCL_F: 8, secondCL_M: 31, secondCL_F: 9, thirdCL_M: 36, thirdCL_F: 12, fourthCL_M: 40, fourthCL_F: 12, total: 181 },
      { company: "Foxtrot", firstCL_M: 30, firstCL_F: 10, secondCL_M: 34, secondCL_F: 8, thirdCL_M: 34, thirdCL_F: 11, fourthCL_M: 39, fourthCL_F: 11, total: 177 },
      { company: "Golf", firstCL_M: 28, firstCL_F: 9, secondCL_M: 32, secondCL_F: 10, thirdCL_M: 35, thirdCL_F: 9, fourthCL_M: 38, fourthCL_F: 12, total: 173 },
      { company: "Hawk", firstCL_M: 31, firstCL_F: 10, secondCL_M: 33, secondCL_F: 9, thirdCL_M: 36, thirdCL_F: 10, fourthCL_M: 41, fourthCL_F: 11, total: 181 }
    ],

    // 2. Cadet Personnel Master Roster
    roster: [
      { name: "Cdt 1CL Mangagom, Jhoprilyn S.", classYr: "2027 (1CL)", branch: "PA (Army)", company: "Delta", status: "Present for Duty", designation: "Regimental Personnel Staff" },
      { name: "Cdt 1CL Plantar, Christian M.", classYr: "2027 (1CL)", branch: "PAF (Air Force)", company: "Hawk", status: "Present for Duty", designation: "First Sergeant" },
      { name: "Cdt 1CL Dela Cruz, Joshua M.", classYr: "2027 (1CL)", branch: "PA (Army)", company: "Alpha", status: "Present for Duty", designation: "Regimental Adjutant (S1)" },
      { name: "Cdt 2CL Santos, Michael R.", classYr: "2028 (2CL)", branch: "PN (Navy)", company: "Bravo", status: "Station Hospital", designation: "Platoon Guide" },
      { name: "Cdt 2CL Ramos, Angela B.", classYr: "2028 (2CL)", branch: "PAF (Air Force)", company: "Charlie", status: "Present for Duty", designation: "Corps Duty Medic" },
      { name: "Cdt 3CL Reyes, Rodrigo P.", classYr: "2029 (3CL)", branch: "PA (Army)", company: "Echo", status: "Present for Duty", designation: "Squad Leader" },
      { name: "Cdt 3CL Tan, David C.", classYr: "2029 (3CL)", branch: "PN (Navy)", company: "Foxtrot", status: "Authorized Leave", designation: "Cadet Clerk" },
      { name: "Cdt 4CL Aquino, Rafael S.", classYr: "2030 (4CL)", branch: "PA (Army)", company: "Golf", status: "Present for Duty", designation: "New Cadet" },
      { name: "Cdt 4CL Cruz, Vincent L.", classYr: "2030 (4CL)", branch: "PAF (Air Force)", company: "Alpha", status: "Present for Duty", designation: "New Cadet" }
    ],

    // 3. Staff for Personnel (S1 NCOs & Officers)
    staff: [
      { role: "Regimental Adjutant (S1 Officer)", name: "Cdt 1CL Dela Cruz, Joshua M.", company: "Alpha Coy", task: "Direct oversight of all cadet strength records, leaves, promotions, and morning rolls." },
      { role: "Regimental Personnel NCO", name: "Cdt 1CL Mangagom, Jhoprilyn S.", company: "Delta Coy", task: "Maintenance of the Master Cadet Information Sheets 2026-2027 and daily roll accountability." },
      { role: "Regimental Cadet Acquisition NCO", name: "Cdt 2CL Valdez, Martin P.", company: "Bravo Coy", task: "Coordination with Admissions and Reception of New Cadet Battalion." },
      { role: "Regimental Cadet Equipment NCO", name: "Cdt 2CL Soriano, Kevin S.", company: "Charlie Coy", task: "Accountability of personnel desk equipment, forms, and digital logbooks." }
    ],

    // 4. Cadets Not Included in Effective Strength (Hospital, Leaves, DS)
    nonEffective: [
      { name: "Cdt 2CL Santos, Michael R.", serial: "2028-0092", company: "Bravo", status: "Station Hospital", reason: "Orthopedic observation (Ankle sprain during PT)", authorizedBy: "Academy Surgeon" },
      { name: "Cdt 3CL Tan, David C.", serial: "2029-0112", company: "Foxtrot", status: "Authorized Emergency Leave", reason: "Family bereavement leave (Returns Friday 1800H)", authorizedBy: "Commandant of Cadets" },
      { name: "Cdt 1CL Pimentel, Daniel G.", serial: "2027-0034", company: "Echo", status: "Detached Service (DS)", reason: "AFP General Headquarters Liaison Detail (Manila)", authorizedBy: "Superintendent, PMA" }
    ]
  },

  // 18 Councils Structure
  councils: [
    {
      id: "s1",
      name: "S1 Personnel",
      title: "S1 - Personnel & Administration",
      icon: "users",
      category: "Staff Councils",
      sensitive: false,
      sheetUrl: COUNCIL_SHEET_URLS.s1,
      sheetRaw: COUNCIL_SHEET_URLS.s1_raw,
      description: "Cadet strength accountability, leaves, passes, records, and promotions."
    },
    {
      id: "s2",
      name: "S2 Security",
      title: "S2 - Security & Intelligence",
      icon: "shield-alert",
      category: "Sensitive Councils",
      sensitive: true,
      description: "RESTRICTED ACCESS: Standing Security Orders, Operational Security (OPSEC), and Counter-Intelligence Reminders only.",
      reminders: [
        {
          title: "STRICT OPSEC DIRECTIVE: Social Media Protocol",
          date: "Active Standing Order",
          priority: "CRITICAL",
          text: "No cadet shall photograph, video, or upload restricted areas (Armory, Command Posts, Ops Rooms, Quarters) to any social platform. Violation carries 15 demerits and 10 tours of duty."
        },
        {
          title: "Physical Identification & Gate Pass Vigilance",
          date: "Daily Standing Order",
          priority: "HIGH",
          text: "All cadets on gate duty must demand two-factor verification for unescorted visitors entering Fort Del Pilar. Report unmanifested vehicles immediately to SOC/OD."
        }
      ]
    },
    {
      id: "s3",
      name: "S3 Operations",
      title: "S3 - Operations & Training",
      icon: "crosshair",
      category: "Staff Councils",
      sensitive: false,
      description: "Corps operations, daily routine execution, training syllabi, and tactical maneuvers.",
      defaultHeaders: ["Time (H)", "Activity", "Location", "Uniform", "OIC"],
      defaultRows: [
        ["0500H", "Reveille & Morning PT", "Borromeo Field", "PT Uniform", "S3 Training Cadre"],
        ["0630H", "Morning Mess", "Cadet Mess Hall", "Working Uniform", "Duty Mess Officer"],
        ["0730H", "Parade Inspection & Colors", "Melchor Hall Steps", "Dress White / Gala", "Regimental Adjutant"],
        ["0800-1200H", "Academic Sessions", "Academic Classrooms", "Study Uniform", "Dean of Academics"],
        ["1300-1630H", "Field Tactical Training", "Tactics Area Alpha", "BDU / Field Gear", "S3 Tactics Instructor"],
        ["1700H", "Retreat & Lowering of Colors", "Borromeo Field", "Gala Dress", "Corps Staff"],
        ["1930-2130H", "Call to Quarters (CQ Study)", "Cadet Barracks", "Casual Study", "Barracks Proctor"]
      ]
    },
    {
      id: "s4",
      name: "S4 Logistics",
      title: "S4 - Logistics & Supply",
      icon: "package",
      category: "Staff Councils",
      sensitive: false,
      description: "Uniform requisitions, equipment supply, armory accountability, and barracks facilities.",
      defaultHeaders: ["Item Category", "Batch / Unit", "Status", "Collection Date", "Depot Location"],
      defaultRows: [
        ["White Duck Trouser Re-tailoring", "Class 2029", "Ready for Fitting", "Today 1600-1800H", "Academy Tailor Shop"],
        ["Parade Saber Sheaths", "Alpha & Bravo", "Inspection Completed", "Tomorrow 0800H", "Quartermaster Depot"],
        ["Field Rations (MRE)", "Battalion 1", "Staged for Exercise", "Friday 0500H", "S4 Supply Depot"]
      ]
    },
    {
      id: "s5",
      name: "S5 Plans & Programs",
      title: "S5 - Plans & Programs",
      icon: "bar-chart-2",
      category: "Staff Councils",
      sensitive: false,
      description: "Long-term calendar scheduling, strategic corps projects, and institutional milestones.",
      defaultHeaders: ["Project / Milestone", "Target Date", "Phase", "Lead Officer", "Status"],
      defaultRows: [
        ["PMA Alumni Homecoming Prep", "Feb 2027", "Phase II - Coordination", "Cdt 1CL Pimentel", "On Schedule"],
        ["Corps Leadership Symposium", "Nov 15, 2026", "Phase I - Speaker Invites", "Cdt 1CL Villanueva", "Approved"]
      ]
    },
    {
      id: "s6",
      name: "S6 Signal",
      title: "S6 - CEIS / Signal",
      icon: "radio",
      category: "Staff Councils",
      sensitive: false,
      badgeCount: 1,
      description: "Public address systems, Wi-Fi networks, frequencies, and smartphone rack protocols.",
      defaultHeaders: ["System / Device", "Company", "Operating Status", "Bandwidth / Channel", "Duty OIC"],
      defaultRows: [
        ["Regimental PA System", "Corps Wide", "Fully Operational", "Main Feed / Aux 1", "Cdt 2CL Soriano"],
        ["Smartphone Rack Access", "1CL Cadets", "Authorized 1900-2130H", "Rack Lockers A-D", "First Sergeants"],
        ["Tactical Radio Network (VHF)", "Training Area", "Standby / Tested", "Channel 4 Echo", "S6 Signals Cadre"]
      ]
    },
    {
      id: "s7",
      name: "S7 Civil-Military",
      title: "S7 - Civil-Military Operations (CMO)",
      icon: "megaphone",
      category: "Staff Councils",
      sensitive: false,
      description: "Public engagement, civic action programs, community relations, and visiting delegations.",
      defaultHeaders: ["Activity / Event", "Partner Agency", "Date", "Delegation Size", "Coordinator"],
      defaultRows: [
        ["Baguio City Youth Leadership Visit", "DepEd CAR", "Saturday 1000H", "45 Cadets", "Cdt 1CL Alcantara"],
        ["Blood Donation Drive", "Philippine Red Cross", "Next Month", "All Companies", "Cdt 2CL Fernandez"]
      ]
    },
    {
      id: "s8",
      name: "S8 Training",
      title: "S8 - Education & Tactics Training",
      icon: "book-open",
      category: "Staff Councils",
      sensitive: false,
      description: "Tactical training curricula, leadership doctrines, mentoring sessions, and field manuals.",
      defaultHeaders: ["Module / Subject", "Class", "Instructor Cadre", "Training Ground", "Passing Benchmark"],
      defaultRows: [
        ["Small Unit Tactics (SUT)", "Class 2028 (2CL)", "Tactics Department", "Hill 102", "85% Tactical Eval"],
        ["Navigation & Map Reading", "Class 2030 (4CL)", "S8 Senior Mentors", "Camp Grounds", "Field Exercise"]
      ]
    },
    {
      id: "s10",
      name: "S10 Finance",
      title: "S10 - Finance & Accounts",
      icon: "credit-card",
      category: "Staff Councils",
      sensitive: false,
      description: "Corps fund management, mess allowances, savings disbursements, and financial transparency.",
      defaultHeaders: ["Account / Fund", "Disbursement Item", "Allocated (PHP)", "Current Balance", "Audit Status"],
      defaultRows: [
        ["Cadet Welfare Fund", "Gym Equipment Upgrade", "₱45,000.00", "₱312,400.00", "Audited & Certified"],
        ["Mess Rebate Account", "Special Banquet Allocation", "₱28,500.00", "₱88,900.00", "Verified"]
      ]
    },
    {
      id: "athletic",
      name: "Athletic Council",
      title: "Cadet Athletic Council",
      icon: "trophy",
      category: "Specialist Councils",
      sensitive: false,
      description: "Physical fitness standards, intramural sports leagues, obstacle course conditioning, and gym oversight.",
      defaultHeaders: ["Sport / Discipline", "Matchup", "Time & Venue", "Referee / Marshal", "Standings"],
      defaultRows: [
        ["Intramural Basketball", "Alpha vs Charlie", "Today 1630H @ Gym 1", "Cdt 1CL Miranda", "Alpha 2-0 / Charlie 1-1"],
        ["Inter-Company Volleyball", "Bravo vs Delta", "Today 1700H @ Gym 2", "Cdt 2CL Bautista", "Bravo 3-0 / Delta 0-2"]
      ]
    },
    {
      id: "academic",
      name: "Academic Council",
      title: "Cadet Academic Council",
      icon: "graduation-cap",
      category: "Specialist Councils",
      sensitive: false,
      description: "Grade monitorship, study hall enforcement, Dean's List incentives, and academic peer support.",
      defaultHeaders: ["Subject / Course", "Target Class", "Review Schedule", "Room", "Lead Mentor"],
      defaultRows: [
        ["Advanced Engineering Mathematics", "Class 2028", "Mon/Wed 1930-2100H", "Room 204", "Cdt 1CL Sy (Dean's List)"],
        ["Physics for Military Engineers", "Class 2029", "Tue/Thu 1930-2100H", "Room 301", "Cdt 2CL Ramos"]
      ]
    },
    {
      id: "mto",
      name: "MTO Council",
      title: "MTO Council (Transport)",
      icon: "truck",
      category: "Specialist Councils",
      sensitive: false,
      description: "Military vehicle dispatch, shuttle convoys, baggage trucks, and mobility operations.",
      defaultHeaders: ["Vehicle / Unit", "Destination", "Departure Time", "Passenger Quota", "Driver / Marshall"],
      defaultRows: [
        ["Military Bus 04", "Baguio City Center (Liberty)", "Saturday 1300H", "45 Pax", "MTO Duty Driver"],
        ["Supply Truck 02", "Sub-Depot Benguet", "Friday 0800H", "Cargo Only", "Cdt 2CL Valdez (Marshall)"]
      ]
    },
    {
      id: "exo",
      name: "EXO Council",
      title: "Executive Officers Council (EXO)",
      icon: "briefcase",
      category: "Specialist Councils",
      sensitive: false,
      description: "Inter-company administrative synchronization, barracks inspections, and command duty coordination.",
      defaultHeaders: ["Inspection / Roster", "Inspecting Unit", "Standard", "Score Average", "Action Required"],
      defaultRows: [
        ["General Barracks Saturday Inspection", "All Companies", "Beds, Lockers, Polished Brass", "94.2%", "Minor Corrections (Charlie)"],
        ["Uniform & Saber Serviceability", "Battalion 1 & 2", "Gala Dress Check", "97.5%", "Approved for Parade"]
      ]
    },
    {
      id: "mess",
      name: "Mess Council",
      title: "Cadet Mess Council",
      icon: "utensils",
      category: "Specialist Councils",
      sensitive: false,
      description: "Cadet nutrition, daily menu rotation, table etiquette enforcement, and special dietary provisions.",
      defaultHeaders: ["Meal", "Main Course", "Sides & Vegetables", "Dessert / Beverage", "Diet Alternative"],
      defaultRows: [
        ["Breakfast (0630H)", "Beef Tapa & Scrambled Eggs", "Garlic Rice & Sliced Tomatoes", "Hot Chocolate / Coffee", "Fish Fillet & Eggs"],
        ["Lunch (1200H)", "Pork Sinigang sa Sampaloc", "Steamed Kangkong & Rice", "Ripe Mangoes & Iced Tea", "Chicken Tinola"],
        ["Supper (1830H)", "Roast Chicken with Rosemary Gravy", "Buttered Corn & Mashed Potatoes", "Fruit Salad & Water", "Vegetarian Stir-fry"]
      ]
    },
    {
      id: "spiritual",
      name: "Spiritual Council",
      title: "Spiritual Development Council",
      icon: "heart",
      category: "Specialist Councils",
      sensitive: false,
      description: "Moral and spiritual nourishment, chapel services, inter-faith programs, and retreats.",
      defaultHeaders: ["Faith / Denomination", "Service / Gathering", "Time & Day", "Venue", "Officiating Leader"],
      defaultRows: [
        ["Roman Catholic", "Sunday Holy Eucharist Mass", "Sunday 0700H & 1800H", "St. Ignatius Chapel", "Military Chaplain"],
        ["Evangelical Christian", "Cadet Fellowship & Worship", "Sunday 0900H", "Cadet Protestant Chapel", "Chaplain Pastor"],
        ["Islamic Faith", "Jum'ah Congregational Prayer", "Friday 1230H", "CCAFP Musalla / Prayer Room", "Cadet Imam"]
      ]
    },
    {
      id: "safety",
      name: "Safety Council",
      title: "Cadet Safety Council",
      icon: "shield",
      category: "Specialist Councils",
      sensitive: false,
      description: "Health and injury prevention, heat flag conditions, fire drills, and risk management.",
      defaultHeaders: ["Safety Metric", "Current Parameter", "Level", "Standing Protocol", "Hotline / Duty"],
      defaultRows: [
        ["WBGT Heat Condition", "24.2°C (WBGT Index)", "Green Flag", "Normal PT & Drill Permitted", "Station Medic"],
        ["Barracks Fire Readiness", "All Extinguishers Checked", "Green / Operational", "Clear Fire Escape Paths", "Safety Marshal"]
      ]
    },
    {
      id: "gad",
      name: "GAD Council",
      title: "Gender Awareness & Development (GAD)",
      icon: "users",
      category: "Sensitive Councils",
      sensitive: true,
      description: "RESTRICTED ACCESS: Gender Equality Guidelines, Respectful Professional Conduct, and Anti-Harassment Directives only.",
      reminders: [
        {
          title: "Zero Tolerance on Gender Bias & Harassment",
          date: "Mandatory Standing Order",
          priority: "CRITICAL",
          text: "The Cadet Corps observes absolute gender equality and respect. Any remark, gesture, or act demeaning to any gender will be dealt with under the strictest articles of the Cadet Regulations."
        }
      ]
    },
    {
      id: "ccpb",
      name: "CCPB Board",
      title: "Cadet Conduct Policy Board (CCPB)",
      icon: "scale",
      category: "Sensitive Councils",
      sensitive: true,
      description: "RESTRICTED ACCESS: Cadet Conduct Directives, Disciplinary Standards, and Due Process Policies only.",
      reminders: [
        {
          title: "Integrity in Reporting & Demerit Recording",
          date: "Procedural Directive",
          priority: "CRITICAL",
          text: "All reported delinquencies must be factual, accurate, and submitted within 24 hours of occurrence. False or malicious reporting is an Honor Code offense."
        }
      ]
    },
    {
      id: "honor",
      name: "Honor Committee",
      title: "The Cadet Honor Committee",
      icon: "award",
      category: "Sensitive Councils",
      sensitive: true,
      description: "RESTRICTED ACCESS: The Sacred Cadet Honor Code & System Tenets, Moral Integrity Reminders, and Ethical Guidelines only.",
      reminders: [
        {
          title: "THE HONOR CODE OF THE CADET CORPS",
          date: "Sacred Tenet",
          priority: "CRITICAL",
          text: "\"WE, THE CADETS, DO NOT LIE, CHEAT, STEAL, NOR TOLERATE AMONG US THOSE WHO DO.\"\n\nThis is not a rule to be enforced by threat of punishment; it is an unwritten covenant lived by every cadet."
        }
      ]
    }
  ],

  // Daily Schedule
  dailySchedule: [
    { time: "0500H", event: "Reveille & Morning PT", venue: "Borromeo Field", uniform: "PT Gear" },
    { time: "0630H", event: "Breakfast Mess", venue: "Cadet Mess Hall", uniform: "Working Uniform" },
    { time: "0730H", event: "Morning Colors & Inspection", venue: "Melchor Hall Steps", uniform: "Dress White / Gala" },
    { time: "0800H", event: "Academic & Technical Classes", venue: "Melchor & Academic Halls", uniform: "Study Uniform" },
    { time: "1200H", event: "Lunch Mess", venue: "Cadet Mess Hall", uniform: "Study Uniform" },
    { time: "1300H", event: "Military Tactics & Drill Practice", venue: "Borromeo & Training Grounds", uniform: "BDU / Field Gear" },
    { time: "1700H", event: "Retreat & Lowering of Colors", venue: "Borromeo Field", uniform: "Gala Dress" },
    { time: "1830H", event: "Evening Supper Mess", venue: "Cadet Mess Hall", uniform: "Dress Uniform" },
    { time: "1930H", event: "Call to Quarters (CQ Study)", venue: "Company Barracks", uniform: "Barracks Uniform" },
    { time: "2200H", event: "Taps & Lights Out", venue: "All Barracks", uniform: "Sleeping Garments" }
  ],

  // Punishments List
  punishmentList: [
    { id: 1, cadetName: "Cdt 4CL Santos, A. M.", serialNo: "2030-0142", class: "2030 (4CL)", company: "Alpha", offense: "Late for 0730H Colors Formation", demerits: 6, tours: 4, status: "Serving Tours" },
    { id: 2, cadetName: "Cdt 3CL Ramirez, J. P.", serialNo: "2029-0089", class: "2029 (3CL)", company: "Bravo", offense: "Unpolished Saber Scabbard during Inspection", demerits: 4, tours: 2, status: "Serving Tours" },
    { id: 3, cadetName: "Cdt 2CL Mendoza, L. K.", serialNo: "2028-0054", class: "2028 (2CL)", company: "Charlie", offense: "Unscheduled Smartphone Possession after 2200H", demerits: 10, tours: 8, status: "Appealed / Review" },
    { id: 4, cadetName: "Cdt 4CL Aquino, R. S.", serialNo: "2030-0211", class: "2030 (4CL)", company: "Delta", offense: "Improper Gig Line Alignment during Parade", demerits: 3, tours: 2, status: "Completed" }
  ],

  // Staff Directory
  staffDirectory: {
    regiment: [
      { role: "Regimental Commander (Brigade Cmdr)", name: "Cdt 1CL Villanueva, Marcus R.", class: "2027", company: "Alpha", badge: "Brigade Eagle" },
      { role: "Regimental Executive Officer (ExO)", name: "Cdt 1CL Del Rosario, Brian P.", class: "2027", company: "Bravo", badge: "ExO Saber" },
      { role: "Regimental Adjutant (S1)", name: "Cdt 1CL Dela Cruz, Joshua M.", class: "2027", company: "Alpha", badge: "S1 Quill" },
      { role: "Regimental Intelligence Officer (S2)", name: "Cdt 1CL Garcia, Andrea T.", class: "2027", company: "Charlie", badge: "S2 Eye" },
      { role: "Regimental Operations Officer (S3)", name: "Cdt 1CL Soriano, Kevin S.", class: "2027", company: "Delta", badge: "S3 Compass" },
      { role: "Regimental Logistics Officer (S4)", name: "Cdt 1CL Pimentel, Daniel G.", class: "2027", company: "Echo", badge: "S4 Supply" }
    ],
    battalion: [
      { battalion: "1st Battalion (Alpha, Bravo, Charlie)", cmdr: "Cdt 1CL Santiago, Paolo K.", exo: "Cdt 1CL Ramos, Nicole T.", adjutant: "Cdt 2CL Mendoza, L." },
      { battalion: "2nd Battalion (Delta, Echo, Foxtrot)", cmdr: "Cdt 1CL Bautista, Juan Carlos", exo: "Cdt 1CL Sy, Kenneth L.", adjutant: "Cdt 2CL Ocampo, R." },
      { battalion: "3rd Battalion (Golf, Hawk)", cmdr: "Cdt 1CL Oconer, Vincent B.", exo: "Cdt 1CL Tan, David E.", adjutant: "Cdt 2CL Santos, K." }
    ],
    companies: [
      { name: "Alpha Company (Alfa Coy)", tag: "The First & Foremost", cmdr: "Cdt 1CL Dela Cruz, J.", exo: "Cdt 2CL Rivera, P." },
      { name: "Bravo Company", tag: "Bravo Bravehearts", cmdr: "Cdt 1CL Del Rosario, B.", exo: "Cdt 2CL Ramos, A." },
      { name: "Charlie Company", tag: "Charlie Crusaders", cmdr: "Cdt 1CL Garcia, A.", exo: "Cdt 2CL Mercado, G." },
      { name: "Delta Company", tag: "Delta Dragons", cmdr: "Cdt 1CL Soriano, K.", exo: "Cdt 2CL Perez, V." }
    ]
  },

  // Events Calendar
  calendarEvents: [
    { id: 1, title: "Regimental Review & Silent Drill Exhibition", date: "2026-10-10", time: "1600H", location: "Borromeo Field", category: "Ceremony", dress: "Gala Uniform" },
    { id: 2, title: "Mid-Term Examinations: Military Science", date: "2026-10-14", time: "0800H", location: "Melchor Hall", category: "Academics", dress: "Study Uniform" },
    { id: 3, title: "Inter-Company Obstacle Course Championships", date: "2026-10-17", time: "0600H", location: "Tactics Obstacle Course", category: "Athletics", dress: "PT Uniform" }
  ]
};

// Sheet Sync Manager
class SheetSyncManager {
  constructor() {
    this.links = COUNCIL_SHEET_URLS;
  }

  getLink(key) {
    return this.links[key] || "";
  }

  static parseCSV(csvText) {
    const lines = [];
    let row = [];
    let inQuotes = false;
    let field = "";

    for (let i = 0; i < csvText.length; i++) {
      const char = csvText[i];
      const nextChar = csvText[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push(field.trim());
        field = "";
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (char === '\r' && nextChar === '\n') i++;
        row.push(field.trim());
        if (row.some(c => c.length > 0)) lines.push(row);
        row = [];
        field = "";
      } else {
        field += char;
      }
    }
    if (field.length > 0 || row.length > 0) {
      row.push(field.trim());
      if (row.some(c => c.length > 0)) lines.push(row);
    }
    return lines;
  }

  async fetchLiveCSV(url) {
    if (!url || !url.startsWith("http")) return null;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const text = await response.text();
      return SheetSyncManager.parseCSV(text);
    } catch (err) {
      console.warn(`Failed to fetch sheet at ${url}:`, err);
      return null;
    }
  }
}
