import type { AppProps } from "next/app"
import dynamic from "next/dynamic"

import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import CustomHead from "../src/components/layouts/CustomHead";
import defaultTheme, { MAX_MOBILE_SIZE } from "@/lib/themes/defaultTheme";
import createEmotionCache from "@/lib/createEmotionCache"

import "../src/common/styles/global.css"


const AppLayout = dynamic(() => import("../src/components/layouts/AppLayout"))
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  pageProps: {
    title: string
    description: string
  }
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const theme = defaultTheme
  const isMobile: boolean = useMediaQuery(`(max-width: ${MAX_MOBILE_SIZE}px)`)
  return (
    <CacheProvider value={emotionCache}>
      <CustomHead pageTitle={pageProps.title} pageDescription={pageProps.description} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLayout isMobile={isMobile}>
          <Component {...pageProps} isMobile={isMobile} />
        </AppLayout>
      </ThemeProvider>
    </CacheProvider>
  )
}
