<script setup lang="ts">
    const props = defineProps<{
        blockTitle: string;
    }>();
</script>
<template>
    <div class="flex items-start flex-row-reverse gap-8 lg:flex-col lg:gap-9">
        <svg class="flex-none w-[3.25rem] md:w-16 lg:w-18" viewBox="0 0 185 185" xmlns="http://www.w3.org/2000/svg">
            <circle class="fill-black" cx="92.5" cy="92.5" r="92.5"></circle>
        </svg>
        <div class="inline space-y-1 lg:space-y-4">
            <h3 class="font-bold text-default text-lg md:text-xl lg:text-2xl">
                {{ props.blockTitle }}
            </h3>
            <p class="text-gray-700 font-medium text-md md:text-lg lg:text-xl">
                <slot></slot>
            </p>
        </div>
    </div>
</template>
