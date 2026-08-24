import { cognodb } from "@/lib/db/cognodb";
import {
  members,
  organizations,
  projects,
  skills,
} from "@/lib/data/seed";

const memberRelationships = [
  {
    from: "741206",
    to: "741207",
    type: "WORKED_WITH",
  },
  {
    from: "741207",
    to: "741209",
    type: "WORKED_WITH",
  },
  {
    from: "741209",
    to: "741208",
    type: "COLLABORATED_WITH",
  },
  {
    from: "741205",
    to: "741213",
    type: "WORKED_WITH",
  },
  {
    from: "741213",
    to: "741212",
    type: "COLLABORATED_WITH",
  },
  {
    from: "741210",
    to: "741208",
    type: "WORKED_WITH",
  },
  {
    from: "741211",
    to: "741214",
    type: "WORKED_WITH",
  },
  {
    from: "741214",
    to: "741212",
    type: "WORKED_WITH",
  },
];

const skillRelationships = [
  {
    from: "react",
    to: "nextjs",
  },
  {
    from: "nextjs",
    to: "typescript",
  },
  {
    from: "nodejs",
    to: "typescript",
  },
  {
    from: "python",
    to: "data-engineering",
  },
  {
    from: "data-engineering",
    to: "data-architecture",
  },
  {
    from: "sql",
    to: "postgresql",
  },
  {
    from: "ui-ux",
    to: "product-management",
  },
];

async function seed() {
  const session = cognodb.session();

  try {
    console.log("Starting Kindred database seed...");

    // Organizations
    for (const organization of organizations) {
      await session.run(
        `
          MERGE (o:Organization {id: $id})
          SET
            o.name = $name,
            o.industry = $industry,
            o.location = $location
        `,
        organization
      );
    }

    console.log(`Seeded ${organizations.length} organizations`);

    // Skills
    for (const skill of skills) {
      await session.run(
        `
          MERGE (s:Skill {id: $id})
          SET
            s.name = $name,
            s.category = $category
        `,
        skill
      );
    }

    console.log(`Seeded ${skills.length} skills`);

    // Projects
    for (const project of projects) {
      await session.run(
        `
          MERGE (p:Project {id: $id})
          SET
            p.name = $name,
            p.description = $description,
            p.industry = $industry,
            p.url = $url
        `,
        project
      );
    }

    console.log(`Seeded ${projects.length} projects`);

    // Members
    for (const member of members) {
      await session.run(
        `
          MERGE (m:Member {id: $id})
          SET
            m.name = $name,
            m.initials = $initials,
            m.role = $role,
            m.bio = $bio
        `,
        member
      );
    }

    console.log(`Seeded ${members.length} members`);

    // Member -> Organization
    for (const member of members) {
      await session.run(
        `
          MATCH (m:Member {id: $memberId})
          MATCH (o:Organization {id: $organizationId})
          MERGE (m)-[:WORKED_FOR]->(o)
        `,
        {
          memberId: member.id,
          organizationId: member.organizationId,
        }
      );
    }

    // Member -> Skills
    for (const member of members) {
      for (const skillId of member.skillIds) {
        await session.run(
          `
            MATCH (m:Member {id: $memberId})
            MATCH (s:Skill {id: $skillId})
            MERGE (m)-[:HAS_SKILL]->(s)
          `,
          {
            memberId: member.id,
            skillId,
          }
        );
      }
    }

    // Member -> Projects
    for (const member of members) {
      for (const projectId of member.projectIds) {
        await session.run(
          `
            MATCH (m:Member {id: $memberId})
            MATCH (p:Project {id: $projectId})
            MERGE (m)-[:WORKED_ON]->(p)
          `,
          {
            memberId: member.id,
            projectId,
          }
        );
      }
    }

    console.log("Created member relationships");

    // Member -> Member
    for (const relationship of memberRelationships) {
      await session.run(
        `
          MATCH (a:Member {id: $from})
          MATCH (b:Member {id: $to})
          MERGE (a)-[:${relationship.type}]->(b)
        `,
        {
          from: relationship.from,
          to: relationship.to,
        }
      );
    }

    console.log("Created member-to-member relationships");

    // Skill -> Skill
    for (const relationship of skillRelationships) {
      await session.run(
        `
          MATCH (a:Skill {id: $from})
          MATCH (b:Skill {id: $to})
          MERGE (a)-[:RELATED_TO]->(b)
        `,
        {
          from: relationship.from,
          to: relationship.to,
        }
      );
    }

    console.log("Created skill relationships");

    console.log("Kindred database seeded successfully!");
  } catch (error) {
    console.error("Database seed failed:", error);
    process.exitCode = 1;
  } finally {
    await session.close();
    await cognodb.close();
  }
}

seed();