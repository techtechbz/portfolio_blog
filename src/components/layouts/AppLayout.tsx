import { FC, memo, ReactNode } from "react"

import Header from "@/components/uiParts/header/Header"
import Footer from "@/components/uiParts/footer/Footer"


type Props = {
  isMobile: boolean
  children: ReactNode
}

const AppLayout: FC<Props> = memo(({ isMobile, children }: Props) => {
  return (
    <main>
      <Header {...{isMobile}} />
        {children}
      <Footer {...{isMobile}} />
    </main>
  )
})
        
export default AppLayout