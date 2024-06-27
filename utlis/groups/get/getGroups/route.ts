export const getGroups = async (userId: string) => {
  const response = await fetch(
    `https://notez-backend-97b9381de6f9.herokuapp.com/group/${userId}`,
    {
      cache: 'no-cache',
      next: { tags: ['group update'] },
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
