'use server'

import { revalidateTag } from 'next/cache'

interface props {
  content: string | undefined
  name: string
  author: string | null | undefined
  groupId: string | undefined
  photo?: string
}

export const upload = async ({
  content,
  name,
  author,
  groupId,
  photo,
}: props) => {
  revalidateTag('get files')
  const response = await fetch(`http://localhost:8080/post/file`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, name, author, groupId, photo }),
  })

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data: ${response.status} ${response.statusText}`
    )
  }

  const data = await response.json()

  return data
}
