import { useState } from 'react'
import { TextInput } from '../../ui/inputs/TextInput'
import { EditorComponent } from '../../textEditor/EditorComponent'
import { MainButton } from '../../ui/buttons/MainButton'
import { upload } from '@/utlis/files/upload/route'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { useUser } from '@clerk/nextjs'
import { usePopupDataContext } from '@/context/PopupData'
import { useBottomPopupDataContext } from '@/context/BottomPopupContext'

interface props {
  groupId: string | undefined
}

export function CreateANote({ groupId }: props) {
  const [noteName, setNoteName] = useState<string>('')
  const [error, setError] = useState<string>('')

  const { popupData, setPopupData } = usePopupDataContext()
  const { bottomPopupData, setBottomPopupData } = useBottomPopupDataContext()

  const { user } = useUser()

  const uploadANote = () => {
    setError('')
    if (noteName == '') {
      setError('noteName cannot be empty')
    } else {
      upload({
        content: editor?.getHTML(),
        name: noteName,
        author: user && user.emailAddresses[0].emailAddress,
        groupId: groupId && groupId,
      })
      setPopupData({ ...popupData, isVisible: !popupData.isVisible })
      setBottomPopupData({
        isVisible: !bottomPopupData.isVisible,
        isSuccess: true,
      })
    }
  }

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class:
          'w-full h-[30vh] rounded-md overflow-y-auto border border-gray-700 p-6 focus:outline-none focus:border-primary focus:ring-1 focus:ring-priamry',
      },
    },
  })
  return (
    <div className="pt-10">
      <TextInput
        placeholder="Note name"
        onChange={(e) => {
          setNoteName(e.currentTarget.value)
          setError('')
        }}
        name="noteName"
        value={noteName}
      />
      <p className="text-xs text-red-500">{error}</p>
      <EditorComponent editor={editor} />
      <div className="mt-4">
        <MainButton onClick={() => uploadANote()}>Submit</MainButton>
      </div>
    </div>
  )
}
