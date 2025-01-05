
# BrawlerXull Transcriptor

A simple full-stack application for audio transcription and text-to-speech (TTS) demonstration. Built with a **FastAPI** backend and **Next.js** frontend.

---

## Directory Structure

```plaintext
BrawlerXull-transcriptor/
├── backend/
│   ├── requirements.txt        # Backend dependencies
│   ├── transcripts.db          # SQLite database for transcripts (if enabled)
│   └── api/
│       ├── index.py            # FastAPI backend implementation
│       └── __pycache__/        # Python cache files
└── frontend/
    ├── README.md               # Frontend documentation
    ├── components.json         # Components configuration
    ├── next.config.js          # Next.js configuration
    ├── package-lock.json       # Lock file for npm packages
    ├── package.json            # Dependencies and scripts
    ├── postcss.config.mjs      # PostCSS configuration
    ├── tailwind.config.ts      # Tailwind CSS configuration
    ├── tsconfig.json           # TypeScript configuration
    ├── .eslintrc.json          # ESLint configuration
    ├── .gitignore              # Ignored files
    ├── app/
    │   ├── globals.css         # Global styles
    │   ├── layout.tsx          # Layout component
    │   └── page.tsx            # Main page implementation
    ├── components/
    │   ├── TranscriptList.tsx  # UI component for listing transcripts
    │   └── ui/                 # Reusable UI components
    ├── hooks/                  # Custom React hooks
    │   ├── use-toast.ts
    │   ├── useAppToast.ts
    │   ├── useAudioRecorder.ts
    │   ├── useRecording.ts
    │   ├── useTranscription.ts
    │   ├── useTranscripts.ts
    │   └── usetheme.ts
    ├── lib/
    │   └── utils.ts            # Utility functions
    └── public/                 # Static assets

```

---

## Setup Instructions

### Backend (FastAPI)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the FastAPI server:
   ```bash
   uvicorn api.index:app --reload
   ```

5. The API will be accessible at `http://127.0.0.1:8000`.

### Frontend (Next.js)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend will be accessible at `http://localhost:3000`.

---

## API Endpoints

### `/api/transcribe` (POST)
- **Description**: Accepts an audio file and returns a hardcoded transcription.
- **Request**:
  - Content-Type: `multipart/form-data`
  - Body: Audio file (`.wav`, `.mp3`, etc.)
- **Response**:
  ```json
  {
    "transcription": "Hardcoded transcription text."
  }
  ```

### `/api/synthesize` (POST) (Optional)
- **Description**: Accepts text input and returns a synthesized audio stream.
- **Request**:
  - Content-Type: `application/json`
  - Body: `{"text": "Sample text"}`
- **Response**: Audio file (MIME type: `audio/mpeg`).

---

## Additional Features

- **Database** (Optional): Uses SQLite to store transcripts for later retrieval and listing.
- **Custom Hooks**: Simplify audio recording and transcription management in the frontend.

---

## Next Steps

1. Integrate actual STT/TTS libraries (e.g., Google Speech-to-Text, Amazon Polly).
2. Add unit and integration tests.
3. Improve error handling and user feedback in the frontend.
4. Optimize for production deployment.

---

## Libraries Used

### Backend
- **FastAPI**: For creating the REST API.
- **SQLite**: For local data storage.

### Frontend
- **Next.js**: For server-side rendering and routing.
- **Tailwind CSS**: For styling.
- **React Hooks**: For managing state and side effects.

---

## Implementing Text To Speech

### Open AI
- Open AI Offers Text to Speech and Speech to Text service which can be used
- Sample Implementation can be found [here](https://github.com/BrawlerXull/transcriptor/blob/90a36b9f5d20cefef1368feb168290e3eb944f7f/frontend/app/api/tts/route.ts)

### Google Speech-to-Text API
- Google offers a high-quality, scalable, and highly accurate STT service. It supports multiple languages and real-time transcription.

Happy Coding! 🎉
