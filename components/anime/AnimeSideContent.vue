<template>
    <div v-if="episodeData && serieData">
        <div>
            {{ serieData.poster }}
            {{ serieData.title }}
            {{ serieData.subtitle }}
        </div>
        <div>
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
</script>
<style scoped lang="scss"></style>
