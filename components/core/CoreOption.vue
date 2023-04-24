<template>
    <option value="props.value" :selected="selected">
        <slot></slot>
    </option>
</template>
<script setup lang="ts">
    const props = defineProps<{
        value: string;
        selected?: boolean;
    }>();
</script>
