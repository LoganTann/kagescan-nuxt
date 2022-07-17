<template>
    <div>
        <editor-content :editor="editor" @update="handleAutosave" />
        <p>Editor</p>
    </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

const emit = defineEmits(["update"]);

let autosaveTimer = null;
const autosaveCooldown = 1500;
function handleAutosave(editor: Editor) {
    if (autosaveTimer) {
        clearTimeout(autosaveTimer);
    }
    autosaveTimer = setTimeout(() => {
        emit("update", editor.getHTML());
    }, autosaveCooldown);
}

const editor = useEditor({
    content: "<p>Loading...</p>",
    extensions: [StarterKit],
    onUpdate({ editor }) {
        handleAutosave(editor);
    },
});

const props = defineProps({
    content: {
        type: String,
        required: false,
    },
});
watch(
    () => props.content,
    (newString) => {
        editor.value.commands.setContent(newString);
    }
);
</script>
