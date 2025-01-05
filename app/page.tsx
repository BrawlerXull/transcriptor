'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { TranscriptList } from '@/components/TranscriptList'
import { MoonIcon, SunIcon, Mic, Play, Loader2, FileAudio } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import { useAppToast } from '@/hooks/useAppToast'
import { useRecording } from '@/hooks/useRecording'

import { useTranscription } from '@/hooks/useTranscription'
import { useThemeToggle } from "@/hooks/usetheme"

export default function Home() {
  const { showToast } = useAppToast()
  const { theme, toggleTheme } = useThemeToggle()
  const { isRecording, audioFile, toggleRecording } = useRecording()
  const { transcript, isTranscribing, uploadFile, transcribeFile } = useTranscription()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      uploadFile(file)
      showToast("File uploaded", `${file.name} has been successfully uploaded.`)
    }
  }

  const handleTranscribe = async () => {
    if (!audioFile) {
      showToast("Error", "Please record audio or upload a file first.", 'destructive')
      return
    }

    try {
      await transcribeFile(audioFile)
      showToast("Transcription complete", "Your audio has been successfully transcribed.")
    } catch (error) {
      showToast("Error", "Failed to transcribe audio. Please try again.", 'destructive')
      console.log(error)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Audio Transcription</h1>
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </Button>
      </header>
      <main className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="record" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="record">Record Audio</TabsTrigger>
                <TabsTrigger value="upload">Upload Audio</TabsTrigger>
              </TabsList>
              <TabsContent value="record" className="mt-4">
                <div className="space-y-4">
                  <Button
                    onClick={toggleRecording}
                    className={`w-full h-16 text-lg ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                  >
                    <Mic className="mr-2 h-6 w-6" />
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                  </Button>
                  {isRecording && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span className="animate-pulse">●</span>
                      <span>Recording in progress...</span>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="upload" className="mt-4">
                <div className="space-y-4">
                  <Label htmlFor="audio-upload" className="block">Upload Audio File</Label>
                  <Input id="audio-upload" type="file" accept=".wav,.mp3" onChange={handleFileUpload} />
                  {audioFile && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <FileAudio className="h-4 w-4" />
                      <span>{audioFile.name}</span>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Button
              onClick={handleTranscribe}
              className="w-full h-16 text-lg bg-green-500 hover:bg-green-600"
              disabled={isTranscribing || !audioFile}
            >
              {isTranscribing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Transcribing...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Transcribe Audio
                </>
              )}
            </Button>
            {isTranscribing && (
              <Progress value={66} className="mt-4" />
            )}
          </CardContent>
        </Card>

        <AnimatePresence>
          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Transcript</h2>
                  <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{transcript}</p>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <Separator className="my-8" />

        <TranscriptList />
      </main>
    </div>
  )
}
