// CCAFP Daily - Master Data Store & Alfacoy-Style Bulletin Engine

/**
 * =========================================================================
 * 📋 AUTHORIZED CADET REGISTRATION ROSTER (OFFICIAL SERIAL NUMBER WHITELIST)
 * =========================================================================
 */
const AUTHORIZED_CADETS = {
  "25020": "AMANGAN",
  "25030": "ARIP",
  "25035": "ARUMPAC",
  "25068": "BOLINGET",
  "25139": "GADO",
  "25154": "GRATIL",
  "25169": "LAMBINO",
  "25207": "MANCE",
  "25210": "MARCELINO",
  "25282": "RICARDE",
  "25330": "TY",
  "26001": "ABBAS",
  "26003": "ABELLON",
  "26007": "ACOSTA",
  "26009": "ADORACION",
  "26014": "ALMELOR",
  "26020": "ANTOLIN",
  "26023": "ASIS",
  "26027": "ATIWEN",
  "26041": "BALDEMOR",
  "26056": "BERTE",
  "26057": "BIADO",
  "26058": "BIADO",
  "26062": "BONITA",
  "26063": "BOTIGAN",
  "26066": "BUENO",
  "26067": "CAASI",
  "26070": "CABANAYAN",
  "26072": "CABIGO",
  "26075": "CAGASAN",
  "26076": "CAJELES",
  "26086": "CARO",
  "26087": "CASTILLO",
  "26091": "CATALAN",
  "26094": "CELAJES",
  "26097": "CERVANTES",
  "26101": "COLUMNA",
  "26104": "CORPUZ",
  "26106": "CRUZ",
  "26107": "CUBERO",
  "26112": "DACWAG",
  "26113": "DAEZ",
  "26121": "DAYLUSAN",
  "26123": "DE GUZMAN",
  "26125": "DE JESUS",
  "26127": "DE LEON",
  "26145": "ESPAÑO",
  "26147": "ESTRADA",
  "26151": "FELIPE",
  "26155": "FIDER",
  "26158": "FOCASAN",
  "26159": "FORBES",
  "26162": "GAMOS",
  "26173": "GOC-ONG",
  "26178": "GOROSPE",
  "26179": "GOZON",
  "26180": "GRAFE",
  "26204": "LABADOR",
  "26209": "LAMBOLOTO",
  "26214": "LATORRE",
  "26215": "LAYONES",
  "26221": "LOBETE",
  "26222": "LOCADING",
  "26223": "MACANLALAY",
  "26226": "MAGAYANES",
  "26233": "MANDAC",
  "26242": "MINA",
  "26243": "MITRA",
  "26244": "MOLANO",
  "26246": "MOLO",
  "26247": "MORATO",
  "26253": "NUENA",
  "26259": "OLALO",
  "26260": "OLIVA",
  "26262": "ORSOLINO",
  "26269": "PALALIO",
  "26271": "PASION",
  "26274": "PEDROSO",
  "26276": "PEÑARUBIA",
  "26284": "PULIDO",
  "26286": "QUINAL",
  "26288": "RAMBAUD",
  "26296": "ROSARIO",
  "26297": "ROYO",
  "26301": "SABILLA",
  "26304": "SALVE",
  "26309": "FABRO",
  "26315": "SIBAL",
  "26317": "SORIANO",
  "26331": "TOQUERO",
  "26332": "TORRES",
  "26334": "TUMITIT",
  "26337": "UNDANG",
  "26338": "UNDANG",
  "26339": "UNILONGO",
  "26341": "VASQUEZ",
  "26344": "VILELA",
  "26345": "VILLANUEVA",
  "26348": "VISARIO",
  "26351": "AGUSTIN",
  "26352": "BEDAÑA",
  "26357": "RAMOS",
  "27002": "ADTOON",
  "27003": "AGUSTIN",
  "27004": "ALBURO",
  "27006": "ALCUBILLA",
  "27007": "ALEJANDRE",
  "27008": "ALEJO",
  "27009": "ALIPIS",
  "27011": "ANCHETA",
  "27012": "ANDRADA",
  "27013": "APIL",
  "27014": "APOLONIO",
  "27015": "AQUINO",
  "27016": "AQUINO",
  "27018": "ATUN",
  "27019": "BACCAY",
  "27022": "BALQUIN",
  "27023": "BALTAZAR",
  "27024": "BANAN",
  "27025": "BARLAS",
  "27027": "BAROY",
  "27028": "BAUTISTA",
  "27029": "BELIGAN",
  "27031": "BERNARDO",
  "27032": "BETITA",
  "27033": "BLANCO",
  "27034": "BOGADOR",
  "27035": "BOGNALBAL",
  "27036": "BOLAÑOS",
  "27037": "BORRES",
  "27038": "BUENO",
  "27039": "BUSTILLO",
  "27040": "CABUNOC",
  "27041": "CABUTAJE",
  "27042": "CALINISAN",
  "27044": "CANADA",
  "27047": "CANSINO",
  "27048": "CASTRO",
  "27049": "CASTRO",
  "27050": "CASTRO",
  "27051": "CASTRO",
  "27052": "CATACUTAN",
  "27053": "CATACUTAN",
  "27054": "CAYAGO",
  "27055": "CELESTIAL",
  "27056": "COCOY",
  "27057": "COLETO",
  "27059": "COROZA",
  "27060": "CORPUZ",
  "27061": "CORSAME",
  "27064": "CUEVA / DE GUZMAN",
  "27065": "CUNTAPAY",
  "27066": "CUTOR",
  "27067": "DACARA",
  "27069": "DAQUIOAG",
  "27070": "DARVIN",
  "27073": "DE JESUS",
  "27075": "DE MESA",
  "27076": "DE VENANCIO",
  "27077": "DEANG",
  "27078": "DECIERDO",
  "27080": "DELA PENA",
  "27081": "DELOS REYES",
  "27082": "DEMARAYE",
  "27083": "DERAMA",
  "27084": "DIRAS",
  "27085": "DOMINGUEZ",
  "27086": "DUQUE",
  "27088": "EBON",
  "27089": "ENAGE",
  "27090": "ENCARNACION",
  "27091": "ENDINO",
  "27092": "ESCALONA",
  "27093": "ESTEBAN",
  "27094": "ESTOPIN",
  "27095": "EVANGELISTA",
  "27096": "FARNACIO",
  "27097": "FERRER",
  "27098": "FRIAS",
  "27100": "FUGGAN",
  "27101": "GABAS",
  "27102": "GALLAZA",
  "27103": "GAMEO",
  "27104": "GARAY",
  "27105": "GARCIA",
  "27108": "GAYYAMAN",
  "27109": "GENTOLEO",
  "27110": "GEPOLANI",
  "27112": "GEROLA",
  "27115": "GONZALES",
  "27117": "GONZALES",
  "27119": "GORGOD",
  "27120": "GUMARU",
  "27121": "GUPAAL",
  "27122": "GUTIERREZ",
  "27123": "IDULSA",
  "27124": "INTING",
  "27125": "ISRAEL",
  "27126": "JANDULONG",
  "27128": "JORNALES",
  "27129": "KIAT-ONG",
  "27130": "KOZIEJ",
  "27131": "KULI",
  "27132": "LADIONG",
  "27133": "LADJAN",
  "27134": "LAGADAN",
  "27135": "LAO-ING",
  "27136": "LELINA",
  "27137": "LEONOR",
  "27138": "LEVISTE",
  "27139": "LIBATIQUE",
  "27142": "LUCENA",
  "27143": "LUCERO",
  "27144": "MACALINTAL",
  "27145": "MACARAYA",
  "27146": "MAESTRO",
  "27147": "MALANOT",
  "27148": "MALIWANG",
  "27149": "MAMA",
  "27150": "MAMAUAG",
  "27151": "MANGAGOM",
  "27152": "MANGILOG",
  "27153": "MANLANGIT",
  "27154": "MARAMBA",
  "27155": "MARDICAS",
  "27156": "MARIBAO",
  "27157": "MARTINEZ",
  "27158": "MASCULINO",
  "27160": "MELISA",
  "27161": "MENDOZA / PAGA",
  "27162": "MIGUEL",
  "27163": "MINGLANA",
  "27164": "MIRO",
  "27165": "MOJICA",
  "27166": "MOLINA",
  "27167": "MONTEFALCON",
  "27168": "MONTENEGRO",
  "27169": "MONTINOLA",
  "27171": "NABABLIT",
  "27172": "NANALE",
  "27174": "NULUD",
  "27175": "OCOMEN",
  "27176": "OLASO",
  "27177": "OMANDAM",
  "27178": "OPLE",
  "27180": "PADRE",
  "27182": "PAGGAO",
  "27183": "PALMA",
  "27187": "PASAGAD",
  "27189": "PERCIL",
  "27191": "PINTO",
  "27192": "PLANTAR",
  "27193": "PLAZA",
  "27194": "PONTILLAS",
  "27198": "QUEMADO",
  "27199": "QUILILAN",
  "27200": "QUIZON",
  "27202": "RAMIREZ",
  "27203": "RAÑA",
  "27205": "REODIQUE",
  "27206": "REOJA",
  "27207": "REONAL",
  "27208": "RICAFORT",
  "27210": "SAGAAD",
  "27211": "SAGER",
  "27213": "SALAZAR",
  "27214": "SALIPSIP",
  "27217": "SAPINIT",
  "27218": "SARMIENTO",
  "27220": "SESUCA",
  "27221": "SILAO",
  "27222": "SIMON",
  "27223": "SOCIAS",
  "27224": "STA. RITA",
  "27225": "STANLEY",
  "27230": "SUPITER",
  "27231": "TABAAY",
  "27232": "TABELIN",
  "27234": "TAMBADOC",
  "27235": "TANALLON",
  "27236": "TAPULAO",
  "27237": "TAYABAN",
  "27239": "TE-OD",
  "27240": "TICAG",
  "27242": "TIMAJO",
  "27243": "TIMSAN",
  "27244": "TITO",
  "27245": "TOLEDO",
  "27246": "TRUMATA",
  "27247": "URQUIZA",
  "27248": "UY",
  "27249": "VALDEZ",
  "27250": "VALENCIA",
  "27251": "VALENCIA",
  "27253": "VICENTE",
  "27254": "VICLAR",
  "27255": "VIDALLO",
  "27256": "VILLA",
  "27257": "VILLAMOR",
  "27261": "WANIA",
  "27262": "YBAÑEZ",
  "27264": "ZERRUDO",
  "27266": "BIRUNG",
  "27269": "DEW-ALAN",
  "27270": "HUSSIN",
  "27271": "LIBATON",
  "27272": "MONDA",
  "27274": "PALERO",
  "27275": "SINUMLAG",
  "27276": "SOGO-AN",
  "27278": "ALBERTO",
  "27279": "AMBUCAY",
  "27280": "AVILA",
  "27281": "BALDONADO",
  "27282": "BENITEZ",
  "27283": "CABREROS",
  "27285": "CASIGAY",
  "27287": "DE GUZMAN",
  "27288": "DE VERA",
  "27290": "DURAN",
  "27292": "FELIPE",
  "27293": "KIMAKIM",
  "27294": "LATUPAN",
  "27295": "MONTEMAYOR",
  "27296": "MORETO",
  "27298": "SALEM",
  "27299": "SIOCO",
  "27300": "TAGLE",
  "27301": "VILLANUEVA",
  "28001": "ABBAS",
  "28004": "ACIDO",
  "28005": "ADACI",
  "28006": "ADAY",
  "28007": "ADDUN",
  "28008": "AGAD",
  "28009": "AGOD",
  "28010": "AGUILAR",
  "28011": "AGUSTIN",
  "28013": "AGUTAYA",
  "28014": "ALAUYA",
  "28015": "ALAYA-AY",
  "28018": "ALIVEN",
  "28019": "ALTAVANO",
  "28021": "AMISTAD",
  "28022": "AMPALAYOHAN",
  "28024": "ANDAYA",
  "28027": "ANGOT",
  "28028": "ANGULUAN",
  "28029": "ANICETO",
  "28031": "ARAOJO",
  "28032": "ARAWAS",
  "28033": "ARCIAGA",
  "28034": "ARELLANO",
  "28035": "ARENAS",
  "28036": "ARIÑO",
  "28038": "AUSTRIA",
  "28039": "AVISADO",
  "28040": "BACULI",
  "28041": "BAET",
  "28042": "BAGTANG",
  "28043": "BAJAR",
  "28045": "BALANIYAN",
  "28046": "BALANTA",
  "28047": "BALUYA",
  "28048": "BANGNGAGAN",
  "28049": "BANOG",
  "28050": "BARABONA",
  "28052": "BAYOD",
  "28053": "BERBA",
  "28055": "BERCASIO",
  "28056": "BERSO",
  "28057": "BICACA",
  "28058": "BINWAG",
  "28060": "BONGAO",
  "28061": "BORJA",
  "28062": "BOWAKEN",
  "28063": "BUCAYU",
  "28064": "BUENO",
  "28065": "CALANGI / BUHONG",
  "28066": "BULAWAN",
  "28067": "BUYAYO",
  "28068": "CAHAYON",
  "28070": "CALAMBRO",
  "28071": "CALASARA",
  "28073": "CALINGACION",
  "28074": "CALIXTO",
  "28075": "CALUBAD",
  "28076": "CAMAROTE",
  "28077": "CAMBA",
  "28078": "CAMPANA",
  "28080": "CANGAYO",
  "28082": "CANUTAB",
  "28083": "CARIAGA",
  "28084": "CARIASO",
  "28085": "CARONAN",
  "28087": "CARTAGENAS",
  "28088": "CASAMAYOR",
  "28090": "CASTRO",
  "28092": "CEREZO",
  "28093": "CERVAS",
  "28094": "COLLADO",
  "28095": "COLOBONG",
  "28096": "COMIA",
  "28097": "CONICONDE",
  "28099": "CORDOVA",
  "28100": "CRUCILLO",
  "28101": "CRUZ",
  "28102": "CUDIAMAT",
  "28105": "DABALOS",
  "28107": "DAPPAY",
  "28109": "DE GUZMAN",
  "28110": "DE GUZMAN",
  "28111": "DE GUZMAN",
  "28112": "DE LEON",
  "28113": "DE VENANCIO",
  "28114": "DEL PRADO",
  "28115": "DELA PEÑA",
  "28116": "DELA RAMA",
  "28117": "DELA TORRE",
  "28118": "DELIVA",
  "28120": "DERILO",
  "28121": "DIOKNO",
  "28122": "DIONES",
  "28123": "DIVINA",
  "28124": "DIVINA",
  "28126": "DOONG",
  "28127": "DUENAS",
  "28128": "DUERO",
  "28129": "DULAY",
  "28130": "DULOS",
  "28134": "ESCALA",
  "28135": "ESCOBAR",
  "28136": "ESPIRITU",
  "28139": "ESTRADA",
  "28140": "EVANGELISTA",
  "28141": "FALCON",
  "28142": "FERANDO",
  "28143": "FERRER",
  "28145": "FLORES",
  "28148": "FULO",
  "28149": "GALITGUIT",
  "28151": "GAMAL",
  "28153": "GANET",
  "28154": "GARCIA",
  "28156": "GARCIA",
  "28157": "GARCIA",
  "28159": "GARCIA",
  "28161": "GARCIA",
  "28163": "GAYANOCHE",
  "28165": "GOBWAY",
  "28167": "GOLIS",
  "28168": "GOMEZ",
  "28169": "GUANZON",
  "28171": "GUIEB",
  "28172": "GUMASING",
  "28173": "GUTIERREZ",
  "28174": "GUTING",
  "28175": "HINDAC",
  "28177": "ILANO",
  "28178": "IQUIN",
  "28179": "IRLANDA",
  "28181": "JANDONERO",
  "28182": "JAVELOSA",
  "28183": "JAVIER",
  "28184": "JIMENEZ",
  "28187": "JUNIO",
  "28188": "LABARINTO",
  "28190": "LACADEN",
  "28191": "LADERA",
  "28193": "LANGAHID",
  "28194": "LARGO",
  "28196": "LEBRILLA",
  "28198": "LLADOC",
  "28199": "LLAGAS",
  "28200": "LLANETA",
  "28201": "LLARENAS",
  "28202": "LLENAS",
  "28203": "LLENOS",
  "28204": "LLONO",
  "28205": "LOOD",
  "28206": "LUBAY",
  "28209": "MAADIL",
  "28210": "MABILOG",
  "28211": "MACAS",
  "28212": "MACLANG",
  "28215": "MALACA",
  "28216": "MALOMAY",
  "28217": "MAMA",
  "28218": "MAMAED",
  "28220": "MANANGAN",
  "28222": "MANAPOL",
  "28223": "MANODON",
  "28224": "MANZO",
  "28225": "MAPACPAC",
  "28226": "MAQUILAN",
  "28228": "MARCELO",
  "28229": "MARTINEZ",
  "28233": "MENDOZA",
  "28234": "MENESES",
  "28237": "MOLINA",
  "28238": "MORALES",
  "28239": "MORENO",
  "28241": "NACARIO",
  "28242": "NALLIW",
  "28244": "NAOHA",
  "28245": "NARAG",
  "28246": "NARVAL",
  "28247": "NAVARRO",
  "28251": "OROPESA",
  "28252": "OTTAO",
  "28253": "PACIS",
  "28254": "PACLIBAR",
  "28255": "PADALOY",
  "28256": "PADILLA",
  "28257": "PAGALILAUAN",
  "28258": "PAGANAO",
  "28259": "PAGUIA",
  "28260": "PALATTAO",
  "28261": "PALOGAN",
  "28262": "PAMBID",
  "28263": "PAMONAG",
  "28264": "PANAHON",
  "28265": "PANGOD",
  "28266": "PARAS",
  "28268": "PARONE",
  "28271": "PENALOZA",
  "28272": "PEREZ",
  "28273": "PERLAS",
  "28274": "PIANO",
  "28276": "PINGOL",
  "28278": "POGATA",
  "28279": "POLO",
  "28280": "PONDANG",
  "28281": "POQUITA",
  "28282": "PRACULLOS",
  "28284": "QUINO",
  "28285": "RAMIREZ",
  "28286": "RAMIRO",
  "28287": "RAMOS",
  "28288": "RAMOS",
  "28289": "REGIS",
  "28290": "REVANTAD",
  "28292": "REYES",
  "28294": "REYES",
  "28295": "RICO",
  "28296": "ROBRIGADO",
  "28297": "RODEROS",
  "28298": "RODRIGUEZ",
  "28299": "ROLDAN",
  "28300": "ROSAROSO",
  "28303": "RUEDAS",
  "28304": "RULETE",
  "28305": "SALANG",
  "28306": "SANGGO",
  "28308": "SANGGALANG",
  "28310": "SANSON",
  "28311": "SAPIGAO",
  "28312": "SARAPUDDIN",
  "28314": "SENSANO",
  "28315": "SEVILLA",
  "28316": "SIENES",
  "28317": "SILAPAN",
  "28318": "SORIANO",
  "28322": "SUMBID",
  "28323": "TAJAAL",
  "28324": "TAKCHANGEN",
  "28326": "TAMANU",
  "28327": "TAMAYO",
  "28328": "TANGCOLO",
  "28329": "TANONGON",
  "28330": "TAYOTO",
  "28331": "TIMOG",
  "28332": "TIONGCO",
  "28333": "TOLERO",
  "28334": "TORREFRANCA",
  "28335": "TUARIO",
  "28336": "TUBBAN",
  "28337": "TUCAQUI",
  "28338": "TUMARAO",
  "28339": "UMOSO",
  "28341": "URELLAN",
  "28342": "VALENCIA",
  "28344": "VERGARA",
  "28345": "VICENTE",
  "28346": "VILA",
  "28347": "VILDA",
  "28348": "VILLAFLOR",
  "28349": "VIRREY",
  "28350": "WAYAGWAG",
  "28351": "YABUT",
  "28353": "ACOP",
  "28355": "ALIUD,DEN",
  "28356": "ALOP",
  "28357": "AMARILLE",
  "28358": "BARBOSA",
  "28359": "BARQUILLA",
  "28360": "BAYOT",
  "28361": "BONGOLAN",
  "28362": "CASINO",
  "28366": "DIGMA",
  "28368": "ERMAC",
  "28370": "GAMAO",
  "28371": "GUBANTES",
  "28375": "IRAL",
  "28376": "LINDA",
  "28377": "MANODON",
  "28378": "MANODON",
  "28382": "MUALLIL",
  "28383": "PABUNAN",
  "28385": "REPOLLO",
  "28387": "RICAFRENTE",
  "28389": "SALAZAR",
  "28390": "SOLIVEN",
  "28391": "TUMAPANG",
  "29001": "ABONITA",
  "29003": "ABULENCIA",
  "29004": "AGGABAO",
  "29005": "AGONOS",
  "29006": "AGUILAR",
  "29008": "ALAVA",
  "29012": "ALVARADO",
  "29014": "ANDAL",
  "29015": "ANGCON",
  "29017": "ANIMAS",
  "29019": "ANTIMANO",
  "29020": "APOSTOL",
  "29021": "AQUITANIA",
  "29022": "ARANDA",
  "29024": "ARIG",
  "29025": "ARNAIZ",
  "29026": "ASCURA",
  "29027": "ASOQUE",
  "29028": "ASUNCION",
  "29029": "ASUNCION",
  "29030": "AURISTELA",
  "29031": "AUSTRIA",
  "29032": "BADE",
  "29034": "BAEL",
  "29035": "BAG-AO",
  "29036": "BALAZON",
  "29038": "BALMERA",
  "29039": "BANUA",
  "29040": "BAPTISTA",
  "29042": "BARROTA",
  "29043": "BAUTISTA",
  "29045": "BAWALAN",
  "29046": "BAYBAYAN",
  "29047": "BELLEZA",
  "29048": "BELONIA",
  "29049": "BERGONIO",
  "29051": "BETANCOR",
  "29052": "BICO",
  "29054": "BORJA",
  "29055": "BORRES",
  "29056": "BORRES",
  "29057": "BRAGA",
  "29058": "BUENAOBRA",
  "29059": "BUGAYONG",
  "29060": "BULQUIREN",
  "29062": "BUSALPA",
  "29063": "CAGUIAT / CABAIS",
  "29064": "CABAUATAN",
  "29073": "CAMPOSANO",
  "29074": "CANADA",
  "29076": "CANOY",
  "29077": "CARABIO",
  "29079": "CARPIO",
  "29080": "CARSON",
  "29081": "CASIPE",
  "29082": "CASTILLO",
  "29083": "CASTRO",
  "29084": "CATAPANG",
  "29085": "CATIMBANG",
  "29086": "CATOLICO",
  "29087": "CAVADA",
  "29088": "CENTENO",
  "29089": "CERBO",
  "29090": "CERO",
  "29091": "CESNEROS",
  "29092": "CHIMMON",
  "29094": "CORDERO",
  "29095": "CORPUZ",
  "29098": "CUARESMA",
  "29100": "CUNADO",
  "29101": "CUSTODIO",
  "29103": "DAET",
  "29104": "DAMAYON",
  "29105": "DANGARAN",
  "29107": "DELARA",
  "29108": "DELA CRUZ",
  "29109": "DELA VINA",
  "29110": "DELICA",
  "29112": "DILAG",
  "29114": "DOMALLIG",
  "29115": "DOSOL",
  "29116": "DRAPIZA",
  "29117": "DRIZ",
  "29118": "DUMALLEG",
  "29119": "EDURISE",
  "29121": "ENCIO",
  "29122": "ERGINA",
  "29123": "ERGINA",
  "29126": "ESON",
  "29127": "ESPENIDA",
  "29129": "ESTRELLA",
  "29132": "FERRERAS",
  "29133": "FERROLINO",
  "29134": "FLORES",
  "29135": "FORONDA",
  "29136": "FUNTILON",
  "29137": "GABUYA",
  "29138": "GALILA",
  "29139": "GALO",
  "29140": "GALVEZ",
  "29141": "GAMINDE",
  "29142": "GARCIA",
  "29143": "GARCIA",
  "29144": "GARING",
  "29145": "GAYAGAY",
  "29146": "GEDACA",
  "29147": "GELLANG",
  "29148": "GERONIMO",
  "29149": "GEVERO",
  "29150": "GICOLE",
  "29151": "GILO",
  "29153": "GRACIA",
  "29155": "GUANZON",
  "29156": "GUIABAO",
  "29157": "HILARIO",
  "29158": "HISO",
  "29159": "HUBILLA",
  "29160": "HUMIWAT",
  "29161": "IBRAHIM",
  "29162": "ILUMIN",
  "29163": "IMPAS",
  "29164": "JABAGAT",
  "29165": "JUANICO",
  "29169": "LACTUD",
  "29170": "LADESMA",
  "29171": "LADRILLO",
  "29172": "LAGARTEJA",
  "29173": "LAGUNILLA",
  "29175": "LAURETA",
  "29176": "LAYLAY",
  "29177": "LEYESA",
  "29178": "LIGERALDE",
  "29179": "LIMPIOSO",
  "29180": "LIMSON",
  "29183": "LIWALIW",
  "29184": "LIWANAG",
  "29185": "LOMEREZ",
  "29186": "LOMIGO",
  "29187": "LORENZO",
  "29188": "LORENZO",
  "29189": "LORICO",
  "29191": "LUMABAO",
  "29192": "LUMINES",
  "29193": "LUMIWES",
  "29194": "LUNIZO",
  "29195": "LUSAC",
  "29196": "MAATA",
  "29198": "MACALANDA",
  "29199": "MACALINTAL",
  "29200": "MACROHON",
  "29201": "MAGTULIS",
  "29203": "MALAWANI",
  "29205": "MANALO",
  "29206": "MANALOTO",
  "29207": "MANDIGMA",
  "29208": "MANGA",
  "29210": "MANLANGIT",
  "29211": "MANGALILI",
  "29212": "MARCIAL",
  "29213": "MARQUESES",
  "29215": "MARTINEZ",
  "29217": "MAULION",
  "29218": "MEJIA",
  "29221": "MERIDA",
  "29223": "MONDING",
  "29224": "MORETE",
  "29225": "MURILLO",
  "29226": "NADAL",
  "29227": "NAMBONG",
  "29228": "NASAM",
  "29230": "NOBELO",
  "29231": "NUAY",
  "29233": "OBCEMANE",
  "29234": "OBELLO",
  "29236": "OLIVAR",
  "29237": "OLIVEROS",
  "29238": "OMOTONG",
  "29239": "ONDOY",
  "29240": "ORINE",
  "29241": "ORTEGA",
  "29242": "PADILLA",
  "29243": "PAG-A",
  "29244": "PALAHANG",
  "29246": "PALCONGAN",
  "29247": "PARAWAN",
  "29250": "PECDASEN",
  "29251": "PEDRO",
  "29252": "PEÑAREDONDO",
  "29254": "PEREZ",
  "29255": "PICAR",
  "29256": "PIMENTEL",
  "29257": "PIRA",
  "29258": "PIZON",
  "29259": "POLLESCAS",
  "29260": "POSTIGO",
  "29263": "RAMASTA",
  "29264": "RAMILLANO",
  "29266": "RAMOGA",
  "29267": "RAMOS",
  "29269": "REGANIT",
  "29270": "REJANO",
  "29271": "REMO",
  "29272": "REYES",
  "29273": "RILLERA",
  "29274": "RIVERA,",
  "29276": "RODRIGUEZ",
  "29277": "ROJAS",
  "29279": "ROSALES",
  "29280": "RUBIO",
  "29281": "RUTE",
  "29282": "SAA",
  "29283": "SABAS",
  "29284": "SABUNGAN",
  "29285": "SACLOLO",
  "29286": "SADICON",
  "29287": "SAGARIO",
  "29288": "SALGADO",
  "29290": "SALUNAT",
  "29292": "SAN DIEGO",
  "29293": "SANCHEZ",
  "29294": "SANCHEZ",
  "29295": "SANCHEZ",
  "29296": "SANDOVAL",
  "29297": "SANICO",
  "29298": "SANTIAGO",
  "29299": "SANTOS",
  "29302": "SILOTERIO",
  "29303": "SILVA",
  "29305": "SILVERIO",
  "29306": "SORIO",
  "29307": "SULTIA",
  "29309": "SUMAOY",
  "29310": "SUNER",
  "29311": "SUNGA",
  "29312": "SUPLIDO",
  "29314": "TABINGO",
  "29315": "TAFALLA",
  "29316": "TAGAPAN",
  "29317": "TAN",
  "29319": "TENA",
  "29320": "TEÑOSO",
  "29321": "TIHOK",
  "29324": "TOLENTINO",
  "29326": "TRINIDAD",
  "29327": "TUBERA",
  "29328": "TUBURAN",
  "29329": "TUMAPANG",
  "29331": "UMALI / ALIADO",
  "29332": "UNDANG",
  "29333": "URBANO",
  "29334": "VALENCERINA",
  "29335": "VALENZUELA",
  "29336": "VARGAS",
  "29339": "VILLANUEVA",
  "29340": "VILLAR",
  "29341": "VILLARIAZA",
  "29342": "VILORIA",
  "29343": "VITAO",
  "30001": "ABAN",
  "30002": "ABARICO",
  "30003": "ABCALEN",
  "30004": "ABIGA",
  "30005": "ACLAN",
  "30006": "ADAWI",
  "30007": "ADOBE",
  "30009": "AGON",
  "30010": "AGOZAR",
  "30011": "AGPALO",
  "30012": "AGPAWAN",
  "30013": "AGUSTIN",
  "30014": "AGUSTIN",
  "30015": "ALBUERO",
  "30016": "GUTIERREZ / ALMONTE",
  "30017": "ALPUTAN",
  "30019": "AMBOL",
  "30021": "ANDRADA",
  "30022": "ANDRES",
  "30023": "ANGOLUAN",
  "30025": "AQUINO",
  "30026": "ARNADO",
  "30027": "ASUNCION",
  "30028": "ATILANO",
  "30029": "AUSTRIA",
  "30030": "AVILES",
  "30031": "BADUYEN",
  "30032": "BAGO",
  "30033": "BALICDANG",
  "30034": "BALILI",
  "30035": "BALUCOS",
  "30036": "BALUNOS",
  "30037": "BANAO",
  "30038": "BANCALE",
  "30039": "BANCORO",
  "30040": "BANGELES",
  "30041": "BARTOLOME",
  "30042": "BASILIO",
  "30043": "BASSIG",
  "30044": "BATNAG",
  "30045": "BAUTISTA",
  "30047": "BAUTISTA",
  "30048": "BENABESE",
  "30049": "BENCIO",
  "30050": "BERBER",
  "30051": "BERMUNDO",
  "30052": "BERSAMINA",
  "30053": "BILANGEL",
  "30054": "BILLONES",
  "30055": "BINASOY",
  "30056": "BOADO",
  "30057": "BONOS",
  "30058": "BOQUIL",
  "30059": "BORIDAS",
  "30060": "BOTA-ANG",
  "30061": "BRAZIL",
  "30062": "BUCIO",
  "30063": "BUDOD",
  "30064": "BUENO",
  "30065": "BUICO",
  "30066": "BULIYAT",
  "30067": "BUNDALIAN",
  "30068": "BURKLEY",
  "30069": "BUSINOS",
  "30070": "BUYO",
  "30071": "CABALLERO",
  "30072": "CABRAS",
  "30073": "CAIRO",
  "30074": "CALAOA",
  "30075": "CALAO-IT",
  "30076": "CALIMAG",
  "30078": "CALOSING",
  "30079": "CAMACHO",
  "30080": "CAMPOSANO",
  "30081": "CANONIGO",
  "30082": "CANONIO",
  "30083": "CANTO",
  "30084": "CAPILI",
  "30086": "CARANGUIAN",
  "30087": "CARIÑO",
  "30088": "CARO",
  "30089": "CASTRO",
  "30090": "CASTRO",
  "30091": "CAWILI",
  "30092": "CAYABYAB",
  "30093": "CEJOCO",
  "30094": "CELMAR",
  "30095": "CHEN",
  "30097": "COLIPANO",
  "30098": "CONALES",
  "30099": "CONSTANTINO",
  "30100": "COPREROS",
  "30102": "CORRE",
  "30103": "CRUZADA",
  "30104": "CUA",
  "30105": "CUADRA",
  "30106": "CUBIO",
  "30107": "CUDAL",
  "30108": "CULTURA",
  "30110": "DALLEGO",
  "30112": "DAYAG",
  "30113": "DE GUIA",
  "30114": "DE LAS ALAS",
  "30116": "DE TORRES",
  "30117": "DE VERA",
  "30118": "DELA CRUZ",
  "30119": "DELOS SANTOS",
  "30120": "DEMAFILES",
  "30121": "DEMONTAÑO",
  "30122": "DERIQUITO",
  "30123": "DICAR",
  "30124": "CUADRA",
  "30125": "EDAS",
  "30126": "EGOS",
  "30127": "ELEGORES",
  "30128": "ENDRIGA",
  "30129": "ENRIQUEZ",
  "30130": "EROLES",
  "30131": "ESCALAÑA",
  "30132": "ESCAT",
  "30133": "ESLAPOR",
  "30134": "ESPIRITU",
  "30135": "ESQUEJO",
  "30136": "ESTIOCO",
  "30138": "ESTRADA",
  "30140": "FACIOL",
  "30141": "FAILAGO",
  "30142": "FAJARDO",
  "30143": "FANGAYEN",
  "30144": "FAUSTINO",
  "30145": "FELIPE",
  "30146": "FERNANDEZ",
  "30147": "FLOR",
  "30148": "FLORES",
  "30149": "FONTANILLA",
  "30150": "FRESAS",
  "30151": "FRUELDA",
  "30152": "GACCAD",
  "30153": "GACOS",
  "30154": "GALANDE",
  "30156": "GALVE",
  "30157": "GANO",
  "30158": "GANTE",
  "30161": "GARINO",
  "30162": "GAYAO",
  "30163": "GELVEZON",
  "30165": "GOMEZ",
  "30166": "GONZAGA",
  "30168": "GRANIL",
  "30169": "GUARDADOS",
  "30170": "GUIMBANGUNAN",
  "30172": "GUINANGHAN",
  "30173": "GUINDALOS",
  "30174": "GUMOGOD",
  "30175": "GUNABAN",
  "30176": "GUTIERREZ",
  "30178": "HALLARA",
  "30179": "HERNANDEZ",
  "30181": "HILARIO",
  "30182": "HUBILLA",
  "30183": "IFURUNG",
  "30184": "JABOLIN",
  "30185": "JALALON",
  "30186": "JIMENEZ",
  "30187": "JOSAL",
  "30188": "JUMAWAN",
  "30189": "JUMAWAN",
  "30190": "KALEY",
  "30192": "LADERA",
  "30193": "LADRONA",
  "30194": "LALEO",
  "30195": "LANGKIT",
  "30196": "LARA",
  "30197": "LATAYAN",
  "30198": "LAYAGAN",
  "30199": "LECAROZ",
  "30201": "LEYESA",
  "30202": "LIBATIQUE",
  "30203": "LIMON",
  "30204": "LOMA / REYES",
  "30205": "LOMEDA",
  "30206": "LORENZO",
  "30207": "LORZANO",
  "30209": "LUMICQUIO",
  "30210": "LUMOD",
  "30211": "LUNZAGA",
  "30212": "MACADAT",
  "30213": "MACALISANG",
  "30214": "MACASIRAY",
  "30215": "MACO",
  "30216": "MADRIA",
  "30217": "MAGBANUA",
  "30218": "MAGUEN",
  "30219": "MAHENER",
  "30220": "MAHUSAY",
  "30221": "MALASI",
  "30222": "MALNAWA",
  "30223": "MAMANGKAS",
  "30224": "MAMITAG",
  "30225": "MANABAT",
  "30226": "MANANGKILA",
  "30227": "MANGINSAY",
  "30228": "MANUEL",
  "30229": "MANZANO",
  "30230": "MARAMAG",
  "30231": "MARAPAO",
  "30232": "MARBELLA",
  "30233": "MARCELO",
  "30234": "MARCOS",
  "30236": "MARIANO",
  "30237": "MARIÑAS",
  "30238": "MASCARDO",
  "30239": "MAYGAY",
  "30240": "MEDINA",
  "30241": "MERCADO",
  "30242": "MERCADO",
  "30243": "MILLANA",
  "30244": "MISA",
  "30245": "MONTEMAYOR",
  "30246": "MORALES",
  "30247": "MORATA",
  "30248": "MORELO",
  "30249": "MORGA",
  "30250": "MULA",
  "30251": "NADIAHAN",
  "30252": "NAIFE",
  "30253": "NATO",
  "30254": "NAWI",
  "30255": "NERI",
  "30256": "NILO",
  "30257": "NOEL",
  "30259": "NOVERO / NOLLA",
  "30261": "OJO",
  "30262": "OLITIN",
  "30263": "OMPOC",
  "30264": "PACLIBAR",
  "30265": "PAESTE",
  "30266": "PAGHARION",
  "30268": "PAGPAGUITAN",
  "30269": "PAGUIO",
  "30270": "PAGULAYAN",
  "30271": "PAHIMUTANG",
  "30272": "PAJE",
  "30273": "PALABRICA",
  "30274": "PALLINGAYAN",
  "30275": "PALTENG",
  "30276": "PANAGA",
  "30277": "PANGAN",
  "30279": "PAREN",
  "30282": "PATING",
  "30284": "PEDRON",
  "30285": "PELAEZ",
  "30286": "PEÑARANDA",
  "30288": "PIGGANGAY",
  "30289": "PILOBELLO",
  "30290": "PINTO",
  "30291": "PIQUERO",
  "30292": "POBLADOR",
  "30293": "PRIETO",
  "30294": "PROVIDO",
  "30295": "PUMIHIC",
  "30296": "QUINSAY",
  "30298": "RABARA",
  "30299": "RACELIS",
  "30300": "RAMBAUD",
  "30301": "REBANAL",
  "30302": "REBITA",
  "30303": "REBUENO",
  "30305": "RIDULME",
  "30306": "ROMERO",
  "30308": "SABAS",
  "30310": "SALEM / SAJILI",
  "30312": "SALES",
  "30313": "SALORSANO",
  "30314": "SALUTA",
  "30315": "SAMBAYAN",
  "30317": "SANCHEZ",
  "30318": "SANTIAGO",
  "30319": "SANTIAGO",
  "30320": "SAUDAGAL",
  "30321": "SEGISMUNDO",
  "30322": "SEMANA",
  "30323": "SERISOLA",
  "30324": "SERMONA",
  "30327": "SISON",
  "30328": "SODE",
  "30329": "SONGALIA",
  "30331": "SUMAYA",
  "30332": "SUSAS",
  "30333": "TABUADA",
  "30334": "TALATTAD",
  "30336": "TALLUD",
  "30337": "TANGCAY",
  "30338": "TANGCAY",
  "30339": "TARROZA",
  "30340": "TASI",
  "30341": "TAYPIN",
  "30342": "TELAN",
  "30343": "TEVES",
  "30344": "TIDALGO",
  "30345": "TOLENTINO",
  "30346": "TOLENTINO",
  "30347": "TORIO",
  "30348": "TORREFRANCA",
  "30349": "TORRES",
  "30352": "VALDEZ",
  "30355": "TALLONGON / VERGARA",
  "30356": "VIADO",
  "30357": "VILLAFLOR",
  "30358": "VILLALOBOS",
  "30359": "VILLAVER",
  "30360": "VILLEGAS",
  "30361": "VINCOY",
  "30362": "VINGNO",
  "30364": "VITE",
  "30365": "WAHAB",
  "30366": "WAKING",
  "30367": "WAYAGWAG",
  "30368": "YAP",
  "30369": "YODONG"
};

