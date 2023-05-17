<template>
    <NuxtLink
        class="ml-2 px-4 bg-teal-600 text-white hover:bg-teal-700 rounded-[.25rem] align-bottom inline-flex justify-center items-center select-none no-underline"
        :class="{
            'h-8': props.variant === undefined,
            'h-12 pr-8 pl-7': props.variant === 'large',
            'h-8 lg:h-12 lg:pr-8 lg:pl-7': props.variant === 'lg:large',
        }"
        :to="props.to"
    >
        <span v-if="props.icon" class="mr-2">
            <font-awesome-icon class="w-4 h-4" :icon="props.icon"></font-awesome-icon>
        </span>
        <span
            :class="{
                'text-sm': props.variant === undefined,
                'font-medium': props.variant === 'large',
                'text-sm lg:text-base lg:font-medium': props.variant === 'lg:large',
            }"
        >
            <slot></slot>
        </span>
    </NuxtLink>
</template>
<script setup lang="ts">
    const props = defineProps<{
        icon?: string;
        variant?: "large" | "lg:large";
        to?: string;
    }>();
</script>
<style scoped lang="scss"></style>
