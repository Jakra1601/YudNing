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
          DEFAULT: '#3D7A6E',
          hover: '#32675D',
          soft: '#E5F0ED',
        },
        secondary: '#6B8FA3',
        accent: '#B8935A',
        'bg-main': '#F7F5F0',
        surface: '#FFFFFF',
        'text-main': '#2D3436',
        'text-muted': '#636E72',
        border: '#E8E4DC',
        'focus-ring': '#5B9489',
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
