'use server'

import { revalidateTag } from 'next/cache'

export const deleteGroup = async (groupId: string | undefined) => {
  revalidateTag('group update')
  const response = await fetch(
    `http://localhost:8080/delete/group/${groupId}`,
    {
      method: 'DELETE',
      cache: 'no-cache',
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
