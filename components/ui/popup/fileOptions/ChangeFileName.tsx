import { TextInput } from '@/components/ui/inputs/TextInput'
import { Dispatch, SetStateAction, useState } from 'react'

import { fileType } from '@/types/data'
import { SquareButton } from '@/components/ui/buttons/SquareButton'
import { FaCheck } from 'react-icons/fa6'
import { updateFileName } from '@/utlis/files/update/name/route'
import { useRouter } from 'next/navigation'
import { useBottomPopupDataContext } from '@/context/BottomPopupContext'

interface props {
  file: fileType
  setData: Dispatch<SetStateAction<fileType | undefined>>
}

export function ChangeFileName({ file, setData }: props) {
  const [name, setName] = useState<string>('')

  const { bottomPopupData, setBottomPopupData } = useBottomPopupDataContext()

  const router = useRouter()
  return (
    <div className="flex">
      <TextInput
        placeholder="Group name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        name="newName"
      />
      <SquareButton
        onClick={() => {
          updateFileName(file.id, name).then((data) => {
            setBottomPopupData({ isVisible: true, isSuccess: data.isSuccess })
          }),
            setData({ ...file, name: name })
          router.refresh()
        }}
      >
        <FaCheck />
      </SquareButton>
    </div>
  )
}
