
import { onKeyStroke } from "@vueuse/core";
import { MANGA_FOLDER } from "~/server/api/-types";

/**
 * Composable to manage the pagination on the manga section.
 * Contains methods to navigate (prev, next page)
 * nextChapterUrl and previousChapterUrl refs should be set once the chapter is loaded.
 */
export function usePageCounter() {
    const currentPageIndex = ref(0);
    const nextChapterUrl = ref("");
    const previousChapterUrl = ref("");
    const pagesCount = ref(0);
    const route = useRoute();

    async function previousPage() {
        if (pagesCount.value <= 0) {
            return;
        }
        if (currentPageIndex.value <= 0 && previousChapterUrl.value.length > 0) {
            await navigateTo(previousChapterUrl.value);
        } else {
            currentPageIndex.value--;
        }
    }
    async function nextPage() {
        if (pagesCount.value <= 0) {
            return;
        }
        if (currentPageIndex.value >= pagesCount.value - 1 && nextChapterUrl.value.length > 0) {
            await navigateTo(nextChapterUrl.value);
        } else {
            currentPageIndex.value++;
        }
    }
    function updateSurroundingUrls(urls: ScanSurroundingUrls) {
        const home = `${MANGA_FOLDER}/${route.params.serieId}`;
        nextChapterUrl.value = urls.nextChapterUrl || home;
        previousChapterUrl.value = urls.previousChapterUrl || home;
    }

    onKeyStroke("ArrowRight", (e) => {
        e.preventDefault();
        nextPage();
    });
    onKeyStroke("ArrowLeft", (e) => {
        e.preventDefault();
        previousPage();
    });

    return {
        currentPageIndex,
        pagesCount,
        nextChapterUrl,
        previousChapterUrl,
        nextPage,
        previousPage,
        updateSurroundingUrls
    };
}

export type ScanSurroundingUrls = {
    nextChapterUrl: string;
    previousChapterUrl: string;
}