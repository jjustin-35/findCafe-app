/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#68472B',
          normal: '#825936',
          light: '#E5DCD4',
        }
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}

