'use client'

import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io'
import { useEffect, useState } from 'react'
import { groupAndDataType, groupType } from '@/types/data'
import { FileList } from './FileList'
import { getAllFilesFromGroup } from '@/utlis/files/get/AllFiles/route'

interface props {
  group: groupType
}

export function Group({ group }: props) {
  const [isFileListOpen, setIsFileListOpen] = useState<boolean>(false)
  const [fileList, setFileList] = useState<groupAndDataType[]>([])

  useEffect(() => {
    getAllFilesFromGroup(group.id).then((data) => setFileList(data))
  }, [group])

  return (
    <div key={group.id} className="mt-4 w-64">
      <div className="flex w-full items-center">
        {group.photo && (
          <div className="mr-2 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
            <CldImage
              src={group.photo}
              alt="Group image"
              width={200}
              height={200}
              className="h-auto w-12 max-w-none"
            />
          </div>
        )}
        <div className="flex w-full items-center justify-between">
          <Link href={`/groups/${group.id}`} className="hover:underline">
            <h2 className="text-base font-bold">
              {group.name.length > 15
                ? group.name.slice(0, 14) + '...'
                : group.name}
            </h2>
          </Link>
          {group.files.length > 0 && (
            <button
              data-testid="group-btn"
              className="rounded-full p-2 transition-all duration-300 hover:bg-primary"
              onClick={() => setIsFileListOpen(!isFileListOpen)}
            >
              {isFileListOpen ? <IoIosArrowDown /> : <IoIosArrowBack />}
            </button>
          )}
        </div>
      </div>
      {isFileListOpen && <FileList fileList={fileList} />}
    </div>
  )
}
