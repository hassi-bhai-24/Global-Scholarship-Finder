export interface UniversityItem {
  name: string;
  country: string;
  city?: string;
  aliases?: string[];
}

export const UNIVERSITIES: UniversityItem[] = [
  // United States
  { name: "Harvard University", country: "United States", city: "Cambridge, MA", aliases: ["harvard", "hu"] },
  { name: "Massachusetts Institute of Technology (MIT)", country: "United States", city: "Cambridge, MA", aliases: ["mit", "mass tech"] },
  { name: "Stanford University", country: "United States", city: "Stanford, CA", aliases: ["stanford", "su"] },
  { name: "University of California, Berkeley", country: "United States", city: "Berkeley, CA", aliases: ["uc berkeley", "cal", "berkeley"] },
  { name: "Columbia University", country: "United States", city: "New York, NY", aliases: ["columbia", "cu"] },
  { name: "Princeton University", country: "United States", city: "Princeton, NJ", aliases: ["princeton", "pu"] },
  { name: "Yale University", country: "United States", city: "New Haven, CT", aliases: ["yale", "yu"] },
  { name: "University of Chicago", country: "United States", city: "Chicago, IL", aliases: ["uchicago", "chicago"] },
  { name: "Cornell University", country: "United States", city: "Ithaca, NY", aliases: ["cornell"] },
  { name: "University of Pennsylvania", country: "United States", city: "Philadelphia, PA", aliases: ["upenn", "penn"] },
  { name: "University of Michigan", country: "United States", city: "Ann Arbor, MI", aliases: ["umich", "michigan"] },
  { name: "University of California, Los Angeles (UCLA)", country: "United States", city: "Los Angeles, CA", aliases: ["ucla"] },
  { name: "New York University (NYU)", country: "United States", city: "New York, NY", aliases: ["nyu"] },
  { name: "University of Washington", country: "United States", city: "Seattle, WA", aliases: ["uw", "udub"] },
  { name: "Georgia Institute of Technology", country: "United States", city: "Atlanta, GA", aliases: ["georgia tech", "gatech"] },
  { name: "University of Texas at Austin", country: "United States", city: "Austin, TX", aliases: ["ut austin", "texas"] },
  { name: "University of Illinois Urbana-Champaign", country: "United States", city: "Champaign, IL", aliases: ["uiuc"] },
  { name: "Carnegie Mellon University", country: "United States", city: "Pittsburgh, PA", aliases: ["cmu"] },
  { name: "California Institute of Technology (Caltech)", country: "United States", city: "Pasadena, CA", aliases: ["caltech"] },
  { name: "Johns Hopkins University", country: "United States", city: "Baltimore, MD", aliases: ["jhu", "johns hopkins"] },

  // United Kingdom
  { name: "University of Oxford", country: "United Kingdom", city: "Oxford", aliases: ["oxford", "oxon"] },
  { name: "University of Cambridge", country: "United Kingdom", city: "Cambridge", aliases: ["cambridge", "cantab"] },
  { name: "Imperial College London", country: "United Kingdom", city: "London", aliases: ["imperial"] },
  { name: "University College London (UCL)", country: "United Kingdom", city: "London", aliases: ["ucl"] },
  { name: "London School of Economics (LSE)", country: "United Kingdom", city: "London", aliases: ["lse"] },
  { name: "University of Edinburgh", country: "United Kingdom", city: "Edinburgh", aliases: ["edinburgh", "edin"] },
  { name: "King's College London", country: "United Kingdom", city: "London", aliases: ["kcl", "kings"] },
  { name: "University of Manchester", country: "United Kingdom", city: "Manchester", aliases: ["manchester", "uom"] },
  { name: "University of Warwick", country: "United Kingdom", city: "Coventry", aliases: ["warwick"] },
  { name: "University of Bristol", country: "United Kingdom", city: "Bristol", aliases: ["bristol"] },
  { name: "University of Glasgow", country: "United Kingdom", city: "Glasgow", aliases: ["glasgow"] },
  { name: "University of Birmingham", country: "United Kingdom", city: "Birmingham", aliases: ["birmingham"] },

  // Pakistan
  { name: "The Islamia University of Bahawalpur (IUB BWP)", country: "Pakistan", city: "Bahawalpur", aliases: ["iub", "iub bwp", "islamia university bahawalpur", "bwp", "bahawalpur university"] },
  { name: "National University of Sciences and Technology (NUST)", country: "Pakistan", city: "Islamabad", aliases: ["nust", "nust islamabad"] },
  { name: "Lahore University of Management Sciences (LUMS)", country: "Pakistan", city: "Lahore", aliases: ["lums"] },
  { name: "Quaid-i-Azam University (QAU)", country: "Pakistan", city: "Islamabad", aliases: ["qau", "quaid-e-azam"] },
  { name: "University of Engineering and Technology (UET) Lahore", country: "Pakistan", city: "Lahore", aliases: ["uet", "uet lahore"] },
  { name: "Bahauddin Zakariya University (BZU)", country: "Pakistan", city: "Multan", aliases: ["bzu", "bzu multan", "multan university"] },
  { name: "Government College University (GCU) Lahore", country: "Pakistan", city: "Lahore", aliases: ["gcu", "gcu lahore", "gc university"] },
  { name: "University of the Punjab (PU)", country: "Pakistan", city: "Lahore", aliases: ["punjab university", "pu", "pu lahore"] },
  { name: "COMSATS University Islamabad (CUI)", country: "Pakistan", city: "Islamabad", aliases: ["comsats", "cui"] },
  { name: "FAST National University of Computer and Emerging Sciences (FAST NUCES)", country: "Pakistan", city: "Islamabad", aliases: ["fast", "fast nuces", "nuces"] },
  { name: "Aga Khan University (AKU)", country: "Pakistan", city: "Karachi", aliases: ["aku", "aga khan"] },
  { name: "University of Karachi (KU)", country: "Pakistan", city: "Karachi", aliases: ["karachi university", "uok", "ku"] },
  { name: "University of Agriculture Faisalabad (UAF)", country: "Pakistan", city: "Faisalabad", aliases: ["uaf", "agriculture university"] },
  { name: "Ghulam Ishaq Khan Institute of Engineering Sciences and Technology (GIKI)", country: "Pakistan", city: "Topi, Swabi", aliases: ["giki", "ghulam ishaq khan"] },
  { name: "Pakistan Institute of Engineering and Applied Sciences (PIEAS)", country: "Pakistan", city: "Islamabad", aliases: ["pieas"] },
  { name: "University of Peshawar", country: "Pakistan", city: "Peshawar", aliases: ["uop", "peshawar university"] },
  { name: "University of Gujrat (UOG)", country: "Pakistan", city: "Gujrat", aliases: ["uog", "gujrat university"] },
  { name: "University of Sargodha (UOS)", country: "Pakistan", city: "Sargodha", aliases: ["uos", "sargodha university"] },
  { name: "Khwaja Fareed University of Engineering and Information Technology (KFUEIT)", country: "Pakistan", city: "Rahim Yar Khan", aliases: ["kfueit", "ryk university"] },
  { name: "Ghazi University", country: "Pakistan", city: "Dera Ghazi Khan", aliases: ["ghazi university", "dg khan university", "gu"] },
  { name: "International Islamic University, Islamabad (IIUI)", country: "Pakistan", city: "Islamabad", aliases: ["iiui", "islamic university"] },
  { name: "National University of Modern Languages (NUML)", country: "Pakistan", city: "Islamabad", aliases: ["numl"] },
  { name: "NED University of Engineering and Technology", country: "Pakistan", city: "Karachi", aliases: ["ned", "ned uet"] },
  { name: "Dow University of Health Sciences (DUHS)", country: "Pakistan", city: "Karachi", aliases: ["duhs", "dow"] },
  { name: "King Edward Medical University (KEMU)", country: "Pakistan", city: "Lahore", aliases: ["kemu", "king edward"] },
  { name: "Institute of Business Administration (IBA) Karachi", country: "Pakistan", city: "Karachi", aliases: ["iba", "iba karachi"] },
  { name: "University of Balochistan", country: "Pakistan", city: "Quetta", aliases: ["uob", "balochistan university"] },
  { name: "Balochistan University of Information Technology, Engineering and Management Sciences (BUITEMS)", country: "Pakistan", city: "Quetta", aliases: ["buitems"] },
  { name: "Sukkur IBA University", country: "Pakistan", city: "Sukkur", aliases: ["sukkur iba", "iba sukkur"] },
  { name: "Mehran University of Engineering and Technology (MUET)", country: "Pakistan", city: "Jamshoro", aliases: ["muet", "mehran university"] },
  { name: "University of Sindh", country: "Pakistan", city: "Jamshoro", aliases: ["sindh university", "uosindh"] },
  { name: "Mirpur University of Science and Technology (MUST)", country: "Pakistan", city: "Mirpur, AJK", aliases: ["must ajk", "must"] },
  { name: "University of Azad Jammu and Kashmir (UAJK)", country: "Pakistan", city: "Muzaffarabad", aliases: ["uajk", "ajk university"] },
  { name: "Karakoram International University (KIU)", country: "Pakistan", city: "Gilgit", aliases: ["kiu", "gilgit university"] },
  { name: "Information Technology University (ITU)", country: "Pakistan", city: "Lahore", aliases: ["itu", "itu lahore"] },
  { name: "Allama Iqbal Open University (AIOU)", country: "Pakistan", city: "Islamabad", aliases: ["aiou"] },
  { name: "Virtual University of Pakistan (VU)", country: "Pakistan", city: "Lahore", aliases: ["vu", "virtual university"] },
  { name: "University of Lahore (UOL)", country: "Pakistan", city: "Lahore", aliases: ["uol"] },
  { name: "University of Management and Technology (UMT)", country: "Pakistan", city: "Lahore", aliases: ["umt"] },
  { name: "University of Central Punjab (UCP)", country: "Pakistan", city: "Lahore", aliases: ["ucp"] },
  { name: "Bahria University", country: "Pakistan", city: "Islamabad", aliases: ["bahria"] },
  { name: "Air University", country: "Pakistan", city: "Islamabad", aliases: ["air"] },
  { name: "Riphah International University", country: "Pakistan", city: "Islamabad", aliases: ["riphah"] },
  { name: "National Textile University (NTU)", country: "Pakistan", city: "Faisalabad", aliases: ["ntu"] },

  // Canada
  { name: "University of Toronto", country: "Canada", city: "Toronto", aliases: ["uoft", "utoronto"] },
  { name: "University of British Columbia", country: "Canada", city: "Vancouver", aliases: ["ubc"] },
  { name: "McGill University", country: "Canada", city: "Montreal", aliases: ["mcgill"] },
  { name: "University of Waterloo", country: "Canada", city: "Waterloo", aliases: ["uwaterloo", "waterloo"] },
  { name: "University of Alberta", country: "Canada", city: "Edmonton", aliases: ["ualberta"] },
  { name: "McMaster University", country: "Canada", city: "Hamilton", aliases: ["mcmaster"] },
  { name: "University of Montreal", country: "Canada", city: "Montreal", aliases: ["udem"] },

  // Germany
  { name: "Technical University of Munich (TUM)", country: "Germany", city: "Munich", aliases: ["tum"] },
  { name: "Ludwig Maximilian University of Munich (LMU)", country: "Germany", city: "Munich", aliases: ["lmu"] },
  { name: "Heidelberg University", country: "Germany", city: "Heidelberg", aliases: ["heidelberg"] },
  { name: "Humboldt University of Berlin", country: "Germany", city: "Berlin", aliases: ["humboldt"] },
  { name: "RWTH Aachen University", country: "Germany", city: "Aachen", aliases: ["rwth", "aachen"] },
  { name: "Free University of Berlin", country: "Germany", city: "Berlin", aliases: ["fu berlin"] },
  { name: "Karlsruhe Institute of Technology (KIT)", country: "Germany", city: "Karlsruhe", aliases: ["kit"] },
  { name: "University of Freiburg", country: "Germany", city: "Freiburg", aliases: ["freiburg"] },

  // Australia
  { name: "University of Melbourne", country: "Australia", city: "Melbourne", aliases: ["unimelb", "melbourne uni"] },
  { name: "University of Sydney", country: "Australia", city: "Sydney", aliases: ["usyd", "sydney uni"] },
  { name: "Australian National University (ANU)", country: "Australia", city: "Canberra", aliases: ["anu"] },
  { name: "University of New South Wales (UNSW)", country: "Australia", city: "Sydney", aliases: ["unsw"] },
  { name: "University of Queensland", country: "Australia", city: "Brisbane", aliases: ["uq"] },
  { name: "Monash University", country: "Australia", city: "Melbourne", aliases: ["monash"] },
  { name: "University of Western Australia", country: "Australia", city: "Perth", aliases: ["uwa"] },

  // Switzerland
  { name: "ETH Zurich", country: "Switzerland", city: "Zurich", aliases: ["eth", "ethz"] },
  { name: "EPFL (École Polytechnique Fédérale de Lausanne)", country: "Switzerland", city: "Lausanne", aliases: ["epfl"] },
  { name: "University of Zurich", country: "Switzerland", city: "Zurich", aliases: ["uzh"] },
  { name: "University of Geneva", country: "Switzerland", city: "Geneva", aliases: ["unige"] },

  // France
  { name: "Sorbonne University", country: "France", city: "Paris", aliases: ["sorbonne"] },
  { name: "École Polytechnique", country: "France", city: "Palaiseau", aliases: ["polytechnique", "l'x"] },
  { name: "PSL Research University", country: "France", city: "Paris", aliases: ["psl"] },
  { name: "University of Paris-Saclay", country: "France", city: "Saclay", aliases: ["paris-saclay", "saclay"] },

  // Netherlands
  { name: "University of Amsterdam", country: "Netherlands", city: "Amsterdam", aliases: ["uva"] },
  { name: "Delft University of Technology (TU Delft)", country: "Netherlands", city: "Delft", aliases: ["tu delft", "delft"] },
  { name: "Utrecht University", country: "Netherlands", city: "Utrecht", aliases: ["uu"] },
  { name: "Leiden University", country: "Netherlands", city: "Leiden", aliases: ["leiden"] },
  { name: "Erasmus University Rotterdam", country: "Netherlands", city: "Rotterdam", aliases: ["erasmus", "eur"] },

  // Sweden
  { name: "KTH Royal Institute of Technology", country: "Sweden", city: "Stockholm", aliases: ["kth"] },
  { name: "Lund University", country: "Sweden", city: "Lund", aliases: ["lund"] },
  { name: "Uppsala University", country: "Sweden", city: "Uppsala", aliases: ["uppsala"] },
  { name: "Karolinska Institute", country: "Sweden", city: "Stockholm", aliases: ["ki", "karolinska"] },

  // Japan
  { name: "University of Tokyo", country: "Japan", city: "Tokyo", aliases: ["todai", "u-tokyo"] },
  { name: "Kyoto University", country: "Japan", city: "Kyoto", aliases: ["kyodai"] },
  { name: "Tokyo Institute of Technology", country: "Japan", city: "Tokyo", aliases: ["tokyo tech"] },
  { name: "Osaka University", country: "Japan", city: "Osaka", aliases: ["handai"] },
  { name: "Tohoku University", country: "Japan", city: "Sendai", aliases: ["tohoku"] },

  // South Korea
  { name: "Seoul National University", country: "South Korea", city: "Seoul", aliases: ["snu"] },
  { name: "KAIST", country: "South Korea", city: "Daejeon", aliases: ["kaist"] },
  { name: "Yonsei University", country: "South Korea", city: "Seoul", aliases: ["yonsei"] },
  { name: "Korea University", country: "South Korea", city: "Seoul", aliases: ["korea uni"] },
  { name: "POSTECH", country: "South Korea", city: "Pohang", aliases: ["postech"] },

  // Singapore
  { name: "National University of Singapore (NUS)", country: "Singapore", city: "Singapore", aliases: ["nus"] },
  { name: "Nanyang Technological University (NTU)", country: "Singapore", city: "Singapore", aliases: ["ntu"] },
  { name: "Singapore Management University (SMU)", country: "Singapore", city: "Singapore", aliases: ["smu"] },

  // China & Hong Kong
  { name: "Tsinghua University", country: "China", city: "Beijing", aliases: ["tsinghua"] },
  { name: "Peking University", country: "China", city: "Beijing", aliases: ["peking", "beida"] },
  { name: "Zhejiang University", country: "China", city: "Hangzhou", aliases: ["zju"] },
  { name: "Fudan University", country: "China", city: "Shanghai", aliases: ["fudan"] },
  { name: "University of Hong Kong (HKU)", country: "Hong Kong", city: "Hong Kong", aliases: ["hku"] },
  { name: "Chinese University of Hong Kong (CUHK)", country: "Hong Kong", city: "Hong Kong", aliases: ["cuhk"] },
  { name: "Hong Kong University of Science and Technology (HKUST)", country: "Hong Kong", city: "Hong Kong", aliases: ["hkust"] },

  // India
  { name: "Indian Institute of Science (IISc)", country: "India", city: "Bangalore", aliases: ["iisc"] },
  { name: "IIT Bombay (Indian Institute of Technology)", country: "India", city: "Mumbai", aliases: ["iitb", "iit bombay"] },
  { name: "IIT Delhi (Indian Institute of Technology)", country: "India", city: "New Delhi", aliases: ["iitd", "iit delhi"] },
  { name: "IIT Madras (Indian Institute of Technology)", country: "India", city: "Chennai", aliases: ["iitm", "iit madras"] },
  { name: "IIT Kharagpur", country: "India", city: "Kharagpur", aliases: ["iitkgp"] },
  { name: "IIT Kanpur", country: "India", city: "Kanpur", aliases: ["iitk"] },
  { name: "University of Delhi", country: "India", city: "Delhi", aliases: ["du", "delhi university"] },
  { name: "Jawaharlal Nehru University", country: "India", city: "New Delhi", aliases: ["jnu"] },

  // Bangladesh
  { name: "University of Dhaka", country: "Bangladesh", city: "Dhaka", aliases: ["du", "dhaka university"] },
  { name: "Bangladesh University of Engineering and Technology (BUET)", country: "Bangladesh", city: "Dhaka", aliases: ["buet"] },
  { name: "North South University (NSU)", country: "Bangladesh", city: "Dhaka", aliases: ["nsu"] },
  { name: "BRAC University", country: "Bangladesh", city: "Dhaka", aliases: ["brac"] },

  // Nigeria & Africa
  { name: "University of Ibadan", country: "Nigeria", city: "Ibadan", aliases: ["ui", "ibadan"] },
  { name: "University of Lagos", country: "Nigeria", city: "Lagos", aliases: ["unilag"] },
  { name: "Ahmadu Bello University", country: "Nigeria", city: "Zaria", aliases: ["abu"] },
  { name: "University of Cape Town", country: "South Africa", city: "Cape Town", aliases: ["uct"] },
  { name: "University of the Witwatersrand", country: "South Africa", city: "Johannesburg", aliases: ["wits"] },
  { name: "Stellenbosch University", country: "South Africa", city: "Stellenbosch", aliases: ["stellenbosch"] },
  { name: "University of Nairobi", country: "Kenya", city: "Nairobi", aliases: ["uon"] },
  { name: "University of Ghana", country: "Ghana", city: "Accra", aliases: ["legon", "ug"] },
  { name: "Makerere University", country: "Uganda", city: "Kampala", aliases: ["makerere"] },
  { name: "Cairo University", country: "Egypt", city: "Giza", aliases: ["cairo"] },

  // Turkey & Middle East
  { name: "Middle East Technical University (METU)", country: "Turkey", city: "Ankara", aliases: ["metu", "odtu"] },
  { name: "Boğaziçi University", country: "Turkey", city: "Istanbul", aliases: ["boun", "bogazici"] },
  { name: "Koç University", country: "Turkey", city: "Istanbul", aliases: ["koc"] },
  { name: "Bilkent University", country: "Turkey", city: "Ankara", aliases: ["bilkent"] },
  { name: "King Saud University", country: "Saudi Arabia", city: "Riyadh", aliases: ["ksu"] },
  { name: "King Fahd University of Petroleum and Minerals (KFUPM)", country: "Saudi Arabia", city: "Dhahran", aliases: ["kfupm"] },
  { name: "KAUST (King Abdullah University of Science and Technology)", country: "Saudi Arabia", city: "Thuwal", aliases: ["kaust"] },
  { name: "American University of Beirut (AUB)", country: "Lebanon", city: "Beirut", aliases: ["aub"] },
  { name: "United Arab Emirates University", country: "United Arab Emirates", city: "Al Ain", aliases: ["uaeu"] },

  // Latin America
  { name: "Universidade de São Paulo (USP)", country: "Brazil", city: "São Paulo", aliases: ["usp"] },
  { name: "Universidad Nacional Autónoma de México (UNAM)", country: "Mexico", city: "Mexico City", aliases: ["unam"] },
  { name: "Tecnológico de Monterrey (ITESM)", country: "Mexico", city: "Monterrey", aliases: ["tec", "itesm"] },
  { name: "Universidad de Buenos Aires (UBA)", country: "Argentina", city: "Buenos Aires", aliases: ["uba"] },
  { name: "Pontificia Universidad Católica de Chile", country: "Chile", city: "Santiago", aliases: ["puc"] },
  { name: "Universidad de Los Andes", country: "Colombia", city: "Bogota", aliases: ["uniandes"] },

  // Southeast Asia
  { name: "Universiti Malaya (UM)", country: "Malaysia", city: "Kuala Lumpur", aliases: ["um"] },
  { name: "Universiti Teknologi Malaysia (UTM)", country: "Malaysia", city: "Johor Bahru", aliases: ["utm"] },
  { name: "Universitas Indonesia", country: "Indonesia", city: "Jakarta", aliases: ["ui"] },
  { name: "Gadjah Mada University", country: "Indonesia", city: "Yogyakarta", aliases: ["ugm"] },
  { name: "Chulalongkorn University", country: "Thailand", city: "Bangkok", aliases: ["chula"] },
  { name: "University of the Philippines Diliman", country: "Philippines", city: "Quezon City", aliases: ["up diliman", "upd"] },
  { name: "Vietnam National University, Hanoi", country: "Vietnam", city: "Hanoi", aliases: ["vnu"] },

  // Italy, Spain, Ireland, Belgium, Austria, New Zealand
  { name: "Sapienza University of Rome", country: "Italy", city: "Rome", aliases: ["sapienza"] },
  { name: "Politecnico di Milano", country: "Italy", city: "Milan", aliases: ["polimi"] },
  { name: "University of Bologna", country: "Italy", city: "Bologna", aliases: ["unibo"] },
  { name: "University of Barcelona", country: "Spain", city: "Barcelona", aliases: ["ub"] },
  { name: "Autonomous University of Madrid", country: "Spain", city: "Madrid", aliases: ["uam"] },
  { name: "Trinity College Dublin", country: "Ireland", city: "Dublin", aliases: ["tcd", "trinity"] },
  { name: "University College Dublin (UCD)", country: "Ireland", city: "Dublin", aliases: ["ucd"] },
  { name: "KU Leuven", country: "Belgium", city: "Leuven", aliases: ["kuleuven"] },
  { name: "University of Vienna", country: "Austria", city: "Vienna", aliases: ["univie"] },
  { name: "University of Auckland", country: "New Zealand", city: "Auckland", aliases: ["uoa"] },
  { name: "University of Otago", country: "New Zealand", city: "Dunedin", aliases: ["otago"] },
];

