import { defineHandler, IncomingMessage } from "h3";
import { serverSupabaseServiceRole } from "#supabase/server";

export interface basicFileData {
    id: number;
    title: string;
    filename: string;
    parent: number | null;
    dirIndex: number;
    hasChilds?: true;
}

export default defineHandler(async (event: IncomingMessage) => {
    // TODO : enforce security using user's token
    const client = serverSupabaseServiceRole(event);
    const query = await client.from("novel_chapters").select();
    const data: basicFileData[] = query.data;

    const filesWithChilds: Set<Number> = new Set();
    for (const row of data) {
        if (typeof row.parent !== "number") {
            row.parent = -1;
        }
        filesWithChilds.add(row.parent);
    }
    for (const row of data) {
        if (filesWithChilds.has(row.id)) {
            row.hasChilds = true;
        }
    }

    const novel_chapters: basicFileData[] = data;
    return { novel_chapters };
});
