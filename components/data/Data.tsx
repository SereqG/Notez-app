'use client'

import { SearchBar } from './SearchBar'
import { ButtonsSection } from './ButtonsSection'
import { DataList } from './DataList'
import { groupType } from '@/types/groupType'
import { Popup } from '../ui/popup/Popup'

import { usePopupDataContext } from '../../context/PopupData'

interface props {
  type: string
  groups: groupType
}

export function Data({ type, groups }: props) {
  const { popupData } = usePopupDataContext()

  return (
    <div className="w-5/6 min-w-60 max-w-7xl lg:w-1/3 lg:min-w-[420px]">
      {popupData.isVisible && <Popup />}
      <SearchBar />
      <div className="">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-bold">{type}</h1>
          </div>
          <ButtonsSection />
        </div>
        <main className="mt-6 max-h-[60vh] overflow-y-auto">
          <DataList data={groups} />
        </main>
      </div>
    </div>
  )
}
