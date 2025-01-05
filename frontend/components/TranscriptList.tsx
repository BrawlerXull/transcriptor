'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Transcript {
  id: number;
  text: string;
  created_at: string;
}

export function TranscriptList() {
  const [transcripts, setTranscripts] = useState<Transcript[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const response = await fetch('/api/transcripts')
        if (!response.ok) {
          throw new Error('Failed to fetch transcripts')
        }
        const data = await response.json()
        setTranscripts(data)
      } catch (error) {
        console.error('Error fetching transcripts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTranscripts()
  }, [])

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Previous Transcripts</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <AnimatePresence>
            {transcripts.map((transcript) => (
              <motion.div
                key={transcript.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-4"
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        {new Date(transcript.created_at).toLocaleString()}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(transcript.id)}
                      >
                        {expandedId === transcript.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <AnimatePresence>
                      {expandedId === transcript.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ScrollArea className="h-[100px] mt-2">
                            <p className="text-sm">{transcript.text}</p>
                          </ScrollArea>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </CardContent>
    </Card>
  )
}

