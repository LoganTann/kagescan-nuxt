<template>
    <div>
        <editor-content :editor="editor" @update="handleAutosave" />
    </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

const props = defineProps({
    content: {
        type: String,
        required: false,
    },
    docId: {
        type: Number,
        required: false,
    },
});

const emit = defineEmits(["update"]);

let autosaveTimer = null;
const autosaveCooldown = 1500;
function handleAutosave(editor: Editor) {
    if (autosaveTimer) {
        clearTimeout(autosaveTimer);
    }
    const content = "" + editor.getHTML();
    const docId = 0 + props.docId;
    autosaveTimer = setTimeout(() => {
        emit("update", { content, docId });
    }, autosaveCooldown);
}

const editor = useEditor({
    content: "<p>Loading...</p>",
    extensions: [StarterKit],
    editorProps: {
        attributes: {
            class: "prose prose-sm sm:prose-base prose-headings:font-sans focus:outline-none",
        },
    },
    onUpdate({ editor }) {
        handleAutosave(editor);
    },
});

watch(
    () => props.content,
    (newString) => {
        editor.value.commands.setContent(newString);
    }
);
</script>
