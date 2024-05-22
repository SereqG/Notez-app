'use client'

import { SearchBar } from './SearchBar'
import { ButtonsSection } from './ButtonsSection'
import { DataList } from './DataList'
import { groupAndDataType, groupType } from '@/types/data'
import { Popup } from '../ui/popup/Popup'

import { usePopupDataContext } from '../../context/PopupData'
import { useSearchDataContext } from '@/context/SearchParam'

interface props {
  type: 'groups' | 'files'
  data: groupAndDataType[]
}

export function Data({ type, data }: props) {
  const { popupData } = usePopupDataContext()
  const { searchParams } = useSearchDataContext()

  const filterByName = () => {
    if (searchParams.typedName == '') {
      return data
    } else {
      return data.filter((el: groupAndDataType) =>
        el.name.toLowerCase().includes(searchParams.typedName.toLowerCase())
      )
    }
  }

  const sortAlphabetically = (alphabetically: boolean = true) => {
    if (alphabetically) {
      return filterByName().sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      )
    } else {
      return filterByName().sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1
      )
    }
  }

  const sortByTime = (theNewest: boolean = true) => {
    if (theNewest) {
      return filterByName().sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
    } else {
      return filterByName().sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
    }
  }

  const dataToDisplay = () => {
    if (data.length > 0) {
      if (searchParams.fileName !== '') {
        return searchParams.fileName === 'alphabetically'
          ? sortAlphabetically()
          : sortAlphabetically(false)
      } else if (searchParams.time !== '') {
        return searchParams.time === 'the newest'
          ? sortByTime()
          : sortByTime(false)
      } else {
        return filterByName()
      }
    } else {
      return []
    }
  }

  return (
    <div className="w-5/6 min-w-60 max-w-7xl lg:w-1/3 lg:min-w-[420px]">
      {popupData.isVisible && <Popup />}
      <SearchBar />
      <div className="">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-bold">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </h1>
          </div>
          <ButtonsSection />
        </div>
        <main className="mt-6 max-h-[60vh] overflow-y-auto">
          <DataList data={dataToDisplay()} />
        </main>
      </div>
    </div>
  )
}
