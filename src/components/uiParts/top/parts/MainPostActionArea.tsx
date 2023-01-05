import { FC, ReactNode } from "react"

import { styled } from "@mui/system"
import CardActionArea from "@mui/material/CardActionArea";


type Props = {
  component: string
  href: string
  children: ReactNode
}

const MainPostActionArea: FC<Props> = styled(CardActionArea)(() => ({
  textDecorationColor: "white",
  "&:hover": {
    textDecoration: "underline",
    textDecorationColor: "white",
    filter: "opacity(80%)",
    transition: "all 0.3s"}
}))

export default MainPostActionArea