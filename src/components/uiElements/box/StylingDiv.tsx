import { FC, ReactNode } from "react"

import emotionStyled from "@emotion/styled";

type Props = {
  children?: ReactNode
  css?: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const StylingDiv: FC<Props> = emotionStyled("div")(({ css }: Props) => css);