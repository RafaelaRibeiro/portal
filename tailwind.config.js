/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'inset-0-0-15px-0-c25b5d': 'inset 0 0 15px 0 #c25b5d',
      },
      colors: {
        default: '#2271a1',
        bg: '#f3faff',
      },
    },
  },
  plugins: [],
}
