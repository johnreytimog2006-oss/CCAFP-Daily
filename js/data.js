// CCAFP Daily - Default Data, Council Schemas, and State Manager

const CCAFP_CONFIG = {
  version: "1.0.0",
  lastUpdated: new Date().toISOString(),
  pmaThemes: [
    { id: "pma-crimson", name: "PMA Crimson & Gold", desc: "Traditional Scarlet, Brass Gold & Navy" },
    { id: "pma-dress-white", name: "PMA Dress White", desc: "Pristine White with Gold & Red Trims" },
    { id: "pma-tactical", name: "Tactical Field Green", desc: "Army Olive Drab & Gold" },
    { id: "pma-night", name: "Night Ops Stealth", desc: "Deep Charcoal & Gold Typography" },
    { id: "pma-navy", name: "PMA Fleet Navy", desc: "Navy Blue & Polished Brass" }
  ],

  // Sensitive Councils - Mandated to display REMINDERS & GUIDELINES ONLY
  sensitiveCouncils: ["s2", "gad", "ccpb", "honor"],

  councils: [
    {
      id: "s1",
      name: "S1 - Personnel",
      title: "Personnel & Administration",
      icon: "users",
      category: "Regimental Staff",
      sensitive: false,
      description: "Cadet strength accountability, leaves, passes, records, and promotions.",
      defaultHeaders: ["Cadet Name", "Class", "Company", "Status", "Remarks"],
      defaultRows: [
        ["Cdt 1CL Dela Cruz, J.", "2027", "Alpha Coy", "Present for Duty", "Corps S1 Staff"],
        ["Cdt 2CL Santos, M.", "2028", "Bravo Coy", "Hospital Quarters", "Under Medical Observation"],
        ["Cdt 3CL Reyes, R.", "2029", "Charlie Coy", "Special Duty", "Parade Rehearsal Escort"],
        ["Cdt 4CL Ramos, E.", "2030", "Delta Coy", "Present for Duty", "Squad Leader Candidate"],
        ["Cdt 2CL Garcia, K.", "2028", "Echo Coy", "Authorized Leave", "Emergency Family Pass"]
      ],
      announcements: [
        "Cut-off for Weekend Liberty pass requests is today at 1700H.",
        "Class 2028 Physical Fitness Assessment roster released."
      ]
    },
    {
      id: "s2",
      name: "S2 - Intelligence",
      title: "Intelligence & Security",
      icon: "eye",
      category: "Sensitive Council",
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
          date: "Daily Reminder",
          priority: "HIGH",
          text: "All cadets on gate duty must demand two-factor verification for unescorted visitors entering Fort Del Pilar. Report suspicious vehicles immediately to SOC/OD."
        },
        {
          title: "Cyber Security & Smart Device Usage",
          date: "Weekly Policy",
          priority: "STANDARD",
          text: "Official cadet communications must utilize accredited channels only. Do not share operational rosters on third-party cloud apps."
        }
      ]
    },
    {
      id: "s3",
      name: "S3 - Operations",
      title: "Operations & Training",
      icon: "compass",
      category: "Regimental Staff",
      sensitive: false,
      description: "Corps operations, daily routine execution, training syllabi, and tactical maneuvers.",
      defaultHeaders: ["Time (H)", "Activity", "Location", "Uniform", "OIC"],
      defaultRows: [
        ["0500H", "Reveille & Morning PT", "Borromeo Field", "PT Uniform", "S3 Training Cadre"],
        ["0630H", "Morning Mess", "Cadet Mess Hall", "Working Uniform", "Duty Mess Officer"],
        ["0730H", "Parade Inspection & Colors", "Melchor Hall", "Dress Blue / White Duck", "Regimental Adjutant"],
        ["0800-1200H", "Academic Sessions", "Academic Classrooms", "Study Uniform", "Dean of Academics"],
        ["1300-1630H", "Field Tactical Training", "Tactics Area Alpha", "BDU / Field Gear", "S3 Tactics Instructor"],
        ["1700H", "Retreat & Lowering of Colors", "Borromeo Field", "Gala Dress", "Corps Staff"],
        ["1930-2130H", "Call to Quarters (Study)", "Cadet Barracks", "Casual Study", "Barracks Proctor"]
      ],
      announcements: [
        "Brigade Parade rehearsal scheduled for Wednesday 1530H at Borromeo Field.",
        "Cadet Corps firing range safety briefing starts 0600H tomorrow."
      ]
    },
    {
      id: "s4",
      name: "S4 - Logistics",
      title: "Logistics & Supply",
      icon: "package",
      category: "Regimental Staff",
      sensitive: false,
      description: "Uniform requisitions, equipment supply, armory accountability, and barracks facilities.",
      defaultHeaders: ["Item Category", "Batch / Unit", "Distribution Status", "Collection Date", "Location"],
      defaultRows: [
        ["White Duck Trouser Re-tailoring", "Class 2029", "Ready for Fitting", "Today 1600-1800H", "Tailor Shop"],
        ["Parade Saber Sheaths", "Alpha & Bravo", "Inspection Completed", "Tomorrow 0800H", "Quartermaster"],
        ["Field Rations (MRE)", "Battalion 1", "Staged for Exercise", "Friday 0500H", "S4 Supply Depot"],
        ["Barracks Fixture Repairs", "Echo Barracks", "Work Order Issued", "In Progress", "Facilities Office"]
      ],
      announcements: [
        "Laundry turnaround schedule: Odd numbered companies Tuesday, Even numbered companies Thursday.",
        "Saber polishing compound available for pickup at S4 Store."
      ]
    },
    {
      id: "s5",
      name: "S5 - Plans & Programs",
      title: "Plans & Programs",
      icon: "calendar-range",
      category: "Regimental Staff",
      sensitive: false,
      description: "Long-term calendar scheduling, strategic corps projects, and institutional milestones.",
      defaultHeaders: ["Project / Milestone", "Target Date", "Phase", "Lead Officer", "Status"],
      defaultRows: [
        ["PMA Alumni Homecoming Prep", "Feb 2027", "Phase II - Coordination", "Cdt 1CL Pimentel", "On Schedule"],
        ["Corps Leadership Symposium", "Nov 15, 2026", "Phase I - Speaker Invitations", "Cdt 1CL Villanueva", "Approved"],
        ["Barracks Modernization Study", "Dec 2026", "Data Gathering", "Cdt 2CL Tan", "In Review"]
      ],
      announcements: [
        "Draft calendar for Term 2 submitted to the Commandant of Cadets.",
        "Survey for Cadet Sports Complex improvement closes this Friday."
      ]
    },
    {
      id: "s6",
      name: "S6 - CEIS",
      title: "Communications, Electronics & Info Systems",
      icon: "radio",
      category: "Regimental Staff",
      sensitive: false,
      description: "Public address systems, Wi-Fi networks, communication frequencies, and smartphone rack protocols.",
      defaultHeaders: ["System / Device", "Company", "Operating Status", "Bandwidth / Channel", "Duty OIC"],
      defaultRows: [
        ["Regimental PA System", "Corps Wide", "Fully Operational", "Main Feed / Aux 1", "Cdt 2CL Soriano"],
        ["Smartphone Rack Access", "1CL Cadets", "Authorized 1900-2130H", "Rack Lockers A-D", "Company First Sergeants"],
        ["Tactical Radio Network (VHF)", "Training Area", "Standby / Tested", "Channel 4 Echo", "S6 Signals Cadre"],
        ["Barracks Wi-Fi Hub", "All Coy", "Active (Study Filter)", "Fiber Line 1 & 2", "CEIS Network Admin"]
      ],
      announcements: [
        "All smartphone racks must be padlocked and logged by First Sergeants by 2200H sharp.",
        "Annual radio communication test during retreat ceremony."
      ]
    },
    {
      id: "s7",
      name: "S7 - CMO",
      title: "Civil-Military Operations",
      icon: "megaphone",
      category: "Regimental Staff",
      sensitive: false,
      description: "Public engagement, civic action programs, community relations, and visiting delegations.",
      defaultHeaders: ["Activity / Event", "Partner Agency", "Date", "Delegation Size", "Coordinator"],
      defaultRows: [
        ["Baguio City Youth Leadership Visit", "DepEd CAR", "Saturday 1000H", "45 Cadets", "Cdt 1CL Alcantara"],
        ["Blood Donation Drive", "Philippine Red Cross", "Next Month", "All Companies", "Cdt 2CL Fernandez"],
        ["Tree Planting Activity", "DENR Cordillera", "Sunday 0600H", "3CL Cadets", "Cdt 3CL Ocampo"]
      ],
      announcements: [
        "Visiting civilian students tour requires 10 volunteer tour-cadet guides in Gala dress.",
        "Thank-you letter received from Baguio General Hospital for blood drive."
      ]
    },
    {
      id: "s8",
      name: "S8 - Education & Training",
      title: "Education & Tactics Training",
      icon: "book-open",
      category: "Regimental Staff",
      sensitive: false,
      description: "Tactical training curricula, leadership doctrines, mentoring sessions, and field manuals.",
      defaultHeaders: ["Module / Subject", "Class", "Instructor Cadre", "Training Ground", "Passing Benchmark"],
      defaultRows: [
        ["Small Unit Tactics (SUT)", "Class 2028 (2CL)", "Tactics Department", "Hill 102", "85% Tactical Eval"],
        ["Navigation & Map Reading", "Class 2030 (4CL)", "S8 Senior Mentors", "Camp Grounds", "Field Exercise"],
        ["Military Law & Code of Conduct", "Class 2029 (3CL)", "Legal Office", "Melchor Amphitheater", "Written Exam"],
        ["Leadership Case Studies", "Class 2027 (1CL)", "Visiting Flag Officers", "Commandant Hall", "Capstone Paper"]
      ],
      announcements: [
        "Field manual revisions for Land Navigation available at S8 office.",
        "Peer tutoring sessions available every evening at 1930H."
      ]
    },
    {
      id: "s10",
      name: "S10 - Finance",
      title: "Finance & Accounts",
      icon: "credit-card",
      category: "Regimental Staff",
      sensitive: false,
      description: "Corps fund management, mess allowances, savings disbursements, and financial transparency.",
      defaultHeaders: ["Account / Fund", "Disbursement Item", "Allocated (PHP)", "Current Balance", "Audit Status"],
      defaultRows: [
        ["Cadet Welfare Fund", "Gym Equipment Upgrade", "₱45,000.00", "₱312,400.00", "Audited & Certified"],
        ["Mess Rebate Account", "Special Banquet Allocation", "₱28,500.00", "₱88,900.00", "Verified"],
        ["Recreation & Sports Fund", "Inter-Company Ball Kits", "₱18,200.00", "₱64,150.00", "Pending Receipts"]
      ],
      announcements: [
        "Monthly stipend balance statement distributed to Company Treasurers.",
        "All petty cash receipts must be settled with S10 by end of month."
      ]
    },
    {
      id: "athletic",
      name: "Athletic Council",
      title: "Cadet Athletic Council",
      icon: "trophy",
      category: "Specialist Council",
      sensitive: false,
      description: "Physical fitness standards, intramural sports leagues, obstacle course conditioning, and gym oversight.",
      defaultHeaders: ["Sport / Discipline", "Matchup", "Time & Venue", "Referee / Marshal", "Standings"],
      defaultRows: [
        ["Intramural Basketball", "Alpha vs Charlie", "Today 1630H @ Gym 1", "Cdt 1CL Miranda", "Alpha 2-0 / Charlie 1-1"],
        ["Inter-Company Volleyball", "Bravo vs Delta", "Today 1700H @ Gym 2", "Cdt 2CL Bautista", "Bravo 3-0 / Delta 0-2"],
        ["Obstacle Course Conditioning", "Class 2030 (4CL)", "Tomorrow 0530H", "Athletic Committee", "Mandatory Timed Run"],
        ["Combatives & Arnis", "Class 2029 (3CL)", "Thursday 1600H", "Martial Arts Instructor", "Phase III"]
      ],
      announcements: [
        "New weights and bench presses installed in the Cadet Weight Room.",
        "Inter-battalion marathon registration is now open."
      ]
    },
    {
      id: "academic",
      name: "Academic Council",
      title: "Cadet Academic Council",
      icon: "graduation-cap",
      category: "Specialist Council",
      sensitive: false,
      description: "Grade monitorship, study hall enforcement, Dean's List incentives, and academic peer support.",
      defaultHeaders: ["Subject / Course", "Target Class", "Review Schedule", "Room", "Lead Mentor"],
      defaultRows: [
        ["Advanced Engineering Mathematics", "Class 2028", "Mon/Wed 1930-2100H", "Room 204", "Cdt 1CL Sy (Dean's List)"],
        ["Physics for Military Engineers", "Class 2029", "Tue/Thu 1930-2100H", "Room 301", "Cdt 2CL Ramos"],
        ["National Security Studies", "Class 2027", "Fridays 1930H", "Lecture Hall A", "Academic Officer"]
      ],
      announcements: [
        "Midterm examinations begin in 2 weeks. Mandatory CQ study hours strictly enforced.",
        "Cadet Library extended hours: Open until 2230H for 1CL and 2CL cadets."
      ]
    },
    {
      id: "mto",
      name: "MTO Council",
      title: "Motor Transport Officer Council",
      icon: "truck",
      category: "Specialist Council",
      sensitive: false,
      description: "Military vehicle dispatch, shuttle convoys, baggage trucks, and mobility operations.",
      defaultHeaders: ["Vehicle / Unit", "Destination", "Departure Time", "Passenger Quota", "Driver / Marshall"],
      defaultRows: [
        ["Military Bus 04", "Baguio City Center (Weekend Liberty)", "Saturday 1300H", "45 Pax", "MTO Duty Driver"],
        ["Supply Truck 02", "Sub-Depot Benguet", "Friday 0800H", "Cargo Only", "Cdt 2CL Valdez (Marshall)"],
        ["Ambulance Duty 01", "Fort Del Pilar Station", "24/7 Standby", "Emergency Only", "Station Medic"]
      ],
      announcements: [
        "Bus ticket manifests must be countersigned by Company ExOs by Friday 1200H.",
        "All official vehicles parked at Motor Pool must log odometer readings."
      ]
    },
    {
      id: "exo",
      name: "EXO Council",
      title: "Executive Officers Council",
      icon: "briefcase",
      category: "Command Council",
      sensitive: false,
      description: "Inter-company administrative synchronization, barracks inspections, and command duty coordination.",
      defaultHeaders: ["Inspection / Roster", "Inspecting Unit", "Standard", "Score Average", "Action Required"],
      defaultRows: [
        ["General Barracks Saturday Inspection", "All Companies", "Beds, Lockers, Polished Brass", "94.2%", "Minor Corrections (Charlie)"],
        ["Uniform & Saber Serviceability", "Battalion 1 & 2", "Gala Dress Check", "97.5%", "Approved for Parade"],
        ["Barracks Common Area Cleanliness", "Echo & Foxtrot", "Zero Dust Standard", "91.8%", "Re-inspection Today"]
      ],
      announcements: [
        "Executive Officers Weekly Sync Meeting: Tonight at 2145H in the Regimental Conference Room.",
        "Standardization of cadet locker shelf alignments taking effect Monday."
      ]
    },
    {
      id: "mess",
      name: "Mess Council",
      title: "Cadet Mess Council",
      icon: "utensils",
      category: "Specialist Council",
      sensitive: false,
      description: "Cadet nutrition, daily menu rotation, table etiquette enforcement, and special dietary provisions.",
      defaultHeaders: ["Meal", "Main Course", "Sides & Vegetables", "Dessert / Beverage", "Special Diet Alternative"],
      defaultRows: [
        ["Breakfast (0630H)", "Beef Tapa & Scrambled Eggs", "Garlic Rice & Sliced Tomatoes", "Hot Chocolate / Coffee", "Fish Fillet & Eggs"],
        ["Lunch (1200H)", "Pork Sinigang sa Sampaloc", "Steamed Kangkong & Rice", "Ripe Mangoes & Iced Tea", "Chicken Tinola"],
        ["Supper (1830H)", "Roast Chicken with Rosemary Gravy", "Buttered Corn & Mashed Potatoes", "Fruit Salad & Water", "Vegetarian Stir-fry"]
      ],
      announcements: [
        "Table commanders must enforce proper cadet mess etiquette. No slouching or talking across tables.",
        "Special vegetarian and halal requests must be submitted to the Mess Steward by Wednesday."
      ]
    },
    {
      id: "spiritual",
      name: "Spiritual Council",
      title: "Spiritual Development Council",
      icon: "heart-handshake",
      category: "Specialist Council",
      sensitive: false,
      description: "Moral and spiritual nourishment, chapel services, inter-faith programs, and retreats.",
      defaultHeaders: ["Faith / Denomination", "Service / Gathering", "Time & Day", "Venue", "Officiating Leader"],
      defaultRows: [
        ["Roman Catholic", "Sunday Holy Eucharist Mass", "Sunday 0700H & 1800H", "St. Ignatius Chapel", "Military Chaplain"],
        ["Evangelical Christian", "Cadet Fellowship & Worship", "Sunday 0900H", "Cadet Protestant Chapel", "Chaplain Pastor"],
        ["Islamic Faith", "Jum'ah Congregational Prayer", "Friday 1230H", "CCAFP Musalla / Prayer Room", "Cadet Imam"],
        ["Inter-Faith", "Evening Silent Meditation", "Daily 2130-2200H", "Chapel Prayer Garden", "Self-Guided"]
      ],
      announcements: [
        "Class 2030 Spiritual Recollection and Renewal scheduled for Saturday morning.",
        "Cadet Choir rehearsal tonight at 1945H at St. Ignatius Chapel."
      ]
    },
    {
      id: "safety",
      name: "Safety Council",
      title: "Cadet Safety Council",
      icon: "shield-alert",
      category: "Specialist Council",
      sensitive: false,
      description: "Health and injury prevention, heat flag conditions, fire drills, and risk management.",
      defaultHeaders: ["Safety Metric", "Current Parameter", "Level", "Standing Protocol", "Hotline / Duty"],
      defaultRows: [
        ["WBGT Heat Condition", "24.2°C (WBGT Index)", "Green Flag", "Normal PT & Tactics Permitted", "Station Medic"],
        ["Barracks Fire Readiness", "All Extinguishers Checked", "Green / Operational", "Clear Fire Escape Paths", "Safety Marshal"],
        ["Cadet Clinic Response", "2 Ambulances Available", "Ready", "Immediate Evac Capability", "Radio Ch. 1 Safety"]
      ],
      announcements: [
        "Stay hydrated: Mandatory water canteen inspection before afternoon drill.",
        "Report all minor sprains and injuries to your company medic immediately."
      ]
    },
    {
      id: "gad",
      name: "GAD Council",
      title: "Gender Awareness & Development",
      icon: "users-round",
      category: "Sensitive Council",
      sensitive: true,
      description: "RESTRICTED ACCESS: Gender Equality Guidelines, Respectful Professional Conduct, and Anti-Harassment Directives only.",
      reminders: [
        {
          title: "Zero Tolerance on Gender Bias & Harassment",
          date: "Mandatory Standing Order",
          priority: "CRITICAL",
          text: "The Cadet Corps observes absolute gender equality and respect. Any remark, gesture, or act demeaning to any gender will be dealt with under the strictest articles of the Cadet Regulations."
        },
        {
          title: "Equal Opportunity in Leadership Appointments",
          date: "Cadet Corps Directive",
          priority: "HIGH",
          text: "Appointments to squad, platoon, and command positions are based strictly on merit, competence, and character without prejudice to gender."
        },
        {
          title: "Confidential Consultation Channels",
          date: "Active Support",
          priority: "STANDARD",
          text: "Cadets needing guidance or seeking to report concerns in a safe, confidential environment may approach the GAD Cadet Committee or the Academy Guidance Counseling Center."
        }
      ]
    },
    {
      id: "ccpb",
      name: "CCPB",
      title: "Cadet Conduct Policy Board",
      icon: "scale",
      category: "Sensitive Council",
      sensitive: true,
      description: "RESTRICTED ACCESS: Cadet Conduct Directives, Disciplinary Standards, and Due Process Policies only.",
      reminders: [
        {
          title: "Integrity in Reporting & Demerit Recording",
          date: "Procedural Directive",
          priority: "CRITICAL",
          text: "All reported delinquencies must be factual, accurate, and submitted within 24 hours of occurrence. False or malicious reporting is an Honor Code offense."
        },
        {
          title: "Cadet Right to Explanation & Due Process",
          date: "Board Policy",
          priority: "HIGH",
          text: "Every reported cadet has the inviolable right to submit a written explanation within 48 hours before any demerit or tour penalty is officially awarded."
        },
        {
          title: "Standing Standards of Military Bearing",
          date: "Weekly Focus",
          priority: "STANDARD",
          text: "Impeccable posture, sharp salute execution, and respectful military language are mandatory at all times across Fort Del Pilar."
        }
      ]
    },
    {
      id: "honor",
      name: "Honor Council",
      title: "The Cadet Honor Council",
      icon: "shield",
      category: "Sensitive Council",
      sensitive: true,
      description: "RESTRICTED ACCESS: The Honor Code & System Tenets, Moral Integrity Reminders, and Ethical Guidelines only.",
      reminders: [
        {
          title: "THE HONOR CODE OF THE CADET CORPS",
          date: "Sacred Tenet",
          priority: "CRITICAL",
          text: "\"WE, THE CADETS, DO NOT LIE, CHEAT, STEAL, NOR TOLERATE AMONG US THOSE WHO DO.\"\n\nThis is not a rule to be enforced by threat of punishment; it is an unwritten covenant lived by every cadet."
        },
        {
          title: "The Non-Toleration Clause",
          date: "Core Doctrine",
          priority: "HIGH",
          text: "A cadet who observes a breach of the Honor Code and remains silent shares equally in the dishonor. Uphold the corps by upholding your fellow cadet's integrity."
        },
        {
          title: "Honor Education & Self-Reflection",
          date: "Cadet Guidance",
          priority: "STANDARD",
          text: "The Honor System is educational and character-building. True honor is doing what is right even when no one is watching."
        }
      ]
    }
  ],

  // Officers of the Day
  dutyOfficers: {
    oc: {
      name: "Cdt 1CL Bautista, Juan Carlos",
      role: "Officer in Charge (OC)",
      company: "Alpha Coy",
      class: "2027",
      phone: "Ext. 201"
    },
    aoc: {
      name: "Cdt 2CL Mercado, Gabriel",
      role: "Assistant Officer in Charge (AOC)",
      company: "Charlie Coy",
      class: "2028",
      phone: "Ext. 202"
    },
    soc: {
      name: "Cdt 1CL Villanueva, Marcus",
      role: "Senior Officer of the Corps (SOC)",
      company: "Delta Coy",
      class: "2027",
      phone: "Ext. 200"
    },
    dutyMedic: {
      name: "Cdt 2CL Ramos, Angela",
      role: "Corps Duty Medic",
      company: "Bravo Coy",
      class: "2028",
      phone: "Ext. 911"
    }
  },

  // Daily Corps Routine
  dailySchedule: [
    { time: "0500H", event: "Reveille & Morning PT", venue: "Borromeo Field", uniform: "PT Gear" },
    { time: "0630H", event: "Breakfast Mess", venue: "Cadet Mess Hall", uniform: "Working Uniform" },
    { time: "0730H", event: "Morning Colors & Inspection", venue: "Melchor Hall Steps", uniform: "Dress White / Gala" },
    { time: "0800H", event: "Academic & Technical Classes", venue: "Melchor & Academic Halls", uniform: "Study Uniform" },
    { time: "1200H", event: "Lunch Mess", venue: "Cadet Mess Hall", uniform: "Study Uniform" },
    { time: "1300H", event: "Military Tactics & Drill Practice", venue: "Borromeo & Training Grounds", uniform: "BDU / Field Uniform" },
    { time: "1700H", event: "Retreat & Lowering of the Flag", venue: "Borromeo Field", uniform: "Dress Uniform" },
    { time: "1830H", event: "Evening Supper Mess", venue: "Cadet Mess Hall", uniform: "Dress Uniform" },
    { time: "1930H", event: "Call to Quarters (Mandatory Study)", venue: "Company Barracks", uniform: "Barracks Uniform" },
    { time: "2200H", event: "Taps & Lights Out", venue: "All Barracks", uniform: "Sleeping Garments" }
  ],

  // Flash Reminders
  flashReminders: [
    { id: 1, text: "UNIFORM OF THE DAY: Full Gala Dress for 1700H Retreat Ceremony.", type: "danger" },
    { id: 2, text: "WEATHER ADVISORY: 16°C in Baguio City with light rain expected around 1500H. Ponchos standby.", type: "warning" },
    { id: 3, text: "INSPECTION NOTICE: Regimental ExO room and locker inspection tomorrow at 0645H.", type: "info" }
  ],

  // CCAFP Punishment List
  punishmentList: [
    { id: 1, cadetName: "Cdt 4CL Santos, A. M.", serialNo: "2030-0142", class: "2030 (4CL)", company: "Alpha", offense: "Late for 0730H Colors Formation", demerits: 6, tours: 4, confinement: 0, status: "Serving Tours", dateAwarded: "2026-10-05" },
    { id: 2, cadetName: "Cdt 3CL Ramirez, J. P.", serialNo: "2029-0089", class: "2029 (3CL)", company: "Bravo", offense: "Unpolished Saber Scabbard during Inspection", demerits: 4, tours: 2, confinement: 0, status: "Serving Tours", dateAwarded: "2026-10-04" },
    { id: 3, cadetName: "Cdt 2CL Mendoza, L. K.", serialNo: "2028-0054", class: "2028 (2CL)", company: "Charlie", offense: "Unscheduled Smartphone Possession after 2200H", demerits: 10, tours: 8, confinement: 4, status: "Appealed / Review", dateAwarded: "2026-10-03" },
    { id: 4, cadetName: "Cdt 4CL Aquino, R. S.", serialNo: "2030-0211", class: "2030 (4CL)", company: "Delta", offense: "Improper Gig Line Alignment during Parade", demerits: 3, tours: 2, confinement: 0, status: "Completed", dateAwarded: "2026-10-01" },
    { id: 5, cadetName: "Cdt 3CL Tan, D. C.", serialNo: "2029-0112", class: "2029 (3CL)", company: "Echo", offense: "Failure to log out at Company CQ Desk", demerits: 5, tours: 3, confinement: 0, status: "Serving Tours", dateAwarded: "2026-10-04" },
    { id: 6, cadetName: "Cdt 2CL Fernandez, M. T.", serialNo: "2028-0098", class: "2028 (2CL)", company: "Foxtrot", offense: "Tardiness at Evening Mess", demerits: 3, tours: 0, confinement: 0, status: "Completed", dateAwarded: "2026-09-29" },
    { id: 7, cadetName: "Cdt 4CL Cruz, V. L.", serialNo: "2030-0310", class: "2030 (4CL)", company: "Golf", offense: "Unshined Shoes during Morning PT", demerits: 2, tours: 1, confinement: 0, status: "Serving Tours", dateAwarded: "2026-10-05" },
    { id: 8, cadetName: "Cdt 3CL Morales, E. H.", serialNo: "2029-0204", class: "2029 (3CL)", company: "Hawk", offense: "Neglecting Barracks Window Blackout protocol", demerits: 6, tours: 4, confinement: 0, status: "Serving Tours", dateAwarded: "2026-10-02" }
  ],

  // Cadet Chains of Command / Staff Directories
  staffDirectory: {
    regiment: [
      { role: "Regimental Commander (Brigade Cmdr)", name: "Cdt 1CL Villanueva, Marcus R.", class: "2027", company: "Alpha", badge: "Brigade Eagle" },
      { role: "Regimental Executive Officer (ExO)", name: "Cdt 1CL Del Rosario, Brian P.", class: "2027", company: "Bravo", badge: "ExO Saber" },
      { role: "Regimental Adjutant (S1)", name: "Cdt 1CL Dela Cruz, Joshua M.", class: "2027", company: "Alpha", badge: "S1 Quill" },
      { role: "Regimental Intelligence Officer (S2)", name: "Cdt 1CL Garcia, Andrea T.", class: "2027", company: "Charlie", badge: "S2 Eye" },
      { role: "Regimental Operations Officer (S3)", name: "Cdt 1CL Soriano, Kevin S.", class: "2027", company: "Delta", badge: "S3 Compass" },
      { role: "Regimental Logistics Officer (S4)", name: "Cdt 1CL Pimentel, Daniel G.", class: "2027", company: "Echo", badge: "S4 Supply" },
      { role: "Regimental Sergeant Major", name: "Cdt 1CL Alcantara, Ramon V.", class: "2027", company: "Hawk", badge: "Chevrons" }
    ],
    battalion: [
      { battalion: "1st Battalion (Alpha, Bravo, Charlie)", cmdr: "Cdt 1CL Santiago, Paolo K.", exo: "Cdt 1CL Ramos, Nicole T.", adjutant: "Cdt 2CL Mendoza, L." },
      { battalion: "2nd Battalion (Delta, Echo, Foxtrot)", cmdr: "Cdt 1CL Bautista, Juan Carlos", exo: "Cdt 1CL Sy, Kenneth L.", adjutant: "Cdt 2CL Ocampo, R." },
      { battalion: "3rd Battalion (Golf, Hawk)", cmdr: "Cdt 1CL Oconer, Vincent B.", exo: "Cdt 1CL Tan, David E.", adjutant: "Cdt 2CL Santos, K." }
    ],
    companies: [
      { name: "Alpha Company (Alfa Coy)", tag: "The First & Foremost", cmdr: "Cdt 1CL Dela Cruz, J.", exo: "Cdt 2CL Rivera, P.", firstSgt: "Cdt 2CL Gomez, M." },
      { name: "Bravo Company", tag: "Bravo Bravehearts", cmdr: "Cdt 1CL Del Rosario, B.", exo: "Cdt 2CL Ramos, A.", firstSgt: "Cdt 2CL Morales, D." },
      { name: "Charlie Company", tag: "Charlie Crusaders", cmdr: "Cdt 1CL Garcia, A.", exo: "Cdt 2CL Mercado, G.", firstSgt: "Cdt 2CL Santos, J." },
      { name: "Delta Company", tag: "Delta Dragons", cmdr: "Cdt 1CL Soriano, K.", exo: "Cdt 2CL Perez, V.", firstSgt: "Cdt 2CL Castro, L." },
      { name: "Echo Company", tag: "Echo Eagles", cmdr: "Cdt 1CL Pimentel, D.", exo: "Cdt 2CL Tan, D.", firstSgt: "Cdt 2CL Reyes, E." },
      { name: "Foxtrot Company", tag: "Foxtrot Falcons", cmdr: "Cdt 1CL Miranda, L.", exo: "Cdt 2CL Sy, K.", firstSgt: "Cdt 2CL Cruz, R." },
      { name: "Golf Company", tag: "Golf Gladiators", cmdr: "Cdt 1CL Oconer, V.", exo: "Cdt 2CL Valdez, M.", firstSgt: "Cdt 2CL Aquino, H." },
      { name: "Hawk Company", tag: "Hawk Hunters", cmdr: "Cdt 1CL Alcantara, R.", exo: "Cdt 2CL Fernandez, P.", firstSgt: "Cdt 2CL Mendoza, S." }
    ]
  },

  // Events Calendar
  calendarEvents: [
    { id: 1, title: "Regimental Review & Silent Drill Exhibition", date: "2026-10-10", time: "1600H", location: "Borromeo Field", category: "Ceremony", dress: "Gala Uniform" },
    { id: 2, title: "Mid-Term Examinations: Military Science", date: "2026-10-14", time: "0800H", location: "Melchor Hall", category: "Academics", dress: "Study Uniform" },
    { id: 3, title: "Inter-Company Obstacle Course Championships", date: "2026-10-17", time: "0600H", location: "Tactics Obstacle Course", category: "Athletics", dress: "PT Uniform" },
    { id: 4, title: "Alumni Corps Thanksgiving Service", date: "2026-10-25", time: "0900H", location: "St. Ignatius Chapel", category: "Spiritual", dress: "Dress White" },
    { id: 5, title: "Baguio City Joint Civil-Military Outreach", date: "2026-11-01", time: "0800H", location: "Burnham Park / PMA Grounds", category: "CMO", dress: "Service Dress" },
    { id: 6, title: "Class 2030 Recognition Day", date: "2026-11-15", time: "1400H", location: "Borromeo Field", category: "Milestone", dress: "Full Dress Blue" }
  ]
};

// Spreadsheet Links Manager (Stored in LocalStorage)
class SheetSyncManager {
  constructor() {
    this.storageKey = "ccafp_daily_sheet_links";
    this.statusKey = "ccafp_daily_sync_status";
    this.links = this.loadLinks();
  }

  loadLinks() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved sheet links", e);
      }
    }
    // Default empty links for councils
    const initial = {};
    CCAFP_CONFIG.councils.forEach(c => {
      initial[c.id] = "";
    });
    initial["punishments"] = "";
    initial["calendar"] = "";
    initial["dutyOfficers"] = "";
    return initial;
  }

  saveLinks(links) {
    this.links = { ...this.links, ...links };
    localStorage.setItem(this.storageKey, JSON.stringify(this.links));
  }

  getLink(key) {
    return this.links[key] || "";
  }

  // Parse CSV string into 2D array
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
          i++; // skip escaped quote
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

  // Live fetch from a Google Sheet CSV URL
  async fetchLiveCSV(url) {
    if (!url || !url.startsWith("http")) return null;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const text = await response.text();
      return SheetSyncManager.parseCSV(text);
    } catch (err) {
      console.warn(`Failed to fetch live sheet at ${url}:`, err);
      return null;
    }
  }
}
