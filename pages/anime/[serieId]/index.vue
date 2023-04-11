<template>
    <ContentDoc v-slot="{ doc }">
        <h1>{{ doc.title }}</h1>
        <ContentRenderer :value="doc" />
        <AnimeNavigationVerticalList :anime-episodes="serieData"></AnimeNavigationVerticalList>
    </ContentDoc>
</template>

<script setup lang="ts">
    const route = useRoute();
    const { serieId } = route.params;
    const serieData = await useAnimeSerie(serieId as string);
</script>
