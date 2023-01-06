import createCache from "@emotion/cache";

export default function createEmotionCache() {
  if (typeof document !== "undefined") {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>("meta[name='emotion-insertion-point']",)
    if (emotionInsertionPoint) return createCache({ key: "mui-style", insertionPoint: emotionInsertionPoint })
  }
  return createCache({ key: "mui-style", insertionPoint: undefined })
}
