'use server'

import { revalidateTag } from 'next/cache'

interface props {
  formData: FormData
}

export async function uploadExisting({ formData }: props) {
  try {
    revalidateTag('get files')
    const res = await fetch(
      'https://notez-backend-97b9381de6f9.herokuapp.com/upload/existing/file',
      {
        method: 'POST',
        body: formData,
      }
    )

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error uploading file:', error)
  }
}
