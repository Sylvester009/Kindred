import neo4j, { Driver } from "neo4j-driver";

const uri = process.env.COGNODB_URI;
const username = process.env.COGNODB_USERNAME;
const password = process.env.COGNODB_PASSWORD;

if (!uri || !username || !password) {
    throw new Error(
        "Missing CognoDB environment variables. Check COGNODB_URI, COGNODB_USERNAME and COGNODB_PASSWORD."
    );
}

const globalForNeo4j = globalThis as unknown as {
    cognodbDriver?: Driver;
};

export const cognodb =
    globalForNeo4j.cognodbDriver ??
    neo4j.driver(uri, neo4j.auth.basic(username, password));

if (process.env.NODE_ENV !== "production") {
    globalForNeo4j.cognodbDriver = cognodb;
}