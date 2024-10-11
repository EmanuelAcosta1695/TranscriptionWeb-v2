import { Injectable } from '@nestjs/common';
import { SpeechClient, protos } from '@google-cloud/speech';
import { ConfigService } from '@nestjs/config';
import { TranscribeAudio } from './dto/transcribe-audio.dto';

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

    // Use the correct type for encoding
    const audioEncoding =
      protos.google.cloud.speech.v1p1beta1.RecognitionConfig.AudioEncoding[
        encoding.toUpperCase() as keyof typeof protos.google.cloud.speech.v1p1beta1.RecognitionConfig.AudioEncoding
      ];

    const request = {
      audio: {
        content: audioBuffer.toString('base64'),
      },
      config: {
        encoding: audioEncoding, // Correct encoding type
        sampleRateHertz,
        languageCode,
      },
    };

    try {
      // Destructure the first element of the array to get the response
      const [response] = await this.speechClient.recognize(request);

      // If no results are found, return an empty transcription
      if (!response.results || response.results.length === 0) {
        return {
          message: 'No transcription results',
          transcription: '',
        };
      }

      // Join all alternatives into a single string
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
}
