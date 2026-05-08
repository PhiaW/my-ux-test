/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Sans"', '"Noto Sans TC"', 'sans-serif'],
        body:    ['"Noto Sans TC"', '"DM Sans"', 'sans-serif'],
      },
      colors: {
        accent: {
          50:  '#F4FCF2',
          100: '#E6F7E3',
          200: '#C8EDBE',
          300: '#A2E08F',
          400: '#7ECF6C',
          500: '#6BBF59',
          600: '#4E9E3D',
          700: '#2D7A28',
          800: '#1C5C19',
          900: '#0E3D0C',
        },
        neutral: {
          0:   '#FFFFFF',
          50:  '#FAFAF8',
          100: '#F0F0EE',
          200: '#E2E2DF',
          300: '#C4C4C0',
          400: '#9A9A96',
          500: '#757572',
          600: '#555553',
          700: '#3D3D3B',
          800: '#222220',
          900: '#111110',
        },
      },
    },
  },
  plugins: [],
}
