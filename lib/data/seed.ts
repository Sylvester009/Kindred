import type {
  Member,
  Organization,
  Project,
  Skill,
} from "@/lib/types/kindred";

export const organizations: Organization[] = [
  {
    id: "ductape",
    name: "Ductape Technologies",
    industry: "Software",
    location: "Lagos, Nigeria",
  },
  {
    id: "techflow",
    name: "TechFlow",
    industry: "Technology",
    location: "Lagos, Nigeria",
  },
  {
    id: "nova-systems",
    name: "Nova Systems",
    industry: "Software",
    location: "Abuja, Nigeria",
  },
  {
    id: "databridge",
    name: "DataBridge",
    industry: "Data & Analytics",
    location: "London, UK",
  },
  {
    id: "pixelworks",
    name: "PixelWorks",
    industry: "Digital Products",
    location: "Ibadan, Nigeria",
  },
];

export const skills: Skill[] = [
  {
    id: "react",
    name: "React",
    category: "Frontend",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Programming",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
  },
  {
    id: "python",
    name: "Python",
    category: "Programming",
  },
  {
    id: "sql",
    name: "SQL",
    category: "Database",
  },
  {
    id: "data-engineering",
    name: "Data Engineering",
    category: "Data",
  },
  {
    id: "data-architecture",
    name: "Data Architecture",
    category: "Data",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Database",
  },
  {
    id: "devops",
    name: "DevOps",
    category: "Infrastructure",
  },
  {
    id: "ui-ux",
    name: "UI/UX",
    category: "Design",
  },
  {
    id: "product-management",
    name: "Product Management",
    category: "Product",
  },
];

export const projects: Project[] = [
  {
    id: "insightflow",
    name: "InsightFlow",
    description: "Analytics platform for transforming operational data into actionable insights.",
    industry: "Data & Analytics",
    url: "https://example.com/insightflow",
  },
  {
    id: "meatopia",
    name: "Meatopia",
    description: "E-commerce platform for meat products.",
    industry: "E-commerce",
    url: "https://meatopia.vercel.app",
  },
  {
    id: "guarantor",
    name: "Guarantor",
    description: "Contract and agreement management platform.",
    industry: "Legal Technology",
    url: "https://example.com/guarantor",
  },
  {
    id: "techflow-platform",
    name: "TechFlow Data Platform",
    description: "Centralized platform for collecting and processing business data.",
    industry: "Data & Analytics",
    url: "https://example.com/techflow",
  },
  {
    id: "formflash",
    name: "FormFlash",
    description: "Dynamic form creation and management platform.",
    industry: "Productivity",
    url: "https://example.com/formflash",
  },
  {
    id: "clouddeploy",
    name: "CloudDeploy",
    description: "Deployment management platform for engineering teams.",
    industry: "DevOps",
    url: "https://example.com/clouddeploy",
  },
  {
    id: "nova-commerce",
    name: "Nova Commerce",
    description: "Modern commerce platform for online businesses.",
    industry: "E-commerce",
    url: "https://example.com/nova-commerce",
  },
  {
    id: "analytics-hub",
    name: "Analytics Hub",
    description: "Collaborative analytics workspace for data teams.",
    industry: "Data & Analytics",
    url: "https://example.com/analytics-hub",
  },
];


export const members: Member[] = [
  {
    id: "741205",
    name: "Maria Rodriguez",
    initials: "MR",
    role: "Lead Data Engineer",
    organizationId: "ductape",
    bio: "Data engineer focused on building reliable data platforms and analytics systems.",
    skillIds: [
      "python",
      "sql",
      "data-engineering",
      "data-architecture",
      "postgresql",
    ],
    projectIds: [
      "insightflow",
      "analytics-hub",
    ],
  },

  {
    id: "741206",
    name: "Samuel Sylvester",
    initials: "SS",
    role: "Frontend Developer",
    organizationId: "ductape",
    bio: "Frontend-focused software developer building modern web applications with React, Next.js and TypeScript.",
    skillIds: [
      "react",
      "nextjs",
      "typescript",
      "nodejs",
    ],
    projectIds: [
      "meatopia",
      "guarantor",
      "formflash",
    ],
  },

  {
    id: "741207",
    name: "Daniel Okafor",
    initials: "DO",
    role: "Full Stack Developer",
    organizationId: "ductape",
    bio: "Full stack developer focused on scalable web applications and backend systems.",
    skillIds: [
      "react",
      "nextjs",
      "typescript",
      "nodejs",
      "postgresql",
    ],
    projectIds: [
      "meatopia",
      "guarantor",
    ],
  },

  {
    id: "741208",
    name: "Sarah Jenkins",
    initials: "SJ",
    role: "Frontend Engineer",
    organizationId: "pixelworks",
    bio: "Frontend engineer specializing in modern React applications and user experiences.",
    skillIds: [
      "react",
      "nextjs",
      "typescript",
      "ui-ux",
    ],
    projectIds: [
      "nova-commerce",
      "formflash",
    ],
  },

  {
    id: "741209",
    name: "Chinedu Adeyemi",
    initials: "CA",
    role: "Backend Engineer",
    organizationId: "nova-systems",
    bio: "Backend engineer building APIs, data services and distributed systems.",
    skillIds: [
      "nodejs",
      "typescript",
      "python",
      "postgresql",
      "sql",
    ],
    projectIds: [
      "guarantor",
      "clouddeploy",
    ],
  },

  {
    id: "741210",
    name: "Grace Williams",
    initials: "GW",
    role: "Product Designer",
    organizationId: "pixelworks",
    bio: "Product designer focused on creating intuitive digital experiences.",
    skillIds: [
      "ui-ux",
      "product-management",
    ],
    projectIds: [
      "nova-commerce",
      "formflash",
    ],
  },

  {
    id: "741211",
    name: "Michael Chen",
    initials: "MC",
    role: "DevOps Engineer",
    organizationId: "nova-systems",
    bio: "DevOps engineer focused on infrastructure, deployment automation and reliability.",
    skillIds: [
      "devops",
      "nodejs",
    ],
    projectIds: [
      "clouddeploy",
    ],
  },

  {
    id: "741212",
    name: "David Johnson",
    initials: "DJ",
    role: "Product Manager",
    organizationId: "techflow",
    bio: "Product manager working across engineering and product teams to deliver digital products.",
    skillIds: [
      "product-management",
      "ui-ux",
    ],
    projectIds: [
      "techflow-platform",
      "analytics-hub",
    ],
  },

  {
    id: "741213",
    name: "Aisha Bello",
    initials: "AB",
    role: "Data Analyst",
    organizationId: "databridge",
    bio: "Data analyst focused on turning business data into useful insights.",
    skillIds: [
      "python",
      "sql",
      "data-engineering",
    ],
    projectIds: [
      "analytics-hub",
      "insightflow",
    ],
  },

  {
    id: "741214",
    name: "Tunde Ibrahim",
    initials: "TI",
    role: "Software Engineer",
    organizationId: "techflow",
    bio: "Software engineer working across frontend, backend and cloud infrastructure.",
    skillIds: [
      "typescript",
      "nodejs",
      "devops",
    ],
    projectIds: [
      "techflow-platform",
      "clouddeploy",
    ],
  },
];