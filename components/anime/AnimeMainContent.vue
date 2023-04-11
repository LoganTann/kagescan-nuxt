<template>
    <div>
        <AnimePlayerContainer v-if="currentPlayer" :to-play="currentPlayer"></AnimePlayerContainer>
        {{ surroundings }}
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
        const allEpisodes = props.pageData.serieData.value?.videos;
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
