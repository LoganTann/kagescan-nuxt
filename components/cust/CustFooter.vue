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
                <h4 class="text-xl font-medium">Voir aussi</h4>
                <ul class="text-gray-800 ulGap text-sm">
                    <li>
                        <NuxtLink to="/about/legal" class="hover:underline"> Mentions légales </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/about/faq" class="hover:underline"> FAQ traductions </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/fangame" class="hover:underline">Le fangame (projet inactif)</NuxtLink>
                    </li>
                </ul>
            </div>
            <div>
                <h4 class="text-xl font-medium">Sites liés</h4>
                <ul class="text-gray-800 ulGap text-sm">
                    <li>
                        <NuxtLink to="https://soup.kagescan.fr/" class="hover:underline">Redbeansoup supremacy</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="https://kagerouproject.fandom.com/fr/wiki/Kagerou_Project_Accueil"
                            class="hover:underline"
                            >Wiki français Kagerou Project</NuxtLink
                        >
                    </li>
                    <li>
                        <NuxtLink to="http://mekakushidan.com/" class="hover:underline"
                            >Site officiel du Kagerou Project (jp)</NuxtLink
                        >
                    </li>
                </ul>
            </div>
        </div>
        <p class="pb-7 md:pb-16 pt-4">
            <a href="#" class="inline-block transition-all transform hover:-translate-y-1">
                <font-awesome-icon class="w-3 h-3 inline" icon="fa-solid fa-chevron-up" />
                <span> Revenir en haut de la page </span>
            </a>
        </p>
    </CoreContainer>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
    .ulGap li {
        margin-top: 0.3rem;
    }
</style>
