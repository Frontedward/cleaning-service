/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      colors: {
        pink: {
          light: '#FBCFE8', // светло-розовый
          DEFAULT: '#F9A8D4', // основной розовый
          dark: '#F472B6', // насыщенный розовый
        },
        turquoise: {
          light: '#5ED6D6',
          DEFAULT: '#38BDF8',
          dark: '#0EA5E9',
        },
        orange: {
          light: '#FDBA74',
          DEFAULT: '#F59E42',
          dark: '#FDE68A',
        },
        white: '#FFFFFF',
        black: '#222222',
      },
      fontFamily: {
        display: ['"Fredoka One"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
