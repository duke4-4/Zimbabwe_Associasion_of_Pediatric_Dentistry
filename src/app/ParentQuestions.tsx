import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"

const children = { label: "NHS: children’s teeth", url: "https://www.nhs.uk/live-well/healthy-teeth-and-gums/taking-care-of-childrens-teeth/" }
const aapd = { label: "AAPD: parent questions", url: "https://www.aapd.org/resources/parent/faq/" }
const behaviour = { label: "AAPD: helping children during dental visits", url: "https://www.aapd.org/research/oral-health-policies--recommendations/behavior-guidance-for-the-pediatric-dental-patient/" }
const decay = { label: "NHS: tooth decay", url: "https://www.nhs.uk/conditions/tooth-decay/" }

const questions = [
  { category: "First visits", title: "When should my child first see a dentist?", paragraphs: ["Arrange a visit when the first tooth appears, and no later than your child’s first birthday. Early visits help your child become familiar with the dentist and give you a chance to discuss feeding, brushing and prevention."], source: aapd },
  { category: "Baby teeth", title: "Why do baby teeth matter?", paragraphs: ["Baby teeth help children eat and speak, and hold space for the adult teeth that follow. They need care even though they will eventually fall out. Have pain or signs of decay checked by a dentist."], source: aapd },
  { category: "Daily care", title: "How should I brush my child’s teeth?", paragraphs: ["Start with the first tooth. Use a small, soft brush twice a day for about two minutes, including before bed. Help young children brush every surface; supervise older children until they can clean thoroughly.", "Encourage your child to spit out toothpaste without rinsing afterwards."], source: children },
  { category: "Daily care", title: "Which toothpaste should we use?", paragraphs: ["Choose fluoride toothpaste. Under three, use a tiny smear containing at least 1,000 ppm fluoride. From three to six, use a pea-sized amount containing 1,000–1,500 ppm. From seven, use 1,350–1,500 ppm.", "Check the label, supervise brushing and discourage swallowing toothpaste. Your dentist can advise if your child needs a different strength."], source: children },
  { category: "Food & drink", title: "How does diet affect my child’s teeth?", paragraphs: ["Frequent sugary food and drinks increase the risk of decay. Reduce sugary snacks and drinks as part of a balanced diet. Brushing and regular dental checks are still important even when your child eats well."], source: decay },
  { category: "Prevention", title: "How can we prevent tooth decay?", paragraphs: ["Brush twice daily with fluoride toothpaste, clean between teeth with help where needed, and limit sugary food and drinks. Keep up with the check-ups your dentist recommends.", "Decay can begin without pain. Arrange a dental visit if you notice toothache, sensitivity or white, brown or dark spots."], source: decay },
  { category: "Dental anxiety", title: "What if my child is afraid of the dentist?", paragraphs: ["Tell the practice about your child’s worries before the visit. Ask the dentist to explain and demonstrate each step at a pace your child can manage. Praise, distraction and gradual familiarisation can help.", "The dentist can plan support around your child’s needs and discuss other options if routine care remains difficult."], source: behaviour },
  { category: "Urgent care", title: "When is a dental problem urgent?", paragraphs: ["Severe toothache, facial swelling or a fever with dental symptoms needs urgent assessment by a dentist.", "Difficulty breathing or swallowing, major swelling in the mouth, or swelling around an eye needs immediate emergency medical care. Go to the nearest emergency department; do not wait for a routine dental appointment."], source: { label: "NHS: dental abscess and urgent symptoms", url: "https://www.nhs.uk/conditions/dental-abscess/" } },
  { category: "Growing teeth", title: "When will my child’s teeth come through?", paragraphs: ["A first tooth often appears around six months, but the timing varies widely. Most children have all their baby teeth by age two to three.", "Ask your dentist about development that concerns you. Do not assume a child’s illness or concerning symptoms are simply teething."], source: { label: "NHS: teething and tooth development", url: "https://www.nhs.uk/baby/babys-development/teething/baby-teething-symptoms/" } },
  { category: "Dental injuries", title: "What if a tooth is knocked out?", paragraphs: ["Seek emergency dental care immediately. Never put a baby tooth back into its socket; this can harm the adult tooth underneath.", "For a permanent tooth, handle it by the crown, not the root. If it cannot be safely put back, keep it in milk and take it with your child to a dentist straight away. If you are unsure which type of tooth it is, get urgent dental advice."], source: { label: "NHS: knocked-out teeth", url: "https://www.nhs.uk/conditions/knocked-out-tooth/" } },
  { category: "Additional support", title: "Can dental care be adapted to my child’s needs?", paragraphs: ["Yes. Discuss your child’s medical history, communication preferences, sensory needs and previous experiences with the practice before the appointment. The team can consider a quieter environment, visual communication and a gradual introduction to treatment.", "Care should be planned with you and your child around their individual needs."], source: behaviour },
  { category: "Regular visits", title: "How often does my child need a check-up?", paragraphs: ["Many children attend every six months, but the right interval depends on their oral health and risk of decay. Follow your dentist’s recommended schedule. Arrange an earlier appointment if symptoms develop."], source: aapd },
]

export default function ParentQuestions() {
  const [selected, setSelected] = useState<typeof questions[number] | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!selected) return
    const opener = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    dialog.current?.showModal()
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
      opener?.focus()
    }
  }, [selected])

  return (
    <div className="parent-questions" aria-labelledby="parent-questions-title">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="parent-questions-title" className="font-display text-3xl text-[#064b7b]">Your questions, answered</h2>
          <p className="mt-3 text-[#4d6e82]">Select a question for practical guidance.</p>
        </div>
        <Link to="/directory" className="font-semibold text-[#00733f] underline underline-offset-4">Find a dentist</Link>
      </div>
      <div className="question-grid">
        {questions.map((question) => (
          <button key={question.title} type="button" className="question-button" aria-haspopup="dialog" onClick={() => setSelected(question)}>
            <span><span className="question-category">{question.category}</span><span className="question-title">{question.title}</span></span>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
          </button>
        ))}
      </div>
      {selected && (
        <dialog ref={dialog} className="answer-dialog" aria-labelledby="answer-title" onCancel={() => setSelected(null)} onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) setSelected(null) }} onKeyDown={(event) => {
          if (event.key !== "Tab") return
          const controls = event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]")
          const first = controls[0]
          const last = controls[controls.length - 1]
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last?.focus()
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first?.focus()
          }
        }}>
          <div className="answer-content">
            <div className="flex items-center justify-between gap-5">
              <p className="text-sm font-semibold text-[#00733f]">{selected.category}</p>
              <button type="button" autoFocus onClick={() => setSelected(null)} className="answer-close" aria-label="Close answer">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m6 6 12 12M18 6 6 18" /></svg>
              </button>
            </div>
            <h2 id="answer-title" className="mt-5 font-display text-2xl leading-tight text-[#064b7b] sm:text-3xl">{selected.title}</h2>
            <div className="mt-6 space-y-4 leading-7 text-[#315d79]">{selected.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <div className="mt-8 border-t border-[#064b7b]/15 pt-5 text-sm leading-6 text-[#4d6e82]">
              <p>General guidance; your dentist can advise on your child’s individual needs.</p>
              <a className="mt-3 inline-block text-[#00733f] underline underline-offset-4" href={selected.source.url} target="_blank" rel="noreferrer">{selected.source.label} (opens in a new tab)</a>
            </div>
          </div>
        </dialog>
      )}
    </div>
  )
}
