import { Dispatch, SetStateAction, useState } from 'react'
import { TextInput } from '../../inputs/TextInput'
import { MainButton } from '../../buttons/MainButton'
import { SquareButton } from '../../buttons/SquareButton'
import { IoSearchSharp } from 'react-icons/io5'
import { GroupMember } from '@/types/groupMember'
import { addUserToTheList } from '../../../../utlis/groups/post/addUserToTheList'
import { removeUserFromTheList } from '../../../../utlis/groups/post/romoveUserFromTheList'
import { useUser } from '@clerk/nextjs'
import { UserList } from '../../list/UserList'
import { validateUserWhenAddToTheGroup } from '@/utlis/general/validateUserWhenAddToTheGroup'

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
      <h1 className="text-base font-bold">Add a {userType}</h1>

      <div>
        <h2 className="text-sm">Find by email address</h2>
        <div className="flex">
          <TextInput
            onChange={handleInputChange}
            placeholder="User email"
            value={email}
          />
          <SquareButton
            onClick={() => {
              const userList = groupData[userType].map(
                (user) => user.emailAddress
              )
              const memberList = groupData.members.map(
                (user) => user.emailAddress
              )
              const validation = validateUserWhenAddToTheGroup({
                email,
                setError,
                userList,
                userType,
                memberList,
              })

              validation.then((res) => {
                if (res.isSuccess) {
                  addUserToTheList({
                    email: email,
                    setEmail: setEmail,
                    setError: setError,
                    userType: userType,
                    setGroupData: setGroupData,
                    groupData: groupData,
                  })
                }
              })
            }}
          >
            <IoSearchSharp />
          </SquareButton>
        </div>
        <p className="text-sm text-red-700">{error}</p>
      </div>
      <UserList
        userData={groupData[userType]}
        deleteUserOption={true}
        deleteUserFunction={(member: GroupMember) => {
          removeUserFromTheList({
            userId: member.id,
            userType: userType,
            setGroupData: setGroupData,
            groupData: groupData,
            setError: setError,
            loggedUser: user,
          })
        }}
      />
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
