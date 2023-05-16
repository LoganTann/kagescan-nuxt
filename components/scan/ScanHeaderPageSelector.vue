<template>
    <select class="px-2 sm:px-4 bg-white hover:bg-slate-100 transition-colors" v-model="currentPage">
        <option v-for="i in totalPages" :key="i" :value="i - 1">Page {{ i }}</option>
    </select>
</template>
<script setup lang="ts">
    const props = defineProps<{
        currentPageIndex: number;
        totalPages: number;
    }>();
    const emit = defineEmits(["setPage"]);

    const currentPage = ref(props.currentPageIndex);

    watch(
        () => props.currentPageIndex,
        (value) => {
            currentPage.value = value;
        }
    );

    watch(
        () => currentPage.value,
        (value) => {
            if (value !== props.currentPageIndex) {
                emit("setPage", value);
            }
        }
    );
</script>