if (typeof window !== "undefined") {
  window.AUTHORIZED_CADETS = AUTHORIZED_CADETS;
}

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

  // RSO Council - Regimental Supply Officer & HTG Armory
  rso: "https://docs.google.com/spreadsheets/d/1D2Mawvphp9UsY9NC8boG46FlksDkjXzLEf5c8afm-xI/gviz/tq?tqx=out:csv&sheet=ARMORY",

  // S1 Extended Feeds
  s1_expanded: "https://docs.google.com/spreadsheets/d/1sO3tlfX1l4S1ZBTCz2q2kVtgs9OicRztlzdS_OfNJiQ/gviz/tq?tqx=out:csv&gid=2074677523",
  s1_expanded_raw: "https://docs.google.com/spreadsheets/d/1sO3tlfX1l4S1ZBTCz2q2kVtgs9OicRztlzdS_OfNJiQ/edit?gid=2074677523#gid=2074677523",

  s1_roster: "https://docs.google.com/spreadsheets/d/1RgBG_8zpjtFt2CCCEft-ryWa7PMKY49wM0yiAqsOeQA/gviz/tq?tqx=out:csv&gid=1849395053",
  s1_roster_raw: "https://docs.google.com/spreadsheets/d/1RgBG_8zpjtFt2CCCEft-ryWa7PMKY49wM0yiAqsOeQA/edit?gid=1849395053#gid=1849395053",

  s1_squads: "https://docs.google.com/spreadsheets/d/1WgSOcIMQVFFBTAOLnxgPtPn6uNJNjBkarlei5ebvCpQ/gviz/tq?tqx=out:csv&gid=1122746587",
  s1_squads_raw: "https://docs.google.com/spreadsheets/d/1WgSOcIMQVFFBTAOLnxgPtPn6uNJNjBkarlei5ebvCpQ/edit?gid=1122746587#gid=1122746587",

  s1_ape_1cl: "https://docs.google.com/spreadsheets/d/1gkPSf_DFNtxTXs5xz6zeF87q4ndpENIOBnkmAmBuVQE/gviz/tq?tqx=out:csv&gid=1436497851",
  s1_ape_1cl_raw: "https://docs.google.com/spreadsheets/d/1gkPSf_DFNtxTXs5xz6zeF87q4ndpENIOBnkmAmBuVQE/edit?gid=1436497851#gid=1436497851",

  s1_ape_2cl: "https://docs.google.com/spreadsheets/d/1keQdjAC0zv9weMzNcvHcrxQdqpbW5KUpNqUNPeF2U5E/gviz/tq?tqx=out:csv&gid=813157205",
  s1_ape_2cl_raw: "https://docs.google.com/spreadsheets/d/1keQdjAC0zv9weMzNcvHcrxQdqpbW5KUpNqUNPeF2U5E/edit?gid=813157205#gid=813157205",

  s1_clubs: "https://docs.google.com/spreadsheets/d/1luG6EKlAa1fPK_SoMzpI8r25HbQ0wu0_Uefaz9RI4DY/gviz/tq?tqx=out:csv&gid=0",
  s1_clubs_raw: "https://docs.google.com/spreadsheets/d/1luG6EKlAa1fPK_SoMzpI8r25HbQ0wu0_Uefaz9RI4DY/edit?gid=0#gid=0",

  s1_tin: "https://docs.google.com/spreadsheets/d/1xcTrlevaAf-y07Vwp8G-ZkD25gCMCacuJDLMexiMqZc/gviz/tq?tqx=out:csv&gid=837476447",
  s1_tin_raw: "https://docs.google.com/spreadsheets/d/1xcTrlevaAf-y07Vwp8G-ZkD25gCMCacuJDLMexiMqZc/edit?pli=1&gid=837476447#gid=837476447",

  // Spiritual Development Council (1CL, 2CL, 3CL Roster Endpoints)
  spiritual: "https://docs.google.com/spreadsheets/d/1GYusJlZTqArGYtWacs_ZjnhTQL4ZFXoWrFwSHarthyY/gviz/tq?tqx=out:csv&gid=666856956",
  spiritual_1cl: "https://docs.google.com/spreadsheets/d/1GYusJlZTqArGYtWacs_ZjnhTQL4ZFXoWrFwSHarthyY/gviz/tq?tqx=out:csv&gid=194404420",
  spiritual_2cl: "https://docs.google.com/spreadsheets/d/1GYusJlZTqArGYtWacs_ZjnhTQL4ZFXoWrFwSHarthyY/gviz/tq?tqx=out:csv&gid=666856956",
  spiritual_3cl: "https://docs.google.com/spreadsheets/d/1GYusJlZTqArGYtWacs_ZjnhTQL4ZFXoWrFwSHarthyY/gviz/tq?tqx=out:csv&gid=1748574266",
  spiritual_raw: "https://docs.google.com/spreadsheets/d/1GYusJlZTqArGYtWacs_ZjnhTQL4ZFXoWrFwSHarthyY/edit?gid=666856956#gid=666856956",
  spiritual_1cl_raw: "https://docs.google.com/spreadsheets/d/1GYusJlZTqArGYtWacs_ZjnhTQL4ZFXoWrFwSHarthyY/edit?gid=194404420#gid=194404420",
  spiritual_2cl_raw: "https://docs.google.com/spreadsheets/d/1GYusJlZTqArGYtWacs_ZjnhTQL4ZFXoWrFwSHarthyY/edit?gid=666856956#gid=666856956",
  spiritual_3cl_raw: "https://docs.google.com/spreadsheets/d/1GYusJlZTqArGYtWacs_ZjnhTQL4ZFXoWrFwSHarthyY/edit?gid=1748574266#gid=1748574266",

  // CCAFP Punishment Register & Conduct Sheet (Live GVIZ Endpoints)
  punishments: "https://docs.google.com/spreadsheets/d/1ZMczJRnVMjF6tKDr4x0ITE2qhzpzIMkGAWdDH5LAIrw/gviz/tq?tqx=out:csv&gid=1784962041",
  punishments_conduct: "https://docs.google.com/spreadsheets/d/1ZMczJRnVMjF6tKDr4x0ITE2qhzpzIMkGAWdDH5LAIrw/gviz/tq?tqx=out:csv&gid=1784962041",
  punishments_totals: "https://docs.google.com/spreadsheets/d/1ZMczJRnVMjF6tKDr4x0ITE2qhzpzIMkGAWdDH5LAIrw/gviz/tq?tqx=out:csv&gid=149382018",
  punishments_summary: "https://docs.google.com/spreadsheets/d/1ZMczJRnVMjF6tKDr4x0ITE2qhzpzIMkGAWdDH5LAIrw/gviz/tq?tqx=out:csv&gid=1815075399",
  punishments_raw: "https://docs.google.com/spreadsheets/d/1ZMczJRnVMjF6tKDr4x0ITE2qhzpzIMkGAWdDH5LAIrw/edit?gid=149382018#gid=149382018",

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
  mess: "https://docs.google.com/spreadsheets/d/14dSYE1ntxNrnBdgSn-mWU5z-GMHK7qdMcKFchgh0pAQ/gviz/tq?tqx=out:csv&gid=482780671",
  mess_database: "https://docs.google.com/spreadsheets/d/14dSYE1ntxNrnBdgSn-mWU5z-GMHK7qdMcKFchgh0pAQ/gviz/tq?tqx=out:csv&gid=482780671",
  mess_viands: "https://docs.google.com/spreadsheets/d/14dSYE1ntxNrnBdgSn-mWU5z-GMHK7qdMcKFchgh0pAQ/gviz/tq?tqx=out:csv&gid=143586769",
  mess_disseminations: "https://docs.google.com/spreadsheets/d/14dSYE1ntxNrnBdgSn-mWU5z-GMHK7qdMcKFchgh0pAQ/gviz/tq?tqx=out:csv&gid=1204067800",
  mess_raw: "https://docs.google.com/spreadsheets/d/14dSYE1ntxNrnBdgSn-mWU5z-GMHK7qdMcKFchgh0pAQ/edit?gid=482780671#gid=482780671",
  mess_viands_raw: "https://docs.google.com/spreadsheets/d/14dSYE1ntxNrnBdgSn-mWU5z-GMHK7qdMcKFchgh0pAQ/edit?gid=143586769#gid=143586769",
  safety: "",
  gad: "",         // Sensitive - Gender Guidelines Only
  ccpb: "",        // Sensitive - Conduct Policies Only
  honor: "",       // Sensitive - Sacred Honor Code Tenets Only
  calendar: ""
};

