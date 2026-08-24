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