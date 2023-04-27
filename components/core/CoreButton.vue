<template>
    <NuxtLink
        class="ml-2 px-4 bg-teal-600 text-white hover:bg-teal-700 rounded-[.25rem] align-bottom inline-flex justify-center items-center select-none no-underline"
        :class="{ 'h-8': props.variant === undefined, 'h-12 px-8': props.variant === 'large' }"
        :to="props.to"
    >
        <span v-if="props.icon" class="mr-2">
            <CoreIconContainer :icon="props.icon"></CoreIconContainer>
        </span>
        <span :class="{ 'text-sm': props.variant === undefined, 'font-medium': props.variant === 'large' }">
            <slot></slot>
        </span>
    </NuxtLink>
</template>
<script setup lang="ts">
    import { type CoreIcons } from "./icon/-CoreIcons";
    const props = defineProps<{
        icon?: CoreIcons;
        variant?: "large";
        to?: string;
    }>();
</script>
<style scoped lang="scss"></style>
