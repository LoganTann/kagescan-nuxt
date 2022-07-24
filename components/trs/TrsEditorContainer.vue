<template>
    <div class="max-w-2xl w-full mx-auto p-2 pt-10">
        <input
            type="text"
            class="text-4xl text-bold w-full overflow-ellipsis"
            v-model="title"
        />
        <div class="my-5">
            <hr />
        </div>
        <client-only>
            <trs-tiptap @update="handleUpdate" :content="inHTML"></trs-tiptap>
        </client-only>
    </div>
</template>
<script setup lang="ts">
import { useReactiveGlobalState } from "@/stores/trsEditorFiles";
import { articleContentGetReponse } from "@/server/api/articleContent/[id].get";

const state = useReactiveGlobalState();

const title = ref("Hello");
const inHTML = ref("<p>Hello</p>");
const docId = ref(-1);

// todo : abort controller instead
const lastNewVal = ref(-1);
watch(
    () => state.activeFile.value,
    async (newVal) => {
        lastNewVal.value = newVal;
        const req = await fetch(`/api/articleContent/${newVal}`);
        const data = (await req.json()) as articleContentGetReponse;
        console.log(data);
        if (newVal !== lastNewVal.value) {
            console.info("Concurrency issue : %d will be ignored", newVal);
            return;
        }
        if (data.novel_chapters?.id) {
            inHTML.value = data.sanitizedHTML;
            title.value = data.novel_chapters.title;
            docId.value = newVal;
        }
    }
);

// Perform local save
function handleUpdate(e) {
    // todo
    console.log("Sending update", JSON.parse(JSON.stringify(e)));
}
</script>
