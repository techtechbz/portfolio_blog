import { FC, ReactNode } from "react"

import { styled } from "@mui/system"
import CardMedia from "@mui/material/CardMedia";


type Props = {
  cardheight: string
  children: ReactNode
}

const JustifyCardMedia: FC<Props> = styled(CardMedia)(({ cardheight }: Props) => ({
  minHeight: cardheight,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}))

export default JustifyCardMedia