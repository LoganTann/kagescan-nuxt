<template>
    <div>
        <NovelReaderNavbar :current-volume-data="data"></NovelReaderNavbar>
        <div class="prose mx-auto">
            <ContentDoc v-slot="{ doc }">
                <h1 class="text-center">{{ doc.title }}</h1>
                <ContentRenderer :value="doc" />
            </ContentDoc>
        </div>
        <pre>
            {{ data }} {{ error }}
        </pre>
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
