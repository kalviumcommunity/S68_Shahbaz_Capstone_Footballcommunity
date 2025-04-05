export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff4d4d',
        secondary: '#f9cb28', 
        dark: '#0a0a0a',
        darker: '#111111'
      },
    },
  },
  plugins: [
    import('tailwind-scrollbar-hide')
  ],
}
