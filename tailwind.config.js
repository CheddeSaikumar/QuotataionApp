/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#333333',  // Dark Gray
          light: '#F2F2F2',   // Light Gray
        },
        accent: {
          blue: '#007BFF',    // Vibrant Blue
          green: '#28A745',   // Success Green
        },
        neutral: {
          white: '#FFFFFF',
          gray: '#EEEEEE',
        }
      }
    },
  },
  plugins: [
    function({ addBase, theme }) {
      addBase({
        'input, select': {
          border: '1px solid #EEEEEE',
          borderRadius: theme('borderRadius.md'),
          padding: theme('spacing.2'),
          '&:focus': {
            outline: 'none',
            borderColor: '#007BFF',
            boxShadow: '0 0 0 2px rgba(0, 123, 255, 0.25)',
          }
        }
      });
    }
  ],
};