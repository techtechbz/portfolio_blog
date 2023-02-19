import { FC, ReactNode } from "react"

import { styled } from "@mui/system"
import CardContent from "@mui/material/CardContent";


type Props = {
  height: string
  children: ReactNode
}

export const PageIntroduceCardContent: FC<Props> = styled(CardContent)(({ height }: Props) => ({
  minHeight: height,
  padding: "8px"
}))
