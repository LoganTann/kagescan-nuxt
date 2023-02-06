<template>
    <pre>
        <!-- <NuxtLink :to="links.current._path">{{links.current.title}}</NuxtLink> -->
        {{ nav }}
    </pre>
</template>
<script setup lang="ts">
    const route = useRoute();
    const path = "anime/" + route.params.slug[0];
    const parentRoute = queryContent("anime/" + route.params.slug[0] + "/");
    const nav = await fetchContentNavigation(parentRoute);

    // const links = computed(() => {
    //     if (!nav) return [];
    //     // assumes no trailing slashes
    //     const currentIndex = nav.findIndex((val) => route.path == val._path);
    //     const previous = currentIndex - 1 < 0 ? null : nav[currentIndex - 1];
    //     const next = currentIndex + 1 >= nav.length ? null : nav[currentIndex - 1];
    //     const current = nav[currentIndex];

    //     return { previous, current, next };
    // });
</script>
<style scoped lang="scss"></style>
