<template>
    <div class="trs_filename" @click="handleCreateFile">
        <div class="trs_plusbtn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path
                    d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
                />
            </svg>
        </div>
        <input
            v-show="creationStatus == 'editing'"
            type="text"
            v-model="btnName"
            ref="newFilename"
            class="newFileInput"
            @keypress="handleKeyPress"
            @focusout="handleUnfocus"
        />
        <span v-if="creationStatus == 'initial'">{{ btnName }}</span>
        <span v-if="creationStatus == 'creating'">Création...</span>
    </div>
</template>
<script setup lang="ts">
import { PropType, Ref } from "vue";
import { basicFileData } from "@/server/api/getDirectoryListing";

const btnName = ref("Créer une nouvelle catégorie");
const creationStatus = ref("initial");
const newFilename: Ref<HTMLInputElement> = ref(null);

const props = defineProps({
    parentData: {
        type: Object as PropType<basicFileData | null>,
        required: false,
        default: () => null,
    },
});
if (props.parentData?.filename) {
    btnName.value = `Nouv. page sur ${props.parentData.filename}`;
}

function handleCreateFile() {
    if (creationStatus.value !== "initial") {
        return;
    }
    creationStatus.value = "editing";
    btnName.value = "nouv fichier";
    nextTick(() => {
        newFilename.value.focus();
        newFilename.value.select();
    });
}
function handleKeyPress(e: KeyboardEvent) {
    if (e.key === "Enter") {
        newFilename.value.blur();
    }
}
function handleUnfocus() {
    creationStatus.value = "creating";
}
</script>
<style lang="scss">
@use "assets/css/defs.scss";
.trs_plusbtn {
    @include defs.tsr_use_file_btn_container;
    @include defs.trs_use_filename_fill;
}
.trs_plusbtn svg {
    width: 10px;
    height: 10px;
}
.newFileInput {
    @include defs.trs_use_selected_bg_color;
}
</style>
