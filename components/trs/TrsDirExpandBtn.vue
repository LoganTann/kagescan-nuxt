<template>
    <div
        class="trs_expandbtn"
        :data-do-expand-file="targetedFile.id"
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
import { useReactiveGlobalState } from "@/stores/trsEditorFiles";

const state = useReactiveGlobalState();
const props = defineProps({
    targetedFile: {
        type: Object as PropType<basicFileData>,
        required: true,
        default: () => [{ id: 0, title: "error", parent: -1 }],
    },
});

const expanded = computed(() =>
    state.openedIds.value.has(props.targetedFile.id)
);
</script>

<style lang="scss">
@use "assets/css/defs.scss";

.trs_expandbtn {
    @include defs.tsr_use_file_btn_container;
}
.trs_expandbtn:hover {
    @include defs.trs_use_selected_bg_color;
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
