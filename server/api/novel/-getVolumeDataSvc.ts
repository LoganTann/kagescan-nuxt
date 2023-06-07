import type { NovelChapterMetadata, NovelVolumeMetadata } from "../-types";
import type { NovelChapterNode, NovelVolumeApiResponse, NovelVolumeNode } from "./-getVolumeDataTypes";
import type { H3Event } from "h3";
import { NOVEL_FOLDER } from "../-types";
import * as repo from "./-getVolumeDataRepo";


/**
 * Given a serie + volume Id, returns : 
 * - the current serie name
 * - the current volume (id, title, cover, path)
 * - the list of chapters in the current volume (id, path, title)
 * - the previous volume's id, title, cover and path (if exists)
 * - the next volume's id, title, cover and path (if exists)
 * @param event H3 Server context
 * @param serieId The novel serie folder name 
 * @param volumeId The novel volume folder name
 */
export async function getVolumeData(event: H3Event, serieId: string, volumeId: string): Promise<NovelVolumeApiResponse> {
    const novelPath = buildNovelRegex(serieId);
    const volumePath = buildNovelRegex(serieId, volumeId);
    const files = await repo.fetchFilesForCurrentVolume(event, novelPath, volumePath);

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
        if (file.kgs_layout === "novel_serie") {
            response.serieName = file.title;
            continue;
        }
        if (file.kgs_layout === 'novel_chapter') {
            const currentNode = buildChapterNode(file);
            response.chapters.push(currentNode);
            continue;
        }
        if (file.kgs_layout === "novel_volume" && !response.nextVolume) {
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
    return response;
}


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