import { NextResponse } from 'next/server'


// --- Important ---
// Add this in .env.local → GEMINI_API_KEY="your_api_key_here"

export async function POST(req: Request) {
  try {
    const { message, conversationHistory } = await req.json()

    if (!message) {
      return NextResponse.json({ success: false, error: 'No message provided.' })
    }

    // System prompt defines AI's persona and behavior
    const systemPrompt = `You are Ajay's AI Assistant, representing an innovative Automobile Engineer specializing in LNG vehicles, advanced diesel engines, and automotive technology.

--- About Ajay ---
- Automobile Engineer with expertise in lng vehicles and diesel engines
- Passionate about sustainable automotive solutions
- Experienced in MS Office, engine optimization, and emission control systems
- Interested in research and development of next-generation vehicles
- Skilled in automotive technologies and industry standards

--- Instructions ---
You can answer two categories of questions:
1. About Ajay: His background, expertise, projects, certifications, and interests
2. Automobile-related topics: LNG/CNG vehicles, BS6 standards, engines, emission control, automotive technology, etc.

Be helpful, informative, and maintain a professional yet friendly tone. Keep responses concise and relevant.`

    // Combine system + conversation history + latest message
    const prompt =
      systemPrompt +
      '\n\n' +
      conversationHistory
        .map(
          (msg: any) => `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`
        )
        .join('\n') +
      `\nUser: ${message}\nAssistant:`

    // Send to Gemini 2.5 Pro API
    const geminiRes = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=' +
        process.env.GEMINI_API_KEY,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    )

    const data = await geminiRes.json()

    // Extract the model’s reply
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      'Sorry, I could not generate a response.'

    return NextResponse.json({ success: true, response: text })
  } catch (error: any) {
    console.error('Gemini API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch response from Gemini API.' },
      { status: 500 }
    )
  }
}
