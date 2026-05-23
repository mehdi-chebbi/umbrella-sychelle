/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        ivory: '#FAF9F6',
        sand: '#E8E0D4',
        wheat: '#D4C9B8',
        earth: '#7D8B7A',
        bark: '#3A4A3F',
        sage: '#6B8F71',
        ocean: '#1B6B5E',
        reef: '#2D9B8F',
        cream: '#F3EDE5',
        umbrella: {
          bg: '#FFFFFF',
          'bg-alt': '#F7F5F2',
          dark: '#1C1C1C',
          text: '#1C1C1C',
          'text-secondary': '#6B6B6B',
          'text-light': '#9A9A9A',
          accent: '#2D6A4F',
          'accent-light': '#D8F3DC',
          warm: '#B08D57',
          'warm-light': '#E8DCC8',
          border: '#E5E2DD',
        },
      },
    },
  },
  plugins: [],
};
