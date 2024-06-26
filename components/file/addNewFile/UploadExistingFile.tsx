import { MainButton } from '@/components/ui/buttons/MainButton'
import { useBottomPopupDataContext } from '@/context/BottomPopupContext'
import { usePopupDataContext } from '@/context/PopupData'
import { uploadExisting } from '@/utlis/files/upload/existing/route'
import { useUser } from '@clerk/nextjs'
import { ChangeEvent, FormEvent, useState } from 'react'

interface props {
  groupId: string | undefined
}

export function UploadExistingFile({ groupId }: props) {
  const [file, setFile] = useState(null)

  const { popupData, setPopupData } = usePopupDataContext()
  const { bottomPopupData, setBottomPopupData } = useBottomPopupDataContext()

  const { user } = useUser()

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (file != null && groupId && user) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('groupId', groupId)
      formData.append('author', user.emailAddresses[0].emailAddress)

      uploadExisting({ formData: formData }).then((res) => {
        if (res.isSuccess) {
          setPopupData({ ...popupData, isVisible: !popupData.isVisible })
        }
        setBottomPopupData({
          isVisible: !bottomPopupData.isVisible,
          isSuccess: res.isSuccess,
        })
      })
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="file" onChange={handleFileChange} />
      <button
        className="flex min-h-10 min-w-28 items-center justify-center rounded-lg bg-primary px-4 py-2 text-xs font-bold transition-all duration-300 hover:bg-primary-hover"
        type="submit"
      >
        Upload
      </button>
    </form>
  )
}
