import { NextRequest, NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 })
    }

    const response = await openai.createSpeech({
      model: 'tts-1',
      voice: 'alloy',
      input: text,
    })

    const audioBuffer = await response.data.arrayBuffer()

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    })
  } catch (error) {
    console.error('Text-to-speech error:', error)
    return NextResponse.json({ error: 'Text-to-speech failed' }, { status: 500 })
  }
}

