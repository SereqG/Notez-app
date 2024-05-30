'use server'

import { revalidateTag } from 'next/cache'

export const updateFileName = async (fileId: string, newName: string) => {
  revalidateTag('get files')
  const response = await fetch(
    `http://localhost:8080/file/${fileId}/${newName}`,
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
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
