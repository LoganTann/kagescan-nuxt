<template>
    <div
        class="trs_expandbtn"
        @click="handleClick"
        :class="{ active: expanded, empty: !targetedFile.hasChilds }"
    >
        <svg viewBox="0 0 100 100">
            <polygon points="5.9,88.2 50,11.8 94.1,88.2 "></polygon>
        </svg>
    </div>
</template>
<script setup lang="ts">
import { basicFileData } from "@/server/api/getDirectoryListing";
import { PropType } from "vue";
import {
    useGlobalState,
    openedIds_add,
    openedIds_has,
    openedIds_remove,
} from "@/stores/trsEditorFiles";

const state = useGlobalState();
const props = defineProps({
    targetedFile: {
        type: Object as PropType<basicFileData>,
        required: true,
        default: () => [{ id: 0, title: "error", parent: -1 }],
    },
});

const expanded = computed(() => openedIds_has(state, props.targetedFile.id));

function handleClick() {
    if (expanded.value) {
        openedIds_remove(state, props.targetedFile.id);
    } else {
        openedIds_add(state, props.targetedFile.id);
    }
}
</script>

<style lang="scss">
@use "assets/css/defs.scss";

.trs_expandbtn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin: 4px;
    border-radius: 2px;
    &:hover {
        @include defs.trs_use_selected_bg_color;
    }
}
.trs_expandbtn svg {
    width: 10px;
    height: 10px;
    @include defs.trs_use_filename_fill;
    transform: rotate(90deg);
    transition: transform 0.2s ease-in-out;
}
.trs_expandbtn.empty svg {
    opacity: 0.5;
}
.trs_expandbtn.active svg {
    transform: rotate(180deg);
}
</style>
