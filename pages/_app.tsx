import type { AppProps } from "next/app"

import { CacheProvider, EmotionCache } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import createEmotionCache from "@/lib/createEmotionCache"
import { defaultTheme, MIN_MOBILE_WIDTH_QUERY } from "@/lib/themes/defaultTheme";
import CustomHead from "@/layouts/CustomHead";
import { Header } from "@/uiParts/commonLayout/header/Header"
import { Footer } from "@/uiParts/commonLayout/footer/Footer"

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
  const isDesktop: boolean = useMediaQuery(MIN_MOBILE_WIDTH_QUERY)
  return (
    <CacheProvider value={emotionCache}>
      <CustomHead pageTitle={pageProps.title} pageDescription={pageProps.description} />
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <main>
          <Header {...{isDesktop}} />
            <Component {...pageProps} isDesktop={isDesktop} />
          <Footer />
        </main>
      </ThemeProvider>
    </CacheProvider>
  )
}
