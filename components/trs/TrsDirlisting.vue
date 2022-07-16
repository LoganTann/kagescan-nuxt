<template>
    <div :data-depth="props.depth">
        <div v-for="file in filesInDir" :key="file.id">
            <div
                class="trs_filename"
                :class="{ active: file.id === activeFile }"
            >
                <trs-dir-expand-btn
                    :targeted-file="file"
                    :opened-ids="openedIds"
                    @dir-expand-state-change="handleDirExpandChange"
                ></trs-dir-expand-btn>
                <span @click="handleChangeDoc(file.id)">{{ file.title }}</span>
            </div>
            <trs-dirlisting
                v-if="openedIds.has(file.id)"
                :all-files="allFiles"
                :parent="file.id"
                :active-file="props.activeFile"
                :depth="props.depth + 1"
                @change-doc="handleChangeDoc"
            ></trs-dirlisting>
        </div>
    </div>
</template>
<script setup lang="ts">
import { basicFileData } from "@/server/api/getDirectoryListing";
import { PropType } from "vue";

const props = defineProps({
    allFiles: {
        type: Array as PropType<basicFileData[]>,
        required: true,
        default: () => [{ id: 0, title: "error", parent: -1 }],
    },
    parent: {
        type: Number,
        required: false,
        default: -1,
    },
    activeFile: {
        type: Number,
        required: true,
        default: -1,
    },
    depth: {
        type: Number,
        required: false,
        default: 0,
    },
});
const emit = defineEmits(["changeDoc"]);

// data :
const filesInDir = ref([]);
const openedIds = ref(new Set<number>());

function computeFilesInDir() {
    filesInDir.value = props.allFiles
        .filter((file) => file.parent === props.parent)
        .sort((a, b) => a.filename.localeCompare(b.filename));
}
computeFilesInDir();
// watch allfiles
watch(
    () => props.allFiles,
    () => computeFilesInDir()
);

/**
 * Propagates the changeDoc event
 */
function handleChangeDoc(id) {
    emit("changeDoc", id);
}
/**
 * Manages the expand/collapse state of the directory
 */
function handleDirExpandChange({
    id,
    action,
}: {
    id: number;
    action: "open" | "close";
}) {
    if (action === "open") {
        openedIds.value.add(id);
    } else {
        openedIds.value.delete(id);
    }
    console.log("opened ids changed", JSON.stringify(openedIds));
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
    padding-left: 5px;
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
