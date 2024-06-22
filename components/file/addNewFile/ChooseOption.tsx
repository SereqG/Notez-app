import { MainButton } from '@/components/ui/buttons/MainButton'
import { Dispatch, SetStateAction } from 'react'

interface props {
  setStep: Dispatch<
    SetStateAction<'create a note' | 'upload existing file' | 'choose option'>
  >
}

export function ChooseOption({ setStep }: props) {
  return (
    <div className="flex flex-col">
      <h1 className="text-base">New file</h1>
      <div className="flex w-[50%] flex-col gap-3 self-center">
        <MainButton onClick={() => setStep('create a note')}>
          Create a note
        </MainButton>
        <MainButton onClick={() => setStep('upload existing file')}>
          Upload a file from your device
        </MainButton>
      </div>
    </div>
  )
}
