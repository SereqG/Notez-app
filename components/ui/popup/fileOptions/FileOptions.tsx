import { usePopupDataContext } from '@/context/PopupData'
import { fileType, groupType } from '@/types/data'
import { getFile } from '@/utlis/files/get/route'
import { getParticularGroup } from '@/utlis/groups/get/getParticularGroup/route'
import { useUser } from '@clerk/nextjs'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { ChangeFileName } from './ChangeFileName'
import { deleteFileFromTheGroup } from '@/utlis/files/delete/route'
import { ShareInAnotherGroup } from './ShareInAnotherGroup'
import { useBottomPopupDataContext } from '@/context/BottomPopupContext'

interface props {
  fileId: string
}

export function FileOptions({ fileId }: props) {
  const { user } = useUser()

  const { popupData, setPopupData } = usePopupDataContext()
  const { bottomPopupData, setBottomPopupData } = useBottomPopupDataContext()

  const [chosenOption, setChosenOption] = useState<
    '' | 'changeName' | 'editFile' | 'shareInAnotherGroup' | 'delete'
  >('')
  const [fileData, setFileData] = useState<fileType>()
  const [group, setGroup] = useState<groupType>()

  const params = useParams<{ groupId: string }>()

  const options = [
    {
      label: 'Share in another group',
      onClick: () => setChosenOption('shareInAnotherGroup'),
      isAuthorizationRequired: true,
    },
    {
      label: 'Change name',
      onClick: () => setChosenOption('changeName'),
      isAuthorizationRequired: true,
    },
    {
      label: 'Delete from the group',
      onClick: () => {
        const deleteFile = deleteFileFromTheGroup({
          fileId: fileId,
          file: fileData,
          groupId: group?.id,
        }).then((data) =>
          setBottomPopupData({ isVisible: true, isSuccess: data.isSuccess })
        )
        setPopupData({ ...popupData, isVisible: !popupData.isVisible })
      },
      isAuthorizationRequired: true,
    },
  ]

  useEffect(() => {
    getFile(fileId).then((file) => setFileData(file.data))
    getParticularGroup(params.groupId).then((group) => {
      setGroup(group.groups)
    })
  }, [fileId, params.groupId])

  if (fileData != undefined && group != undefined) {
    return (
      <div className="flex">
        {chosenOption != '' && (
          <button
            onClick={() => setChosenOption('')}
            className="absolute right-6 top-6 z-20 rounded-full bg-background p-3 text-base transition-all duration-300 hover:bg-primary"
          >
            <FaArrowLeft />
          </button>
        )}

        <div className="flex w-full flex-col gap-3">
          <h1 className="text-base">
            {fileData.name.length > 25
              ? fileData.name.slice(0, 24) + '...'
              : fileData.name}
          </h1>
          {chosenOption == '' ? (
            <div className="mb-3 mt-4 flex flex-col items-start gap-3">
              {options.map(
                (el: {
                  label: string
                  onClick: () => void
                  isAuthorizationRequired: boolean
                }) => (
                  <button
                    className={`text-xs underline ${
                      el.isAuthorizationRequired &&
                      user != null &&
                      fileData.author != user.emailAddresses[0].emailAddress &&
                      !group.admins.includes(
                        user.emailAddresses[0].emailAddress
                      )
                        ? 'text-gray-400'
                        : ''
                    }`}
                    disabled={
                      el.isAuthorizationRequired &&
                      user != null &&
                      fileData.author != user.emailAddresses[0].emailAddress &&
                      !group.admins.includes(
                        user.emailAddresses[0].emailAddress
                      )
                    }
                    onClick={el.onClick}
                    key={el.label}
                  >
                    {el.label}
                  </button>
                )
              )}
            </div>
          ) : chosenOption == 'changeName' ? (
            <ChangeFileName file={fileData} setData={setFileData} />
          ) : chosenOption == 'shareInAnotherGroup' ? (
            <ShareInAnotherGroup file={fileData} />
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}
