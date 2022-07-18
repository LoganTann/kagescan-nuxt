import { defineHandler, IncomingMessage } from "h3";
import { serverSupabaseServiceRole } from "#supabase/server";

import { getArticle, lang, validateExistingArticleId } from "./__utils";

export interface articleContentGetReponse {
    lang: lang;
    text_id__c: number;
    updated_at__c: string;
    sanitizedHTML: string;
    novel_chapters: {
        created_at: string;
        filename: string;
        id: number;
        parent_id: number;
        path: string;
        title: string;
    };
}

export default defineHandler(
    async (event: IncomingMessage): Promise<articleContentGetReponse> => {
        const client = serverSupabaseServiceRole(event);
        const chapterId = await validateExistingArticleId(event);
        const data = await getArticle(client, chapterId);
        const simplifiedResult = validateDataForGetArticle(data);
        return simplifiedResult;
    }
);

function validateDataForGetArticle(data: any[]): articleContentGetReponse {
    const firstRow = data.at(0) ?? {};
    if (typeof firstRow.novel_chapters?.id !== "number") {
        throw createError({
            statusCode: 404,
            message:
                "No article content matching the requested article Id : " +
                JSON.stringify(data),
        });
    }
    if (typeof firstRow.sanitizedHTML !== "string") {
        throw createError({
            statusCode: 500,
            message:
                "Missing parameter sanitizedHTML in the resquested field (this error should never occur)",
        });
    }
    return firstRow;
}
