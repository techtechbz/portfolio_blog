import { FC, memo } from "react";
import Link from "next/link"

import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import GitHubIcon from "@mui/icons-material/GitHub"

import { menuLinksItem } from "@/types/menuLinksList";
import { getMenuMappingComponents } from "@/components/functional/getMenuMappingComponents";
import { NoteIcon } from "@/uiElements/icon/NoteIcon"

import indexCss from "@/styles/pageCss/index.module.css"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          <IconButton aria-label={`${text} link button`}><IconNode className={indexCss.SocialNetworksMuiIcon} /></IconButton>
        </div>
      </Tooltip>
    </Link>
  )
})

export const SocialNetworksMenu: FC = memo(() => {
  return(
    <div className={indexCss.SocialNetworksMenu}>
      {getMenuMappingComponents("social", SocialNetworkLinkButton)}
    </div>
  )
})
