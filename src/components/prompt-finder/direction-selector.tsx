'use client';

import { wobblyBorderRadius } from '@/lib/design-tokens';
import {
  CompassIcon,
  HeartIcon,
  SparklesIcon,
  TargetIcon,
  UsersIcon,
  HandHeartIcon,
} from 'lucide-react';

const directions = [
  {
    id: 'self-discovery',
    icon: CompassIcon,
    label: 'Self-Discovery',
    description: 'Explore who you truly are',
  },
  {
    id: 'gratitude',
    icon: HeartIcon,
    label: 'Gratitude',
    description: 'Appreciate the good in your life',
  },
  {
    id: 'healing',
    icon: HandHeartIcon,
    label: 'Healing',
    description: 'Process and release difficult feelings',
  },
  {
    id: 'creativity',
    icon: SparklesIcon,
    label: 'Creativity',
    description: 'Unlock your imagination',
  },
  {
    id: 'goal-setting',
    icon: TargetIcon,
    label: 'Goal Setting',
    description: 'Clarify your vision and plans',
  },
  {
    id: 'relationships',
    icon: UsersIcon,
    label: 'Relationships',
    description: 'Reflect on your connections',
  },
] as const;

interface DirectionSelectorProps {
  onSelect: (direction: string) => void;
  selected?: string;
  onBack: () => void;
}

export function DirectionSelector({ onSelect, selected, onBack }: DirectionSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="text-sm underline decoration-wavy decoration-[#2d5da1] underline-offset-4 cursor-pointer"
          style={{ fontFamily: 'var(--font-hand-body)', color: '#2d5da1' }}
        >
          ← Back
        </button>
        <h2
          className="text-2xl md:text-3xl flex-1 text-center"
          style={{ fontFamily: 'var(--font-hand-title)' }}
        >
          What would you like to explore?
        </h2>
        <div className="w-12" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {directions.map((dir) => {
          const Icon = dir.icon;
          const isSelected = selected === dir.id;
          return (
            <button
              key={dir.id}
              onClick={() => onSelect(dir.id)}
              className="group relative p-5 transition-all duration-200 cursor-pointer text-left"
              style={{
                backgroundColor: isSelected ? '#2d5da1' : '#ffffff',
                color: isSelected ? '#ffffff' : '#2d2d2d',
                borderRadius: wobblyBorderRadius.md,
                boxShadow: isSelected
                  ? '2px 2px 0px 0px #2d2d2d'
                  : '4px 4px 0px 0px #2d2d2d',
                border: '2px solid #2d2d2d',
                fontFamily: 'var(--font-hand-body)',
              }}
            >
              {/* Pin decoration */}
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#2d2d2d]"
                style={{ backgroundColor: '#ff4d4d' }}
              />
              <Icon
                className="mb-2"
                size={28}
                strokeWidth={2.5}
                style={{ color: isSelected ? '#ffffff' : '#2d5da1' }}
              />
              <div
                className="text-lg font-bold"
                style={{ fontFamily: 'var(--font-hand-title)' }}
              >
                {dir.label}
              </div>
              <div className="text-sm opacity-80">{dir.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
