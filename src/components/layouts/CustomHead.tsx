import { FC, memo } from "react"
import Head from "next/head"


type Props = {
  pageTitle: string,
  pageDescription: string
}

const CustomHead: FC<Props> = memo(({pageTitle, pageDescription}: Props) => {
  const title = pageTitle ?? "エラーが発生しました。"
  const description = pageDescription ?? "エラーが発生した際に表示されるページです。"
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="og:title" content={title} />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
  )
})

export default CustomHead