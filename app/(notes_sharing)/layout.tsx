import { Sidebar } from '@/components/sidebar/Sidebar'
import { BottomPopup } from '@/components/ui/popup/bottomPopup/BottomPopup'
import { SearchDataContextProvider } from '@/context/SearchParam'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  !user && redirect('/')
  return (
    <>
      <SearchDataContextProvider>
        <Sidebar />
        {children}
      </SearchDataContextProvider>
    </>
  )
}
