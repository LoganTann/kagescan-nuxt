
export function useDebounce(amountToWait: number) {
    const waiting = ref<boolean>(false);
    watch(() => waiting.value, (newVal) => {
        if (newVal) {
            setTimeout(() => waiting.value = false, amountToWait);
        }
    })
    return { waiting };
}