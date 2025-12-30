require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fetch = global.fetch || require('node-fetch')

const app = express()
app.use(cors())
app.use(express.json())

const rawKey = (process.env.OPENAI_API_KEY || '').trim()
const OPENAI_KEY = (!rawKey || rawKey.includes('REPLACE_ME')) ? '' : rawKey

app.post('/api/das', async (req, res) => {
  const { message } = req.body
  if (!message) return res.status(400).json({ error: 'message required' })
  if (!OPENAI_KEY) return res.status(500).json({ error: "OpenAI API key not configured. See .env.example" })

  try {
    const system = `You are DAS (Deborah Amofah Serwaah), a friendly shopping assistant for Amora e-commerce. Answer with helpful, conversational recommendations and help users find products, track orders, and suggest outfits.`

    const payload = {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: message }
      ],
      max_tokens: 600
    }

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify(payload)
    })

    if (!r.ok) {
      const text = await r.text()
      return res.status(500).json({ error: 'OpenAI error', detail: text })
    }

    const data = await r.json()
    const assistant = data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : 'Sorry, I could not generate a response.'
    return res.json({ reply: assistant })
  } catch (err) {
    return res.status(500).json({ error: 'server error', detail: err.message })
  }
})

// Placeholder checkout endpoint - replace with Stripe integration in production
app.post('/api/create-checkout-session', async (req, res) => {
  // In production, call Stripe SDK here to create a checkout session.
  // For now return a mock session URL to simulate redirect.
  return res.json({ url: '/mock-checkout?session=demo' })
})

const port = process.env.PORT || 4000
app.get('/api/health', (req, res) => {
  return res.json({ ok: true, das: OPENAI_KEY ? 'configured' : 'missing' })
})

app.listen(port, () => {
  console.log(`Amora server running on http://localhost:${port}`)
  if (OPENAI_KEY) console.log('OpenAI API key: configured')
  else console.log('OpenAI API key: not configured (server will return DAS offline).')
})
