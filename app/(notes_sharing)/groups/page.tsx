import { Data } from '@/components/data/Data'
import { getGroups } from '@/utlis/groups/get/getGroups/route'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await currentUser()

  const { groups } =
    user && (await getGroups(user.emailAddresses[0].emailAddress))

  return (
    <div className="flex w-full justify-center">
      <Data type="groups" group={groups} />
    </div>
  )
}
