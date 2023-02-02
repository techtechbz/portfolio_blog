import { FC, memo } from "react";
import Link from "next/link";

import { menuLinksItem } from "@/types/menuLinksList";

import sideMenuCss from "@/styles/moduleCss/sideMenu.module.css"


const ArchivesLink: FC<menuLinksItem> = memo(({text, href}: menuLinksItem) => (
  <div className={sideMenuCss.SideMenuLinks}>
    <Link href={href}>
      {`・${text}`}
    </Link>
  </div>
))

export default ArchivesLink