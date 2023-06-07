<template>
    <CoreContainer>
        <h2 class="md:text-5xl text-3xl font-bold">Community first</h2>

        <p class="my-8 md:text-2xl text-xl text-teal-700 font-medium lg:w-3/4">
            Kagescan est un projet visant à promouvoir la série d'animation Kagerou Project au public francophone.<br />
            Parmi nos activités :
        </p>

        <div class="flex flex-col lg:grid lg:grid-cols-3 gap-4">
            <CustLandingCommunityActivity
                blockTitle="Représenter la communauté française"
                :image="socialIcon"
                imagesrc="translation icon"
                linkTitle="À propos de nous"
                linkUrl="/about/kagescan"
            >
                En administrant les réseaux sociaux et en participant activement aux activités communautaires.
            </CustLandingCommunityActivity>
            <CustLandingCommunityActivity
                blockTitle="Réaliser des scanlations (fan-traduction)"
                :image="translateIcon"
                imagesrc="translation icon"
                linkTitle="FAQ traductions"
                linkUrl="/about/faq"
            >
                Rendre accessible librement une adaptation française de la série (car aucun média n'est à ce jour
                officiellement traduit en français).
            </CustLandingCommunityActivity>
            <CustLandingCommunityActivity
                blockTitle="Soutenir les initiatives communautaires"
                :image="communityIcon"
                imagesrc="Community icon"
                linkTitle="Les projets de la commu"
                linkUrl="/about/projects"
            >
                Utiliser nos compétences pour aller plus loin que ce site, tel que le développement d'un bot discord ou
                d'un fangame.
            </CustLandingCommunityActivity>
        </div>

        <p class="mt-8 text-xl text-slate-500 font-medium mx-auto max-w-2xl pt-8 text-center">
            Nous cherchons toujours à évoluer en qualité, en réalisant chacune de nos créations manuellement (comme la
            programmation de ce site web). Et tout cela sans pub ni demandes de dons, car nous croyons que notre passion
            pour ce projet suffit.
        </p>
    </CoreContainer>
</template>
<script setup lang="ts">
    // @ts-ignore - asset import
    import socialIcon from "~/assets/img/landing/socialIcon.png";
    // @ts-ignore - asset import
    import translateIcon from "~/assets/img/landing/translateIcon.png";
    // @ts-ignore - asset import
    import communityIcon from "~/assets/img/landing/communityIcon.png";
</script>
