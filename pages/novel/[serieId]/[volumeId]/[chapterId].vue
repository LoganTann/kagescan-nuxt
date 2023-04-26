<template>
    <div class="px-4 mt-2">
        <NovelReaderNavbar :current-volume-data="data"></NovelReaderNavbar>
        <div class="prose mx-auto mt-8">
            <ContentDoc v-slot="{ doc }">
                <h1 class="text-center">{{ doc.title }}</h1>
                <ContentRenderer :value="doc" />
            </ContentDoc>
        </div>
    </div>
</template>

<script setup lang="ts">
    const route = useRoute();
    const { data, error } = await useFetch("/api/novel/getVolumeData", {
        params: {
            serieId: route.params.serieId,
            volumeId: route.params.volumeId,
        },
    });
</script>
