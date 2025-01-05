import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST() {
  try {
    const sampleAudioPath = path.join(process.cwd(), 'public', 'sample.mp3')

    if (!fs.existsSync(sampleAudioPath)) {
      return NextResponse.json({ error: 'Sample audio file not found' }, { status: 404 })
    }

    const audioFileStream = fs.createReadStream(sampleAudioPath)

    const readableStreamDefaultWriter = new ReadableStream({
      start(controller) {
        audioFileStream.on('data', chunk => controller.enqueue(chunk))
        audioFileStream.on('end', () => controller.close())
        audioFileStream.on('error', (err) => controller.error(err))
      }
    })

    return new NextResponse(readableStreamDefaultWriter, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'attachment; filename="sample.mp3"',
      },
    })
  } catch (error) {
    console.error('Error generating audio:', error)
    return NextResponse.json({ error: 'Audio generation failed' }, { status: 500 })
  }
}
