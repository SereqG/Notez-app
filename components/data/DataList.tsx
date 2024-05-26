import { groupAndDataType, groupType } from '@/types/data'
import { DataListElement } from './DataListElement'

interface props {
  type: 'groups' | 'files'
  data: groupAndDataType[]
}

export function DataList({ data, type }: props) {
  return (
    <div>
      {data.length > 0 ? (
        <ul>
          {data.map((el: groupAndDataType) => (
            <DataListElement key={el.id} data={el} type={type} />
          ))}
        </ul>
      ) : (
        <h1>No data</h1>
      )}
    </div>
  )
}
