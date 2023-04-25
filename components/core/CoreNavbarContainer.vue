<template>
    <nav class="bg-white/75 shadow-sm" :class="navClasses">
        <CoreContainer class="flex items-center h-20">
            <div class="flex items-center flex-1 justify-center md:justify-start">
                <NuxtLink to="/">
                    <img
                        class="h-16 mr-4 md:h-18 lg:mr-0"
                        src="~/assets/img/core/kagescan_logo.png"
                        alt="Kagescan logo"
                    />
                </NuxtLink>
            </div>
            <CoreNavbarFloatingLinks class="h-full hidden md:flex items-center justify-center"></CoreNavbarFloatingLinks>
        </CoreContainer>
    </nav>
</template>
<script setup lang="ts">
    const props = defineProps<{
        notSticky?: boolean;
    }>();

    const navClasses = computed(() => {
        if (props.notSticky) {
            return "";
        }
        return "sticky top-0 z-30 backdrop-blur-md";
    });
</script>
