'use client'

import React from 'react'
import { type Editor } from '@tiptap/react'
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
  Heading3,
  Heading1,
} from 'lucide-react'
import StarterKit from '@tiptap/starter-kit'

type Props = {
  editor: Editor | null
}

const Toolbar = ({ editor }: Props) => {
  const iconStyle = 'h-4 w-4'

  if (!editor) {
    return null
  }
  return (
    <div
      className="flex w-full flex-wrap items-start justify-between gap-5 rounded-tl-md
    rounded-tr-md border border-gray-700 px-4 py-3"
    >
      <div className="flex flex-col flex-wrap">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleBold().run()
            }}
            className={
              editor.isActive('bold')
                ? 'rounded-lg bg-primary p-2 text-white'
                : 'p-2 text-white'
            }
          >
            <Bold className={iconStyle} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleItalic().run()
            }}
            className={
              editor.isActive('italic')
                ? 'rounded-lg bg-primary p-2 text-white'
                : 'p-2 text-white'
            }
          >
            <Italic className={iconStyle} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleUnderline().run()
            }}
            className={
              editor.isActive('underline')
                ? 'rounded-lg bg-primary p-2 text-white'
                : 'p-2 text-white'
            }
          >
            <Underline className={iconStyle} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleStrike().run()
            }}
            className={
              editor.isActive('strike')
                ? 'rounded-lg bg-primary p-2 text-white'
                : 'p-2 text-white'
            }
          >
            <Strikethrough className={iconStyle} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }}
            className={
              editor.isActive('heading', { level: 1 })
                ? 'rounded-lg bg-primary p-2 text-white'
                : 'p-2 text-white'
            }
          >
            <Heading1 className={iconStyle} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }}
            className={
              editor.isActive('heading', { level: 2 })
                ? 'rounded-lg bg-primary p-2 text-white'
                : 'p-2 text-white'
            }
          >
            <Heading2 className={iconStyle} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }}
            className={
              editor.isActive('heading', { level: 3 })
                ? 'rounded-lg bg-primary p-2 text-white'
                : 'p-2 text-white'
            }
          >
            <Heading3 className={iconStyle} />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleBulletList().run()
            }}
            className={
              editor.isActive('bulletList')
                ? 'rounded-lg bg-primary p-2 text-white'
                : 'p-2 text-white'
            }
          >
            <List className={iconStyle} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleOrderedList().run()
            }}
            className={
              editor.isActive('orderedList')
                ? 'rounded-lg bg-primary p-2 text-white'
                : 'p-2 text-white'
            }
          >
            <ListOrdered className={iconStyle} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleBlockquote().run()
            }}
            className={
              editor.isActive('blockquote')
                ? 'rounded-lg bg-primary p-2 text-white'
                : 'p-2 text-white'
            }
          >
            <Quote className={iconStyle} />
          </button>
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().undo().run()
            }}
            className={
              editor.isActive('undo')
                ? 'rounded-lg bg-primary p-2 text-white'
                : 'p-2 text-white'
            }
          >
            <Undo className={iconStyle} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().redo().run()
            }}
            className={
              editor.isActive('redo')
                ? 'rounded-lg bg-primary p-2 text-white'
                : 'p-2 text-white'
            }
          >
            <Redo className={iconStyle} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Toolbar
