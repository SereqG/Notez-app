'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useUser } from '@clerk/nextjs'

const boxesContent = [
  { icon: '👥', text: 'Share notes with your friends' },
  { icon: '📚', text: 'Easy access to all notes' },
  { icon: '📝', text: 'Never miss notes again' },
  { icon: '⏳', text: 'Save your time' },
]

export default function Home() {
  const { isSignedIn } = useUser()

  return (
    <div className="absolute top-0 z-0 w-screen">
      <section
        className="relative flex h-screen w-full items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/img/background.png')" }}
      >
        <div className="flex flex-col items-center">
          <h2 className="text-center text-3xl font-bold text-primary md:text-5xl">
            Your tool for better <br /> notes organization
          </h2>
          <div className="mt-14 flex items-center justify-center">
            <div className="flex gap-4">
              {isSignedIn ? (
                <Link
                  className="flex min-h-10 min-w-28 items-center justify-center rounded-lg bg-primary px-4 py-2 text-xs font-bold transition-all duration-300 hover:bg-primary-hover"
                  href={'/groups'}
                >
                  My notes
                </Link>
              ) : (
                <>
                  <Link
                    className="flex min-h-10 min-w-28 items-center justify-center rounded-lg bg-primary px-4 py-2 text-xs font-bold transition-all duration-300 hover:bg-primary-hover"
                    href={'/sign-in'}
                  >
                    Login
                  </Link>
                  <Link
                    className="flex min-h-10 min-w-28 items-center justify-center rounded-lg bg-primary px-4 py-2 text-xs font-bold transition-all duration-300 hover:bg-primary-hover"
                    href={'/sign-up'}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          <p className="absolute bottom-10 text-center">
            Created by students for students
          </p>
        </div>
        <div></div>
      </section>
      <section>
        <div className="bg-dark flex min-h-screen flex-col items-center justify-center p-10 text-white">
          <h1 className="mb-2 text-sm text-purple-400 md:text-lg">
            Easy notes sharing
          </h1>
          <h2 className="mb-8 text-base font-bold md:text-2xl">
            Notes sharing has never been easier!
          </h2>
          <div className="mb-8 grid grid-cols-2 gap-4">
            {boxesContent.map((params, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-center rounded-lg bg-gray-800 p-4 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="mb-4 text-6xl">{params.icon}</div>
                <p>{params.text}</p>
              </motion.div>
            ))}
          </div>
          <Link
            className="flex min-h-10 min-w-28 items-center justify-center rounded-lg bg-primary px-4 py-2 text-xs font-bold transition-all duration-300 hover:bg-primary-hover"
            href={isSignedIn ? '/groups' : '/sign-in'}
          >
            Getting started
          </Link>
        </div>
      </section>
    </div>
  )
}
