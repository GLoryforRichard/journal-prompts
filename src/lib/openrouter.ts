const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function generatePromptWithAI(
  mood: string,
  direction: string,
  scene?: string,
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OpenRouter API key not configured');
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

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://journalprompts.org',
      'X-Title': 'Journal Prompts',
    },
    body: JSON.stringify({
      model: 'openai/gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 150,
      temperature: 0.9,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenRouter API error:', response.status, errorText);
    throw new Error(`AI service error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error('No response from AI');
  }

  return content;
}
