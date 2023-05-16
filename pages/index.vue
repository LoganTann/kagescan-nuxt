<template>
    <LandingMainBanner class="fixed top-20 w-full h-[420px] z-1" />
    <main class="relative mt-[420px] z-2 bg-white">
        <LandingNews></LandingNews>
        <LandingKageproContainer></LandingKageproContainer>
        <LandingCommunityContainer></LandingCommunityContainer>
    </main>
</template>
<script setup lang="ts">
    useHead({
        title: "Kagescan - Communauté française Kagerou Project",
    });
</script>
<style></style>
