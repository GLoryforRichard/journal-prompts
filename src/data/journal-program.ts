import { type Prompt, getReviewedPromptsByScene } from '@/lib/prompt-matcher';

// Preserve existing prompt IDs so previously saved writing remains discoverable.
const originalCollection = getReviewedPromptsByScene;

const lookingBack = [
  'What did you make time for this month that you want to keep making time for?',
  'Which ordinary day from this month would you like to remember in a year?',
  'What did you learn by changing your mind recently?',
  'Which expectation did you quietly outgrow this month?',
  'What did you handle with more patience than you would have a year ago?',
  'What unfinished task can you consciously put aside for now?',
  'Which small routine made a difficult week easier?',
  'What did you enjoy even though you were not especially good at it?',
  'What feedback helped you see a situation differently?',
  'What is something you said no to that gave you room for something better?',
  'What would a friend notice about how you have changed this year?',
  'Which recent purchase or commitment was worth the resources it took?',
  'What has been taking more energy than you expected?',
  'What did you try this month that you would like to try again?',
  'Which conversation helped you feel understood?',
  'What did you stop doing, and what changed as a result?',
  'What are you glad you did slowly?',
  'What part of your week felt most like your own choice?',
  'What did an imperfect attempt teach you that planning could not?',
  'What is one detail of your current home you want to remember?',
  'When did you notice yourself comparing less and participating more?',
  'Which idea from a book, conversation, or experience stayed with you?',
  'What did you do this month without waiting to feel ready?',
  'What form of rest actually left you feeling rested?',
  'What responsibility are you carrying that someone could help with?',
  'Which moment would you include in a short letter about your year?',
  'What do you understand about your needs now that you did not before?',
  'What has stayed meaningful even as your circumstances changed?',
  'What could you celebrate without measuring it against someone else?',
  'Which of your past entries would you like to answer again today?',
  'What would you name this chapter of your life, and why?',
];

const lookingAhead = [
  'What would make tomorrow feel manageable, even if it is not perfect?',
  'What is one thing you want to experience more often in the next month?',
  'Which goal is truly yours, and which one are you ready to reconsider?',
  'What is the smallest next step toward something you keep postponing?',
  'What would you like to learn without needing to turn it into an achievement?',
  'What can you prepare tonight to be kind to yourself tomorrow?',
  'What would a sustainable version of your current ambition look like?',
  'Who would you like to spend unhurried time with soon?',
  'What boundary would protect the time you want to spend writing?',
  'What would you like your weekends to feel like?',
  'Which unfinished conversation could you approach with more curiosity?',
  'What is a reasonable promise you can make to yourself this week?',
  'What will you do when your next plan needs to change?',
  'How would you recognize progress before you reach the final outcome?',
  'What do you want to keep simple in the coming season?',
  'Where could you ask for a clearer explanation instead of guessing?',
  'What new place nearby would you like to explore?',
  'What would you try if learning were the only expected result?',
  'How could you make space for both work and something you enjoy?',
  'What is one ordinary ritual you would like to share with someone?',
  'What could you remove from your schedule before adding another goal?',
  'What kind of encouragement would help you on a slow day?',
  'What would you like to notice more closely on your next walk?',
  'What practical support would make a change easier to maintain?',
  'What are you willing to do imperfectly in order to begin?',
  'How will you know when you need a break from a demanding project?',
  'Which personal value could guide one decision this week?',
  'What do you want to protect as life gets busier?',
  'What question would you like to ask your future self?',
  'What would enough look like for you this month?',
  'How can you leave room for surprise in a plan you care about?',
  'What is one way to return to journaling after a missed day?',
  'What do you hope your next year of writing helps you remember?',
  'Write a short welcome to the next chapter of your journal.',
];

function reflectionPrompts(texts: string[], group: string): Prompt[] {
  return texts.map((text, index) => ({
    id: `year-${group}-${String(index + 1).padStart(3, '0')}`,
    text,
    mood: ['reflective', 'curious'],
    direction: ['self-discovery', 'goal-setting'],
    scene: 'daily',
    depth: 'medium',
    source: '',
  }));
}

export const journalProgram = [
  {
    title: 'Everyday check-ins',
    description: 'Start with the day in front of you.',
    prompts: originalCollection('daily'),
  },
  {
    title: 'Notice what you appreciate',
    description: 'Make room for specific moments of gratitude.',
    prompts: originalCollection('gratitude'),
  },
  {
    title: 'Get to know yourself',
    description: 'Explore what matters to you and why.',
    prompts: originalCollection('self-discovery'),
  },
  {
    title: 'Be kinder to yourself',
    description: 'Practice writing with less judgment.',
    prompts: originalCollection('self-love'),
  },
  {
    title: 'Pay attention to the present',
    description: 'Notice your surroundings and everyday experiences.',
    prompts: originalCollection('mindfulness'),
  },
  {
    title: 'Begin with intention',
    description: 'Think about how you want to spend your time.',
    prompts: originalCollection('morning'),
  },
  {
    title: 'Make room for play',
    description: 'Try a lighter, more imaginative writing session.',
    prompts: originalCollection('fun'),
  },
  {
    title: 'Check in with your feelings',
    description: 'Name what is happening without needing to solve everything.',
    prompts: originalCollection('mental-health'),
  },
  {
    title: 'Explore your patterns',
    description:
      'Approach recurring reactions with curiosity. Skip anything that feels too intense.',
    prompts: originalCollection('shadow-work'),
  },
  {
    title: 'Reflect on the bigger picture',
    description: 'Consider meaning, change, and the stories you tell yourself.',
    prompts: originalCollection('deep'),
  },
  {
    title: 'Look back with perspective',
    description: 'Notice small changes and experiences worth remembering.',
    prompts: reflectionPrompts(lookingBack, 'reflection'),
  },
  {
    title: 'Make space for what comes next',
    description: 'Choose a realistic next step without demanding perfection.',
    prompts: reflectionPrompts(lookingAhead, 'intention'),
  },
];

export const yearOfPrompts = journalProgram.flatMap(
  (chapter) => chapter.prompts
);
