# Kindred

Kindred is a graph-powered professional networking application that helps users discover people within their professional network and understand how they are connected.

Instead of treating professional connections as isolated records, Kindred models people, organizations, projects, and skills as interconnected entities in a graph.

The core feature allows a user to explore their network up to three degrees of separation and see the relationship path connecting them to another person.

## Live Demo

https://kindred-orcin-nine.vercel.app/

## Repository

https://github.com/Sylvester009/Kindred

## Screenshots

### Member Profile
<img width="1302" height="691" alt="kindred-profile" src="https://github.com/user-attachments/assets/2437cd36-28ba-40e1-8402-46b52f37e172" />

### Member Network
<img width="1306" height="695" alt="kndred-network" src="https://github.com/user-attachments/assets/23cea99d-695d-4393-91c0-832a18b26e89" />


## Screen Recording



---

## Overview

Professional relationships are naturally interconnected.

A person may:

- Work with another person
- Work for an organization
- Work on a project
- Have particular skills
- Share skills or professional relationships with other people

These relationships create a network rather than a simple list of users.

Kindred uses this network structure to answer questions such as:

> "Who is connected to me within three degrees of my professional network?"

For example:

```text
You
 │
 └── Daniel
       │
       └── Chinedu
             │
             └── Sarah

```

## Why a Graph Database?

Kindred's primary problem is relationship traversal.

A relational database could represent members, projects, organizations, skills, and relationships using multiple tables and join tables. However, discovering paths across several levels of relationships would require increasingly complex joins as the traversal depth grows.

A graph database represents these relationships directly.

For example:
```text

(Member)-[:WORKED_WITH]->(Member)
(Member)-[:WORKED_ON]->(Project)
(Member)-[:WORKED_FOR]->(Organization)
(Member)-[:HAS_SKILL]->(Skill)
```

This makes multi-hop traversal a natural operation.

Kindred's network feature uses graph traversal to discover members between one and three degrees away from a selected member and returns the path connecting them.

This is one of the main reasons a graph database is appropriate for the application.


## Graph Data Model

The main entities in Kindred are:

Member
Organization
Project
Skill

Members are connected to these entities through relationships representing their professional context.

A simplified representation is:
``` Text

                    ┌─────────────┐
                    │    Skill    │
                    └──────▲──────┘
                           │
                       HAS_SKILL
                           │
                           │
┌──────────┐           ┌───┴────┐
│  Member  │──────────►│ Member │
└────┬─────┘ WORKED_WITH└───┬────┘
     │                      │
     │                      │
WORKED_FOR              WORKED_ON
     │                      │
     ▼                      ▼
┌──────────────┐      ┌───────────┐
│ Organization │      │  Project  │
└──────────────┘      └───────────┘

```

The graph allows relationships to be traversed rather than reconstructed through multiple relational joins.


# Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/Sylvester009/kindred.git
cd kindred
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

Create a `.env.local` file in the root of the project:

```env
COGNODB_URI=your_cognodb_uri
COGNODB_USERNAME=your_cognodb_username
COGNODB_PASSWORD=your_cognodb_password
```

## 4. Set up the database

Run:

```bash
npm run db:setup
```

This prepares the required graph database structure.

## 5. Seed the database

Run the project's seed command:

```bash
npm run db:seed
```

The seed data creates members, organizations, projects, skills, and their relationships.

## 6. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

# Network API

The main network endpoint is:

```http
GET /api/members/[id]/network
```

The endpoint accepts an optional `degree` query parameter to control the maximum network depth.

### First-degree network

```http
GET /api/members/[id]/network?degree=1
```

### Second-degree network

```http
GET /api/members/[id]/network?degree=2
```

### Third-degree network

```http
GET /api/members/[id]/network?degree=3
```

If no `degree` is supplied, the application uses the default network depth.

The API validates the requested degree and limits graph traversal to the supported range.

---

# Query Explanation

The core network operation uses a multi-hop Cypher traversal.

A simplified representation is:

```cypher
MATCH path =
  (start:Member {id: $memberId})
  -[*1..3]-
  (member:Member)

WHERE member.id <> start.id
  AND length(path) <= $maxDegree

RETURN
  member.id AS id,
  member.name AS name,
  length(path) AS degree,
  nodes(path) AS path
ORDER BY degree ASC
```

The query:

1. Starts from the selected member.
2. Traverses relationships up to three hops.
3. Excludes the starting member.
4. Restricts traversal to the requested degree.
5. Returns each discovered member.
6. Returns the member's degree of separation.
7. Returns the nodes that make up the connection path.

The query uses parameters rather than directly interpolating user input into the Cypher query, helping prevent query injection and keeping the traversal controlled.
