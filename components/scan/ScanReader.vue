<template>
    <div class="flex justify-center items-center flex-col cursor-pointer relative" @click="handlePageClick">
        <div
            id="previousPageOverlay"
            class="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-slate-400/30 to-slate-400/0 transition-opacity opacity-0 hover:opacity-100 flex"
        >
            <font-awesome-icon icon="fa-solid fa-circle-arrow-left" class="w-1/4 h-auto text-white/50 my-auto ml-5" />
        </div>
        <template v-for="mangaPage in visiblePages" :key="mangaPage.id">
            <NuxtImg
                v-if="mangaPage.isVisible || mangaPage.isPreloading"
                :src="mangaPage.src"
                :class="{ hidden: mangaPage.isPreloading }"
                :id="mangaPage.id"
                class="mangaPage max-h-[calc(100vh-5rem)]"
            ></NuxtImg>
        </template>
    </div>
</template>
<script setup lang="ts">
    import { MangaPage } from "~/server/api/scan/-getChapterPagesTypes";

    const props = defineProps<{
        images?: MangaPage[];
        currentPageIndex: Ref<number>;
    }>();

    const emits = defineEmits(["nextPage", "previousPage"]);

    const visiblePages = computed(() => {
        if (!props.images || props.images.length <= 0) {
            return [];
        }
        return props.images.map((page, i) => {
            const pageDistance = i - props.currentPageIndex.value;
            return {
                ...page,
                isVisible: pageDistance == 0,
                isPreloading: pageDistance > 0 && pageDistance < 5,
            };
        });
    });

    function handlePageClick(ev: MouseEvent) {
        if (ev.target instanceof Element && ev.target.id === "previousPageOverlay") {
            emits("previousPage");
        } else {
            emits("nextPage");
        }
    }
</script>
