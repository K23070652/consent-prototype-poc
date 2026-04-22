/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'consent-purple': '#6B4EFF',
        'consent-purple-light': '#EDE8FF',
        'consent-purple-dark': '#3D2BB3',
        'instagram-blue': '#0095F6',
        'approved': '#34C759',
        'declined': '#FF3B30',
        'pending': '#FFC107',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}