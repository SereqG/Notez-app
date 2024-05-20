import { groupType } from '@/types/groupType'
import { DataListElement } from './DataListElement'

interface props {
  data: groupType[]
}

export function DataList({ data }: props) {
  return (
    <div>
      {data.length > 0 ? (
        <ul>
          {data.map((el: groupType) => (
            <DataListElement key={el.id} data={el} />
          ))}
        </ul>
      ) : (
        <h1>No groups</h1>
      )}
    </div>
  )
}
