<template>
    <NuxtLoadingIndicator />
    <div id="app" class="font-sans">
        <CoreNavbarContainer :not-sticky="!isMainPage" />
        <slot />
        <footer>owo</footer>
    </div>
</template>
<script setup lang="ts">
    const route = useRoute();
    const isMainPage = computed(() => route.path == "/");
</script>
