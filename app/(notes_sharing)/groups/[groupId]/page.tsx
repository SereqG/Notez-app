import { Data } from '@/components/data/Data'
import { fileType, groupType } from '@/types/data'
import { getParticularGroup } from '@/utlis/groups/get/getParticularGroup/route'
import { useEffect, useState } from 'react'

export default async function Page({
  params,
}: {
  params: { groupId: string }
}) {
  const { groups } = await getParticularGroup(params.groupId)

  console.log(groups)

  return (
    <div className="flex w-full justify-center">
      <Data type="files" group={[]} files={groups.files} />
    </div>
  )
}
