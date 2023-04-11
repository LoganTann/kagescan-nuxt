<template>
    <div v-if="classes.push != '_push'" :class="classes.push"></div>
    <div :class="classes.main">
        <slot />
    </div>
</template>
<script setup lang="ts">
    const props = defineProps<{
        /**
         * Set this property to declare this div as a grid container (row)
         */
        row?: boolean;
        /**
         * Materialize.css-like property that will be converted into tailwind
         */
        col?: string;
        /**
         * initial component classes
         */
        class?: string;
    }>();

    const BP: Record<string, string> = {
        s: "",
        m: "md:",
        l: "lg:",
        xl: "xl:",
        xxl: "2xl:",
    };

    const classes = computed(() => {
        const result = {
            main: props.class ?? "",
            push: "_push",
        };
        if (props.row) {
            result.main = "grid grid-cols-12";
            return result;
        }
        if (!props.col) {
            return result;
        }
        const allowedClasses = /(push-)?([slmx]+)(\d+)/gi;
        const resultingClassesArray = [props.class];
        const pushClassesArray = ["_push"];
        let current;
        while ((current = allowedClasses.exec(props.col)) !== null) {
            const [_s, push, breakpoint, colspan] = current;
            const tailwindClass = `${BP[breakpoint] ?? ""}col-span-${colspan}`;
            if (push) {
                pushClassesArray.push(tailwindClass);
            } else {
                resultingClassesArray.push(tailwindClass);
            }
        }
        result.main = resultingClassesArray.join(" ");
        result.push = pushClassesArray.join(" ");
        return result;
    });
</script>
<style lang="scss">
    ._push {
        visibility: hidden;
    }
</style>
