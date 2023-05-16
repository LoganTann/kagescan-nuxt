<template>
    <div class="bg-white border-teal-200 border-y">
        <CoreContainer class="flex items-stretch justify-center h-full">
            <slot></slot>
            <div class="border-l border-slate-200 mx-2 my-2"></div>
            <button class="hover:bg-slate-100 transition-colors px-2">
                <CoreIconGalleryThumb class="w-8 h-8 fill-slate-800"></CoreIconGalleryThumb>
            </button>
            <button class="hover:bg-slate-100 transition-colors px-2">
                <font-awesome-icon icon="fa-solid fa-gear" class="w-6 h-6 mx-1 text-slate-800" />
            </button>
        </CoreContainer>
    </div>
</template>
<script setup lang="ts"></script>
