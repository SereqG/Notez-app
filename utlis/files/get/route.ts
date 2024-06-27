'use server'

export const getFile = async (fileId: string) => {
  const response = await fetch(
    `https://notez-backend-97b9381de6f9.herokuapp.com/get/file/${fileId}`,
    {
      cache: 'no-cache',
    }
  )

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data: ${response.status} ${response.statusText}`
    )
  }

  console.log(response.ok)

  const data = await response.json()

  return data
}
