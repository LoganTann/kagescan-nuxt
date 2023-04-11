
import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    theme: {
        fontFamily: {
            sans: 'Raleway',
        },
    },
    safelist: [
        "grid",
        "grid-cols-12",
        {
            pattern: /col-span-(1|2|3|4|5|6|7|8|9|10|11|12)/,
            variants: ['md', 'lg', 'xl', '2xl']
        }
    ]
}
