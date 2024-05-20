'use server'

import { groupType } from '@/types/groupType'
import { revalidateTag } from 'next/cache'

export const removeUserFromGroup = async (
  groupData: groupType,
  userEmail: string,
  userType: 'members' | 'admins'
) => {
  revalidateTag('group update')
  const response = await fetch(
    `http://localhost:8080/remove/${userType}/${groupData.id}`,
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userEmail, userList: groupData[userType] }),
    }
  )

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data: ${response.status} ${response.statusText}`
    )
  }

  console.log(response.ok)

  const data = await response.json()

  return data
}
