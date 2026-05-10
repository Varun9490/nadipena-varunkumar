export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface Project {
  id: string;
  title: string;
  period: string;
  description: string;
  techStack: string[];
  highlights: string[];
  githubUrl: string;
  liveUrl?: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  icon: string;
  skills: string[];
  size: 'small' | 'medium' | 'large';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
}

export interface Achievement {
  id: string;
  title: string;
  highlight: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  score: string;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
  suffix?: string;
}

export interface NavLink {
  label: string;
  href: string;
}
