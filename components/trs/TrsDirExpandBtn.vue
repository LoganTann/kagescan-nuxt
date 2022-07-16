<template>
    <div
        class="trs_expandbtn"
        @click="handleClick"
        :class="{ active: expanded }"
    >
        <!--span v-if="filesWithoutChildrens.has(file.id)">x</span>
            <span v-else @click="handleOpenSubfiles(file.id)">
                <span v-if="openedIds.has(file.id)">v</span>
                <span v-else>&gt;</span>
            </span-->
        <svg viewBox="0 0 100 100">
            <polygon points="5.9,88.2 50,11.8 94.1,88.2 "></polygon>
        </svg>
    </div>
</template>
<script setup lang="ts">
import { basicFileData } from "@/server/api/getDirectoryListing";
import { PropType } from "vue";

const emit = defineEmits(["dirExpandStateChange"]);
const props = defineProps({
    targetedFile: {
        type: Object as PropType<basicFileData>,
        required: true,
        default: () => [{ id: 0, title: "error", parent: -1 }],
    },
    openedIds: {
        type: Object as PropType<Set<number>>,
        required: true,
        default: () => new Set(),
    },
});

const expanded = ref(props.openedIds.has(props.targetedFile.id));
function handleClick() {
    expanded.value = !expanded.value;

    if (props.targetedFile.hasChilds) {
        emit("dirExpandStateChange", {
            id: props.targetedFile.id,
            action: expanded.value ? "open" : "close",
        });
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
.trs_expandbtn.active svg {
    transform: rotate(180deg);
}
</style>
