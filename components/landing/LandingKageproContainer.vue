<template>
    <section>
        <div :style="`mask: url(${markImg}) no-repeat center; mask-size: contain; filter:drop-shadow(0 0 5px white);`">
            <img src="~/assets/img/landing/kageproSeparator.png" alt="Kagerou Project - Separator" class="w-full my-4" />
        </div>

        <CoreContainer>
            <h2 class="md:text-5xl text-3xl font-bold">Quand les musiques vocaloid s'invitent dans l'animation</h2>

            <p class="my-8 md:text-2xl text-xl text-teal-700 font-medium lg:w-3/4">
                Le <strong>Kagerou Project</strong> est à l'origine un recueil de chansons vocaloid produites par Shizen
                no Teki-P (alias Jin), qui ont ensuite été adaptées en plusieurs supports (manga, animé, roman…)
            </p>

            <p class="my-8 md:text-2xl text-xl text-teal-700 font-medium lg:w-3/4">
                La série se concentre sur les péripéties du <strong>Mekakushi Dan</strong>, un groupe d'adolescents
                possédant malgré eux un pouvoir surnaturel, les <em>Eye Abilites</em>. Tout au long des épisodes, les
                jeunes tentent de résoudre les mystères liés à ces pouvoirs, mais le chemin vers la vérité sera semé
                d'embuches…
            </p>
        </CoreContainer>
    </section>
</template>
<script setup lang="ts">
    import markImg from "~/assets/img/landing/mask.svg";
</script>
