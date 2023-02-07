import { FC, memo } from "react"

import Divider from "@mui/material/Divider"

type dividerOptionType = {
  orientation: "vertical" | "horizontal"
  variant: "middle" | "fullWidth" | "inset"
}

type Props = {
  isDesktop: boolean
}

export const ResponsiveDivider: FC<Props> = memo(({ isDesktop }: Props) => {
  const dividerOption: dividerOptionType = isDesktop ? {orientation: "vertical", variant: "inset"}
                                                     : {orientation: "horizontal", variant: "fullWidth"}
  return <Divider {...dividerOption} />
})
