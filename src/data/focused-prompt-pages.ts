import promptsData from '@/data/prompts.json';
import type { Prompt } from '@/lib/prompt-matcher';

export interface FocusedPromptPageConfig {
  slug: string;
  badge: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  primaryCta: string;
  secondaryCta: string;
  finderTitle: string;
  finderDescription: string;
  intro: { title: string; paragraphs: string[] };
  steps: string[];
  promptTitle: string;
  afterPrompts: { title: string; paragraphs: string[] };
  faqs: { question: string; answer: string }[];
  summary: string;
  prompts: Prompt[];
  promptScene?: string;
  defaultMood?: string;
  defaultDirection?: string;
}

const libraryById = new Map(
  (promptsData as Prompt[]).map((prompt) => [prompt.id, prompt])
);

function selectPrompts(ids: string[]): Prompt[] {
  return ids.map((id) => {
    const prompt = libraryById.get(id);
    if (!prompt) throw new Error(`Missing featured journal prompt: ${id}`);
    return prompt;
  });
}

// Keep the production IDs so existing journal entries stay associated with their prompts.
const couplesPrompts: Prompt[] = [
  'What moment from the past month made you feel closest to each other, and why?',
  'What is one small thing your partner does that makes your life easier, even if you rarely say it out loud?',
  'When do you feel most listened to in this relationship? What helps create that feeling?',
  'What topic is easiest for us to avoid, and what would a kinder conversation about it look like?',
  'What does support look like to you during a hard week?',
  'What habit would help this relationship feel calmer, safer, or more connected over the next month?',
  'What boundary helps you feel respected in our relationship?',
  'What is one unresolved tension that deserves a slower, more honest conversation?',
  'How have we changed since the beginning of this relationship, and what change feels healthiest?',
  'What does quality time mean to you now, not just what it meant when we first got together?',
  'What dream or goal would you love for us to plan together over the next year?',
  'What apology or repair attempt usually lands best with you when you are hurt?',
  'What makes you feel appreciated in ordinary daily life?',
  'What stress outside the relationship has been affecting how you show up inside it lately?',
  'What do you want more of in our communication: softness, clarity, directness, reassurance, or something else?',
  'What tradition would you love for us to create or bring back?',
  'What does forgiveness mean to you in a healthy relationship?',
  'What are we doing well as a team right now that we should notice more often?',
  'What would a healthy disagreement look like for us in practice?',
  'What do you admire about your partner right now, beyond the obvious things?',
  'What would make date night feel more restorative and less performative?',
  'What part of yourself do you most want your partner to understand better?',
  'What have we learned about love from this relationship that we did not know before?',
  'What would growing together over the next twelve months look like in concrete terms?',
].map((text, index) => ({
  id: `couples-${index + 1}`,
  text,
  mood: [],
  direction: ['relationships'],
  scene: 'couples',
  depth: 'medium',
  source: 'Created for shared reflection',
}));

