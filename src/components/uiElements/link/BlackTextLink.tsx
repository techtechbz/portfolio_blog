import { FC, memo, ReactNode } from "react"
import Link from "next/link"


type Props = {
  children?: ReactNode
  href: string
}

export const BlackTextLink: FC<Props> = memo(({ children, href }: Props) => {
  return (
    <Link className="BlackTextLink" href={href}>
      {children}
    </Link>
  );
})
