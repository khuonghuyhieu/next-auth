const plugin = require('tailwindcss/plugin')

module.exports = {
  jit: true,
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/views/**/*.{js,ts,jsx,tsx}',
    './src/hooks/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
      },
    },
    extend: {
      borderRadius: {
        button: 'var(--button-radius)',
      },
    },
  },
}
