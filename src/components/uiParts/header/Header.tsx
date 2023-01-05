import { FC, memo } from "react"
import dynamic from "next/dynamic"

import AppBar from "@mui/material/AppBar"

import { useDisclosure } from "src/common/hooks/useDisclosure";
import CustomToolbar from "./parts/CustomToolbar";
import HomeButton from "./parts/HomeButton";
import StylingDiv from "src/components/uiElements/box/StylingDiv";


type Props = {
  isMobile: boolean
}

const IconButton = dynamic(() => import("@mui/material/IconButton"))
const MenuIcon = dynamic(() => import("@mui/icons-material/Menu"))
const HeaderMenuLinksList = dynamic(() => import("./parts/HeaderMenuLinksList"))
const HeaderMenuDrawer = dynamic(() => import("./parts/HeaderMenuDrawer"))

const headerCss = {
  height: "12vh",
}

const Header: FC<Props> = memo(({ isMobile }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <AppBar color="inherit" position="fixed">
        <CustomToolbar height={headerCss.height}>
          <HomeButton />
          {/* 中間の空白 */}
          <div className="HeaderCenter" />
          {isMobile ? (
            <>
              <IconButton aria-label="drawer button" onClick={onOpen}><MenuIcon fontSize="large" /></IconButton>
              <HeaderMenuDrawer {...{isOpen, onClose}} />
            </>
          ) : (
            <HeaderMenuLinksList />
          )}
        </CustomToolbar>
      </AppBar>
      {/* ヘッダー分の高さのパディング */}
      <StylingDiv css={headerCss} />
    </>
  );
})

export default Header
