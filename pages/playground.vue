<template>
    <main class="">
        <CoreContainer>
            <p>
                <CoreButton> Bonjour </CoreButton>
                <CoreButton> Bonjour 2 </CoreButton>
                <CoreButton icon="bubble"> Toto </CoreButton>
                <CoreButton> Bonjour 2 </CoreButton>
                <CoreButton icon="bubble"> Toto </CoreButton>
                <CoreButton icon="bubble"> Toto </CoreButton>
            </p>

            <DevLorem count="30"></DevLorem>
        </CoreContainer>

        <Grid row>
            <Grid col="s12 m8 l3 push-l3" class="border-4 border-blue-800"> toto </Grid>
            <Grid col="s12 m4 l3 push-l3" class="border-4 border-red-500"> toto2 </Grid>
        </Grid>
    </main>
</template>
<script setup lang="ts"></script>
