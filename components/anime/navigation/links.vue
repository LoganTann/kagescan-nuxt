<template>
    <NuxtLink v-if="props.episodeData.previousEpisode" :to="props.episodeData.previousEpisode._path">
        {{ props.episodeData.previousEpisode.title }} &lt;
    </NuxtLink>
    <span>{{ props.episodeData.currentEpisode?.title }}</span>
    <NuxtLink v-if="props.episodeData.nextEpisode" :to="props.episodeData.nextEpisode._path">
        &gt;
        {{ props.episodeData.nextEpisode.title }}
    </NuxtLink>
    <br />
    <NuxtLink to="./">Revenir à la liste des épisodes</NuxtLink>
</template>
<script setup lang="ts">
    import { AnimeEpisodePageData } from "~/composables/useAnime";

    const props = defineProps<{
        episodeData: AnimeEpisodePageData;
    }>();
</script>
<style scoped lang="scss"></style>
