import { createGlobalState, useStorage } from "@vueuse/core";
import { basicFileData } from "~~/server/api/getDirectoryListing";

export const useGlobalState = createGlobalState(() =>
    useStorage("state-trsEditorFiles", {
        activeFile: -1,
        openedIds: "",
        allFiles: new Array<basicFileData>(),
    })
);

// Workaround https://github.com/vueuse/vueuse/issues/1939
export function openedIds_has(
    state: ReturnType<typeof useGlobalState>,
    id: number
) {
    return state.value.openedIds.includes(`[${id}]`);
}
export function openedIds_add(
    state: ReturnType<typeof useGlobalState>,
    id: number
) {
    state.value.openedIds = state.value.openedIds.concat(`[${id}]`);
}
export function openedIds_remove(
    state: ReturnType<typeof useGlobalState>,
    id: number
) {
    state.value.openedIds = state.value.openedIds.replace(`[${id}]`, "");
}
