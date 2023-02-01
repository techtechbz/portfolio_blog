import { FC, memo } from "react";
import Link from "next/link"
import dynamic from "next/dynamic"

import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"

import { getMenuMappingComponents } from "@/components/functional/getMenuMappingComponents";
import { menuLinksItem } from "@/types/menuLinksList";

import sideMenuCss from "@/styles/moduleCss/sideMenu.module.css"


const NoteIcon = dynamic(() => import("@/uiElements/icon/NoteIcon"))
const GitHubIcon = dynamic(() => import("@mui/icons-material/GitHub"))

const socialNetworkIconsList: { [key: string]: any } = {
  "github": GitHubIcon,
  "note": NoteIcon,
}

const SocialNetworkLinkButton: FC<menuLinksItem> = memo(({ text, href, iconName }: menuLinksItem) => {
  const IconNode = !iconName ? <></> : socialNetworkIconsList[iconName]
  return (
    <Link href={href} passHref>
      <Tooltip title={`${text}ページへ`} arrow>
        <div>
          <IconButton aria-label={`${text} link button`}><IconNode className={sideMenuCss.SocialNetworksMuiIcon} /></IconButton>
        </div>
      </Tooltip>
    </Link>
  )
})

const SocialNetworksMenu: FC = memo(() => {
  return(
    <div className={sideMenuCss.SocialNetworksMenu}>
      {getMenuMappingComponents("social", SocialNetworkLinkButton)}
    </div>
  )
})

export default SocialNetworksMenu