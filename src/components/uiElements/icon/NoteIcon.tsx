import { FC, memo } from "react";
import Image from "next/image"

import Icon from '@mui/material/Icon';

import sideMenuCss from '@/styles/moduleCss/sideMenu.module.css'


const NoteIcon: FC = memo(() => {
  return (
    <Icon className={sideMenuCss.SocialNetworksIcon}>
      <Image alt="note" src="/svg/note_logo.svg" width={42} height={42} sizes="46px" />
    </Icon>
  )
})

export default NoteIcon