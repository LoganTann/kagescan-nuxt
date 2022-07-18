import { createGlobalState, useStorage } from "@vueuse/core";
import { basicFileData } from "@/server/api/getDirectoryListing";
import superjson from "superjson";
import { lang } from "@/server/api/articleContent/__utils";

export const useGlobalState = createGlobalState(() =>
    useStorage(
        "state-trsEditorFiles",
        {
            activeFile: -1,
            allFiles: new Array<basicFileData>(),
            // only openedIds should be peristed
            openedIds: new Set<number>(),
        },
        undefined,
        {
            serializer: {
                read: (raw) => superjson.parse(raw),
                write: (val) => superjson.stringify(val),
            },
        }
    )
);

export function openedIds_has(
    state: ReturnType<typeof useGlobalState>,
    id: number
) {
    return state.value.openedIds.has(id);
}
export function openedIds_add(
    state: ReturnType<typeof useGlobalState>,
    id: number
) {
    state.value.openedIds.add(id);
}
export function openedIds_remove(
    state: ReturnType<typeof useGlobalState>,
    id: number
) {
    state.value.openedIds.delete(id);
}
