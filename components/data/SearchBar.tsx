import { TextInput } from '../ui/inputs/TextInput'
import { DataSorting } from '../ui/popup/dataSorting/DataSorting'

import { VscSettings } from 'react-icons/vsc'

import { useSearchDataContext } from '../../context/SearchParam'
import { usePopupDataContext } from '../../context/PopupData'

export function SearchBar() {
  const { popupData, setPopupData } = usePopupDataContext()
  const { searchParams, setSearchParams } = useSearchDataContext()

  return (
    <div className="my-6 flex flex-col">
      <div className="flex gap-2">
        <TextInput
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setSearchParams({
              ...searchParams,
              typedName: e.currentTarget.value,
            })
          }
          placeholder="Search"
          value={searchParams.typedName}
        />
        <button
          data-testid="sorting-options-button"
          onClick={() =>
            setPopupData({
              children: <DataSorting />,
              isVisible: !popupData.isVisible,
            })
          }
          className="rounded-full p-3 text-xl transition-all duration-300 hover:bg-primary"
        >
          <VscSettings />
        </button>
      </div>
      <div className="flex h-6 items-end">
        <p className="text-xs text-primary">
          {searchParams.fileName != ''
            ? 'Sorting by name: ' + searchParams.fileName
            : searchParams.time != ''
              ? 'Sorting by upload time: ' + searchParams.time
              : ''}
        </p>
      </div>
    </div>
  )
}
