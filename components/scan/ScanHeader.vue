<template>
    <div class="bg-white border-teal-200 border-y">
        <CoreContainer class="flex items-stretch justify-center h-full">
            <slot></slot>
            <div class="border-l border-slate-200 mx-2 my-2"></div>

            <button class="transition-colors px-2 opacity-30" disabled title='Coming soon: "miniatures"'>
                <CoreIconGalleryThumb class="w-8 h-8 fill-slate-800"></CoreIconGalleryThumb>
            </button>
            <button class="transition-colors px-2 opacity-30" disabled title='Coming soon: "paramètres"'>
                <font-awesome-icon icon="fa-solid fa-gear" class="mx-1 text-slate-800" size="lg"/>
            </button>
        </CoreContainer>
    </div>
</template>
<script setup lang="ts"></script>
