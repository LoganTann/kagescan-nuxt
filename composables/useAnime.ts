import type { ParsedContent, ParsedContentMeta } from "@nuxt/content/dist/runtime/types";

/**
 * Returns all the data needed for an anime episode page (route : /anime/[serieId]/[episodeId])
 * Error not handled at the moment
 * @param serieId the nuxt content folder name that contains the serie
 * @param episodeId the nuxt content file name of the episode
 * @return array having the episode content in {episodeData} and the serie metadata with episode list in {serieData}
 */
export function useAnimeData(serieId: string, episodeId?: string) {
    const episodeData = ref<AnimeEpisodeMetadataWithBody>();
    const serieData = ref<AnimeSerieWithEpisodeList>();

    fetchAnimeSerie(serieId)
        .then((data) => serieData.value = data);
    if (episodeId) {
        fetchAnimeEpisode(serieId, episodeId)
            .then((data) => episodeData.value = data);
        useContentHead(episodeData as Ref<ParsedContent>);
    }

    return { episodeData, serieData };
}

export type AnimeEpisodeAndSerieData = ReturnType<typeof useAnimeData>;

export interface AnimeSerieMetadata extends ParsedContentMeta {
    kgs_layout: "anime_page",
    title: string,
    subtitle: string,
    poster: string,
    description: string,
}
export interface AnimeEpisodeMetadata extends ParsedContentMeta {
    kgs_layout: "anime_episode",
    title: string,
    description: string,
    thumb: string,
    players: [
        {
            player: string,
            url: string
        }
    ],
};

export interface AnimeSerieWithEpisodeList {
    title: string
    subtitle: string
    poster: string
    videos: AnimeSerieVideoNode[]
}
export interface AnimeSerieVideoNode {
    path: string;
    title: string;
    subtitle: string;
    thumb: string;
}

function isAnimeEpisodeMeta(entry: AnimeEpisodeMetadata | AnimeSerieMetadata): entry is AnimeSerieMetadata {
    return entry.kgs_layout === "anime_page";
}
type AnimeEpisodeOrSerieArray = Array<AnimeEpisodeMetadata | AnimeSerieMetadata>;


/**
 * Folder @/content/anime
 */
const ANIME_FOLDER = '/anime';

function buildAnimePath(serieId?: string, episodeId?: string) {
    if (!serieId) {
        return ANIME_FOLDER;
    }
    if (!episodeId) {
        return `${ANIME_FOLDER}/${serieId}`;
    }
    return `${ANIME_FOLDER}/${serieId}/${episodeId}`;
}

async function fetchAnimeSerie(serieId: string): Promise<AnimeSerieWithEpisodeList> {
    const serieUrl = buildAnimePath(serieId);
    const episodeAndSerie: AnimeEpisodeOrSerieArray =
        await queryContent<AnimeEpisodeMetadata | AnimeSerieMetadata>(serieUrl)
            .without("body")
            .where({
                kgs_layout: {
                    $in: ['anime_episode', 'anime_page']
                }
            })
            .find() as AnimeEpisodeOrSerieArray;

    const serie: AnimeSerieWithEpisodeList = {
        title: "",
        subtitle: "",
        poster: "",
        videos: []
    };

    for (const episode of episodeAndSerie) {
        if (isAnimeEpisodeMeta(episode)) {
            serie.title = episode.title;
            serie.poster = episode.poster;
            serie.subtitle = episode.subtitle;
        } else {
            const video: AnimeSerieVideoNode = {
                path: episode._path as string,
                title: episode.title,
                subtitle: "",
                thumb: episode.thumb,
            }
            serie.videos.push(video);
        }
    }

    return serie;
}

async function fetchAnimeEpisode(serieId: string, episodeId: string): Promise<AnimeEpisodeMetadataWithBody> {
    const serieUrl = buildAnimePath(serieId, episodeId);
    const episodeAndSerie = await queryContent<AnimeEpisodeMetadataWithBody>(serieUrl).findOne();
    return episodeAndSerie;
}

export type AnimeEpisodeMetadataWithBody = AnimeEpisodeMetadata & ParsedContent;