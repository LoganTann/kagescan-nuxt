<template>
    <div class="px-4 mt-2">
        <div class="prose mx-auto mt-8" v-if="serieData">
            <h1>{{ serieData.serieName }}</h1>
            
            <div>

                
            </div>

            <ContentDoc></ContentDoc>
        </div>
        <pre>
            {{ serieData }}
        </pre>
    </div>
</template>
<script setup lang="ts">
    const route = useRoute();
    const { data: serieData, error: serieError } = await useFetch("/api/scan/getSerieNavigation", {
        params: {
            serieId: route.params.serieId,
        },
    });
</script>
