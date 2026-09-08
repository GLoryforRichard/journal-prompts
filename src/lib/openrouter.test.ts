import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { generatePromptWithAI } from './openrouter';

describe('AI prompt provider', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubEnv('OPENROUTER_API_KEY', 'test-placeholder');
    vi.stubEnv('OPENROUTER_MODEL', '');
    vi.stubGlobal('fetch', fetchMock);
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    fetchMock.mockReset();
  });

  it('uses an available replacement model and a request deadline', async () => {
    fetchMock.mockResolvedValue(
      Response.json({
        choices: [{ message: { content: '  What helped you today?  ' } }],
      })
    );
    await expect(generatePromptWithAI('grateful', 'gratitude')).resolves.toBe(
      'What helped you today?'
    );
    const options = fetchMock.mock.calls[0][1];
    expect(JSON.parse(options.body).model).toBe('google/gemini-3.8-flash');
    expect(JSON.parse(options.body)).toMatchObject({
      max_tokens: 1024,
      reasoning: { effort: 'low', exclude: true },
    });
    expect(JSON.parse(options.body)).not.toHaveProperty('temperature');
    expect(options.signal).toBeInstanceOf(AbortSignal);
  });

  it('lets operators change the model without changing code', async () => {
    vi.stubEnv('OPENROUTER_MODEL', 'google/gemini-2.5-flash');
    fetchMock.mockResolvedValue(
      Response.json({ choices: [{ message: { content: 'A prompt' } }] })
    );
    await generatePromptWithAI('curious', 'self-discovery');
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).model).toBe(
      'google/gemini-2.5-flash'
    );
  });

  it('does not expose provider error details or credentials', async () => {
    fetchMock.mockResolvedValue(
      new Response('secret provider account details', { status: 401 })
    );
    await expect(generatePromptWithAI('sad', 'healing')).rejects.toThrow(
      'temporarily unavailable'
    );
    expect(JSON.stringify(vi.mocked(console.error).mock.calls)).not.toContain(
      'secret provider account details'
    );
  });

  it.each([
    {},
    { choices: [{ message: { content: '' } }] },
    {
      choices: [
        { finish_reason: 'length', message: { content: 'What if you' } },
      ],
    },
    { choices: [{ message: { content: [{ text: 'invalid shape' }] } }] },
  ])('rejects unusable provider responses', async (body) => {
    fetchMock.mockResolvedValue(Response.json(body));
    await expect(generatePromptWithAI('stuck', 'creativity')).rejects.toThrow(
      'temporarily unavailable'
    );
  });

  it('reports timeout and configuration failures without leaking details', async () => {
    fetchMock.mockRejectedValue(new Error('sensitive transport details'));
    await expect(generatePromptWithAI('curious', 'creativity')).rejects.toThrow(
      'temporarily unavailable'
    );
    vi.stubEnv('OPENROUTER_API_KEY', '');
    fetchMock.mockClear();
    await expect(generatePromptWithAI('curious', 'creativity')).rejects.toThrow(
      'temporarily unavailable'
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
