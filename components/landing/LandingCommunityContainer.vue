<template>
    <CoreContainer>
        <h2 class="md:text-5xl text-3xl font-bold">Community first</h2>

        <p class="my-8 md:text-2xl text-xl text-teal-700 font-medium lg:w-3/4">
            Kagescan est un projet visant à promouvoir la série d'animation Kagerou Project au public francophone.<br />
            Parmi nos activités :
        </p>

        <div class="flex flex-col lg:grid lg:grid-cols-3 gap-4">
            <LandingCommunityActivity blockTitle="Représenter la communauté française" :image="socialIcon">
                <p>En administrant les réseaux sociaux et en participant activement aux activités communautaires.</p>
                <p class="text-center lg:text-start">
                    <CoreButton variant="lg:large" to="/about/kagescan" class="mt-4"> À propos de nous </CoreButton>
                </p>
            </LandingCommunityActivity>
            <LandingCommunityActivity blockTitle="Réaliser des scanlations (fan-traduction)" :image="translateIcon">
                <p>
                    Rendre accessible librement une adaptation française de la série (car aucun média n'est à ce jour
                    officiellement traduit en français).<br />
                </p>
                <p class="text-center lg:text-start">
                    <CoreButton variant="lg:large" to="/about/faq" class="mt-4"> FAQ traductions </CoreButton>
                </p>
            </LandingCommunityActivity>
            <LandingCommunityActivity blockTitle="Soutenir les initiatives communautaires" :image="communityIcon">
                <p>
                    Utiliser nos compétences pour aller plus loin que ce site, tel que le développement d'un bot discord
                    ou d'un fangame.<br />
                </p>
                <p class="text-center lg:text-start">
                    <CoreButton class="mt-4" variant="lg:large" to="/about/projects">
                        Les projets de la commu.
                    </CoreButton>
                </p>
            </LandingCommunityActivity>
        </div>

        <p class="mt-8 text-xl text-gray-700 font-medium lg:w-2/3 lg:mx-auto pt-8">
            Nous cherchons toujours à évoluer en qualité, en réalisant chacune de nos créations manuellement (comme la
            programmation de ce site web). Et tout cela sans pub ni demandes de dons, car nous croyons que notre passion
            pour ce projet suffit ♥.
        </p>
    </CoreContainer>
</template>
<script setup lang="ts">
    import socialIcon from "~/assets/img/landing/socialIcon.png";
    import translateIcon from "~/assets/img/landing/translateIcon.png";
    import communityIcon from "~/assets/img/landing/communityIcon.png";
</script>
