/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'ssm': '375px',
      'sm': '576px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1210px'
      // 'xl': '1280px',
      // '2xl': '1536px',
    },
    fontFamily: {
      'Noto-Sans-TC': ['Noto Sans TC', 'sans-serif']
    },
    extend: {
      colors: {
        //修改tailwind配置，可以在內聯使用
        primary: {
          50: '#fffbec',
          100: '#fff6d4',
          200: '#ffe9a7',
          300: '#ffd870',
          400: '#ffbb36',
          500: '#ffa40f',
          600: '#fa8c05',
          700: '#c86706',
          800: '#9e500e',
          900: '#7f420f',
          950: '#452005'
        },
        secondary: {
          50: "#fbf8f1",
          100: "#f5eedf",
          200: "#ebdbbd",
          300: "#ddc194",
          400: "#d5ad7b",
          500: "#c5894a",
          600: "#b7753f",
          700: "#985d36",
          800: " #7b4c31",
          900: "#643f2a",
          950: " #351f15",
        },
        tertiary: {
          50: "#fefee7",
          100: "#fcfccb",
          200: "#f6f89e",
          300: "#ebf165",
          400: "#dce536",
          500: "#c3d018",
          600: "#95a20e",
          700: "#707b10",
          800: "#586113",
          900: "#4a5314",
          950: "#272e05",
        },
        errpr: {
          50: "fef2f2",
          100: "fee3e2",
          200: "feccca",
          300: "fca8a5",
          400: "f87671",
          500: "ef4b44",
          600: "de3730",
          700: "b9221c",
          800: "99201b",
          900: "7f211d",
          950: "450c0a",
        },
        neutral: {
          50: "#ffffff",
          100: "#efefef",
          200: "#dcdcdc",
          300: "#dbdbdb",
          400: "#989898",
          500: "#7c7c7c",
          600: "#656565",
          700: "#525252",
          800: "#464646",
          900: "#3d3d3d",
          950: "#292929",
        }
      }
    },
  },
  plugins: [],
}

