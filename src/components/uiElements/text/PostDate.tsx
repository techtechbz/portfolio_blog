import { FC, memo } from "react"

import { formatDateString } from "src/components/functional/formatDateString"


type Props = {
  dateString: string
}

const PostDate: FC<Props> = memo(({ dateString }: Props) => {
  const options = { year: "numeric", month: "long", day: "numeric" } as const
  const formattedDate = formatDateString(dateString, "en-US", options)
  return (
    <div>{formattedDate}</div>
)})

export default PostDate