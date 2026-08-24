import { members } from "@/app/data/member";
import { skills } from "@/app/data/skill";

export function getMemberSkills(memberId: string) {
  const member = members.find((member) => member.id === memberId);

  if (!member) return [];

  return skills.filter((skill) =>
    member.skillIds.includes(skill.id)
  );
}