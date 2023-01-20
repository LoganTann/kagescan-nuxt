<template>
    <nav class="bg-white/75 sticky top-0 z-30 backdrop-blur-md">
        <div class="flex items-center h-20 mx-auto md:w-11/12 lg:w-9/12 max-w-7xl px-1 sm:px-3 md:px-10">
            <div class="flex items-center flex-1 justify-center md:justify-start">
                <NuxtLink to="">
                    <img
                        class="h-16 mr-4 md:h-18 lg:mr-0"
                        src="~/assets/img/core/kagescan_logo.png"
                        alt="Kagescan logo"
                    />
                </NuxtLink>
            </div>
            <CoreNavbarFloatingLinks class="h-full hidden md:flex items-center justify-center"></CoreNavbarFloatingLinks>
            <!--<div class="md:flex-1 flex items-center justify-end"> -->
            <!-- Est-ce qu'il y aura un truc ici un jour ? 
            </div>-->
        </div>
    </nav>
</template>
