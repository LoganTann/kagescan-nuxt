<template>
    <div class="flex flex-col max-h-80 overflow-auto" ref="playlistContainer">
        <AnimeVideoButton
            v-for="episode in props.episodes"
            :key="episode.path"
            :episode="episode"
            :is-active="episode.path === currentEpisodePath"
            class="px-2 border-b border-gray-100"
            @receive-active="handleReceiveActive"
        ></AnimeVideoButton>
    </div>
</template>
<script setup lang="ts">
    import { type AnimeSerieVideoNode } from "~/composables/useAnime";
    const props = defineProps<{
        episodes: AnimeSerieVideoNode[];
        currentEpisodePath: string;
    }>();

    const playlistContainer = ref<Element | null>(null);

    function handleReceiveActive(data: { relativeScrollPos: number }) {
        if (playlistContainer.value) {
            playlistContainer.value.scrollTo({
                top: data.relativeScrollPos,
            });
        }
    }
</script>
