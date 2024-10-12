# Audio Transcription and Translation Project

This project consists of a **React** (with **VITE**) frontend and a **NestJS** backend. It allows users to upload an audio file, specify the language of the audio, convert that audio to text, and also translate that text into another language.

## Features
- Upload audio files in various formats.
- Specify the language of the audio.
- Convert audio to text.
- Translate the transcribed text into other languages.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Docker](https://www.docker.com/) (for running the backend, if necessary)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```
2. **Frontend Setup:**
   - Navigate to the frontend directory:
   ```bash
   cd client
   ```
   - Install the dependencies:
   ```bash
   npm install
   ```
3. Backend Setup:
   - Navigate to the backend directory:
   ```bash
   cd server
   ```
   - Install the dependencies:
   ```bash
   npm install
   ```
   - Set up your environment variables for Google Cloud credentials in a .env file.
4. Run the Project:
   - Start the backend:
     ```bash
     npm run start:dev
     ```
   - Start the frontend:
     ```bash
     cd client
     npm run dev
     ```
**Usage**
- Open your browser and navigate to http://localhost:3000 (or the port you specified) to access the frontend.
- Upload your audio file and specify the language.
- Click the button to transcribe the audio and, if desired, translate the transcribed text.

















