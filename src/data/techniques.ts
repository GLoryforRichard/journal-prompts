export interface TechniqueConfig {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  emoji: string;
  timePerSession: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  bestFor: string[];
  whatIs: {
    title: string;
    paragraphs: string[];
  };
  howTo: {
    title: string;
    steps: { step: string; detail: string }[];
  };
  commonMistakes: {
    title: string;
    items: { mistake: string; fix: string }[];
  };
  whyItWorks: {
    title: string;
    paragraphs: string[];
    psychologySource: string;
  };
  faqs: { question: string; answer: string }[];
  relatedTechniques: string[];
  relatedScenes: string[];
}

export const techniques: TechniqueConfig[] = [
  {
    slug: 'free-writing',
    title: 'Free Writing',
    h1: 'Free Writing Journaling Technique',
    metaTitle: 'Free Writing Journaling Technique: A Complete Guide | JournalPrompts',
    metaDescription:
      'Learn the free writing journaling technique — write without stopping, editing, or judging. Unlock creativity, reduce anxiety, and discover hidden thoughts.',
    heroSubtitle:
      'Write without stopping, editing, or judging. Let your thoughts flow freely onto the page and discover what your mind truly wants to say.',
    emoji: '✍️',
    timePerSession: '10-20 min',
    difficulty: 'beginner',
    bestFor: ['Overcoming blank page anxiety', 'Discovering hidden thoughts', 'Reducing stress', 'Boosting creativity'],
    whatIs: {
      title: 'What Is Free Writing?',
      paragraphs: [
        'Free writing is a journaling technique where you write continuously for a set period without worrying about grammar, spelling, punctuation, or topic. The only rule is: don\'t stop writing. If you run out of things to say, write "I don\'t know what to write" until something comes.',
        'Popularized by writing teacher Peter Elbow in the 1970s, free writing bypasses the inner critic that causes blank page anxiety. By removing the pressure to write "well," you create space for authentic self-expression and unexpected insights.',
        'Free writing is different from other journaling techniques because it has almost no structure. Unlike the 5-minute journal (which uses fixed prompts) or CBT journaling (which follows a thought-record format), free writing gives you total freedom. There are no rules about what to write, how to organize it, or what tone to use. This makes it the most flexible journaling method available — and paradoxically, the most powerful for people who feel stuck or blocked.',
        'Many professional writers, therapists, and coaches use free writing as a warm-up exercise or a problem-solving tool. Julia Cameron\'s "Morning Pages" technique is essentially a structured form of free writing. Natalie Goldberg\'s "Writing Down the Bones" is built entirely on the free writing philosophy. The technique has stood the test of time because it works across cultures, ages, and experience levels.',
      ],
    },
    howTo: {
      title: 'How to Practice Free Writing',
      steps: [
        { step: 'Set a timer', detail: 'Start with 10 minutes. You can increase to 15-20 minutes as you get comfortable.' },
        { step: 'Choose your medium', detail: 'Pen and paper works best for most people, but a computer is fine too. Just pick one and stick with it.' },
        { step: 'Start writing — anything', detail: 'Write whatever comes to mind. It doesn\'t need to make sense. "I\'m sitting here writing and I don\'t know what to say..." is a perfectly valid start.' },
        { step: 'Don\'t stop, don\'t edit', detail: 'Keep your hand moving. No crossing out, no backspacing, no re-reading. Let the words flow.' },
        { step: 'When the timer goes off, stop', detail: 'You can re-read what you wrote or close the notebook. Some people find insights; others just feel lighter. Both are valid.' },
      ],
    },
    commonMistakes: {
      title: 'Common Mistakes & How to Fix Them',
      items: [
        { mistake: 'Trying to write something "good"', fix: 'Free writing is not about quality. It\'s about flow. Remind yourself: nobody will ever read this.' },
        { mistake: 'Stopping to think', fix: 'If you pause, write "I\'m pausing because..." and keep going. The goal is continuous movement.' },
        { mistake: 'Re-reading while writing', fix: 'Cover previous lines with your hand, or turn the screen brightness down. Focus only on the current word.' },
        { mistake: 'Doing it too rarely', fix: 'Free writing works best as a daily practice. Even 5 minutes each morning builds the habit.' },
      ],
    },
    whyItWorks: {
      title: 'Why Free Writing Works',
      paragraphs: [
        'Free writing works by disabling the prefrontal cortex\'s "editing" function, allowing thoughts from deeper brain regions to surface. This is why free writing often reveals emotions, ideas, and connections you didn\'t know you had.',
        'Research by Dr. James Pennebaker at the University of Texas shows that expressive writing — including free writing — can reduce anxiety, improve mood, and even boost immune function. Participants who wrote freely about their feelings for just 15-20 minutes over 3-4 days showed measurable improvements in both mental and physical health.',
        'Neuroscience research suggests that the continuous motor activity of writing without pausing keeps the brain in a "flow state" — similar to what athletes experience during peak performance. In this state, the default mode network (responsible for self-reflection and creativity) becomes more active, while the task-positive network (responsible for judgment and self-criticism) quiets down. The result is writing that is more honest, more creative, and often more therapeutic than anything you could produce by trying hard.',
      ],
      psychologySource:
        'Based on research by Dr. James Pennebaker (University of Texas) on expressive writing, and Peter Elbow\'s "Writing Without Teachers" methodology.',
    },
    faqs: [
      {
        question: 'How long should a free writing session be?',
        answer: 'Start with 10 minutes and work up to 15-20 minutes. Even 5 minutes is beneficial if you\'re short on time. The key is consistency, not length.',
      },
      {
        question: 'What if I write the same thing every day?',
        answer: 'That\'s completely normal and actually useful. Repetitive themes in free writing often point to unresolved feelings or important priorities. Pay attention to what keeps coming up.',
      },
      {
        question: 'Is free writing the same as stream of consciousness?',
        answer: 'They\'re very similar. Stream of consciousness aims to capture the raw flow of your thoughts exactly as they occur, while free writing is slightly more structured — you can start with a topic or prompt. Both techniques share the core principle of writing without stopping or editing.',
      },
      {
        question: 'Should I re-read my free writing?',
        answer: 'It\'s optional. Some people find valuable insights by re-reading; others use free writing purely as a release. Try both approaches and see what works for you.',
      },
      {
        question: 'Can I free write on a computer?',
        answer: 'Yes, though many practitioners prefer pen and paper because the slower pace feels more connected. If you type, try turning off spell-check and autocorrect to avoid the urge to fix things.',
      },
    ],
    relatedTechniques: ['morning-pages', 'stream-of-consciousness', 'expressive-writing'],
    relatedScenes: ['deep-journal-prompts', 'journal-prompts-for-mental-health', 'self-discovery-journal-prompts'],
  },
  {
    slug: 'gratitude-journaling',
    title: 'Gratitude Journaling',
    h1: 'Gratitude Journaling Technique',
    metaTitle: 'Gratitude Journaling Technique: Science-Backed Guide | JournalPrompts',
    metaDescription:
      'Master the gratitude journaling technique backed by positive psychology. Learn how writing 3 specific things you\'re grateful for can rewire your brain for happiness.',
    heroSubtitle:
      'Rewire your brain for positivity by regularly noticing and recording what you\'re thankful for. One of the most researched and effective journaling methods.',
    emoji: '🙏',
    timePerSession: '5-10 min',
    difficulty: 'beginner',
    bestFor: ['Improving mood and happiness', 'Better sleep quality', 'Reducing negative thinking', 'Building resilience'],
    whatIs: {
      title: 'What Is Gratitude Journaling?',
      paragraphs: [
        'Gratitude journaling is the practice of regularly writing down things you\'re thankful for. Unlike a general diary, a gratitude journal specifically focuses on the positive aspects of your life — from major blessings to small everyday moments.',
        'The technique is rooted in positive psychology research by Dr. Robert Emmons, who found that people who practice gratitude journaling consistently report higher levels of well-being, optimism, and life satisfaction. The most effective approach goes beyond simple lists: writing about why something matters to you and how it made you feel.',
      ],
    },
    howTo: {
      title: 'How to Practice Gratitude Journaling',
      steps: [
        { step: 'Pick a consistent time', detail: 'Evening works best for most people — it lets you reflect on the day. Morning works too if you prefer starting with positivity.' },
        { step: 'Write 3 specific things', detail: 'Don\'t write "I\'m grateful for my family." Instead write "I\'m grateful that Mom called to check on me today — it reminded me someone cares."' },
        { step: 'Include the "why"', detail: 'For each item, add a sentence about why it matters to you. This deepens the emotional impact and rewires neural pathways more effectively.' },
        { step: 'Vary your entries', detail: 'Challenge yourself to find new things each day. This trains your brain to actively scan for positive moments throughout the day.' },
        { step: 'Be consistent, not perfect', detail: '3-4 times per week is enough to see benefits. Don\'t let perfectionism stop you from writing.' },
      ],
    },
    commonMistakes: {
      title: 'Common Mistakes & How to Fix Them',
      items: [
        { mistake: 'Being too vague ("grateful for health")', fix: 'Get specific: "Grateful I could run 2 miles today without knee pain." Specificity is what makes gratitude journaling work.' },
        { mistake: 'Writing the same things every day', fix: 'Set a rule: no repeats for 2 weeks. This forces you to notice new positive things, which is where the real benefit comes from.' },
        { mistake: 'Forcing gratitude when you\'re struggling', fix: 'It\'s okay to write "Today was hard, but I\'m grateful the day is over." Acknowledge reality while finding one small anchor.' },
        { mistake: 'Treating it as a checklist', fix: 'Slow down. One deeply felt entry is more powerful than five surface-level ones.' },
      ],
    },
    whyItWorks: {
      title: 'Why Gratitude Journaling Works',
      paragraphs: [
        'Gratitude journaling works by shifting your brain\'s attentional bias. Our brains have a negativity bias — we naturally focus on threats and problems. Regular gratitude practice literally rewires this pattern, strengthening neural pathways associated with positive thinking.',
        'Dr. Robert Emmons\' landmark research at UC Davis found that participants who kept gratitude journals for just 10 weeks reported 25% greater well-being, exercised 1.5 hours more per week, and fell asleep faster. Brain imaging studies show that gratitude activates the hypothalamus and ventral tegmental area, producing dopamine and serotonin.',
      ],
      psychologySource:
        'Based on Dr. Robert Emmons\' gratitude research at UC Davis, and Martin Seligman\'s positive psychology interventions at the University of Pennsylvania.',
    },
    faqs: [
      {
        question: 'How often should I do gratitude journaling?',
        answer: 'Research suggests 3-4 times per week is optimal. Daily practice works too, but studies show that writing every other day can actually prevent it from feeling like a chore, keeping the emotional impact fresh.',
      },
      {
        question: 'What if I can\'t think of anything to be grateful for?',
        answer: 'Start with the basics: clean water, a roof, the ability to read. Then work outward — a kind word from someone, a beautiful sky, a meal you enjoyed. Gratitude is a muscle; it gets stronger with use.',
      },
      {
        question: 'Is it better to write in the morning or evening?',
        answer: 'Evening is slightly better supported by research because you can reflect on the day\'s events. However, morning gratitude can set a positive tone for the day ahead. Try both and see what feels right.',
      },
      {
        question: 'Can gratitude journaling help with depression?',
        answer: 'Studies show gratitude journaling can complement treatment for mild to moderate depression. However, it\'s not a substitute for professional help. If you\'re experiencing clinical depression, please consult a mental health professional.',
      },
    ],
    relatedTechniques: ['5-minute-journal', 'bullet-journaling'],
    relatedScenes: ['gratitude-journal-prompts', 'mindfulness-journal-prompts', 'self-love-journal-prompts'],
  },
  {
    slug: '5-minute-journal',
    title: '5-Minute Journal',
    h1: '5-Minute Journal Technique',
    metaTitle: '5-Minute Journal Technique: Quick Daily Journaling Method | JournalPrompts',
    metaDescription:
      'Learn the 5-minute journal technique — a structured morning and evening routine that takes just 5 minutes. Perfect for busy people who want journaling benefits fast.',
    heroSubtitle:
      'A structured 5-minute routine that combines gratitude, intention-setting, and reflection. The easiest way to build a consistent journaling habit.',
    emoji: '⚡',
    timePerSession: '5 min',
    difficulty: 'beginner',
    bestFor: ['Busy people with limited time', 'Building a daily journaling habit', 'Morning routine optimization', 'Goal-oriented people'],
    whatIs: {
      title: 'What Is the 5-Minute Journal?',
      paragraphs: [
        'The 5-minute journal is a structured journaling technique that uses the same set of prompts each day, split between morning and evening. It\'s designed to take no more than 5 minutes total — making it the most accessible journaling method for beginners and busy people.',
        'The technique draws from positive psychology, Stoic philosophy, and goal-setting research. By combining gratitude, intention, affirmation, and reflection into a simple daily template, it delivers the benefits of multiple journaling styles in minimal time.',
      ],
    },
    howTo: {
      title: 'How to Do the 5-Minute Journal',
      steps: [
        { step: 'Morning (2-3 minutes)', detail: 'Answer these three prompts: 1) I am grateful for... (3 things) 2) What would make today great? (3 things) 3) Daily affirmation: I am...' },
        { step: 'Go live your day', detail: 'The morning prompts prime your brain to notice good things and stay focused on what matters.' },
        { step: 'Evening (2 minutes)', detail: 'Answer: 1) 3 amazing things that happened today 2) How could I have made today even better?' },
        { step: 'Keep it short', detail: 'Each answer should be one sentence. Don\'t overthink it. Speed is a feature, not a bug.' },
        { step: 'Never miss twice', detail: 'If you skip a day, that\'s fine. Just don\'t skip two. Consistency beats perfection.' },
      ],
    },
    commonMistakes: {
      title: 'Common Mistakes & How to Fix Them',
      items: [
        { mistake: 'Overcomplicating answers', fix: 'Each answer should be one sentence max. "Morning coffee was great" is perfectly fine.' },
        { mistake: 'Skipping the evening part', fix: 'The evening reflection is where real growth happens. Set a phone reminder 30 minutes before bed.' },
        { mistake: 'Generic affirmations ("I am successful")', fix: 'Make affirmations specific and process-focused: "I am someone who shows up and does the work, even when it\'s hard."' },
        { mistake: 'Abandoning it after a few days', fix: 'Pair it with an existing habit (e.g., write right after brushing teeth). It takes 66 days on average to form a habit.' },
      ],
    },
    whyItWorks: {
      title: 'Why the 5-Minute Journal Works',
      paragraphs: [
        'The 5-minute journal works because it combines three evidence-based psychological techniques into one simple routine: gratitude (rewires negativity bias), intention-setting (activates the Reticular Activating System to notice opportunities), and reflection (consolidates learning and self-awareness).',
        'Research shows that the structured, repeatable nature of the 5-minute journal makes it significantly easier to maintain than open-ended journaling. A 2018 study in the Journal of Happiness Studies found that brief, structured gratitude interventions produced effects comparable to longer practices.',
      ],
      psychologySource:
        'Draws from positive psychology (Seligman, 2011), Stoic evening review practice, and goal-setting theory by Locke & Latham.',
    },
    faqs: [
      {
        question: 'Do I need to buy the official 5-Minute Journal book?',
        answer: 'No. The technique is simple enough to practice in any notebook. Just write the morning and evening prompts at the top of each day\'s page.',
      },
      {
        question: 'Can I do it digitally?',
        answer: 'Yes, though handwriting may offer additional cognitive benefits. Use whatever medium makes you most likely to stay consistent.',
      },
      {
        question: 'What if the same prompts feel repetitive?',
        answer: 'The repetition is intentional — it builds a habit loop. If it feels stale after a few months, try adding one "wildcard" prompt each week for variety while keeping the core structure.',
      },
      {
        question: 'Is 5 minutes really enough to get benefits?',
        answer: 'Yes. Research shows that even 2-3 minutes of structured gratitude practice produces measurable improvements in well-being. The 5-minute format maximizes impact per minute invested.',
      },
    ],
    relatedTechniques: ['gratitude-journaling', 'morning-pages', 'bullet-journaling'],
    relatedScenes: ['morning-journal-prompts', 'daily-journal-prompts', 'gratitude-journal-prompts'],
  },
  {
    slug: 'morning-pages',
    title: 'Morning Pages',
    h1: 'Morning Pages Journaling Technique',
    metaTitle: 'Morning Pages: Julia Cameron\'s Journaling Technique | JournalPrompts',
    metaDescription:
      'Learn Morning Pages — Julia Cameron\'s technique of writing 3 pages longhand first thing in the morning. Clear mental clutter, unlock creativity, and find clarity.',
    heroSubtitle:
      'Three pages of longhand writing, done first thing in the morning. Julia Cameron\'s legendary technique for clearing mental clutter and unlocking creativity.',
    emoji: '🌅',
    timePerSession: '25-40 min',
    difficulty: 'intermediate',
    bestFor: ['Clearing mental clutter', 'Unlocking creativity', 'Processing emotions', 'Making difficult decisions'],
    whatIs: {
      title: 'What Are Morning Pages?',
      paragraphs: [
        'Morning Pages are a cornerstone practice from Julia Cameron\'s "The Artist\'s Way" (1992). The technique is simple: write three pages of longhand stream-of-consciousness writing first thing in the morning, before doing anything else.',
        'Morning Pages are not "writing" in the artistic sense — they\'re a brain dump. Think of them as mental windshield wipers that clear away the fog of anxiety, to-do lists, random thoughts, and emotional residue so you can start your day with clarity. There is no wrong way to do them.',
      ],
    },
    howTo: {
      title: 'How to Do Morning Pages',
      steps: [
        { step: 'Write first thing in the morning', detail: 'Before checking your phone, email, or social media. Your mind is most unfiltered in these first waking minutes.' },
        { step: 'Write exactly 3 pages longhand', detail: 'Use standard letter-size paper. Three pages is roughly 750 words. Longhand is important — it slows you down enough to connect with your thoughts.' },
        { step: 'Write whatever comes to mind', detail: '"I\'m tired and I don\'t want to do this. My shoulder hurts. I need to call the dentist..." All of this is valid morning pages material.' },
        { step: 'Don\'t re-read them', detail: 'Julia Cameron recommends not re-reading your morning pages for at least 8 weeks. They\'re not meant to be analyzed — they\'re meant to be released.' },
        { step: 'Do it every single day', detail: 'Morning pages work through consistency. Cameron calls them "a non-negotiable." Even (especially) on days you don\'t feel like it.' },
      ],
    },
    commonMistakes: {
      title: 'Common Mistakes & How to Fix Them',
      items: [
        { mistake: 'Doing them on a computer', fix: 'Cameron insists on longhand. The physical act of handwriting engages the brain differently and slows your thoughts to a processable speed.' },
        { mistake: 'Writing fewer than 3 pages', fix: 'The first 1.5 pages are usually surface-level complaints. The real insights come in pages 2-3. Push through.' },
        { mistake: 'Treating them as a creative exercise', fix: 'Morning pages are not journaling, not memoir, not poetry. They\'re a brain dump. Let them be messy and boring.' },
        { mistake: 'Skipping days when you "have nothing to say"', fix: 'Write "I have nothing to say" until something comes. It always does. Those are often the most productive sessions.' },
      ],
    },
    whyItWorks: {
      title: 'Why Morning Pages Work',
      paragraphs: [
        'Morning pages work by engaging the brain\'s "default mode network" — the same neural system active during daydreaming and shower thoughts. Writing longhand first thing in the morning, before the analytical mind fully wakes up, gives access to subconscious thoughts, feelings, and creative ideas that are normally drowned out by daily noise.',
        'Millions of practitioners report that morning pages help them make better decisions, reduce anxiety, and unlock creative breakthroughs. While formal academic studies on morning pages specifically are limited, the underlying mechanisms — expressive writing, mindfulness, and cognitive offloading — are all well-supported by research.',
      ],
      psychologySource:
        'Based on Julia Cameron\'s "The Artist\'s Way" (1992), supported by expressive writing research (Pennebaker) and cognitive offloading theory.',
    },
    faqs: [
      {
        question: 'Do morning pages have to be done in the morning?',
        answer: 'Ideally yes. The morning mind is less censored and more connected to subconscious thoughts. However, if your schedule absolutely won\'t allow it, writing at any time is better than not writing at all.',
      },
      {
        question: 'What if I can\'t write 3 full pages?',
        answer: 'Keep writing anyway. "I don\'t know what to write. This is boring. My hand hurts." counts. The point is to fill three pages, not to write anything meaningful.',
      },
      {
        question: 'Should I use a journal prompt to start?',
        answer: 'No. Morning pages should be completely unguided. Start with whatever is on your mind — even if it\'s just "I\'m tired." The lack of structure is the technique.',
      },
      {
        question: 'How long does it take to see results?',
        answer: 'Most people notice reduced anxiety and clearer thinking within 1-2 weeks. Julia Cameron suggests committing to 12 weeks (the length of "The Artist\'s Way" program) for the full transformative effect.',
      },
    ],
    relatedTechniques: ['free-writing', 'stream-of-consciousness', 'expressive-writing'],
    relatedScenes: ['morning-journal-prompts', 'deep-journal-prompts', 'self-discovery-journal-prompts'],
  },
  {
    slug: 'bullet-journaling',
    title: 'Bullet Journaling',
    h1: 'Bullet Journaling Technique',
    metaTitle: 'Bullet Journaling: The Rapid Logging Method Explained | JournalPrompts',
    metaDescription:
      'Learn the bullet journaling technique — Ryder Carroll\'s rapid logging system that combines task management, journaling, and planning in one notebook.',
    heroSubtitle:
      'A rapid logging system that combines task management, habit tracking, and reflective journaling in one analog notebook. Organize your life and mind.',
    emoji: '📓',
    timePerSession: '10-15 min',
    difficulty: 'intermediate',
    bestFor: ['Organizing tasks and goals', 'Combining planning with journaling', 'Visual/creative thinkers', 'People who love analog tools'],
    whatIs: {
      title: 'What Is Bullet Journaling?',
      paragraphs: [
        'Bullet journaling (or "BuJo") is a customizable organizational system created by Ryder Carroll. It uses rapid logging — a method of capturing information using short-form notation with bullets, symbols, and signifiers — to create a flexible system for task management, habit tracking, and journaling.',
        'Despite what Instagram suggests, bullet journaling doesn\'t require artistic skill. At its core, it\'s a minimalist system: a blank notebook, a pen, and a set of simple symbols to organize your thoughts and tasks. The artistic spreads are optional and came from the community, not the original method.',
      ],
    },
    howTo: {
      title: 'How to Start Bullet Journaling',
      steps: [
        { step: 'Get a notebook and pen', detail: 'A dotted grid notebook works best (like a Leuchtturm1917), but any notebook will do. Start simple.' },
        { step: 'Create an Index', detail: 'Reserve the first 2-4 pages as a table of contents. Number your pages and add topics to the index as you go.' },
        { step: 'Set up a Future Log', detail: 'Spread 6 months across 2-4 pages. Record future events and tasks here.' },
        { step: 'Create your Monthly Log', detail: 'List the dates of the current month on one page, and a task list on the facing page.' },
        { step: 'Use Daily Logs with rapid logging', detail: 'Each day, write the date and capture tasks (•), events (○), and notes (—) using these simple symbols. Migrate unfinished tasks forward with (>).' },
      ],
    },
    commonMistakes: {
      title: 'Common Mistakes & How to Fix Them',
      items: [
        { mistake: 'Spending too much time on decoration', fix: 'Function first. A plain bullet journal that you actually use beats a beautiful one you abandon. Add decoration only after the system is habit.' },
        { mistake: 'Copying someone else\'s system exactly', fix: 'The power of BuJo is customization. Start with the basics, then add and remove modules based on what YOU need.' },
        { mistake: 'Not doing the monthly migration', fix: 'Migration — reviewing and moving forward unfinished tasks — is the core of the system. It forces intentional prioritization.' },
        { mistake: 'Feeling behind or falling off', fix: 'There is no "behind" in bullet journaling. If you miss a week, just start fresh on the next blank page. No backfilling needed.' },
      ],
    },
    whyItWorks: {
      title: 'Why Bullet Journaling Works',
      paragraphs: [
        'Bullet journaling works by combining two powerful psychological mechanisms: the "Zeigarnik Effect" (unfinished tasks create mental tension that\'s resolved by writing them down) and "metacognition" (thinking about your thinking). The migration process forces you to regularly evaluate what actually matters.',
        'The analog nature is intentional. Handwriting engages motor memory and improves information retention compared to typing. The physical act of writing also provides a digital detox — a focused, screen-free space for reflection that many people find increasingly valuable.',
      ],
      psychologySource:
        'Based on Ryder Carroll\'s "The Bullet Journal Method" (2018), Zeigarnik Effect research, and studies on handwriting vs. typing for memory retention.',
    },
    faqs: [
      {
        question: 'Do I need to be artistic to bullet journal?',
        answer: 'Absolutely not. The original bullet journal system is purely functional — just text and simple symbols. The elaborate artistic spreads you see online are optional community additions. Many dedicated bullet journalers keep theirs completely plain.',
      },
      {
        question: 'Can I bullet journal digitally?',
        answer: 'You can, but the handwriting component is a core feature. Apps like GoodNotes on iPad with a stylus come closest to the original experience. Pure digital alternatives lose some of the cognitive benefits of handwriting.',
      },
      {
        question: 'How is bullet journaling different from a regular planner?',
        answer: 'A planner has a fixed structure. A bullet journal adapts to your needs — you create only the pages and trackers you actually use. It also combines reflection and journaling with planning, which a typical planner doesn\'t.',
      },
      {
        question: 'What if I run out of space mid-month?',
        answer: 'Just continue on the next available page and update your index. This is a feature of the system — no wasted pages, no rigid structure.',
      },
    ],
    relatedTechniques: ['5-minute-journal', 'gratitude-journaling'],
    relatedScenes: ['daily-journal-prompts', 'morning-journal-prompts', 'fun-journal-prompts'],
  },
  {
    slug: 'cbt-journaling',
    title: 'CBT Journaling',
    h1: 'CBT Journaling Technique',
    metaTitle: 'CBT Journaling: Cognitive Behavioral Therapy Journaling Guide | JournalPrompts',
    metaDescription:
      'Learn CBT journaling — a structured technique from cognitive behavioral therapy to identify and reframe negative thought patterns. Evidence-based and therapist-recommended.',
    heroSubtitle:
      'A structured, evidence-based journaling technique from cognitive behavioral therapy. Identify negative thought patterns and reframe them into balanced perspectives.',
    emoji: '🧠',
    timePerSession: '10-15 min',
    difficulty: 'intermediate',
    bestFor: ['Managing anxiety and worry', 'Challenging negative self-talk', 'Processing difficult emotions', 'Complementing therapy'],
    whatIs: {
      title: 'What Is CBT Journaling?',
      paragraphs: [
        'CBT journaling applies the core principles of Cognitive Behavioral Therapy to your journaling practice. The technique helps you identify automatic negative thoughts, examine the evidence for and against them, and develop more balanced, realistic perspectives.',
        'Unlike free writing, CBT journaling uses a structured format — often a "thought record" with specific columns for the situation, your thoughts, emotions, evidence, and a reframed perspective. This structure is what makes it therapeutically effective: it interrupts the cycle of rumination by forcing you to examine your thinking objectively.',
      ],
    },
    howTo: {
      title: 'How to Practice CBT Journaling',
      steps: [
        { step: 'Describe the situation', detail: 'Write down what happened, sticking to objective facts. "My boss didn\'t reply to my email for 3 hours" — not "My boss is ignoring me."' },
        { step: 'Identify your automatic thoughts', detail: 'What went through your mind? "She probably hates my work." "I\'m going to get fired." Write them all down, exactly as they appeared.' },
        { step: 'Rate your emotions', detail: 'Name what you feel (anxious, sad, angry) and rate intensity 0-100. This creates awareness and a baseline for tracking progress.' },
        { step: 'Examine the evidence', detail: 'List evidence FOR your thought ("She seemed distant in the meeting") and AGAINST ("She praised my last report, she\'s been busy with a deadline").' },
        { step: 'Write a balanced thought', detail: 'Create a more realistic perspective: "She\'s probably busy. If there was a problem, she would tell me directly." Re-rate your emotions.' },
      ],
    },
    commonMistakes: {
      title: 'Common Mistakes & How to Fix Them',
      items: [
        { mistake: 'Forcing positive thinking', fix: 'CBT isn\'t about being positive — it\'s about being realistic. A balanced thought can still acknowledge difficulty: "This is hard, AND I have the skills to handle it."' },
        { mistake: 'Skipping the evidence step', fix: 'The evidence examination is the technique. Without it, you\'re just writing down negative thoughts, which can reinforce them.' },
        { mistake: 'Only journaling during crises', fix: 'Regular practice (even about small annoyances) builds the skill so it\'s available during real crises. Think of it as mental fitness training.' },
        { mistake: 'Using it as a substitute for therapy', fix: 'CBT journaling is a valuable self-help tool, but for clinical anxiety or depression, it works best alongside professional guidance.' },
      ],
    },
    whyItWorks: {
      title: 'Why CBT Journaling Works',
      paragraphs: [
        'CBT is one of the most extensively researched forms of psychotherapy, with hundreds of clinical trials supporting its effectiveness. CBT journaling works by creating "cognitive distance" — the space between having a thought and believing it. Writing thoughts on paper makes them feel less overwhelming and more examinable.',
        'Research published in Behaviour Research and Therapy found that structured thought recording significantly reduces anxiety and depression symptoms. The act of writing forces slower, more deliberate thinking — engaging the prefrontal cortex to override the amygdala\'s fear response.',
      ],
      psychologySource:
        'Based on Aaron Beck\'s Cognitive Behavioral Therapy framework (1960s), with contemporary evidence from clinical trials published in Behaviour Research and Therapy and the Journal of Consulting and Clinical Psychology.',
    },
    faqs: [
      {
        question: 'Do I need a therapist to do CBT journaling?',
        answer: 'No, you can practice CBT journaling on your own using the thought record format. However, a therapist can help you identify cognitive distortions you might not notice yourself, and provide guidance for more complex issues.',
      },
      {
        question: 'What are common cognitive distortions to watch for?',
        answer: 'Common ones include: all-or-nothing thinking ("If it\'s not perfect, it\'s a failure"), catastrophizing ("This will ruin everything"), mind-reading ("They must think I\'m stupid"), and emotional reasoning ("I feel anxious, so something must be wrong").',
      },
      {
        question: 'How often should I do CBT journaling?',
        answer: 'Start with whenever you notice strong negative emotions. As you build the habit, aim for daily practice — even about minor frustrations. Consistent practice builds the cognitive skills faster.',
      },
      {
        question: 'Can CBT journaling help with anxiety?',
        answer: 'Yes, it\'s one of the most evidence-based self-help techniques for anxiety. Multiple studies show that regular thought recording reduces anxiety symptoms. However, for severe anxiety, please combine it with professional treatment.',
      },
    ],
    relatedTechniques: ['expressive-writing', 'gratitude-journaling'],
    relatedScenes: ['journal-prompts-for-mental-health', 'shadow-work-journal-prompts', 'deep-journal-prompts'],
  },
];

