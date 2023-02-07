import { memo, ReactNode, FC } from "react"

import { StylingDiv } from "@/uiElements/box/StylingDiv";
import { PageIntroduceCardMedia } from "./PageIntroduceCardMedia"


type Props = {
  diameter: string
  children: ReactNode
}

export const PostIconCardMedia: FC<Props> = memo(({ diameter, children }: Props) => {
  return (
    <PageIntroduceCardMedia cardheight={diameter}>
      <StylingDiv css={{position: "relative", overflow: "hidden", width: diameter, height: diameter, minWidth: "40px", minHeight: "40px"}}>
        {children}
      </StylingDiv>
    </PageIntroduceCardMedia>
  )
})
