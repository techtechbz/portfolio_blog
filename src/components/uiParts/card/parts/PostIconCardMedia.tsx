import { memo, ReactNode, FC } from "react"

import StylingDiv from "src/components/uiElements/box/StylingDiv";
import JustifyCardMedia from "./JustifyCardMedia"


type Props = {
  diameter: string
  children: ReactNode
}

const PostIconCardMedia: FC<Props> = memo(({ diameter, children }: Props) => {
  return (
    <JustifyCardMedia cardheight={diameter}>
      <StylingDiv css={{position: "relative", overflow: "hidden", width: diameter, height: diameter, minWidth: "40px", minHeight: "40px"}}>
        {children}
      </StylingDiv>
    </JustifyCardMedia>
  )
})

export default PostIconCardMedia