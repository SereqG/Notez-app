import { useEffect, useState } from 'react'
import { UserList } from '@/components/ui/list/UserList'
import { GroupMember } from '@/types/groupMember'
import { fetchAndProcessUserData } from '@/utlis/general/fetchAndProcessUserData'

interface Props {
  userIds: string[]
}

export function MembersList({ userIds }: Props) {
  const [groupUsers, setGroupUsers] = useState<GroupMember[]>([])

  useEffect(() => {
    fetchAndProcessUserData(userIds, setGroupUsers)
  }, [userIds])

  return (
    <div>
      <UserList userData={groupUsers} deleteUserOption={false} />
    </div>
  )
}
