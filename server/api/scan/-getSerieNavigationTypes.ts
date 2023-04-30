
export type MangaVolumeApiResponse = {
    serieName: string,
    volumes: MangaVolumeNode[],
}
export type MangaVolumeNode = {
    name: string,
    id: string,
    cover: string,
    chapters: MangaChapterNode[]
}
export type MangaChapterNode = {
    name: string,
    id: string,
    cover: string,
    path: string
}