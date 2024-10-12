import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TranscriptionService } from './transcription.service';
import { TranscribeAudio } from './dto/transcribe-audio.dto';
import { Express } from 'express';
import { TranslateTextDto } from './dto/translate-text.dto';
import { languagesObject } from 'src/utils/languagesObject';

@Controller('transcription')
export class TranscriptionController {
  constructor(private readonly transcriptionService: TranscriptionService) {}

  @Get()
  getHi() {
    return 'Hello World';
  }

  @Post()
  @UseInterceptors(FileInterceptor('audiofile'))
  async transcribeAudio(
    @UploadedFile() audioFile: Express.Multer.File,
    @Body() body: { language: string; filename: string },
  ) {
    const fileBuffer = audioFile.buffer;
    const fileExtension = audioFile.originalname.split('.').pop(); // Get file extension
    let encoding: string;

    // Set encoding based on file extension
    switch (fileExtension?.toLowerCase()) {
      case 'wav':
      case 'aiff':
      case 'aif':
        encoding = 'LINEAR16'; // PCM format for these audio types
        break;
      case 'flac':
        encoding = 'FLAC';
        break;
      case 'mp3':
        encoding = 'MP3';
        break;
      case 'ogg':
        encoding = 'OGG_OPUS';
        break;
      default:
        throw new Error('Unsupported audio format');
    }

    const languageCode = languagesObject[body.language] || 'es-ES'; // Default to Spanish if not found

    const transcribeAudio: TranscribeAudio = {
      audioBuffer: fileBuffer,
      encoding, // Dynamic encoding based on file type
      sampleRateHertz: 16000, // Adjust this depending on your audio file settings
      languageCode,
    };

    return this.transcriptionService.transcribeAudioToText(transcribeAudio);
  }

  @Post('translate')
  async translateTextRoute(@Body() translateTextDto: TranslateTextDto) {
    const { text, targetLanguage, language } = translateTextDto;
    const translatedText = await this.transcriptionService.translateText({
      text,
      targetLanguage,
      language,
    });

    if (translatedText) {
      return { translatedText };
    } else {
      throw new Error('Translation failed');
    }
  }
}
