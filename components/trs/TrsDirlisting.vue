<template>
    <div :style="depthStyleDef" data-component="trs-dirlisting">
        <div v-for="file in filesInDir" :key="file.id">
            <!-- File Element -->
            <div
                class="trs_filename"
                :class="{ active: file.id === state.activeFile }"
            >
                <trs-dir-expand-btn :targeted-file="file"></trs-dir-expand-btn>
                <span @click="handleChangeDoc(file.id)">{{
                    file.filename
                }}</span>
            </div>
            <!-- Its childrens -->
            <trs-dirlisting
                v-if="getExpandingStatusOf(file) === 'open'"
                :parent="file.id"
                :depth="props.depth + 1"
            ></trs-dirlisting>
            <div
                v-if="getExpandingStatusOf(file) === 'no files'"
                class="trs_filename"
            >
                <span>Pas de fichiers enfants</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { basicFileData } from "@/server/api/getDirectoryListing";
import { PropType } from "vue";
import { useGlobalState, openedIds_has } from "@/stores/trsEditorFiles";

const props = defineProps({
    parent: {
        type: Number,
        required: false,
        default: -1,
    },
    depth: {
        type: Number,
        required: false,
        default: 0,
    },
});
const state = useGlobalState();

// data :
const filesInDir = ref([]);
const depthStyleDef = `--depth: ${props.depth * 10 + 5}px;`;

function computeFilesInDir() {
    filesInDir.value = state.value.allFiles
        .filter((file) => file.parent === props.parent)
        .sort((a, b) => a.filename.localeCompare(b.filename));
}
computeFilesInDir();
// watch allfiles
watch(
    () => state.value.allFiles,
    () => computeFilesInDir()
);

function getExpandingStatusOf(file: basicFileData) {
    if (!openedIds_has(state, file.id)) {
        return "closed";
    }
    if (file.hasChilds) {
        return "open";
    } else {
        return "no files";
    }
}

function handleChangeDoc(id: number) {
    state.value.activeFile = id;
    console.log("active file changed", id);
}
function handleLeftClick(e: MouseEvent) {
    console.log("e right", e);
}
function handleRightClick(e: MouseEvent) {
    console.log("e left", e);
}
</script>

<style lang="scss">
@use "assets/css/defs.scss";

.trs_filename {
    @include defs.trs_use_filename_color;
    @include defs.trs_use_filename_font-size;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: lighter;
    font-size: 14px;
    font-weight: 500;
    border-radius: 2px;
    padding-left: var(--depth);
}
.trs_filename > span {
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 2px;
}
.trs_filename:hover,
.trs_filename.active {
    @include defs.trs_use_selected_bg_color;
}
</style>
