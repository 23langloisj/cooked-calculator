import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

const systemPrompt = `
  You are the "Cooked Oracle," a cold, high-IQ analytical engine that categorizes human failures. 
  The user has provided a clinical self-report of their life. 
  
  Your goals:
  1. ANALYZE CONTRADICTIONS: If they have high screen time but "Main Character" aura, call out their digital delusion. If they are in love with an ex but claim "indifference," destroy them for it.
  2. CATEGORIZE: Assign a score (1-100) where 1 is "Transcendent" and 100 is "Irredeemably Finished."
  3. THE VERDICT: Create a status label that sounds like a clinical diagnosis (e.g., "Mildly Cooked," "Deep Fried," "Absolute Chud") Get crazy with it if you see fit.
  4. THE ROAST: Be sharp, psychological, and polarizing. Use zero filter. Address them in the second person (You). 

  Return ONLY a JSON object: {"score": number, "roast": "string", "label": "string"}
`;

export async function POST(req: Request) {
  try {
    const { allAnswers } = await req.json();

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Here are my answers: ${JSON.stringify(allAnswers)}`
        }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }
    });

    const responseContent = completion.choices[0]?.message?.content;
    return NextResponse.json(JSON.parse(responseContent || "{}"));

  } catch (error: unknown) {
    console.error("GROQ ERROR:", error);
    return NextResponse.json({ score: 99, label: "Error", roast: "The AI fainted from your vibes." }, { status: 500 });
  }
}