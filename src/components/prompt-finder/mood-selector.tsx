'use client';

import { MoodIcon } from '@/components/ui/scene-icon';
import { wobblyBorderRadius } from '@/lib/design-tokens';

const moods = [
  { id: 'anxious', label: 'Anxious', description: 'Feeling worried or uneasy' },
  { id: 'grateful', label: 'Grateful', description: 'Feeling thankful and appreciative' },
  { id: 'stuck', label: 'Stuck', description: 'Feeling blocked or unmotivated' },
  { id: 'curious', label: 'Curious', description: 'Wanting to explore and learn' },
  { id: 'sad', label: 'Sad', description: 'Feeling down or melancholy' },
  { id: 'energized', label: 'Energized', description: 'Feeling motivated and alive' },
  { id: 'reflective', label: 'Reflective', description: 'In a thoughtful, introspective mood' },
  { id: 'restless', label: 'Restless', description: 'Feeling unsettled or antsy' },
] as const;

interface MoodSelectorProps {
  onSelect: (mood: string) => void;
  selected?: string;
}

export function MoodSelector({ onSelect, selected }: MoodSelectorProps) {
  return (
    <div className="space-y-6">
      <h2
        className="text-2xl md:text-3xl text-center"
        style={{ fontFamily: 'var(--font-hand-title)' }}
      >
        How are you feeling right now?
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {moods.map((mood, index) => {
          const rotation = ['-1.5deg', '1deg', '-0.5deg', '1.5deg', '0.5deg', '-1deg', '2deg', '-2deg'][index];
          const isSelected = selected === mood.id;
          return (
            <button
              key={mood.id}
              onClick={() => onSelect(mood.id)}
              className="group relative p-4 transition-all duration-200 cursor-pointer text-left"
              style={{
                backgroundColor: isSelected ? '#ff4d4d' : '#fff9c4',
                color: isSelected ? '#fff' : '#2d2d2d',
                borderRadius: wobblyBorderRadius.sm,
                boxShadow: isSelected
                  ? '2px 2px 0px 0px #2d2d2d'
                  : '4px 4px 0px 0px #2d2d2d',
                border: '2px solid #2d2d2d',
                transform: `rotate(${rotation})`,
                fontFamily: 'var(--font-hand-body)',
              }}
            >
              <div className="mb-2 group-hover:scale-110 transition-transform">
                <MoodIcon
                  mood={mood.id}
                  size={32}
                  color={isSelected ? '#fff' : '#2d2d2d'}
                />
              </div>
              <div
                className="text-lg font-bold"
                style={{ fontFamily: 'var(--font-hand-title)' }}
              >
                {mood.label}
              </div>
              <div className="text-sm opacity-80">{mood.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
