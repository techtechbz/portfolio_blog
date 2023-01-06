import { FC, memo } from "react"

import { formatDateString } from "src/components/functional/formatDateString"

type Props = {
  createDateString: string
  updateDateString: string | undefined
}

const DocumentDate: FC<Props> = memo(({ createDateString, updateDateString }: Props) => {
  const options = { year: "numeric", month: "short", day: "numeric" } as const
  const formattedCreateDate = formatDateString(createDateString, "ja-JP", options)
  
  if (!updateDateString) return <div>{`作成日 : ${formattedCreateDate}`}</div>
  
  const formattedUpdateDate = formatDateString(updateDateString, "ja-JP", options)
  return (
    <>
      <div>{`作成日 : ${formattedCreateDate}`}</div>
      <div>{`更新日 : ${formattedUpdateDate}`}</div>
    </>
)})

export default DocumentDate