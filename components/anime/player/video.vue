<template>
    <video controls :poster="props.poster">
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
