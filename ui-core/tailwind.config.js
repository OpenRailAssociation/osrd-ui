/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        black: {
          100:"#000000",
          50: "#94918E"
        },
        ambientA: {
          5: '#F6F8F9',
          10: '#EFF3F5',
          15: '#E9EFF2'
        } ,
        ambientB: {
          5: '#FAF9F5',
          10: '#F7F6EE',
          15: '#F2F0E4'
        } ,
        ambientC: {
          5: '#F6F9F6',
          10: '#F0F4F1',
          15: '#EAF0EB'
        } ,
        ambientD: {
          5: '#F8F7FD',
          10: '#F4F3FC',
          15: '#EFEDF7'
        } ,
        grey: {
          5: '#F5F5F5',
          10: '#EBEBEA',
          20: '#D3D1CF',
          30: '#B6B2AF',
          40: '#94918E',
          50: '#797671',
          60: '#5C5955',
          70: '#494641',
          80: '#312E2B',
          90: '#1F1B17',
        } ,
        primary: {
          5: '#E3EDFC',
          10: '#C4DAF5',
          20: '#98C0F5',
          30: '#72A8F7',
          40: '#3C8AFF',
          50: '#256AFA',
          60: '#1844EF',
          70: '#201EDE',
          80: '#1F0F96',
          90: '#180F47',
        } ,
        info: {
          5: '#E6F7FF',
          30: '#70C1E5',
          60: '#216482',
          80: '#053348'
        } ,
        success: {
          5: '#E6F7EE',
          30: '#3CCA80',
          60: '#0B723C',
          80: '#003F1E'
        } ,
        warning: {
          5: '#FDF5E1',
          30: '#FDF5E1',
          60: '#7D521E',
          80: '#432807'
        } ,
        error: {
          5: '#432807',
          30: '#FF6868',
          60: '#D91C1C',
          80: '#6B0000'
        },
        highlight:{
          30: '#FFF700',
          50: '#E8D900',
        },
      },
      boxShadow:{
        input: "0px 1px 3px rgba(0, 0, 0, 0.5) inset"
      }
    },
    fontFamily : {
      sans: ['IBM Plex sans', 'sans-serif'],
      serif: ['IBM Plex serif', 'serif'],
      mono: ['IBM Plex mono', 'monospace'], 
    }
  },
  plugins: [],
};
