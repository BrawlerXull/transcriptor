import { NextRequest, NextResponse } from 'next/server'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Sample transcription (replace this with actual transcription logic if needed)
    const sampleTranscript = "This is a sample transcription of the audio file. In a real-world scenario, you would process the audio file and generate an accurate transcription here."

    const db = await open({
      filename: './transcripts.db',
      driver: sqlite3.Database
    })

    await db.exec(`
      CREATE TABLE IF NOT EXISTS transcripts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await db.run('INSERT INTO transcripts (text) VALUES (?)', sampleTranscript)
    await db.close()

    return NextResponse.json({ text: sampleTranscript })
  } catch (error) {
    console.error('Transcription error:', error)
    return NextResponse.json({ error: 'Transcription failed' }, { status: 500 })
  }
}

