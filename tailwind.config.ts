import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#181723',
        content: '#FFFFFF',
        primary: '#8C56FF',
        'primary-darker': '#2F234F',
        'primary-hover': '#7C48EA',
      },
    },
  },
  plugins: [],
}
export default config
