import { Data } from '@/components/data/Data'

export default async function Page({
  params,
}: {
  params: { groupId: string }
}) {
  return (
    <div className="flex w-full justify-center">
      <Data type="files" group={[]} groupId={params.groupId} />
    </div>
  )
}
