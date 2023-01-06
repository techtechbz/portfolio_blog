import { FC, KeyboardEvent, memo, MouseEvent } from "react"

import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"

import { getMenuMappingComponents } from "src/components/functional/getMenuMappingComponents"
import DrawerMenuList from "./drawerParts/DrawerMenuList"
import DrawerTopMenu from "./drawerParts/DrawerTopMenu"


type Props = {
  isOpen: boolean
  // eslint-disable-next-line no-unused-vars
  onClose: (event: KeyboardEvent<Element> | MouseEvent<Element>) => void
}


const HeaderMenuDrawer: FC<Props> = memo(({ isOpen, onClose }: Props) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box onClick={onClose} onKeyDown={onClose} width={240}>
        <List>
          <DrawerTopMenu onClose={onClose} />
        </List>
        <Divider>メイン</Divider>
        <List>
          {getMenuMappingComponents("header", DrawerMenuList)}
        </List>
        <Divider>カテゴリー</Divider>
        <List>
          {getMenuMappingComponents("category", DrawerMenuList)}
        </List>
        <Divider>アーカイブ</Divider>
        <List>
          {getMenuMappingComponents("archives", DrawerMenuList)}
        </List>
      </Box>
    </Drawer>
  )
})

export default HeaderMenuDrawer