import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

export interface AnimeParsedContent extends ParsedContent {
    kgs_layout: string;
    players: [
        {
            player: string;
            url: string;
        }
    ];
}
export interface AnimeEpisodePageData {
    previousEpisode?: AnimeParsedContent;
    currentEpisode?: AnimeParsedContent;
    nextEpisode?: AnimeParsedContent;
    episodeList: AnimeParsedContent[];
}

/**
 * Folder @/content/anime
 */
const ANIME_FOLDER = '/anime'

function buildAnimePath(serieId?: string, episodeId?: string) {
    if (!serieId) {
        return ANIME_FOLDER;
    }
    if (!episodeId) {
        return `${ANIME_FOLDER}/${serieId}`;
    }
    return `${ANIME_FOLDER}/${serieId}/${episodeId}`;
}

/**
 * Returns all episodes
 * @param serieId The anime ID
 */
export async function useAnimeSerie(serieId: string): Promise<AnimeParsedContent[]> {
    const serieUrl = buildAnimePath(serieId);
    const episodeList = await queryContent<AnimeParsedContent>(serieUrl)
        .only(["_id", "_path", "_dir", "title", "description", "kgs_layout", "players"])
        .where({
            kgs_layout: "anime_episode"
        })
        .find() as AnimeParsedContent[];
    return episodeList;
}

/**
 * Returns the current anime episode based on the route.
 * Assumes it is called on the following route : /anime/[serieId]/[episodeId]
 * Will throw 404 error when the page does not exists in the content directory
 */
export async function useAnimeEpisode(serieId: string, episodeId: string): Promise<AnimeEpisodePageData> {
    const allEpisodes = await useAnimeSerie(serieId);
    const currentPath = buildAnimePath(serieId, episodeId);
    const result: AnimeEpisodePageData = {
        episodeList: allEpisodes
    };
    for (const episode of allEpisodes) {
        if (result.currentEpisode) {
            result.nextEpisode = episode;
            break;
        }
        if (episode._path === currentPath) {
            result.currentEpisode = episode;
            continue;
        }
        result.previousEpisode = episode;
    }
    return result;
}