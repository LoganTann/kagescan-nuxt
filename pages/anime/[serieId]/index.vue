<template>
    <ContentDoc v-if="false" v-slot="{ doc }">
        <h1>{{ doc.title }}</h1>
        <ContentRenderer :value="doc" />
        <div>
            {{ serieData.serieData.value?.videos }}
        </div>
    </ContentDoc>
</template>

<script setup lang="ts">
    const route = useRoute();
    const { serieId } = route.params;
    const serieData = useAnimeData(serieId as string);
    /**
     * Redirection car page inachevée et on focus seulement sur l'essentiel
     */
    watch(serieData.serieData, (newVal) => {
        if (newVal?.videos) {
            navigateTo(newVal.videos[0].path);
        }
    });
</script>
