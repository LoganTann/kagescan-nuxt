
export type NovelVolumeApiResponse = {
    request: {
        serieId: string,
        volumeId: string
    },
    serieName: string,
    previousVolume: NovelVolumeNode | null,
    currentVolume: NovelVolumeNode,
    nextVolume: NovelVolumeNode | null,
    chapters: NovelChapterNode[]
}

export type NovelVolumeNode = {
    id: string,
    path: string,
    title: string,
    cover: string
};

export type NovelChapterNode = {
    id: string,
    path: string,
    title: string
};


