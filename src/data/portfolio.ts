// All content below comes from the student's own information.
export const STUDENT = {
  fullName: 'Aisha Niyonsaba',
  nickname: 'Lavi',
  registrationNumber: '2527104',
  verificationCode: 'MOB-A2-7104',
  appName: 'LaviPortfolio',
  version: '1.0.0',
  institution: 'INES-Ruhengeri',
  github: 'lavi041',
};

export const DEFAULT_PROFILE = {
  headline: 'Software Engineering Student',
  bio:
    'I am a final-year Software Engineering student at INES-Ruhengeri. I build desktop, web and database-driven systems, and I enjoy solving problems and working in teams.',
  primarySkill: 'JavaScript',
  availability: 'Available for internship',
};

export type SkillGroup = { title: string; skills: string[] };

export const SKILL_GROUPS: SkillGroup[] = [
  { title: 'Frontend', skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'] },
  { title: 'Programming languages', skills: ['Java', 'PHP', 'Python', 'JavaScript'] },
  { title: 'Backend and data', skills: ['MySQL', 'Data Design', 'CRUD'] },
  { title: 'Software skills', skills: ['Desktop Apps', 'System Design', 'Debugging', 'SDLC'] },
  { title: 'Soft skills', skills: ['Teamwork', 'Problem Solving', 'Communication', 'Adaptability'] },
];

export type TimelineItem = { id: string; period: string; title: string; place: string };

export const EDUCATION: TimelineItem[] = [
  { id: 'e1', period: 'Completed 2023', title: 'Secondary school (TVET)', place: 'Mutovu' },
  { id: 'e2', period: '2024 (6 months)', title: 'Training at the gym', place: 'Training completed' },
  { id: 'e3', period: 'Final year', title: 'Software Engineering', place: 'INES-Ruhengeri' },
];

export type Project = {
  id: string;
  title: string;
  problem: string;
  contribution: string;
  technology: string[];
};

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Student Management System',
    problem:
      'Student records needed to be managed in one place with full create, read, update and delete operations.',
    contribution:
      'I built the desktop application with full CRUD functionality and connected it to a database.',
    technology: ['Desktop application', 'Database integration', 'CRUD'],
  },
  {
    id: 'p2',
    title: 'Shop Management System',
    problem:
      'Gym operations such as members, plans and payments needed to be managed in a single system.',
    contribution:
      'I worked on this full-stack academic project covering members, plans and payments.',
    technology: ['Full-stack', 'Database', 'Academic project'],
  },
  {
    id: 'p3',
    title: 'Coffee Shop Website: Honest Lodge Coffee',
    problem: 'A coffee shop needed a website to present itself to customers online.',
    contribution: 'I designed and built the Honest Lodge Coffee website.',
    technology: ['Website', 'HTML', 'CSS', 'JavaScript'],
  },
];
