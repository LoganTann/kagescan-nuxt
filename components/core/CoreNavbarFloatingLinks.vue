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
            <div class="pt-2 absolute top-full left-1/2 -translate-x-1/2 z-40">
                <div class="hidden group-hover:grid rounded-lg shadow bg-slate-100 w-max grid-cols-1 p-2">
                    <NuxtLink
                        v-for="link in section.sectionData"
                        v-bind:key="link.to"
                        :to="link.to"
                        class="flex items-center p-2 hover:bg-slate-200 rounded-md"
                    >
                        <div
                            class="rounded w-8 h-8 bg-teal-600 flex justify-center items-center"
                            :style="`background: ${link.color}`"
                        >
                            <font-awesome-icon class="w-4 h-4 text-white" :icon="link.icon" />
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
                {
                    to: "/about/kagerou_project",
                    name: "Kagerou Project",
                    icon: "fa-solid fa-star",
                    color: "#0891b2",
                },
                {
                    to: "/about/kagescan",
                    name: "Kagescan",
                    icon: "fa-solid fa-globe",
                    color: "#06b6d4",
                },
                { to: "/about/projects", name: "Projets transverses", icon: "fa-solid fa-pen-nib", color: "#22d3ee" },
            ],
        },
        {
            sectionName: "Regarder",
            sectionData: [
                { to: "/scan", name: "Le manga", icon: "fa-solid fa-comments", color: "#0d9488" },
                { to: "/anime", name: "L'animé", icon: "fa-solid fa-circle-play", color: "#14b8a6" },
                { to: "/novel", name: "Le roman", icon: "fa-solid fa-book", color: "#2dd4bf" },
                { to: "/music", name: "Les musiques", icon: "fa-solid fa-compact-disc", color: "#5eead4" },
            ],
        },
        {
            sectionName: "Explorer",
            sectionData: [
                { to: "/discord", name: "Le discord", icon: "fa-brands fa-discord", color: "#404eed" },
                {
                    to: "https://kagerouproject.fandom.com/wiki/fr",
                    name: "Le wiki français",
                    icon: "fa-solid fa-fire",
                    color: "#fa005a",
                },
                {
                    to: "https://twitter.com/KagerouDaysFr/",
                    name: "Notre twitter",
                    icon: "fa-brands fa-twitter",
                    color: "#1d9bf0",
                },
                {
                    to: "https://www.instagram.com/kagerouproject_fr/",
                    name: "Notre insta",
                    icon: "fa-brands fa-instagram",
                    color: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                },
                {
                    to: "https://youtube.com/Kagescanfr",
                    name: "La chaîne YT",
                    icon: "fa-brands fa-youtube",
                    color: "#ff0101",
                },
            ],
        },
    ]);
</script>
<style scoped lang="scss"></style>
