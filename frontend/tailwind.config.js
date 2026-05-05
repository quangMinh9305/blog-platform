/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. COLORS 
      colors: {
        primary: {
          DEFAULT: '#1D52DE', // Primary Blue
          dark: '#0F3BB7',    // Hover
          darker: '#092B89',  // Active
        },
        accent: {
          light: '#8FB6FF',
          medium: '#5588FB',
          alt: '#5288FF',
        },
        neutral: {
          white: '#FFFFFF',
          offWhite: '#F5F9FF',
          light: '#FAFAFA',
          lightGray: '#F4F4F5',
          medium: '#EEEEEE',  // Border Default
          dark: '#27272A',    // Text secondary
          black: '#000000',   // Text primary
          charcoal: '#18181B',
        },
        status: {
          success: '#399E43',
          error: '#DB4241',
          danger: '#F2706E',
        }
      },
      
      // 2. TYPOGRAPHY 
      fontFamily: {
        sans: ['"Suisse Intl"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },

      // 3. SPACING & RADIUS 
      spacing: {
        'micro': '4px',
        'compact': '8px',
        'standard': '16px',
        'large': '24px',
        'section': '32px',
        'hero': '64px',
      },
      borderRadius: {
        'badge': '6px',
        'button': '8px',
        'card-compact': '10px',
        'card': '14px',
      },

      // 4. SHADOWS & ELEVATION 
      boxShadow: {
        'subtle': '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.1)',
        'hover': '0px 4px 6px rgba(0, 0, 0, 0.15)',
        'modal': '0px 20px 25px rgba(0, 0, 0, 0.15), 0px 10px 10px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}