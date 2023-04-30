
export async function buildSerieNavigation(allChapters: [any]) {
    const result = {
        serieName: "",
        volumes: [
            {
                name: "_default",
                id: "_default",
                coverArt: "",
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
                coverArt: chapter.cover,
                chapters: [],
            });
            continue;
        }
        const lastVolumeChapters = result.volumes.at(-1)!.chapters;
        lastVolumeChapters.push({
            name: chapter.title,
            id: chapter._id,
            path: chapter._path,
            cover: chapter.cover
        });
    }
    if (result.volumes.length > 1 && result.volumes[0].chapters.length == 0) {
        result.volumes = result.volumes.slice(1);
    }
    return result;
}
