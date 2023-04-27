<template>
    <CoreIconBubble v-if="props.icon === icons.bubble"></CoreIconBubble>
    <CoreIconChevronDown v-else-if="props.icon === icons.chevronDown"></CoreIconChevronDown>
</template>
<script setup lang="ts">
    import { icons } from "./-CoreIcons";
    import type { CoreIcons } from "./-CoreIcons";

    const props = defineProps<{
        icon: CoreIcons;
    }>();
</script>
<style scoped lang="scss"></style>
