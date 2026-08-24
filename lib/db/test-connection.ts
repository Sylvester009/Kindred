import { cognodb } from "./cognodb";

export async function testCognoDBConnection() {
    const session = cognodb.session();

    try {
        const result = await session.run(
            "RETURN 'Kindred → CognoDB connection successful' AS message"
        );

        return result.records[0]?.get("message");
    } finally {
        await session.close();
    }
}