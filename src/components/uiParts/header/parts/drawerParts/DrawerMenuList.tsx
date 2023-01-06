import { memo, FC } from "react"
import Link from "next/link"

import ListItem from "@mui/material/ListItem"

import { menuLinks } from "src/common/types/menuLinks"
import { CustomListItemButton, CustomListItemText } from "./CustomListItems"


const DrawerMenuList: FC<menuLinks> = memo(({ text, href }: menuLinks) => {
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

export default DrawerMenuList