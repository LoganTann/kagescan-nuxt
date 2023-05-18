<template>
    <section class="my-14 w-full py-14 KageproSection">
        <CoreContainer>
            <h2 class="md:text-5xl text-3xl font-bold text-white drop-shadow">
                Quand les musiques vocaloid s'invitent dans l'animation
            </h2>

            <p class="my-8 md:text-2xl text-xl text-teal-200 font-medium container-sm">
                Le <strong>Kagerou Project</strong> est à l'origine un recueil de chansons vocaloid produites par Shizen
                no Teki-P (alias Jin), qui ont ensuite été adaptées en plusieurs supports (manga, animé, roman…).
            </p>

            <p class="my-8 md:text-2xl text-xl text-teal-200 font-medium container-sm">
                La série se concentre sur les péripéties du <strong>Mekakushi Dan</strong>, un groupe d'adolescents
                possédant malgré eux un pouvoir surnaturel, les <em>Eye Abilites</em>. Tout au long des épisodes, les
                jeunes tentent de résoudre les mystères liés à ces pouvoirs, mais le chemin vers la vérité sera semé
                d'embuches…
            </p>

            <p class="my-8 text-center">
                <CoreButton variant="large" to="/about/kagerou_project">
                    Qu'est-ce que le Kagerou Project ?
                </CoreButton>
            </p>
        </CoreContainer>
    </section>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
    .KageproSection {
        background-image: url("~/assets/img/landing/top_bg_grid.png"), url("~/assets/img/landing/vocaloidSection.webp");
        background-position: top left, center;
        background-size: auto, cover;
        background-attachment: fixed;
    }
</style>
