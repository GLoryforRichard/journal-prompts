'use client';

import { sceneIconMap, moodIconMap } from '@/data/icon-map';
import { RoughIcon } from './rough-icon';

interface SceneIconProps {
  slug: string;
  size?: number;
  color?: string;
}

export function SceneIcon({ slug, size = 24, color = '#2d2d2d' }: SceneIconProps) {
  const icon = sceneIconMap[slug];
  if (!icon) return null;
  return <RoughIcon icon={icon} size={size} color={color} />;
}

interface MoodIconProps {
  mood: string;
  size?: number;
  color?: string;
}

export function MoodIcon({ mood, size = 24, color = '#2d2d2d' }: MoodIconProps) {
  const icon = moodIconMap[mood];
  if (!icon) return null;
  return <RoughIcon icon={icon} size={size} color={color} />;
}
