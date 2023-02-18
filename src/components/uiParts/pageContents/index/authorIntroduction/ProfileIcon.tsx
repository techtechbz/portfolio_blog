import { FC, memo } from "react"
import Image from "next/image"

import indexCss from "@/styles/pageCss/index.module.css"


export const ProfileIcon: FC = memo(() => {
  return (
    <div className={indexCss.AuthorIcon}>
      <Image
        className="iconImage"
        src="/svg/profile.svg"
        alt="Icon"
        width={54}
        height={54}
      />
    </div>
  )
})