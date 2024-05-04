import { GroupMember } from '@/types/groupMember'
import { GET } from '@/utlis/users/route'
import { Dispatch, SetStateAction } from 'react'

interface props {
  email: string
  setEmail: Dispatch<SetStateAction<string>>
  setError: Dispatch<SetStateAction<string>>
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
}

export const addUserToTheList = ({
  email,
  setEmail,
  setError,
  userType,
  setGroupData,
  groupData,
}: props) => {
  GET(email)
    .then((res) => res.json())
    .then((data) => {
      if (data.totalCount === 0) {
        setError('The user with the following email address does not exist!')
      } else {
        const userObject = {
          imageUrl: data.data[0].imageUrl,
          emailAddress: data.data[0].emailAddresses[0].emailAddress,
          id: data.data[0].id,
        }
        const isUserOnList = groupData[userType].some(
          (member) => member.emailAddress === userObject.emailAddress
        )
        if (isUserOnList) {
          setError('User is already a member!')
        } else {
          setError('')
          if (userType == 'members') {
            setGroupData({
              ...groupData,
              members: [...groupData[userType], userObject],
            })
          } else if (userType == 'admins') {
            const isUserOnList = groupData.members.some(
              (member) => member.emailAddress === userObject.emailAddress
            )
            if (isUserOnList) {
              setGroupData({
                ...groupData,
                admins: [...groupData[userType], userObject],
              })
            } else {
              setError('Admin has to be a member')
            }
          }
          setEmail('')
        }
      }
    })
}
