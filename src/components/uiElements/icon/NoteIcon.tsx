import Image from "next/image"

import Icon from '@mui/material/Icon';

import sideMenuCss from '@/styles/moduleCss/sideMenu.module.css'


const NoteIcon = () => {
  return (
    <Icon className={sideMenuCss.SocialNetworksIcon}>
      <Image alt="note" src="/svg/note_logo.svg" width={46} height={46} sizes="46px" />
    </Icon>
  )
}

export default NoteIcon