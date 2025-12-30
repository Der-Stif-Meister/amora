import React, { useState } from 'react'

export default function StyleQuiz({ open, onClose }: { open: boolean; onClose: ()=>void }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<any>({})

  if (!open) return null

  return (
    <div className="quiz-modal">
      <div className="quiz-card">
        <h3>Style Quiz</h3>
        {step === 0 && (
          <div>
            <p>What is your go-to style?</p>
            <button onClick={()=>{ setAnswers({...answers, style:'casual'}); setStep(1)}}>Casual</button>
            <button onClick={()=>{ setAnswers({...answers, style:'formal'}); setStep(1)}}>Formal</button>
            <button onClick={()=>{ setAnswers({...answers, style:'trendy'}); setStep(1)}}>Trendy</button>
          </div>
        )}

        {step === 1 && (
          <div>
            <p>Favourite colors?</p>
            <button onClick={()=>{ setAnswers({...answers, color:'neutral'}); setStep(2)}}>Neutral</button>
            <button onClick={()=>{ setAnswers({...answers, color:'bright'}); setStep(2)}}>Bright</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <p>Done — we will personalize picks for you.</p>
            <button onClick={()=>{ onClose(); setStep(0); setAnswers({}) }}>Finish</button>
          </div>
        )}
      </div>
    </div>
  )
}
