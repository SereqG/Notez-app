import { ReactNode } from 'react'

interface props {
  children: ReactNode
  onClick?: () => void
}

export function SquareButton({ children, onClick }: props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded-md border-2 border-white p-2 transition-all duration-300 hover:bg-white hover:text-black"
    >
      {children}
    </button>
  )
}
