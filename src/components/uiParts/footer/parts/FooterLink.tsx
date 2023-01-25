import { FC, memo } from "react"
import { menuLinks } from "@/types/menuLinks";

import BlackTextLink from "@/uiElements/link/BlackTextLink";


const FooterLink: FC<menuLinks> = memo(({ text, href }: menuLinks) => (
  <BlackTextLink href={href}>
    {`・${text}`}
  </BlackTextLink>
))

export default FooterLink