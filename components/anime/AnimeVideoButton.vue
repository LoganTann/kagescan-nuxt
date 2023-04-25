<template>
    <nuxt-link :to="props.episode.path" :title="props.episode.title" class="pb-2">
        <div class="flex">
            <div>
                <nuxt-img width="100" height="56" :src="props.episode.thumb"></nuxt-img>
            </div>
            <div class="px-2">
                <p class="text-sm text-ellipsis font-semibold">{{ props.episode.title }}</p>
                <p class="text-xs uppercase">{{ props.episode.subtitle }}</p>
            </div>
        </div>
    </nuxt-link>
</template>
<script setup lang="ts">
    import { type AnimeSerieVideoNode } from "~/composables/useAnime";

    const props = defineProps<{
        episode: AnimeSerieVideoNode;
    }>();
</script>
<style scoped lang="scss"></style>
