import { useSearchDataContext } from '@/context/SearchParam'
import { InputRadio } from '../../inputs/InputRadio'
import { ChangeEvent } from 'react'

interface props {
  label: string
  inputData: {
    label: string
    onChange: () => void
    value: string
    checked: boolean
  }[]
}

export function DataSortingElement({ label, inputData }: props) {
  return (
    <form className="mt-3 flex flex-col gap-3" key={label}>
      <h1 className="text-base">{label}</h1>
      {inputData.map((e) => (
        <InputRadio
          key={e.label}
          label={e.label}
          onChange={e.onChange}
          value={e.value}
          checked={e.checked}
        />
      ))}
    </form>
  )
}
