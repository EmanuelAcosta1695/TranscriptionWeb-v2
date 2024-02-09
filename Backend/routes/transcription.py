from fastapi import File, HTTPException, Form, UploadFile
from fastapi.responses import JSONResponse
import speech_recognition as sr
from fastapi import APIRouter, HTTPException
import tempfile
import shutil


# Tupla de extensiones válidas
extensiones_validas = ['wav', 'aiff', 'aif', 'flac']

# Diccionario de idiomas soportados
idiomas_validos = {
    "Spanish": "es-es",
    "English": "en-us",
    "Italian": "it-it",
    "French": "fr-fr",
    "German": "de-de",
    "Arab": "ar-qa",
    "Japanese": "ja",
    "Korean": "ko",
    "Mandarin Chinese": "zh-cn",
    "Traditional Chinese": "zh-yue",
    "Russian": "ru"
}


transcription = APIRouter()


@transcription.post("/transcription", tags=["transcription"])
async def post_audiofile(audiofile: UploadFile = File(...), language: str = Form(...), filename: str = Form(...)):
    try:
        # Validación del archivo de audio
        extension = filename.lower().split(".")[-1]
        if extension not in extensiones_validas:
            raise HTTPException(status_code=400, detail="Archivo de audio no compatible")

        # Validación del idioma
        if language not in idiomas_validos:
            raise HTTPException(status_code=400, detail="Idioma no compatible")

        # Guardar el archivo en disco temporalmente
        with tempfile.NamedTemporaryFile(delete=False) as tmp_audio_file:
            shutil.copyfileobj(audiofile.file, tmp_audio_file)

        recognizer = sr.Recognizer()
        
        with sr.AudioFile(tmp_audio_file.name) as fuente:
            recognizer.adjust_for_ambient_noise(fuente)
            audio = recognizer.record(fuente)

        texto_transcrito = recognizer.recognize_google(audio, language=idiomas_validos[language])

        return {"texto_transcrito": texto_transcrito}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en el servidor: {str(e)}")
