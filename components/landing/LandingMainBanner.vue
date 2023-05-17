<template>
    <header>
        <div class="w-screen h-full relative overflow-hidden">
            <video
                class="w-full h-full object-cover object-center"
                :style="animatedStyles.video"
                autoplay
                loop
                muted
                playsinline
                src="~/assets/video/landing_anim.mp4"
                poster="~/assets/video/landing_anim.jpg"
            ></video>
        </div>
        <div class="absolute top-0 left-0 w-full h-full p-8 text-white text-center">
            <div :style="animatedStyles.mainText">
                <h1 class="xl:text-3xl md:text-2xl text-xl font-bold">Plongez dans l'univers du Kagerou Project</h1>
                <p class="xl:text-2xl md:text-xl font-semibold">et découvrez un fandom plus qu'ambitieux !</p>
            </div>
            <p
                class="xl:text-2xl md:text-xl text-red-200 md:w-[50rem] max-w-full mx-auto font-medium"
                :style="animatedStyles.secondaryText"
            >
                <br />
                Kagescan regroupe l'ensemble des traductions françaises de la série, ainsi que diverses ressources pour
                découvrir notre communauté
            </p>

            <div class="flex justify-center w-full mt-4">
                <CoreButton to="/scan">Lire le manga</CoreButton>
                <CoreButton to="/anime">Regarder l'animé</CoreButton>
                <CoreButton to="/novel">Lire le roman</CoreButton>
                <CoreButton to="/music">Ecouter les musiques</CoreButton>
            </div>
        </div>
    </header>
</template>
<script setup lang="ts">
    const scrollData = useScroll(process.server ? undefined : window);

    const animatedStyles = computed(() => {
        const y = scrollData.y.value;
        let scaleDecimals = 400;
        let parallaxY = y * -0.4;
        let opacity = 1;
        if (y > 20) {
            opacity = Math.max(0.8 - y / 420, 0);
            scaleDecimals = 420 - y;
        }
        return {
            video: `transform: scale(1.${String(scaleDecimals).padStart(3, "0")}) translateY(${parallaxY}px)`,
            mainText: `opacity: ${Number(opacity).toFixed(3)}`,
            secondaryText: `opacity: ${Number(opacity).toFixed(3)}`,
        };
    });
</script>
