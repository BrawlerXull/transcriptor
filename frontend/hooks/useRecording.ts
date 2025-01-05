import { useState } from 'react'
import { useAudioRecorder } from '@/hooks/useAudioRecorder'

export function useRecording() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const { startRecording, stopRecording } = useAudioRecorder()

  const toggleRecording = async () => {
    if (isRecording) {
      const recordedFile = await stopRecording()
      setAudioFile(recordedFile)
    } else {
      startRecording()
    }
    setIsRecording(!isRecording) 
  }

  return { isRecording, audioFile, toggleRecording }
}
