'use client';

import { trackFunnelEvent } from '@/lib/analytics';
import {
  createContext,
  useContext,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react';

const DailyWritingContext = createContext<{
  writing: boolean;
  setWriting: (writing: boolean) => void;
} | null>(null);

export function DailyWritingProvider({ children }: { children: ReactNode }) {
  const [writing, setWriting] = useState(false);
  return (
    <DailyWritingContext.Provider value={{ writing, setWriting }}>
      {children}
    </DailyWritingContext.Provider>
  );
}

export function useDailyWriting() {
  return useContext(DailyWritingContext);
}

export function StartDailyWritingLink(props: ComponentProps<'a'>) {
  const daily = useDailyWriting();
  return (
    <a
      {...props}
      href="#today"
      onClick={() => {
        if (!daily || daily.writing) return;
        trackFunnelEvent('prompt_selected', {
          source: 'scene',
          prompt_kind: 'curated',
        });
        daily.setWriting(true);
      }}
    />
  );
}
