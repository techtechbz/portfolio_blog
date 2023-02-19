import { FC, memo } from "react"
import dynamic from 'next/dynamic'

import AppBar from "@mui/material/AppBar"
import MenuIcon from "@mui/icons-material/Menu"

import { useDisclosure } from "@/hooks/useDisclosure";
import { CustomToolbar } from "./parts/CustomToolbar";
import { SiteNameButton } from "./parts/SiteNameButton";
import { StylingDiv } from "@/uiElements/box/StylingDiv";


const IconButton = dynamic(() => import("@mui/material/IconButton"))
const HeaderMenuLinksList = dynamic(() => import("./parts/HeaderMenuLinksList"))
const HeaderMenuDrawer = dynamic(() => import("./parts/drawer/HeaderMenuDrawer"))

type Props = {
  isDesktop: boolean
}

const headerCss = {
  height: "12vh",
}

export const Header: FC<Props> = memo(({ isDesktop }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <AppBar color="inherit" position="fixed">
        <CustomToolbar height={headerCss.height}>
          <SiteNameButton />
          {/* 中間の空白 */}
          <div className="HeaderCenterPadding" />
          {isDesktop ? (
            <HeaderMenuLinksList />
          ) : (
            <>
              <IconButton aria-label="drawer button" onClick={onOpen}><MenuIcon className="HeaderMenuIcon" /></IconButton>
              <HeaderMenuDrawer {...{isOpen, onClose}} />
            </>
          )}
        </CustomToolbar>
      </AppBar>
      {/* ヘッダー分の高さのパディング */}
      <StylingDiv css={headerCss} />
    </>
  );
})
