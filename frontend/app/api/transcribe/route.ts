import { NextRequest, NextResponse } from 'next/server'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export async function POST() {
  try {
    // const formData = await request.formData()
    // const file = formData.get('file') as File

    // if (!file) {
    //   return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    // }

    const transcriptions = [
      "The sound of the wind swaying the trees as the sun begins to set paints a picture of tranquility, while the distant hum of the city reminds us that life moves forward in all corners of the world.",
      "As the waves crash gently against the shore, the smell of saltwater fills the air, blending with the warmth of the sun as it sets, casting golden hues over the horizon, and making the world seem still and peaceful.",
      "In a quiet room with the soft rustle of pages turning and the occasional creak of the wooden floor, one can hear the rhythm of thought, the processing of ideas, and the peaceful solitude of reflection that fills the space with a quiet energy.",
      "Amidst the bustling energy of the streets, the hum of traffic, and the constant flow of people moving in every direction, one can find moments of calm, brief pauses in time where everything slows down, and you can breathe deeply before continuing your journey.",
      "In the heart of the forest, where sunlight filters through the canopy and the forest floor is blanketed with moss and fallen leaves, the air is thick with the scent of earth and life, and every step feels like a quiet conversation with nature itself.",
    ]

    const randomTranscript = transcriptions[Math.floor(Math.random() * transcriptions.length)]

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

    await db.run('INSERT INTO transcripts (text) VALUES (?)', randomTranscript)
    await db.close()

    return NextResponse.json({ text: randomTranscript })
  } catch (error) {
    console.error('Transcription error:', error)
    return NextResponse.json({ error: 'Transcription failed' }, { status: 500 })
  }
}