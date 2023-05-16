<template>
    <LandingMainBanner class="fixed top-20 w-full h-[420px] z-1" />
    <main class="relative top-[420px] z-2 bg-white">
        <LandingKageproContainer></LandingKageproContainer>
        <LandingCommunityContainer></LandingCommunityContainer>
    </main>
</template>
<script setup lang="ts">
    useHead({
        title: "Kagescan - Communauté française Kagerou Project",
        meta: [],
    });
</script>
<style></style>
