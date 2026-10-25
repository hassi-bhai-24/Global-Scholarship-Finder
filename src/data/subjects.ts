export interface SubjectItem {
  id: string;
  name: string;
  category: string;
  aliases: string[];
  keywords: string[];
}

export const SUBJECT_CATEGORIES = [
  "Computer & Information Sciences",
  "Agricultural, Food & Nutrition Sciences",
  "Psychology & Behavioral Sciences",
  "Engineering & Technology",
  "Medical, Dental & Health Sciences",
  "Biological & Life Sciences",
  "Physical, Chemical & Mathematical Sciences",
  "Business, Economics & Management",
  "Social Sciences, Law & Public Policy",
  "Humanities, Arts, Design & Education",
  "Environmental & Earth Sciences"
] as const;

export const ACADEMIC_SUBJECTS: SubjectItem[] = [
  // --- Category 1: Computer & Information Sciences (16 subjects) ---
  {
    id: "computer-science",
    name: "Computer Science",
    category: "Computer & Information Sciences",
    aliases: ["Computer Sci", "CS", "CompSci", "Computing", "Computer Studies"],
    keywords: ["algorithms", "programming", "software", "computation", "systems", "cs", "computer"]
  },
  {
    id: "software-engineering",
    name: "Software Engineering",
    category: "Computer & Information Sciences",
    aliases: ["SE", "Software Development", "Software Systems"],
    keywords: ["software", "coding", "architecture", "devops", "engineering", "apps"]
  },
  {
    id: "artificial-intelligence",
    name: "Artificial Intelligence & Machine Learning",
    category: "Computer & Information Sciences",
    aliases: ["AI", "ML", "Machine Learning", "Deep Learning", "Generative AI"],
    keywords: ["neural networks", "ai", "machine learning", "nlp", "computer vision", "robotics"]
  },
  {
    id: "data-science",
    name: "Data Science & Big Data Analytics",
    category: "Computer & Information Sciences",
    aliases: ["Data Analytics", "Big Data", "Business Analytics", "Data Engineering"],
    keywords: ["data", "statistics", "analytics", "mining", "predictive", "visualization"]
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity & Information Assurance",
    category: "Computer & Information Sciences",
    aliases: ["Information Security", "InfoSec", "Network Security", "Cyber Defense"],
    keywords: ["security", "cryptography", "ethical hacking", "infosec", "cyber", "defense"]
  },
  {
    id: "cloud-computing",
    name: "Cloud Computing & Distributed Systems",
    category: "Computer & Information Sciences",
    aliases: ["Cloud Engineering", "Distributed Systems", "Cloud Architecture"],
    keywords: ["cloud", "aws", "azure", "distributed", "servers", "microservices"]
  },
  {
    id: "human-computer-interaction",
    name: "Human-Computer Interaction (HCI)",
    category: "Computer & Information Sciences",
    aliases: ["HCI", "UX Research", "Interaction Design", "UI/UX"],
    keywords: ["usability", "ux", "interface", "interaction", "user experience"]
  },
  {
    id: "information-technology",
    name: "Information Technology (IT)",
    category: "Computer & Information Sciences",
    aliases: ["IT", "Information Systems", "Applied Computing"],
    keywords: ["it", "network", "sysadmin", "infrastructure", "enterprise"]
  },
  {
    id: "computer-engineering",
    name: "Computer Engineering & Hardware Systems",
    category: "Computer & Information Sciences",
    aliases: ["Computer Systems Engineering", "Hardware Engineering", "Embedded Systems"],
    keywords: ["hardware", "vlsi", "processors", "embedded", "circuits", "microcontrollers"]
  },
  {
    id: "bioinformatics",
    name: "Bioinformatics & Computational Biology",
    category: "Computer & Information Sciences",
    aliases: ["Computational Biology", "Health Informatics", "Genomic Informatics"],
    keywords: ["genomics", "computational biology", "dna", "sequencing", "algorithms"]
  },
  {
    id: "robotics-autonomous-systems",
    name: "Robotics & Autonomous Systems",
    category: "Computer & Information Sciences",
    aliases: ["Robotics Engineering", "Autonomous Vehicles", "Mechatronic Systems"],
    keywords: ["robotics", "automation", "drones", "sensors", "control systems"]
  },
  {
    id: "game-design-interactive-media",
    name: "Game Design & Interactive Media",
    category: "Computer & Information Sciences",
    aliases: ["Game Development", "Video Games", "Interactive Simulations"],
    keywords: ["gaming", "game dev", "graphics", "simulation", "interactive"]
  },
  {
    id: "web-mobile-development",
    name: "Web & Mobile Application Development",
    category: "Computer & Information Sciences",
    aliases: ["Web Development", "Mobile Dev", "App Development"],
    keywords: ["full stack", "react", "android", "ios", "frontend", "backend"]
  },
  {
    id: "quantum-computing",
    name: "Quantum Computing & Information",
    category: "Computer & Information Sciences",
    aliases: ["Quantum Information Science", "Quantum Algorithms"],
    keywords: ["quantum", "qubits", "physics", "superposition", "cryptography"]
  },
  {
    id: "database-systems",
    name: "Database Systems & Information Management",
    category: "Computer & Information Sciences",
    aliases: ["Data Architecture", "SQL / NoSQL", "Data Warehousing"],
    keywords: ["database", "sql", "nosql", "warehouse", "etl", "big query"]
  },
  {
    id: "network-telecommunications",
    name: "Network Engineering & Telecommunications",
    category: "Computer & Information Sciences",
    aliases: ["Networking", "Wireless Networks", "5G / 6G Communications"],
    keywords: ["networks", "cisco", "protocols", "routing", "telecom", "wireless"]
  },

  // --- Category 2: Agricultural, Food & Nutrition Sciences (14 subjects) ---
  {
    id: "food-science",
    name: "Food Science",
    category: "Agricultural, Food & Nutrition Sciences",
    aliases: ["Food Sci", "Food Chemistry", "Food Microbiology", "Food Studies"],
    keywords: ["food", "food science", "preservation", "sensory", "fermentation", "food chemistry"]
  },
  {
    id: "food-technology",
    name: "Food Technology & Processing Engineering",
    category: "Agricultural, Food & Nutrition Sciences",
    aliases: ["Food Tech", "Food Engineering", "Post-Harvest Technology"],
    keywords: ["processing", "packaging", "food tech", "manufacturing", "storage", "quality"]
  },
  {
    id: "human-nutrition-dietetics",
    name: "Human Nutrition & Dietetics",
    category: "Agricultural, Food & Nutrition Sciences",
    aliases: ["Nutrition Science", "Dietetics", "Clinical Nutrition", "Public Health Nutrition"],
    keywords: ["nutrition", "dietetics", "metabolism", "wellness", "diet", "vitamins"]
  },
  {
    id: "food-safety-quality",
    name: "Food Safety & Quality Assurance",
    category: "Agricultural, Food & Nutrition Sciences",
    aliases: ["HACCP", "Food Quality", "Food Inspection", "Food Regulatory Affairs"],
    keywords: ["haccp", "safety", "standards", "inspection", "compliance", "pathogens"]
  },
  {
    id: "agronomy-crop-science",
    name: "Agronomy & Crop Science",
    category: "Agricultural, Food & Nutrition Sciences",
    aliases: ["Crop Science", "Field Crops", "Plant Breeding", "Seed Science"],
    keywords: ["crops", "agronomy", "agriculture", "wheat", "rice", "yield", "breeding"]
  },
  {
    id: "agricultural-engineering",
    name: "Agricultural & Biosystems Engineering",
    category: "Agricultural, Food & Nutrition Sciences",
    aliases: ["Agri Engineering", "Farm Machinery", "Irrigation Engineering"],
    keywords: ["irrigation", "machinery", "tractors", "precision agriculture", "bioresources"]
  },
  {
    id: "horticulture",
    name: "Horticulture & Plant Sciences",
    category: "Agricultural, Food & Nutrition Sciences",
    aliases: ["Horticultural Science", "Pomology", "Floriculture", "Olericulture"],
    keywords: ["plants", "flowers", "fruits", "vegetables", "greenhouses", "hydroponics"]
  },
  {
    id: "soil-science",
    name: "Soil Science & Agricultural Chemistry",
    category: "Agricultural, Food & Nutrition Sciences",
    aliases: ["Pedology", "Soil Fertility", "Soil Conservation"],
    keywords: ["soil", "fertilizer", "nutrients", "pedology", "land management"]
  },
  {
    id: "animal-science",
    name: "Animal Science & Livestock Production",
    category: "Agricultural, Food & Nutrition Sciences",
    aliases: ["Animal Husbandry", "Poultry Science", "Livestock Management"],
    keywords: ["livestock", "poultry", "cattle", "breeding", "animal nutrition"]
  },
  {
    id: "dairy-science",
    name: "Dairy Science & Technology",
    category: "Agricultural, Food & Nutrition Sciences",
    aliases: ["Dairy Tech", "Milk Processing", "Dairy Products"],
    keywords: ["dairy", "milk", "cheese", "pasteurization", "processing"]
  },
  {
    id: "agricultural-economics",
    name: "Agricultural Economics & Agribusiness",
    category: "Agricultural, Food & Nutrition Sciences",
    aliases: ["Agribusiness Management", "Farm Management", "Agricultural Trade"],
    keywords: ["agribusiness", "supply chain", "commodity", "markets", "rural economics"]
  },
  {
    id: "sustainable-agriculture",
    name: "Sustainable Agriculture & Agroecology",
    category: "Agricultural, Food & Nutrition Sciences",
    aliases: ["Organic Farming", "Regenerative Agriculture", "Agroecology"],
    keywords: ["sustainability", "organic", "ecology", "permaculture", "conservation"]
  },
  {
    id: "plant-pathology",
    name: "Plant Pathology & Entomology",
    category: "Agricultural, Food & Nutrition Sciences",
    aliases: ["Plant Protection", "Pest Management", "Agricultural Entomology"],
    keywords: ["pests", "fungi", "plant diseases", "insects", "integrated pest management"]
  },
  {
    id: "fisheries-aquaculture",
    name: "Fisheries & Aquaculture Sciences",
    category: "Agricultural, Food & Nutrition Sciences",
    aliases: ["Fish Farming", "Marine Fisheries", "Aquaculture Engineering"],
    keywords: ["fish", "aquaculture", "marine", "hatchery", "aquatic animals"]
  },

  // --- Category 3: Psychology & Behavioral Sciences (13 subjects) ---
  {
    id: "psychology",
    name: "Psychology",
    category: "Psychology & Behavioral Sciences",
    aliases: ["Psycology", "Psych", "Psychological Sciences", "General Psychology"],
    keywords: ["mind", "behavior", "psychology", "mental health", "therapy", "cognition"]
  },
  {
    id: "clinical-psychology",
    name: "Clinical Psychology",
    category: "Psychology & Behavioral Sciences",
    aliases: ["Clinical Psych", "Psychotherapy", "Mental Health Counseling"],
    keywords: ["clinical", "disorders", "counseling", "assessment", "dsm", "treatment"]
  },
  {
    id: "cognitive-psychology",
    name: "Cognitive Psychology & Cognitive Science",
    category: "Psychology & Behavioral Sciences",
    aliases: ["Cognitive Science", "Memory & Perception", "Cognitive Neuroscience"],
    keywords: ["memory", "perception", "attention", "decision making", "language", "brain"]
  },
  {
    id: "neuropsychology",
    name: "Neuropsychology & Behavioral Neuroscience",
    category: "Psychology & Behavioral Sciences",
    aliases: ["Neuroscience & Psychology", "Brain & Behavior", "Biopsychology"],
    keywords: ["brain", "synapses", "neuroanatomy", "cognition", "neurological"]
  },
  {
    id: "counseling-psychology",
    name: "Counseling Psychology & Psychotherapy",
    category: "Psychology & Behavioral Sciences",
    aliases: ["Counseling", "Guidance & Counseling", "Family Therapy"],
    keywords: ["counseling", "therapy", "well-being", "guidance", "intervention"]
  },
  {
    id: "developmental-psychology",
    name: "Developmental & Child Psychology",
    category: "Psychology & Behavioral Sciences",
    aliases: ["Child Psychology", "Adolescent Psychology", "Lifespan Development"],
    keywords: ["child", "infant", "development", "pediatric psychology", "growth"]
  },
  {
    id: "organizational-psychology",
    name: "Industrial & Organizational Psychology (I/O)",
    category: "Psychology & Behavioral Sciences",
    aliases: ["I/O Psychology", "Workplace Psychology", "Organizational Behavior"],
    keywords: ["workplace", "leadership", "human factors", "productivity", "personnel"]
  },
  {
    id: "social-psychology",
    name: "Social Psychology",
    category: "Psychology & Behavioral Sciences",
    aliases: ["Group Dynamics", "Interpersonal Psychology"],
    keywords: ["social", "groups", "attitudes", "prejudice", "influence", "persuasion"]
  },
  {
    id: "educational-psychology",
    name: "Educational Psychology & Learning Sciences",
    category: "Psychology & Behavioral Sciences",
    aliases: ["Learning Psychology", "School Psychology"],
    keywords: ["learning", "instruction", "pedagogy", "student assessment", "motivation"]
  },
  {
    id: "health-psychology",
    name: "Health Psychology & Behavioral Medicine",
    category: "Psychology & Behavioral Sciences",
    aliases: ["Behavioral Medicine", "Wellness Psychology"],
    keywords: ["health", "lifestyle", "stress", "coping", "chronic illness", "prevention"]
  },
  {
    id: "forensic-psychology",
    name: "Forensic Psychology & Criminal Behavior",
    category: "Psychology & Behavioral Sciences",
    aliases: ["Criminal Psychology", "Legal Psychology"],
    keywords: ["forensic", "crime", "courts", "offender profiling", "testimony"]
  },
  {
    id: "behavioral-economics-decision",
    name: "Behavioral Economics & Decision Sciences",
    category: "Psychology & Behavioral Sciences",
    aliases: ["Nudge Theory", "Behavioral Insights"],
    keywords: ["behavioral economics", "heuristics", "biases", "choice architecture"]
  },
  {
    id: "psychometrics-quantitative-psych",
    name: "Psychometrics & Quantitative Psychology",
    category: "Psychology & Behavioral Sciences",
    aliases: ["Psychological Measurement", "Statistical Psychology"],
    keywords: ["testing", "iq", "scales", "statistics", "surveys", "measurement"]
  },

  // --- Category 4: Engineering & Technology (20 subjects) ---
  {
    id: "mechanical-engineering",
    name: "Mechanical Engineering",
    category: "Engineering & Technology",
    aliases: ["Mech Eng", "Mechanical Systems", "Thermodynamics"],
    keywords: ["mechanics", "thermodynamics", "cad", "manufacturing", "heat transfer", "engines"]
  },
  {
    id: "electrical-engineering",
    name: "Electrical & Electronics Engineering",
    category: "Engineering & Technology",
    aliases: ["EE", "Electronics Engineering", "Power Systems"],
    keywords: ["circuits", "power", "electronics", "signals", "microprocessors", "energy"]
  },
  {
    id: "civil-engineering",
    name: "Civil & Structural Engineering",
    category: "Engineering & Technology",
    aliases: ["Civil Eng", "Structural Engineering", "Infrastructure"],
    keywords: ["structures", "bridges", "concrete", "geotechnical", "transportation", "construction"]
  },
  {
    id: "chemical-engineering",
    name: "Chemical Engineering",
    category: "Engineering & Technology",
    aliases: ["Chem Eng", "Process Engineering"],
    keywords: ["reactions", "polymers", "refinery", "separation", "catalysis", "process"]
  },
  {
    id: "aerospace-engineering",
    name: "Aerospace & Aeronautical Engineering",
    category: "Engineering & Technology",
    aliases: ["Aeronautics", "Aviation Engineering", "Astronautics", "Space Engineering"],
    keywords: ["aircraft", "aerodynamics", "spacecraft", "propulsion", "flight", "satellites"]
  },
  {
    id: "biomedical-engineering",
    name: "Biomedical Engineering & Bioengineering",
    category: "Engineering & Technology",
    aliases: ["BME", "Medical Device Engineering", "Bioengineering"],
    keywords: ["prosthetics", "implants", "medical imaging", "biomechanics", "biomaterials"]
  },
  {
    id: "environmental-engineering",
    name: "Environmental Engineering & Water Resources",
    category: "Engineering & Technology",
    aliases: ["Water Engineering", "Sanitary Engineering", "Pollution Control"],
    keywords: ["water treatment", "pollution", "waste management", "air quality", "remediation"]
  },
  {
    id: "materials-science-engineering",
    name: "Materials Science & Nanotechnology",
    category: "Engineering & Technology",
    aliases: ["Materials Engineering", "Metallurgy", "Nanomaterials"],
    keywords: ["alloys", "nanotech", "crystals", "semiconductors", "composites"]
  },
  {
    id: "industrial-systems-engineering",
    name: "Industrial & Systems Engineering",
    category: "Engineering & Technology",
    aliases: ["Operations Research", "Manufacturing Engineering", "Supply Chain Engineering"],
    keywords: ["optimization", "logistics", "lean", "six sigma", "ergonomics", "production"]
  },
  {
    id: "mechatronics-engineering",
    name: "Mechatronics & Automation Engineering",
    category: "Engineering & Technology",
    aliases: ["Mechatronics", "Electromechanical Engineering"],
    keywords: ["automation", "plc", "actuators", "sensors", "robotics", "embedded"]
  },
  {
    id: "petroleum-gas-engineering",
    name: "Petroleum & Natural Gas Engineering",
    category: "Engineering & Technology",
    aliases: ["Oil & Gas Engineering", "Reservoir Engineering", "Drilling"],
    keywords: ["drilling", "reservoir", "geology", "offshore", "hydrocarbons"]
  },
  {
    id: "renewable-energy-engineering",
    name: "Renewable & Sustainable Energy Engineering",
    category: "Engineering & Technology",
    aliases: ["Clean Energy", "Solar Energy", "Wind Energy Engineering"],
    keywords: ["solar", "wind", "hydrogen", "photovoltaics", "batteries", "grid"]
  },
  {
    id: "nuclear-engineering",
    name: "Nuclear Engineering & Radiological Sciences",
    category: "Engineering & Technology",
    aliases: ["Nuclear Science", "Radiation Engineering"],
    keywords: ["reactors", "fission", "fusion", "radiation", "isotopes"]
  },
  {
    id: "marine-ocean-engineering",
    name: "Marine & Offshore Engineering",
    category: "Engineering & Technology",
    aliases: ["Naval Architecture", "Ocean Engineering"],
    keywords: ["ships", "vessels", "offshore platforms", "subsea", "hydrodynamics"]
  },
  {
    id: "mining-mineral-engineering",
    name: "Mining & Mineral Engineering",
    category: "Engineering & Technology",
    aliases: ["Mineral Processing", "Extractive Metallurgy"],
    keywords: ["mining", "minerals", "extraction", "geology", "tunnels"]
  },
  {
    id: "architecture",
    name: "Architecture & Architectural Design",
    category: "Engineering & Technology",
    aliases: ["Architectural Studies", "Building Design"],
    keywords: ["buildings", "cad", "structures", "blueprints", "sustainable design"]
  },
  {
    id: "urban-planning",
    name: "Urban & Regional Planning",
    category: "Engineering & Technology",
    aliases: ["City Planning", "Town Planning", "Spatial Planning"],
    keywords: ["zoning", "transportation", "housing", "smart cities", "infrastructure"]
  },
  {
    id: "construction-management",
    name: "Construction Management & Quantity Surveying",
    category: "Engineering & Technology",
    aliases: ["Quantity Surveying", "Building Construction"],
    keywords: ["estimating", "contracts", "bim", "safety", "project management"]
  },
  {
    id: "geomatics-gis-engineering",
    name: "Geomatics & Geographic Information Systems (GIS)",
    category: "Engineering & Technology",
    aliases: ["GIS", "Surveying Engineering", "Remote Sensing"],
    keywords: ["maps", "gis", "satellites", "spatial", "cartography", "surveying"]
  },
  {
    id: "acoustical-engineering",
    name: "Acoustical & Audio Engineering",
    category: "Engineering & Technology",
    aliases: ["Sound Engineering", "Acoustics"],
    keywords: ["sound", "vibration", "noise control", "audio", "studio"]
  },

  // --- Category 5: Medical, Dental & Health Sciences (16 subjects) ---
  {
    id: "public-health",
    name: "Public Health & Global Health",
    category: "Medical, Dental & Health Sciences",
    aliases: ["MPH", "Global Health", "Community Health"],
    keywords: ["epidemiology", "health policy", "vaccines", "prevention", "global health", "who"]
  },
  {
    id: "epidemiology-biostatistics",
    name: "Epidemiology & Biostatistics",
    category: "Medical, Dental & Health Sciences",
    aliases: ["Clinical Epidemiology", "Infectious Disease Epidemiology"],
    keywords: ["disease outbreaks", "biostatistics", "clinical trials", "cohort", "risk"]
  },
  {
    id: "pharmacy",
    name: "Pharmacy & Pharmaceutical Sciences",
    category: "Medical, Dental & Health Sciences",
    aliases: ["PharmD", "Medicinal Chemistry", "Pharmaceutical Chemistry"],
    keywords: ["drugs", "formulation", "pharmacokinetics", "dispensing", "prescriptions"]
  },
  {
    id: "pharmacology-toxicology",
    name: "Pharmacology & Toxicology",
    category: "Medical, Dental & Health Sciences",
    aliases: ["Toxicology", "Molecular Pharmacology", "Drug Discovery"],
    keywords: ["mechanisms", "toxicity", "receptors", "compounds", "drug development"]
  },
  {
    id: "nursing",
    name: "Nursing & Healthcare Leadership",
    category: "Medical, Dental & Health Sciences",
    aliases: ["Clinical Nursing", "Nurse Practitioner", "BSN", "MSN"],
    keywords: ["patient care", "nursing", "hospital", "critical care", "triage"]
  },
  {
    id: "biomedical-sciences",
    name: "Biomedical Sciences & Medical Research",
    category: "Medical, Dental & Health Sciences",
    aliases: ["Medical Sciences", "Translational Medicine"],
    keywords: ["pathology", "disease", "oncology", "laboratory", "diagnostics"]
  },
  {
    id: "medicine-surgery",
    name: "Medicine & Clinical Research (MBBS / MD)",
    category: "Medical, Dental & Health Sciences",
    aliases: ["MBBS", "MD", "Internal Medicine", "Surgery"],
    keywords: ["clinical", "physician", "doctor", "diagnosis", "surgery", "hospital"]
  },
  {
    id: "dentistry",
    name: "Dentistry & Oral Health Sciences",
    category: "Medical, Dental & Health Sciences",
    aliases: ["BDS", "DDS", "Dental Surgery", "Orthodontics"],
    keywords: ["teeth", "oral surgery", "dental", "periodontics", "maxillofacial"]
  },
  {
    id: "physiotherapy-rehabilitation",
    name: "Physiotherapy & Physical Therapy (DPT)",
    category: "Medical, Dental & Health Sciences",
    aliases: ["DPT", "Physical Therapy", "Kinesiology", "Sports Medicine"],
    keywords: ["rehabilitation", "mobility", "muscles", "exercise", "physical therapy"]
  },
  {
    id: "medical-laboratory-sciences",
    name: "Medical Laboratory Technology & Pathology",
    category: "Medical, Dental & Health Sciences",
    aliases: ["MLT", "Clinical Laboratory Science", "Histopathology"],
    keywords: ["blood", "biopsies", "microscopes", "diagnostics", "pathology"]
  },
  {
    id: "health-informatics",
    name: "Health Informatics & Digital Health",
    category: "Medical, Dental & Health Sciences",
    aliases: ["Medical Informatics", "EHR Systems", "Clinical Data"],
    keywords: ["electronic records", "health data", "telemedicine", "fhir", "hipaa"]
  },
  {
    id: "occupational-therapy",
    name: "Occupational Therapy & Ergonomics",
    category: "Medical, Dental & Health Sciences",
    aliases: ["OT", "Rehabilitation Sciences"],
    keywords: ["daily living", "assistive devices", "pediatric therapy", "workplace recovery"]
  },
  {
    id: "immunology-infectious-diseases",
    name: "Immunology & Infectious Diseases",
    category: "Medical, Dental & Health Sciences",
    aliases: ["Virology", "Medical Microbiology", "Vaccinology"],
    keywords: ["antibodies", "viruses", "bacteria", "immune system", "vaccines", "pathogens"]
  },
  {
    id: "veterinary-medicine",
    name: "Veterinary Medicine & Animal Health (DVM)",
    category: "Medical, Dental & Health Sciences",
    aliases: ["DVM", "Vet Science", "Animal Surgery"],
    keywords: ["veterinary", "pets", "wildlife", "zoonotic", "animal medicine"]
  },
  {
    id: "healthcare-administration",
    name: "Healthcare Administration & Hospital Management",
    category: "Medical, Dental & Health Sciences",
    aliases: ["MHA", "Hospital Administration", "Health Management"],
    keywords: ["hospital leadership", "health policy", "clinic management", "quality care"]
  },
  {
    id: "radiology-medical-imaging",
    name: "Medical Imaging & Radiation Therapy",
    category: "Medical, Dental & Health Sciences",
    aliases: ["Radiology", "Sonography", "Nuclear Medicine Technology"],
    keywords: ["mri", "ct scan", "x-ray", "ultrasound", "radiation therapy"]
  },

  // --- Category 6: Biological & Life Sciences (15 subjects) ---
  {
    id: "molecular-biology",
    name: "Molecular Biology & Genetics",
    category: "Biological & Life Sciences",
    aliases: ["Molecular Genetics", "Cell & Molecular Biology"],
    keywords: ["dna", "rna", "crispr", "genes", "proteins", "transcription"]
  },
  {
    id: "biotechnology",
    name: "Biotechnology & Applied Microbiology",
    category: "Biological & Life Sciences",
    aliases: ["Biotech", "Industrial Biotechnology", "Bioengineering"],
    keywords: ["fermentation", "cloning", "bioprocessing", "enzymes", "biotech"]
  },
  {
    id: "biochemistry",
    name: "Biochemistry & Biophysics",
    category: "Biological & Life Sciences",
    aliases: ["Biological Chemistry", "Enzymology"],
    keywords: ["metabolism", "enzymes", "macromolecules", "lipids", "biochemical"]
  },
  {
    id: "microbiology",
    name: "Microbiology & Bacteriology",
    category: "Biological & Life Sciences",
    aliases: ["Applied Microbiology", "Mycology"],
    keywords: ["bacteria", "fungi", "microbes", "microscopy", "culture"]
  },
  {
    id: "genetics-genomics",
    name: "Genetics, Genomics & Epigenetics",
    category: "Biological & Life Sciences",
    aliases: ["Medical Genetics", "Human Genomics"],
    keywords: ["genome", "heredity", "sequencing", "mutations", "chromosomes"]
  },
  {
    id: "botany-plant-biology",
    name: "Botany & Plant Sciences",
    category: "Biological & Life Sciences",
    aliases: ["Plant Biology", "Phytology", "Plant Biotechnology"],
    keywords: ["flora", "photosynthesis", "plant physiology", "taxonomy", "herbarium"]
  },
  {
    id: "zoology-animal-biology",
    name: "Zoology & Comparative Animal Physiology",
    category: "Biological & Life Sciences",
    aliases: ["Animal Biology", "Entomology", "Herpetology"],
    keywords: ["fauna", "invertebrates", "vertebrates", "evolution", "physiology"]
  },
  {
    id: "ecology-evolutionary-biology",
    name: "Ecology & Evolutionary Biology",
    category: "Biological & Life Sciences",
    aliases: ["Ecosystem Science", "Evolutionary Biology"],
    keywords: ["ecosystems", "biodiversity", "adaptation", "food webs", "population ecology"]
  },
  {
    id: "marine-biology",
    name: "Marine Biology & Ocean Life",
    category: "Biological & Life Sciences",
    aliases: ["Biological Oceanography", "Marine Ecology"],
    keywords: ["coral reefs", "fisheries", "marine mammals", "plankton", "oceans"]
  },
  {
    id: "conservation-biology",
    name: "Conservation Biology & Wildlife Ecology",
    category: "Biological & Life Sciences",
    aliases: ["Wildlife Management", "Endangered Species Conservation"],
    keywords: ["wildlife", "habitats", "endangered species", "reserves", "poaching"]
  },
  {
    id: "neurobiology",
    name: "Neurobiology & Brain Physiology",
    category: "Biological & Life Sciences",
    aliases: ["Neural Sciences", "Cellular Neuroscience"],
    keywords: ["neurons", "action potentials", "synaptic transmission", "neural circuits"]
  },
  {
    id: "developmental-biology-stem-cells",
    name: "Developmental Biology & Stem Cell Research",
    category: "Biological & Life Sciences",
    aliases: ["Regenerative Medicine", "Embryology"],
    keywords: ["embryo", "differentiation", "stem cells", "organogenesis", "cloning"]
  },
  {
    id: "synthetic-biology",
    name: "Synthetic Biology & Metabolic Engineering",
    category: "Biological & Life Sciences",
    aliases: ["SynBio", "Genetic Circuit Engineering"],
    keywords: ["bio-design", "synthetic genomes", "chassis organisms", "pathway engineering"]
  },
  {
    id: "structural-biology",
    name: "Structural Biology & Cryo-EM",
    category: "Biological & Life Sciences",
    aliases: ["X-Ray Crystallography", "Protein Folding"],
    keywords: ["crystallography", "cryo-em", "nmr", "alphafold", "protein structure"]
  },
  {
    id: "toxicology-environmental-health",
    name: "Environmental Toxicology & Ecotoxicology",
    category: "Biological & Life Sciences",
    aliases: ["Ecotoxicology", "Chemical Safety"],
    keywords: ["pollutants", "heavy metals", "bioaccumulation", "pesticides", "toxicity"]
  },

  // --- Category 7: Physical, Chemical & Mathematical Sciences (14 subjects) ---
  {
    id: "physics",
    name: "Physics & Theoretical Physics",
    category: "Physical, Chemical & Mathematical Sciences",
    aliases: ["Theoretical Physics", "Applied Physics", "Classical Mechanics"],
    keywords: ["relativity", "quantum", "mechanics", "thermodynamics", "optics", "particles"]
  },
  {
    id: "astrophysics-astronomy",
    name: "Astrophysics, Astronomy & Cosmology",
    category: "Physical, Chemical & Mathematical Sciences",
    aliases: ["Space Physics", "Astronomy", "Cosmology"],
    keywords: ["stars", "galaxies", "black holes", "telescopes", "universe", "cosmology"]
  },
  {
    id: "chemistry",
    name: "Chemistry (Organic, Inorganic & Physical)",
    category: "Physical, Chemical & Mathematical Sciences",
    aliases: ["Pure Chemistry", "Organic Chemistry", "Inorganic Chemistry"],
    keywords: ["synthesis", "reactions", "spectroscopy", "periodic table", "bonding"]
  },
  {
    id: "analytical-chemistry",
    name: "Analytical Chemistry & Instrumentation",
    category: "Physical, Chemical & Mathematical Sciences",
    aliases: ["Chemical Analysis", "Chromatography", "Spectrometry"],
    keywords: ["hplc", "mass spectrometry", "chromatography", "spectrophotometry", "titration"]
  },
  {
    id: "mathematics",
    name: "Mathematics & Pure Mathematics",
    category: "Physical, Chemical & Mathematical Sciences",
    aliases: ["Pure Math", "Algebra", "Topology", "Calculus"],
    keywords: ["proofs", "algebra", "topology", "calculus", "geometry", "number theory"]
  },
  {
    id: "applied-mathematics",
    name: "Applied Mathematics & Scientific Computation",
    category: "Physical, Chemical & Mathematical Sciences",
    aliases: ["Computational Math", "Numerical Analysis", "Mathematical Modeling"],
    keywords: ["differential equations", "modeling", "simulation", "numerical methods"]
  },
  {
    id: "statistics-actuarial-science",
    name: "Statistics & Actuarial Science",
    category: "Physical, Chemical & Mathematical Sciences",
    aliases: ["Applied Statistics", "Actuarial Mathematics", "Risk Science"],
    keywords: ["probability", "regression", "inference", "actuary", "risk models", "bayes"]
  },
  {
    id: "geology-earth-sciences",
    name: "Geology & Earth Sciences",
    category: "Physical, Chemical & Mathematical Sciences",
    aliases: ["Geosciences", "Mineralogy", "Structural Geology"],
    keywords: ["rocks", "minerals", "tectonics", "volcanoes", "strata", "fossils"]
  },
  {
    id: "geophysics-seismology",
    name: "Geophysics & Seismology",
    category: "Physical, Chemical & Mathematical Sciences",
    aliases: ["Seismology", "Earthquake Engineering Science"],
    keywords: ["earthquakes", "seismic waves", "magnetic field", "gravity", "mantle"]
  },
  {
    id: "meteorology-atmospheric-sciences",
    name: "Meteorology & Atmospheric Sciences",
    category: "Physical, Chemical & Mathematical Sciences",
    aliases: ["Climatology", "Atmospheric Physics", "Weather Forecasting"],
    keywords: ["weather", "atmosphere", "hurricanes", "climate models", "monsoon"]
  },
  {
    id: "oceanography-marine-sciences",
    name: "Physical & Chemical Oceanography",
    category: "Physical, Chemical & Mathematical Sciences",
    aliases: ["Ocean Sciences", "Marine Geochemistry"],
    keywords: ["currents", "salinity", "tides", "ocean circulation", "deep sea"]
  },
  {
    id: "materials-chemistry-polymers",
    name: "Polymer Science & Materials Chemistry",
    category: "Physical, Chemical & Mathematical Sciences",
    aliases: ["Polymer Chemistry", "Plastics Engineering Science"],
    keywords: ["polymers", "plastics", "resins", "composites", "macromolecular"]
  },
  {
    id: "nuclear-particle-physics",
    name: "Nuclear & High Energy Particle Physics",
    category: "Physical, Chemical & Mathematical Sciences",
    aliases: ["High Energy Physics", "CERN Physics", "Particle Physics"],
    keywords: ["colliders", "bosons", "quarks", "neutrinos", "hadron", "detectors"]
  },
  {
    id: "optics-photonics",
    name: "Optics, Lasers & Photonics",
    category: "Physical, Chemical & Mathematical Sciences",
    aliases: ["Laser Physics", "Optical Sciences", "Photonics"],
    keywords: ["lasers", "lenses", "fiber optics", "diffraction", "interferometry"]
  },

  // --- Category 8: Business, Economics & Management (14 subjects) ---
  {
    id: "business-administration-mba",
    name: "Business Administration (MBA / BBA)",
    category: "Business, Economics & Management",
    aliases: ["MBA", "BBA", "General Management", "Business Studies"],
    keywords: ["strategy", "leadership", "operations", "case studies", "corporate"]
  },
  {
    id: "finance-banking",
    name: "Finance, Banking & Investment",
    category: "Business, Economics & Management",
    aliases: ["Corporate Finance", "Investment Banking", "Wealth Management"],
    keywords: ["capital markets", "stocks", "bonds", "valuation", "portfolio", "banking"]
  },
  {
    id: "accounting-auditing",
    name: "Accounting, Auditing & Taxation",
    category: "Business, Economics & Management",
    aliases: ["CPA", "ACCA", "Chartered Accounting", "Financial Reporting"],
    keywords: ["balance sheet", "audit", "taxation", "ifrs", "gaap", "ledger"]
  },
  {
    id: "economics",
    name: "Economics & Econometrics",
    category: "Business, Economics & Management",
    aliases: ["Microeconomics", "Macroeconomics", "Applied Economics"],
    keywords: ["gdp", "inflation", "supply demand", "fiscal policy", "monetary", "econometrics"]
  },
  {
    id: "international-business",
    name: "International Business & Global Trade",
    category: "Business, Economics & Management",
    aliases: ["Global Trade", "Export Import Management", "Cross-Border Business"],
    keywords: ["multinationals", "foreign direct investment", "tariffs", "trade agreements"]
  },
  {
    id: "marketing-digital-marketing",
    name: "Marketing & Digital Brand Strategy",
    category: "Business, Economics & Management",
    aliases: ["Digital Marketing", "Brand Management", "Consumer Behavior"],
    keywords: ["seo", "advertising", "social media", "market research", "branding", "growth"]
  },
  {
    id: "supply-chain-logistics",
    name: "Supply Chain Management & Logistics",
    category: "Business, Economics & Management",
    aliases: ["SCM", "Procurement", "Freight Logistics"],
    keywords: ["inventory", "warehousing", "shipping", "procurement", "supply chain"]
  },
  {
    id: "human-resource-management",
    name: "Human Resource Management (HRM)",
    category: "Business, Economics & Management",
    aliases: ["HRM", "Talent Management", "People Operations"],
    keywords: ["recruitment", "payroll", "training", "retention", "workplace culture"]
  },
  {
    id: "entrepreneurship-innovation",
    name: "Entrepreneurship & Venture Capital",
    category: "Business, Economics & Management",
    aliases: ["Startups", "Venture Creation", "Technology Commercialization"],
    keywords: ["startups", "incubators", "pitch deck", "seed funding", "business model"]
  },
  {
    id: "fintech-financial-engineering",
    name: "FinTech & Financial Engineering",
    category: "Business, Economics & Management",
    aliases: ["Financial Technology", "Quantitative Finance", "Algo Trading"],
    keywords: ["blockchain", "algorithmic trading", "cryptocurrency", "defi", "risk analytics"]
  },
  {
    id: "project-management",
    name: "Project Management & Agile Operations",
    category: "Business, Economics & Management",
    aliases: ["PMP", "Agile Management", "Scrum"],
    keywords: ["gantt", "scrum", "agile", "budgeting", "risk mitigation", "milestones"]
  },
  {
    id: "hospitality-tourism-management",
    name: "Hospitality & International Tourism",
    category: "Business, Economics & Management",
    aliases: ["Hotel Management", "Tourism Studies", "Event Management"],
    keywords: ["resorts", "hotels", "airline operations", "destinations", "ecotourism"]
  },
  {
    id: "real-estate-property-management",
    name: "Real Estate & Asset Management",
    category: "Business, Economics & Management",
    aliases: ["Property Development", "Real Estate Finance"],
    keywords: ["commercial property", "valuation", "reit", "appraisal", "urban development"]
  },
  {
    id: "sustainability-esg-management",
    name: "Corporate Sustainability & ESG Management",
    category: "Business, Economics & Management",
    aliases: ["ESG", "Sustainable Business", "CSR"],
    keywords: ["carbon footprint", "governance", "climate risk", "sustainable supply chain"]
  },

  // --- Category 9: Social Sciences, Law & Public Policy (16 subjects) ---
  {
    id: "international-relations",
    name: "International Relations & Diplomacy",
    category: "Social Sciences, Law & Public Policy",
    aliases: ["IR", "Foreign Affairs", "Diplomatic Studies", "Global Politics"],
    keywords: ["geopolitics", "treaties", "un", "embassy", "foreign policy", "diplomacy"]
  },
  {
    id: "political-science",
    name: "Political Science & Comparative Government",
    category: "Social Sciences, Law & Public Policy",
    aliases: ["PoliSci", "Government Studies", "Political Philosophy"],
    keywords: ["elections", "democracy", "voting", "constitutions", "governance", "parliament"]
  },
  {
    id: "public-policy-administration",
    name: "Public Policy & Public Administration (MPP / MPA)",
    category: "Social Sciences, Law & Public Policy",
    aliases: ["MPP", "MPA", "Civil Service Studies"],
    keywords: ["policy analysis", "civil service", "evaluation", "budgets", "public sector"]
  },
  {
    id: "law-legal-studies",
    name: "Law & Legal Studies (LLB / LLM)",
    category: "Social Sciences, Law & Public Policy",
    aliases: ["LLB", "LLM", "Jurisprudence", "Legal Studies"],
    keywords: ["courts", "statutes", "litigation", "contracts", "constitutional law", "advocacy"]
  },
  {
    id: "human-rights-law",
    name: "International Human Rights & Humanitarian Law",
    category: "Social Sciences, Law & Public Policy",
    aliases: ["Human Rights", "Refugee Law", "Humanitarian Studies"],
    keywords: ["geneva convention", "amnesty", "unhcr", "civil liberties", "refugees"]
  },
  {
    id: "sociology",
    name: "Sociology & Social Research",
    category: "Social Sciences, Law & Public Policy",
    aliases: ["Social Sciences", "Social Stratification"],
    keywords: ["society", "class", "inequality", "institutions", "social movements", "surveys"]
  },
  {
    id: "development-studies",
    name: "Development Studies & International Development",
    category: "Social Sciences, Law & Public Policy",
    aliases: ["Global Development", "Sustainable Development Goals (SDGs)"],
    keywords: ["poverty reduction", "sdgs", "foreign aid", "ngos", "community empowerment"]
  },
  {
    id: "criminology-criminal-justice",
    name: "Criminology & Criminal Justice",
    category: "Social Sciences, Law & Public Policy",
    aliases: ["Criminal Justice", "Penology", "Police Studies"],
    keywords: ["crime prevention", "prisons", "policing", "rehabilitation", "victimology"]
  },
  {
    id: "media-journalism-communication",
    name: "Journalism, Mass Communication & Digital Media",
    category: "Social Sciences, Law & Public Policy",
    aliases: ["Journalism", "Mass Comm", "Media Studies", "Broadcasting"],
    keywords: ["reporting", "broadcasting", "newsroom", "press", "documentary", "podcasting"]
  },
  {
    id: "anthropology",
    name: "Anthropology & Cultural Studies",
    category: "Social Sciences, Law & Public Policy",
    aliases: ["Social Anthropology", "Cultural Anthropology", "Ethnography"],
    keywords: ["ethnography", "indigenous cultures", "artifacts", "rituals", "kinship"]
  },
  {
    id: "peace-conflict-resolution",
    name: "Peace & Conflict Resolution Studies",
    category: "Social Sciences, Law & Public Policy",
    aliases: ["Peace Studies", "Mediation", "Conflict Transformation"],
    keywords: ["mediation", "peacebuilding", "ceasefire", "reconciliation", "un peacekeeping"]
  },
  {
    id: "gender-development-studies",
    name: "Gender Studies & Inclusive Development",
    category: "Social Sciences, Law & Public Policy",
    aliases: ["Women's Studies", "Feminist Theory", "Diversity & Inclusion"],
    keywords: ["gender equality", "empowerment", "lgbtq+", "intersectionality", "advocacy"]
  },
  {
    id: "international-trade-law",
    name: "International Commercial Law & Arbitration",
    category: "Social Sciences, Law & Public Policy",
    aliases: ["Trade Law", "Commercial Arbitration", "Corporate Law"],
    keywords: ["wto", "cross-border contracts", "arbitration", "intellectual property law"]
  },
  {
    id: "social-work-welfare",
    name: "Social Work & Social Welfare (MSW / BSW)",
    category: "Social Sciences, Law & Public Policy",
    aliases: ["MSW", "Social Work", "Community Welfare"],
    keywords: ["child protection", "foster care", "elderly support", "casework", "community"]
  },
  {
    id: "public-relations-communication",
    name: "Strategic Public Relations & Corporate Affairs",
    category: "Social Sciences, Law & Public Policy",
    aliases: ["PR", "Corporate Communications"],
    keywords: ["press release", "crisis management", "stakeholder relations", "media outreach"]
  },
  {
    id: "demography-population-studies",
    name: "Demography & Population Studies",
    category: "Social Sciences, Law & Public Policy",
    aliases: ["Population Sciences", "Census Studies"],
    keywords: ["fertility", "migration", "mortality", "census", "aging populations"]
  },

  // --- Category 10: Humanities, Arts, Design & Education (15 subjects) ---
  {
    id: "education-pedagogy",
    name: "Education, Pedagogy & Curriculum Design (M.Ed)",
    category: "Humanities, Arts, Design & Education",
    aliases: ["M.Ed", "Teaching", "Curriculum Studies", "Teacher Education"],
    keywords: ["curriculum", "classroom", "instruction", "pedagogy", "school leadership"]
  },
  {
    id: "english-literature",
    name: "English Literature & Creative Writing",
    category: "Humanities, Arts, Design & Education",
    aliases: ["Literature", "Creative Writing", "Comparative Literature"],
    keywords: ["novels", "poetry", "drama", "critical theory", "narrative", "authors"]
  },
  {
    id: "linguistics-applied-linguistics",
    name: "Linguistics & Applied Linguistics",
    category: "Humanities, Arts, Design & Education",
    aliases: ["Phonetics", "Syntax", "Sociolinguistics"],
    keywords: ["grammar", "phonology", "syntax", "semantics", "dialects", "bilingualism"]
  },
  {
    id: "tesol-esl-teaching",
    name: "TESOL / Teaching English as a Foreign Language",
    category: "Humanities, Arts, Design & Education",
    aliases: ["TEFL", "TESOL", "ESL Education", "Applied Language Teaching"],
    keywords: ["esl", "language acquisition", "ielts training", "english teaching"]
  },
  {
    id: "history",
    name: "History & Heritage Studies",
    category: "Humanities, Arts, Design & Education",
    aliases: ["Historical Studies", "World History", "Modern History"],
    keywords: ["archives", "historiography", "civilizations", "treaties", "chronicles"]
  },
  {
    id: "philosophy-ethics",
    name: "Philosophy & Bioethics",
    category: "Humanities, Arts, Design & Education",
    aliases: ["Philosophy", "Ethics", "Logic & Epistemology"],
    keywords: ["morality", "logic", "metaphysics", "bioethics", "existentialism"]
  },
  {
    id: "fine-arts-visual-arts",
    name: "Fine Arts, Painting & Sculpture (MFA)",
    category: "Humanities, Arts, Design & Education",
    aliases: ["MFA", "Visual Arts", "Studio Art"],
    keywords: ["exhibitions", "galleries", "painting", "sculpture", "installations"]
  },
  {
    id: "graphic-design-visual-communication",
    name: "Graphic Design & Visual Communication",
    category: "Humanities, Arts, Design & Education",
    aliases: ["Visual Communication", "Digital Design", "Brand Identity Design"],
    keywords: ["typography", "branding", "illustration", "adobe", "layout", "visuals"]
  },
  {
    id: "film-cinematography",
    name: "Film Production, Cinematography & Screenwriting",
    category: "Humanities, Arts, Design & Education",
    aliases: ["Film Studies", "Cinema Production", "Directing"],
    keywords: ["camera", "editing", "screenplay", "lighting", "festivals", "film"]
  },
  {
    id: "music-musicology",
    name: "Music, Composition & Performance",
    category: "Humanities, Arts, Design & Education",
    aliases: ["Musicology", "Sound Production", "Instrumental Performance"],
    keywords: ["orchestra", "composition", "audio recording", "instruments", "harmony"]
  },
  {
    id: "fashion-textile-design",
    name: "Fashion Design & Textile Engineering",
    category: "Humanities, Arts, Design & Education",
    aliases: ["Apparel Design", "Textile Technology"],
    keywords: ["garments", "runway", "fabrics", "patterns", "sartorial", "merchandising"]
  },
  {
    id: "interior-design",
    name: "Interior Architecture & Spatial Design",
    category: "Humanities, Arts, Design & Education",
    aliases: ["Interior Design", "Interior Architecture"],
    keywords: ["space planning", "furniture", "lighting design", "materials", "residential"]
  },
  {
    id: "special-education",
    name: "Special Needs Education & Inclusive Learning",
    category: "Humanities, Arts, Design & Education",
    aliases: ["Inclusive Education", "Disability Studies in Education"],
    keywords: ["autism", "dyslexia", "iep", "adaptive teaching", "assistive tech"]
  },
  {
    id: "translation-interpretation",
    name: "Translation & Conference Interpretation",
    category: "Humanities, Arts, Design & Education",
    aliases: ["Interpretation", "Language Localization"],
    keywords: ["subtitling", "simultaneous translation", "localization", "bilingual"]
  },
  {
    id: "archaeology-cultural-heritage",
    name: "Archaeology & Museology",
    category: "Humanities, Arts, Design & Education",
    aliases: ["Archaeological Sciences", "Museum Studies"],
    keywords: ["excavation", "relics", "curation", "antiquities", "preservation"]
  },

  // --- Category 11: Environmental & Earth Sciences (12 subjects) ---
  {
    id: "environmental-science",
    name: "Environmental Science & Climate Change",
    category: "Environmental & Earth Sciences",
    aliases: ["Climate Science", "Environmental Studies"],
    keywords: ["climate change", "global warming", "carbon", "biodiversity", "greenhouse gas"]
  },
  {
    id: "natural-resource-management",
    name: "Natural Resource Management & Forestry",
    category: "Environmental & Earth Sciences",
    aliases: ["Forestry", "Resource Conservation"],
    keywords: ["timber", "watersheds", "reforestation", "logging control", "parks"]
  },
  {
    id: "water-resources-hydrology",
    name: "Water Resources Engineering & Hydrology",
    category: "Environmental & Earth Sciences",
    aliases: ["Hydrology", "Hydrogeology", "Aquifer Management"],
    keywords: ["groundwater", "rivers", "floods", "drought", "hydrogeology", "dams"]
  },
  {
    id: "waste-management-circular-economy",
    name: "Waste Management & Circular Economy",
    category: "Environmental & Earth Sciences",
    aliases: ["Solid Waste Management", "Recycling Sciences"],
    keywords: ["recycling", "landfills", "zero waste", "composting", "plastics recycling"]
  },
  {
    id: "disaster-management-resilience",
    name: "Disaster Risk Reduction & Emergency Management",
    category: "Environmental & Earth Sciences",
    aliases: ["Disaster Management", "Emergency Preparedness"],
    keywords: ["earthquakes", "floods", "evacuation", "resilience", "humanitarian relief"]
  },
  {
    id: "gis-remote-sensing-environment",
    name: "GIS & Remote Sensing for Environmental Monitoring",
    category: "Environmental & Earth Sciences",
    aliases: ["Spatial Ecology", "Satellite Earth Observation"],
    keywords: ["satellite imagery", "landsat", "sentinel", "deforestation mapping", "gis"]
  },
  {
    id: "sustainable-urban-ecology",
    name: "Urban Ecology & Green Infrastructure",
    category: "Environmental & Earth Sciences",
    aliases: ["Green Cities", "Urban Forestry"],
    keywords: ["green roofs", "urban heat island", "sponge cities", "eco corridors"]
  },
  {
    id: "soil-water-conservation",
    name: "Soil & Water Conservation Engineering",
    category: "Environmental & Earth Sciences",
    aliases: ["Erosion Control", "Watershed Management"],
    keywords: ["erosion", "terracing", "salinity", "catchment", "watershed"]
  },
  {
    id: "wildlife-parks-management",
    name: "Protected Area & National Park Management",
    category: "Environmental & Earth Sciences",
    aliases: ["Ecotourism & Park Ranger Studies", "Wildlife Protection"],
    keywords: ["national parks", "safari", "ecotourism", "rangers", "conservation"]
  },
  {
    id: "climate-policy-carbon-markets",
    name: "Climate Policy & Carbon Markets",
    category: "Environmental & Earth Sciences",
    aliases: ["Carbon Accounting", "Climate Governance"],
    keywords: ["paris agreement", "cop", "carbon credits", "emissions trading", "net zero"]
  },
  {
    id: "polar-glaciology-sciences",
    name: "Glaciology & Polar Science",
    category: "Environmental & Earth Sciences",
    aliases: ["Cryosphere Studies", "Ice Sheet Science"],
    keywords: ["glaciers", "ice cores", "antarctica", "arctic", "sea level rise"]
  },
  {
    id: "renewable-ocean-energy",
    name: "Marine Energy & Tidal Systems",
    category: "Environmental & Earth Sciences",
    aliases: ["Wave & Tidal Energy", "Offshore Renewable Energy"],
    keywords: ["tidal", "wave power", "offshore wind", "marine renewables"]
  }
];

