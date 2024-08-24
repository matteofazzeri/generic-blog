import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
    try {
        const result =
            await sql`ALTER TABLE 'posts'
                MODIFY 'description' TEXT NOT NULL;
`;
        return response.status(200).json({ result });
    } catch (error) {
        return response.status(500).json({ error });
    }
}

