import { Dispatch, SetStateAction, useState } from 'react'
import { TextInput } from '../../inputs/TextInput'
import { MainButton } from '../../buttons/MainButton'
import { SquareButton } from '../../buttons/SquareButton'
import { IoClose, IoSearchSharp } from 'react-icons/io5'
import { GroupMember } from '@/types/groupMember'
import { UserIcon } from '../../user/UserIcon'
import { addUserToTheList } from './addUserToTheList'
import { removeUserFromTheList } from './romoveUserFromTheList'
import { useUser } from '@clerk/nextjs'
import { postGroups } from '@/utlis/groups/postGroup'

interface AddUserProps {
  userType: 'admins' | 'members'
  groupData: {
    name: string
    members: GroupMember[]
    admins: GroupMember[]
    password: string
  }
  setGroupData: Dispatch<
    SetStateAction<{
      name: string
      members: GroupMember[]
      admins: GroupMember[]
      password: string
    }>
  >
  setModalType: Dispatch<SetStateAction<string>>
}

export function AddMember({
  groupData,
  setGroupData,
  userType,
  setModalType,
}: AddUserProps) {
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string>('')

  const { user } = useUser()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-bold">Add a {userType}</h1>

      <div>
        <h2>Find by email address</h2>
        <div className="flex">
          <TextInput
            onChange={handleInputChange}
            placeholder="User email"
            value={email}
          />
          <SquareButton
            onClick={() =>
              addUserToTheList({
                email: email,
                setEmail: setEmail,
                setError: setError,
                userType: userType,
                setGroupData: setGroupData,
                groupData: groupData,
              })
            }
          >
            <IoSearchSharp />
          </SquareButton>
        </div>
        <p className="text-sm text-red-700">{error}</p>
      </div>
      <div className="flex flex-col gap-2">
        <h2>User list</h2>
        <div className="flex max-h-40 flex-col gap-2 overflow-auto">
          {groupData[userType].map((member, index) => (
            <div key={index} className="flex h-10 justify-between">
              <UserIcon photoOnly={false} userData={member} />
              <SquareButton
                onClick={() =>
                  removeUserFromTheList({
                    userId: member.id,
                    userType: userType,
                    setGroupData: setGroupData,
                    groupData: groupData,
                    setError: setError,
                    loggedUser: user,
                  })
                }
              >
                <IoClose />
              </SquareButton>
            </div>
          ))}
        </div>
      </div>
      <MainButton
        onClick={() => {
          setModalType('')
        }}
      >
        Done
      </MainButton>
    </div>
  )
}
