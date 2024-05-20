import { Dispatch, SetStateAction } from 'react'
import { GET } from '../users/route'

interface props {
  email: string
  setError: Dispatch<SetStateAction<string>>
  userList: string[]
  userType: 'members' | 'admins'
  memberList?: string[]
}

export async function validateUserWhenAddToTheGroup({
  email,
  setError,
  userList,
  userType,
  memberList,
}: props) {
  let success: boolean = false

  await GET(email)
    .then((res) => res.json())
    .then((data) => {
      setError('')
      if (data.totalCount == 0) {
        setError('User do not exists')
      } else if (userList.includes(email)) {
        setError('User is already on the list')
      } else if (userType == 'admins') {
        if (memberList?.includes(email)) {
          success = true
        } else {
          console.log(memberList)
          console.log(memberList?.includes(email))
          setError('Admin has to be member')
        }
      } else {
        success = true
      }
    })
  return { isSuccess: success }
}
