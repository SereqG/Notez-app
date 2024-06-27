import { GroupMember } from '@/types/groupMember'
import { MainButton } from '../../buttons/MainButton'
import { UserIcon } from '../../user/UserIcon'

interface props {
  header: string
  listToRender: GroupMember[]
  buttonOnClick: () => void
  buttonText: string
}

export function AddUser({
  header,
  listToRender,
  buttonOnClick,
  buttonText,
}: props) {
  return (
    <div>
      <h2 className="text-base font-normal">{header}</h2>
      <p className="text-xs text-primary">You can modify that list any time</p>
      <div className="my-2 flex flex-wrap gap-2">
        {listToRender.map((user, index) => (
          <div key={index}>
            <UserIcon photoOnly={true} userData={user} />
          </div>
        ))}
      </div>
      <MainButton onClick={buttonOnClick}>{buttonText}</MainButton>
    </div>
  )
}
