import { cognodb } from "../db/cognodb";

export interface NetworkMember {
    id: string;
    name: string;
    initials: string;
    role: string;
    bio: string;
    degree: number;
}

export interface NetworkPathMember {
    id: string;
    name: string;
    initials: string;
    role: string;
}

export interface NetworkResult {
    memberId: string;
    network: NetworkMember[];
    paths: Record<string, NetworkPathMember[]>;
}

export async function getMemberNetwork(
    memberId: string,
    maxDegree: number = 3
): Promise<NetworkResult> {
    const session = cognodb.session();

    try {
        const result = await session.run(
            `
            MATCH path =
                (start:Member {id: $memberId})
                -[*1..3]-
                (member:Member)

            WHERE member.id <> start.id
              AND length(path) <= $maxDegree

            RETURN
                member.id AS id,
                member.name AS name,
                member.initials AS initials,
                member.role AS role,
                member.bio AS bio,
                length(path) AS degree,
                [node IN nodes(path) | {
                    id: node.id,
                    name: node.name,
                    initials: node.initials,
                    role: node.role
                }] AS path

            ORDER BY degree ASC
            `,
            {
                memberId,
                maxDegree,
            }
        );

        const networkMap = new Map<string, NetworkMember>();
        const paths: Record<string, NetworkPathMember[]> = {};

        for (const record of result.records) {
            const id = record.get("id") as string;
            const rawDegree = record.get("degree");

            const degree =
                typeof rawDegree === "number"
                    ? rawDegree
                    : rawDegree.toNumber();

            const member: NetworkMember = {
                id,
                name: record.get("name"),
                initials: record.get("initials"),
                role: record.get("role"),
                bio: record.get("bio"),
                degree,
            };

            const existing = networkMap.get(id);

            if (!existing || degree < existing.degree) {
                networkMap.set(id, member);
                paths[id] = record.get("path");
            }
        }

        return {
            memberId,
            network: Array.from(networkMap.values()),
            paths,
        };
    } finally {
        await session.close();
    }
}