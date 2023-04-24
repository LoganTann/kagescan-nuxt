<template>
    <div v-if="episodeData && serieData">
        <div>
            {{ serieData.poster }}
            {{ serieData.title }}
            {{ serieData.subtitle }}
        </div>
        <div>
            <h1>{{ episodeData.title }}</h1>
            <ContentRenderer :value="episodeData"></ContentRenderer>
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
</script>
<style scoped lang="scss"></style>
