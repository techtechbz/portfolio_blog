import { FC, memo, ReactNode } from "react"

import { styled } from "@mui/system"
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";

import { MIN_MOBILE_WIDTH_QUERY } from "@/lib/themes/defaultTheme";


type LimitedHeightCardProps = {
  mobilecardheight: string
  desktopcardheight: string
  children: ReactNode
}

type DefaultCardProps = {
  mobileCardHeight: string
  desktopCardHeight: string
  children: ReactNode
  href: string
}

const LimitedHeightCard: FC<LimitedHeightCardProps> = styled(Card)(({ mobilecardheight, desktopcardheight }: LimitedHeightCardProps) => ({
  maxHeight: mobilecardheight,
  [MIN_MOBILE_WIDTH_QUERY]: {
    maxHeight: desktopcardheight
  } 
}))

const DefaultPageIntroduceCard: FC<DefaultCardProps> = memo(({ mobileCardHeight, desktopCardHeight, href, children }: DefaultCardProps) => {
  return (
    <LimitedHeightCard mobilecardheight={mobileCardHeight} desktopcardheight={desktopCardHeight}>
      <CardActionArea component="a" href={href}>
        {children}
      </CardActionArea>
    </LimitedHeightCard>
  )
})

export default DefaultPageIntroduceCard