
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
    safelist: [
        "grid",
        "grid-cols-12",
        {
            pattern: /col-span-(1|2|3|4|5|6|7|8|9|10|11|12)/,
            variants: ['md', 'lg', 'xl', '2xl']
        }
    ],
    plugins: [
        tailwindTypography
    ]
}
