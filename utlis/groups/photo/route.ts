'use server'

import { revalidateTag } from 'next/cache'

export const changeGroupPhoto = async (publicId: string, groupId: string) => {
  revalidateTag('get files')
  const response = await fetch(
    `https://notez-backend-97b9381de6f9.herokuapp.com/update/photo/${groupId}`,
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicId }),
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
