<template>
    <div
        class="cursor-pointer inline-flex relative select-none transition-all"
        v-click-outside
        @click="handleOpenPicklist"
    >
        <div class="">
            <slot name="title">Select</slot>
        </div>
        <div
            class="transition-all cursor-default absolute z-30 top-full left-0 w-full mt[-1rem] opacity-0"
            :class="{ 'mt-1 opacity-100': isActive }"
            ref="floatingEl"
        >
            <slot v-if="isActive"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { VueElement } from "vue";

    const props = defineProps<{
        isDropdown: boolean;
    }>();
    const { waiting } = useDebounce(150);
    const isActive = ref(false);
    const floatingEl = ref<VueElement | null>(null);

    async function handleOpenPicklist() {
        if (!isActive.value) {
            isActive.value = true;
            waiting.value = true;
        }
    }
    const handleClickGlobal = (ev: MouseEvent) => {
        // waiting value prevents calling after handleOpenPicklist
        if (isActive.value && waiting.value === false) {
            if (props.isDropdown && floatingEl.value) {
                const { top, left, right, bottom } = floatingEl.value.getBoundingClientRect();
                if (ev.clientX < left || ev.clientX > right || ev.clientY < top || ev.clientY > bottom) {
                    isActive.value = false;
                }
            } else {
                isActive.value = false;
            }
        }
    };

    const vClickOutside = {
        mounted() {
            document.addEventListener("click", handleClickGlobal);
        },
        unmounted() {
            document.removeEventListener("click", handleClickGlobal);
        },
    };
</script>
<style scoped lang="scss">
    .transition-all {
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
    }
</style>
