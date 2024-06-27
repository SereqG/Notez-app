import { usePopupDataContext } from '../../../context/PopupData'
import { IoClose } from 'react-icons/io5'

export function Popup() {
  const { popupData, setPopupData } = usePopupDataContext()
  return (
    <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-[600px] rounded-2xl bg-background p-6 lg:w-2/3 lg:p-12 ">
        <button
          onClick={() =>
            setPopupData({ ...popupData, isVisible: !popupData.isVisible })
          }
          className="absolute right-6 top-6 rounded-full p-2 text-xl transition-all duration-300 hover:bg-primary"
        >
          <IoClose />
        </button>
        {popupData.children}
      </div>
    </div>
  )
}
