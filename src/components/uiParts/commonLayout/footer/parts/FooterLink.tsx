import { FC, memo } from "react"

import { menuLinksItem } from "@/types/menuLinksList";

import { BlackTextLink } from "@/uiElements/link/BlackTextLink";


export const FooterLink: FC<menuLinksItem> = memo(({ text, href }: menuLinksItem) => (
  <BlackTextLink href={href}>
    {`・${text}`}
  </BlackTextLink>
))
