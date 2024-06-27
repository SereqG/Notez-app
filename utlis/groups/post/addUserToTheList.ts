import { GroupMember } from '@/types/groupMember'
import { GET } from '@/utlis/users/route'
import { Dispatch, SetStateAction } from 'react'

interface BaseGroupData {
  members: GroupMember[]
  admins: GroupMember[]
}

interface Props<T extends BaseGroupData> {
  email: string
  setEmail: Dispatch<SetStateAction<string>>
  setError: Dispatch<SetStateAction<string>>
  userType: 'members' | 'admins'
  setGroupData: Dispatch<SetStateAction<T>>
  groupData: T
}

export const addUserToTheList = <T extends BaseGroupData>({
  email,
  setEmail,
  userType,
  setGroupData,
  groupData,
}: Props<T>) => {
  GET(email)
    .then((res) => res.json())
    .then((data) => {
      const userObject = {
        imageUrl: data.data[0].imageUrl,
        emailAddress: data.data[0].emailAddresses[0].emailAddress,
        id: data.data[0].id,
      }
      if (userType == 'members') {
        setGroupData({
          ...groupData,
          members: [...groupData[userType], userObject],
        })
      } else if (userType == 'admins') {
        setGroupData({
          ...groupData,
          admins: [...groupData[userType], userObject],
        })
      }
      setEmail('')
    })
}
