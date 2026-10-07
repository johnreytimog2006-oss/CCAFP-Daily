// CCAFP Daily - Master Data Store & Alfacoy-Style Bulletin Engine

/**
 * =========================================================================
 * 📋 GOOGLE SPREADSHEET LIVE DATA SOURCES (CONFIGURED DIRECTLY VIA CODE)
 * =========================================================================
 */
const COUNCIL_SHEET_URLS = {
  // S1 Personnel Google Sheet (Live GVIZ CSV Export Endpoints)
  s1: "https://docs.google.com/spreadsheets/d/1D2Mawvphp9UsY9NC8boG46FlksDkjXzLEf5c8afm-xI/gviz/tq?tqx=out:csv&sheet=DISPOSITION",
  s1_disposition: "https://docs.google.com/spreadsheets/d/1D2Mawvphp9UsY9NC8boG46FlksDkjXzLEf5c8afm-xI/gviz/tq?tqx=out:csv&sheet=DISPOSITION",
  s1_armory: "https://docs.google.com/spreadsheets/d/1D2Mawvphp9UsY9NC8boG46FlksDkjXzLEf5c8afm-xI/gviz/tq?tqx=out:csv&sheet=ARMORY",
  s1_attachment: "https://docs.google.com/spreadsheets/d/1D2Mawvphp9UsY9NC8boG46FlksDkjXzLEf5c8afm-xI/gviz/tq?tqx=out:csv&sheet=ATTACHMENT",
  s1_schedule: "https://docs.google.com/spreadsheets/d/1D2Mawvphp9UsY9NC8boG46FlksDkjXzLEf5c8afm-xI/gviz/tq?tqx=out:csv&sheet=SCHEDULE%20OF%20CALLS",
  s1_regiment_staff: "https://docs.google.com/spreadsheets/d/1D2Mawvphp9UsY9NC8boG46FlksDkjXzLEf5c8afm-xI/gviz/tq?tqx=out:csv&sheet=REGIMENTAL%20STAFF%202027",
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

  // =========================================================================
  // 🏛️ S1 COUNCIL MASTER REPOSITORY (DISPOSITION, ARMORY, ATTACHMENT, CALLS, STAFF)
  // =========================================================================
  s1Data: {
    // -----------------------------------------------------------------------
    // 1. DISPOSITION - Completeness Inspection Report (06 2230H OCT 2026)
    // -----------------------------------------------------------------------
    disposition: {
      reportDate: "06 2230H OCTOBER 2026",
      preparedBy: "JHOPRILYN S MANGAGOM C-27151, CDT LT 1CL 'D' CO CCAFP, Officer-of-the-Day",
      summary: {
        ccafpOnPost: { male: 907, female: 306, total: 1213 },
        effective: { fullDuty: 1131, fad: 42, priv: 0, ob: 0, entrucking: 0, total: 1173 },
        ineffective: { leave: 0, fdpsh: 4, vluna: 4, bgh: 0, siq: 2, quarantined: 0, holdingCenter: 30, awol: 0, total: 40 },
        grandTotal: { male: 943, female: 322, total: 1267 }
      },
      externalPersonnel: [
        { category: "CCAFP Cadets On-Post", male: 907, female: 306, total: 1213, status: "Active Regiment" },
        { category: "FSA On Foreign Service Academies", male: 33, female: 15, total: 48, status: "Detached Service" },
        { category: "FAEP / CEP RMC Canada", male: 2, female: 1, total: 3, status: "Foreign Exchange" },
        { category: "Cadets in AFP General Headquarters (GHQ)", male: 1, female: 0, total: 1, status: "Liaison Duty" },
        { category: "PMA Stockade", male: 2, female: 0, total: 2, status: "Disciplinary Detainment" },
        { category: "Corps Grand Total Strength", male: 943, female: 322, total: 1267, status: "Complete Master Roll" }
      ],
      companies: [
        { name: "Alpha", code: "A", firstCL_M: 20, firstCL_F: 8, secondCL_M: 26, secondCL_F: 10, thirdCL_M: 26, thirdCL_F: 9, fourthCL_M: 34, fourthCL_F: 10, effectiveTotal: 146, ineffectiveTotal: 4, total: 150, fad: 3, holdingCenter: 4, fdpsh: 0, vluna: 0, siq: 0 },
        { name: "Bravo", code: "B", firstCL_M: 20, firstCL_F: 9, secondCL_M: 22, secondCL_F: 10, thirdCL_M: 31, thirdCL_F: 8, fourthCL_M: 34, fourthCL_F: 9, effectiveTotal: 145, ineffectiveTotal: 7, total: 152, fad: 2, holdingCenter: 6, fdpsh: 1, vluna: 0, siq: 0 },
        { name: "Charlie", code: "C", firstCL_M: 20, firstCL_F: 9, secondCL_M: 30, secondCL_F: 9, thirdCL_M: 28, thirdCL_F: 7, fourthCL_M: 32, fourthCL_F: 9, effectiveTotal: 149, ineffectiveTotal: 3, total: 152, fad: 5, holdingCenter: 2, fdpsh: 0, vluna: 0, siq: 1 },
        { name: "Delta", code: "D", firstCL_M: 19, firstCL_F: 9, secondCL_M: 24, secondCL_F: 10, thirdCL_M: 28, thirdCL_F: 8, fourthCL_M: 30, fourthCL_F: 10, effectiveTotal: 145, ineffectiveTotal: 5, total: 150, fad: 7, holdingCenter: 5, fdpsh: 0, vluna: 0, siq: 0 },
        { name: "Echo", code: "E", firstCL_M: 14, firstCL_F: 9, secondCL_M: 31, secondCL_F: 9, thirdCL_M: 29, thirdCL_F: 10, fourthCL_M: 34, fourthCL_F: 9, effectiveTotal: 149, ineffectiveTotal: 7, total: 156, fad: 4, holdingCenter: 5, fdpsh: 0, vluna: 2, siq: 0 },
        { name: "Foxtrot", code: "F", firstCL_M: 17, firstCL_F: 9, secondCL_M: 28, secondCL_F: 11, thirdCL_M: 29, thirdCL_F: 8, fourthCL_M: 34, fourthCL_F: 10, effectiveTotal: 149, ineffectiveTotal: 1, total: 150, fad: 3, holdingCenter: 0, fdpsh: 0, vluna: 1, siq: 0 },
        { name: "Golf", code: "G", firstCL_M: 17, firstCL_F: 9, secondCL_M: 25, secondCL_F: 10, thirdCL_M: 25, thirdCL_F: 9, fourthCL_M: 33, fourthCL_F: 10, effectiveTotal: 145, ineffectiveTotal: 5, total: 150, fad: 7, holdingCenter: 3, fdpsh: 2, vluna: 0, siq: 0 },
        { name: "Hawk", code: "H", firstCL_M: 17, firstCL_F: 10, secondCL_M: 25, secondCL_F: 10, thirdCL_M: 25, thirdCL_F: 9, fourthCL_M: 29, fourthCL_F: 9, effectiveTotal: 145, ineffectiveTotal: 8, total: 153, fad: 11, holdingCenter: 5, fdpsh: 1, vluna: 1, siq: 1 }
      ]
    },

    // -----------------------------------------------------------------------
    // 2. ARMORY - Completeness Inspection Report (06 2230H OCT 2026)
    // -----------------------------------------------------------------------
    armory: {
      reportDate: "06 2230H OCTOBER 2026",
      totals: {
        m14In: 831, m14Out: 0, m14Mag: 818,
        m16In: 342, m16Out: 0,
        r4In: 130, r4Out: 0,
        k3In: 2,
        m1GarandIn: 21,
        pistol9mmIn: 13,
        swordsIn: 38,
        bayonetsIn: 51
      },
      rows: [
        { loc: "1st Floor RH 'A'", m14: 54, mag14: 56, m16: 36, r4: 15, k3: 0, garand: 0, pistol: 0, swords: 38, bayonets: 51, notes: "As of 06 2200H Oct 2026: 1 9mm added (Maj Martinez), 12-13 9mm" },
        { loc: "2nd Floor RH 'B'", m14: 60, mag14: 59, m16: 31, r4: 12, k3: 0, garand: 0, pistol: 0, swords: 0, bayonets: 0, notes: "All rifles racked & locked" },
        { loc: "3rd Floor RH 'D'", m14: 57, mag14: 57, m16: 44, r4: 13, k3: 0, garand: 0, pistol: 0, swords: 0, bayonets: 0, notes: "Complete count verified" },
        { loc: "4th Floor RH 'C'", m14: 60, mag14: 57, m16: 44, r4: 12, k3: 0, garand: 0, pistol: 0, swords: 0, bayonets: 0, notes: "Complete count verified" },
        { loc: "1st Floor EH 'E'", m14: 65, mag14: 66, m16: 58, r4: 12, k3: 0, garand: 1, pistol: 0, swords: 0, bayonets: 0, notes: "1 M1 Garand on rack" },
        { loc: "2nd Floor EH 'F'", m14: 59, mag14: 60, m16: 41, r4: 12, k3: 0, garand: 0, pistol: 0, swords: 0, bayonets: 0, notes: "Complete count verified" },
        { loc: "3rd Floor EH 'G'", m14: 57, mag14: 60, m16: 45, r4: 12, k3: 0, garand: 0, pistol: 0, swords: 0, bayonets: 0, notes: "Complete count verified" },
        { loc: "4th Floor EH 'H'", m14: 62, mag14: 62, m16: 43, r4: 13, k3: 0, garand: 0, pistol: 0, swords: 0, bayonets: 0, notes: "51 Bayonets at RSO Stockroom" },
        { loc: "1st Floor FH", m14: 0, mag14: 0, m16: 0, r4: 29, k3: 2, garand: 20, pistol: 13, swords: 0, bayonets: 0, notes: "Special armory: 2 K3 MG, 20 Garand, 13 Pistols" },
        { loc: "2nd Floor FH", m14: 135, mag14: 132, m16: 0, r4: 0, k3: 0, garand: 0, pistol: 0, swords: 0, bayonets: 0, notes: "Florendo Hall main rack" },
        { loc: "3rd Floor FH", m14: 140, mag14: 136, m16: 0, r4: 0, k3: 0, garand: 0, pistol: 0, swords: 0, bayonets: 0, notes: "14 swords at RSO Stockroom" },
        { loc: "4th Floor FH", m14: 82, mag14: 73, m16: 0, r4: 0, k3: 0, garand: 0, pistol: 0, swords: 0, bayonets: 0, notes: "5 interior guards, 11 silent drillers, 8 colors utilizing swords" }
      ],
      notes: "NOTE: ONLY THE REGIMENT RSO IS AUTHORIZED TO EDIT ARMORY RECORDS. 51 Bayonets & 14 Swords housed in RSO Stockroom.",
      signOff: {
        preparedBy: "JHOPRILYN S MANGAGOM C-27151, CDT LT 1CL 'D' CO CCAFP, Officer-of-the-Day",
        notedBy: ["JULIUS D GIRON LCDR PN (OIC)", "DARYL G VILLA LCDR PN (OIC)", "ROMAN B PALIMA LCDR PN (OIC)"]
      }
    },

    // -----------------------------------------------------------------------
    // 3. ATTACHMENT - Completeness Inspection Report (06 2230H OCT 2026)
    // -----------------------------------------------------------------------
    attachment: {
      reportDate: "06 2230H OCTOBER 2026",
      counts: {
        fad: 42,
        siq: 2,
        fdpsh: 4,
        vluna: 4,
        holdingCenter: 30,
        clearingOut: 2,
        clearingIn: 9,
        ghq: 1,
        stockade: 2
      },
      // FAD (42 Cadets)
      fadList: [
        { no: 1, classYr: "1CL", name: "DE MESA", coy: "A", condition: "LEFT FOOT CLOSE COMPLETE FRACTURE", start: "-", release: "21 October 2026" },
        { no: 2, classYr: "4CL", name: "DRAPIZA", coy: "B", condition: "RIGHT SHOULDER SPRAIN", start: "-", release: "13 October 2026" },
        { no: 3, classYr: "4CL", name: "REMO", coy: "A", condition: "SCOLIOSIS", start: "10 September 2026", release: "08 October 2026" },
        { no: 4, classYr: "4CL", name: "COLIPANO", coy: "F", condition: "URTI", start: "28 September 2026", release: "UNDETERMINED" },
        { no: 5, classYr: "4CL", name: "BULQUIRIEN", coy: "D", condition: "FRACTURED FINGER", start: "16 September 2026", release: "07 October 2026" },
        { no: 6, classYr: "4CL", name: "PALLINGAYAN", coy: "D", condition: "LOW GRADE PCL", start: "-", release: "08 October 2026" },
        { no: 7, classYr: "2CL", name: "VICLAR", coy: "E", condition: "FRACTURED CLAVICLE", start: "02 September 2026", release: "12 October 2026" },
        { no: 8, classYr: "4CL", name: "BUNDALIAN", coy: "E", condition: "KNEE SPRAIN, MPFL TEAR (RIGHT)", start: "-", release: "07 October 2026" },
        { no: 9, classYr: "2CL", name: "GENTOLEO", coy: "G", condition: "LEFT ELBOW DISLOCATION", start: "-", release: "14 October 2026" },
        { no: 10, classYr: "3CL", name: "PIRA", coy: "G", condition: "LEFT ELBOW SPRAIN", start: "-", release: "14 October 2026" },
        { no: 11, classYr: "3CL", name: "LOMEREZ", coy: "H", condition: "CHRONIC CALCULUS CHOLECYSTITIS", start: "-", release: "15 October 2026" },
        { no: 12, classYr: "4CL", name: "AUSTRIA", coy: "H", condition: "RIGHT KNEE SPRAIN", start: "-", release: "09 October 2026" },
        { no: 13, classYr: "4CL", name: "GRANIL", coy: "H", condition: "FOOT SPRAIN", start: "25 September 2026", release: "07 October 2026" },
        { no: 14, classYr: "3CL", name: "ENCIO", coy: "H", condition: "ANKLE SPRAIN", start: "-", release: "09 October 2026" },
        { no: 15, classYr: "4CL", name: "AGUSTIN", coy: "H", condition: "ANKLE SPRAIN", start: "-", release: "08 October 2026" },
        { no: 16, classYr: "4CL", name: "BERGONIO", coy: "D", condition: "HIP SPRAIN", start: "-", release: "08 October 2026" },
        { no: 17, classYr: "4CL", name: "BARROTA", coy: "H", condition: "LEFT KNEE SPRAIN (FAD EXTEND)", start: "-", release: "08 October 2026" },
        { no: 18, classYr: "3CL", name: "GEVERO", coy: "C", condition: "PELVIC INSTABILITY, LOW BACK PAIN", start: "30 September 2026", release: "07 October 2026" },
        { no: 19, classYr: "3CL", name: "NOBELO", coy: "G", condition: "FUNGAL INFECTION", start: "01 October 2026", release: "04 October 2026" },
        { no: 20, classYr: "4CL", name: "LORENZO", coy: "C", condition: "KNEE PAIN", start: "01 October 2026", release: "06 October 2026" },
        { no: 21, classYr: "2CL", name: "VICENTE", coy: "B", condition: "T/C ATOPIC DERMATITIS", start: "02 October 2026", release: "09 October 2026" },
        { no: 22, classYr: "2CL", name: "AGUSTIN", coy: "H", condition: "MYOPIA, OS", start: "02 October 2026", release: "09 October 2026" },
        { no: 23, classYr: "4CL", name: "CAIRO", coy: "G", condition: "ANTERIOR EPISTAXIS", start: "02 October 2026", release: "09 October 2026" },
        { no: 24, classYr: "4CL", name: "RACELIS", coy: "C", condition: "POST OPERATION SURGERY OF HERNIA", start: "17 September 2026", release: "17 October 2026" },
        { no: 25, classYr: "4CL", name: "ARNAIZ", coy: "D", condition: "ACUTE OTITIS MEDIA, AD, URTI", start: "02 October 2026", release: "09 October 2026" },
        { no: 26, classYr: "1CL", name: "RANA", coy: "C", condition: "RIGHT SHOULDER DISLOCATION", start: "17 September 2026", release: "14 October 2026" },
        { no: 27, classYr: "1CL", name: "ROSARIO", coy: "E", condition: "RIGHT WRIST INCOMPLETE FRACTURE", start: "16 September 2026", release: "07 October 2026" },
        { no: 28, classYr: "1CL", name: "RAMIREZ", coy: "E", condition: "SHOULDER DISLOCATION", start: "18 September 2026", release: "07 October 2026" },
        { no: 29, classYr: "1CL", name: "MACARAYA", coy: "F", condition: "BROKEN HAND BONE", start: "15 September 2026", release: "14 October 2026" },
        { no: 30, classYr: "1CL", name: "BETITA", coy: "F", condition: "LOWER BACK PAIN SYNDROME", start: "01 October 2026", release: "13 October 2026" },
        { no: 31, classYr: "1CL", name: "DE VENANCIO", coy: "G", condition: "FRACTURE", start: "22 September 2026", release: "09 October 2026" },
        { no: 32, classYr: "1CL", name: "SABILLA", coy: "H", condition: "ANKLE SPRAIN", start: "24 September 2026", release: "07 October 2026" },
        { no: 33, classYr: "1CL", name: "MANCE", coy: "A", condition: "MRI RESULT", start: "30 September 2026", release: "UNDETERMINED" },
        { no: 34, classYr: "2CL", name: "LABARINTO", coy: "D", condition: "LOWER BACK PAIN (OBSERVATION)", start: "05 October 2026", release: "08 October 2026" },
        { no: 35, classYr: "4CL", name: "MARCELO", coy: "G", condition: "DYSPEPSIA W/ ACID DISORDER", start: "05 October 2026", release: "07 October 2026" },
        { no: 36, classYr: "4CL", name: "TENA", coy: "H", condition: "LEFT SHOULDER SPRAIN", start: "05 October 2026", release: "07 October 2026" },
        { no: 37, classYr: "4CL", name: "DERIQUITO", coy: "H", condition: "RIGHT SHOULDER SPRAIN", start: "05 October 2026", release: "07 October 2026" },
        { no: 38, classYr: "3CL", name: "CASIPE", coy: "D", condition: "CARBUNCLE", start: "05 October 2026", release: "10 October 2026" },
        { no: 39, classYr: "3CL", name: "FERRERAS", coy: "C", condition: "PLANTAR WART", start: "05 October 2026", release: "07 October 2026" },
        { no: 40, classYr: "3CL", name: "REGANIT", coy: "G", condition: "ANKLE SPRAIN", start: "06 October 2026", release: "12 October 2026" },
        { no: 41, classYr: "4CL", name: "NADIAHAN", coy: "D", condition: "HERNIA", start: "06 October 2026", release: "20 October 2026" },
        { no: 42, classYr: "4CL", name: "ESLOPAR", coy: "H", condition: "VARICOCELE", start: "06 October 2026", release: "20 October 2026" }
      ],
      // SIQ (2 Cadets)
      siqList: [
        { no: 1, classYr: "2CL", name: "CASINO", coy: "H", reason: "TOOTH EXTRACTION", start: "06 October 2026", release: "08 October 2026" },
        { no: 2, classYr: "2CL", name: "BAYOT", coy: "C", reason: "TOOTH EXTRACTION", start: "06 October 2026", release: "09 October 2026" }
      ],
      // FDPSH (4 Cadets)
      fdpshList: [
        { no: 1, classYr: "2CL", name: "MIRO", coy: "G", reason: "UNDER OBSERVATION", start: "-", release: "UNDETERMINED" },
        { no: 2, classYr: "4CL", name: "SALES", coy: "B", reason: "POST OPERATION", start: "01 October 2026", release: "UNDETERMINED" },
        { no: 3, classYr: "4CL", name: "PAREN", coy: "H", reason: "CHICKEN POX", start: "02 October 2026", release: "UNDETERMINED" },
        { no: 4, classYr: "2CL", name: "FULO", coy: "G", reason: "HIGH FEVER WITH RASHES", start: "28 September 2026", release: "UNDETERMINED" }
      ],
      // VLUNA (4 Cadets)
      vlunaList: [
        { no: 1, classYr: "4CL", name: "PRIETO", coy: "E", reason: "UNDER OBSERVATION", start: "16 September 2026", release: "UNDETERMINED" },
        { no: 2, classYr: "3CL", name: "LOVENDINO", coy: "E", reason: "UNDER OBSERVATION", start: "14 June 2026", release: "UNDETERMINED" },
        { no: 3, classYr: "4CL", name: "ADOBE", coy: "F", reason: "T/C ADJUSTMENT DISORDER", start: "30 September 2026", release: "UNDETERMINED" },
        { no: 4, classYr: "4CL", name: "FAUSTINO", coy: "H", reason: "UPPER RESPIRATORY TRACT (FOR NP EVALUATION)", start: "10 September 2026", release: "UNDETERMINED" }
      ],
      // HOLDING CENTER (30 Cadets)
      holdingCenterList: [
        { no: 1, classYr: "2CL", name: "CASTRO", coy: "A", reason: "ALLEGED MALTREATMENT", start: "25 August 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 2, classYr: "2CL", name: "FOCASAN", coy: "A", reason: "ALLEGED MALTREATMENT", start: "23 June 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 3, classYr: "2CL", name: "SANGALANG", coy: "A", reason: "UNAUTHORIZED PUNISHMENT", start: "09 July 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 4, classYr: "2CL", name: "MAMA", coy: "B", reason: "ALLEGED MALTREATMENT", start: "25 August 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 5, classYr: "2CL", name: "QUEMADO", coy: "B", reason: "ALLEGED MALTREATMENT", start: "25 August 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 6, classYr: "4CL", name: "AGNES", coy: "B", reason: "RESIGNING", start: "28 August 2026", barracks: "ARMY DETACHMENT" },
        { no: 7, classYr: "3CL", name: "ALCANTARA", coy: "D", reason: "ACL RECONSTRUCTION SURGERY", start: "28 August 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 8, classYr: "1CL", name: "SALAZAR", coy: "E", reason: "HONOR CASE", start: "22 May 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 9, classYr: "1CL", name: "SATURNINO", coy: "E", reason: "RESIGNING", start: "10 June 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 10, classYr: "2CL", name: "LOMUGDANG", coy: "E", reason: "HONOR CASE", start: "22 May 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 11, classYr: "2CL", name: "GENTOLEO", coy: "G", reason: "ALLEGED MALTREATMENT", start: "24 August 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 12, classYr: "2CL", name: "TAMBADOC", coy: "G", reason: "ALLEGED MALTREATMENT", start: "24 August 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 13, classYr: "3CL", name: "SILVA", coy: "G", reason: "HONOR CASE", start: "10 September 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 14, classYr: "2CL", name: "BAUTISTA", coy: "H", reason: "HONOR CASE", start: "27 August 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 15, classYr: "2CL", name: "PENALOZA", coy: "H", reason: "ALLEGED MALTREATMENT", start: "27 August 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 16, classYr: "2CL", name: "TANONGON", coy: "H", reason: "ALLEGED MALTREATMENT", start: "24 August 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 17, classYr: "2CL", name: "CRUCILLO", coy: "H", reason: "ALLEGED MALTREATMENT", start: "23 September 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 18, classYr: "2CL", name: "CARIASO", coy: "D", reason: "UNDER INVESTIGATION", start: "17 September 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 19, classYr: "2CL", name: "FALCON", coy: "D", reason: "UNDER INVESTIGATION", start: "17 September 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 20, classYr: "2CL", name: "TAGLE", coy: "D", reason: "UNDER INVESTIGATION", start: "17 September 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 21, classYr: "2CL", name: "DERILO", coy: "D", reason: "UNDER INVESTIGATION", start: "17 September 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 22, classYr: "2CL", name: "BINWAG", coy: "B", reason: "UNDER INVESTIGATION", start: "17 September 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 23, classYr: "2CL", name: "ADAY", coy: "B", reason: "UNDER INVESTIGATION", start: "17 September 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 24, classYr: "4CL", name: "SISON", coy: "C", reason: "INFLICTING INJURY", start: "16 September 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 25, classYr: "4CL", name: "DELIVA", coy: "C", reason: "UNDER INVESTIGATION", start: "16 September 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 26, classYr: "4CL", name: "LACTUD", coy: "E", reason: "ALLEGED MALTREATMENT", start: "-", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 27, classYr: "3CL", name: "PIZON", coy: "A", reason: "UNDER INVESTIGATION (MALTREATMENT)", start: "-", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 28, classYr: "1CL", name: "BERNARDO", coy: "B", reason: "HONOR CASE", start: "25 September 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 29, classYr: "1CL", name: "ALBERTO", coy: "E", reason: "ALLEGED MALTREATMENT", start: "04 July 2026", barracks: "1ST FLOOR FLORENDO HALL" },
        { no: 30, classYr: "1CL", name: "ESTEBAN", coy: "H", reason: "ALLEGED COUNTENANCING MALTREATMENT", start: "23 September 2026", barracks: "1ST FLOOR FLORENDO HALL" }
      ],
      // CLEARING-OUT (2 Cadets)
      clearingOutList: [
        { no: 1, classYr: "2CL", name: "MARCELO", coy: "C", reason: "CLEARING OUT", start: "16 August 2026", remarks: "1ST FLOOR FLORENDO HALL" },
        { no: 2, classYr: "4CL", name: "URSABIA", coy: "C", reason: "VARICOCELE (RESIGNING)", start: "01 October 2026", remarks: "FDPSH" }
      ],
      // CLEARING-IN (9 Cadets)
      clearingInList: [
        { no: 1, classYr: "2CL", name: "DACWAG", coy: "-", reason: "CLEARING-IN", start: "23 August 2026", remarks: "4TH FLOOR REGIS HALL" },
        { no: 2, classYr: "2CL", name: "DELOS REYES", coy: "-", reason: "CLEARING-IN", start: "23 August 2026", remarks: "1ST FLOOR REGIS HALL" },
        { no: 3, classYr: "2CL", name: "BLANCO", coy: "-", reason: "CLEARING-IN", start: "23 August 2026", remarks: "1ST FLOOR REGIS HALL" },
        { no: 4, classYr: "2CL", name: "BOTIGAN", coy: "-", reason: "CLEARING-IN", start: "23 August 2026", remarks: "1ST FLOOR REGIS HALL" },
        { no: 5, classYr: "3CL", name: "GUBANTES", coy: "-", reason: "CLEARING-IN", start: "23 August 2026", remarks: "3RD FLOOR ENRILE HALL" },
        { no: 6, classYr: "3CL", name: "MOJICA", coy: "-", reason: "CLEARING-IN", start: "23 August 2026", remarks: "1ST FLOOR ENRILE HALL" },
        { no: 7, classYr: "3CL", name: "ALAUYA", coy: "-", reason: "CLEARING-IN", start: "23 August 2026", remarks: "1ST FLOOR ENRILE HALL" },
        { no: 8, classYr: "3CL", name: "CARIAGA", coy: "-", reason: "CLEARING-IN", start: "23 August 2026", remarks: "3RD FLOOR ENRILE HALL" },
        { no: 9, classYr: "1CL", name: "OLALO", coy: "-", reason: "CLEARING-IN", start: "23 August 2026", remarks: "3RD FLOOR ENRILE HALL" }
      ],
      // GHQ (1 Cadet)
      ghqList: [
        { no: 1, classYr: "4CL", name: "TENORIO", coy: "B", reason: "LIAISON / UNDETERMINED", start: "04 November 2025", remarks: "AFP GENERAL HEADQUARTERS" }
      ],
      // PMA STOCKADE (2 Cadets)
      stockadeList: [
        { no: 1, classYr: "1CL", name: "LAUS", coy: "-", reason: "STOCKADE (GAD OFFENSE)", start: "21 July 2026", remarks: "PMA STOCKADE" },
        { no: 2, classYr: "1CL", name: "SALON", coy: "G", reason: "STOCKADE (FDPSH)(GAD OFFENSE)", start: "27 July 2026", remarks: "PMA STOCKADE" }
      ],
      signOff: {
        preparedBy: "JHOPRILYN S MANGAGOM C-27151, CDT LT 1CL 'D' CO CCAFP, Officer-of-the-Day",
        checkedBy: "CARL BENEDICT B ACOSTA C-26007, CDT CPT 1CL 'F' CO CCAFP, AC of RS for Personnel, R1"
      }
    },

    // -----------------------------------------------------------------------
    // 4. SCHEDULE OF CALLS - Daily Routine for 07 October 2026
    // -----------------------------------------------------------------------
    scheduleOfCalls: {
      date: "07 October 2026",
      officers: {
        oc: "MAJ JAMES A MARTINEZ PA",
        aoc: "MAJ PHILIP JOHN U BUGAYONG PA",
        uniform: "DA w/ CJ"
      },
      guardRoster: [
        { post: "OD (Officer of the Day)", postCode: "OD", posted: "1CL MANGAGOM 'D'", incoming: "1CL PLANTAR 'H'" },
        { post: "OG1 (Officer of the Guard 1)", postCode: "OG1", posted: "2CL CERVAS 'A'", incoming: "2CL CARTAGENAS 'A'" },
        { post: "OG2 (Officer of the Guard 2)", postCode: "OG2", posted: "3CL VALENZUELA 'E'", incoming: "3CL AGGABAO 'E'" },
        { post: "SG1 (Sergeant of the Guard 1)", postCode: "SG1", posted: "3CL UNDANG 'G'", incoming: "3CL UMALI 'F'" },
        { post: "SG2 (Sergeant of the Guard 2)", postCode: "SG2", posted: "4CL GUTIERREZ 'E'", incoming: "-" },
        { post: "RCCQ (Regt Cdt-in-Charge of Quarters)", postCode: "RCCQ", posted: "3CL TAGAPAN 'F'", incoming: "3CL ABONITA 'D'" },
        { post: "ARCCQ (Asst Regt Cdt-in-Charge)", postCode: "ARCCQ", posted: "4CL TALLONGON 'F'", incoming: "4CL" },
        { post: "CCHC (Cdt-in-Charge of Holding Ctr)", postCode: "CCHC", posted: "3CL PENAREDONDO 'B'", incoming: "3CL TRINIDAD 'F'" },
        { post: "ACCHC (Asst Cdt-in-Charge of HC)", postCode: "ACCHC", posted: "3CL TUBERA 'E'", incoming: "3CL TUMAPANG 'E'" },
        { post: "CAL 1 (Cadet Asst for Logistics 1)", postCode: "CAL 1", posted: "1CL AMANGAN 'A'", incoming: "1CL LATORRE 'E'" },
        { post: "CAL 2 (Cadet Asst for Logistics 2)", postCode: "CAL 2", posted: "2CL CASAMAYOR 'B'", incoming: "2CL DE LEON 'B'" },
        { post: "CAMO 1 (Cadet Asst Mess Officer 1)", postCode: "CAMO 1", posted: "1CL UNILONGO 'G'", incoming: "1CL AGUSTIN 'D'" },
        { post: "CAMO 2 (Cadet Asst Mess Officer 2)", postCode: "CAMO 2", posted: "2CL CELESTIAL 'B'", incoming: "2CL CANSINO 'H'" },
        { post: "CAMOD 1 (Cadet Asst Mess OD 1)", postCode: "CAMOD 1", posted: "1CL ATIWEN 'A'", incoming: "1CL SARMIENTO 'B'" },
        { post: "CAMOD 2 (Cadet Asst Mess OD 2)", postCode: "CAMOD 2", posted: "2CL DABALOS 'D'", incoming: "2CL COLLADO 'C'" },
        { post: "HCFI (Honor Committee First Inspector)", postCode: "HCFI", posted: "1CL UY 'F'", incoming: "1CL MOLO 'B'" },
        { post: "CEMA (Cadet Emergency Medical Asst)", postCode: "CEMA", posted: "1CL ABBAS 'F'", incoming: "1CL ADORACION 'G'" }
      ],
      calls: [
        { time: "0400", activity: "Reveille / Preparation for Duties", uniform: "-", formation: "-" },
        { time: "0430", activity: "FC BPWC Participants’ Practice", uniform: "BDU", formation: "IFFH" },
        { time: "0430", activity: "FC Mr. and Ms. CCAFP Duty", uniform: "AU", formation: "-" },
        { time: "0445", activity: "FC 1st Phase BBEAL Participants Practice", uniform: "-", formation: "-" },
        { time: "0450", activity: "Early Mess for Slow Driller and Silent Drill of Class 2029", uniform: "SDPU", formation: "IFYH" },
        { time: "0450", activity: "IF Practice", uniform: "-", formation: "-" },
        { time: "0450", activity: "Early Mess for Cadet Combo", uniform: "GAU", formation: "-" },
        { time: "0500", activity: "FC Flag Raising for Cadet-in-Charge of Quarters w/ Selected Color Sergeant", uniform: "DA w/ CJ w/ WB & HG", formation: "GR" },
        { time: "0510", activity: "FC Team Dagohoy Duty / IF Late Mess", uniform: "BDU w/ Chest Rig", formation: "-" },
        { time: "0520", activity: "FC PRP Duty", uniform: "AU", formation: "JH" },
        { time: "0530", activity: "FC Morning Mess", uniform: "DA w/ CJ", formation: "QA" },
        { time: "0620", activity: "FC Late Mess for Cadets from Holding Center", uniform: "DA w/ CJ", formation: "IFFH" },
        { time: "0620", activity: "FC Late Mess for PMAICC Committee Members", uniform: "-", formation: "-" },
        { time: "0620", activity: "FC Late Mess for Paskuhan Planning Committee Members", uniform: "-", formation: "-" },
        { time: "0620", activity: "FC Late Mess for 1st Phase BBEAL Participants", uniform: "-", formation: "-" },
        { time: "0620", activity: "FC Late Mess for Peemayer", uniform: "-", formation: "-" },
        { time: "0620", activity: "FC Late Mess for Selected Honor Committee Members Who Attended Workout", uniform: "-", formation: "-" },
        { time: "0650", activity: "Police Call", uniform: "-", formation: "IB" },
        { time: "0710", activity: "FC 1st Period Class", uniform: "DA w/ CJ / GAU", formation: "IFMH / QAFRH" },
        { time: "0835", activity: "FC 2nd Period Class", uniform: "-", formation: "-" },
        { time: "1000", activity: "FC 3rd Period Class", uniform: "-", formation: "-" },
        { time: "1140", activity: "FC Noon Mess", uniform: "DA", formation: "IFYH" },
        { time: "1140", activity: "FC Noon Mess for Cadets from Holding Center", uniform: "DA w/ CJ", formation: "Guardroom" },
        { time: "1240", activity: "FC 4th Period Class", uniform: "DA / GAU", formation: "IFMH / QAFRH" },
        { time: "1405", activity: "FC 5th Period Class", uniform: "-", formation: "-" },
        { time: "1530", activity: "FC Sick Call", uniform: "DA w/ CJ", formation: "Guardroom" },
        { time: "1530-1615", activity: "FC Student-Faculty Consultation", uniform: "-", formation: "RA" },
        { time: "1550", activity: "FC Selected 4CL for Intake Interview", uniform: "-", formation: "Guardroom" },
        { time: "1550", activity: "FC Selected 50 Cadets from Bravo Company for PhilHealth Duty", uniform: "-", formation: "IFFH" },
        { time: "1600", activity: "FC 2CL Cadets PABT / BMI Screening", uniform: "FDU", formation: "IFJH" },
        { time: "1620", activity: "FC Selected Honor Committee Workout", uniform: "SU", formation: "Guardroom" },
        { time: "1620", activity: "FC CAMP Proficiency Period", uniform: "RU", formation: "IFNS" },
        { time: "1620", activity: "FC 1st Phase BBEAL Participants Practice", uniform: "AU", formation: "-" },
        { time: "1620", activity: "FC Volleyball Corps Squad Practice", uniform: "-", formation: "-" },
        { time: "1620", activity: "FC Taekwondo Corps Squad Practice", uniform: "GAU", formation: "-" },
        { time: "1630", activity: "FC Flag Retreat for Cadet-in-Charge of Quarters w/ Selected Color Sergeant", uniform: "DA w/ CJ w/ WB & HG", formation: "Guardroom" },
        { time: "1710", activity: "FC Late Mess for Cadets from Holding Center", uniform: "DA w/ CJ", formation: "-" },
        { time: "1730-1845", activity: "FC Flexible Evening Mess for Upperclass Cadets", uniform: "RU", formation: "YH" },
        { time: "1730", activity: "FC 1CL and 2CL Midshipmen Duty", uniform: "SU", formation: "IFLH" },
        { time: "1745", activity: "FC Evening Mess for 4CL Cadets and Detailed Upperclass", uniform: "-", formation: "IFYH" },
        { time: "1830", activity: "FC Guard Mounting", uniform: "RU", formation: "-" },
        { time: "1900", activity: "ECTQ (Evening Call to Quarters)", uniform: "Study", formation: "-" },
        { time: "2130", activity: "TATTOO", uniform: "-", formation: "-" },
        { time: "2135", activity: "FC Workouts (Honor Committee, PMAICC, Peemayer, S6, Combo)", uniform: "SU / GAU", formation: "Guardroom" },
        { time: "2200", activity: "TAPS", uniform: "-", formation: "-" },
        { time: "2230", activity: "Completeness Inspection", uniform: "DA w/ CJ", formation: "Quarters" }
      ],
      changes: [
        { time: "1600H", activity: "FC ADFA Cadets Formation & Entrucking", uniform: "CA", formation: "GR" },
        { time: "1600H", activity: "FC Basketball Corps Squad Entrucking", uniform: "CJS", formation: "GR" },
        { time: "1620H", activity: "Archery Corps Squad Practice", uniform: "AU", formation: "JH" },
        { time: "1730H", activity: "FC Early Mess for Paskuhan Participants", uniform: "SU", formation: "IFYH" },
        { time: "1830H", activity: "FC Study Period for Paskuhan Participants", uniform: "SU", formation: "IB" },
        { time: "1910H", activity: "FC Paskuhan Participants Workout", uniform: "GAU", formation: "GR" }
      ]
    },

    // -----------------------------------------------------------------------
    // 5. REGIMENTAL STAFF 2027 - CCAFP Regimental Commander & Staff
    // -----------------------------------------------------------------------
    regimentStaff2027: {
      branchSummary: { army: 9, aero: 9, navy: 9, total: 27 },
      genderSummary: { male: 17, female: 10, total: 27 },
      commandSection: [
        { role: "REGIMENTAL COMMANDER", name: "CDT F/CPT 1CL JOSHUA J MASCULINO", serial: "C-27158", coy: "'G' CO CCAFP", rank: "CDT F/CPT 1CL" },
        { role: "DEPUTY REGIMENTAL COMMANDER", name: "CDT CPT 1CL FAROUK S MACARAYA", serial: "C-27145", coy: "'F' CO CCAFP", rank: "CDT CPT 1CL" },
        { role: "CHIEF OF REGIMENTAL STAFF", name: "CDT CPT 1CL JAZEL D LIBATON", serial: "C-27271", coy: "'C' CO CCAFP", rank: "CDT CPT 1CL" }
      ],
      coordinatingStaff: [
        { code: "R1", role: "ASST CHIEF OF REGIMENTAL STAFF FOR PERSONNEL", name: "CDT CPT 1CL CARL BENEDICT B ACOSTA", serial: "C-26007", coy: "'F' CO CCAFP" },
        { code: "R2", role: "ASST CHIEF OF REGIMENTAL STAFF FOR INTELLIGENCE", name: "CDT CPT 1CL ALDRIN JAY G HUSSIN", serial: "C-27270", coy: "'C' CO CCAFP" },
        { code: "R3", role: "ASST CHIEF OF REGIMENTAL STAFF FOR OPERATIONS", name: "CDT CPT 1CL MARC OLIVER M NABABLIT", serial: "-", coy: "'G' CO CCAFP" },
        { code: "R4", role: "ASST CHIEF OF REGIMENTAL STAFF FOR LOGISTICS", name: "CDT CPT 1CL LAKEISHA FELICE V LEVISTE", serial: "C-27138", coy: "'B' CO CCAFP" },
        { code: "R5", role: "ASST CHIEF OF REGIMENTAL STAFF FOR PLANS AND PROGRAMS", name: "CDT CPT 1CL DENNIS MARIE P MARTINEZ", serial: "C-27157", coy: "'B' CO CCAFP" },
        { code: "R6", role: "ASST CHIEF OF REGIMENTAL STAFF FOR CEIS", name: "CDT CPT 1CL JERIZ BERNARD D CATACUTAN", serial: "C-27052", coy: "'F' CO CCAFP" },
        { code: "R7", role: "ASST CHIEF OF REGIMENTAL STAFF FOR CMO", name: "CDT CPT 1CL CHRISSALYN B MELISA", serial: "C-27160", coy: "'B' CO CCAFP" },
        { code: "R8", role: "ASST CHIEF OF REGIMENTAL STAFF FOR EDUCATION AND TRAINING", name: "CDT CPT 1CL JOHN RAVEN G DELA PEÑA", serial: "C-27080", coy: "'C' CO CCAFP" },
        { code: "R10", role: "ASST CHIEF OF REGIMENTAL STAFF FOR FINANCIAL MANAGEMENT", name: "CDT CPT 1CL DIANNE B EVANGELISTA", serial: "C-27095", coy: "'B' CO CCAFP" }
      ],
      specialStaff: [
        { no: 1, role: "REGIMENTAL ADJUTANT", name: "CDT CPT 1CL JOSE MIGUEL S PERCIL", serial: "C-27189", coy: "'D' CO CCAFP" },
        { no: 2, role: "HONOR COMMITTEE CHAIRPERSON", name: "CDT CPT 1CL RALF ANGELO G BALDEMOR", serial: "C-26041", coy: "'A' CO CCAFP" },
        { no: 3, role: "CADET CONDUCT POLICY BOARD CHAIRPERSON", name: "CDT CPT 1CL APRIL JOY C GEROLA", serial: "C-27112", coy: "'A' CO CCAFP" },
        { no: 4, role: "REGIMENTAL MESS OFFICER", name: "CDT CPT 1CL DENIS JOYCE C BUSTILLO", serial: "C-27039", coy: "'C' CO CCAFP" },
        { no: 5, role: "REGIMENTAL GENDER AWARENESS & DEVELOPMENT OFFICER", name: "CDT CPT 1CL ERMALYN G MOLINA", serial: "C-27166", coy: "'H' CO CCAFP" },
        { no: 6, role: "REGIMENTAL SPIRITUAL TRAINING & DEVELOPMENT OFFICER", name: "CDT CPT 1CL LEA CAMILLE S MONTENEGRO", serial: "C-27168", coy: "'D' CO CCAFP" },
        { no: 7, role: "REGIMENTAL CADET ACQUISITION OFFICER", name: "CDT CPY 1CL BRYAN JAMES R CABIGO", serial: "C-26072", coy: "'D' CO CCAFP" },
        { no: 8, role: "REGIMENTAL RESPONSIBLE SUPPLY OFFICER", name: "CDT CPT 1CL CARLO JOSEPH G MAGAYANES", serial: "C-26226", coy: "'A' CO CCAFP" },
        { no: 9, role: "REGIMENTAL ATHLETIC OFFICER", name: "CDT CPT 1CL MICHAEL RAY V CUTOR", serial: "C-27066", coy: "'G' CO CCAFP" },
        { no: 10, role: "REGIMENTAL SAFETY OFFICER", name: "CDT CPT 1CL JERKIN P RAÑA", serial: "C-27203", coy: "'C' CO CCAFP" },
        { no: 11, role: "REGIMENTAL ACADEMIC OFFICER", name: "CDT CPT 1CL MARTIN SIMON S PALERO", serial: "C-27274", coy: "'A' CO CCAFP" },
        { no: 12, role: "REGIMENTAL MILITARY TRAINING OFFICER", name: "CDT CPT 1CL PATRICK JOHN D MANCE", serial: "C-25207", coy: "'A' CO CCAFP" },
        { no: 13, role: "REGIMENTAL PUBLIC INFORMATION OFFICER", name: "CDT CPT 1CL ZYNETTE MAINSLEY B GARAY", serial: "C-27104", coy: "'C' CO CCAFP" },
        { no: 14, role: "REGIMENTAL VALUES ETHICS & STANDARDS OFFICER", name: "CDT CPT 1CL MAX ANTHONY T ROSARIO", serial: "C-26296", coy: "'E' CO CCAFP" },
        { no: 15, role: "REGIMENTAL SERGEANT MAJOR", name: "CDT SGT MAJ 2CL FIONA LISA C DEMARAYE", serial: "C-27082", coy: "'H' CO CCAFP" }
      ],
      ncos: [
        { no: 1, role: "REGIMENTAL PERSONNEL NCO", name: "CDT S/SGT 2CL JOHN ROFEL F DELA PEÑA", serial: "C-28115", coy: "'E' CO CCAFP" },
        { no: 2, role: "REGIMENTAL INTELLIGENCE NCO", name: "CDT S/SGT 2CL", serial: "-", coy: "CO CCAFP" },
        { no: 3, role: "REGIMENTAL OPERATIONS NCO", name: "CDT S/SGT 2CL ROY ADRIEL J BONGAO", serial: "C-28060", coy: "'B' CO CCAFP" },
        { no: 4, role: "REGIMENTAL SUPPLY SERGEANT", name: "CDT S/SGT 2CL JOHN KENTH B ARINO", serial: "C-28036", coy: "'F' CO CCAFP" },
        { no: 5, role: "REGIMENTAL FACILITY NCO", name: "CDT S/SGT 2CL RIGEL KENT P ALBURO", serial: "C-27005", coy: "'H' CO CCAFP" },
        { no: 6, role: "REGIMENTAL FIREPOWER NCO", name: "CDT S/SGT 2CL MICHAEL VINCENT DC DE VENANCIO", serial: "C-28113", coy: "'E' CO CCAFP" },
        { no: 7, role: "REGIMENTAL CADET EQUIPMENT NCO", name: "CDT S/SGT 2CL JOHN PATRICK M RODRIGUEZ", serial: "C-28298", coy: "'G' CO CCAFP" },
        { no: 8, role: "REGIMENTAL PLANS AND PROGRAMS NCO", name: "CDT S/SGT 2CL CATHERINE ALMIRA KIDDA C MALOMAY", serial: "C-28216", coy: "'A' CO CCAFP" },
        { no: 9, role: "REGIMENTAL CEIS NCO", name: "CDT S/SGT JOHNREY S TIMOG", serial: "C-28331", coy: "'A' CO CCAFP" },
        { no: 10, role: "REGIMENTAL CMO NCO", name: "CDT S/SGT 2CL IRAH MAE G DUEÑAS", serial: "C-27127", coy: "'F' CO CCAFP" },
        { no: 11, role: "REGIMENTAL TRAINING AND EDUCATION NCO", name: "CDT S/SGT 2CL CHRISTIAN DULOS", serial: "C-28130", coy: "'A' CO CCAFP" },
        { no: 12, role: "REGIMENTAL FINANCE SERGEANT", name: "CDT S/SGT 2CL PHROILEEN RAVE F AGOD", serial: "C-28009", coy: "'D' CO CCAFP" },
        { no: 13, role: "REGIMENTAL ATHLETIC SERGEANT", name: "CDT SGT 2CL JUSTINE M GUIEB", serial: "C-28171", coy: "'F' CO CCAFP" }
      ]
    }
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
      // Bust browser & intermediary cache with timestamp parameter
      const cacheBustUrl = url.includes("?") 
        ? `${url}&_t=${Date.now()}` 
        : `${url}?_t=${Date.now()}`;
      const response = await fetch(cacheBustUrl, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const text = await response.text();
      return SheetSyncManager.parseCSV(text);
    } catch (err) {
      console.warn(`Failed to fetch sheet at ${url}:`, err);
      return null;
    }
  }

  parseScheduleOfCalls(rows) {
    if (!rows || rows.length === 0) return null;

    let date = "07 October 2026";
    let oc = "MAJ JAMES A MARTINEZ PA";
    let aoc = "MAJ PHILIP JOHN U BUGAYONG PA";
    let uniform = "DA w/ CJ";
    const guardRoster = [];
    const calls = [];
    const changes = [];

    let isChangesSection = false;
    let inCallsSection = false;

    const postNameMap = {
      "OD": "OD (Officer of the Day)",
      "OG1": "OG1 (Officer of the Guard 1)",
      "OG2": "OG2 (Officer of the Guard 2)",
      "SG1": "SG1 (Sergeant of the Guard 1)",
      "SG2": "SG2 (Sergeant of the Guard 2)",
      "RCCQ": "RCCQ (Regt Cdt-in-Charge of Quarters)",
      "ARCCQ": "ARCCQ (Asst Regt Cdt-in-Charge)",
      "CCHC": "CCHC (Cdt-in-Charge of Holding Ctr)",
      "ACCHC": "ACCHC (Asst Cdt-in-Charge of HC)",
      "CAL 1": "CAL 1 (Cadet Asst for Logistics 1)",
      "CAL1": "CAL 1 (Cadet Asst for Logistics 1)",
      "CAL 2": "CAL 2 (Cadet Asst for Logistics 2)",
      "CAL2": "CAL 2 (Cadet Asst for Logistics 2)",
      "CAMO 1": "CAMO 1 (Cadet Asst Mess Officer 1)",
      "CAMO1": "CAMO 1 (Cadet Asst Mess Officer 1)",
      "CAMO 2": "CAMO 2 (Cadet Asst Mess Officer 2)",
      "CAMO2": "CAMO 2 (Cadet Asst Mess Officer 2)",
      "CAMOD 1": "CAMOD 1 (Cadet Asst Mess OD 1)",
      "CAMOD1": "CAMOD 1 (Cadet Asst Mess OD 1)",
      "CAMOD 2": "CAMOD 2 (Cadet Asst Mess OD 2)",
      "CAMOD2": "CAMOD 2 (Cadet Asst Mess OD 2)",
      "HCFI": "HCFI (Honor Committee First Inspector)",
      "CEMA": "CEMA (Cadet Emergency Medical Asst)"
    };

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length === 0) continue;
      const fullRowText = row.join(" ").trim();
      if (!fullRowText) continue;

      // Check for date in early rows
      const dateMatch = fullRowText.match(/(\d{1,2}\s+[A-Za-z]+\s+\d{4})/);
      if (dateMatch && i < 4 && !fullRowText.includes("MAJ") && !fullRowText.includes("OC:")) {
        date = dateMatch[1];
      }

      // Check for OC, AOC, Uniform
      for (const cell of row) {
        const trimmed = cell.trim();
        if (/^OC\s*:\s*/i.test(trimmed)) {
          oc = trimmed.replace(/^OC\s*:\s*/i, "").trim();
        } else if (/^AOC\s*:\s*/i.test(trimmed)) {
          aoc = trimmed.replace(/^AOC\s*:\s*/i, "").trim();
        } else if (/^Uniform(\s+of\s+the\s+Day)?\s*:\s*/i.test(trimmed)) {
          uniform = trimmed.replace(/^Uniform(\s+of\s+the\s+Day)?\s*:\s*/i, "").trim();
        }
      }

      // Section triggers
      if (/^CHANGES\b/i.test(row[0]?.trim() || fullRowText)) {
        isChangesSection = true;
        continue;
      }

      // Check for guard detail posts
      if (row.length > 6) {
        const post = row[6]?.trim();
        const posted = row[5]?.trim() || "";
        const incoming = row[7]?.trim() || "";
        if (post && !["POSTED", "INCOMING", "POST", "Guard Detail Post", "UNIFORM"].includes(post)) {
          guardRoster.push({
            post: postNameMap[post] || post,
            postCode: post,
            posted: posted || "-",
            incoming: incoming || "-"
          });
        }
      }

      if (/^TIME\b/i.test(row[0]?.trim())) {
        inCallsSection = true;
        continue;
      }

      if (isChangesSection) {
        const time = row[0]?.trim() || "";
        const act = row[1]?.trim() || "";
        const uni = row[2]?.trim() || "-";
        const form = row[3]?.trim() || "-";
        if (time || act) {
          changes.push({
            time: time ? (time.endsWith("H") ? time : `${time}H`) : "1600H",
            activity: act,
            uniform: uni,
            formation: form
          });
        }
      } else if (inCallsSection) {
        const time = row[0]?.trim() || "";
        const act = row[1]?.trim() || "";
        const uni = row[2]?.trim() || "-";
        const form = row[3]?.trim() || "-";
        if (time || act) {
          calls.push({
            time: time,
            activity: act,
            uniform: uni,
            formation: form
          });
        }
      }
    }

    return {
      date: date || "07 October 2026",
      officers: { oc, aoc, uniform },
      guardRoster: guardRoster.length > 0 ? guardRoster : (CCAFP_CONFIG.s1Data?.scheduleOfCalls?.guardRoster || []),
      calls: calls.length > 0 ? calls : (CCAFP_CONFIG.s1Data?.scheduleOfCalls?.calls || []),
      changes: changes.length > 0 ? changes : (CCAFP_CONFIG.s1Data?.scheduleOfCalls?.changes || [])
    };
  }
}

if (typeof window !== "undefined") {
  window.CCAFP_CONFIG = CCAFP_CONFIG;
  window.COUNCIL_SHEET_URLS = COUNCIL_SHEET_URLS;
  window.SheetSyncManager = SheetSyncManager;
}
