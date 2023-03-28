<template>
    <main>
        <p>Kagescan Animés</p>
        <AnimePlayerContainer v-if="result.kgs_layout == 'anime_episode'" :toPlay="currentPlayer" />
        <div v-else>Liste des épisodes</div>
    </main>
</template>
<script setup lang="ts">
    import type { ParsedContent } from "@nuxt/content/dist/runtime/types";
    interface ANI_ParsedContent extends ParsedContent {
        kgs_layout: string;
        players: [
            {
                player: string;
                url: string;
            }
        ];
    }
    const route = useRoute();
    const result = await queryContent<ANI_ParsedContent>(route.path).without("body").findOne();

    const currentPlayer = computed(() => {
        if (Array.isArray(result?.players)) {
            return result.players[0];
        }
        return { player: "[invalid pagedata]", url: "" };
    });
</script>
