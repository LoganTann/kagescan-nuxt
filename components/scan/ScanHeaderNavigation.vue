<template>
    <div class="inline-flex">
        <NuxtLink
            :to="props.previousChapterUrl"
            class="hover:bg-slate-100 transition-colors px-2 inline-flex items-center"
            title="Chapitre précédent"
        >
            <font-awesome-icon icon="fa-solid fa-arrow-left" class="w-5 h-5 text-slate-800" />
        </NuxtLink>
        <CoreDropdownContainer :is-dropdown="true">
            <template #title>
                <div
                    :title="props.titleTxt"
                    class="flex items-center px-2 py-2 hover:bg-slate-100 transition-colors min-w-[20rem] h-full"
                >
                    <nuxt-img :src="processedChapterData.coverSrc" :width="30"></nuxt-img>
                    <div class="grow px-2">
                        <p class="text-sm">{{ processedChapterData.volumeName }}</p>
                        <p>{{ processedChapterData.chapterName }}</p>
                    </div>
                    <CoreIconContainer icon="chevronDown" class="inline"></CoreIconContainer>
                </div>
            </template>
            <template #default>
                <div class="bg-white flex flex-col shadow border">
                    <div class="px-4 py-2 text-center text-sm text-slate-700">Listes des chapitres</div>
                    <div class="flex flex-col font-medium text-sm overflow-y-scroll max-h-52">
                        <template v-for="chapter in processedChapterData.chapters" :key="chapter.key">
                            <NuxtLink
                                v-if="chapter.kind === 'nuxtLink'"
                                :to="chapter.to"
                                class="px-4 py-2 pl-6 bg-slate-50 hover:bg-slate-100 transition-all border-t border-slate-200"
                                :class="{ 'shadow-inner text-teal-400 border-l-4 border-l-teal-400': chapter.active }"
                            >
                                {{ chapter.name }}
                            </NuxtLink>
                            <div v-else class="px-4 py-2 bg-white font-semibold border-t border-slate-200">
                                {{ chapter.name }}
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </CoreDropdownContainer>
        <NuxtLink
            :to="props.nextChapterUrl"
            class="hover:bg-slate-100 transition-colors px-2 inline-flex items-center"
            title="Chapitre suivant"
        >
            <font-awesome-icon icon="fa-solid fa-arrow-right" class="w-5 h-5 text-slate-800" />
        </NuxtLink>
    </div>
</template>
<script setup lang="ts">
    import { ScanSurroundingUrls } from "~/composables/usePageCounter";
    import { MangaVolumeApiResponse } from "~/server/api/scan/-getSerieNavigationTypes";

    const emits = defineEmits<{
        (event: "update_surrounding_urls", urls: ScanSurroundingUrls): void;
    }>();
    const props = defineProps<{
        serieNavigation: MangaVolumeApiResponse | null;
        titleTxt?: string;
        nextChapterUrl: string;
        previousChapterUrl: string;
    }>();
    const route = useRoute();

    /**
     * Take the serie navigation from the backend, and perform linear operations on the chapter list
     * (finding the current chapter data, building the dropdown list, etc.)
     */
    const processedChapterData = computed(() => {
        const result = {
            volumeName: "",
            chapterName: "",
            coverSrc: "",
            chapters: [] as (Option | OptionGroup)[],
        };
        const volumes = props.serieNavigation?.volumes ?? [];
        const pathSuffix = `/${route.params.chapterId}`;
        const hash = "#mangaReader";
        for (const volume of volumes) {
            result.chapters.push({
                kind: "categoryTitle",
                key: volume.id,
                name: volume.name,
            });
            for (const chapter of volume.chapters) {
                const isCurrentChapter = chapter.path.endsWith(pathSuffix);
                if (isCurrentChapter) {
                    result.volumeName = volume.name;
                    result.coverSrc = volume.cover;
                    result.chapterName = chapter.name;
                }
                result.chapters.push({
                    kind: "nuxtLink",
                    key: chapter.id,
                    name: chapter.name,
                    to: chapter.path + hash,
                    active: isCurrentChapter,
                });
            }
        }
        return result;
    });

    /**
     * Once the chapter list is built, we need to emit to the parent the previous and next chapters url
     */
    watchArray(
        () => processedChapterData.value.chapters,
        (chapters) => {
            const chaptersOnly: Option[] = chapters.filter((chapter): chapter is Option => chapter.kind === "nuxtLink");
            emits("update_surrounding_urls", getSurroundings(chaptersOnly));
        },
        { immediate: true }
    );

    /**
     * Returns the surrounding urls of the chapter having the "active" property set to true.
     * @private
     */
    function getSurroundings(chapters: Option[]): ScanSurroundingUrls {
        const result = {
            nextChapterUrl: "",
            previousChapterUrl: "",
        };
        const currentChapterIndex = chapters.findIndex((chapter) => chapter.active);
        if (chapters.length === 0 || currentChapterIndex === -1) {
            return result;
        }
        if (currentChapterIndex > 0) {
            result.previousChapterUrl = chapters[currentChapterIndex - 1].to;
        }
        if (currentChapterIndex < chapters.length - 1) {
            result.nextChapterUrl = chapters[currentChapterIndex + 1].to;
        }
        return result;
    }

    type OptionGroup = {
        kind: "categoryTitle";
        key: string;
        name: string;
        active?: never;
    };
    type Option = {
        kind: "nuxtLink";
        name: string;
        to: string;
        active: boolean;
        key: string;
    };
</script>
<style scoped lang="scss"></style>
