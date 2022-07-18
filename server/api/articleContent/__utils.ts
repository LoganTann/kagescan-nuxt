import { IncomingMessage } from "h3";
import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";

export type JsonBody = Record<string, object>;
export type lang = "fr" | "en";
export interface novel_text {
    /**
     * If entered, will force update instead of adding a new entry
     */
    id?: number;
    innerHTML: string;
    sanitizedHTML: string;
    chapter_reference: number;
    lang?: lang; // default : fr
    created_at?: string;
}

export async function useJsonBody(event: IncomingMessage): Promise<JsonBody> {
    const body = await useBody(event);
    if (typeof body !== "object") {
        throw createError({
            statusCode: 400,
            message: "body must be JSON object",
        });
    }
    return body;
}

/**
 * Gets the article id from the request parameters and performs additional checks.
 * @param event The incoming message event. To get article id from the request.
 * @param client (optional) the supabase client. If absent, won't check the database if the article id exists.
 * @returns the normalized article id from request param.
 */
export async function validateExistingArticleId(
    event: IncomingMessage,
    client?: SupabaseClient
): Promise<number> {
    const articleId = Number(event.context.params.id ?? "invalid");
    if (!Number.isInteger(articleId)) {
        throw createError({
            statusCode: 400,
            message: "parameter [id] must be an integer",
        });
    }
    if (!client) {
        return articleId;
    }
    const results = await client
        .from("novel_chapters")
        .select("id")
        .eq("id", articleId)
        .limit(1);
    if (!results.data || results.data.length === 0) {
        throw createError({
            statusCode: 404,
            message:
                "The article you requested does not exists in the database",
        });
    }
    return articleId;
}

export function validateInnerHTML(
    body: JsonBody
): Omit<novel_text, "chapter_reference"> {
    if (typeof body.innerHTML !== "string") {
        throw createError({
            statusCode: 400,
            message: "Missing 'innerHTML' property in request body",
        });
    }
    const innerHTML = body.innerHTML;
    // todo : sanitize HTML
    const sanitizedHTML = innerHTML;
    return { innerHTML, sanitizedHTML };
}

export async function getArticle(
    client: SupabaseClient,
    chapterId: number,
    lang: lang = "fr"
): Promise<object[]> {
    const results = await client
        .from("novel_text")
        .select(
            'text_id__c:id, "sanitizedHTML", lang, updated_at__c:created_at, '.concat(
                "novel_chapters!inner(id, parent, created_at, filename, path, title)"
            )
        )
        .eq("novel_chapters.id", chapterId)
        //.eq("lang", lang)
        .order("created_at", { ascending: false })
        .limit(1);
    if (results.error) {
        throw createError({
            statusCode: 500,
            message: "Error fetching your article : ".concat(
                results.error.message
            ),
        });
    }
    if (results.data.length === 0) {
        throw createError({
            statusCode: 500,
            message: `Article with id=${chapterId} don't seems to exists`,
        });
    }
    return results.data;
}

export async function addTextToHistory(
    client: SupabaseClient,
    toInsert: novel_text,
    historyId?: number
): Promise<PostgrestResponse<any>> {
    let result: PostgrestResponse<any> | null = null;
    if (historyId) {
        result = await client
            .from("novel_text")
            .update(toInsert)
            .eq("id", historyId);
    } else {
        result = await client.from("novel_text").insert([toInsert]);
    }

    if (!result || result.error) {
        const errorMessage = result?.error?.message ?? "unknown error";
        if (errorMessage.includes("violates foreign key constraint")) {
            throw createError({
                statusCode: 400,
                message: "The article you are trying to edit does not exists",
            });
        }

        throw createError({
            statusCode: 500,
            message:
                "Error saving article (this error should never occurs) : ".concat(
                    result.error.message
                ),
        });
    }
    return result;
}
