<template>
    <div class="text-center">
        <CoreButton variant="large" :to="next.to">
            {{ next.text }}
        </CoreButton>
    </div>
</template>
<script setup lang="ts">
    import type { NovelVolumeApiResponse } from "~/server/api/novel/getVolumeData.get";

    const props = defineProps<{
        currentVolumeData: NovelVolumeApiResponse | null;
    }>();
    const route = useRoute();

    const next = computed(() => {
        const chapters = props.currentVolumeData?.chapters;
        if (!chapters) {
            return {
                to: "../",
                text: "Accueil",
            };
        }
        const currentChapterIndex = 1 + chapters.findIndex((chapter) => chapter.path === route.path);
        const nextChapter = chapters[currentChapterIndex];
        if (nextChapter) {
            return {
                to: nextChapter.path,
                text: "Chapitre suivant : ".concat(nextChapter.title),
            };
        }
        if (props.currentVolumeData.nextVolume) {
            return {
                to: props.currentVolumeData.nextVolume.path,
                text: "Volume suivant : ".concat(props.currentVolumeData.nextVolume.title),
            };
        }
        return {
            to: "../",
            text: "Accueil",
        };
    });
</script>
<style scoped lang="scss"></style>
