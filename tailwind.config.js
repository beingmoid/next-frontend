module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],

  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
};
