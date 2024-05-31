'use server'

import { revalidateTag } from 'next/cache'

export const leaveGroup = async (
  groupId: string | undefined,
  userEmail: string
) => {
  revalidateTag('group update')
  const response = await fetch(`http://localhost:8080/leave/${groupId}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userEmail }),
  })

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data: ${response.status} ${response.statusText}`
    )
  }

  const data = await response.json()

  return data
}
