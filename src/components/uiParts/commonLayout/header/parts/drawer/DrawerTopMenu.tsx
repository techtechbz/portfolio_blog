import { KeyboardEvent, memo, MouseEvent, FC } from "react"

import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"

import { CustomListItemText } from "./CustomListItems"


type Props = {
  onClose: (event: KeyboardEvent<Element> | MouseEvent<Element>) => void
}

export const DrawerTopMenu: FC<Props> = memo(({ onClose }: Props ) => {
  return (
    <ListItem key="top" disablePadding>
      <ListItemButton href="/" className="BackHomeDrawerMenuButton">
        <CustomListItemText primary="ホーム" />
      </ListItemButton>
      <ListItemButton onClick={onClose}>
        <ListItemText primary="✕" />
      </ListItemButton>
    </ListItem>
  )
})
