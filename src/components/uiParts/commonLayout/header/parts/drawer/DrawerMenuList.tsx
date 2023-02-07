import { memo, FC } from "react"
import Link from "next/link"

import ListItem from "@mui/material/ListItem"

import { menuLinksItem } from "@/types/menuLinksList"
import { CustomListItemButton, CustomListItemText } from "./CustomListItems"


export const DrawerMenuList: FC<menuLinksItem> = memo(({ text, href }: menuLinksItem) => {
  return (
    <div className="DrawerMenuList">
      <Link className="DrawerMenuListLink" href={href}>
        <ListItem disablePadding>
          <CustomListItemButton>
            <CustomListItemText primary={text} />
          </CustomListItemButton>
        </ListItem>
      </Link>
    </div>
  )
})
