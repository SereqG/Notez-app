import { fileType, groupAndDataType } from '@/types/data'
import Link from 'next/link'

interface props {
  fileList: groupAndDataType[]
}

export function FileList({ fileList }: props) {
  return (
    <div className="pb-2">
      {fileList.map((el) => (
        <div key={el.id}>
          <Link
            className="ml-4 text-sm hover:underline"
            href={`/files/${el.id}`}
          >
            {el.name}
          </Link>
        </div>
      ))}
    </div>
  )
}
