const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0A1630',
        'primary.light': '#12264F',
        accent: '#22B4AE',
        'accent.light': '#4BD0CA',
        'neutral.light': '#F8FAFC',
        'neutral.medium': '#E2E8F0',
        'neutral.dark': '#94A3B8',
        // Legacy support
        primaryNavy: '#0A1630',
        primaryLight: '#12264F',
        accentTeal: '#22B4AE',
        accentLight: '#4BD0CA',
        neutralLight: '#F8FAFC',
        neutralMedium: '#E2E8F0',
        neutralDark: '#94A3B8',
        success: '#10B981',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['TASA Orbiter', 'sans-serif'],
        heading: ['TASA Orbiter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        orbiter: ['TASA Orbiter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #0A1630 0%, #12264F 50%, #22B4AE 100%)',
        'gradient-button': 'linear-gradient(135deg, #22B4AE 0%, #4BD0CA 100%)',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 40px rgba(34, 180, 174, 0.3)',
      },
      transitionDuration: {
        'brand': '300ms',
      },
      transitionTimingFunction: {
        'brand': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
});
