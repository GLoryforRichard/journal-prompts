'use client';

import { wobblyBorderRadius } from '@/lib/design-tokens';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface SceneFAQProps {
  faqs: FAQItem[];
}

function FAQAccordionItem({ faq }: { faq: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b-2 border-dashed border-[#e5e0d8] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left cursor-pointer group"
      >
        <h3
          className="text-lg font-bold pr-4"
          style={{ fontFamily: 'var(--font-hand-title)', color: '#2d2d2d' }}
        >
          {faq.question}
        </h3>
        <ChevronDownIcon
          size={20}
          strokeWidth={2.5}
          className={`flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          style={{ color: '#ff4d4d' }}
        />
      </button>
      {open && (
        <p
          className="pb-4 text-base leading-relaxed"
          style={{ fontFamily: 'var(--font-hand-body)', color: '#2d2d2d', opacity: 0.85 }}
        >
          {faq.answer}
        </p>
      )}
    </div>
  );
}

export function SceneFAQ({ faqs }: SceneFAQProps) {
  return (
    <section className="py-12 px-4" id="faqs">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-8"
          style={{
            fontFamily: 'var(--font-hand-title)',
            color: '#2d2d2d',
          }}
        >
          Frequently Asked Questions
        </h2>
        <div
          className="p-6"
          style={{
            backgroundColor: '#ffffff',
            border: '2px solid #2d2d2d',
            borderRadius: wobblyBorderRadius.lg,
            boxShadow: '4px 4px 0px 0px #2d2d2d',
          }}
        >
          {faqs.map((faq, i) => (
            <FAQAccordionItem key={i} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
