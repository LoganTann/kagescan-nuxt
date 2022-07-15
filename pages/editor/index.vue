<template>
    <div class="font-sans flex h-full">
        <div class="bg-neutral-50 w-60 flex flex-col">
            <div class="flex p-2 items-center">
                <img
                    src="/kagescan.png"
                    alt="Kagescan icon"
                    class="w-8 h-8 rounded-sm"
                />
                <span class="ml-2">Kagescan Translation Workspace</span>
            </div>

            <ul>
                <li>Planifications</li>
                <li>Paramètres</li>
            </ul>
            <hr />
            <div class="flex-1">
                <trs-dirlisting
                    v-if="allFiles"
                    :all-files="allFiles.novel_chapters"
                ></trs-dirlisting>
                <span v-else>Files not loaded...</span>
            </div>

            <div>Version 2.0.0</div>
        </div>

        <div class="max-w-3xl mx-auto p-2">
            <h2>Article title :</h2>
            <p>blablabla</p>
            <client-only>
                <trs-tiptap
                    @update="handleUpdate"
                    :content="inHTML"
                ></trs-tiptap>

                <button @click="handleEditorChange">
                    change editor content
                </button>
                <textarea v-model="outHTML"> </textarea>
            </client-only>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const { data: allFiles } = await useFetch("/api/getDirectoryListing");

const inHTML = ref("");
const outHTML = ref("");
function handleUpdate(e) {
    outHTML.value = e;
}
function handleEditorChange(e) {
    inHTML.value = "" + outHTML.value;
}
</script>
