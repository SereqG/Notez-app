import { Data } from '@/components/data/Data'
import { getGroups } from '@/utlis/groups/getGroups'
import { GET } from '@/utlis/users/route'
import { currentUser } from '@clerk/nextjs/server'

export default async function Page() {
  const user = await currentUser()

  const { groups } = user && (await getGroups(user.id))
  return (
    <div className="flex w-full justify-center">
      <Data type="Groups" groups={groups} />
    </div>
  )
}
