'use client'

import '@/style/note.css'

import { EditorContent, Editor } from '@tiptap/react'
import Toolbar from './Toolbar'

interface props {
  editor: Editor | null
}

export function EditorComponent({ editor }: props) {
  return (
    <div className="w-full py-2">
      <div className="mt-4">
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
