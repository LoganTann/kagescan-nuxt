
import type { QueryObject } from "ufo";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const serieId = getStringIdParam(query, "serieId");
    const chapterId = getStringIdParam(query, "chapterId");

    return { serieId, chapterId };
});

function getStringIdParam(query: QueryObject, parameterName: string): string {
    const result = query[parameterName];
    const errorInvalidParam = createError({
        statusCode: 400,
        statusMessage: `Parameter ${parameterName} is unset or not valid`
    });
    if (typeof result !== "string") {
        throw errorInvalidParam;
    }
    if (result.length > 35) {
        throw errorInvalidParam;
    }
    const validationRegex = /^[A-Za-z09_-]+$/;
    if (!result.match(validationRegex)) {
        throw errorInvalidParam;
    }
    return result;
}
