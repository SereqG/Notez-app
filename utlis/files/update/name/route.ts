'use server'

import { revalidateTag } from 'next/cache'

export const updateFileName = async (fileId: string, newName: string) => {
  revalidateTag('get files')
  const response = await fetch(
    `https://notez-backend-97b9381de6f9.herokuapp.com/file/${fileId}/${newName}`,
    {
      method: 'POST',
      mode: 'cors',
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
