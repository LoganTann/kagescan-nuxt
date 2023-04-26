<template>
    <div>
        <div>Header</div>
        <div class="prose mx-auto">
            <ContentDoc v-slot="{ doc }">
                <h1 class="text-center">{{ doc.title }}</h1>
                <ContentRenderer :value="doc" />
            </ContentDoc>
        </div>
    </div>
</template>
