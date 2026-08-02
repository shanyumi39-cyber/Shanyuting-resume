export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  desc: string;
  cover: string;
  images: string[];
}

export interface Profile {
  nameZh: string;
  nameEn: string;
  role: string;
  roleZh: string;
  version: string;
  status: string;
  tagline: string;
  taglineZh: string;
  school: string;
  major: string;
  graduationYear: string;
  location: string;
  hometown: string;
  phone: string;
  email: string;
  wechat: string;
  politics: string;
  jobIntent: string;
  specialties: string[];
  skills: string[];
  tools: string[];
  intro: string[];
}

export interface TimelineEntry {
  period: string;
  title: string;
  org: string;
  points: string[];
  highlights?: string[];
}

export interface Resume {
  pdfPath: string;
  education: TimelineEntry[];
  experience: TimelineEntry[];
  awards: TimelineEntry[];
}
