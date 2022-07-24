import { createGlobalState, useStorage } from "@vueuse/core";
import { basicFileData } from "@/server/api/getDirectoryListing";
import superjson from "superjson";
import { ref } from "vue";

export const useReactiveGlobalState = createGlobalState(() => {
    const activeFile = ref(-1);
    const allFiles = ref<basicFileData[]>([]);
    const openedIds = ref(new Set<number>());
    return { activeFile, allFiles, openedIds };
});

export const usePersistedGlobalState = createGlobalState(() =>
    useStorage(
        "state-trsEditorFiles",
        {
            // nothing yet
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
