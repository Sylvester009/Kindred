import { cognodb } from "@/lib/db/cognodb";

const constraints = [
    `
    CREATE CONSTRAINT person_id_unique IF NOT EXISTS
    FOR (p:Person)
    REQUIRE p.id IS UNIQUE
  `,
    `
    CREATE CONSTRAINT skill_id_unique IF NOT EXISTS
    FOR (s:Skill)
    REQUIRE s.id IS UNIQUE
  `,
    `
    CREATE CONSTRAINT project_id_unique IF NOT EXISTS
    FOR (p:Project)
    REQUIRE p.id IS UNIQUE
  `,
    `
    CREATE CONSTRAINT organization_id_unique IF NOT EXISTS
    FOR (o:Organization)
    REQUIRE o.id IS UNIQUE
  `,
];

async function setup() {
    const session = cognodb.session();

    try {
        for (const query of constraints) {
            await session.run(query);
        }

        console.log("Kindred graph constraints created successfully.");
    } finally {
        await session.close();
        await cognodb.close();
    }
}

setup().catch((error) => {
    console.error("Database setup failed:", error);
    process.exit(1);
});