export function searchUniversities(query: string, country?: string): UniversityItem[] {
  if (!query || query.trim() === '') {
    if (country) {
      return UNIVERSITIES.filter(u => u.country.toLowerCase() === country.toLowerCase()).slice(0, 15);
    }
    return UNIVERSITIES.slice(0, 15);
  }

  const q = query.toLowerCase().trim();
  const normalizedQ = q.replace(/[^a-z0-9]/g, '');

  return UNIVERSITIES.filter(u => {
    // Check country bias if given
    const countryMatch = country ? u.country.toLowerCase() === country.toLowerCase() : true;

    // Direct name match
    if (u.name.toLowerCase().includes(q)) return true;
    
    // City match
    if (u.city && u.city.toLowerCase().includes(q)) return true;

    // Alias / acronym match (e.g. iub, iub bwp, mit, lums, nust)
    if (u.aliases && u.aliases.some(alias => {
      const normAlias = alias.toLowerCase().replace(/[^a-z0-9]/g, '');
      return alias.toLowerCase().includes(q) || q.includes(alias.toLowerCase()) || normAlias.includes(normalizedQ);
    })) {
      return true;
    }

    return false;
  }).sort((a, b) => {
    // Prioritize country match if provided
    if (country) {
      const aCountry = a.country.toLowerCase() === country.toLowerCase() ? 1 : 0;
      const bCountry = b.country.toLowerCase() === country.toLowerCase() ? 1 : 0;
      if (bCountry !== aCountry) return bCountry - aCountry;
    }
    // Exact startsWith
    const aStarts = a.name.toLowerCase().startsWith(q) ? 1 : 0;
    const bStarts = b.name.toLowerCase().startsWith(q) ? 1 : 0;
    return bStarts - aStarts;
  });
}
