import { groupAndDataType, groupType } from '@/types/data'
import { DataListElement } from './DataListElement'

interface props {
  data: groupAndDataType[]
}

export function DataList({ data }: props) {
  return (
    <div>
      {data.length > 0 ? (
        <ul>
          {data.map((el: groupAndDataType) => (
            <DataListElement key={el.id} data={el} />
          ))}
        </ul>
      ) : (
        <h1>No groups</h1>
      )}
    </div>
  )
}
