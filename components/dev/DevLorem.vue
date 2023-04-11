<template>
    <div class="devLorem">
        <p v-for="i in countRange" :key="i">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi perferendis quibusdam, delectus doloremque,
            molestiae culpa ab provident, quis inventore quas vitae tenetur odit ipsam possimus impedit obcaecati aperiam
            porro quisquam.
        </p>
    </div>
</template>
<script setup lang="ts">
    const props = defineProps<{
        count?: string;
    }>();

    const countRange = computed(() => {
        const count = Number(props.count);
        if (Number.isFinite(count) && count > 0) {
            return Array(count);
        }
        return Array(1);
    });
</script>
