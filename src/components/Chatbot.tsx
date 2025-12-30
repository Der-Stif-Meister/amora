import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'

type Message = { from: 'user' | 'bot'; text: string; ts?: number }

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [value, setValue] = useState('')
  const [typing, setTyping] = useState(false)
  const [dasOnline, setDasOnline] = useState<boolean | null>(null)

  useEffect(() => {
    // Check server health to show online/offline status
    let mounted = true
    fetch(`${API_BASE}/api/health`).then((r) => r.json()).then((j) => {
      if (!mounted) return
      setDasOnline(j && j.das === 'configured')
    }).catch(() => setDasOnline(false))
    return () => { mounted = false }
  }, [])

  // load persisted chat history
  useEffect(() => {
      // load persisted chat history (backward compatible)
      try {
        const raw = localStorage.getItem('amora_chat_v1')
        if (raw) {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed)) {
            const norm = parsed.map((m: any) => ({ from: m.from, text: m.text, ts: m.ts || Date.now() }))
            setMessages(norm)
          }
        }
    } catch {}
  }, [])

  // persist messages
  useEffect(() => {
    try {
      localStorage.setItem('amora_chat_v1', JSON.stringify(messages))
    } catch {}
  }, [messages])

  // scroll to bottom on new messages
  const bodyRef = React.useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    setTimeout(() => {
      el.scrollTop = el.scrollHeight
    }, 80)
  }, [messages, typing])

  const cannedReply = (text: string) => {
    const q = text.toLowerCase()
      if (q.includes('dress')) {
        const picks = products.filter(p => p.category === 'Women').slice(0,3)
        const list = picks.map(p=>`• ${p.title} (${p.currency} ${p.price})`).join('\n')
        // include product ids on a second line marker so we can render links client-side
        const ids = picks.map(p=>p.id).join(',')
        return `Here are some dresses you might like:\n${list}\n__IDS__:${ids}`
    }
    if (q.includes('flash') || q.includes('sale')) return 'Flash Sale: up to 50% off selected dresses — check the Flash Sale banner on the homepage.'
    if (q.includes('size')) return 'Size guide: our dresses run true to size. For precise fit, check the product page for measurements.'
    if (q.includes('add to cart')) return 'To add an item to your cart, open the product and click "Add to cart". I can help find the product — try "Show dresses".'
    return "Sorry, I'm demoing offline — try 'Show dresses' or 'Flash sale' to see sample replies."
  }

  const send = async (text: string) => {
    if (!text.trim()) return
    const userMsg = { from: 'user' as const, text, ts: Date.now() }
    setMessages((m) => [...m, userMsg])
    setValue('')

    // If DAS is known to be offline, simulate a canned reply locally
    if (dasOnline === false) {
      setTyping(true)
      setTimeout(() => {
        setMessages((m) => [...m, { from: 'bot', text: cannedReply(text), ts: Date.now() }])
        setTyping(false)
      }, 800 + Math.random() * 600)
      return
    }

    setTyping(true)
    try {
      const res = await fetch(`${API_BASE}/api/das`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      })

        if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown' }))
        const msg = err && typeof err.error === 'string' && err.error.includes('OpenAI API key')
          ? 'DAS is offline: OpenAI API key not configured on the server. See server/.env.example.'
          : `DAS: Sorry, I couldn't reach the assistant (${err.error || 'error'})`
        setMessages((m) => [...m, { from: 'bot', text: msg, ts: Date.now() }])
      } else {
        const data = await res.json()
        setMessages((m) => [...m, { from: 'bot', text: data.reply, ts: Date.now() }])
      }
    } catch (e) {
      setMessages((m) => [...m, { from: 'bot', text: 'DAS: Network error — please try again.', ts: Date.now() }])
    } finally {
      setTyping(false)
    }
  }

  const clearHistory = () => {
    setMessages([])
    try { localStorage.removeItem('amora_chat_v1') } catch {}
  }

  const suggestions = ['Show dresses', 'Flash sale', 'Size guide', 'Add to cart']

  return (
    <div>
      <button className="chat-toggle" onClick={() => setOpen((s) => !s)}>{open ? '✕' : 'DAS'}</button>

      {open && (
        <div className="chat-window modern">
          <div className="chat-header modern">
            <div className="das-avatar">D</div>
            <div className="chat-head-meta">
              <div className="chat-title">DAS</div>
              <div className="chat-subtitle">{dasOnline === null ? 'Checking…' : dasOnline ? 'Online' : 'Offline'}</div>
            </div>
            <div style={{marginLeft:'auto', display:'flex', gap:8, alignItems:'center'}}>
              <button className="clear-chat" onClick={clearHistory} title="Clear history">Clear</button>
            </div>
          </div>

          <div className="chat-body modern">
            {messages.length === 0 && (
              <div className="chat-empty">Hi! Ask me about outfits, products, or orders. Try: <span className="hint">"Show dresses"</span></div>
            )}

            <div className="suggestions">
              {suggestions.map((s) => (
                <button key={s} className="chip" onClick={() => send(s)}>{s}</button>
              ))}
            </div>

            {messages.map((m, i) => {
              if (m.from === 'bot' && m.text && m.text.includes('__IDS__:')) {
                const [textPart, idsPart] = m.text.split('__IDS__:')
                const ids = (idsPart || '').split(',').map(s => s.trim()).filter(Boolean)
                const picks = ids.map(id => products.find(p => String(p.id) === id)).filter(Boolean)
                return (
                  <div key={i} className={`chat-msg bot`}>
                    <div className="msg-text">
                      {textPart.split('\n').map((line, idx) => <div key={idx}>{line}</div>)}
                      <div style={{marginTop:8, display:'flex', gap:8, flexDirection:'column'}}>
                        {picks.map((p: any) => (
                          <Link key={p.id} to={`/product/${p.id}`} className="chat-pick">
                            <div style={{display:'flex', gap:8, alignItems:'center'}}>
                              <img src={p.images?.[0]} style={{width:48, height:64, objectFit:'cover', borderRadius:6}} alt={p.title} />
                              <div style={{display:'flex', flexDirection:'column'}}>
                                <div style={{fontSize:13}}>{p.title}</div>
                                <div style={{fontSize:12, opacity:0.9}}>{p.currency} {p.price}</div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }
              return (
                <div key={i} className={`chat-msg ${m.from}`}><div className="msg-text">{m.text}</div></div>
              )
            })}

            {typing && (
              <div className="chat-msg bot typing">
                <div className="typing-dots"><span></span><span></span><span></span></div>
              </div>
            )}
          </div>

          <div className="chat-input modern">
            <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Ask DAS for outfit ideas, sizing, or orders..." onKeyDown={(e) => { if (e.key === 'Enter') send(value) }} />
            <button className="send-btn" onClick={() => send(value)}>Send</button>
          </div>
        </div>
      )}
    </div>
  )
}
