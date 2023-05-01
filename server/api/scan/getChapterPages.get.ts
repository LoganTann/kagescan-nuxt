
import type { QueryObject } from "ufo";
import { MANGA_FOLDER, MAX_PARAM_LENGTH } from "../-types";
import * as fs from 'node:fs/promises';

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const serieId = getStringIdParam(query, "serieId");
    const chapterId = getStringIdParam(query, "chapterId");
    
    const runtimeConfig = useRuntimeConfig();
    const dir = new URL(`./content/${MANGA_FOLDER}/${serieId}/${chapterId}`, runtimeConfig.rootPath);
    const contents = await fs.readdir(dir);

    return { contents };
});

function getStringIdParam(query: QueryObject, parameterName: string): string {
    const result = query[parameterName];
    const validationRegex = /^[A-Za-z0-9_-]+$/;
    if (typeof result !== "string" || result.length > MAX_PARAM_LENGTH || !result.match(validationRegex)) {
        throw createError({
            statusCode: 400,
            statusMessage: `Parameter ${parameterName} is unset or not valid`
        });
    }
    return result;
}
