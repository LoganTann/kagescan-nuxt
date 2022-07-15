<template>
    <ul class="ml-1">
        <li v-for="file in filesInDirectory" :key="file.id">
            <span v-if="filesWithoutChildrens.has(file.id)">x</span>
            <span v-else @click="handleOpenSubfiles(file.id)">
                <span v-if="openedIds.has(file.id)">v</span>
                <span v-else>&gt;</span>
            </span>
            <span class="truncate" @click="handleChangeDoc(file.id)">{{
                file.title
            }}</span>
            <trs-dirlisting
                v-if="openedIds.has(file.id)"
                :all-files="allFiles"
                :parent="file.id"
            ></trs-dirlisting>
        </li>
    </ul>
</template>

<script>
export default {
    name: "trs-dirlisting",
    props: {
        allFiles: {
            type: Array,
            required: true,
            default: () => [{ id: 0, title: "error", parent: -1 }],
        },
        parent: {
            type: Number,
            required: false,
            default: -1,
        },
    },
    data() {
        return {
            filesInDirectory: [],
            filesWithoutChildrens: null,
            openedIds: new Set(),
        };
    },
    created() {
        // note : won't listen to changes
        const filesInDir = [];
        const filesWithoutChildrens = new Set();
        for (const file of this.allFiles) {
            if (file.parent === this.parent) {
                filesInDir.push(file);
                filesWithoutChildrens.add(file.id);
            }
        }
        for (const file of this.allFiles) {
            filesWithoutChildrens.delete(file.parent);
        }

        this.filesInDirectory = filesInDir;
        this.filesWithoutChildrens = filesWithoutChildrens;
    },
    methods: {
        handleOpenSubfiles(id) {
            this.openedIds.has(id)
                ? this.openedIds.delete(id)
                : this.openedIds.add(id);
        },
        handleChangeDoc(id) {
            this.$emit("change-doc", id);
        },
    },
};
</script>

<style></style>
