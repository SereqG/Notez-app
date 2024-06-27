import { Data } from '@/components/data/Data'
import { getParticularGroup } from '@/utlis/groups/get/getParticularGroup/route'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: { groupId: string }
}) {
  const user = await currentUser()

  const { groups } = await getParticularGroup(params.groupId)

  !groups.members.includes(user?.emailAddresses[0].emailAddress) &&
    redirect('/')

  return (
    <div className="flex w-full justify-center">
      <Data type="files" group={[]} groupId={params.groupId} />
    </div>
  )
}
