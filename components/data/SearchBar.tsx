import { TextInput } from '../ui/inputs/TextInput'
import { VscSettings } from 'react-icons/vsc'

export function SearchBar() {
  return (
    <div className="my-6 flex gap-2">
      <TextInput placeholder="Search" />
      <button className="rounded-full p-3 text-xl transition-all duration-300 hover:bg-primary">
        <VscSettings />
      </button>
    </div>
  )
}
