'use server'

export const getAllFilesFromGroup = async (groupId: string) => {
  const response = await fetch(
    `http://localhost:8080/getAll/files/${groupId}`,
    {
      cache: 'no-cache',
      next: { tags: ['get files'] },
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
