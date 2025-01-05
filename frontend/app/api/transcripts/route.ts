import { NextResponse } from 'next/server'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export async function GET() {
  try {
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

    const transcripts = await db.all('SELECT * FROM transcripts ORDER BY created_at DESC LIMIT 5')
    await db.close()

    return NextResponse.json(transcripts)
  } catch (error) {
    console.error('Error fetching transcripts:', error)
    return NextResponse.json({ error: 'Failed to fetch transcripts' }, { status: 500 })
  }
}