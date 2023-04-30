// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    //href: 'https://fonts.googleapis.com/css2?family=Raleway&display=swap'
                    href: 'https://fonts.googleapis.com/css2?family=Open+Sans'
                },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com' }
            ],
        }
    },

    typescript: {
        shim: false
    },

    modules: [
        '@nuxtjs/tailwindcss',
        '@vueuse/nuxt',
        '@nuxt/image-edge',
        'nuxt-content-assets',
        '@nuxt/content'
    ],

    css: [
        "@/assets/commons.scss"
    ],

    image: {
        dir: '.nuxt/content-assets/public'
    },

    contentAssets: {
        debug: false
    },

    devtools: {
        enabled: false
    }
})
