import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0f172a',
        'brand-primary': '#3b82f6',
      },
      fontFamily: {
        sans: ['"CS"', '"Inter"', 'sans-serif'],
        serif: ['"ASV"', 'serif'],
        'display': ['"ASV"', 'serif'],
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config