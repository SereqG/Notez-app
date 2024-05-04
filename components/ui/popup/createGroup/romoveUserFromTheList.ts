import { GroupMember } from '@/types/groupMember'
import { Dispatch, SetStateAction } from 'react'

interface props {
  userId: string
  userType: 'members' | 'admins'
  setGroupData: Dispatch<
    SetStateAction<{
      name: string
      members: GroupMember[]
      admins: GroupMember[]
      password: string
    }>
  >
  groupData: {
    name: string
    members: GroupMember[]
    admins: GroupMember[]
    password: string
  }
  setError: Dispatch<SetStateAction<string>>
  loggedUser: any
}

export const removeUserFromTheList = ({
  userId,
  userType,
  setGroupData,
  groupData,
  setError,
  loggedUser,
}: props) => {
  if (userId == loggedUser.id) {
    setError('You cannot remove yourself from the list')
  } else if (userType == 'members') {
    setError('')
    setGroupData({
      ...groupData,
      members: groupData[userType].filter((el) => el.id != userId),
      admins: groupData.admins.filter((el) => el.id != userId),
    })
  } else if (userType == 'admins') {
    setError('')
    setGroupData({
      ...groupData,
      admins: groupData[userType].filter((el) => el.id != userId),
    })
  }
}
