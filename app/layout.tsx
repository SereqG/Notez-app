import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { PopupDataContextProvider } from '@/context/PopupData'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

import { Navbar } from '@/components/ui/navbar/Navbar'
import { BottomPopupDataContextProvider } from '@/context/BottomPopupContext'

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
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <PopupDataContextProvider>
        <BottomPopupDataContextProvider>
          <html lang="en">
            <body
              className={`${font.className} flex flex-col items-center bg-background text-content`}
            >
              <Navbar />
              {children}
            </body>
          </html>
        </BottomPopupDataContextProvider>
      </PopupDataContextProvider>
    </ClerkProvider>
  )
}
