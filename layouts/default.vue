<template>
    <NuxtLoadingIndicator :throttle="100" />
    <div id="app" class="font-sans">
        <CoreNavbarContainer :not-sticky="!isMainPage" />
        <div class="grow">
            <slot />
        </div>
        <footer v-if="isFooterVisible">Kagescan</footer>
    </div>
</template>
<script setup lang="ts">
    import { MANGA_FOLDER } from "~/server/api/-types";

    const route = useRoute();
    const isMainPage = computed(() => route.path == "/");
    const isFooterVisible = computed(() => {
        if (route.path.startsWith(MANGA_FOLDER) && typeof route.params.chapterId === "string") {
            return false;
        }
        return true;
    });
</script>
