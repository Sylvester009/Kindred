import { members, skills } from "@/lib/data/seed";

export function getMemberSkills(memberId: string) {
  const member = members.find((member) => member.id === memberId);

  if (!member) return [];

  return skills.filter((skill) =>
    member.skillIds.includes(skill.id)
  );
}