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
        'sushi-red': '#C41E3A',
        'sushi-cream': '#FFF8E7',
        'sushi-dark': '#2C2C2C',
      },
    },
  },
  plugins: [],
}
export default config



