import type {
  Experience,
  Project,
  SkillGroup,
  Certification,
  Achievement,
  Education,
  SocialLink,
  Stat,
  NavLink,
} from './types';

export const navLinks: NavLink[] = [
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const stats: Stat[] = [
  { id: 'vulns', value: '12', suffix: '+', label: 'High-severity vulnerabilities discovered' },
  { id: 'internships', value: '3', label: 'Internships completed' },
  { id: 'hackathon', value: '1', suffix: 'st', label: 'Place — Cursors 2k26 Hackathon (100+ teams)' },
  { id: 'reliability', value: '99.9', suffix: '%', label: 'Deployment reliability' },
];

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    category: 'Languages',
    icon: 'Code2',
    skills: ['Python', 'Java', 'JavaScript', 'C', 'C++', 'SQL', 'Bash'],
    size: 'medium',
  },
  {
    id: 'web-backend',
    category: 'Web & Backend',
    icon: 'Globe',
    skills: ['Node.js', 'Express.js', 'Django', 'Flask', 'React', 'Next.js', 'REST APIs', 'Microservices'],
    size: 'medium',
  },
  {
    id: 'ai-genai',
    category: 'AI & GenAI',
    icon: 'Brain',
    skills: ['LangChain', 'LangGraph', 'RAG Pipelines', 'Guardrails AI', 'Langfuse', 'Gemini API', 'Prompt Engineering', 'Vector Databases'],
    size: 'large',
  },
  {
    id: 'cybersecurity',
    category: 'Cybersecurity & Pentesting',
    icon: 'Crosshair',
    skills: [
      'Web Application Security Testing',
      'API Security Testing',
      'Bug Bounty Hunting',
      'Reconnaissance & Enumeration',
      'OWASP Top 10',
      'Authentication Bypass Testing',
      'IDOR Testing',
      'XSS', 'SQLi', 'SSRF',
      'Subdomain Takeover Analysis',
      'Automation Scripting',
    ],
    size: 'large',
  },
  {
    id: 'databases',
    category: 'Databases',
    icon: 'Database',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Schema Design', 'Query Optimization'],
    size: 'small',
  },
  {
    id: 'cloud-devops',
    category: 'Cloud & DevOps',
    icon: 'Cloud',
    skills: ['AWS', 'Azure', 'Docker', 'CI/CD', 'GitHub Actions', 'Linux', 'Networking'],
    size: 'medium',
  },
  {
    id: 'security',
    category: 'Security Frameworks',
    icon: 'Shield',
    skills: ['JWT', 'OAuth 2.0', 'RBAC', 'OWASP LLM Top 10', 'VAPT', 'Prompt Injection', 'Jailbreak Detection', 'STRIDE', 'MITRE ATT&CK', 'MITRE ATLAS'],
    size: 'medium',
  },
  {
    id: 'tools',
    category: 'Tools',
    icon: 'Wrench',
    skills: ['Git', 'GitHub', 'Burp Suite', 'Metasploit', 'Nmap', 'Wireshark'],
    size: 'small',
  },
];

export const experiences: Experience[] = [
  {
    id: 'kroll',
    company: 'Kroll Inc.',
    role: 'Technology Intern, Infrastructure & Networking',
    period: 'Feb 2026 – Present',
    location: 'Hyderabad',
    highlights: [
      'Managing cloud/on-prem infrastructure tickets across AWS and Azure',
      'Linux systems config, network troubleshooting (DNS, routing, firewalls)',
      'Enterprise networking tools for traffic monitoring and incident response',
    ],
  },
  {
    id: 'victoire',
    company: 'Victoire System Solutions',
    role: 'Web Developer Intern',
    period: 'Aug 2025 – Jan 2026',
    location: 'Remote',
    highlights: [
      'Django/Python/PostgreSQL full-stack apps — 99.9% deployment reliability',
      'Secure RESTful APIs (JWT, OAuth 2.0, RBAC) — zero unauthorized access incidents',
      'CI/CD pipelines via GitHub Actions with SAST scans',
      'DevSecOps + SSDLC — remediated 10+ vulnerabilities using Burp Suite & OWASP ZAP',
    ],
  },
  {
    id: 'resilientshield',
    company: 'ResilientShield Cyber Solutions',
    role: 'Cybersecurity Research Intern',
    period: 'Jun – Jul 2025',
    location: 'Remote',
    highlights: [
      'AI security assessments — prompt injection & jailbreak red teaming (OWASP LLM Top 10, MITRE ATLAS)',
      'Python automation for recon & exploit validation — 25% efficiency improvement',
      '12+ high-severity vulns discovered (SQLi, IDOR, auth bypass) — 30% security posture improvement',
      'CVSS-scored professional reports with remediation guidance',
    ],
  },
];