/**
 * Audience-specific technique pages
 */
export interface AudienceTechniqueConfig {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  emoji: string;
  recommendedTechniques: string[];
  whyContent: string[];
  psychologySource: string;
  faqs: { question: string; answer: string }[];
}

export const audienceTechniques: AudienceTechniqueConfig[] = [
  {
    slug: 'for-beginners',
    title: 'For Beginners',
    h1: 'Journaling Techniques for Beginners',
    metaTitle: 'Journaling Techniques for Beginners: Start Here | JournalPrompts',
    metaDescription:
      'New to journaling? Discover the best journaling techniques for beginners — from the 5-minute journal to free writing. Start your journaling habit today.',
    heroSubtitle:
      'New to journaling and not sure where to start? We\'ll match you with the perfect technique based on your goals, personality, and available time.',
    emoji: '🌱',
    recommendedTechniques: ['5-minute-journal', 'gratitude-journaling', 'free-writing'],
    whyContent: [
      'Starting a journaling practice can feel overwhelming — there are dozens of methods, and the blank page can be intimidating. The good news? Research shows that the "best" technique is simply the one you\'ll actually stick with.',
      'For beginners, we recommend starting with a structured method (like the 5-minute journal or gratitude journaling) because the built-in prompts eliminate blank page anxiety. Once journaling becomes a habit, you can explore more open-ended techniques like free writing or morning pages.',
      'The biggest mistake beginners make is trying to write too much, too perfectly, too soon. You don\'t need a beautiful leather journal, perfect handwriting, or deep philosophical insights. A simple notebook and 5 minutes is enough. Dr. BJ Fogg\'s habit research at Stanford shows that "tiny habits" — starting smaller than you think necessary — are the key to building lasting practices.',
      'Here\'s a practical beginner roadmap: Week 1-2, try the 5-minute journal with its structured prompts. Week 3-4, experiment with gratitude journaling to train your brain for positivity. Week 5-6, attempt a short free writing session (just 10 minutes) to see what happens when you write without rules. By the end of 6 weeks, you\'ll know which technique resonates with you.',
      'Many beginners worry about privacy — what if someone reads their journal? This is a valid concern. Simple solutions include using a password-protected app, keeping your journal in a private drawer, or even shredding pages after writing (the benefit comes from the writing process itself, not from re-reading). Removing the privacy fear removes a major barrier to honest self-expression.',
    ],
    psychologySource:
      'Based on habit formation research by Dr. BJ Fogg (Stanford) — start tiny, attach to existing habits, and celebrate small wins.',
    faqs: [
      {
        question: 'What is the easiest journaling technique for beginners?',
        answer: 'The 5-minute journal is the easiest starting point. It gives you specific prompts to answer each morning and evening, takes only 5 minutes, and removes the "what do I write?" barrier completely.',
      },
      {
        question: 'How often should beginners journal?',
        answer: 'Start with 3 times per week, not daily. Research shows this frequency is enough for benefits while being sustainable. Once it feels natural, you can increase to daily.',
      },
      {
        question: 'Should I use a physical journal or digital app?',
        answer: 'Either works. Physical journals offer cognitive benefits from handwriting, but digital apps may be more convenient. The best choice is whatever you\'ll actually use consistently.',
      },
      {
        question: 'What if I don\'t know what to write?',
        answer: 'Use a prompt or start with "I don\'t know what to write, but..." and keep going. You can also try our prompt finder tool which matches you with prompts based on your mood.',
      },
      {
        question: 'How long before I see benefits from journaling?',
        answer: 'Most people notice reduced stress and clearer thinking within 1-2 weeks of consistent practice. Deeper benefits like improved emotional regulation and self-awareness typically emerge after 4-6 weeks.',
      },
    ],
  },
  {
    slug: 'for-anxiety',
    title: 'For Anxiety',
    h1: 'Journaling Techniques for Anxiety',
    metaTitle: 'Journaling Techniques for Anxiety: Evidence-Based Methods | JournalPrompts',
    metaDescription:
      'Discover evidence-based journaling techniques for anxiety — from CBT thought records to expressive writing. Reduce worry, calm racing thoughts, and regain control.',
    heroSubtitle:
      'Evidence-based journaling techniques specifically chosen for managing anxiety. Calm racing thoughts, reduce worry, and build emotional resilience.',
    emoji: '🌿',
    recommendedTechniques: ['cbt-journaling', 'free-writing', 'gratitude-journaling'],
    whyContent: [
      'Anxiety lives in your head — looping, racing, catastrophizing. Journaling works by getting those thoughts out of the loop and onto paper, where they lose much of their power. This process is called "cognitive offloading," and research shows it significantly reduces anxiety symptoms.',
      'Different journaling techniques target different aspects of anxiety. CBT journaling helps you challenge and reframe anxious thoughts. Free writing provides emotional release. Gratitude journaling shifts your focus from threats to positives. The most effective approach often combines two or three methods.',
    ],
    psychologySource:
      'Supported by meta-analyses in the Journal of Affective Disorders showing expressive writing reduces anxiety symptoms, and CBT-based writing interventions published in Behaviour Research and Therapy.',
    faqs: [
      {
        question: 'Which journaling technique is best for anxiety?',
        answer: 'CBT journaling (thought records) is the most evidence-based technique specifically for anxiety. It teaches you to identify and challenge anxious thoughts. Free writing is also helpful for releasing pent-up worry.',
      },
      {
        question: 'Can journaling replace anxiety medication?',
        answer: 'Journaling is a complementary tool, not a replacement for medication or professional treatment. If you\'re experiencing significant anxiety, please consult a healthcare provider. Journaling can work alongside other treatments effectively.',
      },
      {
        question: 'When should I journal for anxiety — during an anxiety episode or after?',
        answer: 'Both. During mild to moderate anxiety, journaling can interrupt the spiral. After an episode, reflective journaling (like CBT thought records) helps you learn from the experience and build resilience for next time.',
      },
      {
        question: 'What if journaling makes my anxiety worse?',
        answer: 'If open-ended writing increases rumination, switch to a structured technique like the 5-minute journal or CBT thought records. The structure prevents spiraling. If any form of journaling consistently worsens your anxiety, talk to a mental health professional.',
      },
    ],
  },
];

/**
 * Helper to get a technique by slug
 */
export function getTechniqueBySlug(slug: string): TechniqueConfig | undefined {
  return techniques.find((t) => t.slug === slug);
}

/**
 * Helper to get an audience technique by slug
 */
export function getAudienceTechniqueBySlug(slug: string): AudienceTechniqueConfig | undefined {
  return audienceTechniques.find((t) => t.slug === slug);
}

/**
 * All technique slugs for static generation
 */
export function getAllTechniqueSlugs(): string[] {
  return [
    ...techniques.map((t) => t.slug),
    ...audienceTechniques.map((t) => t.slug),
  ];
}

/**
 * Get techniques that reference a given scene slug (reverse lookup)
 * Only returns techniques that are in the active set
 */
export function getTechniquesForScene(
  sceneSlug: string,
  activeSlugs: string[]
): TechniqueConfig[] {
  return techniques.filter(
    (t) =>
      activeSlugs.includes(t.slug) &&
      t.relatedScenes.includes(sceneSlug)
  );
}
