<script setup lang="ts">
    const props = defineProps<{
        blockTitle: string;
        image: string;
    }>();
</script>
<template>
    <div class="flex items-start flex-row-reverse gap-4 lg:flex-col lg:gap-5">
        <img class="flex-none w-[3.25rem] md:w-16 lg:w-18 rounded-[50%]" :src="props.image" />
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
