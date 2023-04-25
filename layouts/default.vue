<template>
    <NuxtLoadingIndicator :throttle="100" />
    <div id="app" class="font-sans">
        <CoreNavbarContainer :not-sticky="!isMainPage" />
        <div class="grow">
            <slot />
        </div>
        <footer>Kagescan</footer>
    </div>
</template>
<script setup lang="ts">
    const route = useRoute();
    const isMainPage = computed(() => route.path == "/");
</script>
