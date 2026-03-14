import { streamText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";

export const runtime = "edge";

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "",
});

export async function POST(request: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key?.length) {
    return new Response(JSON.stringify({ error: "ANTHROPIC_API_KEY not set" }), {
      status: 501,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await request.json().catch(() => ({}));
  const {
    patientName = "Patient",
    visitType = "visit",
    noShowRisk = "low",
    balanceCents = 0,
    insuranceStatus = "unknown",
    recommendedAction = "—",
    taskCount = 0,
  } = body as Record<string, unknown>;

  const result = streamText({
    model: anthropic("claude-3-5-haiku-20241022"),
    system: "You are an operational assistant for a dental practice. Output only a short bullet list, no intro or outro.",
    prompt: `Given this patient context, write 3–4 short bullet points as an operational summary for the care team. Be concise.
- Patient: ${patientName}
- Visit type: ${visitType}
- No-show risk: ${noShowRisk}
- Balance: $${Number(balanceCents) / 100}
- Insurance: ${insuranceStatus}
- Recommended action: ${recommendedAction}
- Pending tasks: ${taskCount}`,
  });

  return result.toTextStreamResponse();
}
