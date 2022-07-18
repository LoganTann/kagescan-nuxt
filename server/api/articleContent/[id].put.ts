import { defineHandler, IncomingMessage } from "h3";
import { serverSupabaseServiceRole } from "#supabase/server";
import {
    addTextToHistory,
    useJsonBody,
    validateExistingArticleId,
    validateInnerHTML,
    novel_text,
} from "./__utils";
export default defineHandler(async (event: IncomingMessage) => {
    const client = serverSupabaseServiceRole(event);
    const body = await useJsonBody(event);
    const articleId = await validateExistingArticleId(event);
    const processedHTMLs = validateInnerHTML(body);
    const historyId = Number.isInteger(Number(body.id))
        ? Number(body.id)
        : undefined;
    const toInsert: novel_text = {
        ...processedHTMLs,
        chapter_reference: articleId,
    };
    const { data } = await addTextToHistory(client, toInsert, historyId);
    const dataHistoryId = data.at(0)?.id ?? "-unknown id-";
    return {
        status: "success",
        message: `Updated article ${articleId} using history id ${dataHistoryId}`,
    };
});
