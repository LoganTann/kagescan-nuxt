<script setup lang="ts">
    const route = useRoute();
    const { data } = await useFetch("/api/novel/getVolumeData", {
        params: {
            serieId: route.params.serieId,
            volumeId: route.params.volumeId,
        },
    });
    if (data.value && data.value.chapters.length > 0) {
        navigateTo(data.value.chapters[0].path);
    }
</script>