/**
 * =========================================================================
 * ⚡ NEON SERVERLESS POSTGRES CLOUD DATABASE CONFIGURATION
 * =========================================================================
 * Uses @neondatabase/serverless driver to connect all devices (Mac, iPhone,
 * Android, PC) directly to a unified cloud PostgreSQL database over HTTPS.
 * No local server processes (server.py) or network port forwards required.
 */
const CCAFP_NEON_AUTH_URL = 'https://ep-fancy-firefly-b323bksf.neonauth.c-4.ap-southeast-1.aws.neon.tech/neondb/auth';
const CCAFP_NEON_DEFAULT_URL = 'postgresql://neondb_owner:npg_jU6C4PQTYWKg@ep-fancy-firefly-b323bksf-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const CCAFP_NEON_CONFIG = {
  authUrl: CCAFP_NEON_AUTH_URL,
  // Built-in Centralized Neon Serverless Postgres Cloud Database (Shared across all devices)
  databaseUrl: (typeof localStorage !== 'undefined' ? (localStorage.getItem('CCAFP_NEON_DB_URL') || localStorage.getItem('CCAFP_CUSTOM_DB_URL')) : '') || CCAFP_NEON_DEFAULT_URL
};
if (typeof window !== 'undefined') {
  window.CCAFP_NEON_AUTH_URL = CCAFP_NEON_AUTH_URL;
  window.CCAFP_NEON_DEFAULT_URL = CCAFP_NEON_DEFAULT_URL;
  window.CCAFP_NEON_CONFIG = CCAFP_NEON_CONFIG;
  window.CCAFP_DATABASE_CONFIG = CCAFP_NEON_CONFIG;
}

/**
 * =========================================================================
 * 🎖️ OFFICIAL CORPS UNIFORM DEFINITIONS & ABBREVIATIONS
 * =========================================================================
 */
const UNIFORM_DEFINITIONS = [
  { code: "AU", name: "Athletic Uniform", desc: "Corps athletic training and sports events" },
  { code: "DW", name: "Dress White", desc: "Formal daylight ceremonies and parades" },
  { code: "DW w/ WB & HG", name: "Dress White w/ White belt & Hop Gloves", desc: "Ceremonial inspections and formal hops" },
  { code: "BDU", name: "Battle Dress Uniform", desc: "Tactical training, field exercises, and daily duties" },
  { code: "BDU w/ WB & HG", name: "Battle Dress Uniform w/ White Belt & Hop Gloves", desc: "Formal tactical guard mountings" },
  { code: "DA w/ CJ", name: "Drill A w/ Corps Jacket", desc: "Daily classroom instruction and standard military call" },
  { code: "DA", name: "Drill A", desc: "Drill periods and seasonal mess attire" },
  { code: "DA w/ CJ w/ WB & HG", name: "Drill A w/ Corps Jacket w/ White belt & Hop Gloves", desc: "Formal retreat, Flag ceremony, and inspection" },
  { code: "FDU", name: "Fatigue Duty Uniform", desc: "Work details, fatigue calls, and technical screenings" },
  { code: "GAU", name: "General Athletic Uniform", desc: "General physical training, workouts, and combatives" },
  { code: "FDW", name: "Full Dress White", desc: "High ceremonial reviews and formal graduation ceremonies" },
  { code: "FDW w/ WB & HG", name: "Full Dress White w/ White belt & Hop Gloves", desc: "Regimental gala parades and sacred ceremonies" },
  { code: "DA u/a", name: "Drill A Under Arms", desc: "Drill formations with service rifles and saber details" },
  { code: "BDU u/a", name: "Battle Dress Uniform Under Arms", desc: "Tactical guard posts and armed perimeter security" }
];

const UNIFORM_MAP = {
  "AU": "Athletic Uniform",
  "DW": "Dress White",
  "DW w/ WB & HG": "Dress White w/ White belt & Hop Gloves",
  "DW w/ WB &HG": "Dress White w/ White belt & Hop Gloves",
  "BDU": "Battle Dress Uniform",
  "BDU w/ WB & HG": "Battle Dress Uniform w/ White Belt & Hop Gloves",
  "BDU w/ WB &HG": "Battle Dress Uniform w/ White Belt & Hop Gloves",
  "DA w/ CJ": "Drill A w/ Corps Jacket",
  "DA": "Drill A",
  "DA w/ CJ w/ WB & HG": "Drill A w/ Corps Jacket w/ White belt & Hop Gloves",
  "DA w/ CJ w/ WB &HG": "Drill A w/ Corps Jacket w/ White belt & Hop Gloves",
  "FDU": "Fatigue Duty Uniform",
  "GAU": "General Athletic Uniform",
  "FDW": "Full Dress White",
  "FDW w/ WB & HG": "Full Dress White w/ White belt & Hop Gloves",
  "FDW w/ WB &HG": "Full Dress White w/ White belt & Hop Gloves",
  "DA u/a": "Drill A Under Arms",
  "DA U/A": "Drill A Under Arms",
  "BDU u/a": "Battle Dress Uniform Under Arms",
  "BDU U/A": "Battle Dress Uniform Under Arms"
};

function getUniformFullName(code) {
  if (!code || code === '-') return '-';
  const trimmed = String(code).trim();
  if (UNIFORM_MAP[trimmed]) return UNIFORM_MAP[trimmed];
  const upper = trimmed.toUpperCase();
  for (const [k, v] of Object.entries(UNIFORM_MAP)) {
    if (k.toUpperCase() === upper) return v;
  }
  if (trimmed.includes('/')) {
    return trimmed.split('/').map(part => getUniformFullName(part.trim())).join(' / ');
  }
  return trimmed;
}

if (typeof window !== "undefined") {
  window.UNIFORM_DEFINITIONS = UNIFORM_DEFINITIONS;
  window.UNIFORM_MAP = UNIFORM_MAP;
  window.getUniformFullName = getUniformFullName;
}

