import { FC, ReactNode } from "react"

import emotionStyled from "@emotion/styled";

type Props = {
  children?: ReactNode
  css?: any
}

const StylingDiv: FC<Props> = emotionStyled("div")(({ css }: Props) => css);

export default StylingDiv