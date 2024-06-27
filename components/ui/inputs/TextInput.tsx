import { ChangeEvent } from 'react'

interface props {
  placeholder: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: string
  name?: string
}

export function TextInput({
  placeholder = '',
  onChange,
  value = '',
  name,
}: props) {
  return (
    <input
      className="w-full rounded-md border-2 border-content bg-background p-2 text-content focus:border-primary focus:text-primary focus:outline-none"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
    />
  )
}
