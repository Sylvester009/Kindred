import { projects } from "@/lib/data/seed";

export function getMemberProjects(projectIds: string[]) {
  return projects.filter((project) =>
    projectIds.includes(project.id)
  );
}