'use server'

import { groupType } from '@/types/data'
import { revalidateTag } from 'next/cache'

export const removeUserFromGroup = async (
  groupData: groupType,
  userEmail: string,
  userType: 'members' | 'admins'
) => {
  revalidateTag('group update')
  const response = await fetch(
    `https://notez-backend-97b9381de6f9.herokuapp.com/remove/${userType}/${groupData.id}`,
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

  const data = await response.json()

  return data
}
