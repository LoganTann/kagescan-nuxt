<template>
    <CoreIconBubble v-if="props.icon === icons.bubble"></CoreIconBubble>
</template>
<script setup lang="ts">
import { CoreIcons, icons } from './CoreIcons';

    const props = defineProps<{
        icon: CoreIcons
    }>();
</script>
<style scoped lang="scss">
    
</style>