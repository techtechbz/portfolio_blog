import { FC, memo, ReactNode } from "react"

import Header from "@/uiParts/commonLayout/header/Header"
import Footer from "@/uiParts/commonLayout/footer/Footer"


type Props = {
  isDesktop: boolean
  children: ReactNode
}

const AppLayout: FC<Props> = memo(({ isDesktop, children }: Props) => {
  return (
    <main>
      <Header {...{isDesktop}} />
        {children}
      <Footer {...{isDesktop}} />
    </main>
  )
})
        
export default AppLayout