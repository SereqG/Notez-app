'use server'

export const getParticularGroup = async (groupId: string) => {
  console.log('update')
  const response = await fetch(`http://localhost:8080/get/group/${groupId}`, {
    cache: 'no-cache',
    next: { tags: ['particular group update'] },
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
