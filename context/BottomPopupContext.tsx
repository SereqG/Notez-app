'use client'

import { bottomPopupDataType } from '@/types/bottomPopupDataType'
import { ReactNode, createContext, useContext, useState } from 'react'

interface contextData {
  bottomPopupData: bottomPopupDataType
  setBottomPopupData: React.Dispatch<React.SetStateAction<bottomPopupDataType>>
}

export const BottomPopupDataContext = createContext<contextData>(
  {} as contextData
)

export const BottomPopupDataContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [bottomPopupData, setBottomPopupData] = useState<bottomPopupDataType>({
    isVisible: false,
    isSuccess: true,
  })

  return (
    <BottomPopupDataContext.Provider
      value={{ bottomPopupData, setBottomPopupData }}
    >
      {children}
    </BottomPopupDataContext.Provider>
  )
}

export const useBottomPopupDataContext = (): contextData =>
  useContext(BottomPopupDataContext)
