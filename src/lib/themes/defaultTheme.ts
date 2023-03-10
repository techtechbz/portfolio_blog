import { Roboto } from "next/font/google";
import { createTheme, responsiveFontSizes } from "@mui/material/styles"


const MIN_MOBILE_SIZE = 300
const MAX_MOBILE_SIZE = 768
const MAX_TABLET_SIZE = 1024

export const MIN_MOBILE_WIDTH_QUERY = `@media (min-width:${MAX_MOBILE_SIZE}px)`

export const roboto = Roboto({
  weight: ["300", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const changedBreakpointsTheme = createTheme({
  breakpoints: {
    values: {
      xs: MIN_MOBILE_SIZE,
      sm: MAX_MOBILE_SIZE,
      md: MAX_TABLET_SIZE,
      lg: 1200,
      xl: 1536,
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
})

export const defaultTheme = responsiveFontSizes(changedBreakpointsTheme)