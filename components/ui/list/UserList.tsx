import { IoClose } from 'react-icons/io5'
import { SquareButton } from '../buttons/SquareButton'
import { UserIcon } from '../user/UserIcon'
import { GroupMember } from '@/types/groupMember'

interface props {
  userData: GroupMember[]
  deleteUserOption: boolean
  deleteUserFunction?: any
}

export function UserList({
  userData,
  deleteUserOption,
  deleteUserFunction,
}: props) {
  return (
    <div className="text-sm">
      <h2>User list:</h2>
      <ul className="flex max-h-40 flex-col gap-2 overflow-auto">
        {userData.map((el: GroupMember) => (
          <li key={el.id} className="flex h-10 justify-between">
            <UserIcon photoOnly={false} userData={el} />
            {deleteUserOption && (
              <SquareButton
                onClick={() => {
                  deleteUserFunction(el)
                }}
              >
                <IoClose />
              </SquareButton>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
