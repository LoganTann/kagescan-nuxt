
import { H3Event } from "h3";
import { serverQueryContent } from "#content/server";

const MANGA_FOLDER = '/scan'

export async function getSortedFoldersOfManga(event: H3Event, serieId: string) {
    const folder = new RegExp(`^${MANGA_FOLDER}/${serieId}`);
    const queryResult = await serverQueryContent(event)
        .without("body")
        .where(
            {
                kgs_layout: { $in: ['manga_serie', 'manga_volume', 'manga_chapter'] },
                _path: { $regex: folder }
            }
        )
        .find()

    const sorted = queryResult.sort((a, b) => {
        const fileA = a._path!.split("/").at(-1)!;
        const fileB = b._path!.split("/").at(-1)!;
        return sortChapterAgain(fileA, fileB);
    });
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
function sortChapterAgain(a: string, b: string): number {
    const digitFollowedByDotOrUnderscore = /^(\d+)(.|_)?/;
    const defaultResponse = a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

    const resultA = a.match(digitFollowedByDotOrUnderscore);
    const resultB = b.match(digitFollowedByDotOrUnderscore);
    if (resultA == null || resultB == null) {
        return defaultResponse;
    }
    const [_matchA, numberA, followingA] = resultA;
    const [_matchB, numberB, followingB] = resultB;

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