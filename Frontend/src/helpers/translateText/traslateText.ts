import { traslateTextType } from './traslateTextType'
import { languagesObject } from './languagesObject'

export const translateText = async ({
  text,
  targetLanguage,
  language,
}: traslateTextType): Promise<string | null> => {
  // Convertir nombres de idiomas a códigos
  const sourceLangCode = languagesObject[language] || 'auto' // 'auto' si el idioma no está en el diccionario
  const targetLangCode = languagesObject[targetLanguage] || 'auto'

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLangCode}&tl=${targetLangCode}&dt=t&q=${encodeURI(
    text
  )}`

  try {
    console.log('targetLanguage: ', targetLanguage)
    console.log('language: ', language)
    console.log('sourceLangCode: ', sourceLangCode)
    console.log('targetLangCode: ', targetLangCode)

    const response = await fetch(url)
    const data = await response.json()
    console.log('Response data:', data) // Verifica el formato de la respuesta

    // Ajusta esta línea según el formato correcto de la respuesta
    if (
      Array.isArray(data) &&
      Array.isArray(data[0]) &&
      Array.isArray(data[0][0])
    ) {
      console.log('texto traducido: ', data[0][0][0])
      return data[0][0][0] // Texto traducido
    } else {
      console.error('Unexpected response format:', data)
      return null
    }
  } catch (error) {
    console.error('Error al traducir el texto:', error)
    return null
  }
}
