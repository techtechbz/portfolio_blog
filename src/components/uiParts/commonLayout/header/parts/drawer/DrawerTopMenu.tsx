import { KeyboardEvent, memo, MouseEvent, FC } from "react"

import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"

import { CustomListItemText } from "./CustomListItems"


type Props = {
  // eslint-disable-next-line no-unused-vars
  onClose: (event: KeyboardEvent<Element> | MouseEvent<Element>) => void
}

const homeButtonCss = {paddingRight: "90px"}

const DrawerTopMenu: FC<Props> = memo(({ onClose }: Props ) => {
  return (
    <ListItem key="top" disablePadding>
      <ListItemButton href="/" sx={homeButtonCss}>
        <CustomListItemText primary="ホーム" />
      </ListItemButton>
      <ListItemButton onClick={onClose}>
        <ListItemText primary="✕" />
      </ListItemButton>
    </ListItem>
  )
})

export default DrawerTopMenu