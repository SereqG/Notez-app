import { SearchBar } from './SearchBar'
import { ButtonsSection } from './ButtonsSection'
import { DataList } from './DataList'
import { currentUser } from '@clerk/nextjs/server'
import { getGroups } from '@/utlis/fetchGroups/getGroups'

interface props {
  type: string
}

export async function Data({ type }: props) {
  const user = await currentUser()
  const { groups } = user && (await getGroups(user.id))

  return (
    <div className="w-5/6 min-w-60 max-w-7xl lg:w-1/3 lg:min-w-[420px]">
      <SearchBar />
      <div className="">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-bold">{type}</h1>
          </div>
          <ButtonsSection />
        </div>
        <main className="mt-6 max-h-[60vh] overflow-y-auto">
          <DataList data={groups} />
        </main>
      </div>
    </div>
  )
}
