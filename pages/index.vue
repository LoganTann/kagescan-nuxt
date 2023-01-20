<template>
    <div id="app" class="font-sans">
        <CoreNavbarContainer />
        <LandingMainBanner class="fixed top-20 w-full h-[420px] z-1" />
        <main class="relative top-[420px] z-2 bg-white">
            <LandingKageproContainer></LandingKageproContainer>
            <LandingCommunityContainer></LandingCommunityContainer>
        </main>
        <footer>owo</footer>
    </div>
</template>
<style>
    html,
    body,
    #__nuxt,
    #app {
        min-height: 100%;
    }
</style>
