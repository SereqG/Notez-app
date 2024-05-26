import { getFile } from '@/utlis/files/get/route'
import { File } from '@/components/file/File'

export default async function Page({ params }: { params: { fileId: string } }) {
  const { data } = await getFile(params.fileId)
  return (
    <div className="flex w-full justify-center">
      <File file={data} />
    </div>
  )
}
