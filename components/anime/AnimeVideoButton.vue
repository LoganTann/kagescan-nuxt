<template>
    <nuxt-link
        :to="props.episode.path"
        :title="props.episode.title"
        class="py-2 hover:bg-slate-100 transition-colors"
        :class="{ 'shadow bg-slate-100': props.isActive }"
        ref="currentElement"
    >
        <div class="flex">
            <div>
                <nuxt-img width="100" height="56" :src="props.episode.thumb"></nuxt-img>
            </div>
            <div class="px-2">
                <p class="text-sm text-ellipsis font-semibold">{{ props.episode.title }}</p>
                <p class="text-xs uppercase">{{ props.episode.subtitle }}</p>
            </div>
        </div>
    </nuxt-link>
</template>
<script setup lang="ts">
    import { VueElement } from "vue";
    import { ComponentPublicInstance } from "vue";
    import { type AnimeSerieVideoNode } from "~/composables/useAnime";

    const currentElement = ref<ComponentPublicInstance | null>(null);
    const props = defineProps<{
        episode: AnimeSerieVideoNode;
        isActive?: boolean;
    }>();
    const emit = defineEmits(["receiveActive"]);

    onMounted(() => {
        if (props.isActive && currentElement.value) {
            const domElement = currentElement.value.$el as VueElement;
            if (domElement.parentElement) {
                emit("receiveActive", {
                    relativeScrollPos: domElement.offsetTop - domElement.parentElement.offsetTop
                })
            }
        }
    });
</script>
<style scoped lang="scss"></style>
