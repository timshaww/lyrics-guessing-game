/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			apple: {
  				bg: {
  					main: '#1f2120',
  					accent: '#222423',
  					hover: '#2b2c2d',
					lyrics: '#1b1b1b',
  				},
  				text: {
  					main: '#dcdcdc',
  					accent: '#8f9190'
  				},
  				red: '#f92c48'
  			}
  		},
  		fontFamily: {
  			apple: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI"', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans"', 'Helvetica Neue"', 'sans-serif']
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		keyframes: {
		slideInLeft: {
			'0%': { transform: 'translateX(-100%)', opacity: '0' },
			'100%': { transform: 'translateX(0)', opacity: '1' },
		},
		slideInRight: {
			'0%': { transform: 'translateX(100%)', opacity: '0' },
			'100%': { transform: 'translateX(0)', opacity: '1' },
		},
		},
		animation: {
			slideInLeft: 'slideInLeft 0.5s ease-out forwards',
			slideInRight: 'slideInRight 0.5s ease-out forwards',
		}
  	}
  },
  plugins: [
	
	require("tailwindcss-animate")
],
}

