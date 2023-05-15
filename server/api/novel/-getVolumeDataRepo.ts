import { serverQueryContent } from "#content/server";
import { H3Event } from "h3";
import { NovelMetadata } from "../-types";

/**
 * Fetches the following metadata objects :
 * - The serie linked to the specified novel path
 * - All volumes of the specified novel path
 * - Chapters that belongs to the specified volume path
 * @param event H3 server context
 * @param volumePath Regex to test if path is located in the targeted volume
 * @param novelPath Regex to test if path is located in the targeted novel serie
 */
export function fetchFilesForCurrentVolume(event: H3Event, novelPath: RegExp, volumePath: RegExp) {
    return serverQueryContent(event)
        .without("body")
        .where({
            $or: [
                {
                    kgs_layout: { $eq: 'novel_chapter' },
                    _path: { $regex: volumePath }
                },
                {
                    kgs_layout: { $eq: 'novel_volume' },
                    _path: { $regex: novelPath }
                },
                {
                    kgs_layout: { $eq: 'novel_serie' },
                    _path: { $regex: novelPath }
                },
            ]
        })
        .find() as Promise<NovelMetadata[]>;
}