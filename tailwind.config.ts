
import type { Config } from 'tailwindcss'
import tailwindTypography from '@tailwindcss/typography';
export default <Partial<Config>>{
    theme: {
        fontFamily: {
            sans: 'Raleway',
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
