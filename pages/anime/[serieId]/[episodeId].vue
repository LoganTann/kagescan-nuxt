<template>
    <main class="pt-8 mx-auto md:w-11/12 max-w-7xl px-1 sm:px-3 md:px-5">
        <Grid row class="gap-4">
            <Grid col="s12 l7">
                <AnimeMainContent :page-data="pageData"></AnimeMainContent>
            </Grid>
            <Grid col="s12 l5">
                <AnimeSideContent :page-data="pageData" class="pl-4" />
            </Grid>
        </Grid>
    </main>
</template>
<script setup lang="ts">
    const route = useRoute();
    const serieId = route.params.serieId as string;
    const episodeId = route.params.episodeId as string;

    const pageData = useAnimeData(serieId, episodeId);
</script>
