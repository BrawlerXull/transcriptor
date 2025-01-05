import { useState, useRef, useCallback } from 'react'

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const audioChunks = useRef<Blob[]>([])
  const mediaStream = useRef<MediaStream | null>(null)  

  const startRecording = useCallback(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaStream.current = stream  
        mediaRecorder.current = new MediaRecorder(stream)
        
        mediaRecorder.current.ondataavailable = (event) => {
          audioChunks.current.push(event.data)
        }

        mediaRecorder.current.start()
        setIsRecording(true)
      })
      .catch(error => {
        console.error('Error accessing microphone:', error)
      })
  }, [])

  const stopRecording = useCallback(() => {
    return new Promise<File>((resolve) => {
      if (mediaRecorder.current && isRecording) {
        mediaRecorder.current.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' })
          const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' })
          audioChunks.current = []  
          setIsRecording(false)

          
          if (mediaStream.current) {
            mediaStream.current.getTracks().forEach(track => track.stop())
          }

          resolve(audioFile)
        }

        mediaRecorder.current.stop()
      } else {
        resolve(new File([], 'empty.wav', { type: 'audio/wav' }))
      }
    })
  }, [isRecording])

  return { startRecording, stopRecording, isRecording }
}
