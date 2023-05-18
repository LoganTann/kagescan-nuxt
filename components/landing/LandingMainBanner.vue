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
                poster="~/assets/video/landing_anim.webp"
            >
                <source src="~/assets/video/landing_anim.webm" type="video/webm" />
                <source src="~/assets/video/landing_anim.mp4" type="video/mp4" />
            </video>
        </div>
        <div class="absolute top-0 left-0 w-full h-full p-8 text-white text-center" :style="animatedStyles.opacity">
            <div>
                <h1 class="xl:text-3xl md:text-2xl text-xl font-bold">Plongez dans l'univers du Kagerou Project</h1>
                <p class="xl:text-2xl md:text-xl font-semibold">et découvrez un fandom plus qu'ambitieux !</p>
            </div>
            <p class="xl:text-2xl md:text-xl text-red-200 md:w-[50rem] max-w-full mx-auto font-medium">
                <br />
                Kagescan regroupe l'ensemble des traductions françaises de la série, ainsi que diverses ressources pour
                découvrir notre communauté
            </p>
            <div class="flex justify-center w-full mt-6 flex-wrap text-sm sm:text-base">
                <CoreButton class="mt-2" variant="large" to="/scan" icon="fa-regular fa-comments">Mangas</CoreButton>
                <CoreButton class="mt-2" variant="large" to="/anime" icon="fa-regular fa-circle-play">Animés</CoreButton>
                <CoreButton class="mt-2" variant="large" to="/novel" icon="fa-solid fa-book">Romans</CoreButton>
                <CoreButton class="mt-2" variant="large" to="/music" icon="fa-solid fa-compact-disc">
                    Musiques
                </CoreButton>
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
            opacity: `opacity: ${Number(opacity).toFixed(3)}`,
        };
    });
</script>
