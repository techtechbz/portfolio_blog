import type { AppProps } from "next/app"

import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import CustomHead from "@/layouts/CustomHead";
import AppLayout from "../src/components/layouts/AppLayout"
import { defaultTheme, MIN_MOBILE_WIDTH_QUERY } from "@/lib/themes/defaultTheme";
import createEmotionCache from "@/lib/createEmotionCache"

import "@/styles/global.css"


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
  const isDesktop: boolean = useMediaQuery(MIN_MOBILE_WIDTH_QUERY)
  return (
    <CacheProvider value={emotionCache}>
      <CustomHead pageTitle={pageProps.title} pageDescription={pageProps.description} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLayout isDesktop={isDesktop}>
          <Component {...pageProps} isDesktop={isDesktop} />
        </AppLayout>
      </ThemeProvider>
    </CacheProvider>
  )
}
