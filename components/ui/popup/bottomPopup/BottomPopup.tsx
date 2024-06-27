import { useBottomPopupDataContext } from '@/context/BottomPopupContext'

export function BottomPopup() {
  const { bottomPopupData, setBottomPopupData } = useBottomPopupDataContext()

  bottomPopupData.isVisible &&
    setTimeout(() => {
      setBottomPopupData({ ...bottomPopupData, isVisible: false })
    }, 3000)
  return (
    <div
      className={`absolute bottom-0 left-0 flex w-[100vw] items-center justify-center `}
    >
      <div
        className={`flex h-14 items-center rounded-xl border-0 lg:bottom-0 lg:left-auto ${bottomPopupData.isSuccess ? 'bg-cyan-500' : 'bg-red-500'} p-2`}
      >
        <div className="p-4 text-sm">
          {bottomPopupData.isSuccess
            ? 'The action ended successfully'
            : 'The action ended in failure'}
        </div>
      </div>
    </div>
  )
}
