<template>
    <CoreIconBubble v-if="props.icon === icons.bubble"></CoreIconBubble>
    <CoreIconChevronDown v-else-if="props.icon === icons.chevronDown"></CoreIconChevronDown>
</template>
<script setup lang="ts">
    import { CoreIcons, icons } from "./CoreIcons";

    const props = defineProps<{
        icon: CoreIcons;
    }>();
</script>
<style scoped lang="scss"></style>
