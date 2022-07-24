<template>
    <div class="flex-1" data-do-stop-propagation="yes" @click="handleClick">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { useReactiveGlobalState } from "@/stores/trsEditorFiles";
import { trsGetActionByClickEvent } from "@/composables/trs/TrsDirClickWatcher";
const state = useReactiveGlobalState();

function handleClick(e: MouseEvent) {
    const { action, details } = trsGetActionByClickEvent(e);

    switch (action) {
        case "expandFile":
            toggleFileExpandingState(details);
            break;
        case "changeFile":
            changeDoc(details);
            break;
        default:
            console.log("Unhandled action", action, e);
    }
}

function toggleFileExpandingState(docId: string) {
    const fileAsNumber = parseInt(docId, 10);
    if (state.openedIds.value.has(fileAsNumber)) {
        state.openedIds.value.delete(fileAsNumber);
    } else {
        state.openedIds.value.add(fileAsNumber);
    }
}
function changeDoc(docId: string) {
    state.activeFile.value = parseInt(docId, 10);
}
</script>
