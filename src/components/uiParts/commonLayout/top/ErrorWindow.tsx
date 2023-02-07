import { FC, memo } from "react"

import { TopBackgroundImage } from "./parts/TopBackgroundImage";


type Props = {
  title: string
  detailText: string
}

export const ErrorWindow: FC<Props> = memo(({ title, detailText }: Props) => {
  return (
    <TopBackgroundImage src="blackboard.jpg" alt="Error eye catch image">
      <div className="ErrorWindow">
        <h1 className="TopWindowTitle">{title}</h1>
        <h2 className="TopWindowDescription">{detailText}</h2>
      </div>
    </TopBackgroundImage>
  );
})