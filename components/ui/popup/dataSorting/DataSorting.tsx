import { useSearchDataContext } from '../../../../context/SearchParam'
import { DataSortingElement } from './DataSortingElement'

export function DataSorting() {
  const { searchParams, setSearchParams } = useSearchDataContext()

  const sortingOption = [
    {
      label: 'Last update:',
      inputData: [
        {
          label: 'The newest',
          onChange: () => {
            setSearchParams({
              ...searchParams,
              time: 'the newest',
              markedByStar: false,
              fileName: '',
            })
          },
          value: 'the newest',
          checked: searchParams.time === 'the newest',
        },
        {
          label: 'The oldest',
          onChange: () => {
            setSearchParams({
              ...searchParams,
              time: 'the oldest',
              markedByStar: false,
              fileName: '',
            })
          },
          value: 'the oldest',
          checked: searchParams.time === 'the oldest',
        },
      ],
    },
    {
      label: 'Group name:',
      inputData: [
        {
          label: 'Alphabetically from A to Z',
          onChange: () => {
            setSearchParams({
              ...searchParams,
              time: '',
              markedByStar: false,
              fileName: 'alphabetically',
            })
          },
          value: 'alphabetically',
          checked: searchParams.fileName === 'alphabetically',
        },
        {
          label: 'Reverse alphabetically from Z to A',
          onChange: () => {
            setSearchParams({
              ...searchParams,
              time: '',
              markedByStar: false,
              fileName: 'reverse alphabetically',
            })
          },
          value: 'reverse alphabetically',
          checked: searchParams.fileName === 'reverse alphabetically',
        },
      ],
    },
  ]

  return (
    <div>
      {sortingOption.map((e) => (
        <DataSortingElement
          label={e.label}
          inputData={e.inputData}
          key={e.label}
        />
      ))}
    </div>
  )
}
