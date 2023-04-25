<template>
    <AnimePlayerVideo
        v-if="props.toPlay.player == 'video'"
        :url="props.toPlay.url"
        :poster="props.episodeData.thumb"
    ></AnimePlayerVideo>
    <div v-else>Erreur : {{ props.toPlay.player }} n'est pas un player valide</div>
</template>
<script setup lang="ts">
    import { type AnimeEpisodeMetadata } from "~/composables/useAnime";

    const props = defineProps<{
        toPlay: {
            player: string;
            url: string;
        };
        episodeData: AnimeEpisodeMetadata;
    }>();
</script>
<style scoped lang="scss"></style>
