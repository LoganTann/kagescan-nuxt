<template>
    <video controls :poster="props.poster" class="aspect-video w-full bg-slate-100 rounded-sm">
        <source :src="url" />
    </video>
</template>
<script setup lang="ts">
    const props = defineProps<{
        url: string;
        poster: string;
    }>();
</script>
<style scoped lang="scss"></style>
