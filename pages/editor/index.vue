<template>
    <div class="font-sans flex h-full">
        <div class="bg-neutral-50 flex flex-col min-w-60">
            <div class="flex p-2 items-center hoverable">
                <img
                    src="/kagescan.png"
                    alt="Kagescan icon"
                    class="w-8 h-8 rounded-sm"
                />
                <span class="ml-2">Kagescan Translation Workspace</span>
            </div>

            <ul>
                <li class="pl-4 hoverable">Planifications</li>
                <li class="pl-4 hoverable">Paramètres</li>
            </ul>
            <hr />
            <trs-dir-click-watcher>
                <trs-dirlisting v-if="state.allFiles"></trs-dirlisting>
                <span v-else>Files not loaded...</span>
            </trs-dir-click-watcher>

            <div class="pl-4">Version 2.0.0</div>
        </div>
        <trs-editor-container></trs-editor-container>
    </div>
</template>
<style lang="scss">
.hoverable {
    cursor: pointer;
}
.hoverable:hover,
.hoverable.active {
    background-color: rgba(55, 53, 47, 0.08);
}
.min-w-60 {
    min-width: 15rem;
    width: 15rem;
}
</style>
<script setup lang="ts">
import { useReactiveGlobalState } from "@/stores/trsEditorFiles";
const state = useReactiveGlobalState();

const { data: allFiles } = await useFetch("/api/getDirectoryListing");
state.allFiles.value = allFiles.value.novel_chapters;
</script>
