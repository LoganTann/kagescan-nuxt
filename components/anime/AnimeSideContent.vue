<template>
    <div v-if="episodeData && serieData">
        <AnimeTitleButton
            :poster="serieData.poster"
            :title="serieData.title"
            :subtitle="serieData.subtitle"
            :is-active="isPlaylistNavOpened"
            @click="togglePlaylistNav"
        ></AnimeTitleButton>

        <AnimePlaylistNavig
            v-if="isPlaylistNavOpened"
            :current-episode-path="episodeData._path!"
            :episodes="serieData.videos"
        ></AnimePlaylistNavig>
        <div v-if="!isPlaylistNavOpened">
            <h1 class="font-bold text-2xl text-center mb-2">{{ episodeData.title }}</h1>
            <ContentRenderer :value="episodeData" class="prose prose-sm mx-auto"></ContentRenderer>
        </div>
    </div>
    <div v-else>...</div>
</template>
<script setup lang="ts">
    import { AnimeEpisodeAndSerieData } from "~/composables/useAnime";

    const props = defineProps<{
        pageData: AnimeEpisodeAndSerieData;
    }>();
    const episodeData = computed(() => props.pageData.episodeData.value);
    const serieData = computed(() => props.pageData.serieData.value);
    const isPlaylistNavOpened = ref(false);
    function togglePlaylistNav() {
        isPlaylistNavOpened.value = !isPlaylistNavOpened.value;
    }
</script>
<style scoped lang="scss"></style>
