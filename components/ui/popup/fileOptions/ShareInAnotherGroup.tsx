import { fileType, groupType } from '@/types/data'
import { getGroups } from '@/utlis/groups/get/getGroups/route'
import { useUser } from '@clerk/nextjs'
import { CldImage } from 'next-cloudinary'
import { useEffect, useState } from 'react'
import { SquareButton } from '../../buttons/SquareButton'
import { FaPlus } from 'react-icons/fa'
import { shareFile } from '@/utlis/files/share/route'

interface props {
  file: fileType
}

export function ShareInAnotherGroup({ file }: props) {
  const [groups, setGroups] = useState<groupType[]>()

  const { user } = useUser()

  useEffect(() => {
    if (user) {
      getGroups(user.emailAddresses[0].emailAddress).then((groups) =>
        setGroups(groups.groups)
      )
    }
  }, [user])

  return (
    <div>
      <ul>
        {groups?.map((group: groupType) => (
          <li key={group.id}>
            {file.groups.includes(group.id) ? (
              ''
            ) : (
              <div className="mb-2 flex h-10 justify-between">
                <div className="flex items-center">
                  {group.photo && (
                    <CldImage
                      src={group.photo}
                      alt="Group image"
                      width={150}
                      height={150}
                      className=" h-10 w-10 rounded-full p-2"
                    />
                  )}
                  <h2>{group.name}</h2>
                </div>
                <SquareButton
                  onClick={() => {
                    shareFile(group.id, file.id)
                    setGroups(() => groups.filter((el) => el.id != group.id))
                  }}
                >
                  <FaPlus />
                </SquareButton>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
