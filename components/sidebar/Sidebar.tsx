import { groupType } from '@/types/data'
import { Group } from './Group'
import { getGroups } from '@/utlis/groups/get/getGroups/route'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function Sidebar() {
  const user = await currentUser()

  const { groups } =
    user && (await getGroups(user.emailAddresses[0].emailAddress))

  return (
    <div className="absolute bottom-0 left-0 z-10 hidden h-[80vh] w-80 rounded-t-xl bg-primary-darker p-6 lg:block">
      <h1 className="text-base font-bold">Groups</h1>
      {groups.length === 0 ? (
        <div>
          <h2>No groups</h2>
        </div>
      ) : (
        <div className="h-full overflow-y-auto">
          {groups.map((el: groupType) => (
            <Group key={el.id} group={el} />
          ))}
        </div>
      )}
    </div>
  )
}
