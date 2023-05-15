import { MangaMetadata } from "../-types";
import { MangaVolumeApiResponse } from "./-getSerieNavigationTypes";

/**
 * Structures the provided files for a use in the manga section
 * @param allChapters Array of files metadata to process
 */
export async function buildSerieNavigation(allChapters: MangaMetadata[]): Promise<MangaVolumeApiResponse> {
    const result: MangaVolumeApiResponse = {
        serieName: "",
        volumes: [
            {
                name: "",
                id: "_default",
                cover: "",
                chapters: [],
            }
        ]
    }

    for (const chapter of allChapters) {
        if (chapter.kgs_layout == "manga_serie") {
            result.serieName = chapter.title;
            continue;
        }
        if (chapter.kgs_layout == "manga_volume") {
            result.volumes.push({
                name: chapter.title,
                id: chapter.volumeId,
                cover: chapter.cover,
                chapters: [],
            });
            continue;
        }
        if (chapter.kgs_layout == "manga_chapter") {
            const lastVolumeChapters = result.volumes.at(-1)!.chapters;
            lastVolumeChapters.push({
                name: chapter.title,
                id: chapter._id,
                path: chapter._path,
                cover: chapter.cover ?? ""
            });
        }
    }
    // removes the default section if empty
    if (result.volumes.length > 1 && result.volumes[0].chapters.length == 0) {
        result.volumes = result.volumes.slice(1);
    }
    return result;
}
