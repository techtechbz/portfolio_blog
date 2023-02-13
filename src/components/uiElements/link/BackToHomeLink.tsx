import { FC, memo } from "react"
import Link from "next/link"


export const BackToHomeLink: FC = memo(() => {
  return(
    <div className="BackToHomeLink">
      <Link href="/">
        ← ホームへ戻る
      </Link>
    </div>
  )
})
