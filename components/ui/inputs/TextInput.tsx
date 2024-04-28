import { ChangeEvent } from 'react'

interface props {
  placeholder: string
}

export function TextInput({ placeholder = '' }: props) {
  return (
    <input
      className="w-full rounded-md border-2 border-content bg-background p-2 text-content focus:border-primary focus:text-primary focus:outline-none"
      type="text"
      placeholder={placeholder}
    />
  )
}
