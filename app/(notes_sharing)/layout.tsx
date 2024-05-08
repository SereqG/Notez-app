import { Sidebar } from '@/components/sidebar/Sidebar'
import { SearchDataContextProvider } from '@/context/SearchParam'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SearchDataContextProvider>
        <Sidebar />
        {children}
      </SearchDataContextProvider>
    </>
  )
}
