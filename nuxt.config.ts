import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ["@nuxtjs/supabase", "@nuxtjs/tailwindcss"],
    components: true,
    googleFonts: {
        families: {
            Roboto: true,
            Lato: true,
        },
    },
    css: ["~/assets/css/main.css"],
});
