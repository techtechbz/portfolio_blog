import { FC, memo } from "react"
import { menuLinks } from "src/common/types/menuLinks";

import BlackTextLink from "src/components/uiElements/link/BlackTextLink";


const FooterLink: FC<menuLinks> = memo(({ text, href }: menuLinks) => (
  <BlackTextLink href={href}>
    {`・${text}`}
  </BlackTextLink>
))

export default FooterLink