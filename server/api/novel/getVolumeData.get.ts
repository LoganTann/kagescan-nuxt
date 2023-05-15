
import * as service from "./-getVolumeDataSvc";
import { NovelVolumeApiResponse } from "./-getVolumeDataTypes";


/**
 * Given a serie + volume Id, returns : 
 * - the current serie name
 * - the current volume (id, title, cover, path)
 * - the list of chapters in the current volume (id, path, title)
 * - the previous volume's id, title, cover and path (if exists)
 * - the next volume's id, title, cover and path (if exists)
 */
export default defineEventHandler(async (event): Promise<NovelVolumeApiResponse> => {
    const query = getQuery(event)
    const { serieId, volumeId } = query;
    if (!(typeof serieId === "string" && typeof volumeId === "string")) {
        throw createError({
            statusCode: 400,
            statusMessage: 'One of the following query parameters is unset or not valid : serieId, volumeId',
        })
    }

    const response = await service.getVolumeData(event, serieId, volumeId);

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

