<template>
    <footer class="flex flex-col bg-gray-100 z-10">
        <CustFooter></CustFooter>
        <div class="p-2 text-center border-t border-gray-300">
            Powered by
            <NuxtLink to="/kagescan-cms" class="group">
                <span class="group-hover:underline">Kagescan-cms</span>
                <span
                    class="font-mono border rounded border-gray-400 bg-gray-200 text-sm p-1 px-2 scale-75 inline-block"
                >
                    2.0-b1
                </span>
            </NuxtLink>
        </div>
    </footer>
</template>
