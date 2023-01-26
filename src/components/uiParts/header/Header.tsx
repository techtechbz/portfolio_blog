import { FC, memo } from "react"
import dynamic from "next/dynamic"

import AppBar from "@mui/material/AppBar"

import { useDisclosure } from "@/common/hooks/useDisclosure";
import CustomToolbar from "./parts/CustomToolbar";
import HomeButton from "./parts/HomeButton";
import StylingDiv from "@/uiElements/box/StylingDiv";


const IconButton = dynamic(() => import("@mui/material/IconButton"))
const MenuIcon = dynamic(() => import("@mui/icons-material/Menu"))
const HeaderMenuLinksList = dynamic(() => import("./parts/HeaderMenuLinksList"))
const HeaderMenuDrawer = dynamic(() => import("./parts/HeaderMenuDrawer"))

type Props = {
  isDesktop: boolean
}

const headerCss = {
  height: "12vh",
}

const Header: FC<Props> = memo(({ isDesktop }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <AppBar color="inherit" position="fixed">
        <CustomToolbar height={headerCss.height}>
          <HomeButton />
          {/* 中間の空白 */}
          <div className="HeaderCenter" />
          {isDesktop ? (
            <HeaderMenuLinksList />
          ) : (
            <>
              <IconButton aria-label="drawer button" onClick={onOpen}><MenuIcon fontSize="large" /></IconButton>
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

export default Header
