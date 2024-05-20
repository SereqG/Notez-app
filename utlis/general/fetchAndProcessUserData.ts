import { Dispatch, SetStateAction } from 'react'
import { GET } from '../users/route'
import { GroupMember } from '@/types/groupMember'

interface props {
  userIds: string[]
  setState: Dispatch<SetStateAction<GroupMember[]>>
}

export async function fetchAndProcessUserData(
  userIds: string[],
  setState: Dispatch<SetStateAction<GroupMember[]>>
) {
  try {
    const fetchedUsers = await Promise.all(
      userIds.map(async (userId) => {
        const response = await GET(userId)
        const data: {
          totalCount: number
          data: {
            imageUrl?: string
            emailAddresses: { emailAddress: string }[]
            id: string
          }[]
        } = await response.json()
        return data.data[0]
      })
    )

    const uniqueUsers = Array.from(
      new Map(fetchedUsers.map((user) => [user.id, user])).values()
    )

    const processedUserData = uniqueUsers.map(
      ({ id, imageUrl, emailAddresses }) => ({
        id,
        imageUrl,
        emailAddress: emailAddresses[0].emailAddress,
      })
    )

    setState(processedUserData)
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}
