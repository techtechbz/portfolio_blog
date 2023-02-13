import { FC, memo } from "react"

import { formatDateString } from "@/lib/posts/dataHandler/formatDateString"


type Props = {
  dateString: string
}

export const PostDate: FC<Props> = memo(({ dateString }: Props) => {
  const options = { year: "numeric", month: "long", day: "numeric" } as const
  const formattedDate = formatDateString(dateString, "en-US", options)
  return (
    <div>{formattedDate}</div>
)})
