import { FC, memo } from "react"
import Link from "next/link"

import { menuLinks } from "@/common/types/menuLinks"
import { getMenuMappingComponents } from "@/components/functional/getMenuMappingComponents"


const HeaderMenuLink: FC<menuLinks> = memo(({ text, href }: menuLinks) => {
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