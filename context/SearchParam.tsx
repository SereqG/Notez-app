'use client'

import { ReactNode, createContext, useContext, useState } from 'react'
import { searchParams } from '@/types/searchParams'

interface contextData {
  searchParams: searchParams
  setSearchParams: React.Dispatch<React.SetStateAction<searchParams>>
}

export const SearchDataContext = createContext<contextData>({} as contextData)

export const SearchDataContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [searchParams, setSearchParams] = useState<searchParams>({
    typedName: '',
    time: '',
    authorId: '',
    fileName: '',
    markedByStar: false,
  })

  return (
    <SearchDataContext.Provider value={{ searchParams, setSearchParams }}>
      {children}
    </SearchDataContext.Provider>
  )
}

export const useSearchDataContext = (): contextData =>
  useContext(SearchDataContext)
