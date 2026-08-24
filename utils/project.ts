import { projects } from "@/app/data/project";

export function getMemberProjects(projectIds: string[]) {
  return projects.filter((project) =>
    projectIds.includes(project.id)
  );
}