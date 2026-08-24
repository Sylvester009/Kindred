export interface Member {
    id: string;
    name: string;
    initials: string;
    role: string;
    organizationId: string;
    bio: string;
    skillIds: string[];
    projectIds: string[];
}

export interface Organization {
  id: string;
  name: string;
  industry: string;
  location: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  industry: string;
  url: string;
}

export interface Skill {
    id: string;
    name: string;
    category: string;
}