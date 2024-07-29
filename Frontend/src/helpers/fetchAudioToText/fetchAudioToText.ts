import { fetchAudioToTextProps } from './fetchAudioToTextType'
import * as dotenv from 'dotenv'

export const fetchAudioToText = async ({
  audioFile,
  language,
}: fetchAudioToTextProps) => {
  try {
    const formData = new FormData()
    formData.append('audiofile', audioFile)
    formData.append('language', language)
    formData.append('filename', audioFile?.name)

    const response = await fetch(process.env.BACKEND!, {
      method: 'POST',
      body: formData,
    })

    const data = await response?.json()
    return { data, isLoading: false }
  } catch (error) {
    console.log(error)
    return { isLoading: false }
  }
}
