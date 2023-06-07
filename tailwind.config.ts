
import type { Config } from 'tailwindcss'
import tailwindTypography from '@tailwindcss/typography';
export default <Partial<Config>>{
    theme: {
        fontFamily: {
            sans: 'Raleway, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            serif: 'font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
            mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
        },
    },
    plugins: [
        tailwindTypography
    ]
}
