/** @type {import('tailwindcss').Config} */
import { colors } from './src/constants/styles';
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors
    },
  },
  plugins: [require('flowbite/plugin')],
}

