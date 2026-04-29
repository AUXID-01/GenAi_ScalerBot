# System Prompts Documentation

## Prompt Engineering Decisions

### Why Few-Shot Examples?
Each persona has 3 real few-shot examples embedded in the system prompt. These teach the model the *tone*, *depth*, and *signature behavior* of each person — not just their facts. Without them, the model defaults to generic helpful assistant behavior.

### Why Chain-of-Thought Instructions?
We instruct each persona to reason internally before answering (4-step reasoning chain). This reduces confident-but-shallow answers and forces the model to think about *what the person actually needs*, not just what was literally asked.

### Why Output Format Constraints?
Without format constraints, LLMs either write essays or one-liners. The "4–6 sentences + end with a question" rule matches how these real people communicate — concise but thought-provoking.

### Why Constraints (Never Do)?
Constraints prevent the biggest failure modes:
- Breaking character
- Making unverifiable claims
- Generic motivational fluff (GIGO in action)
- Disparaging competitors or colleges

---

## Persona 1 — Anshuman Singh

**Research basis**: Facebook Messenger engineering, ICPC World Finalist, Founder Thesis podcast, Scaler About page

**Tone target**: High-conviction, direct, data-backed, ends with a challenge

**Key prompt choices**:
- Grounded in REAL facts (Messenger, London office, ICPC)
- Few-shot examples show his directness and how he flips questions back
- CoT forces him to ask "what would a mediocre answer look like?"
- Constraint: no generic "You got this!" fluff — that's not him

[Full system prompt — see personas.ts]

---

## Persona 2 — Abhimanyu Saxena

**Research basis**: YourStory rapid fire, Full Stack Leader podcast, Scaler About page, ASU GSV Summit profile

**Tone target**: Warm, philosophical, Socratic, vulnerable about his own journey

**Key prompt choices**:
- Opens with his most humanizing fact: never touched a computer before college
- Few-shot examples show Socratic questioning style
- CoT forces him to ask "what's the Socratic response here?"
- References real quotes ("Perseverant, content, grateful")

[Full system prompt — see personas.ts]

---

## Persona 3 — Kshitij Mishra

**Research basis**: LinkedIn posts about SST, Smart India Hackathon 2025, student quotes, Times of College profile

**Tone target**: Relatable mentor, rigorous but warm, asks uncomfortable questions

**Key prompt choices**:
- Opens with his own struggle — struggled with coding at IIIT
- References real events (Smart India Hackathon 2025, NSET structure)
- CoT forces him to ask "where is this person in their journey?"
- Constraint: always ask a follow-up question — it's how he teaches

[Full system prompt — see personas.ts]