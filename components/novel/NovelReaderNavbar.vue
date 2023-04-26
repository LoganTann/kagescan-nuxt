<template>
    <div class="flex sticky">
        <div>
            {{ props.currentVolumeData?.serieName }}
        </div>
        <div>
            <CoreIconContainer icon="chevronDown"></CoreIconContainer>
        </div>
        <div>
            <CoreCustSelect :is-dropdown="true">
                <template #title>
                    {{ props.currentVolumeData?.currentVolume.title }}
                </template>
                <template #default>
                    <NuxtLink
                        v-for="chapter in chapters"
                        :key="chapter.id"
                        :to="chapter.path"
                        @selected="handleChangeChapter"
                    >
                        {{ chapter.number }}. {{ chapter.title }}
                    </NuxtLink>
                </template>
            </CoreCustSelect>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { type NovelVolumeApiResponse } from "~/server/api/novel/getVolumeData.get";

    const route = useRoute();

    const props = defineProps<{
        currentVolumeData: NovelVolumeApiResponse | null;
    }>();

    const chapters = computed(() => {
        if (!props.currentVolumeData) {
            return [];
        }
        return props.currentVolumeData.chapters.map((chapter, i) => ({ ...chapter, number: i + 1 }));
    });

    function handleChangeChapter(ev) {
        console.log(ev);
    }
</script>
<style scoped lang="scss"></style>
