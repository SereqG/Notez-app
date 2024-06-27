export const GET = async (userEmail: string) => {
  const response = await fetch(
    `https://notez-backend-97b9381de6f9.herokuapp.com/user/${userEmail}`,
    {
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data: ${response.status} ${response.statusText}`
    )
  }

  const data = await response.json()

  return Response.json(data)
}
