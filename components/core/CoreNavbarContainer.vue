<template>
    <div role="banner" class="bg-white/75 shadow-sm" :class="navClasses">
        <CoreContainer class="flex items-center h-20">
            <div class="flex items-center flex-1 justify-center md:justify-start">
                <CustLogo />
            </div>
            <CustNavbarLinks class="h-full hidden md:flex items-center justify-center"></CustNavbarLinks>
        </CoreContainer>
    </div>
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
