
import type { QueryObject } from "ufo";
import { MANGA_FOLDER, MAX_PARAM_LENGTH } from "../-types";
import * as fs from 'node:fs/promises';
import { MangaPage } from "./-getChapterPagesTypes";



export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const serieId = getStringIdParam(query, "serieId");
    const chapterId = getStringIdParam(query, "chapterId");

    const runtimeConfig = useRuntimeConfig();
    const basepath = `${MANGA_FOLDER}/${serieId}/${chapterId}`;
    let contents;
    try {
        const fsDir = new URL(`./content/${basepath}`, runtimeConfig.rootPath);
        contents = await fs.readdir(fsDir);
    } catch {
        throw createError({
            statusCode: 404,
            statusMessage: `Chapter ${chapterId} from ${serieId} does not exists`
        });
    }

    const imageFileExtensionRegex = /\.(png|webp|jpg|svg|jpeg|gif)$/;
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
    const images: MangaPage[] = contents
        .filter((name) => name.match(imageFileExtensionRegex))
        .sort(collator.compare)
        .map((name, i) => {
            return {
                src: `${basepath}/${name}`,
                id: `page-${i + 1}`
            }
        });
    return { images };
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
