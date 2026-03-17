'use client';

import { wobblyBorderRadius } from '@/lib/design-tokens';
import type { Prompt } from '@/lib/prompt-matcher';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

interface FeaturedPromptsProps {
  prompts: Prompt[];
  sceneTitle: string;
}

function PromptItem({ prompt, index }: { prompt: Prompt; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [text, setText] = useState('');

  return (
    <li className="border-b-2 border-dashed border-[#e5e0d8] last:border-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 py-4 text-left cursor-pointer group"
        style={{ fontFamily: 'var(--font-hand-body)' }}
      >
        <span
          className="flex-shrink-0 text-sm font-bold mt-0.5"
          style={{
            fontFamily: 'var(--font-hand-title)',
            color: '#ff4d4d',
          }}
        >
          {index + 1}.
        </span>
        <span className="flex-1 text-lg">{prompt.text}</span>
        <ChevronDownIcon
          size={18}
          className={`flex-shrink-0 mt-1 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          style={{ color: '#2d5da1' }}
          strokeWidth={2.5}
        />
      </button>
      {expanded && (
        <div className="pb-4 pl-8 space-y-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start writing your response..."
            className="w-full min-h-[120px] p-3 outline-none resize-y"
            style={{
              fontFamily: 'var(--font-hand-body)',
              backgroundColor: '#ffffff',
              border: '2px solid #e5e0d8',
              borderRadius: wobblyBorderRadius.sm,
              backgroundImage:
                'repeating-linear-gradient(transparent, transparent 27px, #e5e0d8 28px)',
              backgroundPosition: '0 8px',
              fontSize: '1rem',
              lineHeight: '1.75rem',
              color: '#2d2d2d',
            }}
          />
          {prompt.source && (
            <p className="text-xs italic opacity-50" style={{ fontFamily: 'var(--font-hand-body)' }}>
              {prompt.source}
            </p>
          )}
        </div>
      )}
    </li>
  );
}

export function FeaturedPrompts({ prompts, sceneTitle }: FeaturedPromptsProps) {
  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{
            fontFamily: 'var(--font-hand-title)',
            color: '#2d2d2d',
          }}
        >
          {prompts.length} {sceneTitle}
        </h2>
        <p
          className="text-lg mb-8 opacity-70"
          style={{ fontFamily: 'var(--font-hand-body)' }}
        >
          Click any prompt to start writing right here on the page.
        </p>
        <div
          className="p-6"
          style={{
            backgroundColor: '#ffffff',
            border: '2px solid #2d2d2d',
            borderRadius: wobblyBorderRadius.lg,
            boxShadow: '4px 4px 0px 0px #2d2d2d',
          }}
        >
          <ol className="list-none">
            {prompts.map((prompt, i) => (
              <PromptItem key={prompt.id} prompt={prompt} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
