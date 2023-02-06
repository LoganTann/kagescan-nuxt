<template>
    <video controls>
        <source :src="url" />
    </video>
</template>
<script setup lang="ts">
    const props = defineProps<{
        url: string;
    }>();
</script>
<style scoped lang="scss"></style>
