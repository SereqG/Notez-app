import { Data } from '@/components/data/Data'
import { fileType, groupType } from '@/types/data'
import { getParticularGroup } from '@/utlis/groups/get/getParticularGroup/route'
import { useEffect, useState } from 'react'

export default async function Page({
  params,
}: {
  params: { groupId: string }
}) {
  const group = await getParticularGroup(params.groupId)

  console.log(group)

  return (
    <div className="flex w-full justify-center">
      {/* <Data type="files" data={groups} /> */}
    </div>
  )
}
