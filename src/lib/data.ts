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
    id: 'plagdetect',
    title: 'PlagDetect',
    period: 'Jan 2026 – Present',
    description: 'A full-stack plagiarism detection platform with Progressive Web App support and a Chrome Extension for instant plagiarism detection. Features real-time content scanning and similarity analysis.',
    techStack: ['Next.js', 'PostgreSQL', 'Gemini API', 'LangGraph', 'RAG', 'Langfuse', 'Guardrails AI', 'PWA'],
    highlights: [
      'Multi-modal plagiarism detection (text, code, images) via LangGraph RAG pipelines — 60% reduction in manual review',
      'Progressive Web App (PWA) + Chrome Extension (Manifest V3) for instant scanning',
      'Langfuse LLMOps observability + Guardrails AI prompt injection defense',
    ],
    githubUrl: 'https://github.com/Varun9490',
    liveUrl: 'https://cursors-2k26.vercel.app/',
  },
  {
    id: 'storycraft',
    title: 'StoryCraft',
    period: 'Mar 2025',
    description: 'AI-powered story generation platform with interactive storytelling experience and dynamic content generation using multi-agent RAG architecture.',
    techStack: ['Next.js', 'MongoDB', 'Socket.IO', 'LangChain', 'LangGraph', 'RAG', 'Phoenix (Arize)'],
    highlights: [
      'AI-powered interactive storytelling with dynamic content generation via multi-agent RAG',
      'Phoenix (Arize) LLM observability + Guardrails AI jailbreak detection — 40% seller onboarding reduction',
      'JWT, HttpOnly cookies, RBAC — zero data-exposure incidents',
    ],
    githubUrl: 'https://github.com/Varun9490',
    liveUrl: 'https://story-craft-one.vercel.app/',
  },
  {
    id: 'restobar',
    title: 'RestoBar',
    period: 'Dec 2024',
    description: 'Full-stack Next.js coffee shop e-commerce website with product catalog, cart, authentication, payments, admin dashboard, and order management.',
    techStack: ['Next.js', 'MongoDB', 'Stripe', 'NextAuth', 'Tailwind CSS'],
    highlights: [
      'Full-stack e-commerce with product catalog, cart system, and Stripe payment integration',
      'Admin dashboard with order management and inventory tracking',
      'NextAuth authentication with role-based access control',
    ],
    githubUrl: 'https://github.com/Varun9490',
    liveUrl: 'https://resto-bar-alpha.vercel.app/',
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
