import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

import { Navbar } from '@/components/ui/navbar/Navbar'

const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Notez App',
  description: 'Notez App by AB & SereqG',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorBackground: '#282638',
          colorPrimary: '#8C56FF',
          colorInputBackground: '#282638',
        },
      }}
    >
      <html lang="en">
        <body
          className={`${font.className} bg-background text-content flex flex-col items-center`}
        >
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
