import { TextInput } from '@/components/ui/inputs/TextInput'
import { Dispatch, SetStateAction, useState } from 'react'

import { groupType } from '@/types/data'
import { updateName } from '@/utlis/groups/groupNameUpdate/route'
import { SquareButton } from '@/components/ui/buttons/SquareButton'
import { FaCheck } from 'react-icons/fa6'
import { useBottomPopupDataContext } from '@/context/BottomPopupContext'

interface props {
  data: groupType
  setData: Dispatch<SetStateAction<groupType | undefined>>
}

export function ChangeGroupName({ data, setData }: props) {
  const [name, setName] = useState<string>('')

  const { bottomPopupData, setBottomPopupData } = useBottomPopupDataContext()

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
          updateName(name, data.id).then((data) =>
            setBottomPopupData({ isVisible: true, isSuccess: data.isSuccess })
          )
          setData({ ...data, name: name })
        }}
      >
        <FaCheck />
      </SquareButton>
    </div>
  )
}
