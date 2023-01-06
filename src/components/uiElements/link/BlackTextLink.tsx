import { FC, memo, ReactNode } from "react"
import Link from "next/link"


type Props = {
  children?: ReactNode
  href: string
}

const BlackTextLink: FC<Props> = memo(({ children, href }: Props) => {
  return (
    <Link className="BlackTextLink" href={href}>
      {children}
    </Link>
  );
})

export default BlackTextLink