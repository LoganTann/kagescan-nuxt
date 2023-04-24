<template>
    <div
        class="cursor-pointer inline-flex relative select-none rounded-lg shadow bg-slate-100 p-2 min-w-[14rem] transition-all border border-slate-100 hover:border-teal-400"
        :class="{ 'border-teal-400 shadow-inner': isActive }"
        v-click-outside
        @click="handleOpenPicklist"
    >
        <div class="">
            <slot name="title">Select</slot>
        </div>
        <div
            class="transition-all cursor-default flex flex-col absolute top-full left-0 w-full max-h-120 bg-slate-100 rounded-lg shadow-md py-2 border border-slate-300 mt[-1rem] opacity-0"
            :class="{ 'mt-1 opacity-100': isActive }"
            ref="floatingEl"
        >
            <slot v-if="isActive"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { VueElement } from "vue";

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
        if (floatingEl.value && waiting.value === false) {
            console.log("called from handleCLickGlobal");
            const { top, left, right, bottom } = floatingEl.value.getBoundingClientRect();
            if (ev.clientX < left || ev.clientX > right || ev.clientY < top || ev.clientY > bottom) {
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
