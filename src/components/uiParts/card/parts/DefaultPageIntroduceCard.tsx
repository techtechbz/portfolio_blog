import { FC, memo, ReactNode } from "react"

import { styled } from "@mui/system"
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";


type LimitedHeightCardProps = {
  cardheight: string
  children: ReactNode
}

type DefaultCardProps = {
  cardHeight: string
  children: ReactNode
  href: string
}

const LimitedHeightCard: FC<LimitedHeightCardProps> = styled(Card)(({ cardheight }: LimitedHeightCardProps) => ({
  maxHeight: cardheight
}))

const DefaultPageIntroduceCard: FC<DefaultCardProps> = memo(({ cardHeight, href, children }: DefaultCardProps) => {
  return (
    <LimitedHeightCard cardheight={cardHeight}>
      <CardActionArea component="a" href={href}>
        {children}
      </CardActionArea>
    </LimitedHeightCard>
  )
})

export default DefaultPageIntroduceCard