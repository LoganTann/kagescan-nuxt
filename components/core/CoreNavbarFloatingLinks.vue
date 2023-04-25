<template>
    <nav>
        <div v-for="section in menu" v-bind:key="section.sectionName" class="relative group">
            <div class="px-2 pr-6 py-2 group-hover:text-teal-600 flex items-center">
                <span class="pr-1 whitespace-nowrap">{{ section.sectionName }}</span>
                <svg
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-4 w-4 text-gray-300 fill-none"
                >
                    <g transform="rotate(90 12 12)"><path d="M9 5l7 7-7 7"></path></g>
                </svg>
            </div>
            <div class="pt-2 absolute top-full left-1/2 -translate-x-1/2">
                <div class="hidden group-hover:grid rounded-lg shadow bg-slate-100 w-max grid-cols-1 p-2">
                    <NuxtLink
                        v-for="link in section.sectionData"
                        v-bind:key="link.to"
                        :to="link.to"
                        class="flex items-center p-2 hover:bg-slate-200 rounded-md"
                    >
                        <div class="rounded w-8 h-8 p-2 bg-teal-600">
                            <CoreIconBubble></CoreIconBubble>
                        </div>
                        <div class="pl-2">{{ link.name }}</div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </nav>
</template>
<script setup>
    const menu = ref([
        {
            sectionName: "Découvrir",
            sectionData: [
                { to: "/about/kagerou_project", name: "Kagerou Project" },
                { to: "/about/kagescan", name: "Kagescan" },
                { to: "/about/projects", name: "Projets transverses" },
            ],
        },
        {
            sectionName: "Regarder",
            sectionData: [
                { to: "/scan", name: "Le manga" },
                { to: "/anime/mekakucity-actors/01_jinzou-enemy", name: "L'animé" },
                { to: "/novel", name: "Le roman" },
                { to: "/music", name: "Les musiques" },
            ],
        },
        {
            sectionName: "Explorer",
            sectionData: [
                { to: "/discord", name: "Notre discord" },
                { to: "https://twitter.com/KagerouDaysFr/", name: "Notre twitter" },
                { to: "https://kagerouproject.fandom.com/wiki/fr", name: "Le wiki français" },
            ],
        },
    ]);
</script>
<style scoped lang="scss"></style>
