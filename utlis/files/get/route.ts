'use server'

export const getFile = async (fileId: string) => {
  const response = await fetch(`http://localhost:8080/get/file/${fileId}`, {
    cache: 'no-cache',
  })

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data: ${response.status} ${response.statusText}`
    )
  }

  console.log(response.ok)

  const data = await response.json()

  return data
}