// Helper: popular disciplines for one-tap selection
export const POPULAR_SUBJECTS: string[] = [
  "Computer Science",
  "Food Science",
  "Psychology",
  "Data Science & Big Data Analytics",
  "Public Health & Global Health",
  "Mechanical Engineering",
  "Civil & Structural Engineering",
  "Electrical & Electronics Engineering",
  "Economics & Econometrics",
  "Business Administration (MBA / BBA)",
  "Biotechnology & Applied Microbiology",
  "All Disciplines (General Eligibility)"
];

// Search helper with aliases and keyword matching
export function searchSubjects(query: string): SubjectItem[] {
  if (!query || !query.trim()) return ACADEMIC_SUBJECTS;
  const q = query.toLowerCase().trim();

  return ACADEMIC_SUBJECTS.filter(s => {
    if (s.name.toLowerCase().includes(q)) return true;
    if (s.category.toLowerCase().includes(q)) return true;
    if (s.aliases.some(a => a.toLowerCase().includes(q))) return true;
    if (s.keywords.some(k => k.toLowerCase().includes(q))) return true;
    return false;
  });
}

// Find subject item by exact or close name
export function findSubjectByName(name: string): SubjectItem | undefined {
  if (!name) return undefined;
  const lower = name.toLowerCase().trim();
  return ACADEMIC_SUBJECTS.find(s => 
    s.name.toLowerCase() === lower || 
    s.id === lower ||
    s.aliases.some(a => a.toLowerCase() === lower)
  );
}
