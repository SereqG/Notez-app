'use client'

import { useState } from 'react'
import { ButtonsSection } from '../ui/buttons/ButtonsSection'
import { fileType } from '@/types/data'

interface props {
  file: fileType
}

export function File({ file }: props) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  const buttonsList = [
    {
      text: isEditMode ? 'Stop editing' : 'Edit',
      onClick: () => {
        setIsEditMode((isEditMode) => !isEditMode)
      },
    },
  ]

  return (
    <div className="h-[80vh] w-5/6 min-w-60 max-w-7xl py-8 lg:w-1/3 lg:min-w-[420px]">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-base font-bold">{file.name}</h1>
        <ButtonsSection buttons={buttonsList} />
      </div>
      {isEditMode ? (
        <div>{/* <TextEditor /> */}</div>
      ) : (
        <div className="h-[50vh] w-full overflow-y-auto rounded-md border border-white p-4">
          <div dangerouslySetInnerHTML={{ __html: file.content }} />
        </div>
      )}
    </div>
  )
}
