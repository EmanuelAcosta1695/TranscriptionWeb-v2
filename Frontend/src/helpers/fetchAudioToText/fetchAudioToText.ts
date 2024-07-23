import { fetchAudioToTextProps } from './fetchAudioToTextType'

export const fetchAudioToText = async ({
  audioFile,
  language,
}: fetchAudioToTextProps) => {
  try {
    const formData = new FormData()
    formData.append('audiofile', audioFile)
    formData.append('language', language)
    formData.append('filename', audioFile?.name)

    const response = await fetch(
      'http://localhost:3000/api/gatewayTranscription',
      {
        method: 'POST',
        body: formData,
      }
    )

    // const response = await fetch(
    //   'https://transcriptionapi-dfwk.onrender.com/transcription',
    //   {
    //     method: 'POST',
    //     body: formData,
    //   }
    // )

    //   const response = await fetch('http://127.0.0.1:8000/transcription', {
    //     method: 'POST',
    //     body: formData
    // });

    const data = await response?.json()
    return { data, isLoading: false }
  } catch (error) {
    console.log(error)
    return { isLoading: false }
  }
}
