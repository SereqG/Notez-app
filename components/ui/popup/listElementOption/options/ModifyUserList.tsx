import { SquareButton } from '@/components/ui/buttons/SquareButton'
import { TextInput } from '@/components/ui/inputs/TextInput'
import { groupType } from '@/types/data'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { updateMembers } from '@/utlis/groups/groupMemberListUpdate/members/add/route'

import { FaCheck } from 'react-icons/fa6'
import { UserList } from '@/components/ui/list/UserList'
import { fetchAndProcessUserData } from '@/utlis/general/fetchAndProcessUserData'
import { removeUserFromGroup } from '@/utlis/groups/groupMemberListUpdate/members/remove/route'
import { GroupMember } from '@/types/groupMember'
import { updateAdmins } from '@/utlis/groups/groupMemberListUpdate/admins/add/route'
import { validateUserWhenAddToTheGroup } from '@/utlis/general/validateUserWhenAddToTheGroup'
import { useBottomPopupDataContext } from '@/context/BottomPopupContext'

interface props {
  data: groupType
  userType: 'members' | 'admins'
  setData: Dispatch<SetStateAction<groupType | undefined>>
}

export function ModifyUserList({ data, userType, setData }: props) {
  const [email, setEmail] = useState<string>('')
  const [userList, setUserList] = useState<any[]>([])
  const [error, setError] = useState<string>('')
  const [memberList, setMemberList] = useState<any[]>([])

  const { bottomPopupData, setBottomPopupData } = useBottomPopupDataContext()

  useEffect(() => {
    fetchAndProcessUserData(data[userType], setUserList)
    fetchAndProcessUserData(data.members, setMemberList)
  }, [data, userType])

  return (
    <div>
      <div className="flex">
        <TextInput
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder="User email"
          value={email}
        />
        <SquareButton
          onClick={() => {
            const currentUserList = userList.map((user) => user.emailAddress)
            const currentMemberList = memberList.map(
              (user) => user.emailAddress
            )
            const validation = validateUserWhenAddToTheGroup({
              email,
              setError,
              userList: currentUserList,
              userType,
              memberList: currentMemberList,
            })

            validation.then((res) => {
              if (res.isSuccess) {
                if (userType == 'members') {
                  setData({ ...data, members: [...currentUserList, email] })
                  updateMembers(data.id, [...currentUserList, email]).then(
                    (data) =>
                      setBottomPopupData({
                        isVisible: true,
                        isSuccess: data.isSuccess,
                      })
                  )
                } else {
                  setData({ ...data, admins: [...currentUserList, email] })
                  updateAdmins(data.id, [...currentUserList, email]).then(
                    (data) =>
                      setBottomPopupData({
                        isVisible: true,
                        isSuccess: data.isSuccess,
                      })
                  )
                }
              }
            })
          }}
        >
          <FaCheck />
        </SquareButton>
      </div>
      <p className="text-sm text-red-700">{error}</p>
      <UserList
        userData={userList}
        deleteUserOption={true}
        deleteUserFunction={(user: GroupMember) => {
          const update = removeUserFromGroup(
            data,
            user.emailAddress,
            userType
          ).then((newData) =>
            setData({ ...data, [userType]: newData.data[userType] })
          )
        }}
      />
    </div>
  )
}
