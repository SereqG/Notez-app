'use client'

import { SearchBar } from './SearchBar'
import { ButtonsSection } from '../ui/buttons/ButtonsSection'
import { DataList } from './DataList'
import { groupAndDataType, groupType } from '@/types/data'
import { Popup } from '../ui/popup/Popup'

import { usePopupDataContext } from '../../context/PopupData'
import { useSearchDataContext } from '@/context/SearchParam'
import { useEffect, useState } from 'react'
import { CreateGroup } from '../ui/popup/createGroup/CreateGroup'
import { GroupSettings } from '../ui/popup/groupSettings/GroupSettings'
import { getAllFilesFromGroup } from '@/utlis/files/get/AllFiles/route'
// import { fetchFiles } from '@/utlis/general/fetchFiles'

interface props {
  type: 'groups' | 'files'
  group: groupType[]
  groupId?: string
}

export function Data({ type, group, groupId }: props) {
  const { popupData, setPopupData } = usePopupDataContext()
  const { searchParams } = useSearchDataContext()
  const [data, setData] = useState<groupAndDataType[]>([])

  const groupButtons: {
    text: string
    onClick: () => void
  }[] = [
    {
      text: 'New group',
      onClick: () => {
        setPopupData({
          children: <CreateGroup />,
          isVisible: !popupData.isVisible,
        })
      },
    },
  ]

  const fileButtons: {
    text: string
    onClick: () => void
  }[] = [
    {
      text: 'Group settings',
      onClick: () => {
        setPopupData({
          children: <GroupSettings />,
          isVisible: !popupData.isVisible,
        })
      },
    },
    {
      text: 'New file',
      onClick: () => {
        setPopupData({
          children: <GroupSettings />,
          isVisible: !popupData.isVisible,
        })
      },
    },
  ]

  useEffect(() => {
    if (type == 'files') {
      if (groupId) {
        getAllFilesFromGroup(groupId).then((files) => {
          setData(files)
        })
      }
    } else {
      setData(group)
    }
  }, [group, groupId, type])

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
          <ButtonsSection
            buttons={type == 'groups' ? groupButtons : fileButtons}
          />
        </div>
        <main className="mt-6 max-h-[60vh] overflow-y-auto">
          <DataList data={dataToDisplay()} type={type} />
        </main>
      </div>
    </div>
  )
}
