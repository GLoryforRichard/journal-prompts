import {
  Heart,
  Brain,
  Moon,
  Smile,
  PenLine,
  Target,
  Compass,
  HeartHandshake,
  Flower2,
  Sunrise,
  Palette,
  Waves,
  BookOpen,
  GraduationCap,
  CloudRain,
  Pause,
  Lightbulb,
  Zap,
  Eye,
  Wind,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/** Maps scene slugs to Lucide icons for the hand-drawn rendering */
export const sceneIconMap: Record<string, LucideIcon> = {
  'gratitude-journal-prompts': Heart,
  'journal-prompts-for-mental-health': Brain,
  'shadow-work-journal-prompts': Moon,
  'journal-prompts-for-kids': Smile,
  'daily-journal-prompts': PenLine,
  'journal-prompts-for-teens': Target,
  'self-discovery-journal-prompts': Compass,
  'self-love-journal-prompts': HeartHandshake,
  'mindfulness-journal-prompts': Flower2,
  'morning-journal-prompts': Sunrise,
  'fun-journal-prompts': Palette,
  'deep-journal-prompts': Waves,
  'journal-prompts-for-middle-school': BookOpen,
  'journal-prompts-for-high-school': GraduationCap,
};

/** Maps mood IDs to Lucide icons for the hand-drawn rendering */
export const moodIconMap: Record<string, LucideIcon> = {
  anxious: CloudRain,
  grateful: Heart,
  stuck: Pause,
  curious: Lightbulb,
  sad: CloudRain,
  energized: Zap,
  reflective: Eye,
  restless: Wind,
};
