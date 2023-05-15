<template>
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
            emits("update_surrounding_urls", getSurroundings(chapters));
        },
        { immediate: true }
    );

    /**
     * Returns the surrounding urls of the chapter having the "active" property set to true.
     * @private
     */
    function getSurroundings(chapters: (Option | OptionGroup)[]): ScanSurroundingUrls {
        const result = {
            nextChapterUrl: "",
            previousChapterUrl: "",
        };
        const currentChapterIndex = chapters.findIndex((chapter) => chapter.active);
        if (chapters.length === 0 || currentChapterIndex === -1) {
            return result;
        }

        let previousIndex = currentChapterIndex;
        let nextIndex = currentChapterIndex;
        while (previousIndex >= 0) {
            previousIndex--;
            const prev = chapters[previousIndex];
            if (prev?.kind === "nuxtLink") {
                result.previousChapterUrl = prev.to;
                break;
            }
        }
        while (nextIndex < chapters.length) {
            nextIndex++;
            const next = chapters[nextIndex];
            if (next?.kind === "nuxtLink") {
                result.nextChapterUrl = next.to;
                break;
            }
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
