import * as repo from "./-getSerieNavigationRepo";
import * as service from "./-getSerieNavigationSvc";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const { serieId } = query;

    if (typeof serieId !== "string") {
        throw createError({
            statusCode: 400,
            statusMessage: 'One of the following query parameters is unset or not valid : serieId',
        })
    }

    const allChapters = await repo.getSortedFoldersOfManga(event, serieId);
    const processedChapters = await service.buildSerieNavigation(allChapters);
    return processedChapters;
});