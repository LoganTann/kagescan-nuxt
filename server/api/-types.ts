import { ParsedContentMeta } from "@nuxt/content/dist/runtime/types";
export { H3Event } from "h3";


/**
 * Folder @/content/novel
 */
export const NOVEL_FOLDER = '/novel';

/**
 * Folder @/content/scan
 */
export const MANGA_FOLDER = '/scan'

interface ParsedContentMetaMd extends ParsedContentMeta {
    _id: string,
    _path: string,
    title: string,
}

export interface NovelSerieMetadata extends ParsedContentMetaMd {
    kgs_layout: "novel_serie",
}
export interface NovelVolumeMetadata extends ParsedContentMetaMd {
    kgs_layout: "novel_volume",
    cover: string
}
export interface NovelChapterMetadata extends ParsedContentMetaMd {
    kgs_layout: "novel_chapter",
}
export type NovelMetadata = NovelChapterMetadata | NovelVolumeMetadata | NovelSerieMetadata;


export interface MangaSerieMetadata extends ParsedContentMetaMd {
    kgs_layout: "manga_serie",
    description: string
}
export interface MangaVolumeMetadata extends ParsedContentMetaMd {
    kgs_layout: "manga_volume",
    volumeId: string,
    cover: string
}
export interface MangaChapterMetadata extends ParsedContentMetaMd {
    kgs_layout: "manga_chapter",
    cover?: string
}
export type MangaMetadata = MangaChapterMetadata | MangaVolumeMetadata | MangaSerieMetadata;