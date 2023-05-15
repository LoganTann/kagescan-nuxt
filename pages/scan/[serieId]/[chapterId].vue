<template>
    <div v-if="error">
        {{ error.message }}
    </div>
    <div v-else>
        <ContentDoc>
            <template #empty> </template>
        </ContentDoc>
        <div id="mangaReader">
            <ScanHeader
                :images="pagesData?.images"
                :current-page="params.page as string"
            >
                <ScanHeaderNavigation :serieNavigation="serieNavigationData"></ScanHeaderNavigation>
            </ScanHeader>
            <ScanReader
                :images="pagesData?.images"
                :current-page="params.page as string"
                @next-page="nextPage"
            ></ScanReader>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { onKeyStroke } from "@vueuse/core";

    const route = useRoute();
    const { data: pagesData, error: pagesError } = await useFetch("/api/scan/getChapterPages", {
        params: {
            serieId: route.params.serieId,
            chapterId: route.params.chapterId,
        },
    });

    const { data: serieNavigationData, error: serieNavigationError } = await useFetch("/api/scan/getSerieNavigation", {
        params: {
            serieId: route.params.serieId,
        },
    });

    const params = useUrlSearchParams("history");
    if (!params.page) {
        if (process.server && route.params.page) {
            params.page = route.params.page;
        } else {
            params.page = "1";
        }
    }

    onKeyStroke("ArrowRight", (e) => {
        e.preventDefault();
        nextPage();
    });
    onKeyStroke("ArrowLeft", (e) => {
        e.preventDefault();
        previousPage();
    });
    function previousPage() {
        const page = Number(params.page ?? 0);
        params.page = String(page - 1);
    }
    function nextPage() {
        const page = Number(params.page ?? 0);
        params.page = String(page + 1);
    }
    function setPage(value) {
        params.page = String(value);
    }
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
