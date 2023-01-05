import { FC, memo } from "react"

import Divider from "@mui/material/Divider"

type dividerOptionType = {
  orientation: "vertical" | "horizontal"
  variant: "middle" | "fullWidth" | "inset"
}

type Props = {
  isMobile: boolean
}

const ResponsiveDivider: FC<Props> = memo(({ isMobile }: Props) => {
  const dividerOption: dividerOptionType = isMobile ? {orientation: "horizontal", variant: "fullWidth"}
                                                    : {orientation: "vertical", variant: "inset"}
  return <Divider {...dividerOption} />
})

export default ResponsiveDivider