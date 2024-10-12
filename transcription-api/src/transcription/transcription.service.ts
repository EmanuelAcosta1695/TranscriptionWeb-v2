import { Injectable } from '@nestjs/common';
import { SpeechClient, protos } from '@google-cloud/speech';
import { ConfigService } from '@nestjs/config';
import { TranscribeAudio } from './dto/transcribe-audio.dto';
import fetch from 'node-fetch';
import { TranslateTextDto } from './dto/translate-text.dto';
import { languagesObject } from 'src/utils/languagesObject';

@Injectable()
export class TranscriptionService {
  private speechClient: SpeechClient;

  constructor(private configService: ConfigService) {
    const credentials = {
      projectId: this.configService.get<string>('GOOGLE_PROJECT_ID'),
      credentials: {
        private_key: this.configService
          .get<string>('GOOGLE_PRIVATE_KEY')
          .replace(/\\n/g, '\n'),
        client_email: this.configService.get<string>('GOOGLE_CLIENT_EMAIL'),
      },
    };

    this.speechClient = new SpeechClient({
      credentials: credentials.credentials,
      projectId: credentials.projectId,
    });
  }

  async transcribeAudioToText(
    transcribeAudio: TranscribeAudio,
  ): Promise<{ message: string; transcription: string }> {
    const { audioBuffer, encoding, sampleRateHertz, languageCode } =
      transcribeAudio;
    const audioEncoding =
      protos.google.cloud.speech.v1p1beta1.RecognitionConfig.AudioEncoding[
        encoding.toUpperCase() as keyof typeof protos.google.cloud.speech.v1p1beta1.RecognitionConfig.AudioEncoding
      ];

    const request = {
      audio: {
        content: audioBuffer.toString('base64'),
      },
      config: {
        encoding: audioEncoding,
        sampleRateHertz,
        languageCode,
      },
    };

    try {
      const [response] = await this.speechClient.recognize(request);

      if (!response.results || response.results.length === 0) {
        return {
          message: 'No transcription results',
          transcription: '',
        };
      }

      const transcription = response.results
        .map((result) => result.alternatives[0].transcript)
        .join('\n');

      return {
        message: 'Transcription successful',
        transcription,
      };
    } catch (error) {
      console.error('Error transcribing audio:', error);
      throw new Error('Failed to transcribe audio');
    }
  }

  async translateText({
    text,
    targetLanguage,
    language,
  }: TranslateTextDto): Promise<string | null> {
    const sourceLangCode = languagesObject[language] || 'auto';
    const targetLangCode = languagesObject[targetLanguage] || 'auto';

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLangCode}&tl=${targetLangCode}&dt=t&q=${encodeURIComponent(
      text,
    )}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (
        Array.isArray(data) &&
        Array.isArray(data[0]) &&
        Array.isArray(data[0][0])
      ) {
        return data[0][0][0];
      } else {
        console.error('Unexpected response format:', data);
        return null;
      }
    } catch (error) {
      console.error('Error translating text:', error);
      return null;
    }
  }
}
