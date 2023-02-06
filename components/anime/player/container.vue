<template>
    <AnimePlayerVideo v-if="props.toPlay.player == 'video'" :url="props.toPlay.url"></AnimePlayerVideo>
    <div v-else>Erreur : {{ props.toPlay.player }} n'est pas un player valide</div>
</template>
<script setup lang="ts">
    const props = defineProps<{
        toPlay: {
            player: string;
            url: string;
        };
    }>();
</script>
<style scoped lang="scss"></style>
