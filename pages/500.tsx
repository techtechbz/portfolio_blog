import { GetStaticProps } from "next"

import ErrorWindow from "@/uiParts/top/ErrorWindow";


export default function Custom500() {
  return (
    <ErrorWindow 
      title="500 - Server Error"
      detailText="現在サーバー側のトラブルにより、このページを表示できません。"
    />
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "500エラー",
      description: "サーバー側で問題が発生しました。時間をおいて再度アクセスしてください。"
    }
  }
}
