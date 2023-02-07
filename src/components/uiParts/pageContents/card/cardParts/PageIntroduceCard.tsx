import { FC, memo, ReactNode } from "react"

import { styled } from "@mui/system"
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";

import { MIN_MOBILE_WIDTH_QUERY } from "@/lib/themes/defaultTheme";


interface ResponsiveHeightCardProps {
  mobilecardheight: string
  desktopcardheight: string
  children: ReactNode
}

interface PageIntroduceCardProps {
  mobileCardHeight: string
  desktopCardHeight: string
  children: ReactNode
  href: string
}

const ResponsiveHeightCard: FC<ResponsiveHeightCardProps> = styled(Card)(({ mobilecardheight, desktopcardheight }: ResponsiveHeightCardProps) => ({
  maxHeight: mobilecardheight,
  [MIN_MOBILE_WIDTH_QUERY]: {
    maxHeight: desktopcardheight
  } 
}))

export const PageIntroduceCard: FC<PageIntroduceCardProps> = memo(({ mobileCardHeight, desktopCardHeight, href, children }: PageIntroduceCardProps) => {
  return (
    <ResponsiveHeightCard mobilecardheight={mobileCardHeight} desktopcardheight={desktopCardHeight}>
      <CardActionArea component="a" href={href}>
        {children}
      </CardActionArea>
    </ResponsiveHeightCard>
  )
})
