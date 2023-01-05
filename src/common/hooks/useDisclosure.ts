import { useState, useCallback, KeyboardEvent, MouseEvent } from "react"


/**
 * メニューの状態を管理する。
 * @return isOpen メニューが開かれているか
 * @return onOpen メニューを開く
 * @return onClose メニューを閉じる
 */
export const useDisclosure = (): {
  isOpen: boolean,
  // eslint-disable-next-line no-unused-vars
  onOpen: (event: KeyboardEvent | MouseEvent) => void,
  // eslint-disable-next-line no-unused-vars
  onClose: (event: KeyboardEvent | MouseEvent) => void
} => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDrawer = useCallback((willOpen: boolean) => 
  (event: KeyboardEvent | MouseEvent) => {
    if (event.type === "keydown" && ((event as KeyboardEvent).key === "Tab" || (event as KeyboardEvent).key === "Shift")) {
      return
    }
    setIsOpen(willOpen)
  }, [])
  const onOpen = toggleDrawer(true)
  const onClose = toggleDrawer(false)

  return { isOpen, onOpen, onClose }
}
