import { traslateTextType } from './traslateTextType'
const BACKEND = import.meta.env.VITE_BACKEND_TRANSLATION

export const translateText = async ({
  text,
  targetLanguage,
  language,
}: traslateTextType): Promise<string | null> => {
  const payload = {
    text,
    targetLanguage,
    language,
  }

  try {
    const response = await fetch(BACKEND, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error('Failed to translate text')
    }

    const data = await response.json()

    return data.translatedText || null
  } catch (error) {
    console.error('Error translating text:', error)
    return null
  }
}
