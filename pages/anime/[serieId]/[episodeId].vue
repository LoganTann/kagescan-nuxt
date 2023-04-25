<template>
    <CoreContainer>
        <Grid row class="gap-4">
            <Grid col="s12 l7">
                <AnimeMainContent :page-data="pageData"></AnimeMainContent>
            </Grid>
            <Grid col="s12 l4">
                <AnimeSideContent :page-data="pageData" class="pl-4" />
            </Grid>
        </Grid>
    </CoreContainer>
</template>
<script setup lang="ts">
    const route = useRoute();
    const serieId = route.params.serieId as string;
    const episodeId = route.params.episodeId as string;

    const pageData = useAnimeData(serieId, episodeId);
</script>
