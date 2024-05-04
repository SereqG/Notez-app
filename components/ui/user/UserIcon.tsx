import Image from 'next/image'
import { FaRegUser } from 'react-icons/fa'

interface props {
  photoOnly: boolean
  userData: { imageUrl?: string; emailAddress?: string }
}

export function UserIcon({ photoOnly, userData }: props) {
  const renderUserImage = () => {
    if (userData.imageUrl) {
      return (
        <Image
          src={userData.imageUrl}
          alt="user image"
          width={40}
          height={40}
          className="peer h-8 w-8 rounded-full object-none"
        />
      )
    } else {
      return (
        <div className="peer flex h-8 w-8 items-center justify-center rounded-full border-2 border-white">
          <FaRegUser />
        </div>
      )
    }
  }

  return (
    <div className={photoOnly ? '' : 'flex items-center gap-3'}>
      {renderUserImage()}
      <p
        className={`${photoOnly && 'invisible absolute rounded-lg bg-white p-1 text-[9px] text-black peer-hover:visible'} text-sm`}
      >
        {userData.emailAddress}
      </p>
    </div>
  )
}
