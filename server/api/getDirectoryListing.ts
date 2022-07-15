import { defineHandler, IncomingMessage } from "h3";
import { serverSupabaseServiceRole } from "#supabase/server";

interface basicFileData {
    id: number;
    title: string;
    parent: number | null;
    dirIndex: number;
}

export default defineHandler(async (event: IncomingMessage) => {
    // TODO : enforce security using user's token
    const client = serverSupabaseServiceRole(event);
    const { data } = await client.from("novel_chapters").select();
    for (const row of data) {
        if (typeof row.parent !== "number") {
            row.parent = -1;
        }
    }
    return { novel_chapters: data };
});
