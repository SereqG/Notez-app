import { useState } from 'react'
import { MainButton } from '../ui/buttons/MainButton'
import { EditorComponent } from '../textEditor/EditorComponent'
import { TextInput } from '../ui/inputs/TextInput'
import { useUser } from '@clerk/nextjs'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { upload } from '@/utlis/files/upload/route'

interface props {
  groupId: string | undefined
}

export function AddNewFile({ groupId }: props) {
  const [step, setStep] = useState<
    'choose option' | 'add an existing file' | 'create new file'
  >('choose option')

  const [filename, setFilename] = useState<string>('')
  const [error, setError] = useState<string>('')

  const { user } = useUser()

  const uploadNewFile = () => {
    setError('')
    if (filename == '') {
      setError('Filename cannot be empty')
    } else {
      upload({
        content: editor?.getHTML(),
        filename: filename,
        author: user && user.emailAddresses[0].emailAddress,
        groupId: groupId && groupId,
      })
    }
  }

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class:
          'w-full h-[30vh] rounded-md overflow-y-auto border border-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-priamry',
      },
    },
  })

  if (step == 'choose option') {
    return (
      <div className="flex flex-col">
        <h1 className="text-base">New file</h1>
        <div className="flex w-[50%] flex-col gap-3 self-center">
          <MainButton onClick={() => setStep('create new file')}>
            Create new file
          </MainButton>
          <MainButton onClick={() => setStep('add an existing file')}>
            Add a file from your device
          </MainButton>
        </div>
      </div>
    )
  } else if (step == 'create new file') {
    return (
      <div className="pt-10">
        <TextInput
          placeholder="File name"
          onChange={(e) => {
            setFilename(e.currentTarget.value)
            setError('')
          }}
          name="fileName"
          value={filename}
        />
        <p className="text-xs text-red-500">{error}</p>
        <EditorComponent editor={editor} />
        <div className="mt-4">
          <MainButton onClick={() => uploadNewFile()}>Submit</MainButton>
        </div>
      </div>
    )
  }
}
