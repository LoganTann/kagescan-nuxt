<template>
    <ul>
        <li v-for="episode in props.animeEpisodes" :key="episode._id">
            <NuxtLink :to="episode._path">{{ episode.title }}</NuxtLink>
        </li>
    </ul>
</template>
<script setup lang="ts">
    import { AnimeParsedContent } from "~/composables/useAnime";
    const props = defineProps<{
        animeEpisodes: AnimeParsedContent[];
    }>();
</script>
