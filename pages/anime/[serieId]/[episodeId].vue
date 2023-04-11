<template>
    <main>
        <Grid row>
            <Grid col="s12 l8">
                <AnimeMainContent :page-data="pageData"></AnimeMainContent>
            </Grid>
            <Grid col="s12 l3">
                <AnimeSideContent :page-data="pageData" />
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
