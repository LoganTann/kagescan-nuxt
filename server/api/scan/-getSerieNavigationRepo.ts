
import { serverQueryContent } from "#content/server";
import { H3Event, MANGA_FOLDER, MangaMetadata } from "../-types";

/**
 * Returns manga serie, volume and chapter files childrens to the provided serieId.
 * Sorting order is defined at {@link sortMangaChapters}
 * @param event H3 Server context
 * @param serieId The serie to fetch files from.
 */
export async function getSortedFoldersOfManga(event: H3Event, serieId: string): Promise<MangaMetadata[]> {
    const folder = new RegExp(`^${MANGA_FOLDER}/${serieId}`);
    const queryResult = await serverQueryContent(event)
        .without("body")
        .where(
            {
                kgs_layout: { $in: ['manga_serie', 'manga_volume', 'manga_chapter'] },
                _path: { $regex: folder }
            }
        )
        .find() as MangaMetadata[];

    const sorted = queryResult.sort(sortMangaChapters);
    return sorted;
}

/**
 * Sorts the chapters in the following order
 * - 6
 * - 7_newvolume
 * - 7
 * - 7.5
 * - 8
 * @param a first chapter id
 * @param b second chapter id
 */
function sortMangaChapters(fileA: MangaMetadata, fileB: MangaMetadata): number {
    const a = fileA._path!.split("/").at(-1)!;
    const b = fileB._path!.split("/").at(-1)!;

    const digitFollowedByDotOrUnderscore = /^(\d+)(.|_)?/;
    const defaultResponse = a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

    const resultA = a.match(digitFollowedByDotOrUnderscore);
    const resultB = b.match(digitFollowedByDotOrUnderscore);
    if (resultA === null || resultB === null) {
        return defaultResponse;
    }
    const [, numberA, followingA] = resultA;
    const [, numberB, followingB] = resultB;

    if ((followingA || followingB) && numberA === numberB) {
        // volumes (underscore) should always be first
        if (followingA === "_") {
            return -1;
        }
        // if there is a dot, do a numercial compare instead of string compare
        return parseFloat(a) - parseFloat(b);
    }
    return defaultResponse;
}