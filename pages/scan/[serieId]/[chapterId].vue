<template>
    <div v-if="error">
        {{ error.message }}
    </div>
    <div v-else>
        <ContentDoc>
            <template #empty>
                {{ visiblePages }}
            </template>
        </ContentDoc>
        <div class="mangaReader">
            <div class="bg-white flex">
                <div>Header</div>
            </div>
            <div class="flex justify-center items-center">
                <template v-for="mangaPage in visiblePages" :key="mangaPage.id">
                    <NuxtImg
                        v-if="mangaPage.isVisible || mangaPage.isPreloading"
                        :src="mangaPage.src"
                        :class="{ hidden: mangaPage.isPreloading }"
                        :id="mangaPage.id"
                        class="mangaPage max-h-[calc(100vh-5rem)]"
                        @click="nextPage"
                    ></NuxtImg>
                </template>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { onKeyStroke } from "@vueuse/core";

    const route = useRoute();
    const { data, error } = await useFetch("/api/scan/getChapterPages", {
        params: {
            serieId: route.params.serieId,
            chapterId: route.params.chapterId,
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

    const visiblePages = computed(() => {
        if (!data.value?.images.length) {
            return [];
        }
        return data.value.images.map((page, i) => {
            const pageDistance = i + 1 - Number(params.page);
            return {
                ...page,
                isVisible: pageDistance == 0,
                isPreloading: pageDistance > 0 && pageDistance < 5,
            };
        });
    });

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
</script>
<style scoped lang="scss">
    .mangaReader {
        width: 100%;
        height: 100vh;
        display: grid;
        grid-auto-columns: 1fr;
        grid-template-rows: 4rem 1fr;
        gap: 0px 0px;
    }
    .mangaPage {
    }
</style>
