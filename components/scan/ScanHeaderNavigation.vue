<template>
    <CoreDropdownContainer :is-dropdown="true" class="">
        <template #title>
            <div class="flex items-center px-2 py-2 hover:bg-slate-100 transition-colors min-w-[20rem]">
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
    import { MangaVolumeApiResponse } from "~/server/api/scan/-getSerieNavigationTypes";

    const props = defineProps<{
        serieNavigation: MangaVolumeApiResponse | null;
    }>();
    const route = useRoute();

    const previousChapterUrl = ref("");
    const nextChapterUrl = ref("");

    const processedChapterData = computed(() => {
        const result = {
            volumeName: "",
            chapterName: "",
            coverSrc: "",
            chapters: [] as (Option | OptionGroup)[],
        };
        const volumes = props.serieNavigation?.volumes ?? [];
        const pathSuffix = `/${route.params.chapterId}`;
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
                    to: chapter.path,
                    active: isCurrentChapter,
                });
            }
        }
        return result;
    });

    type OptionGroup = {
        kind: "categoryTitle";
        key: string;
        name: string;
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