export const focusedPromptPages: FocusedPromptPageConfig[] = [
  {
    slug: 'healing-journal-prompts',
    badge: 'Emotional Recovery Guide',
    h1: 'Healing Journal Prompts',
    metaTitle: 'Healing Journal Prompts for Emotional Recovery',
    metaDescription:
      'Explore healing journal prompts for stress, grief, burnout, and self-forgiveness. Use a focused prompt finder and a curated list of healing prompts to start writing with more clarity.',
    heroSubtitle:
      'Use healing journal prompts for stress, emotional recovery, burnout, grief, and self-forgiveness. This page is built to help you start gently, not force a dramatic breakthrough.',
    primaryCta: 'Try the Healing Prompt Finder',
    secondaryCta: 'Browse Healing Prompts',
    finderTitle: 'Use a Healing Journal Prompt That Fits Your Mood',
    finderDescription:
      'The problem with most healing journal prompt pages is volume without guidance. If you already feel tired, heavy, or emotionally raw, a giant list can make the page less useful. The prompt finder below narrows the next step so you can start writing without more mental friction.',
    intro: {
      title: 'What Makes Healing Journal Prompts Actually Helpful?',
      paragraphs: [
        'Helpful healing journal prompts do not pressure you to sound wise, grateful, or fully recovered. They give you a safe entry point into whatever feels unfinished right now. Sometimes that means naming a fear. Sometimes it means noticing a boundary you keep ignoring. Sometimes it means admitting that you are more tired than you have wanted to admit.',
        'A strong healing prompt usually does one of three things. It helps you describe your current state more clearly. It helps you separate what you can control from what you cannot. Or it helps you move from pure pain into a next step, even if that next step is just rest, honesty, or asking for support.',
        'That is why this page is narrower than a broad mental health page. The keyword is smaller, but the intent is sharper. People searching for healing journal prompts usually want relief, repair, and a way to process something heavy without making it worse.',
      ],
    },
    steps: [
      'Start with a prompt that matches your actual emotional state, not the one you wish you were in.',
      'Write for 5 to 15 minutes and stop before the session turns into self-attack or over-analysis.',
      'Name what hurts, but also ask what support, boundary, or kindness would help next.',
      'End with one grounding action such as water, a short walk, or a text to someone safe.',
    ],
    promptTitle: 'Healing Journal Prompts',
    afterPrompts: {
      title: 'When Healing Journal Prompts Work Better Than a Blank Page',
      paragraphs: [
        'Blank pages can feel freeing when your mind is calm. They are much less helpful when you are carrying grief, anxiety, resentment, or emotional fatigue. In those moments, the blank page often turns into hesitation, overthinking, or repetitive spiraling.',
        'Healing journal prompts reduce that friction by giving your attention a direction. Instead of asking yourself to solve everything, you can answer one true question. That smaller move is often what makes the difference between shutting down and actually processing something.',
      ],
    },
    faqs: [
      {
        question: 'What are healing journal prompts?',
        answer:
          'Healing journal prompts are reflection questions designed to help you process stress, grief, burnout, shame, or emotional exhaustion without staring at a blank page. Good healing prompts move you toward honesty, self-compassion, and a small sense of relief.',
      },
      {
        question: 'Are healing journal prompts the same as therapy?',
        answer:
          'No. Healing journal prompts can support self-reflection and emotional awareness, but they are not therapy or a substitute for clinical care. If your writing consistently leaves you flooded, numb, or unsafe, work with a licensed professional instead of pushing harder alone.',
      },
      {
        question: 'How often should I use healing journal prompts?',
        answer:
          'Two to four times per week is enough for most people. Healing writing works best when you give yourself enough space to process what comes up instead of forcing intensity every day.',
      },
      {
        question: 'What should I do if a healing prompt feels too intense?',
        answer:
          'Scale it down. Shorten the session, switch to body-based observations, or answer the prompt in bullet points. A useful healing prompt should feel honest, not emotionally punishing.',
      },
    ],
    summary:
      'A dedicated page for emotional recovery, self-forgiveness, stress, and burnout.',
    prompts: selectPrompts([
      'ment-001',
      'ment-002',
      'ment-003',
      'ment-004',
      'ment-005',
      'ment-006',
      'ment-007',
      'ment-008',
      'ment-009',
      'ment-010',
      'ment-011',
      'ment-012',
      'ment-013',
      'ment-014',
      'ment-015',
      'ment-016',
      'ment-017',
      'ment-018',
      'ment-019',
      'ment-020',
      'ment-021',
      'ment-022',
      'ment-023',
      'ment-024',
    ]),
    promptScene: 'mental-health',
    defaultMood: 'reflective',
    defaultDirection: 'healing',
  },
  {
    slug: '365-daily-journal-prompts',
    badge: 'Daily Writing Guide',
    h1: '365 Daily Journal Prompts',
    metaTitle: '365 Daily Journal Prompts for Year-Round Reflection',
    metaDescription:
      'Browse 365 daily journal prompts for reflection, clarity, and habit-building. Use the daily prompt finder or work through a year-round list without burning out.',
    heroSubtitle:
      'Build a year-round writing habit with 365 daily journal prompts for reflection, clarity, gratitude, self-awareness, and honest daily check-ins.',
    primaryCta: 'Get a Daily Prompt',
    secondaryCta: 'Browse the Prompt List',
    finderTitle: 'Use the Daily Prompt Finder Instead of Guessing',
    finderDescription:
      'The best 365 daily journal prompts are the ones you will actually answer today. The tool below narrows the prompt list based on mood and writing direction, so the page supports both habit-building and immediate action.',
    intro: {
      title: 'Do You Need 365 Completely Different Prompts?',
      paragraphs: [
        'Not really. Most people searching for 365 daily journal prompts are not asking for novelty at all costs. They are asking for enough structure to keep writing all year. That is a different problem, and it needs a different page.',
        'A sustainable daily journal practice usually rotates through a few useful prompt types: emotional check-ins, gratitude, lessons from the day, self-discovery questions, and intention-setting. The habit breaks when every day feels like homework. It lasts when the prompts stay varied enough to feel fresh and structured enough to feel easy.',
        'That is why this page mixes a curated list with a tool. You can work through daily prompts steadily, but you can also get a better-fit prompt on days when your energy, mood, or attention feel completely different from yesterday.',
      ],
    },
    steps: [
      'Choose a consistent time of day so the prompt becomes part of a routine instead of a decision.',
      'Write a short response before you judge whether the prompt is perfect for you.',
      'Rotate between reflection, gratitude, self-discovery, and planning so the habit stays fresh.',
      'If you miss a day, keep the streak in your head unbroken by returning the next time you can.',
    ],
    promptTitle: 'Daily Journal Prompts',
    afterPrompts: {
      title: 'What to Write About on Busy Days',
      paragraphs: [
        'Some days you will have time for a full page. Some days you will barely have time for three sentences. Both still count. A useful 365 daily journal prompts page should work for the version of you who is busy, distracted, tired, and still trying to keep the habit alive.',
        'On low-energy days, answer one concrete question: What am I feeling? What drained me? What helped? What do I want to carry into tomorrow? Those short entries add up. Over time they create the self-awareness most people are actually looking for when they search for 365 daily journal prompts.',
      ],
    },
    faqs: [
      {
        question: 'Do I really need 365 completely different journal prompts?',
        answer:
          'No. Most people do better with a strong rotation of useful prompt types than with forced novelty every day. A good 365 daily journal prompts page helps you build a habit, not chase perfect uniqueness.',
      },
      {
        question: 'What is the best time to use 365 daily journal prompts?',
        answer:
          'Morning and evening are the most common choices. Morning helps with focus and intention. Evening helps with reflection and emotional processing. The best time is the one you can repeat consistently.',
      },
      {
        question: 'How much should I write each day?',
        answer:
          'Five to ten minutes is enough. A steady journaling habit grows from low friction and repeatability, not from huge entries that exhaust you.',
      },
      {
        question: 'What if I miss a day?',
        answer:
          'Continue the next day without trying to make up for it. The goal of 365 daily journal prompts is rhythm, not perfection.',
      },
    ],
    summary:
      'A year-round daily journaling page built to support steady reflection without overwhelm.',
    prompts: selectPrompts([
      'dail-001',
      'dail-002',
      'dail-003',
      'dail-004',
      'dail-005',
      'dail-006',
      'dail-007',
      'dail-008',
      'dail-009',
      'dail-010',
      'dail-011',
      'dail-012',
      'dail-013',
      'dail-014',
      'dail-015',
      'dail-016',
      'dail-017',
      'dail-018',
      'dail-019',
      'dail-020',
      'dail-021',
      'dail-022',
      'dail-023',
      'dail-024',
    ]),
    promptScene: 'daily',
    defaultMood: 'reflective',
  },
  {
    slug: 'journal-prompt-generator',
    badge: 'Prompt Matching Tool',
    h1: 'Journal Prompt Generator',
    metaTitle: 'Journal Prompt Generator for Every Mood',
    metaDescription:
      'Use a journal prompt generator to get matched prompts for daily reflection, gratitude, self-discovery, creativity, and emotional processing without scrolling through giant lists.',
    heroSubtitle:
      'Use our journal prompt generator to get a writing prompt matched to your mood, not just another list you have to sort through yourself.',
    primaryCta: 'Start the Generator',
    secondaryCta: 'See Sample Prompts',
    finderTitle: 'Use the Journal Prompt Generator',
    finderDescription:
      'This tool is built for people who do not need more prompts in theory. They need a better way to get the right one in practice. If the blank page slows you down, the generator below is the shortest path from indecision to writing.',
    intro: {
      title: 'Why a Journal Prompt Generator Works Better Than a Static List',
      paragraphs: [
        'A static list treats every journaling session as if it were the same problem. It is not. A person who feels grateful needs a different prompt than someone who feels restless, emotionally flat, or stuck in their head. That difference is exactly why a journal prompt generator can outperform a giant list.',
        'The generator reduces options before you ever begin writing. That matters because journaling friction often comes from choosing, not from writing. Once the choice becomes smaller, most people start faster, write longer, and abandon fewer sessions halfway through.',
        'It also makes the page useful across multiple intents. You can use the same tool for daily journaling, emotional processing, gratitude, self-discovery, creativity, or relationship reflection, while still getting a prompt that feels specific.',
      ],
    },
    steps: [],
    promptTitle: 'Sample Journal Prompts',
    afterPrompts: {
      title: 'Who This Journal Prompt Generator Is Best For',
      paragraphs: [
        'This page is especially useful for beginners, people returning to journaling after a long gap, and anyone who gets blocked by having too many choices. It is also useful if you already know journaling helps you but you do not want to spend ten minutes browsing prompts before the real writing starts.',
        'In practice, that means the generator works for a surprisingly wide range of sessions: five-minute check-ins, reflective morning pages, gratitude writing, relationship journaling, and honest mental health processing. The page is narrow in keyword targeting, but broad in usefulness.',
      ],
    },
    faqs: [
      {
        question: 'What is a journal prompt generator?',
        answer:
          'A journal prompt generator is a tool that helps you get a relevant prompt quickly instead of searching through a long static list. The best generators narrow the prompt based on mood, focus, or the kind of writing session you want.',
      },
      {
        question:
          'How is a journal prompt generator different from a random prompt list?',
        answer:
          'A static list gives you volume. A journal prompt generator gives you direction. When you feel anxious, tired, curious, or emotionally blocked, the right prompt matters more than the biggest prompt library.',
      },
      {
        question:
          'Can I use this journal prompt generator for daily journaling?',
        answer:
          'Yes. It works well for daily reflection, gratitude, self-discovery, mental health journaling, and getting unstuck when you do not know what to write.',
      },
      {
        question: 'Is this journal prompt generator free?',
        answer:
          'Yes. You can use the tool and the built-in writing flow for free.',
      },
    ],
    summary:
      'A focused generator page for people who want a matched prompt instead of another giant list.',
    prompts: selectPrompts([
      'dail-001',
      'dail-002',
      'dail-003',
      'grat-001',
      'grat-002',
      'grat-003',
      'disc-001',
      'disc-002',
      'disc-003',
      'ment-001',
      'ment-002',
      'ment-003',
      'fun-001',
      'fun-002',
      'fun-003',
      'morn-001',
      'morn-002',
      'morn-003',
    ]),
  },
  {
    slug: 'couples-journal-prompts',
    badge: 'Relationship Writing Guide',
    h1: 'Couples Journal Prompts',
    metaTitle: 'Couples Journal Prompts for Better Conversations',
    metaDescription:
      'Use couples journal prompts to deepen connection, improve communication, and reflect on conflict, appreciation, and future plans together.',
    heroSubtitle:
      'Use couples journal prompts for deeper conversations, clearer communication, more appreciation, and healthier conflict repair.',
    primaryCta: 'Match a Relationship Prompt',
    secondaryCta: 'Browse Couples Prompts',
    finderTitle: 'Start With a Relationship Prompt That Fits the Moment',
    finderDescription:
      'Some couples need a gratitude question. Others need a repair question, a future-planning question, or a gentler way into a hard conversation. The prompt finder below is useful when you want a relationship prompt matched to your mood before you move into the longer list.',
    intro: {
      title: 'How Couples Journal Prompts Improve Communication',
      paragraphs: [
        'Couples journal prompts work because they slow things down. When a question is on the page, both people can think before reacting. That makes it easier to notice what you actually feel, what you are assuming, and what you want to say with more care.',
        'They are especially useful when conversations tend to loop. A good prompt creates a narrower target: appreciation, conflict repair, future planning, emotional needs, boundaries, or shared routines. Narrower questions often lead to better answers than broad talks about the relationship in general.',
        'This page is therefore built as a dedicated couples journal prompts page instead of a generic relationships paragraph buried inside a broader prompt hub. The intent is specific, and the page should be specific too.',
      ],
    },
    steps: [
      'Choose one prompt at a time and decide whether you want to answer it together or separately first.',
      'Write without interrupting or defending yourself while the other person is still reflecting.',
      'Share only what feels honest and useful, not what sounds smartest or most polished.',
      'End with one concrete takeaway: a repair, a boundary, a plan, or simple appreciation.',
    ],
    promptTitle: 'Couples Journal Prompts',
    afterPrompts: {
      title: 'When to Journal Together and When to Journal Separately',
      paragraphs: [
        'If the prompt feels light, hopeful, or future-focused, journaling together can be energizing. It builds momentum and can turn into one of the easiest rituals in the relationship. If the prompt touches a sore point, it is often smarter to write separately first and share only after each person has had time to get honest on paper.',
        'That balance matters. Couples journal prompts should create clarity, not pressure. The healthiest use of them is not to win an argument or force closeness on demand, but to make better conversations more likely over time.',
      ],
    },
    faqs: [
      {
        question: 'How do couples use journal prompts together?',
        answer:
          'Some couples answer the same prompt separately and then share. Others answer one prompt out loud in a weekly check-in. The best format is the one that creates honesty without making either person feel cornered.',
      },
      {
        question: 'Should we journal together or alone first?',
        answer:
          'If the topic feels sensitive, write alone first and share later. If the topic feels light or playful, journaling together can create momentum and connection right away.',
      },
      {
        question: 'How often should couples use journal prompts?',
        answer:
          'Once a week is enough for most couples. The value comes from consistency and quality of conversation, not from turning the practice into another task.',
      },
      {
        question: 'Can couples journal prompts help during conflict?',
        answer:
          'They can help slow a conversation down and make each person more reflective before reacting. They are useful for communication, but they are not a substitute for therapy if the relationship feels persistently unsafe or stuck.',
      },
    ],
    summary:
      'A relationship-focused page for connection, honest conversations, and shared reflection.',
    prompts: couplesPrompts,
    defaultMood: 'reflective',
    defaultDirection: 'relationships',
  },
];
