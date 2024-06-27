import { ChangeEvent } from 'react'

interface props {
  label: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  value: string
  checked: boolean
}

export function InputRadio({
  label = '',
  onChange,
  value = '',
  checked = false,
}: props) {
  return (
    <div className="flex items-center">
      <input
        className="mr-2 h-3.5 w-3.5 appearance-none rounded-full bg-white checked:bg-primary hover:bg-white/50"
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        id={value}
        data-testid={value}
      />
      <label className="text-xs" htmlFor={value}>
        {label}
      </label>
    </div>
  )
}
