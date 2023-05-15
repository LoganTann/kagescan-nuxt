<template>
    <div v-if="pagesError">
        {{ pagesError.message }}
    </div>
    <div v-else>
        <CoreContainer>
            <NuxtLink :to="`${MANGA_FOLDER}/${route.params.serieId}`">
                <h3 class="mt-4 text-teal-700 font-medium text-lg">{{ serieData?.serieName }}</h3>
            </NuxtLink>
            <h1 class="font-medium text-2xl">{{ chapterData.title }}</h1>
            <p class="my-4 mb-8 mx-6 sm:container text-slate-700 prose">{{ chapterData.description }}</p>
        </CoreContainer>
        <div id="mangaReader">
            <ScanHeader>
                <NuxtLink
                    :to="paginationCounter.previousChapterUrl.value"
                    class="hover:bg-slate-100 transition-colors px-2"
                    title="Chapitre précédent"
                    >Prect</NuxtLink
                >
                <ScanHeaderNavigation
                    :serieNavigation="serieData"
                    @update_surrounding_urls="paginationCounter.updateSurroundingUrls"
                    titleTxt="Choix du chapitre"
                ></ScanHeaderNavigation>
                <NuxtLink
                    :to="paginationCounter.nextChapterUrl.value"
                    class="hover:bg-slate-100 transition-colors px-2"
                    title="Chapitre suivant"
                    >Suivr</NuxtLink
                >
                <div>Page {{ paginationCounter.currentPageIndex }} dd</div>
                <button class="hover:bg-slate-100 transition-colors px-2">Tmbs</button>
                <button class="hover:bg-slate-100 transition-colors px-2">Settgs</button>
            </ScanHeader>
            <ScanReader
                :images="pagesData?.images"
                :current-page-index="paginationCounter.currentPageIndex"
                @next-page="paginationCounter.nextPage"
                @previous-page="paginationCounter.previousPage"
            ></ScanReader>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { MANGA_FOLDER } from "~/server/api/-types";

    const route = useRoute();

    const chapterData = await queryContent(route.path).findOne();

    useContentHead({
        ...chapterData,
        image: chapterData.cover,
    });

    const { data: pagesData, error: pagesError } = await useFetch("/api/scan/getChapterPages", {
        params: {
            serieId: route.params.serieId,
            chapterId: route.params.chapterId,
        },
    });
    const { data: serieData, error: serieError } = await useFetch("/api/scan/getSerieNavigation", {
        params: {
            serieId: route.params.serieId,
        },
    });

    const paginationCounter = usePageCounter();

    watch(
        () => pagesData,
        (data) => {
            const pagesCount = data.value?.images.length;
            if (pagesCount) {
                paginationCounter.pagesCount.value = pagesCount;
            }
        },
        { immediate: true }
    );
</script>
<style scoped lang="scss">
    #mangaReader {
        width: 100%;
        height: 100vh;
        display: grid;
        grid-auto-columns: 1fr;
        grid-template-rows: 4rem 1fr;
        gap: 0px 0px;
    }
</style>
