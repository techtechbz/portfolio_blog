import { memo, ReactNode, FC } from "react"

import CardMedia from "@mui/material/CardMedia";

import { StylingDiv } from "@/uiElements/box/StylingDiv";


type Props = {
  height: string
  children: ReactNode
}

export const SideImageCardMedia: FC<Props> = memo(({ height, children }: Props) => {
  return (
    <CardMedia>
      <StylingDiv css={{position: "relative", overflow: "hidden", width: "100%", minHeight: height}}>
        {children}
      </StylingDiv>
    </CardMedia>
  )
})
