import { groupType } from '@/types/groupType'
import { Group } from './Group'
import { getGroups } from '@/utlis/fetchGroups/getGroups'
import { currentUser } from '@clerk/nextjs/server'

export async function Sidebar() {
  const user = await currentUser()
  const { groups } = user && (await getGroups(user.id))

  return (
    <div className="absolute bottom-0 left-0 z-10 hidden h-[80vh] w-80 rounded-t-xl bg-primary-darker p-6 lg:block">
      <h1 className="font-bold">Groups</h1>
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
