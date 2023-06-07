<template>
    <CoreContainer>
        <div class="pt-8 grid grid-cols-12 gap-4">
            <div class="col-span-12 lg:col-span-7">
                <AnimeMainContent :page-data="pageData"></AnimeMainContent>
            </div>
            <div class="col-span-12 lg:col-span-5">
                <AnimeSideContent :page-data="pageData" class="pl-4" />
            </div>
        </div>
    </CoreContainer>
</template>
<script setup lang="ts">
    const route = useRoute();
    const serieId = route.params.serieId as string;
    const episodeId = route.params.episodeId as string;

    const pageData = useAnimeData(serieId, episodeId);
</script>
