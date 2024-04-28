export const getGroups = async (userId: string) => {
  const response = await fetch(`http://localhost:8080/group/${userId}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data: ${response.status} ${response.statusText}`
    )
  }

  const data = await response.json()

  return data
}
