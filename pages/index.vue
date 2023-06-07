<template>
    <CustLandingMainBanner class="fixed top-20 w-full h-[420px] z-1" />
    <main class="relative mt-[420px] z-2 bg-white pb-14">
        <CustLandingNews></CustLandingNews>
        <CustLandingKageproContainer></CustLandingKageproContainer>
        <CustLandingCommunityContainer></CustLandingCommunityContainer>
    </main>
</template>
<script setup lang="ts">
    useHead({
        title: "Kagescan - Communauté française Kagerou Project",
        meta: [
            {
                name: "description",
                content:
                    "Découvrez dès aujourd'hui la série Kagerou Project, et accédez à l'ensemble des traductions françaises dans un seul endroit !",
            },
        ],
    });
</script>
<style></style>
