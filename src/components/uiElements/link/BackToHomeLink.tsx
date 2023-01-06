import { FC, memo } from "react"
import Link from "next/link"


const BackToHomeLink: FC = memo(() => {
  return(
    <Link className="BackToHomeLink" href="/">
      ← ホームへ戻る
    </Link>
  )
})

export default BackToHomeLink