<template>
    <div class="flex justify-center items-center flex-col">
        <template v-for="mangaPage in visiblePages" :key="mangaPage.id">
            <NuxtImg
                v-if="mangaPage.isVisible || mangaPage.isPreloading"
                :src="mangaPage.src"
                :class="{ hidden: mangaPage.isPreloading }"
                :id="mangaPage.id"
                class="mangaPage max-h-[calc(100vh-5rem)]"
                @click="nextPage"
            ></NuxtImg>
        </template>
    </div>
</template>
<script setup lang="ts">
    import { MangaPage } from '~/server/api/scan/-getChapterPagesTypes';

    const props = defineProps<{
        images?: MangaPage[],
        currentPage: string
    }>();

    const emits = defineEmits(["nextPage"]);

    const visiblePages = computed(() => {
        if (!props.images || props.images.length <= 0) {
            return [];
        }
        return props.images.map((page, i) => {
            const pageDistance = i + 1 - Number(props.currentPage);
            return {
                ...page,
                isVisible: pageDistance == 0,
                isPreloading: pageDistance > 0 && pageDistance < 5,
            };
        });
    });

    function nextPage() {
        emits("nextPage");
    }
</script>