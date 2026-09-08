const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = 'google/gemini-2.5-flash-lite';
const UNAVAILABLE_MESSAGE =
  'AI prompts are temporarily unavailable. Please try again shortly.';

export async function generatePromptWithAI(
  mood: string,
  direction: string,
  scene?: string
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error(
      'AI generation is unavailable: OPENROUTER_API_KEY is missing'
    );
    throw new Error(UNAVAILABLE_MESSAGE);
  }

  const systemPrompt = `You are a thoughtful journal prompt generator. Create a single, unique journal prompt.
Rules:
- Be specific and thought-provoking
- 1-2 sentences only
- Encourage deep introspection
- Warm, supportive tone
- Return ONLY the prompt text, no quotes, no prefix`;

  const sceneContext = scene
    ? ` in the context of ${scene.replace(/-/g, ' ')}`
    : '';

  const userPrompt = `Generate a journal prompt for someone feeling "${mood}" who wants to explore "${direction.replace('-', ' ')}"${sceneContext}.`;

  let response: Response;
  try {
    response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://journalprompts.org',
        'X-Title': 'Journal Prompts',
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL?.trim() || DEFAULT_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: 150,
        temperature: 0.9,
      }),
      signal: AbortSignal.timeout(20_000),
    });
  } catch {
    console.error('AI provider request failed or timed out');
    throw new Error(UNAVAILABLE_MESSAGE);
  }

  if (!response.ok) {
    console.error('AI provider returned HTTP status:', response.status);
    throw new Error(UNAVAILABLE_MESSAGE);
  }

  const data = await response.json().catch(() => null);
  const value = data?.choices?.[0]?.message?.content;
  const content = typeof value === 'string' ? value.trim() : '';

  if (!content) {
    console.error('AI provider returned no usable prompt');
    throw new Error(UNAVAILABLE_MESSAGE);
  }

  return content;
}
