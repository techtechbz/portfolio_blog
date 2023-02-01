import crypto from 'crypto'

import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";

import defaultTheme, { roboto } from "@/lib/themes/defaultTheme";
import createEmotionCache from "@/lib/createEmotionCache";


export default class MyDocument extends Document {
  render() {
    const documentProps = this.props as any
    const csp = `img-src 'self' data:; script-src 'self' 'nonce-${documentProps.nonce}' 'unsafe-inline' 'unsafe-eval' 'strict-dynamic' https:; object-src 'none'; base-uri 'none';`
    return (
      <Html lang="ja" className={roboto.className}>
        <Head nonce={documentProps.nonce}>
          {/* PWA primary color */}
          <meta name="theme-color" content={defaultTheme.palette.primary.main} />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <meta name="emotion-insertion-point" content="" />
          <meta httpEquiv='Content-Security-Policy' content={csp} />
          {documentProps.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript nonce={documentProps.nonce} />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  const nonce = crypto.randomBytes(128).toString("base64")

  return {
    ...initialProps,
    emotionStyleTags,
    nonce,
  };
};