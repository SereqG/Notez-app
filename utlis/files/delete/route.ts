'use server'

import { fileType } from '@/types/data'
import { revalidateTag } from 'next/cache'

interface props {
  fileId: string | undefined
  groupId: string | undefined
  file: fileType | undefined
}

export const deleteFileFromTheGroup = async ({
  fileId,
  groupId,
  file,
}: props) => {
  revalidateTag('get files')
  const response = await fetch(
    `http://localhost:8080/delete/file/${fileId}/${groupId}`,
    {
      method: 'DELETE',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ file: file }),
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
