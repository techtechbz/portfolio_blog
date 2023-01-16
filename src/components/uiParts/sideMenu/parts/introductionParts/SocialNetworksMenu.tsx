import { FC, memo } from "react";
import Link from "next/link"
import dynamic from "next/dynamic"

import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"

import { menuLinks } from "@/common/types/menuLinks";
import { getMenuMappingComponents } from "@/components/functional/getMenuMappingComponents";

import sideMenuCss from "@/common/styles/moduleCss/sideMenu.module.css"


const NoteIcon = dynamic(() => import("@/components/uiElements/icon/NoteIcon"))
const GitHubIcon = dynamic(() => import("@mui/icons-material/GitHub"))

const SOCIAL_NETWORK_ICONS_LIST: { [key: string]: any } = {
  "github": GitHubIcon,
  "note": NoteIcon,
}

const SocialNetworkLinkButton: FC<menuLinks> = memo(({ text, href, iconName }: menuLinks) => {
  const IconNode = !iconName ? <></> : SOCIAL_NETWORK_ICONS_LIST[iconName]
  return (
    <Link href={href} passHref>
      <Tooltip title={`${text}ページへ`} arrow>
        <div>
          <IconButton aria-label={`${text} link button`}><IconNode /></IconButton>
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