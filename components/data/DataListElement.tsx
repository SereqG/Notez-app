'use client'

import { groupType } from '@/types/groupType'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import { BsThreeDotsVertical } from 'react-icons/bs'

export function DataListElement(data: any) {
  return (
    <div className="flex min-h-16 items-center justify-between px-2">
      <div className="flex items-center">
        <div className="m-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
          <CldImage
            src={data.data.photo}
            alt="Group image"
            width={200}
            height={200}
            className="h-auto w-16 max-w-none"
          />
        </div>
        <div>
          <Link
            href={`/groups/${data.data.id}`}
            className="font-bold hover:underline"
          >
            {data.data.name.length > 25
              ? data.data.name.slice(0, 24) + '...'
              : data.data.name}
          </Link>
          <div className="flex gap-3 text-xs">
            <h3>Members: {data.data.members.length}</h3>
            <h3>Created at: {data.data.createdAt.slice(0, 10)}</h3>
          </div>
        </div>
      </div>
      <button className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 hover:bg-primary">
        <BsThreeDotsVertical />
      </button>
    </div>
  )
}
