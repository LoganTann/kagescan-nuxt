<template>
    <div v-if="error">
        {{ error.message }}
    </div>
    <div v-else class="px-4 mt-2">
        <NovelReaderNavbar :current-volume-data="data"></NovelReaderNavbar>
        <div class="prose mx-auto mt-8">
            <ContentDoc v-slot="{ doc }">
                <h1 class="text-center">{{ doc.title }}</h1>
                <ContentRenderer :value="doc" />
            </ContentDoc>
            
            <div class="text-center">
                <CoreButton variant="large" :to="nextChapter">
                    Démarrer la lecture
                </CoreButton>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    const route = useRoute();
    const { data } = await useFetch("/api/novel/getVolumeData", {
        params: {
            serieId: route.params.serieId,
            volumeId: route.params.volumeId,
        },
    });
    const nextChapter = ref("");
    if (data.value && data.value.chapters.length > 0) {
        nextChapter.value = data.value.chapters[0].path;
    }
</script>