'use client'

import { ReactNode, createContext, useContext, useState } from 'react'
import { popupDataType } from '@/types/popupDataType'

interface contextData {
  popupData: popupDataType
  setPopupData: React.Dispatch<React.SetStateAction<popupDataType>>
}

export const PopupDataContext = createContext<contextData>({} as contextData)

export const PopupDataContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [popupData, setPopupData] = useState<popupDataType>({
    isVisible: false,
    children: <></>,
  })

  return (
    <PopupDataContext.Provider value={{ popupData, setPopupData }}>
      {children}
    </PopupDataContext.Provider>
  )
}

export const usePopupDataContext = (): contextData =>
  useContext(PopupDataContext)
