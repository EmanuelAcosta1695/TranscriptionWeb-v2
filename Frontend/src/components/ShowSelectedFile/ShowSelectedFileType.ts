export interface showSelectFileProps {
  clearFileAndNotification: () => void
  audioFile: File | null
  setAudioFile: (file: File | null) => void
}
