'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton, useUser } from '@clerk/nextjs'
import { IoMenu, IoClose } from 'react-icons/io5'

const linksList: {
  label: string
  path: string
  auth: boolean
}[] = [
  {
    label: 'Homepage',
    path: '/',
    auth: true,
  },
  {
    label: 'Groups',
    path: '/groups',
    auth: true,
  },
  {
    label: 'Sign in',
    path: '/sign-in',
    auth: false,
  },
  {
    label: 'Sign up',
    path: '/sign-up',
    auth: false,
  },
]

export function Navbar() {
  const pathname = usePathname()
  const { isSignedIn } = useUser()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  return (
    <nav className="my-3 flex w-full flex-wrap items-center justify-between gap-6 rounded-3xl px-6 py-2.5 sm:w-auto sm:border-2 sm:border-primary">
      <Link href="/" className="font-bold sm:border-r sm:pr-6">
        NoteZ
      </Link>
      <div className="flex gap-3 sm:order-3 sm:flex-row-reverse">
        {isSignedIn && <UserButton afterSignOutUrl="/" />}

        <button
          className="text-4xl sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>
      <ul
        className={` ${isMenuOpen ? 'flex' : 'hidden'} h-screen w-full list-none flex-col gap-8 sm:flex sm:h-auto sm:w-auto sm:flex-row`}
      >
        {linksList.map(
          (el, index) =>
            el.auth === isSignedIn && (
              <li key={index} onClick={() => setIsMenuOpen(false)}>
                <Link
                  href={el.path}
                  className={`${el.path == pathname && 'text-primary'} text-sm font-bold transition-all duration-300 hover:text-primary`}
                >
                  {el.label}
                </Link>
              </li>
            )
        )}
      </ul>
    </nav>
  )
}