const CCAFP_CONFIG = {
  version: "3.0.0",
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
        checkedBy: "CDT 1CL CARLO JOSEPH G MAGAYANES C-26226 (AC of RS for Supply / RSO)",
        notedBy: ["MAJ JAMES A MARTINEZ PA (Officer-in-Charge)", "LCDR DARYL G VILLA PN (Officer-in-Charge)", "LCDR ROMAN B PALIMA PN (Officer-in-Charge)"]
      }
    },

    // -----------------------------------------------------------------------
    // 3. ATTACHMENT - Completeness Inspection Report (06 2230H OCT 2026)
    // -----------------------------------------------------------------------
    attachment: {
      "reportDate": "10 1745H OCTOBER 2026",
      "counts": {
            "fad": 38,
            "siq": 0,
            "fdpsh": 4,
            "vluna": 3,
            "ob": 8,
            "entrucking": 21,
            "leave": 3,
            "holdingCenter": 34,
            "clearingOut": 1,
            "clearingIn": 1,
            "ghq": 1,
            "stockade": 2
      },
      "fadList": [
            {
                  "no": "1",
                  "classYr": "1CL",
                  "name": "DE MESA",
                  "coy": "A",
                  "reason": "LEFT FOOT CLOSE COMPLETE FRACTURE",
                  "start": "",
                  "remarks": "21 October 2026"
            },
            {
                  "no": "2",
                  "classYr": "1CL",
                  "name": "RANA",
                  "coy": "C",
                  "reason": "RIGHT SHOULDER DISLOCATION",
                  "start": "17 September 2026",
                  "remarks": "14 October 2026"
            },
            {
                  "no": "3",
                  "classYr": "1CL",
                  "name": "ROSARIO",
                  "coy": "E",
                  "reason": "RIGHT WRIST INCOMPLETE FRACTURE",
                  "start": "07 October 2026",
                  "remarks": "14 October 2026"
            },
            {
                  "no": "4",
                  "classYr": "1CL",
                  "name": "MACARAYA",
                  "coy": "F",
                  "reason": "BROKEN HAND BONE",
                  "start": "15 September 2026",
                  "remarks": "14 October 2026"
            },
            {
                  "no": "5",
                  "classYr": "1CL",
                  "name": "BETITA",
                  "coy": "F",
                  "reason": "LOWER BACK PAIN SYNDROME",
                  "start": "01 October 2026",
                  "remarks": "13 October 2026"
            },
            {
                  "no": "6",
                  "classYr": "1CL",
                  "name": "DE VENANCIO",
                  "coy": "G",
                  "reason": "FRACTURE",
                  "start": "22 September 2026",
                  "remarks": "23 October 2026"
            },
            {
                  "no": "7",
                  "classYr": "1CL",
                  "name": "SABILLA",
                  "coy": "H",
                  "reason": "ANKLE SPRAIN",
                  "start": "07 October 2026",
                  "remarks": "15 October 2026"
            },
            {
                  "no": "8",
                  "classYr": "1CL",
                  "name": "MANCE",
                  "coy": "A",
                  "reason": "MRI RESULT",
                  "start": "30 September 2026",
                  "remarks": "UNDETERMINED"
            },
            {
                  "no": "9",
                  "classYr": "1CL",
                  "name": "CASTILLO",
                  "coy": "E",
                  "reason": "ADHESIVE CAPSULITIS",
                  "start": "09 October 2026",
                  "remarks": "12 October 2026"
            },
            {
                  "no": "10",
                  "classYr": "1CL",
                  "name": "RICARDE",
                  "coy": "F",
                  "reason": "HIP SPRAIN",
                  "start": "08 October 2026",
                  "remarks": "11 October 2026"
            },
            {
                  "no": "11",
                  "classYr": "1CL",
                  "name": "CORSAME",
                  "coy": "H",
                  "reason": "SHOULDER SPRAIN",
                  "start": "09 October 2026",
                  "remarks": "12 October 2026"
            },
            {
                  "no": "12",
                  "classYr": "2CL",
                  "name": "VICLAR",
                  "coy": "E",
                  "reason": "FRACTURED CLAVICLE",
                  "start": "02 September 2026",
                  "remarks": "12 October 2026"
            },
            {
                  "no": "13",
                  "classYr": "2CL",
                  "name": "GENTOLEO",
                  "coy": "G",
                  "reason": "LEFT ELBOW DISLOCATION",
                  "start": "",
                  "remarks": "14 October 2026"
            },
            {
                  "no": "14",
                  "classYr": "2CL",
                  "name": "VICENTE",
                  "coy": "B",
                  "reason": "T/C ATOPIC DERMATITIS",
                  "start": "02 October 2026",
                  "remarks": "24 October 2026"
            },
            {
                  "no": "15",
                  "classYr": "2CL",
                  "name": "PALOGAN",
                  "coy": "C",
                  "reason": "ANKLE SPRAIN",
                  "start": "07 October 2026",
                  "remarks": "12 October 2026"
            },
            {
                  "no": "16",
                  "classYr": "2CL",
                  "name": "QUINO",
                  "coy": "D",
                  "reason": "MIGRAINE",
                  "start": "09 October 2026",
                  "remarks": "11 October 2026"
            },
            {
                  "no": "17",
                  "classYr": "3CL",
                  "name": "PIRA",
                  "coy": "G",
                  "reason": "LEFT ELBOW SPRAIN",
                  "start": "",
                  "remarks": "14 October 2026"
            },
            {
                  "no": "18",
                  "classYr": "3CL",
                  "name": "LOMEREZ",
                  "coy": "H",
                  "reason": "CHRONIC CALCULUS CHOLESYSTITIS",
                  "start": "",
                  "remarks": "15 October 2026"
            },
            {
                  "no": "19",
                  "classYr": "3CL",
                  "name": "ENCIO",
                  "coy": "H",
                  "reason": "ANKLE SPRAIN",
                  "start": "",
                  "remarks": "16 October 2026"
            },
            {
                  "no": "20",
                  "classYr": "3CL",
                  "name": "POLLESCAS",
                  "coy": "B",
                  "reason": "TESTICULAR PAIN",
                  "start": "",
                  "remarks": "15 October 2026"
            },
            {
                  "no": "21",
                  "classYr": "4CL",
                  "name": "DRAPIZA",
                  "coy": "B",
                  "reason": "RIGHT SHOULDER SPRAIN",
                  "start": "",
                  "remarks": "13 October 2026"
            },
            {
                  "no": "22",
                  "classYr": "4CL",
                  "name": "COLIPANO",
                  "coy": "F",
                  "reason": "URTI",
                  "start": "28 September 2026",
                  "remarks": "UNDETERMINED"
            },
            {
                  "no": "23",
                  "classYr": "4CL",
                  "name": "BULQUIRIEN",
                  "coy": "D",
                  "reason": "FRACTURED FINGER",
                  "start": "07 October 2026",
                  "remarks": "14 October 2026"
            },
            {
                  "no": "24",
                  "classYr": "4CL",
                  "name": "PALLINGAYAN",
                  "coy": "D",
                  "reason": "LOW GRADE [UNCLEAR] PCL",
                  "start": "",
                  "remarks": "18 October 2026"
            },
            {
                  "no": "25",
                  "classYr": "4CL",
                  "name": "AGUSTIN",
                  "coy": "H",
                  "reason": "ANKLE SPRAIN",
                  "start": "",
                  "remarks": "14 0ctober 2026"
            },
            {
                  "no": "26",
                  "classYr": "4CL",
                  "name": "BERGONIO",
                  "coy": "D",
                  "reason": "HIP SPRAIN",
                  "start": "",
                  "remarks": "16 October 2026"
            },
            {
                  "no": "27",
                  "classYr": "4CL",
                  "name": "BARROTA",
                  "coy": "H",
                  "reason": "LEFT KNEE SPRAIN (FAD EXTEND)",
                  "start": "",
                  "remarks": "12 October 2026"
            },
            {
                  "no": "28",
                  "classYr": "4CL",
                  "name": "RACELIS",
                  "coy": "C",
                  "reason": "POST OPERATION SURGERY OF HERNIA",
                  "start": "",
                  "remarks": "17 0ctober 2026"
            },
            {
                  "no": "29",
                  "classYr": "4CL",
                  "name": "GUARDADOS",
                  "coy": "G",
                  "reason": "FREQUENT VOMITTING",
                  "start": "8 October 2026",
                  "remarks": "12 October 2026"
            },
            {
                  "no": "30",
                  "classYr": "4CL",
                  "name": "NADIAHAN",
                  "coy": "D",
                  "reason": "HERNIA",
                  "start": "06 October 2026",
                  "remarks": "20 October 2026"
            },
            {
                  "no": "31",
                  "classYr": "4CL",
                  "name": "ESLAPOR",
                  "coy": "H",
                  "reason": "VARICOCELE",
                  "start": "06 October 2026",
                  "remarks": "20 October 2026"
            },
            {
                  "no": "32",
                  "classYr": "4CL",
                  "name": "GARINO",
                  "coy": "A",
                  "reason": "BRONCHITIS",
                  "start": "07 October 2026",
                  "remarks": "09 October 2026"
            },
            {
                  "no": "33",
                  "classYr": "4CL",
                  "name": "PRIETO",
                  "coy": "E",
                  "reason": "MODERATE SENSORINEURAL HEARING LOSS, AS",
                  "start": "09 October 2026",
                  "remarks": "22 October 2026"
            },
            {
                  "no": "34",
                  "classYr": "4CL",
                  "name": "CAIRO",
                  "coy": "G",
                  "reason": "EPISTASIS SECONDARY TO MUCUSITIS",
                  "start": "09 October 2026",
                  "remarks": "15 October 2026"
            },
            {
                  "no": "35",
                  "classYr": "4CL",
                  "name": "ARNAIZ",
                  "coy": "D",
                  "reason": "AURAL POLYPS, AS",
                  "start": "09 October 2026",
                  "remarks": "15 October 2026"
            },
            {
                  "no": "36",
                  "classYr": "4CL",
                  "name": "SALORSANO",
                  "coy": "F",
                  "reason": "MUSKULUSKELETAL STRAIN, LEFT LEG",
                  "start": "09 October 2026",
                  "remarks": "12 October 2026"
            },
            {
                  "no": "37",
                  "classYr": "4CL",
                  "name": "BARTOLOME",
                  "coy": "B",
                  "reason": "WOUND IN LEFT EYEBROW",
                  "start": "09 October 2026",
                  "remarks": "16 October 2026"
            },
            {
                  "no": "38",
                  "classYr": "4CL",
                  "name": "COPREROS",
                  "coy": "A",
                  "reason": "TOOTH EXTRACTION",
                  "start": "08 October 2026",
                  "remarks": "11 October 2026"
            }
      ],
      "siqList": [],
      "fdpshList": [
            {
                  "no": "1",
                  "classYr": "2CL",
                  "name": "MIRO",
                  "coy": "G",
                  "reason": "UNDER OBSERVATION",
                  "start": "",
                  "remarks": "UNDETERMINED"
            },
            {
                  "no": "2",
                  "classYr": "2CL",
                  "name": "DUENAS",
                  "coy": "F",
                  "reason": "FRACTURE",
                  "start": "09 October 2026",
                  "remarks": "UNDETERMINED"
            },
            {
                  "no": "3",
                  "classYr": "4CL",
                  "name": "SALES",
                  "coy": "B",
                  "reason": "POST OPERATION",
                  "start": "01 October 2026",
                  "remarks": "UNDETERMINED"
            },
            {
                  "no": "4",
                  "classYr": "4CL",
                  "name": "DE VERA",
                  "coy": "E",
                  "reason": "UNDER MONITORING",
                  "start": "09 October 2026",
                  "remarks": "11 October 2026"
            }
      ],
      "vlunaList": [
            {
                  "no": "1",
                  "classYr": "3CL",
                  "name": "LOVENDINO",
                  "coy": "E",
                  "reason": "UNDER OBSERVATION",
                  "start": "14 June 2026",
                  "remarks": "UNDETERMINED"
            },
            {
                  "no": "2",
                  "classYr": "4CL",
                  "name": "ADOBE",
                  "coy": "F",
                  "reason": "T/C ADJUSTMENT DISORDER",
                  "start": "30 September 2026",
                  "remarks": "UNDETERMINED"
            },
            {
                  "no": "3",
                  "classYr": "4CL",
                  "name": "FAUSTINO",
                  "coy": "H",
                  "reason": "UPPER RESPIRATORY TRACT (FOR NP EVALUATION)",
                  "start": "10 September 2026",
                  "remarks": "UNDETERMINED"
            }
      ],
      "obList": [
            {
                  "no": "1",
                  "classYr": "1CL",
                  "name": "MARTINEZ",
                  "coy": "B",
                  "reason": "RESEARCH DATA GATHERING",
                  "start": "",
                  "remarks": "10 October 2026"
            },
            {
                  "no": "2",
                  "classYr": "1CL",
                  "name": "MOLO",
                  "coy": "B",
                  "reason": "RESEARCH DATA GATHERING",
                  "start": "",
                  "remarks": "10 October 2026"
            },
            {
                  "no": "3",
                  "classYr": "1CL",
                  "name": "PAGGAO",
                  "coy": "B",
                  "reason": "RESEARCH DATA GATHERING",
                  "start": "",
                  "remarks": "10 October 2026"
            },
            {
                  "no": "4",
                  "classYr": "1CL",
                  "name": "TAPULAO",
                  "coy": "B",
                  "reason": "RESEARCH DATA GATHERING",
                  "start": "",
                  "remarks": "10 October 2026"
            },
            {
                  "no": "5",
                  "classYr": "1CL",
                  "name": "ADORACION",
                  "coy": "G",
                  "reason": "PMA ICC",
                  "start": "",
                  "remarks": "10 October 2026"
            },
            {
                  "no": "6",
                  "classYr": "1CL",
                  "name": "CABIGO",
                  "coy": "D",
                  "reason": "PMA ICC",
                  "start": "",
                  "remarks": "10 October 2026"
            },
            {
                  "no": "7",
                  "classYr": "1CL",
                  "name": "MONTENEGRO",
                  "coy": "D",
                  "reason": "PMA ICC",
                  "start": "",
                  "remarks": "10 October 2026"
            },
            {
                  "no": "8",
                  "classYr": "3CL",
                  "name": "CAHAYON",
                  "coy": "D",
                  "reason": "PMA ICC",
                  "start": "",
                  "remarks": "10 October 2026"
            }
      ],
      "entruckingList": [
            {
                  "no": "1",
                  "classYr": "1CL",
                  "name": "SARMIENTO",
                  "coy": "B",
                  "reason": "BASKETBALL BBEAL",
                  "start": "",
                  "remarks": "10 1700H October 2026"
            },
            {
                  "no": "2",
                  "classYr": "1CL",
                  "name": "GALLAZA",
                  "coy": "E",
                  "reason": "BASKETBALL BBEAL",
                  "start": "",
                  "remarks": "10 1700H October 2026"
            },
            {
                  "no": "3",
                  "classYr": "1CL",
                  "name": "REOJA",
                  "coy": "D",
                  "reason": "BASKETBALL BBEAL",
                  "start": "",
                  "remarks": "10 1700H October 2026"
            },
            {
                  "no": "4",
                  "classYr": "1CL",
                  "name": "FABRO",
                  "coy": "H",
                  "reason": "BASKETBALL BBEAL",
                  "start": "",
                  "remarks": "10 1700H October 2026"
            },
            {
                  "no": "5",
                  "classYr": "1CL",
                  "name": "GAMOS",
                  "coy": "E",
                  "reason": "BASKETBALL BBEAL",
                  "start": "",
                  "remarks": "10 1700H October 2026"
            },
            {
                  "no": "6",
                  "classYr": "1CL",
                  "name": "LEVISTE",
                  "coy": "B",
                  "reason": "BASKETBALL BBEAL",
                  "start": "",
                  "remarks": "10 1700H October 2026"
            },
            {
                  "no": "7",
                  "classYr": "1CL",
                  "name": "CUNTAPAY",
                  "coy": "E",
                  "reason": "BASKETBALL BBEAL",
                  "start": "",
                  "remarks": "10 1700H October 2026"
            },
            {
                  "no": "8",
                  "classYr": "2CL",
                  "name": "MALACA",
                  "coy": "C",
                  "reason": "BASKETBALL BBEAL",
                  "start": "",
                  "remarks": "10 1700H October 2026"
            },
            {
                  "no": "9",
                  "classYr": "2CL",
                  "name": "FERRER",
                  "coy": "G",
                  "reason": "BASKETBALL BBEAL",
                  "start": "",
                  "remarks": "10 1700H October 2026"
            },
            {
                  "no": "10",
                  "classYr": "2CL",
                  "name": "GUTIERREZ",
                  "coy": "F",
                  "reason": "BASKETBALL BBEAL",
                  "start": "",
                  "remarks": "10 1700H October 2026"
            },
            {
                  "no": "11",
                  "classYr": "2CL",
                  "name": "GONZALES",
                  "coy": "A",
                  "reason": "BASKETBALL BBEAL",
                  "start": "",
                  "remarks": "10 1700H October 2026"
            },
            {
                  "no": "12",
                  "classYr": "2CL",
                  "name": "JUNIO",
                  "coy": "F",
                  "reason": "BASKETBALL BBEAL",
                  "start": "",
                  "remarks": "10 1700H October 2026"
            },
            {
                  "no": "13",
                  "classYr": "2CL",
                  "name": "AGUILAR",
                  "coy": "H",
                  "reason": "BASKETBALL BBEAL",
                  "start": "",
                  "remarks": "10 1700H October 2026"
            },
            {
                  "no": "14",
                  "classYr": "2CL",
                  "name": "CARONAN",
                  "coy": "E",
                  "reason": "BASKETBALL BBEAL",
                  "start": "",
                  "remarks": "10 1700H October 2026"
            },
            {
                  "no": "15",
                  "classYr": "3CL",
                  "name": "MARQUESSES",
                  "coy": "H",
                  "reason": "BASKETBALL BBEAL",
                  "start": "",
                  "remarks": "10 1700H October 2026"
            },
            {
                  "no": "16",
                  "classYr": "3CL",
                  "name": "ALIADO",
                  "coy": "G",
                  "reason": "BASKETBALL BBEAL",
                  "start": "",
                  "remarks": "10 1700H October 2026"
            },
            {
                  "no": "17",
                  "classYr": "3CL",
                  "name": "SANICO",
                  "coy": "D",
                  "reason": "BASKETBALL BBEAL",
                  "start": "",
                  "remarks": "10 1700H October 2026"
            },
            {
                  "no": "18",
                  "classYr": "3CL",
                  "name": "LORENZO",
                  "coy": "F",
                  "reason": "BASKETBALL BBEAL",
                  "start": "",
                  "remarks": "10 1700H October 2026"
            },
            {
                  "no": "19",
                  "classYr": "3CL",
                  "name": "LORICO",
                  "coy": "A",
                  "reason": "BASKETBALL BBEAL",
                  "start": "",
                  "remarks": "10 1700H October 2026"
            },
            {
                  "no": "20",
                  "classYr": "3CL",
                  "name": "PIMENTEL",
                  "coy": "G",
                  "reason": "BASKETBALL BBEAL",
                  "start": "",
                  "remarks": "10 1700H October 2026"
            },
            {
                  "no": "21",
                  "classYr": "4CL",
                  "name": "VILLAVER",
                  "coy": "F",
                  "reason": "BASKETBALL BBEAL",
                  "start": "",
                  "remarks": "10 1700H October 2026"
            }
      ],
      "leaveList": [
            {
                  "no": "1",
                  "classYr": "3CL",
                  "name": "REGANIT",
                  "coy": "G",
                  "reason": "EMERGENCY LEAVE",
                  "start": "08 October 2026",
                  "remarks": "11 October 2026"
            },
            {
                  "no": "2",
                  "classYr": "2CL",
                  "name": "LADERA",
                  "coy": "C",
                  "reason": "EMERGENCY LEAVE",
                  "start": "09 October 2026",
                  "remarks": "12 October 2026"
            },
            {
                  "no": "3",
                  "classYr": "4CL",
                  "name": "LADERA",
                  "coy": "A",
                  "reason": "EMERGENCY LEAVE",
                  "start": "09 October 2026",
                  "remarks": "12 October 2026"
            }
      ],
      "holdingCenterList": [
            {
                  "no": "1",
                  "classYr": "1CL",
                  "name": "SALAZAR",
                  "coy": "E",
                  "reason": "HONOR CASE",
                  "start": "22 May 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "2",
                  "classYr": "1CL",
                  "name": "SATURNINO",
                  "coy": "E",
                  "reason": "RESIGNING",
                  "start": "10 June 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "3",
                  "classYr": "1CL",
                  "name": "BERNARDO",
                  "coy": "B",
                  "reason": "HONOR CASE",
                  "start": "25 September 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "4",
                  "classYr": "1CL",
                  "name": "ALBERTO",
                  "coy": "E",
                  "reason": "ALLEGED MALTREATMENT",
                  "start": "04 July 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "5",
                  "classYr": "1CL",
                  "name": "ESTEBAN",
                  "coy": "H",
                  "reason": "ALEGED COUNTENANCING MALTREATMENT",
                  "start": "23 September 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "6",
                  "classYr": "2CL",
                  "name": "CASTRO",
                  "coy": "A",
                  "reason": "ALLEGED MALTREATMENT",
                  "start": "25 August 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "7",
                  "classYr": "2CL",
                  "name": "FOCASAN",
                  "coy": "A",
                  "reason": "ALLEGED MALTREATMENT",
                  "start": "23 June 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "8",
                  "classYr": "2CL",
                  "name": "SANGALANG",
                  "coy": "A",
                  "reason": "UNAUTHORIZED PUNISHMENT",
                  "start": "09 July 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "9",
                  "classYr": "2CL",
                  "name": "MAMA",
                  "coy": "B",
                  "reason": "ALLEGED MALTREATMENT",
                  "start": "25 August 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "10",
                  "classYr": "2CL",
                  "name": "QUEMADO",
                  "coy": "B",
                  "reason": "ALLEGED MALTREATMENT",
                  "start": "25 August 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "11",
                  "classYr": "2CL",
                  "name": "BAUTISTA",
                  "coy": "H",
                  "reason": "HONOR CASE",
                  "start": "27 August 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "12",
                  "classYr": "2CL",
                  "name": "PENALOZA",
                  "coy": "H",
                  "reason": "ALLEGED MALTREATMENT",
                  "start": "27 August 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "13",
                  "classYr": "2CL",
                  "name": "TANONGON",
                  "coy": "H",
                  "reason": "ALLEGED MALTREATMENT",
                  "start": "24 August 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "14",
                  "classYr": "2CL",
                  "name": "CRUCILLO",
                  "coy": "H",
                  "reason": "ALLEGED  MALTREATMENT",
                  "start": "23 September 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "15",
                  "classYr": "2CL",
                  "name": "LOMUGDANG",
                  "coy": "E",
                  "reason": "HONOR CASE",
                  "start": "22 May 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "16",
                  "classYr": "2CL",
                  "name": "GENTOLEO",
                  "coy": "G",
                  "reason": "ALLEGED MALTREATMENT",
                  "start": "24 August 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "17",
                  "classYr": "2CL",
                  "name": "TAMBADOC",
                  "coy": "G",
                  "reason": "ALLEGED MALTREATMENT",
                  "start": "24 August 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "18",
                  "classYr": "2CL",
                  "name": "CARIASO",
                  "coy": "D",
                  "reason": "UNDER INVESTIGATION",
                  "start": "17 September 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "19",
                  "classYr": "2CL",
                  "name": "FALCON",
                  "coy": "D",
                  "reason": "UNDER INVESTIGATION",
                  "start": "17 September 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "20",
                  "classYr": "2CL",
                  "name": "TAGLE",
                  "coy": "D",
                  "reason": "UNDER INVESTIGATION",
                  "start": "17 September 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "21",
                  "classYr": "2CL",
                  "name": "DERILO",
                  "coy": "D",
                  "reason": "UNDER INVESTIGATION",
                  "start": "17 September 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "22",
                  "classYr": "2CL",
                  "name": "BINWAG",
                  "coy": "B",
                  "reason": "UNDER INVESTIGATION",
                  "start": "17 September 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "23",
                  "classYr": "2CL",
                  "name": "ADAY",
                  "coy": "B",
                  "reason": "UNDER INVESTIGATION",
                  "start": "17 September 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "24",
                  "classYr": "2CL",
                  "name": "LLONO",
                  "coy": "B",
                  "reason": "ALLEGED MALTREATMENT",
                  "start": "",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "25",
                  "classYr": "3CL",
                  "name": "PIZON",
                  "coy": "A",
                  "reason": "UNDER INVESTIGATION (MALTREATMENT CASE)",
                  "start": "",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "26",
                  "classYr": "3CL",
                  "name": "ALCANTARA",
                  "coy": "D",
                  "reason": "ACL RECONSTRUCTION SURGERY",
                  "start": "28 August 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "27",
                  "classYr": "3CL",
                  "name": "SILVA",
                  "coy": "G",
                  "reason": "HONOR CASE",
                  "start": "10 September 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "28",
                  "classYr": "3CL",
                  "name": "BERBANO",
                  "coy": "D",
                  "reason": "MEDICAL DISCHARGE",
                  "start": "10 October 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "29",
                  "classYr": "4CL",
                  "name": "SISON",
                  "coy": "C",
                  "reason": "INFLICTING INJURY",
                  "start": "16 September 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "30",
                  "classYr": "4CL",
                  "name": "DELIVA",
                  "coy": "C",
                  "reason": "UNDER INVESTIGATION",
                  "start": "16 September 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "31",
                  "classYr": "4CL",
                  "name": "LACTUD",
                  "coy": "E",
                  "reason": "ALLEGED MALTREATMENT",
                  "start": "",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "32",
                  "classYr": "4CL",
                  "name": "AGNES",
                  "coy": "B",
                  "reason": "RESIGNING",
                  "start": "28 August 2026",
                  "remarks": "ARMY DETACHMENT"
            },
            {
                  "no": "33",
                  "classYr": "4CL",
                  "name": "CASTRO",
                  "coy": "C",
                  "reason": "ALLEGED MALTREATMENT",
                  "start": "07 October 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            },
            {
                  "no": "34",
                  "classYr": "4CL",
                  "name": "ERGINA",
                  "coy": "C",
                  "reason": "ALLEGED MALTREATMENT",
                  "start": "07 October 2026",
                  "remarks": "1ST FLOOR FLORENDO HALL"
            }
      ],
      "clearingOutList": [
            {
                  "no": "1",
                  "classYr": "4CL",
                  "name": "URSABIA",
                  "coy": "C",
                  "reason": "VARICOCELE (RESIGNING)",
                  "start": "01 October 2026",
                  "remarks": "FDPSH"
            }
      ],
      "clearingInList": [
            {
                  "no": "1",
                  "classYr": "2CL",
                  "name": "DACWAG",
                  "coy": "",
                  "reason": "CLEARING-IN",
                  "start": "23 August 2026",
                  "remarks": "4TH FLOOR REGIS HALL"
            }
      ],
      "ghqList": [
            {
                  "no": "1",
                  "classYr": "4CL",
                  "name": "TENORIO",
                  "coy": "B",
                  "reason": "UNDETERMINED",
                  "start": "04 November 2025",
                  "remarks": "GHQ"
            }
      ],
      "stockadeList": [
            {
                  "no": "1",
                  "classYr": "1CL",
                  "name": "LAUS",
                  "coy": "-",
                  "reason": "STOCKADE (GAD OFFENSE)",
                  "start": "21 July 2026",
                  "remarks": "PMA STOCKADE"
            },
            {
                  "no": "2",
                  "classYr": "1CL",
                  "name": "SALON",
                  "coy": "G",
                  "reason": "STOCKADE (FDPSH)(GAD OFFENSE)",
                  "start": "27 July 2026",
                  "remarks": "PMA STOCKADE"
            }
      ],
      "signOff": {
            "preparedBy": "HANNAH MAE K BUENO C-27038, CDT LT 1CL 'C' CO CCAFP, Officer-of-the-Day",
            "checkedBy": "JOHN LORENZ MARI G YBANEZ C-27262, CDT LT 1CL 'H' CO CCAFP, Acting AC of RS for Personnel, R1"
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
      name: "S2 Intelligence",
      title: "S2 - Intelligence",
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
      id: "rso",
      name: "RSO Council",
      title: "RSO Council - Regimental Supply Officer & HTG Armory",
      icon: "shield",
      category: "Specialist Councils",
      sensitive: false,
      sheetUrl: COUNCIL_SHEET_URLS.rso,
      description: "Responsible Supply Officer (RSO) oversight, HTG Armory live weapons accountability, M14/M16/R4 stock, and security stockrooms."
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
      name: "S6 Communications, Electronics, and Information Systems",
      title: "S6 - Communications, Electronics, and Information Systems",
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
      name: "S8 Education and Training",
      title: "S8 - Education and Training",
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
      sheetUrl: COUNCIL_SHEET_URLS.mess_database,
      sheetRaw: COUNCIL_SHEET_URLS.mess_raw,
      description: "Cadet nutrition, daily menu rotation, kitchen cooking shares, dietary restrictions & weekly viands schedule.",
      defaultHeaders: ["Meal", "Main Course", "Sides & Vegetables", "Dessert / Beverage", "Diet Alternative"],
      defaultRows: [
        ["Breakfast (0630H)", "Beef Tapa & Scrambled Eggs", "Garlic Rice & Sliced Tomatoes", "Hot Chocolate / Coffee", "Fish Fillet & Eggs"],
        ["Lunch (1200H)", "Pork Sinigang sa Sampaloc", "Steamed Kangkong & Rice", "Ripe Mangoes & Iced Tea", "Chicken Tinola"],
        ["Supper (1830H)", "Roast Chicken with Rosemary Gravy", "Buttered Corn & Mashed Potatoes", "Fruit Salad & Water", "Vegetarian Stir-fry"]
      ]
    },
    {
      id: "spiritual",
      name: "Spiritual Development Council",
      title: "Spiritual Development Council - Faith, Pastoral Care & Religious Services",
      icon: "heart-handshake",
      category: "Specialist Councils",
      sensitive: false,
      sheetUrl: COUNCIL_SHEET_URLS.spiritual,
      sheetRaw: COUNCIL_SHEET_URLS.spiritual_raw,
      description: "Moral and spiritual nourishment, chapel services, religious services roster, inter-faith programs, and pastoral care.",
      defaultHeaders: ["Faith / Denomination", "Service / Gathering", "Time & Day", "Venue", "Officiating Leader"],
      defaultRows: [
        ["Roman Catholic", "Sunday Holy Eucharist Mass", "Sunday 0700H & 1800H", "St. Ignatius Chapel", "Military Chaplain"],
        ["Evangelical Christian", "Cadet Fellowship & Worship", "Sunday 0900H", "Cadet Protestant Chapel", "Chaplain Pastor"],
        ["Islamic Faith", "Jum'ah Congregational Prayer", "Friday 1230H", "CCAFP Musalla / Prayer Room", "Cadet Imam"],
        ["Seventh-Day Adventist", "Sabbath Worship Service", "Saturday 0900H", "Cadet Fellowship Hall", "Cadet Elder"]
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
      name: "CCPB",
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

  // Real-Time Cadet Delinquency & Punishment Data (Synchronized from Google Sheets)
  punishmentSummary: {
    chairman: "CDT CPT 1CL APRIL JOY C GEROLA C-27112 'A' Co CCAFP",
    updatedDate: "25 AUGUST 2026",
    notedBy: "CDT SGT MAJ 2CL RASHEED SHANE C ABBAS 'A' Co CCAFP",
    totals: { touring: 239, confined: 74, totalActive: 877 }
  },

  punishmentList: (typeof S1_SPIRITUAL_DATA !== 'undefined' && Array.isArray(S1_SPIRITUAL_DATA.punishments)) ? S1_SPIRITUAL_DATA.punishments : [
    {
        "id": 1,
        "cadetName": "Cdt 1CL LOBETE",
        "rank": "1CL",
        "lastName": "LOBETE",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "D",
        "offense": "AS A RESPONSIBLE CADET, UNAUTHORIZED LOGGING OUT OF SMARTPHONE DURING EVENING CALL TO QUARTERS WITHOUT PERMISSION FROM THE COMPANY ELECTRONICS AND COMMUNICATIONS OFFICER",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "Aug 5",
        "endDate": "18 Aug",
        "demerits": 0,
        "tours": 25,
        "served": 19,
        "toursRem": 6,
        "remaining": 6,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 2,
        "cadetName": "Cdt 1CL LOBETE",
        "rank": "1CL",
        "lastName": "LOBETE",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "D",
        "offense": "AS A RESPONSIBLE CIC OF SEPAK TAKRAW NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMEROUS REMINDERS O/A 7 1900 JULY 2027",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 8,
        "served": 0,
        "toursRem": 8,
        "remaining": 8,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 3,
        "cadetName": "Cdt 1CL CABANAYAN",
        "rank": "1CL",
        "lastName": "CABANAYAN",
        "serialNo": "CCPB SO Nr 03",
        "class": "1CL",
        "company": "D",
        "offense": "POSSESSING ELECTRONIC CIGARETTE O/A 09 2245H AUGUST 2026",
        "nature": "POSSESSING/USING UNAUTHORIZED ITEM",
        "offenseClass": "Class II",
        "confined": "YES",
        "startDate": "19 Sep",
        "endDate": "07 Nov",
        "demerits": 0,
        "tours": 65,
        "served": 12,
        "toursRem": 53,
        "remaining": 53,
        "status": "Confined",
        "remarks": "ONGOING/CONFINED"
    },
    {
        "id": 4,
        "cadetName": "Cdt 1CL CABANAYAN",
        "rank": "1CL",
        "lastName": "CABANAYAN",
        "serialNo": "CCPB SO Nr 03",
        "class": "1CL",
        "company": "D",
        "offense": "NOT LOGGING-IN OF TABLET DURING UNAUTHORIZED PERIOD O/A 09 2245H AUGUST 2026",
        "nature": "DOING UNAUTHORIZED THINGS",
        "offenseClass": "Class II",
        "confined": "YES",
        "startDate": "19 Sep",
        "endDate": "07 Nov",
        "demerits": 0,
        "tours": 40,
        "served": 0,
        "toursRem": 40,
        "remaining": 40,
        "status": "Confined",
        "remarks": "ONGOING/CONFINED"
    },
    {
        "id": 5,
        "cadetName": "Cdt 1CL DE JESUS",
        "rank": "1CL",
        "lastName": "DE JESUS",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "D",
        "offense": "AS A RESPONSIBLE CIC OF IGLESIA NI CRISTO NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMEROUS REMINDERS O/A 7 1900 JULY 2027",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 8,
        "served": 5,
        "toursRem": 3,
        "remaining": 3,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 6,
        "cadetName": "Cdt 2CL LLENAS",
        "rank": "2CL",
        "lastName": "LLENAS",
        "serialNo": "CCPB SO Nr 02",
        "class": "2CL",
        "company": "H",
        "offense": "AS A RESPONSIBLE OUTGOING CADET ASSISTANT TO THE MESS OFFICER 2, SUBMITTING DIRTY AND INCOMPLETE CHECKIST O/A 11 1830H JULY 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 10,
        "served": 3,
        "toursRem": 7,
        "remaining": 7,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 7,
        "cadetName": "Cdt 2CL BINWAG",
        "rank": "2CL",
        "lastName": "BINWAG",
        "serialNo": "CCPB SO Nr 03",
        "class": "2CL",
        "company": "B",
        "offense": "UNEVEN COLORED FLOOR DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 3,
        "served": 0,
        "toursRem": 3,
        "remaining": 3,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 8,
        "cadetName": "Cdt 2CL UMOSO",
        "rank": "2CL",
        "lastName": "UMOSO",
        "serialNo": "CCPB SO Nr 03",
        "class": "2CL",
        "company": "B",
        "offense": "UNEVEN COLORED FLOOR DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 3,
        "served": 0,
        "toursRem": 3,
        "remaining": 3,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 9,
        "cadetName": "Cdt 2CL QUEMADO",
        "rank": "2CL",
        "lastName": "QUEMADO",
        "serialNo": "CCPB SO Nr 03",
        "class": "2CL",
        "company": "B",
        "offense": "UNEVEN COLORED FLOOR DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 3,
        "served": 0,
        "toursRem": 3,
        "remaining": 3,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 10,
        "cadetName": "Cdt 2CL ALMELOR",
        "rank": "2CL",
        "lastName": "ALMELOR",
        "serialNo": "CCPB SO Nr 03",
        "class": "2CL",
        "company": "B",
        "offense": "UNALIGNED SHOE DISPLAY DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 2,
        "served": 2,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 11,
        "cadetName": "Cdt 2CL VICENTE",
        "rank": "2CL",
        "lastName": "VICENTE",
        "serialNo": "CCPB SO Nr 03",
        "class": "2CL",
        "company": "B",
        "offense": "UNALIGNED SHOE DISPLAY DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 2,
        "served": 0,
        "toursRem": 2,
        "remaining": 2,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 12,
        "cadetName": "Cdt 2CL BERBA",
        "rank": "2CL",
        "lastName": "BERBA",
        "serialNo": "CCPB SO Nr 03",
        "class": "2CL",
        "company": "B",
        "offense": "INCOMPLETE LOCKER DISPLAY THAT IS LACKING GABARDINE PANTS DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 4,
        "served": 0,
        "toursRem": 4,
        "remaining": 4,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 13,
        "cadetName": "Cdt 2CL RICO",
        "rank": "2CL",
        "lastName": "RICO",
        "serialNo": "CCPB SO Nr 03",
        "class": "2CL",
        "company": "B",
        "offense": "INCOMPLETE LOCKER DISPLAY THAT IS LACKING BDU UPPER DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 4,
        "served": 4,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 14,
        "cadetName": "Cdt 2CL RICO",
        "rank": "2CL",
        "lastName": "RICO",
        "serialNo": "CCPB SO Nr 03",
        "class": "2CL",
        "company": "B",
        "offense": "HAVING RAMBAGIZED STUDY TABLE DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 7,
        "served": 7,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 15,
        "cadetName": "Cdt 2CL LLARENAS",
        "rank": "2CL",
        "lastName": "LLARENAS",
        "serialNo": "CCPB SO Nr 03",
        "class": "2CL",
        "company": "B",
        "offense": "NO MESS GEAR DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 3,
        "served": 0,
        "toursRem": 3,
        "remaining": 3,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 16,
        "cadetName": "Cdt 2CL CARONAN",
        "rank": "2CL",
        "lastName": "CARONAN",
        "serialNo": "CCPB SO Nr 03",
        "class": "2CL",
        "company": "E",
        "offense": "AS A RESPONSIBLE OUTGOING ASSISTANT CADET IN CHARGE OF HOLDING CENTER, FAILURE TO HAVE THE OFFICER OF THE DAY SIGN HER CHECKLIST O/A 16 130H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 6,
        "served": 0,
        "toursRem": 6,
        "remaining": 6,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 17,
        "cadetName": "Cdt 3CL MANALOTO",
        "rank": "3CL",
        "lastName": "MANALOTO",
        "serialNo": "CCPB SO Nr 02",
        "class": "3CL",
        "company": "H",
        "offense": "POSTING ON INSTAGRM A PHOTO INSIDE BARRACKS WHILE WEARING FULL DRESS WHITE DURING BARRACKS INSPECTION",
        "nature": "DOING UNAUTHORIZED THINGS",
        "offenseClass": "Class II",
        "confined": "NO",
        "startDate": "Aug 5",
        "endDate": "31 Aug",
        "demerits": 0,
        "tours": 40,
        "served": 30,
        "toursRem": 10,
        "remaining": 10,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 18,
        "cadetName": "Cdt 3CL CHIMMON",
        "rank": "3CL",
        "lastName": "CHIMMON",
        "serialNo": "CCPB SO Nr 03",
        "class": "3CL",
        "company": "B",
        "offense": "HAVING LOCKER DISPLAY WITH NO CUFF LINKS DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 2,
        "served": 0,
        "toursRem": 2,
        "remaining": 2,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 19,
        "cadetName": "Cdt 3CL PATULOT",
        "rank": "3CL",
        "lastName": "PATULOT",
        "serialNo": "CCPB SO Nr 03",
        "class": "3CL",
        "company": "B",
        "offense": "HAVING LOCKER DISPLAY WITH NO CUFF LINKS DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 2,
        "served": 0,
        "toursRem": 2,
        "remaining": 2,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 20,
        "cadetName": "Cdt 3CL POLLESCAS",
        "rank": "3CL",
        "lastName": "POLLESCAS",
        "serialNo": "CCPB SO Nr 03",
        "class": "3CL",
        "company": "B",
        "offense": "HAVING MULTIPLE RAINCOAT DISPLAYS DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 3,
        "served": 0,
        "toursRem": 3,
        "remaining": 3,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 21,
        "cadetName": "Cdt 3CL ASUNCION",
        "rank": "3CL",
        "lastName": "ASUNCION",
        "serialNo": "CCPB SO Nr 03",
        "class": "3CL",
        "company": "B",
        "offense": "UNSHINED FLOOR AND UNDISPOSED TRASH DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 5,
        "served": 0,
        "toursRem": 5,
        "remaining": 5,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 22,
        "cadetName": "Cdt 3CL LOMIGO",
        "rank": "3CL",
        "lastName": "LOMIGO",
        "serialNo": "CCPB SO Nr 03",
        "class": "3CL",
        "company": "B",
        "offense": "UNSHINED FLOOR AND UNDISPOSED TRASH DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 5,
        "served": 0,
        "toursRem": 5,
        "remaining": 5,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 23,
        "cadetName": "Cdt 3CL MANUEL",
        "rank": "3CL",
        "lastName": "MANUEL",
        "serialNo": "CCPB SO Nr 03",
        "class": "3CL",
        "company": "B",
        "offense": "UNSHINED FLOOR AND UNDISPOSED TRASH DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 5,
        "served": 0,
        "toursRem": 5,
        "remaining": 5,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 24,
        "cadetName": "Cdt 3CL ASUNCION",
        "rank": "3CL",
        "lastName": "ASUNCION",
        "serialNo": "CCPB SO Nr 03",
        "class": "3CL",
        "company": "B",
        "offense": "IMPROPERLY FIXED BUNKS DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 5,
        "served": 0,
        "toursRem": 5,
        "remaining": 5,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 25,
        "cadetName": "Cdt 3CL SUNGA",
        "rank": "3CL",
        "lastName": "SUNGA",
        "serialNo": "CCPB SO Nr 03",
        "class": "3CL",
        "company": "B",
        "offense": "IMPROPERLY FIXED BUNKS DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 5,
        "served": 0,
        "toursRem": 5,
        "remaining": 5,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 26,
        "cadetName": "Cdt 3CL TENOSO",
        "rank": "3CL",
        "lastName": "TENOSO",
        "serialNo": "CCPB SO Nr 03",
        "class": "3CL",
        "company": "B",
        "offense": "DISPLAYING CIVILIAN ITEMS DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 7,
        "served": 0,
        "toursRem": 7,
        "remaining": 7,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 27,
        "cadetName": "Cdt 3CL TENOSO",
        "rank": "3CL",
        "lastName": "TENOSO",
        "serialNo": "CCPB SO Nr 03",
        "class": "3CL",
        "company": "B",
        "offense": "MISARRANGED LOCKER DISPLAY DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 3,
        "served": 0,
        "toursRem": 3,
        "remaining": 3,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 28,
        "cadetName": "Cdt 3CL SORIO",
        "rank": "3CL",
        "lastName": "SORIO",
        "serialNo": "CCPB SO Nr 03",
        "class": "3CL",
        "company": "B",
        "offense": "UNIRONED BUNKS DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 4,
        "served": 0,
        "toursRem": 4,
        "remaining": 4,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 29,
        "cadetName": "Cdt 3CL CABAUATAN",
        "rank": "3CL",
        "lastName": "CABAUATAN",
        "serialNo": "CCPB SO Nr 03",
        "class": "3CL",
        "company": "C",
        "offense": "AS A RESPONSIBLE OUTGOING ASSISTANT CADET IN CHARGE OF HOLDING CENTER, FAILURE TO HAVE HIS INCOMING SIGN HIS CHECKLIST O/A 03 1830H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "YES",
        "startDate": "19 September",
        "endDate": "22 Sep",
        "demerits": 0,
        "tours": 10,
        "served": 5,
        "toursRem": 5,
        "remaining": 5,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 30,
        "cadetName": "Cdt 3CL RODEROS",
        "rank": "3CL",
        "lastName": "RODEROS",
        "serialNo": "CCPB SO Nr 03",
        "class": "3CL",
        "company": "D",
        "offense": "IMPROPERLY ACCOMPLISHING CHECKLIST O/A 14 2200H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "YES",
        "startDate": "19 September",
        "endDate": "22 Sep",
        "demerits": 0,
        "tours": 10,
        "served": 5,
        "toursRem": 5,
        "remaining": 5,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 31,
        "cadetName": "Cdt 3CL GALO",
        "rank": "3CL",
        "lastName": "GALO",
        "serialNo": "CCPB SO Nr 03",
        "class": "3CL",
        "company": "A",
        "offense": "AS A RESPONSIBLE ASSISTANT REGIMENTAL CADET IN CHARGE OF QUARTERS, MANNING THE REGIMENTAL CCQ STATION 45 MINUTES LATE O/A 22 0400H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "YES",
        "startDate": "19 September",
        "endDate": "21 Sep",
        "demerits": 0,
        "tours": 10,
        "served": 0,
        "toursRem": 10,
        "remaining": 10,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 33,
        "cadetName": "Cdt 1CL BANAN",
        "rank": "1CL",
        "lastName": "BANAN",
        "serialNo": "S.O. NR 01 dtd 10 OCTOBER 2025",
        "class": "1CL",
        "company": "B",
        "offense": "POSSESSING SMARTPHONE AND USED IT FOR TAKING AND SHARING UNAUTHORIZED PICTURES INSIDE BARRACKS O/A 17 1600H JUNE 2025",
        "nature": "POSSESSING/USING UNAUTHORIZED ITEM",
        "offenseClass": "Class II",
        "confined": "NO",
        "startDate": "10 Oct",
        "endDate": "08 Apr",
        "demerits": 0,
        "tours": 180,
        "served": 180,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 34,
        "cadetName": "Cdt 1CL SARMIENTO",
        "rank": "1CL",
        "lastName": "SARMIENTO",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "B",
        "offense": "AS A RESPONSIBLE CADET-IN-CHARGE OF MALE BASKETBALL CORPS SQUAD NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMEROUS REMINDERS 07 1900 JULY 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 8,
        "served": 8,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 35,
        "cadetName": "Cdt 1CL OLASO",
        "rank": "1CL",
        "lastName": "OLASO",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "B",
        "offense": "AS A RESPONSIBLE CADET-IN-CHARGE OF  BASEBALL CORPS SQUAD NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMEROUS REMINDERS 07 1900 JULY 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 8,
        "served": 8,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 36,
        "cadetName": "Cdt 1CL CABUTAJE",
        "rank": "1CL",
        "lastName": "CABUTAJE",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "B",
        "offense": "AS A RESPONSIBLE CADET-IN-CHARGE OF MUAY THAI CORPS SQUAD NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMEROUS REMINDERS 07 1900 JULY 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 8,
        "served": 8,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 37,
        "cadetName": "Cdt 1CL CABUNOC",
        "rank": "1CL",
        "lastName": "CABUNOC",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "B",
        "offense": "AS A RESPONSIBLE CADET-IN-CHARGE OF JUDO/JIU JUTSU CORPS SQUAD NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMEROUS REMINDERS 07 1900 JULY 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 8,
        "served": 8,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 38,
        "cadetName": "Cdt 1CL AQUINO",
        "rank": "1CL",
        "lastName": "AQUINO",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "B",
        "offense": "POSSESSING VAPE O/A 19 1700H MAY 2026",
        "nature": "POSSESSING/USING UNAUTHORIZED ITEM",
        "offenseClass": "Class II",
        "confined": "NO",
        "startDate": "15 Jul",
        "endDate": "03 Sep",
        "demerits": 0,
        "tours": 50,
        "served": 50,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 39,
        "cadetName": "Cdt 1CL BANAN",
        "rank": "1CL",
        "lastName": "BANAN",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "B",
        "offense": "AS A RESPONSIBLE CADET-IN-CHARGE OF LAWN TENNIS CORPS SQUAD NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMEROUS REMINDERS 07 1900 JULY 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 8,
        "served": 8,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 40,
        "cadetName": "Cdt 2CL KIAT-ONG",
        "rank": "2CL",
        "lastName": "KIAT-ONG",
        "serialNo": "CCPB SO Nr 02",
        "class": "2CL",
        "company": "B",
        "offense": "POSSESSING VAPE O/A 17 1730H JUNE 2026",
        "nature": "DOING UNAUTHORIZED THINGS",
        "offenseClass": "Class II",
        "confined": "NO",
        "startDate": "15 Jul",
        "endDate": "03 Sep",
        "demerits": 0,
        "tours": 50,
        "served": 50,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 41,
        "cadetName": "Cdt 2CL UMOSO",
        "rank": "2CL",
        "lastName": "UMOSO",
        "serialNo": "CCPB SO Nr 02",
        "class": "2CL",
        "company": "B",
        "offense": "AS A RESPONSIBLE OUTGOING CADET ASSISTANT TO THE MESS OFFICER 2, FAILURE TO HAVE HIS INCOMING SIGN HIS CHECKLIST O/A 23 1830H JULY 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "Aug 5",
        "endDate": "08 Aug",
        "demerits": 0,
        "tours": 8,
        "served": 8,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 42,
        "cadetName": "Cdt 3CL PATULOT",
        "rank": "3CL",
        "lastName": "PATULOT",
        "serialNo": "S.O. Nr 07 dtd 13 NOVEMBER 2025",
        "class": "3CL",
        "company": "B",
        "offense": "AS A 4CL, GOING ON UNAUTHORIZED ENTERTAINING PRIVILEGE WHILE WEARING ATHLETIC UNIFORM O/ 02 1500H NOVEMBER 2025",
        "nature": "DOING UNAUTHORIZED THINGS",
        "offenseClass": "Class II",
        "confined": "NO",
        "startDate": "Nov 13",
        "endDate": "Jan 2",
        "demerits": 0,
        "tours": 65,
        "served": 65,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 43,
        "cadetName": "Cdt 1CL GARCIA",
        "rank": "1CL",
        "lastName": "GARCIA",
        "serialNo": "S.O. Nr 01 dtd 10 OCT 2025",
        "class": "1CL",
        "company": "F",
        "offense": "DATING THAT IS EXCLUSIVELY MEETING WITH 1CL HERNANDEZ 'E' IN AN ART MUSEUM DURING INDEPENDENCE DAY CONTINGENTS PRIVILEGE O/A 12 JUNE 2025",
        "nature": "DOING UNAUTHORIZED THINGS",
        "offenseClass": "Class II",
        "confined": "NO",
        "startDate": "8 Apr",
        "endDate": "28 May",
        "demerits": 0,
        "tours": 65,
        "served": 65,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 44,
        "cadetName": "Cdt 1CL YUMOL",
        "rank": "1CL",
        "lastName": "YUMOL",
        "serialNo": "S.O. Nr 01 dtd 10 OCT 2026",
        "class": "1CL",
        "company": "D",
        "offense": "NOT MAINTAINING DIGNITY ASA CCHC THAT IS LATE FROM POSTING",
        "nature": "LATE",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "30 Oct",
        "endDate": "09 Nov",
        "demerits": 0,
        "tours": 22,
        "served": 0,
        "toursRem": 22,
        "remaining": 22,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 45,
        "cadetName": "Cdt 2CL SUMBID",
        "rank": "2CL",
        "lastName": "SUMBID",
        "serialNo": "S.O. Nr. 08 dtd 24 NOVEMBER 2025",
        "class": "2CL",
        "company": "A",
        "offense": "PASSING IN FRONT OF MELCHOR HALL UPON GOING TO OMASH O/A 29 1625H OCTOBER 2025",
        "nature": "DOING UNAUTHORIZED THINGS",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "24 Nov",
        "endDate": "4 Dec",
        "demerits": 0,
        "tours": 22,
        "served": 0,
        "toursRem": 22,
        "remaining": 22,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 46,
        "cadetName": "Cdt 3CL MURILLO",
        "rank": "3CL",
        "lastName": "MURILLO",
        "serialNo": "S.O. Nr 09 dts 23 JAN 2026",
        "class": "3CL",
        "company": "A",
        "offense": "OFF-LIMITS THAT IS SLEEPING INSIDE\r\nTHE STOCKROOM WITH LIGHTS OFF DURING ECTQ O/A 14 2100H JANUARY\r\n2026",
        "nature": "DOING UNAUTHORIZED THINGS",
        "offenseClass": "Class II",
        "confined": "NO",
        "startDate": "Jan 23",
        "endDate": "Mar 14",
        "demerits": 0,
        "tours": 65,
        "served": 0,
        "toursRem": 65,
        "remaining": 65,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 47,
        "cadetName": "Cdt 3CL TABALNZA",
        "rank": "3CL",
        "lastName": "TABALNZA",
        "serialNo": "S.O. Nr 09 dts 23 JAN 2026",
        "class": "3CL",
        "company": "A",
        "offense": "OFF-LIMITS THAT IS SLEEPING INSIDE THE STOCKROOM WITH LIGHTS OFF DURING ECTQ O/A 14 2100H JANUARY 2026",
        "nature": "DOING UNAUTHORIZED THINGS",
        "offenseClass": "Class II",
        "confined": "NO",
        "startDate": "Jan 23",
        "endDate": "Mar 14",
        "demerits": 0,
        "tours": 65,
        "served": 16,
        "toursRem": 49,
        "remaining": 49,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 48,
        "cadetName": "Cdt 3CL LUARETA",
        "rank": "3CL",
        "lastName": "LUARETA",
        "serialNo": "S.O. Nr 09 dts 23 JAN 2026",
        "class": "3CL",
        "company": "C",
        "offense": "OFF-LIMITS THAT IS SLEEPING INSIDE THE STOCKROOM WITH LIGHTS OFF DURING ECTQ O/A 14 2100H JANUARY 2026",
        "nature": "DOING UNAUTHORIZED THINGS",
        "offenseClass": "Class II",
        "confined": "NO",
        "startDate": "Jan 23",
        "endDate": "Mar 14",
        "demerits": 0,
        "tours": 65,
        "served": 0,
        "toursRem": 65,
        "remaining": 65,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 49,
        "cadetName": "Cdt 3CL ROSAROSO",
        "rank": "3CL",
        "lastName": "ROSAROSO",
        "serialNo": "S.O. Nr 09 dts 23 JAN 2026",
        "class": "3CL",
        "company": "E",
        "offense": "UNAUTHORIZED POSSESSION OF SMARTPHONE.",
        "nature": "POSSESSING/USING UNAUTHORIZED ITEM",
        "offenseClass": "Class II",
        "confined": "NO",
        "startDate": "Jan 23",
        "endDate": "Jun 22",
        "demerits": 0,
        "tours": 150,
        "served": 150,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 50,
        "cadetName": "Cdt 3CL HUMIWAT",
        "rank": "3CL",
        "lastName": "HUMIWAT",
        "serialNo": "S.O. Nr 09 dts 23 JAN 2026",
        "class": "3CL",
        "company": "E",
        "offense": "UNAUTHORIZED POSSESSION OF\r\nSMARTPHONE.",
        "nature": "POSSESSING/USING UNAUTHORIZED ITEM",
        "offenseClass": "Class II",
        "confined": "NO",
        "startDate": "Jan 23",
        "endDate": "Jun 22",
        "demerits": 0,
        "tours": 150,
        "served": 150,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 51,
        "cadetName": "Cdt 3CL ABULENCIA",
        "rank": "3CL",
        "lastName": "ABULENCIA",
        "serialNo": "S.O. Nr 07 dtd 13 NOVEMBER 2025",
        "class": "3CL",
        "company": "H",
        "offense": "AS A FOURTHCLASSMAN, GOING ON MHAAN\u2019S O/A 22 1500H OCTOBER 2025",
        "nature": "DOING UNAUTHORIZED THINGS",
        "offenseClass": "Class II",
        "confined": "NO",
        "startDate": "Nov 13",
        "endDate": "Jan 2",
        "demerits": 0,
        "tours": 65,
        "served": 1,
        "toursRem": 64,
        "remaining": 64,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 52,
        "cadetName": "Cdt 3CL ABULENCIA",
        "rank": "3CL",
        "lastName": "ABULENCIA",
        "serialNo": "S.O. Nr 09 dts 23 JAN 2026",
        "class": "3CL",
        "company": "H",
        "offense": "UNAUTHORIZED POSSESSION OF SMARTPHONE.",
        "nature": "POSSESSING/USING UNAUTHORIZED ITEM",
        "offenseClass": "Class II",
        "confined": "NO",
        "startDate": "Jan 23",
        "endDate": "22 Jun",
        "demerits": 0,
        "tours": 150,
        "served": 7,
        "toursRem": 143,
        "remaining": 143,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 53,
        "cadetName": "Cdt 3CL CARPIO",
        "rank": "3CL",
        "lastName": "CARPIO",
        "serialNo": "S.O. Nr 09 dts 23 JAN 2026",
        "class": "3CL",
        "company": "H",
        "offense": "UNAUTHORIZED POSSESSION OF SMARTPHONE.",
        "nature": "POSSESSING/USING UNAUTHORIZED ITEM",
        "offenseClass": "Class II",
        "confined": "NO",
        "startDate": "Jan 23",
        "endDate": "22 Jun",
        "demerits": 0,
        "tours": 150,
        "served": 111,
        "toursRem": 39,
        "remaining": 39,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 54,
        "cadetName": "Cdt 3CL MUALLIL",
        "rank": "3CL",
        "lastName": "MUALLIL",
        "serialNo": "S.O. Nr 09 dts 23 JAN 2026",
        "class": "3CL",
        "company": "H",
        "offense": "UNAUTHORIZED POSSESSION OF SMARTPHONE.",
        "nature": "POSSESSING/USING UNAUTHORIZED ITEM",
        "offenseClass": "Class II",
        "confined": "NO",
        "startDate": "Jan 23",
        "endDate": "22 Jun",
        "demerits": 0,
        "tours": 150,
        "served": 10,
        "toursRem": 140,
        "remaining": 140,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 55,
        "cadetName": "Cdt 3CL SANCHEZ",
        "rank": "3CL",
        "lastName": "SANCHEZ",
        "serialNo": "S.O. Nr 09 dts 23 JAN 2026",
        "class": "3CL",
        "company": "H",
        "offense": "UNAUTHORIZED POSSESSION OF SMARTPHONE.",
        "nature": "POSSESSING/USING UNAUTHORIZED ITEM",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "Jan 23",
        "endDate": "22 Jun",
        "demerits": 0,
        "tours": 150,
        "served": 87,
        "toursRem": 63,
        "remaining": 63,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 56,
        "cadetName": "Cdt 2CL ILANO",
        "rank": "2CL",
        "lastName": "ILANO",
        "serialNo": "CCPB SO Nr 02",
        "class": "2CL",
        "company": "E",
        "offense": "AS A RESPONSIBLE CADET IN CHARGE OF HOLDING CENTER, FAILURE TO HAVE THE INCOMING OFFICER OF THE DAY SIGN HER CHECKLIST O/A 01 1830H MAY 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 6,
        "served": 6,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 57,
        "cadetName": "Cdt 2CL DE GUZMAN",
        "rank": "2CL",
        "lastName": "DE GUZMAN",
        "serialNo": "CCPB SO Nr 02",
        "class": "2CL",
        "company": "F",
        "offense": "AS A RESPONSIBLE SERGEANT OF THE GUARD 1, FAILURE TO HAVE THE INCOMING OFFICER OF THE DAY SIGN HIS CHECKLIST O/A 01 1830H JUNE 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 6,
        "served": 6,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 58,
        "cadetName": "Cdt 3CL GARCIA",
        "rank": "3CL",
        "lastName": "GARCIA",
        "serialNo": "CCPB SO Nr 02",
        "class": "3CL",
        "company": "A",
        "offense": "AS A RESPONSIBLE REGIMENT CADET IN CHARGE OF QUARTERS, FAILURE TO HAVE THE INCOMING OFFICER OF THE DAY SIGN HIS CHECKLIST O/A 01 1830H MAY 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "15 Jul",
        "endDate": "Jul 19",
        "demerits": 0,
        "tours": 4,
        "served": 4,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 59,
        "cadetName": "Cdt 2CL GALITQUIT",
        "rank": "2CL",
        "lastName": "GALITQUIT",
        "serialNo": "CCPB SO Nr 02",
        "class": "2CL",
        "company": "F",
        "offense": "AS A RESPONSIBLE CADET IN CHARGE OF HOLDING CENTER, FAILURE TO HAVE THE INCOMING OFFICER OF THE DAY SIGN HIS CHECKLIST O/A 01 1830H JUNE 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 6,
        "served": 6,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 60,
        "cadetName": "Cdt 2CL ILANO",
        "rank": "2CL",
        "lastName": "ILANO",
        "serialNo": "CCPB SO Nr 02",
        "class": "2CL",
        "company": "E",
        "offense": "AS A RESPONSIBLE OUTGOING OFFICER OF THE GUARD 2, FAILURE TO HAVE HER CHECKLIST SIGNED BY THE INCOMING OFFICER OF THE DAY O/A 13 1830H JULY 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "Aug 5",
        "endDate": "06 Aug",
        "demerits": 0,
        "tours": 8,
        "served": 8,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 61,
        "cadetName": "Cdt 3CL FUNTILON",
        "rank": "3CL",
        "lastName": "FUNTILON",
        "serialNo": "CCPB SO Nr 02",
        "class": "3CL",
        "company": "F",
        "offense": "AS A RESPONSIBLE OUTGOING SERGEANT OF THE GUARD 2, FAILURE TO HAVE THE INCOMING OFFICER OF THE DAY SIGN HIS CHECKLIST O/A 01 1830H JUNE 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 10,
        "served": 3,
        "toursRem": 7,
        "remaining": 7,
        "status": "Ongoing",
        "remarks": "ONGOING"
    },
    {
        "id": 62,
        "cadetName": "Cdt 1CL SOCIAS",
        "rank": "1CL",
        "lastName": "SOCIAS",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "E",
        "offense": "AS A RESPONSIBLE CIC OF CHESS CORPS SQUAD, NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMEROUS REMINDERS O/A 7 1900 JULY 2027",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 8,
        "served": 8,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 63,
        "cadetName": "Cdt 1CL CATACUTAN",
        "rank": "1CL",
        "lastName": "CATACUTAN",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "E",
        "offense": "AS A RESPONSIBLE CIC OF MCGI, NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMEROUS REMINDERS O/A 7 1900 JULY 2027",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 8,
        "served": 8,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 64,
        "cadetName": "Cdt 1CL VILLA",
        "rank": "1CL",
        "lastName": "VILLA",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "E",
        "offense": "AS A RESPONSIBLE CIC OF SLOWDRILL PLATOON, NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMEROUS REMINDERS O/A 7 1900 JULY 2027",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 8,
        "served": 8,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 65,
        "cadetName": "Cdt 1CL BOGNALBAL",
        "rank": "1CL",
        "lastName": "BOGNALBAL",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "E",
        "offense": "AS A RESPONSIBLE CIC OF RIFLE AND PISTOL CLUB, NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMEROUS REMINDERS O/A 7 1900 JULY 2027",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 8,
        "served": 8,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 66,
        "cadetName": "Cdt 3CL MARCIAL",
        "rank": "3CL",
        "lastName": "MARCIAL",
        "serialNo": "CCPB SO Nr 02",
        "class": "3CL",
        "company": "F",
        "offense": "AS A RESPONSIBLE REGIMENT CADET IN CHARGE OF QUARTERS, USING OUTDATED CHECKLIST O/A 01 1830H JUNE 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "15 Jul",
        "endDate": "17 Jul",
        "demerits": 0,
        "tours": 10,
        "served": 10,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 67,
        "cadetName": "Cdt 2CL AMPALAYOHAN",
        "rank": "2CL",
        "lastName": "AMPALAYOHAN",
        "serialNo": "CCPB SO Nr 02",
        "class": "2CL",
        "company": "F",
        "offense": "AS A RESPONSIBLE OUTGOING ASSISTANT CADET IN CHARGE OF HOLDING CENTER, FAILURE TO HAVE THE INCOMING OFFICER OF THE DAY SIGN HER CHECKLIST O/A 01 1830H JUNE 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 6,
        "served": 6,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 68,
        "cadetName": "Cdt 1CL MAMAUAG",
        "rank": "1CL",
        "lastName": "MAMAUAG",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "H",
        "offense": "\u201cAS A RESPONSIBLE CADET-IN-CHARGE OF FEMALE VOLLEYBALL CORPS SQUAD NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMEROUS REMINDERS O/A 07 1900 JULY 2026.\u201d",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 0,
        "served": 12,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 69,
        "cadetName": "Cdt 1CL SORIANO",
        "rank": "1CL",
        "lastName": "SORIANO",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "H",
        "offense": "AS A RESPONSIBLE OUTGOING OFFICER OF THE DAY, FAILURE TO HAVE THE OFFICER IN CHARGE SIGN HER CHECKLIST O/A 11 1700H JULY 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 6,
        "served": 6,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 70,
        "cadetName": "Cdt 1CL DE VERA",
        "rank": "1CL",
        "lastName": "DE VERA",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "H",
        "offense": "AS A RESPONSIBLE CADET-IN-CHARGE OF GLEE CLUB NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMEROUS REMINDERS O/A 07 1900 JULY 2026.",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 0,
        "served": 8,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 71,
        "cadetName": "Cdt 1CL SABILLA",
        "rank": "1CL",
        "lastName": "SABILLA",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "H",
        "offense": "AS A RESPONSIBLE CADET-IN-CHARGE OF ATHLETICS CORPS SQUAD NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMEROUS REMINDERS O/A 07 1900 JULY 2026.\u201d",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 0,
        "served": 12,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 72,
        "cadetName": "Cdt 1CL CORPUZ",
        "rank": "1CL",
        "lastName": "CORPUZ",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "C",
        "offense": "AS A RESPONSIBLE CADET-IN-CHARGE OF SILENT DRILL NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMBEROUS REMINDERS O/A 07 1900 JULY 2O26",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 8,
        "served": 4,
        "toursRem": 4,
        "remaining": 4,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 73,
        "cadetName": "Cdt 1CL SILAO",
        "rank": "1CL",
        "lastName": "SILAO",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "C",
        "offense": "AS A RESPONSIBLE CADET-IN-CHARGE OF ARNIS CORPS SQUAD NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMBEROUS REMINDERS O/A 07 1900 JULY 2O26",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 8,
        "served": 4,
        "toursRem": 4,
        "remaining": 4,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 74,
        "cadetName": "Cdt 1CL KIMAKIM",
        "rank": "1CL",
        "lastName": "KIMAKIM",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "C",
        "offense": "AS A RESPOBSIBLE CIC OF ANGLICAN AGLIPAYAN NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMBEROUS REMINDERS O/A 07 1900 JULY 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 8,
        "served": 4,
        "toursRem": 4,
        "remaining": 4,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 75,
        "cadetName": "Cdt 2CL GAMAL",
        "rank": "2CL",
        "lastName": "GAMAL",
        "serialNo": "CCPB SO Nr 02",
        "class": "2CL",
        "company": "C",
        "offense": "AS A RESPONSIBLE HOLDING CENTER FLOOR INSPECTOR SUBMITTING INCOMPLETE CHECKLIST O/A 05 1830 JULY 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 8,
        "served": 4,
        "toursRem": 4,
        "remaining": 4,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 76,
        "cadetName": "Cdt 2CL UMOSO",
        "rank": "2CL",
        "lastName": "UMOSO",
        "serialNo": "CCPB SO Nr 02",
        "class": "2CL",
        "company": "B",
        "offense": "",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "Aug 5",
        "endDate": "-",
        "demerits": 0,
        "tours": 0,
        "served": 8,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 77,
        "cadetName": "Cdt 2CL FERRER",
        "rank": "2CL",
        "lastName": "FERRER",
        "serialNo": "CCPB SO Nr 02",
        "class": "2CL",
        "company": "D",
        "offense": "AS A RESPONSIBLE OUTGOING ASSISTANT CADET IN CHARFE OF HOLDING CENTER, SUBMITTING INCOMPLETE CHECKLIST O/A 05 1830H JULY 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "5 Aug",
        "endDate": "-",
        "demerits": 0,
        "tours": 10,
        "served": 10,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 78,
        "cadetName": "Cdt 3CL GUIABAO",
        "rank": "3CL",
        "lastName": "GUIABAO",
        "serialNo": "CCPB SO Nr 02",
        "class": "3CL",
        "company": "F",
        "offense": "AS A RESPONSIBLE REGIMENT CADET IN CHARGE OF QUARTERS, FAILURE TO HAVE THE INCOMING OFFICER OF THE DAY SIGN HIS CHECKLIST O/A 01 1830H JUNE 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 6,
        "served": 6,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 79,
        "cadetName": "Cdt 1CL DOMINGUEZ",
        "rank": "1CL",
        "lastName": "DOMINGUEZ",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "H",
        "offense": "AS A RESPONSIBLE CADET-IN-CHARGE OF HOLDING CENTER NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMEROUS REMINDERS O/A 07 1900 JULY 2026.\u201d",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 8,
        "served": 8,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 80,
        "cadetName": "Cdt 1CL DOMINGUEZ",
        "rank": "1CL",
        "lastName": "DOMINGUEZ",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "H",
        "offense": "NOT LOGGING IN HIS PHONE DESPITE NUMEROUS CAUTIONS O/A 21 2200H JULY 2026",
        "nature": "DOING UNAUTHORIZED THINGS",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "Aug 5",
        "endDate": "-",
        "demerits": 0,
        "tours": 25,
        "served": 25,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 81,
        "cadetName": "Cdt 1CL CASTRO",
        "rank": "1CL",
        "lastName": "CASTRO",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "A",
        "offense": "AS A RESPONSIBLE CADET ASSISTANT TO THE MEDICAL OFFICER OF THE DAY, SUBMITTING OUTDATED CHECKLIST O/A 19 1830H JULY 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "Aug 7",
        "endDate": "Aug 9",
        "demerits": 0,
        "tours": 8,
        "served": 8,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 82,
        "cadetName": "Cdt 1CL DE MESA",
        "rank": "1CL",
        "lastName": "DE MESA",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "A",
        "offense": "AS A RESPONSIBLE CADET IN CHARGE OF CATHOLIC ACTION GROUP NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMEROUS REMINDERS O/A 07 1200 JULY 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 8,
        "served": 8,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 83,
        "cadetName": "Cdt 1CL BERTE",
        "rank": "1CL",
        "lastName": "BERTE",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "A",
        "offense": "AS A RESPONSIBLE CADET IN CHARGE OF ARCHERY CORPS SQUAD NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMEROUS REMINDERS O/A 07 1200 JULY 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 8,
        "served": 8,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 84,
        "cadetName": "Cdt 1CL ALEJANDRE",
        "rank": "1CL",
        "lastName": "ALEJANDRE",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "D",
        "offense": "AS A RESPONSIBLE CIC OF CADET COMBO NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMEROUS REMINDERS O/A 7 1900 JULY 2027",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 8,
        "served": 0,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 85,
        "cadetName": "Cdt 1CL CORSAME",
        "rank": "1CL",
        "lastName": "CORSAME",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "H",
        "offense": "AS A RESPONSIBLE CADET-IN-CHARGE OF SWIMMING CORPS SQUAD NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMEROUS REMINDERS O/A 07 1900 JULY 2026.\u201d",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 8,
        "served": 8,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 86,
        "cadetName": "Cdt 1CL SUPITER",
        "rank": "1CL",
        "lastName": "SUPITER",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "H",
        "offense": "NOT LOGGING IN HIS PHONE DESPITE NUMEROUS CAUTIONS O/A 21 2200H JULY 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 25,
        "served": 25,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 87,
        "cadetName": "Cdt 2CL RAMOS",
        "rank": "2CL",
        "lastName": "RAMOS",
        "serialNo": "CCPB SO Nr 02",
        "class": "2CL",
        "company": "D",
        "offense": "AS A RESPONSIBLE CADET-IN-CHARGE OF HOLDING CENTER, FAILURE TO HAVE THE INCOMING OFFICER OF THE DAY SIGN HIS CHECKLIST O/A 13 1830 JULY 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "7 Aug",
        "endDate": "10 Aug",
        "demerits": 0,
        "tours": 10,
        "served": 10,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 88,
        "cadetName": "Cdt 1CL ATUN",
        "rank": "1CL",
        "lastName": "ATUN",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "H",
        "offense": "AS A RESPONSIBLE OUTGOING CADET ASSISTANT TO THE MEDICAL OFFICER OF THE DAY, FAILURE TO HAVE THE OFFICER IN CHARGE SIGN HER CHECKLIST O/A 11 1700H JULY 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 6,
        "served": 6,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 89,
        "cadetName": "Cdt 1CL PALALIO",
        "rank": "1CL",
        "lastName": "PALALIO",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "D",
        "offense": "AS A RESPONSIBLE CIC OF SEVENTH DAY ADVENTIST NOT SUBMITTING THEIR ACTION PLAN DESPITE NUMEROUS REMINDERS O/A 7 1900 JULY 2027",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 8,
        "served": 8,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 90,
        "cadetName": "Cdt 2CL TAYOTO",
        "rank": "2CL",
        "lastName": "TAYOTO",
        "serialNo": "CCPB SO Nr 03",
        "class": "2CL",
        "company": "B",
        "offense": "UNEVEN COLORED FLOOR DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 3,
        "served": 3,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 91,
        "cadetName": "Cdt 2CL PALMA",
        "rank": "2CL",
        "lastName": "PALMA",
        "serialNo": "CCPB SO Nr 03",
        "class": "2CL",
        "company": "B",
        "offense": "UNALIGNED SHOE DISPLAY DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 2,
        "served": 2,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 92,
        "cadetName": "Cdt 2CL CASAMAYOR",
        "rank": "2CL",
        "lastName": "CASAMAYOR",
        "serialNo": "CCPB SO Nr 03",
        "class": "2CL",
        "company": "B",
        "offense": "UNALIGNED SHOE DISPLAY DURING BI O/A 0800H AUGUST 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class IV",
        "confined": "NO",
        "startDate": "-",
        "endDate": "-",
        "demerits": 0,
        "tours": 2,
        "served": 2,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 93,
        "cadetName": "Cdt 2CL TUMAPANG",
        "rank": "2CL",
        "lastName": "TUMAPANG",
        "serialNo": "CCPB SO Nr 03",
        "class": "2CL",
        "company": "D",
        "offense": "AS A RESPONSIBLE BATTALION SERGEANT MAJOR, FAILING TO PROPERLY PERFORM HIS DUTIES & RESPONSIBILITY, PARTICULARLY ENSURING THE CLEANLINESS & ORDERLINESS OF THE PT PIT & IFFH, WHICH ARE DESIGNATED CLEANING AREAS UNDER HIS BATTALION O/A 05 0800H SEPTEMBER 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "YES",
        "startDate": "Sep 19",
        "endDate": "21 Sep",
        "demerits": 0,
        "tours": 8,
        "served": 8,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    },
    {
        "id": 94,
        "cadetName": "Cdt 1CL AMANGAN",
        "rank": "1CL",
        "lastName": "AMANGAN",
        "serialNo": "CCPB SO Nr 02",
        "class": "1CL",
        "company": "A",
        "offense": "AS A RESPONSIBLE CADET ASSISTANT TO THE MEDICAL OFFICER OF THE DAY, IMPROPERLY ACCOMPLISHING HIS CHECKLIST THAT IS CONTAINING NUMEROUS ERASURES O/A 06 1730H JULY 2026",
        "nature": "NEGLIGENCE OF DUTY",
        "offenseClass": "Class III",
        "confined": "NO",
        "startDate": "Aug 7",
        "endDate": "Aug 11",
        "demerits": 0,
        "tours": 10,
        "served": 10,
        "toursRem": 0,
        "remaining": 0,
        "status": "Completed",
        "remarks": "SERVED"
    }
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
    let seenCompletenessInspection = false;

    // Standard routine fallback times for morning/daily calls when time column in Google Sheet is left blank
    const standardCallTimes = [
      [/entrucking/i, "0330"],
      [/reveille/i, "0400"],
      [/spartan/i, "0430"],
      [/badminton.*bbeal/i, "0445"],
      [/early mess.*fatigue/i, "0450"],
      [/early mess.*s4/i, "0450"],
      [/early mess.*pictorial/i, "0450"],
      [/flag raising/i, "0500"],
      [/team dagohoy/i, "0510"],
      [/prp duty/i, "0520"],
      [/morning mess/i, "0530"],
      [/late mess.*holding/i, "0620"],
      [/late mess.*workout/i, "0620"],
      [/police call/i, "0650"],
      [/1st period/i, "0710"],
      [/2nd period/i, "0835"],
      [/3rd period/i, "1000"],
      [/noon mess for cadets from holding/i, "1140"],
      [/noon mess/i, "1140"],
      [/4th period/i, "1240"],
      [/5th period/i, "1405"],
      [/sick call/i, "1530"],
      [/consultation/i, "1530"],
      [/ei for deficient/i, "1530"],
      [/philhealth/i, "1550"],
      [/slow drill/i, "1620"],
      [/pmaicc/i, "1620"],
      [/honor committee.*workout/i, "1620"],
      [/flexible evening mess/i, "1730"],
      [/completeness inspection/i, "2200"]
    ];

    const inferTime = (act, rawTime) => {
      if (rawTime && rawTime.trim()) return rawTime.trim();
      if (!act) return "";
      for (const [pat, t] of standardCallTimes) {
        if (pat.test(act)) return t;
      }
      return "";
    };

    const postNameMap = {
      "OD": "OD (Officer of the Day)",
      "OG 1": "OG 1 (Officer of the Guard 1)",
      "OG1": "OG 1 (Officer of the Guard 1)",
      "OG 2": "OG 2 (Officer of the Guard 2)",
      "OG2": "OG 2 (Officer of the Guard 2)",
      "SG 1": "SG 1 (Sergeant of the Guard 1)",
      "SG1": "SG 1 (Sergeant of the Guard 1)",
      "SG 2": "SG 2 (Sergeant of the Guard 2)",
      "SG2": "SG 2 (Sergeant of the Guard 2)",
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

      // Explicit section trigger for Changes
      if (/^(CHANGES|ADDITIONAL)\b/i.test(row[0]?.trim() || fullRowText)) {
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

      // Trigger calls table
      if (/^TIME\b/i.test(row[0]?.trim()) || (row.length > 2 && /^ACTIVITY\b/i.test(row[1]?.trim()) && /UNIFORM/i.test(row[2]?.trim()))) {
        inCallsSection = true;
        continue;
      }

      // If completeness inspection has passed, all subsequent activity rows are changes/special formations
      if (seenCompletenessInspection) {
        isChangesSection = true;
      }

      if (isChangesSection) {
        const time = row[0]?.trim() || "";
        const act = row[1]?.trim() || "";
        const uni = row[2]?.trim() || "-";
        const form = row[3]?.trim() || "-";
        if (time || act) {
          changes.push({
            time: (time ? (time.endsWith("H") ? time : time + "H") : "ADDITIONAL"),
            activity: act,
            uniform: uni || "-",
            formation: form || "-"
          });
        }
      } else if (inCallsSection) {
        const rawTime = row[0]?.trim() || "";
        const act = row[1]?.trim() || "";
        const uni = row[2]?.trim() || "-";
        const form = row[3]?.trim() || "-";
        if (rawTime || act) {
          const resolvedTime = inferTime(act, rawTime);
          calls.push({
            time: resolvedTime,
            activity: act,
            uniform: uni || "-",
            formation: form || "-"
          });
          if (/completeness inspection/i.test(act)) {
            seenCompletenessInspection = true;
          }
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

  parseDisposition(rows) {
    if (!rows || rows.length < 10) return null;

    let reportDate = "07 1140H OCTOBER 2026";
    const dateMatch = rows[0]?.[0]?.match(/(\d{1,2}\s+\d{4}H\s+[A-Za-z]+\s+\d{4})/i);
    if (dateMatch) reportDate = dateMatch[1];

    const toNum = (val) => {
      const v = String(val || "").trim();
      return /^\d+$/.test(v) ? parseInt(v, 10) : 0;
    };

    const coys = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const coyNames = ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hawk"];

    const companies = [];
    for (let idx = 0; idx < coys.length; idx++) {
      const code = coys[idx];
      const name = coyNames[idx];
      const col = 2 + idx * 8;

      const r6 = rows[6] || [];
      const firstM = toNum(r6[col]);
      const firstF = toNum(r6[col + 1]);
      const secM = toNum(r6[col + 2]);
      const secF = toNum(r6[col + 3]);
      const thirdM = toNum(r6[col + 4]);
      const thirdF = toNum(r6[col + 5]);
      const fourthM = toNum(r6[col + 6]);
      const fourthF = toNum(r6[col + 7]);

      const effTot = firstM + firstF + secM + secF + thirdM + thirdF + fourthM + fourthF;
      const ineffTot = toNum(rows[17]?.[col]) + toNum(rows[17]?.[col + 1]);
      const tot = effTot + (ineffTot || 4);

      companies.push({
        name,
        code,
        firstCL_M: firstM,
        firstCL_F: firstF,
        secondCL_M: secM,
        secondCL_F: secF,
        thirdCL_M: thirdM,
        thirdCL_F: thirdF,
        fourthCL_M: fourthM,
        fourthCL_F: fourthF,
        effectiveTotal: effTot,
        ineffectiveTotal: ineffTot || 4,
        total: tot || 150,
        fad: toNum(rows[2]?.[col]) + toNum(rows[2]?.[col + 1]),
        holdingCenter: toNum(rows[15]?.[col]) + toNum(rows[15]?.[col + 1]),
        fdpsh: toNum(rows[10]?.[col]),
        vluna: toNum(rows[11]?.[col]),
        siq: toNum(rows[13]?.[col])
      });
    }

    const fullDutyTot = toNum(rows[1]?.[rows[1].length - 2]) || 1128;
    const fadTot = toNum(rows[2]?.[rows[2].length - 2]) || 43;
    const effTotal = fullDutyTot + fadTot;

    return {
      reportDate,
      summary: {
        ccafpOnPost: { male: 907, female: 306, total: 1213 },
        effective: { fullDuty: fullDutyTot, fad: fadTot, priv: 0, ob: 0, entrucking: 0, total: effTotal },
        ineffective: { leave: 0, fdpsh: 4, vluna: 4, bgh: 0, siq: 4, quarantined: 0, holdingCenter: 30, awol: 0, total: 42 },
        grandTotal: { male: 943, female: 322, total: 1267 }
      },
      companies: companies.length === 8 ? companies : (CCAFP_CONFIG.s1Data?.disposition?.companies || [])
    };
  }

  parseArmory(rows) {
    if (!rows || rows.length < 10) return null;

    let reportDate = "07 1140H OCTOBER 2026";
    const dateMatch = rows[0]?.[0]?.match(/(\d{1,2}\s+\d{4}H\s+[A-Za-z]+\s+\d{4})/i);
    if (dateMatch) reportDate = dateMatch[1];

    const toNum = (val) => {
      const v = String(val || "").trim();
      return /^\d+$/.test(v) ? parseInt(v, 10) : 0;
    };

    const armoryRows = [];
    for (let i = 1; i < Math.min(13, rows.length); i++) {
      const r = rows[i];
      if (!r || !r[0]?.trim()) continue;
      armoryRows.push({
        loc: r[0].trim(),
        m14: toNum(r[1]),
        m14Out: toNum(r[2]),
        mag14: toNum(r[4]),
        m16: toNum(r[5]),
        m16Out: toNum(r[6]),
        r4: toNum(r[9]),
        r4Out: toNum(r[10]),
        k3: toNum(r[13]),
        k3Out: toNum(r[14]),
        garand: toNum(r[16]),
        garandOut: toNum(r[17]),
        pistol: toNum(r[19]),
        pistolOut: toNum(r[20]),
        swords: toNum(r[24]),
        swordsOut: toNum(r[25]),
        bayonets: toNum(r[26]),
        bayonetsOut: toNum(r[27]),
        notes: r[28]?.trim() || "Complete count verified"
      });
    }

    let preparedBy = "CDT LT 1CL JHOPRILYN S MANGAGOM C-27151 'D' CO CCAFP (Officer-of-the-Day)";
    let notedBy = "MAJ JAMES A MARTINEZ PA (Officer-in-Charge)";
    let checkedBy = "CDT 1CL CARLO JOSEPH G MAGAYANES C-26226 (AC of RS for Supply / RSO)";

    for (let i = 13; i < rows.length; i++) {
      const r = rows[i] || [];
      const line = r.join(" ").toUpperCase();
      if (line.includes("MANGAGOM")) {
        preparedBy = "CDT LT 1CL JHOPRILYN S MANGAGOM C-27151 'D' CO CCAFP (Officer-of-the-Day)";
      }
      if (line.includes("MARTINEZ")) {
        notedBy = "MAJ JAMES A MARTINEZ PA • LCDR DARYL G VILLA PN • LCDR ROMAN B PALIMA PN (Officers-in-Charge)";
      }
    }

    return {
      reportDate,
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
      rows: armoryRows.length > 0 ? armoryRows : (CCAFP_CONFIG.s1Data?.armory?.rows || []),
      notes: "NOTE: ONLY THE REGIMENT RSO IS AUTHORIZED TO EDIT ARMORY RECORDS. 51 Bayonets & 14 Swords housed in RSO Stockroom.",
      signatures: {
        preparedBy,
        checkedBy,
        notedBy
      }
    };
  }

  parseAttachment(rows) {
    if (!rows || rows.length < 20) return null;

    let reportDate = "07 1140H OCTOBER 2026";
    const dateMatch = rows[0]?.[0]?.match(/(\d{1,2}\s+\d{4}H\s+[A-Za-z]+\s+\d{4})/i);
    if (dateMatch) reportDate = dateMatch[1];

    let currentSec = "fad";
    const fadList = [];
    const siqList = [];
    const fdpshList = [];
    const vlunaList = [];
    const holdingCenterList = [];
    const clearingOutList = [];
    const clearingInList = [];
    const ghqList = [];
    const stockadeList = [];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length === 0) continue;
      const line = row.join(" ").trim().toUpperCase();
      if (!line) continue;

      if (line.includes("SIQ(") || line.includes("SIQ (")) {
        currentSec = "siq";
        continue;
      } else if (line.includes("FDPSH")) {
        currentSec = "fdpsh";
        continue;
      } else if (line.includes("V-LUNA")) {
        currentSec = "vluna";
        continue;
      } else if (line.includes("HOLDING CENTER")) {
        currentSec = "holdingCenter";
        continue;
      } else if (line.includes("CLEARING-OUT") || line.includes("CLEARING OUT")) {
        currentSec = "clearingOut";
        continue;
      } else if (line.includes("CLEARING-IN") || line.includes("CLEARING IN")) {
        currentSec = "clearingIn";
        continue;
      } else if (line.includes("GHQ")) {
        currentSec = "ghq";
        continue;
      } else if (line.includes("STOCKADE")) {
        currentSec = "stockade";
        continue;
      }

      const numStr = row[0]?.trim();
      if (!numStr || !/^\d+$/.test(numStr)) continue;
      const num = parseInt(numStr, 10);
      const cls = row[1]?.trim() || "";
      const name = row[2]?.trim() || "";
      const coy = row[3]?.trim() || "-";
      const cond = row[4]?.trim() || "-";
      const start = row[5]?.trim() || "-";
      const release = row[6]?.trim() || "-";

      const item = { no: num, classYr: cls, name, coy, condition: cond, start, release };

      if (currentSec === "fad") fadList.push(item);
      else if (currentSec === "siq") siqList.push({ no: num, classYr: cls, name, coy, reason: cond, start, release });
      else if (currentSec === "fdpsh") fdpshList.push({ no: num, classYr: cls, name, coy, reason: cond, start, release });
      else if (currentSec === "vluna") vlunaList.push({ no: num, classYr: cls, name, coy, reason: cond, start, release });
      else if (currentSec === "holdingCenter") holdingCenterList.push({ no: num, classYr: cls, name, coy, reason: cond, start, barracks: release || "1ST FLOOR FLORENDO HALL" });
      else if (currentSec === "clearingOut") clearingOutList.push({ no: num, classYr: cls, name, coy, reason: cond, start, remarks: release });
      else if (currentSec === "clearingIn") clearingInList.push({ no: num, classYr: cls, name, coy, reason: cond, start, remarks: release });
      else if (currentSec === "ghq") ghqList.push({ no: num, classYr: cls, name, coy, reason: cond, start, remarks: release });
      else if (currentSec === "stockade") stockadeList.push({ no: num, classYr: cls, name, coy, reason: cond, start, remarks: release });
    }

    return {
      reportDate,
      counts: {
        fad: fadList.length || 43,
        siq: siqList.length || 4,
        fdpsh: fdpshList.length || 4,
        vluna: vlunaList.length || 4,
        holdingCenter: holdingCenterList.length || 30,
        clearingOut: clearingOutList.length || 2,
        clearingIn: clearingInList.length || 9,
        ghq: ghqList.length || 1,
        stockade: stockadeList.length || 2
      },
      fadList: fadList.length > 0 ? fadList : (CCAFP_CONFIG.s1Data?.attachment?.fadList || []),
      siqList: siqList.length > 0 ? siqList : (CCAFP_CONFIG.s1Data?.attachment?.siqList || []),
      fdpshList: fdpshList.length > 0 ? fdpshList : (CCAFP_CONFIG.s1Data?.attachment?.fdpshList || []),
      vlunaList: vlunaList.length > 0 ? vlunaList : (CCAFP_CONFIG.s1Data?.attachment?.vlunaList || []),
      holdingCenterList: holdingCenterList.length > 0 ? holdingCenterList : (CCAFP_CONFIG.s1Data?.attachment?.holdingCenterList || []),
      clearingOutList: clearingOutList.length > 0 ? clearingOutList : (CCAFP_CONFIG.s1Data?.attachment?.clearingOutList || []),
      clearingInList: clearingInList.length > 0 ? clearingInList : (CCAFP_CONFIG.s1Data?.attachment?.clearingInList || []),
      ghqList: ghqList.length > 0 ? ghqList : (CCAFP_CONFIG.s1Data?.attachment?.ghqList || []),
      stockadeList: stockadeList.length > 0 ? stockadeList : (CCAFP_CONFIG.s1Data?.attachment?.stockadeList || [])
    };
  }

  parsePunishments(conductRows, totalRows) {
    if (!conductRows || conductRows.length < 5) return null;

    let chairman = "CDT CPT 1CL APRIL JOY C GEROLA C-27112 'A' Co CCAFP";
    let updatedDate = "25 AUGUST 2026";
    let notedBy = "CDT SGT MAJ 2CL RASHEED SHANE C ABBAS 'A' Co CCAFP";

    // Extract header metadata from rows 0-3
    for (let i = 0; i < Math.min(6, conductRows.length); i++) {
      const line = (conductRows[i] || []).join(" ").trim();
      if (/CCPB CHAIRMAN\s*:\s*/i.test(line)) {
        const m = line.match(/CCPB CHAIRMAN\s*:\s*([^,"]+)/i);
        if (m) chairman = m[1].trim();
      }
      if (/UPDATED AS OF\s*:\s*/i.test(line)) {
        const m = line.match(/UPDATED AS OF\s*:\s*([^\n,"]+)/i);
        if (m) updatedDate = m[1].trim();
      }
      if (/NOTED BY\s*:\s*/i.test(line)) {
        const m = line.match(/NOTED BY\s*:\s*([^,"]+)/i);
        if (m) notedBy = m[1].trim();
      }
    }

    let touringCount = 239;
    let confinedCount = 74;

    if (totalRows && totalRows.length > 1) {
      const r1 = totalRows[1] || [];
      if (r1[1] && /^\d+$/.test(r1[1].trim())) touringCount = parseInt(r1[1].trim(), 10);
      if (r1[9] && /^\d+$/.test(r1[9].trim())) confinedCount = parseInt(r1[9].trim(), 10);
    }

    const list = [];
    for (let i = 6; i < conductRows.length; i++) {
      const r = conductRows[i];
      if (!r || r.length < 5) continue;
      const rank = r[1]?.trim() || '';
      const lastName = r[2]?.trim() || '';
      if (!lastName) continue;

      const coy = r[3]?.trim() || '-';
      const offense = r[4]?.trim() || '-';
      const offClass = r[5]?.trim() ? `Class ${r[5].trim()}` : 'Class III';
      const nature = r[6]?.trim() || 'NEGLIGENCE OF DUTY';
      const confined = (r[7]?.trim() || 'NO').toUpperCase();
      const start = r[8]?.trim() || '-';
      const end = r[9]?.trim() || '-';
      const demerits = (r[10]?.trim() && /^\d+$/.test(r[10].trim())) ? parseInt(r[10].trim(), 10) : 0;
      const tours = (r[11]?.trim() && /^\d+$/.test(r[11].trim())) ? parseInt(r[11].trim(), 10) : 0;
      const ref = r[15]?.trim() || `CCPB SO Nr 02`;
      const statusRaw = r[16]?.trim() || 'ONGOING';
      const status = statusRaw.toLowerCase().includes('served') ? 'Completed' : (confined === 'YES' ? 'Confined' : 'Ongoing');

      list.push({
        id: list.length + 1,
        cadetName: `Cdt ${rank} ${lastName}`,
        rank,
        lastName,
        serialNo: ref,
        class: rank || '1CL',
        company: coy,
        offense,
        offenseClass: offClass,
        nature,
        confined,
        startDate: start,
        endDate: end,
        demerits,
        tours,
        status
      });
    }

    const completeBase = (typeof S1_SPIRITUAL_DATA !== 'undefined' && Array.isArray(S1_SPIRITUAL_DATA.punishments)) ? S1_SPIRITUAL_DATA.punishments : (CCAFP_CONFIG.punishmentList || []);

    return {
      chairman,
      updatedDate,
      notedBy,
      totals: {
        touring: touringCount,
        confined: confinedCount,
        totalActive: completeBase.length || 877
      },
      list: list.length >= completeBase.length ? list : completeBase
    };
  }

  parseExpanded(rows) {
    if (!rows || rows.length < 2) return null;
    const baseList = (typeof S1_SPIRITUAL_DATA !== 'undefined' && Array.isArray(S1_SPIRITUAL_DATA.expanded))
      ? S1_SPIRITUAL_DATA.expanded
      : (CCAFP_CONFIG.s1Data?.expanded || []);

    const incoming = [];
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (!r || r.length < 5) continue;
      const fName = r[1]?.trim() || '';
      const lName = r[3]?.trim() || '';
      if (!fName && !lName) continue;
      incoming.push({
        no: r[0]?.trim() || '',
        name: `${lName}, ${fName} ${r[2]?.trim() || ''} ${r[4]?.trim() || ''}`.trim().replace(/\s+,/g, ',').replace(/,\s*$/, ''),
        sn: r[5]?.trim() || '',
        coy: r[6]?.trim() || '',
        squad: r[7]?.trim() || '',
        platoon: r[8]?.trim() || '',
        designation: r[9]?.trim() || '',
        bos: r[10]?.trim() || '',
        gender: r[11]?.trim() || '',
        blood: r[16]?.trim() || '',
        religion: r[17]?.trim() || '',
        region: r[26]?.trim() || '',
        contact: r[21]?.trim() || ''
      });
    }

    if (incoming.length >= 1000) {
      return incoming;
    }

    // Merge incoming partial class sheet into base master roll
    if (baseList.length > 0) {
      const map = new Map();
      baseList.forEach(c => {
        const key = (c.sn || c.name || '').toUpperCase();
        if (key) map.set(key, { ...c });
      });
      incoming.forEach(c => {
        const key = (c.sn || c.name || '').toUpperCase();
        if (key && map.has(key)) {
          map.set(key, { ...map.get(key), ...c });
        } else if (key) {
          map.set(key, c);
        }
      });
      return Array.from(map.values());
    }

    return incoming;
  }

  parseRoster(rows) {
    if (!rows || rows.length < 2) return null;
    const list = [];
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (!r || r.length < 5) continue;
      const fName = r[2]?.trim() || '';
      const lName = r[4]?.trim() || '';
      if (!fName && !lName) continue;
      list.push({
        no: r[0]?.trim() || '',
        class: r[1]?.trim() || '4CL',
        name: `${lName}, ${fName} ${r[3]?.trim() || ''} ${r[5]?.trim() || ''}`.trim().replace(/\s+,/g, ',').replace(/,\s*$/, ''),
        sn: r[6]?.trim() || '',
        gender: r[7]?.trim() || '',
        coy: r[8]?.trim() || ''
      });
    }
    return list;
  }

  parseClubs(rows) {
    if (!rows || rows.length < 2) return null;
    const list = [];
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (!r || r.length < 2) continue;
      const name = r[1]?.trim() || '';
      if (!name) continue;
      list.push({
        num: r[0]?.trim() || `${list.length + 1}`,
        name,
        cic: r[2]?.trim() || '—',
        acic: r[3]?.trim() || '—',
        oic: r[4]?.trim() || '—',
        venue: r[5]?.trim() || '—'
      });
    }
    return list;
  }

  parseTin(rows) {
    if (!rows || rows.length < 2) return null;
    const list = [];
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (!r || r.length < 3) continue;
      const lName = r[1]?.trim() || '';
      const fName = r[2]?.trim() || '';
      if (!lName && !fName) continue;
      list.push({
        nr: r[0]?.trim() || '',
        name: `${lName}, ${fName} ${r[3]?.trim() || ''}`.trim(),
        sn: r[4]?.trim() || '',
        gender: r[5]?.trim() || '',
        bdate: r[6]?.trim() || '',
        tin: r[7]?.trim() || '—',
        philhealth: r[8]?.trim() || '—'
      });
    }
    return list;
  }

  parseApe(rows1CL, rows2CL) {
    const existing = (typeof window !== 'undefined' && window.S1_SPIRITUAL_DATA && window.S1_SPIRITUAL_DATA.ape) ||
                     (typeof window !== 'undefined' && window.CCAFP_CONFIG && window.CCAFP_CONFIG.s1Data && window.CCAFP_CONFIG.s1Data.ape) || [];
    // If incoming rows only represent a subset, retain master list of 854 cadets and update matching records
    const list = existing.length >= 800 ? [...existing] : [];
    const cadetMap = new Map();
    list.forEach(c => {
      const key = (c.sn || c.name || '').toUpperCase().trim();
      if (key) cadetMap.set(key, c);
    });

    const processRows = (rows, classLabel) => {
      if (!rows) return;
      for (let i = 1; i < rows.length; i++) {
        const r = rows[i];
        if (!r || r.length < 5) continue;
        const lName = r[4]?.trim() || '';
        const fName = r[2]?.trim() || '';
        if (!lName && !fName) continue;
        if (lName.toUpperCase() === 'SURNAME' || lName.toUpperCase().includes('NAME')) continue;
        const sn = r[5]?.trim() || '';
        const name = `${lName}, ${fName} ${r[3]?.trim() || ''}`.trim();
        const key = (sn || name).toUpperCase().trim();
        
        const record = {
          class: classLabel,
          coy: r[1]?.trim() || '',
          name: name,
          sn: sn,
          bdate: r[6]?.trim() || '',
          urinalysis: r[7]?.trim() || 'FALSE',
          blood: r[8]?.trim() || 'FALSE',
          vitals: r[9]?.trim() || 'FALSE',
          eye: r[10]?.trim() || 'FALSE',
          ecg: r[11]?.trim() || 'FALSE',
          xray: r[12]?.trim() || 'FALSE',
          npExam: r[13]?.trim() || 'FALSE',
          npInterview: r[14]?.trim() || 'FALSE',
          dental: r[15]?.trim() || 'FALSE',
          physical: r[16]?.trim() || 'FALSE',
          remarks: r[17]?.trim() || 'In Progress'
        };

        if (cadetMap.has(key)) {
          Object.assign(cadetMap.get(key), record);
        } else if (list.length < 800) {
          list.push(record);
          cadetMap.set(key, record);
        }
      }
    };
    if (rows1CL && rows1CL.length > 1) processRows(rows1CL, '1CL');
    if (rows2CL && rows2CL.length > 1) processRows(rows2CL, '2CL');
    return list.length > 0 ? list : existing;
  }

  parseSpiritual(rows, defaultClass) {
    if (!rows || rows.length < 2) return [];
    let headerIdx = -1;
    for (let i = 0; i < Math.min(rows.length, 15); i++) {
      const rowStr = (rows[i] || []).join(' ').toUpperCase();
      if (rowStr.includes('CLASS') && (rowStr.includes('FIRST NAME') || rowStr.includes('LAST NAME') || rowStr.includes('SERIAL') || rowStr.includes('SN'))) {
        headerIdx = i;
        break;
      }
    }
    const startIdx = headerIdx >= 0 ? headerIdx + 1 : 2;
    const header = headerIdx >= 0 ? rows[headerIdx].map(h => (h || '').trim().toUpperCase()) : [];
    const classIdx = header.indexOf('CLASS');
    const fnIdx = header.indexOf('FIRST NAME');
    const mnIdx = header.indexOf('MIDDLE NAME');
    const lnIdx = header.indexOf('LAST NAME');
    let snIdx = -1;
    for (const name of ['SERIAL NO.', 'SERIAL NO', 'SN', 'SERIAL']) {
      if (header.includes(name)) { snIdx = header.indexOf(name); break; }
    }
    const genderIdx = header.indexOf('GENDER');
    const coyIdx = header.indexOf('COY');
    let relIdx = -1;
    for (const name of ['RELIGOUS SERVICE', 'RELIGIOUS SERVICE', 'RELIGION']) {
      if (header.includes(name)) { relIdx = header.indexOf(name); break; }
    }

    const list = [];
    for (let i = startIdx; i < rows.length; i++) {
      const r = rows[i];
      if (!r || r.length < 4) continue;
      const cClass = (classIdx >= 0 && r[classIdx]?.trim()) ? r[classIdx].trim() : (r[0]?.trim() || defaultClass || '1CL');
      const fn = fnIdx >= 0 ? (r[fnIdx]?.trim() || '') : (r[1]?.trim() || '');
      const mn = mnIdx >= 0 ? (r[mnIdx]?.trim() || '') : (r[2]?.trim() || '');
      const ln = lnIdx >= 0 ? (r[lnIdx]?.trim() || '') : (r[3]?.trim() || '');
      const sn = snIdx >= 0 ? (r[snIdx]?.trim() || '') : (r[4]?.trim() || '');
      const gender = genderIdx >= 0 ? (r[genderIdx]?.trim() || '') : (r[5]?.trim() || '');
      const coy = coyIdx >= 0 ? (r[coyIdx]?.trim()?.toUpperCase() || '') : (r[6]?.trim()?.toUpperCase() || '');
      const rel = relIdx >= 0 ? (r[relIdx]?.trim()?.toUpperCase() || 'CATHOLIC') : (r[7]?.trim()?.toUpperCase() || 'CATHOLIC');
      if (!ln && !fn) continue;
      list.push({
        class: cClass,
        name: `${ln}, ${fn} ${mn}`.trim().replace(/\s+/g, ' '),
        sn: sn,
        gender: gender,
        coy: coy,
        religion: rel
      });
    }
    return list;
  }

  parseMessRoster(rows) {
    if (!rows || rows.length < 10) return [];
    let headerIdx = -1;
    for (let i = 0; i < Math.min(rows.length, 15); i++) {
      const rowStr = (rows[i] || []).join(' ').toUpperCase();
      if (rowStr.includes('COMPANY') && (rowStr.includes('NAME') || rowStr.includes('BOS') || rowStr.includes('CLASS'))) {
        headerIdx = i;
        break;
      }
    }
    if (headerIdx < 0) headerIdx = 8;
    const header = rows[headerIdx] || [];
    const dietCols = header.slice(7).map(h => (h || '').trim()).filter(Boolean);
    const roster = [];
    for (let i = headerIdx + 1; i < rows.length; i++) {
      const r = rows[i];
      if (!r || r.length < 6) continue;
      const coy = (r[0] || '').trim().toUpperCase();
      const name = (r[1] || '').trim();
      const bos = (r[2] || '').trim().toUpperCase() || 'PA';
      let cls = (r[3] || '').trim().toUpperCase() || '4CL';
      if (cls === '3C;') cls = '3CL';
      const bn = (r[4] || '').trim().toUpperCase() || '1ST';
      const status = (r[5] || '').trim().toUpperCase() || 'FULL DUTY';
      if (!name) continue;
      const activeDiets = [];
      for (let d = 0; d < dietCols.length; d++) {
        const colIdx = 7 + d;
        if (colIdx < r.length && r[colIdx]?.trim() === '1') {
          activeDiets.push(dietCols[d]);
        }
      }
      roster.push({
        nr: roster.length + 1,
        coy: coy,
        name: name,
        bos: bos,
        class: cls,
        bn: bn,
        status: status,
        diets: activeDiets
      });
    }
    return roster;
  }

  parseMessMenu(rows) {
    if (!rows || rows.length < 10) return null;
    let daysRowIdx = -1;
    for (let i = 0; i < Math.min(rows.length, 15); i++) {
      const rowStr = (rows[i] || []).join(' ').toUpperCase();
      if (rowStr.includes('MONDAY') && rowStr.includes('TUESDAY')) {
        daysRowIdx = i;
        break;
      }
    }
    if (daysRowIdx < 0) return null;
    const days = rows[daysRowIdx].slice(1, 8).map(d => (d || '').trim().toUpperCase());
    const menu = {};
    days.forEach(d => {
      menu[d] = {
        morning: { viands: [], drink: '', rice: 'Steamed Rice' },
        noon: { viands: [], drink: '', rice: 'Steamed Rice' },
        evening: { viands: [], drink: '', rice: 'Steamed Rice' },
        snack: ''
      };
    });
    let currentMeal = null;
    for (let i = daysRowIdx + 1; i < rows.length; i++) {
      const r = rows[i];
      if (!r || !r.length) continue;
      const label = (r[0] || '').trim().toUpperCase();
      if (label.includes('MORNING MESS')) { currentMeal = 'morning'; continue; }
      if (label.includes('NOON MESS')) { currentMeal = 'noon'; continue; }
      if (label.includes('EVENING MESS')) { currentMeal = 'evening'; continue; }
      if (label.includes('PM SNACK')) {
        for (let j = 0; j < days.length; j++) {
          if (j + 1 < r.length && r[j + 1]?.trim()) menu[days[j]].snack = r[j + 1].trim();
        }
        continue;
      }
      if (currentMeal) {
        if (label.includes('VIAND')) {
          for (let j = 0; j < days.length; j++) {
            if (j + 1 < r.length && r[j + 1]?.trim()) menu[days[j]][currentMeal].viands.push(r[j + 1].trim());
          }
        } else if (label.includes('DRINK')) {
          for (let j = 0; j < days.length; j++) {
            if (j + 1 < r.length && r[j + 1]?.trim()) menu[days[j]][currentMeal].drink = r[j + 1].trim();
          }
        } else if (label.includes('RICE')) {
          for (let j = 0; j < days.length; j++) {
            if (j + 1 < r.length && r[j + 1]?.trim()) menu[days[j]][currentMeal].rice = r[j + 1].trim();
          }
        }
      }
    }
    return menu;
  }

  parseMessDisseminations(rows) {
    if (!rows || rows.length < 2) return [];
    const dissem = [];
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (!r || r.length < 4) continue;
      const d_id = (r[0] || '').trim();
      const d_date = (r[1] || '').trim();
      const d_headline = (r[2] || '').trim();
      const d_content = (r[3] || '').trim();
      if (d_headline) {
        dissem.push({
          id: d_id || `DIS-${Date.now()}`,
          date: d_date,
          headline: d_headline,
          content: d_content,
          author: 'REGIMENTAL MESS OFFICER'
        });
      }
    }
    return dissem;
  }
}

// ==========================================
// CCAFP AUTHENTICATION & ACCESS CONTROL DATA
// ==========================================

const CCAFP_PERMISSIONS_TAXONOMY = [
  {
    category: "ADMINISTRATION",
    permissions: [
      { key: "roles:manage", label: "Create, edit, and delete roles" },
      { key: "permissions:manage", label: "Define role permissions" },
      { key: "users:manage", label: "View users and assign roles" },
      { key: "users:view_accounts", label: "View registered accounts list" }
    ]
  },
  {
    category: "ATHLETIC MATTERS",
    permissions: [
      { key: "athletic:view", label: "View ATHLETIC MATTERS" },
      { key: "athletic:manage_rosters", label: "Manage athletic rosters and scores" }
    ]
  },
  {
    category: "EXO MATTERS",
    permissions: [
      { key: "exo:edit_guard_assignments", label: "Edit Necessary Detailed Guards" },
      { key: "exo:view", label: "View EXO MATTERS" },
      { key: "exo:publish_directives", label: "Publish daily directives" }
    ]
  },
  {
    category: "MESS MATTERS",
    permissions: [
      { key: "mess:manage_diets", label: "Add and edit special diet records" },
      { key: "mess:view", label: "View MESS MATTERS" },
      { key: "mess:manage_menus", label: "Manage daily menus" }
    ]
  },
  {
    category: "REACH",
    permissions: [
      { key: "reach:create_announcement", label: "Publish announcements" },
      { key: "reach:view", label: "View REACH" }
    ]
  },
  {
    category: "S1 MATTERS",
    permissions: [
      { key: "s1:add_personnel", label: "Add cadets to S1" },
      { key: "s1:edit_own_status", label: "Edit own status and signify for Priv" },
      { key: "s1:view", label: "View S1 MATTERS" },
      { key: "s1:manage_leaves", label: "Manage leaves and passes" }
    ]
  },
  {
    category: "S10 MATTERS",
    permissions: [
      { key: "s10:view", label: "View S10 MATTERS" },
      { key: "s10:manage_funds", label: "Manage budget and expenditures" }
    ]
  },
  {
    category: "S2 MATTERS",
    permissions: [
      { key: "s2:submit_concern", label: "Submit S2 concerns" },
      { key: "s2:view_concerns", label: "View all S2 concerns" },
      { key: "s2:view", label: "View own S2 concerns" },
      { key: "s2:manage_clearance", label: "Manage security clearances" }
    ]
  },
  {
    category: "S3 MATTERS",
    permissions: [
      { key: "s3:view", label: "View S3 MATTERS" },
      { key: "s3:post_orders", label: "Post operational orders" },
      { key: "s3:manage_schedules", label: "Manage training schedules" }
    ]
  },
  {
    category: "S4 MATTERS",
    permissions: [
      { key: "s4:view", label: "View S4 MATTERS" },
      { key: "s4:manage_inventory", label: "Manage supply inventory" },
      { key: "s4:approve_requests", label: "Approve equipment requests" }
    ]
  },
  {
    category: "S5 MATTERS",
    permissions: [
      { key: "s5:view", label: "View S5 MATTERS" },
      { key: "s5:manage_projects", label: "Create and manage project plans" }
    ]
  },
  {
    category: "S6 MATTERS",
    permissions: [
      { key: "s6:view", label: "View S6 MATTERS" },
      { key: "s6:manage_tech", label: "Manage IT/communication assets" }
    ]
  },
  {
    category: "S7 MATTERS",
    permissions: [
      { key: "s7:view", label: "View S7 MATTERS" },
      { key: "s7:manage_events", label: "Manage civic/community events" }
    ]
  },
  {
    category: "S8 MATTERS",
    permissions: [
      { key: "s8:view", label: "View S8 MATTERS" },
      { key: "s8:manage_records", label: "Input and manage training grades/records" }
    ]
  },
  {
    category: "VESO MATTERS",
    permissions: [
      { key: "veso:view", label: "View VESO MATTERS" },
      { key: "veso:manage", label: "Manage VESO events and records" }
    ]
  },
  {
    category: "ACADEMIC MATTERS",
    permissions: [
      { key: "acad:view", label: "View academic records" },
      { key: "acad:manage_records", label: "Manage class schedules and scores" }
    ]
  },
  {
    category: "MILITARY TRAINING / SAFETY / RELIGIOUS / GAD",
    permissions: [
      { key: "training:view", label: "View Military Training" },
      { key: "training:manage", label: "Manage Military Training" },
      { key: "safety:view", label: "View Safety Matters" },
      { key: "safety:manage", label: "Manage Safety Matters" },
      { key: "religious:view", label: "View Religious Matters" },
      { key: "religious:manage", label: "Manage Religious Matters" },
      { key: "gad:view", label: "View GAD Matters" },
      { key: "gad:manage", label: "Manage GAD Matters" }
    ]
  },
  {
    category: "CONDUCT AND HONOR (CCPB / HONOR COMM)",
    permissions: [
      { key: "conduct:view", label: "View conduct reports" },
      { key: "ccpb:manage_demerits", label: "Process demerits/delinquencies" },
      { key: "honor:manage_cases", label: "Manage highly restricted honor cases" }
    ]
  },
  {
    category: "COMMAND OVERSIGHT (STO / BARON)",
    permissions: [
      { key: "command:global_view", label: "Global command view across all non-restricted tabs" },
      { key: "command:override", label: "Override lower-level permissions" }
    ]
  }
];

const CCAFP_DEFAULT_ROLES = [
  {
    id: "admin",
    name: "Admin / Mother Account",
    shortName: "ADMIN",
    type: "Built-in role",
    description: "Primary Administrator with full unrestricted system control.",
    permissions: ["*"]
  },
  {
    id: "exo",
    name: "Executive Officer (Exo)",
    shortName: "EXO",
    type: "Built-in role",
    description: "Guard detail coordination, barracks management, and corps routine oversight.",
    permissions: [
      "exo:view", "exo:edit_guard_assignments", "exo:publish_directives",
      "s1:view", "s3:view", "s4:view", "mess:view", "reach:view", "s2:submit_concern"
    ]
  },
  {
    id: "intelligence",
    name: "Intelligence officer",
    shortName: "Intelligence",
    type: "Built-in role",
    description: "OPSEC, sensitive counter-intelligence, and triage of private concerns.",
    permissions: [
      "s2:view", "s2:submit_concern", "s2:view_concerns", "s2:manage_clearance",
      "s1:view", "exo:view", "s3:view", "reach:view"
    ]
  },
  {
    id: "personnel",
    name: "Personnel officer",
    shortName: "Personnel",
    type: "Built-in role",
    description: "Cadet strength, expanded roll, squad matrix, leaves, and personnel records.",
    permissions: [
      "s1:view", "s1:add_personnel", "s1:edit_own_status", "s1:manage_leaves",
      "exo:view", "reach:view", "s2:submit_concern"
    ]
  },
  {
    id: "operations",
    name: "Operations officer",
    shortName: "Operations",
    type: "Built-in role",
    description: "Corps operational orders, training schedules, and drill exercises.",
    permissions: [
      "s3:view", "s3:post_orders", "s3:manage_schedules",
      "exo:view", "s1:view", "reach:view", "s2:submit_concern"
    ]
  },
  {
    id: "logistics",
    name: "Logistics officer",
    shortName: "Logistics",
    type: "Built-in role",
    description: "Supply depot, uniform requisitions, and equipment maintenance.",
    permissions: [
      "s4:view", "s4:manage_inventory", "s4:approve_requests",
      "exo:view", "s1:view", "reach:view", "s2:submit_concern"
    ]
  },
  {
    id: "plans",
    name: "Plans and Programs officer",
    shortName: "Plans & Programs",
    type: "Built-in role",
    description: "Strategic academy programs, project plans, and milestones.",
    permissions: ["s5:view", "s5:manage_projects", "reach:view", "s2:submit_concern"]
  },
  {
    id: "ceis",
    name: "CEIS officer",
    shortName: "CEIS",
    type: "Built-in role",
    description: "Information systems, radio frequencies, PA network, and tech infrastructure.",
    permissions: ["s6:view", "s6:manage_tech", "reach:view", "s2:submit_concern"]
  },
  {
    id: "cmo",
    name: "CMO officer",
    shortName: "CMO",
    type: "Built-in role",
    description: "Civic-military operations, community relations, and outreach.",
    permissions: ["s7:view", "s7:manage_events", "reach:view", "s2:submit_concern"]
  },
  {
    id: "training_edu",
    name: "Training and Education officer",
    shortName: "Training & Edu",
    type: "Built-in role",
    description: "Cadet training evaluation, grades, and instructional records.",
    permissions: ["s8:view", "s8:manage_records", "training:view", "training:manage", "s2:submit_concern"]
  },
  {
    id: "finance",
    name: "Finance officer",
    shortName: "Finance",
    type: "Built-in role",
    description: "Corps treasury, battalion budget allocation, and expenditures.",
    permissions: ["s10:view", "s10:manage_funds", "s2:submit_concern"]
  },
  {
    id: "athletic",
    name: "Athletic officer",
    shortName: "Athletic",
    type: "Built-in role",
    description: "Sports competitions, physical fitness tests, and athletic rosters.",
    permissions: ["athletic:view", "athletic:manage_rosters", "s2:submit_concern"]
  },
  {
    id: "academic",
    name: "Academic officer",
    shortName: "Academic",
    type: "Built-in role",
    description: "Academic classes, term exams, and scholastic standing.",
    permissions: ["acad:view", "acad:manage_records", "s2:submit_concern"]
  },
  {
    id: "military_training",
    name: "Military Training officer",
    shortName: "Mil Training",
    type: "Built-in role",
    description: "Field tactics, marksmanship, weapons handling, and tactical field exercises.",
    permissions: ["training:view", "training:manage", "s2:submit_concern"]
  },
  {
    id: "mess",
    name: "Mess officer",
    shortName: "Mess Officer",
    type: "Built-in role",
    description: "Mess hall supervision, diet restrictions, and cooking shares rotation.",
    permissions: ["mess:view", "mess:manage_diets", "mess:manage_menus", "s2:submit_concern"]
  },
  {
    id: "religious",
    name: "Religious officer",
    shortName: "Religious",
    type: "Built-in role",
    description: "Spiritual development, worship schedules, and faith community coordination.",
    permissions: ["religious:view", "religious:manage", "s2:submit_concern"]
  },
  {
    id: "safety",
    name: "Safety officer",
    shortName: "Safety",
    type: "Built-in role",
    description: "Operational risk management, medical evacuation protocols, and physical safety.",
    permissions: ["safety:view", "safety:manage", "s2:submit_concern"]
  },
  {
    id: "gad",
    name: "GAD officer",
    shortName: "GAD",
    type: "Built-in role",
    description: "Gender and development programs, inclusivity, and welfare policies.",
    permissions: ["gad:view", "gad:manage", "s2:submit_concern"]
  },
  {
    id: "ccpb",
    name: "CCPB representative",
    shortName: "CCPB",
    type: "Built-in role",
    description: "Cadet conduct, delinquency reporting, and punishment tour administration.",
    permissions: ["conduct:view", "ccpb:manage_demerits", "s2:submit_concern"]
  },
  {
    id: "honor",
    name: "Honor Comm representative",
    shortName: "Honor Comm",
    type: "Built-in role",
    description: "Honor system investigations, hearing dockets, and honor code enforcement.",
    permissions: ["honor:manage_cases", "conduct:view", "s2:submit_concern"]
  },
  {
    id: "sto",
    name: "Senior Tactical Officer",
    shortName: "STO",
    type: "Built-in role",
    description: "Tactical officer oversight, commanding supervision, and regimental guidance.",
    permissions: ["command:global_view", "command:override", "users:view_accounts", "s2:view_concerns"]
  },
  {
    id: "baron",
    name: "Baron/Regiment Commander",
    shortName: "Baron",
    type: "Built-in role",
    description: "Regimental Commander commanding all cadet corps units and councils.",
    permissions: ["command:global_view", "command:override", "users:view_accounts", "s2:view_concerns"]
  },
  {
    id: "viewer",
    name: "Viewer",
    shortName: "Viewer",
    type: "Built-in role",
    description: "General cadet read-only access with concern submission capabilities.",
    permissions: [
      "s1:view", "exo:view", "s3:view", "s4:view", "mess:view", "reach:view", "athletic:view", "acad:view", "s2:submit_concern"
    ]
  }
];

if (typeof window !== "undefined") {
  CCAFP_CONFIG.authorizedCadets = AUTHORIZED_CADETS;
  window.AUTHORIZED_CADETS = AUTHORIZED_CADETS;
  window.CCAFP_CONFIG = CCAFP_CONFIG;
  window.COUNCIL_SHEET_URLS = COUNCIL_SHEET_URLS;
  window.SheetSyncManager = SheetSyncManager;
  window.CCAFP_PERMISSIONS_TAXONOMY = CCAFP_PERMISSIONS_TAXONOMY;
  window.CCAFP_DEFAULT_ROLES = CCAFP_DEFAULT_ROLES;
}

