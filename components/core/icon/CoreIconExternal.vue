<template>
    <font-awesome-icon
        v-if="!autodetect || autodetect.startsWith('http')"
        class="ml-1 text-gray-400"
        icon="fa-solid fa-arrow-up-right-from-square"
        size="2xs"
        style="vertical-align: 0"
    />
</template>
<script setup lang="ts">
    const props = defineProps<{
        autodetect?: string;
    }>();
</script>
