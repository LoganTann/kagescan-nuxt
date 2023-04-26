<template>
    <div class="sticky top-0 bg-white z-30">
        <CoreContainer class="flex">
            <NuxtLink to="../" class="hover:bg-slate-100 hidden sm:inline-flex items-center px-2 transition-colors">
                <span>{{ props.currentVolumeData?.serieName }}</span>
            </NuxtLink>
            <div class="mx-2 self-center hidden sm:block">
                <CoreIconContainer icon="chevronDown" class="-rotate-90"></CoreIconContainer>
            </div>
            <div>
                <CoreDropdownContainer :is-dropdown="true" class="">
                    <template #title>
                        <div
                            class="flex items-center px-2 py-2 hover:bg-slate-100 transition-colors font-semibold min-w-[20rem]"
                        >
                            <nuxt-img :src="props.currentVolumeData?.currentVolume.cover" :width="30"></nuxt-img>
                            <p class="px-2">{{ props.currentVolumeData?.currentVolume.title }}</p>
                            <div class="grow"></div>
                            <CoreIconContainer icon="chevronDown" class="inline"></CoreIconContainer>
                        </div>
                    </template>
                    <template #default>
                        <div class="bg-white flex flex-col shadow border">
                            <div class="px-4 py-2 text-center text-sm text-slate-700">Table des matières</div>
                            <div class="flex flex-col font-semibold text-sm overflow-y-scroll max-h-52">
                                <NuxtLink
                                    v-for="chapter in chapters"
                                    :key="chapter.id"
                                    :to="chapter.path"
                                    class="px-4 py-2 bg-slate-50 hover:bg-slate-100 transition-all border-t border-slate-200"
                                    :class="{
                                        'shadow-inner text-teal-400 border-l-4 border-l-teal-400':
                                            chapter.path === route.path,
                                    }"
                                >
                                    {{ chapter.title }}
                                </NuxtLink>
                            </div>
                            <div class="text-center text-sm text-slate-700 grid grid-cols-2">
                                <div class="hover:bg-slate-100 p-2 transition-colors">
                                    <NuxtLink
                                        v-if="props.currentVolumeData?.previousVolume"
                                        :to="props.currentVolumeData.previousVolume.path"
                                    >
                                        <p>
                                            <CoreIconContainer
                                                icon="chevronDown"
                                                class="inline rotate-90 scale-75"
                                            ></CoreIconContainer>
                                            Volume précédent
                                        </p>
                                        <nuxt-img
                                            :src="props.currentVolumeData.previousVolume.cover"
                                            :width="50"
                                            class="my-2 mx-auto"
                                        ></nuxt-img>
                                        <p class="text-xs">{{ props.currentVolumeData.previousVolume.title }}</p>
                                    </NuxtLink>
                                    <NuxtLink v-else to="../" class="h-full flex items-center">
                                        Accueil : {{ props.currentVolumeData?.serieName }}
                                    </NuxtLink>
                                </div>
                                <div class="hover:bg-slate-100 p-2 transition-colors">
                                    <NuxtLink
                                        v-if="props.currentVolumeData?.nextVolume"
                                        :to="props.currentVolumeData.nextVolume.path"
                                    >
                                        <p>
                                            Volume suivant
                                            <CoreIconContainer
                                                icon="chevronDown"
                                                class="inline -rotate-90 scale-75"
                                            ></CoreIconContainer>
                                        </p>
                                        <nuxt-img
                                            :src="props.currentVolumeData.nextVolume.cover"
                                            :width="50"
                                            class="my-2 mx-auto"
                                        ></nuxt-img>
                                        <p class="text-xs">{{ props.currentVolumeData.nextVolume.title }}</p>
                                    </NuxtLink>
                                    <NuxtLink v-else to="../" class="h-full flex items-center">
                                        Accueil : {{ props.currentVolumeData?.serieName }}
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </template>
                </CoreDropdownContainer>
            </div>
        </CoreContainer>
    </div>
</template>
<script setup lang="ts">
    import { type NovelVolumeApiResponse } from "~/server/api/novel/getVolumeData.get";

    const route = useRoute();

    const props = defineProps<{
        currentVolumeData: NovelVolumeApiResponse | null;
    }>();

    const chapters = computed(() => {
        if (!props.currentVolumeData) {
            return [];
        }
        return props.currentVolumeData.chapters;
    });
</script>
<style scoped lang="scss">
    div.fixed::before {
        height: 64px;
        content: "";
        display: block;
    }
</style>
