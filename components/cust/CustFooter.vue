<template>
    <CoreContainer>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 py-7 md:py-16">
            <div>
                <h4 class="text-xl font-medium hidden">Kagescan</h4>
                <p class="italic py-2">
                    N'oubliez pas que ce site est maintenu par des fans. Certaines informations peuvent êtres erronées ou
                    obsolètes.
                </p>
            </div>
            <div class="">
                <h4 class="text-xl font-medium">Voir aussi</h4>
                <ul class="text-gray-800">
                    <li>
                        <NuxtLink to="https://github.com/Kagescan" class="hover:underline"> Kagescan-cms </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="#" class="hover:underline"> Mentions légales </NuxtLink>
                    </li>
                </ul>
            </div>
            <div>
                <h4 class="text-xl font-medium">Sites liés</h4>
                <ul class="text-gray-800 ulGap">
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
                        <NuxtLink to="/fangame" class="hover:underline">Le fangame (projet inactif)</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="http://mekakushidan.com/" class="hover:underline"
                            >Site officiel du Kagerou Project (jp)</NuxtLink
                        >
                    </li>
                </ul>
            </div>
        </div>
    </CoreContainer>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
    .ulGap li {
        margin-top: 0.3rem;
    }
</style>
