import { FC, memo } from "react";
import Link from "next/link";

import { menuLinks } from "src/common/types/menuLinks";

import sideMenuCss from "src/common/styles/moduleCss/sideMenu.module.css"


const ArchivesLinks: FC<menuLinks> = memo(({text, href}: menuLinks) => (
  <div className={sideMenuCss.SideMenuLinks}>
    <Link href={href}>
      {`・${text}`}
    </Link>
  </div>
))

export default ArchivesLinks