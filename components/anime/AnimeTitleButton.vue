<template>
    <div
        class="p-3 mb-3 cursor-pointer flex items-center max-h-32 border-t border-b hover:bg-slate-50 transition-colors"
        :class="{ 'bg-slate-50 shadow-inner': props.isActive }"
    >
        <div>
            <nuxt-img :src="poster" :height="80"></nuxt-img>
        </div>

        <div class="px-3 grow">
            <p class="font-semibold underline text-lg">{{ props.title }}</p>
            <p>{{ props.subtitle }}</p>
        </div>
        <div>
            <font-awesome-icon icon="fa-solid fa-chevron-down" class="fill-slate-800 transition-transform duration-300 w-4 h-4"/>
        </div>
    </div>
</template>
<script setup lang="ts">
    const props = defineProps<{
        title?: string;
        subtitle?: string;
        poster?: string;
        isActive?: boolean;
    }>();
</script>
<style scoped lang="scss"></style>
