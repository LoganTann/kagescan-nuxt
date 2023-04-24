<template>
    <div @click="handleClick" class="cursor-pointer px-2 py-1 transition-colors hover:bg-slate-200">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
    const props = defineProps<{
        value: string;
    }>();
    const emits = defineEmits(["selected"]);
    function handleClick() {
        emits("selected", props.value);
    }
</script>
