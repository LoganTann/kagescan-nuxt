// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        // The private keys which are only available within server-side
        rootPath: new URL("./", import.meta.url),
    },

    app: {
        head: {
            link: [
                { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
                { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
                { rel: 'manifest', href: '/site.webmanifest' },
            ],
            htmlAttrs: {
                lang: 'fr'
            }
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
        "@/assets/commons.scss",
        '@fortawesome/fontawesome-svg-core/styles.css'
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
