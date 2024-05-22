import { fileType } from '@/types/data'
import Link from 'next/link'

interface props {
  fileList: fileType[]
}

export function FileList({ fileList }: props) {
  return (
    <div className="p-2">
      {fileList.map((el) => (
        <div key={el.id}>
          <Link className="ml-4 text-sm hover:underline" href={`file/${el.id}`}>
            {el.name}
          </Link>
        </div>
      ))}
    </div>
  )
}
