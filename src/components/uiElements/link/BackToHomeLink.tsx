import { FC, memo } from "react"
import Link from "next/link"


const BackToHomeLink: FC = memo(() => {
  return(
    <div className="BackToHomeLink">
      <Link href="/">
        ← ホームへ戻る
      </Link>
    </div>
  )
})

export default BackToHomeLink