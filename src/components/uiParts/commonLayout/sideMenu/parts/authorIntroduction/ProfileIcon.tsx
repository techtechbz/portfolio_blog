import { FC, memo } from "react"
import Image from "next/image"

import sideMenuCss from "@/styles/moduleCss/sideMenu.module.css"


export const ProfileIcon: FC = memo(() => {
  return (
    <div className={sideMenuCss.AuthorIconContainer}>
      <Image
        className="iconImage"
        src="/images/profile.svg"
        alt="Icon"
        width={54}
        height={54}
      />
    </div>
  )
})