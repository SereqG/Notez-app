'use server'

import { revalidateTag } from 'next/cache'

export const updateName = async (name: string, id: string) => {
  revalidateTag('particular group update')
  const response = await fetch(`http://localhost:8080/group/${id}/${name}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data: ${response.status} ${response.statusText}`
    )
  }

  const data = await response.json()

  return data
}
