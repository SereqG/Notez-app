'use server'

import { revalidateTag } from 'next/cache'

interface props {
  formData: FormData
}

export async function uploadExisting({ formData }: props) {
  try {
    revalidateTag('get files')
    const res = await fetch('http://localhost:8080/upload/existing/file', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error uploading file:', error)
  }
}
