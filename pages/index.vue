<template>
    <LandingMainBanner class="fixed top-20 w-full h-[420px] z-1" />
    <main class="relative mt-[420px] z-2 bg-white pb-14">
        <LandingNews></LandingNews>
        <LandingKageproContainer></LandingKageproContainer>
        <LandingCommunityContainer></LandingCommunityContainer>
    </main>
</template>
<script setup lang="ts">
    useHead({
        title: "Kagescan - Communauté française Kagerou Project",
        meta: [
            {
                name: "description",
                content: "Kagescan regroupe l'ensemble des traductions de la série Kagerou Project, ainsi que diverses pages pour vous lancer dans l'univers.",
            },
        ],
    });
</script>
<style></style>
