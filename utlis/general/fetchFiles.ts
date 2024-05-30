// import { fileType, groupAndDataType } from '@/types/data'
// import { Dispatch, SetStateAction } from 'react'
// import { getFile } from '../files/get/route'

// interface props {
//   filesIds: string[]
//   setter: Dispatch<SetStateAction<groupAndDataType[] | fileType[]>>
// }

// export async function fetchFiles(
//   filesIds: string[],
//   setter: Dispatch<SetStateAction<groupAndDataType[] | fileType[]>>
// ) {
//   try {
//     const fetchedFiles = await Promise.all(
//       filesIds.map(async (id) => {
//         const response = await getFile(id)
//         return response.data
//       })
//     ).then((data) => setter(data))
//   } catch (error) {
//     console.error('Error fetching data:', error)
//   }
// }
