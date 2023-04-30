<template>
    <p>Chapitre {{ $route.params.chapterId }} dans {{ $route.params.serieId }}</p>
    <pre v-for="res in sorted">{{ res }}</pre>
</template>
<script setup lang="ts">
    const result = await queryContent("/scan/kagerou-daze").find();

    const sorted = result.sort((a, b) => {
        const fileA = a._path!.split("/").at(-1)!;
        const fileB = b._path!.split("/").at(-1)!;
        return sortChapterAgain(fileA, fileB);
    });

    function sortChapterAgain(a: string, b: string): number {
        const digitFollowedByDotOrUnderscore = /^(\d+)(.|_)?/;
        const defaultResponse = a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

        const resultA = a.match(digitFollowedByDotOrUnderscore);
        const resultB = b.match(digitFollowedByDotOrUnderscore);
        if (resultA == null || resultB == null) {
            return defaultResponse;
        }
        const [_matchA, numberA, followingA] = resultA;
        const [_matchB, numberB, followingB] = resultB;

        if ((followingA || followingB) && numberA === numberB) {
            // volumes (underscore) should always be first
            if (followingA === "_") {
                return -1;
            }
            // if there is a dot, do a numercial compare instead of string compare
            return parseFloat(a) - parseFloat(b);
        }
        return defaultResponse;
    }
</script>
