<template>
    <CoreContainer>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-7 md:pt-16">
            <div>
                <h4 class="text-xl font-medium hidden">Kagescan</h4>
                <p class="italic py-2">
                    Ce site est maintenu par des fans : certaines informations peuvent êtres erronées ou obsolètes.
                </p>
            </div>
            <div class="">
                <h4 class="text-base font-medium">Voir aussi</h4>
                <ul class="text-gray-800 text-sm pt-1">
                    <li v-for="link in links.seeAlso" class="mt-2">
                        <NuxtLink :to="link.link" class="hover:underline p-1">
                            {{ link.name }}
                            <CoreIconExternal :autodetect="link.link"></CoreIconExternal>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
            <div>
                <h4 class="text-base font-medium">Sites liés</h4>
                <ul class="text-gray-800 text-sm pt-1">
                    <li v-for="link in links.relatedSites" class="mt-2">
                        <NuxtLink :to="link.link" class="hover:underline p-1">
                            {{ link.name }}
                            <CoreIconExternal :autodetect="link.link"></CoreIconExternal>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
        <p class="pb-7 md:pb-16 pt-4">
            <a href="#" class="inline-block transition-all transform hover:-translate-y-1">
                <span>
                    <font-awesome-icon class="w-3 h-3 inline" icon="fa-solid fa-chevron-up" />
                </span>
                Revenir en haut de la page
            </a>
        </p>
    </CoreContainer>
</template>
<script setup lang="ts">
    const links = {
        seeAlso: [
            {
                name: "Mentions légales",
                link: "/about/legal",
            },
            {
                name: "FAQ traductions",
                link: "/about/faq",
            },
            {
                name: "Le fangame (projet inactif)",
                link: "/fangame",
            },
        ],
        relatedSites: [
            {
                name: "Redbeansoup supremacy",
                link: "https://soup.kagescan.fr/",
            },
            {
                name: "Wiki français Kagerou Project",
                link: "https://kagerouproject.fandom.com/fr/wiki/Kagerou_Project_Accueil",
            },
            {
                name: "Site officiel du Kagerou Project (jp)",
                link: "http://mekakushidan.com/",
            },
        ],
    };
</script>
