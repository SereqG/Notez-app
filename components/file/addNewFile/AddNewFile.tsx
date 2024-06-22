import { useState } from 'react'
import { CreateANote } from './CreateANote'
import { ChooseOption } from './ChooseOption'
import { UploadExistingFile } from './UploadExistingFile'

interface props {
  groupId: string | undefined
}

export function AddNewFile({ groupId }: props) {
  const [step, setStep] = useState<
    'choose option' | 'upload existing file' | 'create a note'
  >('choose option')

  if (step == 'choose option') {
    return <ChooseOption setStep={setStep} />
  } else if (step == 'create a note') {
    return <CreateANote groupId={groupId} />
  } else if (step == 'upload existing file') {
    return <UploadExistingFile groupId={groupId} />
  }
}
