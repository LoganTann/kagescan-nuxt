<template>
    <div>
        <AnimePlayerContainer
            v-if="currentPlayer"
            :to-play="currentPlayer"
            :episode-data="pageData.episodeData.value !"
        ></AnimePlayerContainer>
        <CoreVideoSkeleton v-else></CoreVideoSkeleton>
        <div class="m-4 sm:mx-0 flex flex-col items-center sm:items-stretch sm:flex-row">
            <div class="w-full max-w-[24rem] mt-2">
                <template v-if="surroundings.prev">
                    <p class="font-bold">Episode précédent</p>
                    <AnimeVideoButton :episode="surroundings.prev"></AnimeVideoButton>
                </template>
            </div>
            <div class="sm:ml-auto w-full max-w-[24rem] mt-2">
                <template v-if="surroundings.next">
                    <p class="font-bold">Episode suivant</p>
                    <AnimeVideoButton :episode="surroundings.next"></AnimeVideoButton>
                </template>
                <div v-else-if="surroundings.prev">
                    <p class="font-bold invisible">.</p>
                    <p class="text-end">C'était le dernier épisode 👏</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { AnimeEpisodeAndSerieData, type AnimeSerieVideoNode } from "~/composables/useAnime";
    const props = defineProps<{
        pageData: AnimeEpisodeAndSerieData;
    }>();

    const currentPlayer = computed(() => {
        const playersAvailables = props.pageData.episodeData.value?.players ?? [];
        if (playersAvailables.length > 0) {
            return playersAvailables[0];
        }
        return undefined;
    });

    const surroundings = computed(() => {
        const result: {
            prev?: AnimeSerieVideoNode;
            next?: AnimeSerieVideoNode;
        } = {};
        const currentEpisodePath = props.pageData.episodeData.value?._path;
        const subtitle = props.pageData.serieData.value?.title ?? "";
        const allEpisodes = props.pageData.serieData.value?.videos.map((videoNode) => {
            return { ...videoNode, subtitle };
        });
        if (!currentEpisodePath || !allEpisodes) {
            return result;
        }
        const currentEpisodeIndex = allEpisodes.findIndex((videoNode) => videoNode.path === currentEpisodePath);
        if (currentEpisodeIndex > 0) {
            result.prev = allEpisodes[currentEpisodeIndex - 1];
        }
        if (currentEpisodeIndex >= 0 && currentEpisodeIndex < allEpisodes.length - 1) {
            result.next = allEpisodes[currentEpisodeIndex + 1];
        }
        return result;
    });
</script>
<style scoped lang="scss"></style>
