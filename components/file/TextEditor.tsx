'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { MainButton } from '../ui/buttons/MainButton'
import { saveContentChanges } from '@/utlis/files/update/changes/route'
import { fileType } from '@/types/data'

const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null
  }

  const buttonStyle =
    'flex items-center border border-primary px-4 py-1 hover:bg-primary-hover'

  return (
    <div className="flex flex-wrap gap-4 border-b border-white p-2">
      <button
        className={buttonStyle + ' font-bold'}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonStyle + ' italic'}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={buttonStyle + ' line-through'}
      >
        strike
      </button>
      <button
        className={buttonStyle}
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        clear effects
      </button>

      <div></div>
    </div>
  )
}

interface props {
  file: fileType
}

export function TextEditor({ file }: props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: file.content && file.content,
    editorProps: {
      attributes: {
        spellcheck: 'false',
        class:
          'w-full p-4 h-[50vh] rounded-md overflow-y-auto border border-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-priamry',
      },
    },
  })

  return (
    <div className="flex flex-col gap-2">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <div className="flex justify-end">
        <MainButton
          onClick={() => {
            saveContentChanges(file.id, editor?.getHTML())
          }}
        >
          Save
        </MainButton>
      </div>
    </div>
  )
}
