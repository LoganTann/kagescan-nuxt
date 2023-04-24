<template>
    <button
        class="ml-2 px-4 h-8 bg-teal-600 text-white hover:bg-teal-700 rounded-[.25rem] align-bottom inline-flex justify-center items-center"
    >
        <span v-if="props.icon" class="mr-2">
            <CoreIconContainer :icon="props.icon"></CoreIconContainer>
        </span>
        <span class="text-sm">
            <slot></slot>
        </span>
    </button>
</template>
<script setup lang="ts">
    import { CoreIcons } from "./icon/CoreIcons";

    const props = defineProps<{
        icon?: CoreIcons;
    }>();
</script>
<style scoped lang="scss"></style>
