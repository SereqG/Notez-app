import { TextInput } from '@/components/ui/inputs/TextInput'
import { Dispatch, SetStateAction, useState } from 'react'

import { groupType } from '@/types/data'
import { updateName } from '@/utlis/groups/groupNameUpdate/route'
import { SquareButton } from '@/components/ui/buttons/SquareButton'
import { FaCheck } from 'react-icons/fa6'
import { useBottomPopupDataContext } from '@/context/BottomPopupContext'
import { MainButton } from '@/components/ui/buttons/MainButton'
import { uploadFile } from '@/utlis/groups/photo/uploadFile'

export function ChangePhoto() {
  const [content, setContent] = useState<'form' | 'message'>('form')

  const { bottomPopupData, setBottomPopupData } = useBottomPopupDataContext()

  const uploadFileWithGroupId = uploadFile.bind(
    null,
    '6659e7628fb2c7e4f87acbb4'
  )

  return (
    <div className="flex">
      <form action={uploadFileWithGroupId} className="flex flex-col">
        <label htmlFor="img">Upload image</label>
        <input type="file" name="img" id="img" />
        <div className="w-36">
          <MainButton onClick={() => setContent('message')}>Submit</MainButton>
        </div>
      </form>
    </div>
  )
}
