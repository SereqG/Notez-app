import { MainButton } from '../ui/buttons/MainButton'
import { usePopupDataContext } from '@/context/PopupData'
import { CreateGroup } from '../ui/popup/createGroup/CreateGroup'

export function ButtonsSection() {
  const { popupData, setPopupData } = usePopupDataContext()

  return (
    <section className="absolute bottom-5 right-5 flex gap-2 lg:relative lg:bottom-0 lg:right-0">
      <MainButton
        onClick={() => {
          setPopupData({
            children: <CreateGroup />,
            isVisible: !popupData.isVisible,
          })
        }}
      >
        New group
      </MainButton>
    </section>
  )
}