export const projects: Project[] = [
  {
  "id": "plagdetect",
  "title": "PlagDetect",
  "period": "Jan 2026 – Present",
  "description": "A full-stack plagiarism detection platform and Chrome Extension for instant plagiarism detection. Features real-time content scanning, similarity analysis, and AI-assisted tools for teachers and researchers.",
  "techStack": ["Next.js", "PostgreSQL", "Gemini API", "LangGraph", "RAG", "Guardrails AI", "Serper API"],
  "highlights": [
    "Multi-modal plagiarism detection (text, code, images) via LangGraph RAG pipelines — 60% reduction in manual review",
    "Progressive Web App (PWA) + Chrome Extension (Manifest V3) for instant scanning",
    "Integration with live websites using Chrome Extension for real-time detection",
    "Serper API for real-time data fetching and similarity checks",
    "Gemini API for code plagiarism detection and analysis",
    "AI-generated plagiarism detection for full website source code — helpful for teachers and researchers",
    "Login-based system with detailed reports and history tracking",
    "Guardrails AI prompt injection defense for secure operations"
  ],
  "githubUrl": "https://github.com/Varun9490/cursors-2k26",
  "liveUrl": "https://cursors-2k26.vercel.app/"
},
  {
  "id": "storycraft",
  "title": "StoryCraft",
  "period": "Mar 2025",
  "description": "AI-powered story generation and artisan marketplace platform with interactive storytelling, dynamic content generation, and AI-assisted seller tools. Built as a Progressive Web App for seamless cross-device experience.",
  "techStack": ["Next.js", "MongoDB", "Socket.IO", "LangChain", "LangGraph", "RAG"],
  "highlights": [
    "AI-powered interactive storytelling with dynamic content generation via multi-agent RAG",
    "Progressive Web App (PWA) for offline support and mobile-first experience",
    "Price prediction using Serper API for artisan products",
    "Chatbot for NLP-based user interactions",
    "Image analysis for direct product description",
    "Visual search from user-uploaded images",
    "AI-generated FAQ creation for products",
    "Seller and user chatbots for seamless communication",
    "AI-assisted seller dashboard and analytics for artisans"
  ],
  "githubUrl": "https://github.com/Varun9490/StoryCraft",
  "liveUrl": "https://story-craft-one.vercel.app/"
},
  {
  "id": "restobar",
  "title": "RestoBar",
  "period": "Dec 2024",
  "description": "Frontend Next.js coffee shop e-commerce website with product catalog, cart, animations, and payment flow UI.",
  "techStack": ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Radix UI"],
  "highlights": [
    "Interactive product catalog with smooth animations",
    "Frontend cart system with dynamic updates",
    "Payment flow UI with responsive design",
    "Modern Tailwind CSS styling for a polished look",
    "Framer Motion animations for engaging user experience",
    "Radix UI components for accessibility and customization"
  ],
  "githubUrl": "https://github.com/Varun9490/restoBar",
  "liveUrl": "https://resto-bar-alpha.vercel.app/"
},
];

export const certifications: Certification[] = [
  { id: 'apisec', name: 'APIsec Certified Practitioner', issuer: 'APIsec University' },
  { id: 'aws-ccp', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services' },
  { id: 'oci-ai', name: 'OCI AI Foundations Associate', issuer: 'Oracle' },
  { id: 'azure-900', name: 'Azure Fundamentals AZ-900', issuer: 'Microsoft' },
  { id: 'python-infosys', name: 'Python Foundations', issuer: 'Infosys' },
  { id: 'cnsp', name: 'CNSP', issuer: 'The SecOps Group' },
  { id: 'servicenow', name: 'ServiceNow CSA', issuer: 'ServiceNow' },
  { id: 'oracle-java', name: 'Oracle Java Foundations', issuer: 'Oracle' },
];

export const achievements: Achievement[] = [
  { id: 'cursors-2k26', title: '1st Place — Cursors 2k26 Hackathon (100+ teams)', highlight: '🥇' },
  { id: 'cursors-2k25', title: '1st Place — Cursors 2k25 Hackathon', highlight: '🥇' },
  { id: 'security-club', title: 'Student Mentor — AITAM Security Club', highlight: '🛡️' },
  { id: 'avishkaar', title: 'Tech Lead — Avishkaar Season 3', highlight: '🚀' },
  { id: 'sql-competition', title: '7th Place — AITAM SQL Competition (Top 3%)', highlight: '🏆' },
];

export const education: Education[] = [
  {
    id: 'btech',
    degree: 'B.Tech in Information Technology',
    institution: 'AITAM, Andhra Pradesh',
    period: '2022 – 2026',
    score: 'CGPA: 7.78/10',
  },
  {
    id: 'intermediate',
    degree: 'Intermediate MPC',
    institution: 'Narayana Junior College',
    period: '2020 – 2022',
    score: '867/1000',
  },
  {
    id: 'ssc',
    degree: 'SSC',
    institution: 'Sri Krishna High School',
    period: '2019 – 2020',
    score: 'GPA: 10.0/10',
  },
];

export const socialLinks: SocialLink[] = [
  { id: 'email', label: 'Email', url: 'mailto:varunnadipena@gmail.com', icon: 'Mail' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/nadipenavarunkumar', icon: 'Linkedin' },
  { id: 'github', label: 'GitHub', url: 'https://github.com/Varun9490', icon: 'Github' },
  { id: 'medium', label: 'Medium', url: 'https://medium.com/@varunnadipena', icon: 'BookOpen' },
  { id: 'phone', label: 'Phone', url: 'tel:+918341493513', icon: 'Phone' },
];

export const bioText =
  'Computer Science student, Security Researcher, and Full-Stack Developer with strong expertise in web security, bug bounty hunting, and scalable application development. Currently serving as Student Mentor at the AITAM Security Club and former Tech Lead for Avishkaar Season 3. First-place hackathon winner across 100+ teams. APIsec Certified Practitioner with a focus on building secure products that bridge security with development. Currently interning at Kroll Inc., Hyderabad.';
