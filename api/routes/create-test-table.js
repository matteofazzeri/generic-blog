import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
    try {
        const result =
            await sql`-- Alter the 'posts' table to allow NULL values in the 'img' column
ALTER TABLE posts
ALTER COLUMN img DROP NOT NULL;

`;
        return response.status(200).json({ result });
    } catch (error) {
        return response.status(500).json({ error });
    }
}