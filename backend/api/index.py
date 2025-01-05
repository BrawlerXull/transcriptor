from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
from sqlite3 import Connection
import os
import random

app = FastAPI()

# CORS Middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Database setup
DATABASE_PATH = './transcripts.db'


class Transcript(BaseModel):
    text: str


@app.post("/api/synthesize")
async def synthesize():
    try:
        sample_audio_path = os.path.join(os.getcwd(), 'public', 'sample.mp3')

        if not os.path.exists(sample_audio_path):
            raise HTTPException(status_code=404, detail="Sample audio file not found")

        return FileResponse(sample_audio_path, media_type='audio/mpeg', headers={
            "Content-Disposition": 'attachment; filename="sample.mp3"'
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail="Audio generation failed")


@app.post("/api/transcribe")
async def transcribe(file: UploadFile = File(...)):
    try:
        transcriptions = [
            "The sound of the wind swaying the trees as the sun begins to set paints a picture of tranquility...",
            "As the waves crash gently against the shore, the smell of saltwater fills the air...",
            "In a quiet room with the soft rustle of pages turning and the occasional creak of the wooden floor...",
            "Amidst the bustling energy of the streets, the hum of traffic, and the constant flow of people...",
            "In the heart of the forest, where sunlight filters through the canopy and the forest floor is blanketed with moss..."
        ]
        random_transcript = random.choice(transcriptions)

        conn: Connection = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS transcripts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                text TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        cursor.execute('INSERT INTO transcripts (text) VALUES (?)', (random_transcript,))
        conn.commit()
        conn.close()

        return {"text": random_transcript}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Transcription failed")


@app.get("/api/transcripts")
async def get_transcripts():
    try:
        conn: Connection = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS transcripts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                text TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        cursor.execute('SELECT * FROM transcripts ORDER BY created_at DESC LIMIT 5')
        transcripts = cursor.fetchall()
        conn.close()

        return [{"id": t[0], "text": t[1], "created_at": t[2]} for t in transcripts]
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch transcripts")
