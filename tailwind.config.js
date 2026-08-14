/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2F6FAF',
          hover: '#255D95',
          soft: '#E8F2FA',
        },
        secondary: '#53B8D1',
        accent: '#63D5D0',
        'bg-main': '#F7F5F0',
        surface: '#FFFFFF',
        'text-main': '#2D3436',
        'text-muted': '#636E72',
        border: '#E3E8EC',
        'focus-ring': '#4FA7C5',
        error: '#A65353',
        success: '#477A61',
      },
      fontFamily: {
        thai: ['"Noto Sans Thai"', 'sans-serif'],
        sans: ['Inter', '"Noto Sans Thai"', 'sans-serif'],
      },
      maxWidth: {
        'content': '760px',
        'wide': '1100px',
      },
      borderRadius: {
        'card': '12px',
        'btn': '8px',
      },
      boxShadow: {
        'card': '0 1px 4px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.05)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.10)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
    },
  },
  plugins: [],
}
