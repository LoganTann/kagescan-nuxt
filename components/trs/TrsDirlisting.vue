<template>
    <div :style="depthStyleDef" data-component="trs-dirlisting">
        <div v-for="file in filesInDir" :key="file.id">
            <!-- File Element -->
            <div
                class="trs_filename"
                :data-do-change-file="file.id"
                :class="{ active: file.id === state.activeFile.value }"
            >
                <trs-dir-expand-btn :targeted-file="file"></trs-dir-expand-btn>
                <span>{{ file.filename }}</span>
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
                <span><span class="ml-4">*</span> Pas de fichiers enfants</span>
            </div>
        </div>
        <trs-btn-new-category :parentData="parentData"></trs-btn-new-category>
    </div>
</template>
<script setup lang="ts">
import { basicFileData } from "@/server/api/getDirectoryListing";
import { PropType, Ref } from "vue";
import { useReactiveGlobalState } from "@/stores/trsEditorFiles";

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

const state = useReactiveGlobalState();

// data :
const filesInDir = ref([]);
const parentData: Ref<basicFileData | null> = ref(null);
const depthStyleDef = `--depth: ${props.depth * 10 + 5}px;`;

function computeFilesInDir() {
    const _filesInDir = new Array();
    for (const file of state.allFiles.value) {
        if (file.parent === props.parent) {
            _filesInDir.push(file);
        }
        if (file.id === props.parent) {
            parentData.value = file;
        }
    }

    filesInDir.value = _filesInDir.sort((a, b) =>
        a.filename.localeCompare(b.filename)
    );
}
computeFilesInDir();
// watch allfiles
watch(
    () => state.allFiles.value,
    () => computeFilesInDir()
);

function getExpandingStatusOf(file: basicFileData) {
    if (!state.openedIds.value.has(file.id)) {
        return "closed";
    }
    if (file.hasChilds) {
        return "open";
    } else {
        return "no files";
    }
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
    cursor: pointer;

    & > span {
        padding-top: 2px;
        padding-bottom: 2px;
        padding-left: 2px;
    }
    &.active > span {
        @include defs.trs_use_filename_color_selected;
    }

    &:hover,
    &.active {
        @include defs.trs_use_selected_bg_color;
    }
}
</style>
