export function trsGetActionByClickEvent(event: MouseEvent): {
    action: string;
    details?: string;
} {
    let currentElement: HTMLElement = event.target as HTMLElement;
    let action = "unknown";
    let details: string | undefined = undefined;

    while (currentElement) {
        if (currentElement.dataset.doExpandFile) {
            action = "expandFile";
            details = currentElement.dataset.doExpandFile;
            break;
        }
        if (currentElement.dataset.doChangeFile) {
            action = "changeFile";
            details = currentElement.dataset.doChangeFile;
            break;
        }
        if (currentElement.dataset.doStopPropagation) {
            action = "stopPropagation";
            break;
        }
        currentElement = currentElement.parentElement;
    }
    return { action, details };
}
