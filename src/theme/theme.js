// src/theme/theme.js
import { extendTheme } from "@chakra-ui/react";

// Define custom breakpoints
const breakpoints = {
  sm: "30em", // 480px
  md: "48em", // 768px
  mdLg: "60em", // Custom breakpoint between md and lg (960px)
  lg: "62em", // 992px
  xl: "80em", // 1280px
  "2xl": "96em", // 1536px
};

const theme = extendTheme({
  breakpoints,
  fonts: {
    heading: `'Archivo', sans-serif`,
    body: `'Archivo', sans-serif`,
  },
});

export default theme;
