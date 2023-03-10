import { FC, memo, ReactNode } from "react"
import Image from "next/image"

import { styled } from "@mui/system"
import Paper from "@mui/material/Paper";


type Props = {
  src: string
  alt: string
  children: ReactNode
}

const MainWindowPaper: FC<{children?: ReactNode}> = styled(Paper)(() => ({
  position: "relative",
  backgroundColor: "#424242",
  color: "#fff",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}))

export const TopBackgroundImage: FC<Props> = memo(({ src, alt, children }: Props) => {
  const imageSrc = (src === "home.jpg" || src === 'blackboard.jpg') ? `/images/top/${src}`
                                                                    : `/images/posts/${src}`
  return (
    <MainWindowPaper>
      {/* 画像 */}
      <Image src={imageSrc} alt={alt} fill priority />
      {/* 画像を暗くするフィルター */}
      <div className="GrayFilter" />
      {/* コンテンツ */}
      {children}
    </MainWindowPaper>
  );
})
