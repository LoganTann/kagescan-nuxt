
import { serverQueryContent } from "#content/server";
import { ParsedContentMeta } from "@nuxt/content/dist/runtime/types";
import { H3Event } from "h3";

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

/**
 * Given a serie + volume Id, returns : 
 * - the current serie name
 * - the current volume (id, title, cover, path)
 * - the list of chapters in the current volume (id, path, title)
 * - the previous volume's id, title, cover and path (if exists)
 * - the next volume's id, title, cover and path (if exists)
 */
export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const { serieId, volumeId } = query;

    if (!(typeof serieId === "string" && typeof volumeId === "string")) {
        throw createError({
            statusCode: 400,
            statusMessage: 'One of the following query parameters is unset or not valid : serieId, volumeId',
        })
    }
    const novelPath = buildNovelRegex(serieId);
    const volumePath = buildNovelRegex(serieId, volumeId);
    const files = await fetchFilesForCurrentVolume(event, novelPath, volumePath);

    const response: NovelVolumeApiResponse = {
        request: {
            serieId,
            volumeId
        },
        serieName: "",
        previousVolume: null,
        currentVolume: buildVolumeNode(null),
        nextVolume: null,
        chapters: []
    };

    for (const file of files) {
        if (file.kgs_layout == "novel_serie") {
            response.serieName = file.title;
            continue;
        }
        if (file.kgs_layout == 'novel_chapter') {
            const currentNode = buildChapterNode(file);
            response.chapters.push(currentNode);
            continue;
        }
        if (file.kgs_layout == "novel_volume" && !response.nextVolume) {
            const currentNode = buildVolumeNode(file);
            if (response.currentVolume.id !== "") {
                response.nextVolume = currentNode;
                continue;
            }
            if (file._path.match(volumePath)) {
                response.currentVolume = currentNode;
                continue;
            }
            response.previousVolume = currentNode;
        }
    }

    if (response.serieName === '') {
        throw createError({
            statusCode: 404,
            statusMessage: `Serie [${serieId}] does not exists`,
        });
    }
    if (response.currentVolume.id === '') {
        throw createError({
            statusCode: 404,
            statusMessage: `Volume [${volumeId}] from the serie [${serieId}] does not exists`,
        });
    }

    return response;
})

/**
 * Fetches the following metadata objects :
 * - The serie linked to the specified novel path
 * - All volumes of the specified novel path
 * - Chapters that belongs to the specified volume path
 * @param event H3 server context
 * @param volumePath Regex to test if path is located in the targeted volume
 * @param novelPath Regex to test if path is located in the targeted novel serie
 */
function fetchFilesForCurrentVolume(event: H3Event, novelPath: RegExp, volumePath: RegExp) {
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

/**
 * Folder @/content/novel
 */
const NOVEL_FOLDER = '/novel';
function buildNovelPath(serieId?: string, volumeId?: string) {
    if (!serieId) {
        return NOVEL_FOLDER;
    }
    if (!volumeId) {
        return `${NOVEL_FOLDER}/${serieId}`;
    }
    return `${NOVEL_FOLDER}/${serieId}/${volumeId}`;
}

function buildNovelRegex(serieId?: string, volumeId?: string) {
    const path = buildNovelPath(serieId, volumeId);
    return new RegExp('^'.concat(path));
}

interface ParsedContentMetaMd extends ParsedContentMeta {
    _id: string,
    _path: string,
    title: string,
}
export interface NovelVolumeMetadata extends ParsedContentMetaMd {
    kgs_layout: "novel_volume",
    cover: string
}
export interface NovelChapterMetadata extends ParsedContentMetaMd {
    kgs_layout: "novel_chapter",
}
export interface NovelSerieMetadata extends ParsedContentMetaMd {
    kgs_layout: "novel_serie",
}
export type NovelMetadata = NovelChapterMetadata | NovelVolumeMetadata | NovelSerieMetadata;

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

function buildChapterNode(file: NovelChapterMetadata): NovelChapterNode {
    return {
        id: file._id,
        path: file._path,
        title: file.title
    };
}
function buildVolumeNode(file: NovelVolumeMetadata | null): NovelVolumeNode {
    if (!file) {
        return {
            id: "",
            path: "",
            title: "",
            cover: ""
        }
    }
    return {
        id: file._id,
        path: file._path,
        title: file.title,
        cover: file.cover
    };
}