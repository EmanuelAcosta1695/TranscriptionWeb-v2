export interface showSelectFileProps {
  clearFileAndNotification: () => void
  audioFile: File
  setAudioFile: (file: File | null) => void
}
