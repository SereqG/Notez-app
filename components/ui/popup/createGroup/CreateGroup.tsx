import { useState, ChangeEvent, useEffect } from 'react'
import { TextInput } from '../../inputs/TextInput'
import { MainButton } from '../../buttons/MainButton'
import { AddMember } from './AddMember'
import { usePopupDataContext } from '@/context/PopupData'
import { AddUser } from './AddUser'
import { useUser } from '@clerk/clerk-react'
import { POST } from '@/utlis/groups/post/route'

interface Member {
  imageUrl?: string
  emailAddress: string
  id: string
}

interface GroupData {
  name: string
  members: Member[]
  admins: Member[]
  password: string
}

export function CreateGroup() {
  const { popupData, setPopupData } = usePopupDataContext()
  const [modalType, setModalType] = useState<string>('')
  const [error, setError] = useState<string>('')

  const [groupData, setGroupData] = useState<GroupData>({
    name: '',
    members: [],
    admins: [],
    password: '',
  })

  const { user } = useUser()

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof GroupData
  ) => {
    const { value } = e.target
    setGroupData({ ...groupData, [key]: value })
  }

  const handleAddUser = (type: string) => {
    setModalType(type)
  }

  const handleCreateGroup = () => {
    if (groupData.name !== '') {
      const res = POST(groupData)

      setPopupData({
        ...popupData,
        isVisible: false,
      })
    } else {
      setError('Name field cannot be empty!')
    }
  }

  useEffect(() => {
    user?.emailAddresses[0].emailAddress !== undefined &&
      setGroupData({
        ...groupData,
        members: [
          {
            imageUrl: user?.imageUrl,
            emailAddress: user?.emailAddresses[0].emailAddress,
            id: user.id,
          },
        ],
        admins: [
          {
            imageUrl: user?.imageUrl,
            emailAddress: user?.emailAddresses[0].emailAddress,
            id: user.id,
          },
        ],
      })
  }, [])

  if (modalType === 'member') {
    return (
      <AddMember
        groupData={groupData}
        setGroupData={setGroupData}
        userType={'members'}
        setModalType={setModalType}
      />
    )
  } else if (modalType === 'admin') {
    return (
      <AddMember
        groupData={groupData}
        setGroupData={setGroupData}
        userType={'admins'}
        setModalType={setModalType}
      />
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-bold">Create new group</h1>

      <div>
        <h2>Group name</h2>
        <TextInput
          onChange={(e) => handleInputChange(e, 'name')}
          placeholder="Group name"
          value={groupData.name}
        />
        <p className="text-sm text-red-700">{error}</p>
      </div>

      <AddUser
        header="Members"
        listToRender={groupData.members}
        buttonOnClick={() => handleAddUser('member')}
        buttonText="Add member"
      />
      <AddUser
        header="Admins"
        listToRender={groupData.admins}
        buttonOnClick={() => handleAddUser('admin')}
        buttonText="Add admin"
      />

      <div>
        <h2>Set password</h2>
        <TextInput
          onChange={(e) => handleInputChange(e, 'password')}
          placeholder="Password"
          value={groupData.password}
        />
      </div>

      <MainButton onClick={handleCreateGroup}>Create</MainButton>
    </div>
  )
}
