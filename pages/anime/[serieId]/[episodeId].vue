<template>
    <main>
        <p>Kagescan Animés</p>
        <AnimeNavigationLinks :episodeData="episodeData"></AnimeNavigationLinks>
        <AnimePlayerContainer v-if="currentPlayer" :toPlay="currentPlayer" />
        <div v-else>Erreur de format</div>
    </main>
</template>
<script setup lang="ts">
    const route = useRoute();
    const { serieId, episodeId } = route.params;
    const episodeData = await useAnimeEpisode(serieId as string, episodeId as string);
    const currentPlayer = computed(() => episodeData.currentEpisode?.players[0]);
</script>
