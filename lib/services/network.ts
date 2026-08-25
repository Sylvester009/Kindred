import { cognodb } from "@/lib/db/cognodb";

export interface NetworkMember {
    id: string;
    name: string;
    initials: string;
    role: string;
    bio: string;
    degree: number;
}

export interface MemberNetwork {
    member: {
        id: string;
        name: string;
    };
    degree: number;
    network: NetworkMember[];
}

export async function getMemberNetwork(
    memberId: string,
    maxDegree: number
): Promise<MemberNetwork> {
    const session = cognodb.session();

    try {
        const result = await session.run(
            `
            MATCH (start:Member {id: $memberId})

            OPTIONAL MATCH path =
            (start)-[*1..3]-(connected:Member)

            WHERE connected IS NOT NULL
            AND connected.id <> start.id

            WITH
            start,
            connected,
            min(length(path)) AS degree

            WHERE connected IS NULL OR degree <= $maxDegree

            RETURN
            start.id AS memberId,
            start.name AS memberName,
            connected.id AS id,
            connected.name AS name,
            connected.initials AS initials,
            connected.role AS role,
            connected.bio AS bio,
            degree

            ORDER BY degree, name
        `,
            {
                memberId,
                maxDegree,
            }
        );

        const memberResult = await session.run(
            `
            MATCH (m:Member {id: $memberId})
            RETURN
            m.id AS id,
            m.name AS name
            `,
            {
                memberId,
            }
        );

        if (memberResult.records.length === 0) {
            throw new Error("Member not found");
        }

        const network: NetworkMember[] = result.records.map((record) => ({
            id: record.get("id"),
            name: record.get("name"),
            initials: record.get("initials"),
            role: record.get("role"),
            bio: record.get("bio"),
            degree: record.get("degree").toNumber(),
        }));

        const firstRecord = result.records[0];

        return {
            member: {
                id: memberId,
                name: firstRecord?.get("memberName") ?? "",
            },
            degree: maxDegree,
            network,
        };
    } finally {
        await session.close();
    }
}
