import { GetStaticProps } from "next"

import ErrorWindow from "@/components/uiParts/top/ErrorWindow";


export default function Custom404() {
  return (
    <ErrorWindow 
      title="404 - Not Found"
      detailText={`お探しのページは見つかりませんでした。\nURLが間違っているか、ページが移動・削除された可能性があります。`}
    />
  )
}


export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "お探しのページは見つかりませんでした。",
      description: "404エラー",
    }
  }
}
