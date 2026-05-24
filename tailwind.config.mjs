/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — anchored on the gold accent that runs through
        // the existing site (Donate page, headings, CTAs).
        brand: {
          gold: {
            50:  '#FBF6E9',
            100: '#F4E8C4',
            200: '#EBD691',
            300: '#DFC15A',
            400: '#D4AF37', // primary gold
            500: '#B8941F',
            600: '#967616',
            700: '#735810',
            800: '#4F3D0B',
            900: '#2D2306',
          },
          ink: {
            DEFAULT: '#1A1A1A',
            soft: '#3A3A3A',
            muted: '#6B6B6B',
          },
          parchment: '#FAF7F0',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '65ch',
        content: '896px', // 4xl, matches the redesigned Donate page width
      },
    },
  },
  plugins: [typography],
};
