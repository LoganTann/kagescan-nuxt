<script setup lang="ts">
    const props = defineProps<{
        blockTitle: string;
        image: string;
        imagesrc: string;
        linkTitle: string;
        linkUrl: string;
    }>();
</script>
<template>
    <div class="flex items-start flex-row-reverse gap-4 lg:flex-col lg:gap-5">
        <img class="flex-none w-[3.25rem] md:w-16 lg:w-18 rounded-[50%]" :src="props.image" :alt="imagesrc"/>
        <div class="inline space-y-1 lg:space-y-4">
            <h3 class="font-bold text-default text-lg md:text-xl lg:text-2xl">
                {{ props.blockTitle }}
            </h3>
            <p class="text-gray-700 font-medium text-md md:text-lg lg:text-xl">
                <slot></slot>
            </p>

            <p class="text-start mt-4 text-base font-semibold">
                <NuxtLink class="group" :to="props.linkUrl">
                    <span>{{ props.linkTitle }}</span>
                    <FontAwesomeIcon icon="arrow-right" class="w-3 h-3 group-hover:translate-x-1 transition-all" />
                </NuxtLink>
            </p>
        </div>
    </div>
</template>
