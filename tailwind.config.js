const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html",
   "./src/**/*.{vue,js,ts,jsx,tsx}",
   "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
   "node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#515184",
        secondary:"#0408D6",
        gray:"#ADB5BD",
      }
    },
  },
  plugins: [],
});




