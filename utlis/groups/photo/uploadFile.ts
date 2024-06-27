'use server'
import { v2 as cloudinary } from 'cloudinary'
import { changeGroupPhoto } from './route'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadFile(groupId: string, formData: FormData) {
  console.log(formData)

  const file = formData.get('img') as File
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          tags: ['group-photo'],
          upload_preset: 'GroupPhotoPreset',
        },
        function (error, result) {
          if (error) {
            reject(error)
            return
          }
          resolve(result)
          if (result) {
            changeGroupPhoto(result.public_id, groupId)
          }
        }
      )
      .end(buffer)
  })
}
