import { NextPageContext } from "next";

import ErrorWindow from "@/mponents/uiParts/top/ErrorWindow";


type ErrorPageProps = {
  title: string
  heading: string
  description: string
  statusCode: number
}

export default function Error({heading, description}: ErrorPageProps) {
  return (
    <ErrorWindow
      title={heading}
      detailText={description}
    />
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  if (statusCode === 503) return { title: "503エラー", heading: "現在アクセスが集中しています。", description: "5分ほど時間をおいてからリロードしてください。"}
  if (typeof statusCode === "number") return { title: "Error Occured", heading: "このページは現在表示できません。", description: `サーバー内部でエラーが発生しました。\nエラーコード : ${statusCode}`}
  return { title: "Error Occured", heading: "このページは現在表示できません。", description: "クライアント側でエラーが発生しました。"}
}
