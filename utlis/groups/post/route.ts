'use server'

import { revalidateTag } from 'next/cache'

interface props {
  name: string
  members: { imageUrl?: string; emailAddress: string; id: string }[]
  admins: { imageUrl?: string; emailAddress: string; id: string }[]
  password: string
}

export const POST = async ({ name, members, admins, password }: props) => {
  revalidateTag('group update')

  const response = await fetch(
    `https://notez-backend-97b9381de6f9.herokuapp.com/post/group`,
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, members, admins, password }),
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
