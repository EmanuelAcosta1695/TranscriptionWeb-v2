import React, { useState } from 'react'
import { Notification } from '../components/Notification/Notification'
import { ShowSelectedFile } from '../components/ShowSelectedFile/ShowSelectedFile'
import { SelectFile } from '../components/SelectFile/SelectFile'
import { ClarificationComponent } from '../components/ClarificationComponent/ClarificationComponent'
import { useTranslation } from 'react-i18next'
import { allowedExtensionsSet } from '../utils/allowedExtensionsSet'
import '../../i18n.js'

export const TranscriptionApp = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [notificationMessage, setNotificationMessage] = useState<string | null>(
    null
  )
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const { t } = useTranslation()

  const handleFileChange = (file: File) => {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase()

    if (extension && !allowedExtensionsSet.has(extension)) {
      setNotificationMessage(t('invalid-file'))
      setShowNotification(true)
      return
    }

    setAudioFile(file)
    setNotificationMessage(t('file-uploaded'))
    setShowNotification(true)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileChange(file)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      handleFileChange(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
  }

  const clearFileAndNotification = () => {
    setAudioFile(null)
    setNotificationMessage(null)
    setShowNotification(false)
  }

  return (
    <div className="content">
      {!audioFile ? (
        <>
          <SelectFile
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            handleInputChange={handleInputChange}
          />
          <ClarificationComponent />
        </>
      ) : (
        <ShowSelectedFile
          clearFileAndNotification={clearFileAndNotification}
          audioFile={audioFile}
          setAudioFile={setAudioFile}
        />
      )}
      {showNotification && <Notification message={notificationMessage} />}
    </div>
  )
}
