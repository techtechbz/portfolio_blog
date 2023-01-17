import { FC, memo } from "react"
import Link from "next/link"

import { SITE_NAME } from "@/constants/siteOverviews";


const HomeButton: FC = memo(() => {
  return (
    <div className="HomeButton">
      <Link className="HomeButtonLink" href="/">
        {SITE_NAME}
      </Link>
    </div>
  )
})

export default HomeButton