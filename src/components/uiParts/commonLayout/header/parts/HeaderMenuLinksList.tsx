import { FC, memo } from "react"
import Link from "next/link"

import { menuLinksItem } from "@/types/menuLinksList"
import { getMenuMappingComponents } from "@/functional/getMenuMappingComponents"


const HeaderMenuLink: FC<menuLinksItem> = memo(({ text, href }: menuLinksItem) => {
  return (
    <Link className="HeaderMenuLink" href={href}>
      {text}
    </Link>
  );
})

const HeaderMenuLinksList: FC = memo(() => {
  return (
    <>
      {getMenuMappingComponents("header", HeaderMenuLink)}
    </>
  );
})

export default HeaderMenuLinksList