// hooks/useTranscription.ts
import { useState } from 'react'

export function useTranscription() {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [transcript, setTranscript] = useState('')
  const [isTranscribing, setIsTranscribing] = useState(false)

  const uploadFile = (file: File) => setAudioFile(file)

  const transcribeFile = async (file: File) => {
    setIsTranscribing(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/transcribe', { method: 'POST', body: formData })
      if (!response.ok) throw new Error('Transcription failed')
      const data = await response.json()
      setTranscript(data.text)
    } catch {
      setTranscript('')
      throw new Error('Failed to transcribe')
    } finally {
      setIsTranscribing(false)
    }
  }

  return { audioFile, transcript, isTranscribing, uploadFile, transcribeFile }
}
