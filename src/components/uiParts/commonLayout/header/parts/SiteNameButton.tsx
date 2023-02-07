import { FC, memo } from "react"
import Link from "next/link"

import { SITE_NAME } from "@/constants/siteOverviews";


export const SiteNameButton: FC = memo(() => {
  return (
    <div className="SiteNameButton">
      <Link className="SiteNameButtonLink" href="/">
        {SITE_NAME}
      </Link>
    </div>
  )
})