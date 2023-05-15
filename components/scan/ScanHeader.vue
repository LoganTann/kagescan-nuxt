<template>
    <div class="bg-white flex">
        <CoreContainer>
            <slot></slot>
        </CoreContainer>
    </div>
</template>
<script setup lang="ts">
    import { MangaPage } from "~/server/api/scan/-getChapterPagesTypes";    
</script>
