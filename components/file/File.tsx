'use client'

import { useState } from 'react'
import { ButtonsSection } from '../ui/buttons/ButtonsSection'
import { fileType } from '@/types/data'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { EditorComponent } from '../textEditor/EditorComponent'
import { saveContentChanges } from '@/utlis/files/update/changes/route'
import { useBottomPopupDataContext } from '@/context/BottomPopupContext'
import { BottomPopup } from '../ui/popup/bottomPopup/BottomPopup'

interface props {
  file: fileType
}

export function File({ file }: props) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const { bottomPopupData, setBottomPopupData } = useBottomPopupDataContext()

  console.log(bottomPopupData)

  const buttonList = [
    {
      text: isEditMode ? 'Stop editing' : 'Edit',
      onClick: () => {
        setIsEditMode((isEditMode) => !isEditMode)
      },
    },
  ]

  const buttonListEditMode = [
    {
      text: 'Save changes',
      onClick: () => {
        saveContentChanges(file.id, editor?.getHTML()).then((res) => {
          setBottomPopupData({
            isVisible: !bottomPopupData.isVisible,
            isSuccess: res.isSuccess,
          })
        })
      },
    },
    {
      text: isEditMode ? 'Stop editing' : 'Edit',
      onClick: () => {
        setIsEditMode((isEditMode) => !isEditMode)
      },
    },
  ]

  const editor = useEditor({
    content: file.content,
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class:
          'w-full h-[30vh] rounded-md overflow-y-auto border border-gray-700 p-6 focus:outline-none focus:border-primary focus:ring-1 focus:ring-priamry',
      },
    },
  })

  return (
    <div className="h-[80vh] w-5/6 min-w-60 max-w-7xl py-8 lg:w-1/3 lg:min-w-[420px]">
      {bottomPopupData.isVisible && <BottomPopup />}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-base font-bold">{file.name}</h1>
        <ButtonsSection
          buttons={isEditMode ? buttonListEditMode : buttonList}
        />
      </div>
      {isEditMode ? (
        <div>
          <EditorComponent editor={editor} />
        </div>
      ) : (
        <div className="h-[50vh] w-full overflow-y-auto rounded-md border border-white p-4">
          <div dangerouslySetInnerHTML={{ __html: file.content }} />
        </div>
      )}
    </div>
  )
}
