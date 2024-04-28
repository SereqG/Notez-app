import { groupType } from '@/types/groupType'
import { DataListElement } from './DataListElement'

export function DataList(data: any) {
  return (
    <div>
      {data.data.length > 0 ? (
        <ul>
          {data.data.map((el: groupType) => (
            <DataListElement key={el.id} data={el} />
          ))}
        </ul>
      ) : (
        <h1>No groups</h1>
      )}
    </div>
  )
}
