import { FC, memo } from "react";
import Link from "next/link";

import { menuLinks } from "@/common/types/menuLinks";

import sideMenuCss from "@/common/styles/moduleCss/sideMenu.module.css"


const ArchivesLinks: FC<menuLinks> = memo(({text, href}: menuLinks) => (
  <div className={sideMenuCss.SideMenuLinks}>
    <Link href={href}>
      {`・${text}`}
    </Link>
  </div>
))

export default ArchivesLinks