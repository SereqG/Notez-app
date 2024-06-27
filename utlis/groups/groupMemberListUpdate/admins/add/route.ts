'use server'

import { revalidateTag } from 'next/cache'

export const updateAdmins = async (groupId: string, list: string[]) => {
  revalidateTag('group update')
  const response = await fetch(
    `https://notez-backend-97b9381de6f9.herokuapp.com/admins/${groupId}`,
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ list }),
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
