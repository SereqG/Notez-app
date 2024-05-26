'use client'

import { usePopupDataContext } from '@/context/PopupData'
import { groupAndDataType, groupType } from '@/types/data'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { ListElementOption } from '../ui/popup/listElementOption/ListElementOption'

interface props {
  type: 'groups' | 'files'
  data: groupAndDataType
}

export function DataListElement({ data, type }: props) {
  const { popupData, setPopupData } = usePopupDataContext()
  return (
    <div className="flex min-h-16 items-center justify-between px-2">
      <div className="flex items-center">
        {type == 'files' ? (
          ''
        ) : (
          <div className="m-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
            {data.photo ? (
              <CldImage
                src={data.photo}
                alt="Group image"
                width={200}
                height={200}
                className="h-auto w-16 max-w-none"
              />
            ) : (
              <CldImage
                src={'sample'}
                alt="Group image"
                width={200}
                height={200}
                className="h-auto w-16 max-w-none"
              />
            )}
          </div>
        )}
        <div>
          <Link
            href={`/${type}/${data.id}`}
            className="font-bold hover:underline"
          >
            {data.name.length > 25 ? data.name.slice(0, 24) + '...' : data.name}
          </Link>
          <div className="flex gap-3 text-xs">
            <h3>Created at: {data.createdAt.slice(0, 10)}</h3>
          </div>
        </div>
      </div>
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 hover:bg-primary"
        onClick={() => {
          setPopupData({
            children: <ListElementOption groupId={data.id} />,
            isVisible: !popupData.isVisible,
          })
        }}
      >
        <BsThreeDotsVertical />
      </button>
    </div>
  )
}
