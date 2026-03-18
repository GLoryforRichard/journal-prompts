const fs = require('fs');
const path = require('path');

const PROMPTS_PATH = path.join(__dirname, '..', 'src', 'data', 'prompts.json');

const newPrompts = [
  // ============================================================
  // GRATITUDE (grat-016 to grat-030)
  // ============================================================
  {
    id: 'grat-016',
    text: 'What is one relationship in your life that you often take for granted? Write about why it matters more than you usually acknowledge.',
    mood: ['grateful', 'reflective'],
    direction: ['gratitude', 'relationships'],
    scene: 'gratitude',
    depth: 'medium',
    source: 'Based on relational gratitude research by Dr. Sara Algoe'
  },
  {
    id: 'grat-017',
    text: 'Describe a sound you heard today that you enjoyed — birdsong, laughter, music, rain. Why did it resonate with you?',
    mood: ['grateful', 'curious'],
    direction: ['gratitude'],
    scene: 'gratitude',
    depth: 'light',
    source: 'Inspired by auditory savoring practices in positive psychology'
  },
  {
    id: 'grat-018',
    text: 'Write about a teacher, mentor, or coach who shaped you in ways they probably do not realize.',
    mood: ['grateful', 'reflective'],
    direction: ['gratitude', 'relationships'],
    scene: 'gratitude',
    depth: 'deep',
    source: 'Based on gratitude and mentorship research by Dr. Robert Emmons'
  },
  {
    id: 'grat-019',
    text: 'What is something your younger self would be thrilled to know about your life today?',
    mood: ['grateful', 'energized'],
    direction: ['gratitude', 'self-discovery'],
    scene: 'gratitude',
    depth: 'medium',
    source: 'Inspired by temporal self-comparison and appreciation research'
  },
  {
    id: 'grat-020',
    text: 'Name a piece of technology, art, or infrastructure that quietly makes your daily life better. How would your day change without it?',
    mood: ['grateful', 'curious'],
    direction: ['gratitude'],
    scene: 'gratitude',
    depth: 'light',
    source: 'Based on invisible support and gratitude awareness studies'
  },
  {
    id: 'grat-021',
    text: 'Think of a stranger who did something kind for you — held a door, smiled, gave directions. What would you say to them now?',
    mood: ['grateful', 'reflective'],
    direction: ['gratitude', 'relationships'],
    scene: 'gratitude',
    depth: 'light',
    source: 'Inspired by prosocial gratitude and kindness research by Dr. Sonja Lyubomirsky'
  },
  {
    id: 'grat-022',
    text: 'What part of your daily routine brings you quiet satisfaction that you rarely stop to appreciate?',
    mood: ['grateful', 'reflective'],
    direction: ['gratitude', 'self-discovery'],
    scene: 'gratitude',
    depth: 'light',
    source: 'Based on habitual gratitude practices in positive psychology'
  },
  {
    id: 'grat-023',
    text: 'Write about a book, song, or movie that changed your perspective. What are you grateful it taught you?',
    mood: ['grateful', 'curious'],
    direction: ['gratitude', 'creativity'],
    scene: 'gratitude',
    depth: 'medium',
    source: 'Inspired by transformative aesthetic experience research'
  },
  {
    id: 'grat-024',
    text: 'Consider a difficult period in your life. Who or what helped carry you through it? How can you honor that support today?',
    mood: ['grateful', 'reflective', 'sad'],
    direction: ['gratitude', 'healing'],
    scene: 'gratitude',
    depth: 'deep',
    source: 'Based on benefit-finding research in health psychology'
  },
  {
    id: 'grat-025',
    text: 'What is one freedom you exercise every day without thinking about it? Imagine life without it for a moment.',
    mood: ['grateful', 'reflective'],
    direction: ['gratitude'],
    scene: 'gratitude',
    depth: 'medium',
    source: 'Inspired by perspective-broadening exercises in gratitude interventions'
  },
  {
    id: 'grat-026',
    text: 'Write about a season of the year you love. What specific sensations, traditions, or memories make it meaningful?',
    mood: ['grateful', 'energized'],
    direction: ['gratitude', 'self-discovery'],
    scene: 'gratitude',
    depth: 'light',
    source: 'Based on savoring and seasonal well-being research by Fred Bryant'
  },
  {
    id: 'grat-027',
    text: 'Who is someone working behind the scenes to make your life easier — a janitor, a delivery driver, a colleague? Acknowledge them here.',
    mood: ['grateful', 'reflective'],
    direction: ['gratitude', 'relationships'],
    scene: 'gratitude',
    depth: 'medium',
    source: 'Inspired by invisible labor awareness and gratitude research by Dr. Sara Algoe'
  },
  {
    id: 'grat-028',
    text: 'What is a personality trait of yours that once felt like a weakness but has turned out to be a strength?',
    mood: ['grateful', 'reflective', 'curious'],
    direction: ['gratitude', 'self-discovery'],
    scene: 'gratitude',
    depth: 'deep',
    source: 'Based on character strengths reappraisal in positive psychology by Dr. Martin Seligman'
  },
  {
    id: 'grat-029',
    text: 'List three simple pleasures you experienced this week — a warm drink, a good stretch, a sunset. Let yourself re-feel each one.',
    mood: ['grateful'],
    direction: ['gratitude'],
    scene: 'gratitude',
    depth: 'light',
    source: 'Inspired by savoring micro-moments research by Fred Bryant & Joseph Veroff'
  },
  {
    id: 'grat-030',
    text: 'Imagine reading this journal entry ten years from now. What about your current life do you think future-you will be most grateful for?',
    mood: ['grateful', 'reflective', 'curious'],
    direction: ['gratitude', 'self-discovery'],
    scene: 'gratitude',
    depth: 'deep',
    source: 'Based on future nostalgia and prospective gratitude research'
  },

  // ============================================================
  // MENTAL HEALTH (ment-016 to ment-030)
  // ============================================================
  {
    id: 'ment-016',
    text: 'What is one thought pattern you notice when you are stressed? Write it out, then create a calmer alternative version.',
    mood: ['anxious', 'reflective'],
    direction: ['healing', 'self-discovery'],
    scene: 'mental-health',
    depth: 'medium',
    source: 'Based on thought record techniques in cognitive behavioral therapy by Dr. Judith Beck'
  },
  {
    id: 'ment-017',
    text: 'Describe a safe place — real or imagined — where you feel completely at ease. What details make it comforting?',
    mood: ['anxious', 'reflective'],
    direction: ['healing'],
    scene: 'mental-health',
    depth: 'light',
    source: 'Inspired by safe place visualization in EMDR therapy by Dr. Francine Shapiro'
  },
  {
    id: 'ment-018',
    text: 'What is one thing you have been putting off because it feels overwhelming? Break it into three tiny steps you could start with.',
    mood: ['stuck', 'anxious'],
    direction: ['healing', 'goal-setting'],
    scene: 'mental-health',
    depth: 'medium',
    source: 'Based on behavioral activation principles in treating depression'
  },
  {
    id: 'ment-019',
    text: 'How do you know when you are reaching your emotional limit? List your personal warning signs.',
    mood: ['reflective', 'anxious'],
    direction: ['self-discovery', 'healing'],
    scene: 'mental-health',
    depth: 'medium',
    source: 'Inspired by emotional regulation research by Dr. James Gross'
  },
  {
    id: 'ment-020',
    text: 'Write a letter to your anxiety. Tell it what you understand about why it shows up, and what you need from it instead.',
    mood: ['anxious', 'reflective'],
    direction: ['healing', 'self-discovery'],
    scene: 'mental-health',
    depth: 'deep',
    source: 'Based on externalization techniques in narrative therapy by Michael White'
  },
  {
    id: 'ment-021',
    text: 'Name three people you could reach out to if you needed support right now. What would make it easier to actually ask?',
    mood: ['reflective', 'anxious'],
    direction: ['relationships', 'healing'],
    scene: 'mental-health',
    depth: 'light',
    source: 'Inspired by social support and help-seeking research in mental health'
  },
  {
    id: 'ment-022',
    text: 'What does your body feel like right now? Scan from head to toe and note any areas of tension, warmth, or numbness.',
    mood: ['reflective'],
    direction: ['healing', 'self-discovery'],
    scene: 'mental-health',
    depth: 'light',
    source: 'Based on body scan techniques in mindfulness-based cognitive therapy (MBCT)'
  },
  {
    id: 'ment-023',
    text: 'Think about a belief you hold about yourself that causes suffering. Where did you first learn it? Is there evidence against it?',
    mood: ['reflective', 'sad'],
    direction: ['healing', 'self-discovery'],
    scene: 'mental-health',
    depth: 'deep',
    source: 'Based on core belief work in schema therapy by Dr. Jeffrey Young'
  },
  {
    id: 'ment-024',
    text: 'When you feel numb or disconnected, what small actions help you return to yourself?',
    mood: ['stuck', 'reflective'],
    direction: ['healing'],
    scene: 'mental-health',
    depth: 'medium',
    source: 'Inspired by window of tolerance concept by Dr. Daniel Siegel'
  },
  {
    id: 'ment-025',
    text: 'Write about one area of your life where you feel in control and one where you do not. How does the contrast feel?',
    mood: ['reflective', 'anxious'],
    direction: ['self-discovery', 'healing'],
    scene: 'mental-health',
    depth: 'medium',
    source: 'Based on perceived control and well-being research by Dr. Suzanne Thompson'
  },
  {
    id: 'ment-026',
    text: 'What is one kind thing you can do for yourself in the next hour? Commit to it here.',
    mood: ['reflective', 'energized'],
    direction: ['healing'],
    scene: 'mental-health',
    depth: 'light',
    source: 'Inspired by micro-interventions in behavioral activation therapy'
  },
  {
    id: 'ment-027',
    text: 'Describe a time when asking for help was harder than the problem itself. What made it so difficult?',
    mood: ['reflective', 'stuck'],
    direction: ['healing', 'relationships'],
    scene: 'mental-health',
    depth: 'deep',
    source: 'Based on help-seeking barriers research in clinical psychology'
  },
  {
    id: 'ment-028',
    text: 'What activities make you lose track of time in a positive way? When was the last time you made space for one?',
    mood: ['reflective', 'curious'],
    direction: ['healing', 'self-discovery'],
    scene: 'mental-health',
    depth: 'light',
    source: 'Inspired by flow and well-being research by Dr. Mihaly Csikszentmihalyi'
  },
  {
    id: 'ment-029',
    text: 'If your current emotional state were weather passing through, remind yourself: what kind of sky is behind the clouds?',
    mood: ['sad', 'reflective'],
    direction: ['healing'],
    scene: 'mental-health',
    depth: 'medium',
    source: 'Based on metacognitive awareness exercises in MBCT by Segal, Williams & Teasdale'
  },
  {
    id: 'ment-030',
    text: 'Write about a moment this week when you felt at peace, even briefly. What conditions made that peace possible?',
    mood: ['reflective', 'grateful'],
    direction: ['healing', 'self-discovery'],
    scene: 'mental-health',
    depth: 'medium',
    source: 'Inspired by upward spiral theory of positive emotions by Dr. Barbara Fredrickson'
  },

  // ============================================================
  // SHADOW WORK (shad-016 to shad-030)
  // ============================================================
  {
    id: 'shad-016',
    text: 'What promise have you broken to yourself repeatedly? What deeper need does the breaking serve?',
    mood: ['reflective', 'stuck'],
    direction: ['self-discovery', 'healing'],
    scene: 'shadow-work',
    depth: 'deep',
    source: 'Based on self-sabotage patterns in psychodynamic therapy'
  },
  {
    id: 'shad-017',
    text: 'Write about a time you pretended to be fine when you were not. Who were you protecting — yourself or others?',
    mood: ['reflective', 'sad'],
    direction: ['healing', 'self-discovery'],
    scene: 'shadow-work',
    depth: 'medium',
    source: 'Inspired by emotional masking research in attachment theory by Dr. John Bowlby'
  },
  {
    id: 'shad-018',
    text: 'What do you do when you feel powerless? Trace that coping mechanism back to when you first learned it.',
    mood: ['reflective', 'anxious'],
    direction: ['self-discovery', 'healing'],
    scene: 'shadow-work',
    depth: 'deep',
    source: 'Based on learned helplessness and coping origin research by Dr. Martin Seligman'
  },
  {
    id: 'shad-019',
    text: 'Name something you crave validation for. If no one ever acknowledged it, would you still value it?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'shadow-work',
    depth: 'deep',
    source: 'Inspired by external vs. internal locus of evaluation by Dr. Carl Rogers'
  },
  {
    id: 'shad-020',
    text: 'What are the unspoken rules in your family? Which ones do you still follow even though they no longer serve you?',
    mood: ['reflective', 'stuck'],
    direction: ['self-discovery', 'healing'],
    scene: 'shadow-work',
    depth: 'deep',
    source: 'Based on family rules and legacy work in Bowen family systems theory'
  },
  {
    id: 'shad-021',
    text: 'Think of someone you have cut off or distanced yourself from. What part of your shadow were they mirroring?',
    mood: ['reflective', 'sad'],
    direction: ['relationships', 'self-discovery'],
    scene: 'shadow-work',
    depth: 'deep',
    source: 'Inspired by relational shadow work and projection in Jungian analysis'
  },
  {
    id: 'shad-022',
    text: 'Write about a success that left you feeling empty instead of fulfilled. What was missing?',
    mood: ['reflective', 'stuck'],
    direction: ['self-discovery'],
    scene: 'shadow-work',
    depth: 'medium',
    source: 'Based on extrinsic vs. intrinsic goal pursuit research by Kasser & Ryan'
  },
  {
    id: 'shad-023',
    text: 'When you are angry, what is the emotion underneath the anger? Fear? Grief? Betrayal? Sit with it.',
    mood: ['anxious', 'reflective'],
    direction: ['healing', 'self-discovery'],
    scene: 'shadow-work',
    depth: 'deep',
    source: 'Inspired by anger as a secondary emotion concept in emotion-focused therapy by Dr. Leslie Greenberg'
  },
  {
    id: 'shad-024',
    text: 'What story do you tell about your childhood that you suspect is more curated than true? Write the uncurated version.',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery', 'healing'],
    scene: 'shadow-work',
    depth: 'deep',
    source: 'Based on autobiographical memory reconstruction research by Elizabeth Loftus'
  },
  {
    id: 'shad-025',
    text: 'In what situations do you people-please? What are you afraid will happen if you stop?',
    mood: ['reflective', 'anxious'],
    direction: ['self-discovery', 'healing'],
    scene: 'shadow-work',
    depth: 'medium',
    source: 'Inspired by fawn response research in trauma psychology by Pete Walker'
  },
  {
    id: 'shad-026',
    text: 'Write about a time you acted against your own values. What internal conflict was driving that choice?',
    mood: ['reflective', 'sad'],
    direction: ['self-discovery', 'healing'],
    scene: 'shadow-work',
    depth: 'deep',
    source: 'Based on cognitive dissonance theory by Leon Festinger'
  },
  {
    id: 'shad-027',
    text: 'What is the mask you wear most often in public? Describe who you are when you finally take it off.',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'shadow-work',
    depth: 'medium',
    source: 'Inspired by persona and shadow concepts by Carl Jung'
  },
  {
    id: 'shad-028',
    text: 'What would your life look like if you stopped trying to earn love? Write about that possibility.',
    mood: ['reflective', 'sad', 'curious'],
    direction: ['healing', 'self-discovery'],
    scene: 'shadow-work',
    depth: 'deep',
    source: 'Based on conditional vs. unconditional positive regard by Dr. Carl Rogers'
  },
  {
    id: 'shad-029',
    text: 'Think of a habit you call a guilty pleasure. Remove the guilt — what need is it actually meeting?',
    mood: ['curious', 'reflective'],
    direction: ['self-discovery'],
    scene: 'shadow-work',
    depth: 'light',
    source: 'Inspired by shame-free self-exploration in humanistic psychology'
  },
  {
    id: 'shad-030',
    text: 'If your shadow self wrote you a letter, what would it say? Let it speak without censorship.',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery', 'healing'],
    scene: 'shadow-work',
    depth: 'deep',
    source: 'Based on active imagination technique by Carl Jung'
  },

  // ============================================================
  // KIDS (kids-016 to kids-030)
  // ============================================================
  {
    id: 'kids-016',
    text: 'If you could be any animal for a day, which would you choose? What would your day look like?',
    mood: ['curious', 'energized'],
    direction: ['creativity'],
    scene: 'kids',
    depth: 'light',
    source: 'Based on imaginative role-play and perspective-taking in child development'
  },
  {
    id: 'kids-017',
    text: 'What is the nicest thing someone said to you recently? How did it make you feel inside?',
    mood: ['grateful', 'reflective'],
    direction: ['relationships', 'gratitude'],
    scene: 'kids',
    depth: 'light',
    source: 'Inspired by social-emotional learning and compliment exercises for children'
  },
  {
    id: 'kids-018',
    text: 'If you could build a treehouse with any three rooms, what would they be and what would you put in them?',
    mood: ['curious', 'energized'],
    direction: ['creativity'],
    scene: 'kids',
    depth: 'light',
    source: 'Based on creative visualization and spatial thinking in child development'
  },
  {
    id: 'kids-019',
    text: 'Write about a time you tried something new and it was scary at first. What happened when you did it anyway?',
    mood: ['reflective', 'energized'],
    direction: ['self-discovery', 'healing'],
    scene: 'kids',
    depth: 'medium',
    source: 'Inspired by courage and resilience-building research in positive youth development'
  },
  {
    id: 'kids-020',
    text: 'What is your favorite thing to do with your family? Why does it make you happy?',
    mood: ['grateful', 'energized'],
    direction: ['relationships', 'gratitude'],
    scene: 'kids',
    depth: 'light',
    source: 'Based on family bonding and attachment security research'
  },
  {
    id: 'kids-021',
    text: 'If you could make one rule that everyone in the world had to follow, what would it be?',
    mood: ['curious', 'energized'],
    direction: ['creativity', 'self-discovery'],
    scene: 'kids',
    depth: 'medium',
    source: 'Inspired by moral reasoning development research by Lawrence Kohlberg'
  },
  {
    id: 'kids-022',
    text: 'Draw or describe your own imaginary creature. What does it eat? Where does it live? What special powers does it have?',
    mood: ['energized', 'curious'],
    direction: ['creativity'],
    scene: 'kids',
    depth: 'light',
    source: 'Based on divergent thinking and creative expression in child art therapy'
  },
  {
    id: 'kids-023',
    text: 'Think about a time someone helped you when you needed it. How can you help someone else this week?',
    mood: ['grateful', 'reflective'],
    direction: ['relationships', 'gratitude'],
    scene: 'kids',
    depth: 'medium',
    source: 'Inspired by reciprocity and prosocial behavior in developmental psychology'
  },
  {
    id: 'kids-024',
    text: 'What is one thing you would like to get better at? What is one small step you can take to practice?',
    mood: ['reflective', 'energized'],
    direction: ['goal-setting', 'self-discovery'],
    scene: 'kids',
    depth: 'medium',
    source: 'Based on growth mindset and incremental learning by Dr. Carol Dweck'
  },
  {
    id: 'kids-025',
    text: 'Write about the weather outside right now. If your mood were weather, would it match or be different?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'kids',
    depth: 'medium',
    source: 'Inspired by emotion metaphors in child-friendly therapeutic approaches'
  },
  {
    id: 'kids-026',
    text: 'What is your favorite thing about being the age you are right now?',
    mood: ['energized', 'grateful'],
    direction: ['gratitude', 'self-discovery'],
    scene: 'kids',
    depth: 'light',
    source: 'Based on positive age identity research in developmental psychology'
  },
  {
    id: 'kids-027',
    text: 'If you could go anywhere in the world, where would you go and who would you take with you?',
    mood: ['curious', 'energized'],
    direction: ['creativity', 'relationships'],
    scene: 'kids',
    depth: 'light',
    source: 'Inspired by aspirational thinking and social connectedness in children'
  },
  {
    id: 'kids-028',
    text: 'Write about something that was hard for you at first but got easier with practice. How did that feel?',
    mood: ['reflective', 'energized'],
    direction: ['self-discovery', 'goal-setting'],
    scene: 'kids',
    depth: 'medium',
    source: 'Based on self-efficacy development research by Albert Bandura'
  },
  {
    id: 'kids-029',
    text: 'What makes a great day for you? Describe your perfect morning, afternoon, and evening.',
    mood: ['energized', 'curious'],
    direction: ['creativity', 'self-discovery'],
    scene: 'kids',
    depth: 'light',
    source: 'Inspired by well-being assessment tools adapted for children'
  },
  {
    id: 'kids-030',
    text: 'If you could send a message to every kid in the world, what would you say? Why is that message important?',
    mood: ['reflective', 'energized'],
    direction: ['creativity', 'self-discovery'],
    scene: 'kids',
    depth: 'deep',
    source: 'Based on values articulation and empathy exercises in child psychology'
  },

  // ============================================================
  // DAILY (dail-016 to dail-030)
  // ============================================================
  {
    id: 'dail-016',
    text: 'What was one unexpected moment today — something you did not plan for? How did you respond?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'daily',
    depth: 'light',
    source: 'Based on adaptive coping and spontaneity research in positive psychology'
  },
  {
    id: 'dail-017',
    text: 'Write about something you noticed today that you normally walk right past. Why did it catch your attention this time?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'daily',
    depth: 'light',
    source: 'Inspired by mindful observation and attention research by Dr. Ellen Langer'
  },
  {
    id: 'dail-018',
    text: 'What is one interaction from today that you could have handled better? How would you redo it?',
    mood: ['reflective', 'stuck'],
    direction: ['relationships', 'self-discovery'],
    scene: 'daily',
    depth: 'medium',
    source: 'Based on reflective practice and interpersonal effectiveness skills in DBT'
  },
  {
    id: 'dail-019',
    text: 'If today had a theme song, what would it be? What about the day inspires that choice?',
    mood: ['reflective', 'energized'],
    direction: ['creativity', 'self-discovery'],
    scene: 'daily',
    depth: 'light',
    source: 'Inspired by expressive arts and mood exploration techniques'
  },
  {
    id: 'dail-020',
    text: 'What did you eat today? Write about one meal mindfully — the taste, texture, and how it made you feel.',
    mood: ['reflective', 'grateful'],
    direction: ['gratitude', 'self-discovery'],
    scene: 'daily',
    depth: 'light',
    source: 'Based on mindful eating and daily awareness practices by Dr. Jan Chozen Bays'
  },
  {
    id: 'dail-021',
    text: 'What is one thing you accomplished today that deserves recognition, even if no one else noticed?',
    mood: ['reflective', 'energized'],
    direction: ['self-discovery', 'gratitude'],
    scene: 'daily',
    depth: 'light',
    source: 'Inspired by self-acknowledgment exercises in positive psychology'
  },
  {
    id: 'dail-022',
    text: 'Describe the general pace of your day. Was it rushed, slow, balanced? What would your ideal pace look like?',
    mood: ['reflective'],
    direction: ['self-discovery', 'goal-setting'],
    scene: 'daily',
    depth: 'medium',
    source: 'Based on time perception and life pace research by Robert Levine'
  },
  {
    id: 'dail-023',
    text: 'What is one small thing you could do differently tomorrow to make your day even slightly better?',
    mood: ['reflective', 'energized'],
    direction: ['goal-setting'],
    scene: 'daily',
    depth: 'light',
    source: 'Inspired by kaizen philosophy and micro-improvement research'
  },
  {
    id: 'dail-024',
    text: 'Who occupied your thoughts most today? What does that tell you about what matters to you right now?',
    mood: ['reflective', 'curious'],
    direction: ['relationships', 'self-discovery'],
    scene: 'daily',
    depth: 'medium',
    source: 'Based on cognitive rumination and mental occupancy research'
  },
  {
    id: 'dail-025',
    text: 'Did anything frustrate you today? Instead of rehashing the frustration, write about what it revealed about your needs.',
    mood: ['reflective', 'restless'],
    direction: ['self-discovery', 'healing'],
    scene: 'daily',
    depth: 'medium',
    source: 'Inspired by needs-based perspective in Nonviolent Communication by Marshall Rosenberg'
  },
  {
    id: 'dail-026',
    text: 'Write about your commute or a walk you took today. What did you see, think, or feel along the way?',
    mood: ['reflective'],
    direction: ['self-discovery'],
    scene: 'daily',
    depth: 'light',
    source: 'Based on movement and reflective journaling practices'
  },
  {
    id: 'dail-027',
    text: 'What is one thing you said yes to today that aligned with your values? What is one thing you wish you had said no to?',
    mood: ['reflective', 'stuck'],
    direction: ['self-discovery', 'goal-setting'],
    scene: 'daily',
    depth: 'deep',
    source: 'Inspired by values-congruent living in Acceptance and Commitment Therapy'
  },
  {
    id: 'dail-028',
    text: 'Rate your energy at three points today: morning, midday, and evening. What patterns do you see?',
    mood: ['reflective'],
    direction: ['self-discovery'],
    scene: 'daily',
    depth: 'medium',
    source: 'Based on circadian rhythm and personal energy management research'
  },
  {
    id: 'dail-029',
    text: 'What is one thing that made you laugh or smile today, even if it was fleeting?',
    mood: ['grateful', 'energized'],
    direction: ['gratitude'],
    scene: 'daily',
    depth: 'light',
    source: 'Inspired by positive emotion tracking in broaden-and-build theory by Dr. Barbara Fredrickson'
  },
  {
    id: 'dail-030',
    text: 'If you could send a one-sentence message to yourself at the start of today, knowing everything you know now, what would it be?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'daily',
    depth: 'deep',
    source: 'Based on hindsight reflection and self-advice research in cognitive psychology'
  },

  // ============================================================
  // TEENS (teen-016 to teen-030)
  // ============================================================
  {
    id: 'teen-016',
    text: 'What is one thing you believe about yourself that might not actually be true? Where did that belief come from?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery', 'healing'],
    scene: 'teens',
    depth: 'deep',
    source: 'Based on cognitive distortions and belief examination in CBT for adolescents'
  },
  {
    id: 'teen-017',
    text: 'Describe a moment when you felt caught between what your friends wanted and what felt right to you. What did you do?',
    mood: ['stuck', 'reflective'],
    direction: ['self-discovery', 'relationships'],
    scene: 'teens',
    depth: 'medium',
    source: 'Inspired by moral courage and peer influence research by Steinberg & Monahan'
  },
  {
    id: 'teen-018',
    text: 'What does your ideal weekend look like when there is zero pressure from school, parents, or friends?',
    mood: ['curious', 'energized'],
    direction: ['self-discovery'],
    scene: 'teens',
    depth: 'light',
    source: 'Based on leisure identity and intrinsic motivation research in adolescence'
  },
  {
    id: 'teen-019',
    text: 'Write about a time you felt genuinely confident — not performing confidence, but truly feeling it. What was different?',
    mood: ['reflective', 'energized'],
    direction: ['self-discovery'],
    scene: 'teens',
    depth: 'medium',
    source: 'Inspired by authentic self-esteem research by Dr. Michael Kernis'
  },
  {
    id: 'teen-020',
    text: 'If you could change one thing about how your generation is perceived by adults, what would it be and why?',
    mood: ['restless', 'reflective'],
    direction: ['self-discovery', 'relationships'],
    scene: 'teens',
    depth: 'medium',
    source: 'Based on generational identity and intergenerational understanding research'
  },
  {
    id: 'teen-021',
    text: 'What is one thing you are afraid to try because you might not be good at it? What if being bad at it was okay?',
    mood: ['anxious', 'curious'],
    direction: ['self-discovery', 'goal-setting'],
    scene: 'teens',
    depth: 'medium',
    source: 'Inspired by growth mindset and fear of failure research by Dr. Carol Dweck'
  },
  {
    id: 'teen-022',
    text: 'Who in your life makes you feel most like yourself? What is it about them that allows you to let your guard down?',
    mood: ['reflective', 'grateful'],
    direction: ['relationships', 'self-discovery'],
    scene: 'teens',
    depth: 'medium',
    source: 'Based on relational authenticity research in adolescent friendships'
  },
  {
    id: 'teen-023',
    text: 'Describe your relationship with school right now in one metaphor (a race, a maze, a rollercoaster). Why that image?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery', 'creativity'],
    scene: 'teens',
    depth: 'light',
    source: 'Inspired by metaphor use in narrative therapy for adolescents'
  },
  {
    id: 'teen-024',
    text: 'What is one habit you have picked up from someone you admire? How has it changed you?',
    mood: ['reflective', 'grateful'],
    direction: ['self-discovery', 'relationships'],
    scene: 'teens',
    depth: 'light',
    source: 'Based on observational learning and role model influence by Albert Bandura'
  },
  {
    id: 'teen-025',
    text: 'Write about a time you felt misunderstood. What did you wish the other person knew?',
    mood: ['sad', 'reflective'],
    direction: ['healing', 'relationships'],
    scene: 'teens',
    depth: 'deep',
    source: 'Inspired by empathic failure and repair research in adolescent psychology'
  },
  {
    id: 'teen-026',
    text: 'What kind of adult do you want to become? Not career-wise — what kind of person?',
    mood: ['curious', 'reflective'],
    direction: ['self-discovery', 'goal-setting'],
    scene: 'teens',
    depth: 'deep',
    source: 'Based on possible selves and identity projection in developmental psychology'
  },
  {
    id: 'teen-027',
    text: 'How do you recharge when everything feels like too much? Is your current method actually restoring you?',
    mood: ['restless', 'reflective'],
    direction: ['healing', 'self-discovery'],
    scene: 'teens',
    depth: 'medium',
    source: 'Inspired by recovery and restoration research in adolescent well-being'
  },
  {
    id: 'teen-028',
    text: 'What is something you used to enjoy as a kid that you have stopped doing? Would picking it back up bring you joy?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery', 'creativity'],
    scene: 'teens',
    depth: 'light',
    source: 'Based on play deprivation and adolescent well-being research by Dr. Stuart Brown'
  },
  {
    id: 'teen-029',
    text: 'Name three things you are proud of about yourself that have nothing to do with achievement or grades.',
    mood: ['reflective', 'energized'],
    direction: ['self-discovery'],
    scene: 'teens',
    depth: 'medium',
    source: 'Inspired by intrinsic worth and self-esteem research by Dr. Nathaniel Branden'
  },
  {
    id: 'teen-030',
    text: 'If you could sit down with your 10-year-old self, what would that version of you think about your life now?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'teens',
    depth: 'deep',
    source: 'Based on self-continuity and identity coherence research by Hal Hershfield'
  },

  // ============================================================
  // SELF-DISCOVERY (disc-016 to disc-030)
  // ============================================================
  {
    id: 'disc-016',
    text: 'What is a part of your personality that only comes out in specific situations? When does it emerge, and how does it feel?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'self-discovery',
    depth: 'medium',
    source: 'Based on situational personality expression research by Walter Mischel'
  },
  {
    id: 'disc-017',
    text: 'Describe the difference between who you are when you are alone and who you are in a group. Which version feels more authentic?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'self-discovery',
    depth: 'deep',
    source: 'Inspired by self-monitoring and authenticity research by Mark Snyder'
  },
  {
    id: 'disc-018',
    text: 'What is one thing you have never told anyone — not because it is shameful, but because you never found the right words?',
    mood: ['reflective', 'stuck'],
    direction: ['self-discovery', 'creativity'],
    scene: 'self-discovery',
    depth: 'deep',
    source: 'Based on expressive writing and disclosure research by Dr. James Pennebaker'
  },
  {
    id: 'disc-019',
    text: 'If you could master any skill overnight, what would it be? What does that choice reveal about your hidden priorities?',
    mood: ['curious', 'energized'],
    direction: ['self-discovery', 'goal-setting'],
    scene: 'self-discovery',
    depth: 'light',
    source: 'Inspired by aspiration mapping in life design by Bill Burnett & Dave Evans'
  },
  {
    id: 'disc-020',
    text: 'Write about a compliment you received that surprised you. Why was it unexpected, and do you believe it?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'self-discovery',
    depth: 'medium',
    source: 'Based on self-concept discrepancy and feedback reception research'
  },
  {
    id: 'disc-021',
    text: 'What emotion do you experience most often in a typical week? Is it the emotion you would choose if you could?',
    mood: ['reflective'],
    direction: ['self-discovery'],
    scene: 'self-discovery',
    depth: 'medium',
    source: 'Inspired by desired affect research by Jeanne Tsai at Stanford'
  },
  {
    id: 'disc-022',
    text: 'Describe a recurring dream or daydream you have. What themes keep appearing, and what might they mean?',
    mood: ['curious', 'reflective'],
    direction: ['self-discovery', 'creativity'],
    scene: 'self-discovery',
    depth: 'deep',
    source: 'Based on dream analysis and unconscious wish-fulfillment theory by Carl Jung'
  },
  {
    id: 'disc-023',
    text: 'What is one opinion you are afraid to voice out loud? What do you think would happen if you did?',
    mood: ['reflective', 'anxious'],
    direction: ['self-discovery'],
    scene: 'self-discovery',
    depth: 'deep',
    source: 'Inspired by spiral of silence theory and courage research by Elisabeth Noelle-Neumann'
  },
  {
    id: 'disc-024',
    text: 'Write about a contradiction in your personality — something that seems like it should not coexist but does. How do you hold both?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'self-discovery',
    depth: 'medium',
    source: 'Based on dialectical thinking and self-complexity research by Patricia Linville'
  },
  {
    id: 'disc-025',
    text: 'What is one habit you do daily that you think defines you more than you realize?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'self-discovery',
    depth: 'light',
    source: 'Inspired by identity-habit connection research by James Clear and Wendy Wood'
  },
  {
    id: 'disc-026',
    text: 'If you could live in any era of history, which would you choose? What about it calls to you?',
    mood: ['curious', 'energized'],
    direction: ['self-discovery', 'creativity'],
    scene: 'self-discovery',
    depth: 'light',
    source: 'Based on temporal self and nostalgia research by Dr. Constantine Sedikides'
  },
  {
    id: 'disc-027',
    text: 'What is the most difficult truth you have had to accept about yourself? How did accepting it change you?',
    mood: ['reflective', 'sad'],
    direction: ['self-discovery', 'healing'],
    scene: 'self-discovery',
    depth: 'deep',
    source: 'Inspired by radical acceptance and self-confrontation in existential therapy'
  },
  {
    id: 'disc-028',
    text: 'Write about a moment when you surprised yourself — when you acted in a way you did not expect. What prompted it?',
    mood: ['curious', 'reflective'],
    direction: ['self-discovery'],
    scene: 'self-discovery',
    depth: 'medium',
    source: 'Based on behavioral discrepancy and self-knowledge research'
  },
  {
    id: 'disc-029',
    text: 'What is one question you wish someone would ask you? Write both the question and your honest answer.',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery', 'relationships'],
    scene: 'self-discovery',
    depth: 'medium',
    source: 'Inspired by therapeutic questioning and relational depth research'
  },
  {
    id: 'disc-030',
    text: 'If your life had a recurring theme — a lesson that keeps showing up in different forms — what would it be?',
    mood: ['reflective'],
    direction: ['self-discovery'],
    scene: 'self-discovery',
    depth: 'deep',
    source: 'Based on narrative identity and life theme research by Dr. Dan McAdams'
  },

  // ============================================================
  // SELF-LOVE (love-016 to love-030)
  // ============================================================
  {
    id: 'love-016',
    text: 'What boundary have you set recently that was hard but necessary? How do you feel about holding it?',
    mood: ['reflective', 'energized'],
    direction: ['self-discovery', 'healing'],
    scene: 'self-love',
    depth: 'medium',
    source: 'Based on boundary-setting and self-respect research by Dr. Henry Cloud'
  },
  {
    id: 'love-017',
    text: 'Write about a scar — physical or emotional — and the strength it represents rather than the pain it caused.',
    mood: ['reflective', 'sad'],
    direction: ['healing', 'self-discovery'],
    scene: 'self-love',
    depth: 'deep',
    source: 'Inspired by post-traumatic growth and meaning-making research by Tedeschi & Calhoun'
  },
  {
    id: 'love-018',
    text: 'What is something you do well that you rarely give yourself credit for?',
    mood: ['reflective', 'grateful'],
    direction: ['self-discovery', 'gratitude'],
    scene: 'self-love',
    depth: 'light',
    source: 'Based on self-recognition and positive self-appraisal research'
  },
  {
    id: 'love-019',
    text: 'Imagine your wisest, most loving future self. What advice would they give you about how you are treating yourself right now?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery', 'healing'],
    scene: 'self-love',
    depth: 'deep',
    source: 'Inspired by compassionate future self visualization in positive psychology'
  },
  {
    id: 'love-020',
    text: 'List five things you are grateful for about your mind — not your body, not your achievements, just how your mind works.',
    mood: ['grateful', 'reflective'],
    direction: ['gratitude', 'self-discovery'],
    scene: 'self-love',
    depth: 'light',
    source: 'Based on cognitive gratitude and mental appreciation exercises'
  },
  {
    id: 'love-021',
    text: 'What is one way you have grown in the past year that you have not acknowledged yet? Acknowledge it now.',
    mood: ['reflective', 'energized'],
    direction: ['self-discovery'],
    scene: 'self-love',
    depth: 'medium',
    source: 'Inspired by personal growth tracking in humanistic psychology by Abraham Maslow'
  },
  {
    id: 'love-022',
    text: 'Write about a time you chose rest over productivity. Did guilt show up? What do you believe about your worthiness when you rest?',
    mood: ['reflective', 'stuck'],
    direction: ['healing', 'self-discovery'],
    scene: 'self-love',
    depth: 'deep',
    source: 'Based on rest as resistance and productivity guilt research by Tricia Hersey'
  },
  {
    id: 'love-023',
    text: 'What would change in your life if you truly believed you were enough — right now, as you are?',
    mood: ['reflective', 'curious'],
    direction: ['healing', 'self-discovery'],
    scene: 'self-love',
    depth: 'deep',
    source: 'Inspired by enoughness and self-worth research by Dr. Brene Brown'
  },
  {
    id: 'love-024',
    text: 'Write a short list of things that make you feel beautiful, powerful, or alive. Read it back to yourself slowly.',
    mood: ['energized', 'grateful'],
    direction: ['self-discovery'],
    scene: 'self-love',
    depth: 'light',
    source: 'Based on positive self-inventory exercises in strengths-based therapy'
  },
  {
    id: 'love-025',
    text: 'When did you last say no without explaining or apologizing? How does it feel to protect your energy?',
    mood: ['reflective', 'energized'],
    direction: ['self-discovery', 'healing'],
    scene: 'self-love',
    depth: 'medium',
    source: 'Inspired by assertiveness training and self-advocacy research'
  },
  {
    id: 'love-026',
    text: 'Describe a part of your personality that you used to dislike but have come to appreciate. What shifted?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'self-love',
    depth: 'medium',
    source: 'Based on self-acceptance trajectory research in lifespan psychology'
  },
  {
    id: 'love-027',
    text: 'Write yourself a permission slip for something you need but keep denying yourself. Be specific.',
    mood: ['reflective', 'sad'],
    direction: ['healing'],
    scene: 'self-love',
    depth: 'medium',
    source: 'Inspired by permission and self-authorization concepts in Gestalt therapy'
  },
  {
    id: 'love-028',
    text: 'How do you show love to the people you care about? Do you show that same quality of love to yourself?',
    mood: ['reflective'],
    direction: ['self-discovery', 'relationships'],
    scene: 'self-love',
    depth: 'medium',
    source: 'Based on love languages applied to self-love by Dr. Gary Chapman'
  },
  {
    id: 'love-029',
    text: 'What does your inner child need to hear from you today? Write them a short, tender note.',
    mood: ['reflective', 'sad'],
    direction: ['healing', 'self-discovery'],
    scene: 'self-love',
    depth: 'deep',
    source: 'Inspired by inner child healing practices in psychodynamic therapy'
  },
  {
    id: 'love-030',
    text: 'If self-love had a sound, what would it be? A song, a voice, a silence? Describe it and why it comforts you.',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery', 'creativity'],
    scene: 'self-love',
    depth: 'light',
    source: 'Based on sensory metaphor and self-compassion research'
  },

  // ============================================================
  // MINDFULNESS (mind-016 to mind-030)
  // ============================================================
  {
    id: 'mind-016',
    text: 'Place both feet flat on the ground. Notice the pressure, the temperature, the texture. Write about what you feel — physically and emotionally.',
    mood: ['reflective'],
    direction: ['self-discovery'],
    scene: 'mindfulness',
    depth: 'light',
    source: 'Based on grounding techniques in mindfulness-based stress reduction (MBSR)'
  },
  {
    id: 'mind-017',
    text: 'What is one task you did today on complete autopilot? Replay it in slow motion in your mind and describe each step.',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'mindfulness',
    depth: 'medium',
    source: 'Inspired by habitual automaticity disruption in mindfulness research by Dr. Ellen Langer'
  },
  {
    id: 'mind-018',
    text: 'Name an emotion you are carrying right now. Instead of labeling it good or bad, describe it as a sensation — weight, color, movement.',
    mood: ['reflective'],
    direction: ['self-discovery', 'healing'],
    scene: 'mindfulness',
    depth: 'medium',
    source: 'Based on affect labeling and emotional embodiment research by Dr. Matthew Lieberman'
  },
  {
    id: 'mind-019',
    text: 'Pick one object near you. Describe it as if you have never seen anything like it before. What do you discover?',
    mood: ['curious', 'reflective'],
    direction: ['self-discovery'],
    scene: 'mindfulness',
    depth: 'light',
    source: 'Inspired by beginner\'s mind concept in Zen mindfulness tradition (Shunryu Suzuki)'
  },
  {
    id: 'mind-020',
    text: 'What were your first three thoughts when you woke up this morning? Write them without judgment, then notice how they set your day\'s tone.',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'mindfulness',
    depth: 'medium',
    source: 'Based on morning cognition and mood-priming research'
  },
  {
    id: 'mind-021',
    text: 'Sit still for one minute and count how many different sounds you can hear. List them all, from loudest to softest.',
    mood: ['reflective'],
    direction: ['self-discovery'],
    scene: 'mindfulness',
    depth: 'light',
    source: 'Inspired by open monitoring meditation practice in MBSR'
  },
  {
    id: 'mind-022',
    text: 'Write about a recent moment when time seemed to slow down. What were you doing, and what made it feel spacious?',
    mood: ['reflective', 'grateful'],
    direction: ['self-discovery'],
    scene: 'mindfulness',
    depth: 'medium',
    source: 'Based on time perception and mindful awareness research'
  },
  {
    id: 'mind-023',
    text: 'Notice the space between your exhale and your next inhale. What lives in that pause? Write about what comes up.',
    mood: ['reflective'],
    direction: ['self-discovery', 'healing'],
    scene: 'mindfulness',
    depth: 'deep',
    source: 'Inspired by breath-gap meditation in contemplative psychology'
  },
  {
    id: 'mind-024',
    text: 'What physical sensation are you most aware of right now — warmth, tightness, tingling, comfort? Stay with it and describe its journey.',
    mood: ['reflective'],
    direction: ['self-discovery'],
    scene: 'mindfulness',
    depth: 'medium',
    source: 'Based on interoceptive awareness research by Dr. A.D. Craig'
  },
  {
    id: 'mind-025',
    text: 'Write about a conversation you had today as if you were an outside observer watching it unfold. What do you notice?',
    mood: ['reflective', 'curious'],
    direction: ['relationships', 'self-discovery'],
    scene: 'mindfulness',
    depth: 'medium',
    source: 'Inspired by decentering and observer-self exercises in metacognitive therapy'
  },
  {
    id: 'mind-026',
    text: 'Choose one color you can see around you right now. How many shades and variations of it can you find? Describe them.',
    mood: ['curious', 'reflective'],
    direction: ['self-discovery'],
    scene: 'mindfulness',
    depth: 'light',
    source: 'Based on visual mindfulness and attention training exercises'
  },
  {
    id: 'mind-027',
    text: 'Think of something you are worrying about. Now shift your attention to what is actually happening in this exact second. Write the contrast.',
    mood: ['anxious', 'reflective'],
    direction: ['healing'],
    scene: 'mindfulness',
    depth: 'deep',
    source: 'Inspired by present-moment focus in mindfulness-based cognitive therapy (MBCT)'
  },
  {
    id: 'mind-028',
    text: 'Describe the quality of light in your current surroundings. Is it warm, cool, harsh, gentle? How does it affect your mood?',
    mood: ['reflective'],
    direction: ['self-discovery'],
    scene: 'mindfulness',
    depth: 'light',
    source: 'Based on environmental awareness and phototherapy research'
  },
  {
    id: 'mind-029',
    text: 'Write about your body as if it were a landscape — valleys of tension, rivers of breath, mountains of strength. What does the terrain look like today?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery', 'creativity'],
    scene: 'mindfulness',
    depth: 'deep',
    source: 'Inspired by somatic metaphor and embodied mindfulness practices'
  },
  {
    id: 'mind-030',
    text: 'What thought do you keep returning to today? Observe it like a cloud passing. Write it, then let the pen rest for a moment before continuing.',
    mood: ['reflective', 'anxious'],
    direction: ['healing', 'self-discovery'],
    scene: 'mindfulness',
    depth: 'medium',
    source: 'Based on thought observation and letting go exercises in ACT'
  },

  // ============================================================
  // MORNING (morn-016 to morn-030)
  // ============================================================
  {
    id: 'morn-016',
    text: 'Before the day pulls you in a hundred directions, ask yourself: what matters most to me today? Write the honest answer.',
    mood: ['reflective', 'energized'],
    direction: ['goal-setting', 'self-discovery'],
    scene: 'morning',
    depth: 'medium',
    source: 'Based on values-based priority setting in Acceptance and Commitment Therapy'
  },
  {
    id: 'morn-017',
    text: 'What emotion greeted you when you opened your eyes this morning? Give it a name and a reason.',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'morning',
    depth: 'light',
    source: 'Inspired by morning emotional check-in practices in clinical psychology'
  },
  {
    id: 'morn-018',
    text: 'Write about one person you will interact with today. How do you want to show up for them?',
    mood: ['reflective', 'energized'],
    direction: ['relationships', 'goal-setting'],
    scene: 'morning',
    depth: 'medium',
    source: 'Based on interpersonal intention-setting and relational mindfulness research'
  },
  {
    id: 'morn-019',
    text: 'What is one worry about today that you can set down — even temporarily — while you enjoy this quiet morning moment?',
    mood: ['anxious', 'reflective'],
    direction: ['healing'],
    scene: 'morning',
    depth: 'light',
    source: 'Inspired by worry postponement technique in CBT for generalized anxiety'
  },
  {
    id: 'morn-020',
    text: 'Describe the first things you see, hear, and smell right now. Start your day anchored in what is real and present.',
    mood: ['reflective'],
    direction: ['self-discovery'],
    scene: 'morning',
    depth: 'light',
    source: 'Based on sensory grounding in morning mindfulness routines'
  },
  {
    id: 'morn-021',
    text: 'What is one lesson yesterday taught you that you want to carry into today?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery', 'goal-setting'],
    scene: 'morning',
    depth: 'medium',
    source: 'Inspired by reflective learning and daily integration practices'
  },
  {
    id: 'morn-022',
    text: 'If today were a gift you were giving to yourself, how would you unwrap it? What would you make time for?',
    mood: ['energized', 'curious'],
    direction: ['creativity', 'self-discovery'],
    scene: 'morning',
    depth: 'medium',
    source: 'Based on experiential savoring and anticipation research by Fred Bryant'
  },
  {
    id: 'morn-023',
    text: 'Write one sentence to set the tone for your entire day. Make it something you genuinely believe.',
    mood: ['energized'],
    direction: ['goal-setting'],
    scene: 'morning',
    depth: 'light',
    source: 'Inspired by affirmation and priming research in cognitive psychology'
  },
  {
    id: 'morn-024',
    text: 'What is one thing you can let be imperfect today without it ruining anything? Name it and give yourself that freedom.',
    mood: ['reflective', 'anxious'],
    direction: ['healing', 'self-discovery'],
    scene: 'morning',
    depth: 'medium',
    source: 'Based on perfectionism intervention and self-compassion research by Dr. Kristin Neff'
  },
  {
    id: 'morn-025',
    text: 'Picture the best possible version of today. Not perfect — just good. What makes it good?',
    mood: ['energized', 'reflective'],
    direction: ['goal-setting', 'self-discovery'],
    scene: 'morning',
    depth: 'light',
    source: 'Inspired by best possible self exercise by Laura King in positive psychology'
  },
  {
    id: 'morn-026',
    text: 'What is your body asking for today — more movement, more rest, more nourishment, more stillness?',
    mood: ['reflective'],
    direction: ['self-discovery', 'healing'],
    scene: 'morning',
    depth: 'medium',
    source: 'Based on interoceptive awareness and somatic needs assessment research'
  },
  {
    id: 'morn-027',
    text: 'Who or what are you grateful for this morning? Send that gratitude out, even if only in your mind.',
    mood: ['grateful', 'energized'],
    direction: ['gratitude', 'relationships'],
    scene: 'morning',
    depth: 'light',
    source: 'Inspired by loving-kindness meditation and morning gratitude rituals'
  },
  {
    id: 'morn-028',
    text: 'What is one way you can be a little kinder to yourself today than you were yesterday?',
    mood: ['reflective'],
    direction: ['healing', 'self-discovery'],
    scene: 'morning',
    depth: 'medium',
    source: 'Based on incremental self-compassion practices by Dr. Kristin Neff'
  },
  {
    id: 'morn-029',
    text: 'Write about something you are looking forward to this week. Let the anticipation energize you.',
    mood: ['energized', 'grateful'],
    direction: ['gratitude', 'goal-setting'],
    scene: 'morning',
    depth: 'light',
    source: 'Inspired by anticipatory pleasure and positive future focus research'
  },
  {
    id: 'morn-030',
    text: 'What is one courageous thing — big or small — you could do today that your future self would thank you for?',
    mood: ['energized', 'reflective'],
    direction: ['goal-setting', 'self-discovery'],
    scene: 'morning',
    depth: 'deep',
    source: 'Based on courage and future self continuity research by Hal Hershfield'
  },

  // ============================================================
  // FUN (fun-016 to fun-030)
  // ============================================================
  {
    id: 'fun-016',
    text: 'You are now the host of a talk show. Who are your first three guests and what is the first question you ask each one?',
    mood: ['energized', 'curious'],
    direction: ['creativity'],
    scene: 'fun',
    depth: 'light',
    source: 'Inspired by perspective-taking and creative scenario exercises'
  },
  {
    id: 'fun-017',
    text: 'Write a haiku about your morning so far. Remember: 5-7-5 syllables. Then write one about your mood.',
    mood: ['curious', 'reflective'],
    direction: ['creativity', 'self-discovery'],
    scene: 'fun',
    depth: 'medium',
    source: 'Based on constrained creativity and poetic expression research'
  },
  {
    id: 'fun-018',
    text: 'If your life were a video game, what would the current level be called? What is the boss you are trying to defeat?',
    mood: ['energized', 'curious'],
    direction: ['creativity', 'self-discovery'],
    scene: 'fun',
    depth: 'medium',
    source: 'Inspired by gamification and metaphor-based self-reflection exercises'
  },
  {
    id: 'fun-019',
    text: 'You find a magic door in your house that leads somewhere new every time you open it. Describe the first three places it takes you.',
    mood: ['curious', 'energized'],
    direction: ['creativity'],
    scene: 'fun',
    depth: 'light',
    source: 'Based on imagination and divergent thinking exercises in creative writing'
  },
  {
    id: 'fun-020',
    text: 'Write a one-star and a five-star review of your week. Make both dramatic.',
    mood: ['energized', 'reflective'],
    direction: ['creativity', 'self-discovery'],
    scene: 'fun',
    depth: 'medium',
    source: 'Inspired by perspective-shifting humor and reflective writing'
  },
  {
    id: 'fun-021',
    text: 'If you had to describe yourself using only items found in a kitchen, what would you be and why?',
    mood: ['curious', 'energized'],
    direction: ['creativity', 'self-discovery'],
    scene: 'fun',
    depth: 'light',
    source: 'Based on metaphorical thinking and creative self-expression exercises'
  },
  {
    id: 'fun-022',
    text: 'Invent a new word for a feeling that does not have a name yet. Define it and use it in a sentence.',
    mood: ['curious', 'energized'],
    direction: ['creativity'],
    scene: 'fun',
    depth: 'medium',
    source: 'Inspired by emotional granularity and neologism exercises in creative writing'
  },
  {
    id: 'fun-023',
    text: 'You wake up tomorrow and discover you are famous. What are you famous for? How did it happen?',
    mood: ['energized', 'curious'],
    direction: ['creativity'],
    scene: 'fun',
    depth: 'light',
    source: 'Based on aspirational fantasy and narrative imagination research'
  },
  {
    id: 'fun-024',
    text: 'Write a fortune cookie message for yourself, your best friend, and your future self.',
    mood: ['curious', 'energized'],
    direction: ['creativity', 'relationships'],
    scene: 'fun',
    depth: 'light',
    source: 'Inspired by brief wisdom writing and perspective-taking exercises'
  },
  {
    id: 'fun-025',
    text: 'If you could combine any two animals into one new creature, what would you create? Describe its personality and habitat.',
    mood: ['energized', 'curious'],
    direction: ['creativity'],
    scene: 'fun',
    depth: 'light',
    source: 'Based on combinatorial creativity and playful ideation research'
  },
  {
    id: 'fun-026',
    text: 'Describe your personality as a weather forecast. Are there storms expected? A warm front moving in?',
    mood: ['reflective', 'energized'],
    direction: ['creativity', 'self-discovery'],
    scene: 'fun',
    depth: 'medium',
    source: 'Inspired by metaphor therapy and creative self-assessment exercises'
  },
  {
    id: 'fun-027',
    text: 'You are writing a guidebook to your city or neighborhood for aliens visiting Earth. What are the three must-see attractions?',
    mood: ['energized', 'curious'],
    direction: ['creativity'],
    scene: 'fun',
    depth: 'light',
    source: 'Based on defamiliarization technique in creative writing'
  },
  {
    id: 'fun-028',
    text: 'If your emotions today were characters at a dinner party, who would be there and how would they interact?',
    mood: ['reflective', 'curious'],
    direction: ['creativity', 'self-discovery'],
    scene: 'fun',
    depth: 'deep',
    source: 'Inspired by Internal Family Systems parts work adapted as a creative exercise'
  },
  {
    id: 'fun-029',
    text: 'Write a short acceptance speech for an award you just made up. What are you being honored for?',
    mood: ['energized', 'curious'],
    direction: ['creativity', 'self-discovery'],
    scene: 'fun',
    depth: 'medium',
    source: 'Based on positive visualization and self-celebration exercises'
  },
  {
    id: 'fun-030',
    text: 'Create a menu for a restaurant that only serves dishes based on your memories. Name and describe three signature plates.',
    mood: ['curious', 'reflective'],
    direction: ['creativity', 'self-discovery'],
    scene: 'fun',
    depth: 'deep',
    source: 'Inspired by sensory memory and creative autobiographical exercises'
  },

  // ============================================================
  // DEEP (deep-016 to deep-030)
  // ============================================================
  {
    id: 'deep-016',
    text: 'What conversation with a deceased loved one do you wish you could still have? Write it out — both sides.',
    mood: ['sad', 'reflective'],
    direction: ['healing', 'relationships'],
    scene: 'deep',
    depth: 'deep',
    source: 'Based on continuing bonds theory in grief research by Dennis Klass'
  },
  {
    id: 'deep-017',
    text: 'What is the loneliest version of yourself, and when does it appear? What does it need that you are not giving it?',
    mood: ['sad', 'reflective'],
    direction: ['self-discovery', 'healing'],
    scene: 'deep',
    depth: 'deep',
    source: 'Inspired by loneliness and social disconnection research by Dr. John Cacioppo'
  },
  {
    id: 'deep-018',
    text: 'Write about a choice you made that disappointed someone you love. Was it still the right choice? How do you carry both truths?',
    mood: ['reflective', 'sad'],
    direction: ['self-discovery', 'relationships'],
    scene: 'deep',
    depth: 'deep',
    source: 'Based on moral injury and ethical decision-making research'
  },
  {
    id: 'deep-019',
    text: 'If you could un-learn one thing, what would it be? How has that learned belief shaped the architecture of your life?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery', 'healing'],
    scene: 'deep',
    depth: 'deep',
    source: 'Inspired by belief revision and schema change in cognitive therapy'
  },
  {
    id: 'deep-020',
    text: 'What do you think happens when we die? Not what you were taught — what you actually believe, right now, in this moment.',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'deep',
    depth: 'deep',
    source: 'Based on mortality salience and existential meaning research by Irvin Yalom'
  },
  {
    id: 'deep-021',
    text: 'Describe a moment when you felt completely alone even in a room full of people. What was missing?',
    mood: ['sad', 'reflective'],
    direction: ['self-discovery', 'healing'],
    scene: 'deep',
    depth: 'deep',
    source: 'Inspired by social vs. emotional loneliness distinction by Robert Weiss'
  },
  {
    id: 'deep-022',
    text: 'What is your relationship with silence? Do you seek it or avoid it? What shows up when everything goes quiet?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'deep',
    depth: 'medium',
    source: 'Based on silence and inner experience research in contemplative psychology'
  },
  {
    id: 'deep-023',
    text: 'Write about a version of yourself that you have outgrown. What does it feel like to leave that person behind?',
    mood: ['reflective', 'sad'],
    direction: ['self-discovery', 'healing'],
    scene: 'deep',
    depth: 'deep',
    source: 'Inspired by identity transition and narrative reconstruction by Dr. Dan McAdams'
  },
  {
    id: 'deep-024',
    text: 'If you could live the same day over and over until you got it right, which day would you choose and what would you change?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'deep',
    depth: 'medium',
    source: 'Based on counterfactual thinking and regret research by Dr. Neal Roese'
  },
  {
    id: 'deep-025',
    text: 'What is the hardest thing you have ever had to accept about someone you love? How has that acceptance changed you?',
    mood: ['sad', 'reflective'],
    direction: ['relationships', 'healing'],
    scene: 'deep',
    depth: 'deep',
    source: 'Inspired by unconditional acceptance and relational tolerance research'
  },
  {
    id: 'deep-026',
    text: 'Write about something you hunger for that has nothing to do with food. Name the craving and trace its origin.',
    mood: ['reflective', 'stuck'],
    direction: ['self-discovery'],
    scene: 'deep',
    depth: 'deep',
    source: 'Based on unmet psychological needs theory by Deci & Ryan'
  },
  {
    id: 'deep-027',
    text: 'What is the most courageous thing you have ever done — not physically brave, but emotionally vulnerable?',
    mood: ['reflective'],
    direction: ['self-discovery'],
    scene: 'deep',
    depth: 'medium',
    source: 'Inspired by vulnerability as courage research by Dr. Brene Brown'
  },
  {
    id: 'deep-028',
    text: 'If you could witness any moment in history — not to change it, just to understand it — what would you choose and why?',
    mood: ['curious', 'reflective'],
    direction: ['self-discovery'],
    scene: 'deep',
    depth: 'medium',
    source: 'Based on historical empathy and perspective-taking in moral development research'
  },
  {
    id: 'deep-029',
    text: 'Write about the space between who you are and who you are becoming. What lives in that gap?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'deep',
    depth: 'deep',
    source: 'Inspired by liminality and threshold concepts in existential psychology by Rollo May'
  },
  {
    id: 'deep-030',
    text: 'What have you sacrificed for love — romantic, familial, or otherwise? Was the trade worth it? How do you know?',
    mood: ['reflective', 'sad'],
    direction: ['relationships', 'self-discovery'],
    scene: 'deep',
    depth: 'deep',
    source: 'Based on sacrifice and relationship commitment research by Dr. Eli Finkel'
  },

  // ============================================================
  // MIDDLE SCHOOL (midd-016 to midd-030)
  // ============================================================
  {
    id: 'midd-016',
    text: 'If your mood right now were a song, what would the title be? Is it an upbeat bop or a slow jam?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery', 'creativity'],
    scene: 'middle-school',
    depth: 'light',
    source: 'Inspired by music and mood identification exercises in adolescent therapy'
  },
  {
    id: 'midd-017',
    text: 'What is something you know now that you wish you knew at the start of middle school?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'middle-school',
    depth: 'medium',
    source: 'Based on retrospective learning and self-advice in early adolescent development'
  },
  {
    id: 'midd-018',
    text: 'Write about a time someone stood up for you or you stood up for someone else at school. How did it change things?',
    mood: ['reflective', 'energized'],
    direction: ['relationships', 'self-discovery'],
    scene: 'middle-school',
    depth: 'medium',
    source: 'Inspired by bystander intervention and upstander research in schools'
  },
  {
    id: 'midd-019',
    text: 'What is the funniest thing that happened to you at school recently? Why did it crack you up?',
    mood: ['energized', 'curious'],
    direction: ['creativity'],
    scene: 'middle-school',
    depth: 'light',
    source: 'Based on humor and social bonding research in adolescent development'
  },
  {
    id: 'midd-020',
    text: 'Describe your dream hangout spot — the one place where you and your friends could go anytime. What is in it?',
    mood: ['energized', 'curious'],
    direction: ['creativity', 'relationships'],
    scene: 'middle-school',
    depth: 'light',
    source: 'Inspired by environmental preference and social space research in youth development'
  },
  {
    id: 'midd-021',
    text: 'What is one thing about yourself that people at school do not know but you wish they did?',
    mood: ['reflective', 'stuck'],
    direction: ['self-discovery'],
    scene: 'middle-school',
    depth: 'medium',
    source: 'Based on self-disclosure and authenticity needs in early adolescence'
  },
  {
    id: 'midd-022',
    text: 'How do you feel when you compare yourself to others online? Write honestly about one specific moment.',
    mood: ['reflective', 'anxious'],
    direction: ['self-discovery', 'healing'],
    scene: 'middle-school',
    depth: 'deep',
    source: 'Inspired by social comparison and digital well-being research in adolescence'
  },
  {
    id: 'midd-023',
    text: 'If you could have lunch with any person — real or fictional — who would it be and what would you ask them?',
    mood: ['curious', 'energized'],
    direction: ['creativity'],
    scene: 'middle-school',
    depth: 'light',
    source: 'Based on perspective-taking and aspirational thinking in youth development'
  },
  {
    id: 'midd-024',
    text: 'What is one goal you have for this school year that has nothing to do with grades? How will you work toward it?',
    mood: ['energized', 'reflective'],
    direction: ['goal-setting', 'self-discovery'],
    scene: 'middle-school',
    depth: 'medium',
    source: 'Inspired by intrinsic goal-setting research in adolescent motivation'
  },
  {
    id: 'midd-025',
    text: 'Write about a time you changed your mind about something important. What made you see it differently?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'middle-school',
    depth: 'medium',
    source: 'Based on cognitive flexibility and opinion formation in early adolescence'
  },
  {
    id: 'midd-026',
    text: 'What makes you a good friend? Give yourself credit for the ways you show up for the people you care about.',
    mood: ['reflective', 'grateful'],
    direction: ['relationships', 'self-discovery'],
    scene: 'middle-school',
    depth: 'light',
    source: 'Inspired by friendship quality and self-recognition research'
  },
  {
    id: 'midd-027',
    text: 'If you could redesign the school day from scratch, what would it look like? When would it start and end? What classes would exist?',
    mood: ['energized', 'curious'],
    direction: ['creativity', 'goal-setting'],
    scene: 'middle-school',
    depth: 'medium',
    source: 'Based on student voice and educational design thinking research'
  },
  {
    id: 'midd-028',
    text: 'Write about a time you felt really embarrassed. Looking back now, is it as big a deal as it felt at the time?',
    mood: ['reflective', 'anxious'],
    direction: ['healing', 'self-discovery'],
    scene: 'middle-school',
    depth: 'medium',
    source: 'Inspired by spotlight effect and social anxiety research in adolescence by Thomas Gilovich'
  },
  {
    id: 'midd-029',
    text: 'What is one thing you would tell a younger kid who is scared about starting middle school?',
    mood: ['reflective', 'energized'],
    direction: ['self-discovery', 'relationships'],
    scene: 'middle-school',
    depth: 'light',
    source: 'Based on mentoring and advice-giving as self-reflection research'
  },
  {
    id: 'midd-030',
    text: 'Think about something in the world that bothers you — unfairness, pollution, bullying. If you could take one action to change it, what would you do?',
    mood: ['reflective', 'energized'],
    direction: ['goal-setting', 'self-discovery'],
    scene: 'middle-school',
    depth: 'deep',
    source: 'Inspired by civic engagement and social justice orientation in early adolescence'
  },

  // ============================================================
  // HIGH SCHOOL (high-016 to high-030)
  // ============================================================
  {
    id: 'high-016',
    text: 'What is one thing you pretend to care about that you actually do not? What would happen if you stopped pretending?',
    mood: ['reflective', 'stuck'],
    direction: ['self-discovery'],
    scene: 'high-school',
    depth: 'deep',
    source: 'Based on false self and authenticity research in late adolescence by Donald Winnicott'
  },
  {
    id: 'high-017',
    text: 'Write about a time you made a decision entirely for yourself — not to please a teacher, parent, or friend. How did it feel?',
    mood: ['reflective', 'energized'],
    direction: ['self-discovery'],
    scene: 'high-school',
    depth: 'medium',
    source: 'Inspired by autonomy and self-determination research by Deci & Ryan'
  },
  {
    id: 'high-018',
    text: 'What does your inner voice sound like when you are under academic pressure? Is it encouraging or harsh? Write what it says.',
    mood: ['anxious', 'reflective'],
    direction: ['self-discovery', 'healing'],
    scene: 'high-school',
    depth: 'medium',
    source: 'Based on self-talk and academic stress research in adolescent psychology'
  },
  {
    id: 'high-019',
    text: 'Describe someone your age who you think is doing life "right." Now ask yourself: are you comparing or admiring? What is the difference?',
    mood: ['reflective', 'stuck'],
    direction: ['self-discovery'],
    scene: 'high-school',
    depth: 'deep',
    source: 'Inspired by upward social comparison and admiration research by Leon Festinger'
  },
  {
    id: 'high-020',
    text: 'What is one thing about your future that excites you and one that scares you? Can the same thing be both?',
    mood: ['curious', 'anxious'],
    direction: ['self-discovery', 'goal-setting'],
    scene: 'high-school',
    depth: 'medium',
    source: 'Based on ambivalence and future orientation research in adolescent development'
  },
  {
    id: 'high-021',
    text: 'Write about a teacher or class that changed how you think — not just what you know, but how you approach the world.',
    mood: ['reflective', 'grateful'],
    direction: ['relationships', 'self-discovery'],
    scene: 'high-school',
    depth: 'medium',
    source: 'Inspired by transformative learning and teacher impact research by Jack Mezirow'
  },
  {
    id: 'high-022',
    text: 'What is a part of high school culture that you think is unhealthy? How do you navigate it without losing yourself?',
    mood: ['reflective', 'restless'],
    direction: ['self-discovery', 'healing'],
    scene: 'high-school',
    depth: 'deep',
    source: 'Based on conformity pressure and identity maintenance research in adolescence'
  },
  {
    id: 'high-023',
    text: 'If you had a gap year with no strings attached, what would you do with it? Be as specific as possible.',
    mood: ['curious', 'energized'],
    direction: ['self-discovery', 'goal-setting'],
    scene: 'high-school',
    depth: 'light',
    source: 'Inspired by experiential learning and gap year benefit research'
  },
  {
    id: 'high-024',
    text: 'Write about a relationship — romantic or platonic — that taught you something important about yourself.',
    mood: ['reflective', 'curious'],
    direction: ['relationships', 'self-discovery'],
    scene: 'high-school',
    depth: 'medium',
    source: 'Based on relationship as mirror concept in adolescent identity formation'
  },
  {
    id: 'high-025',
    text: 'What promise do you want to make to your future self? Not a goal — a promise about how you will treat yourself.',
    mood: ['reflective', 'energized'],
    direction: ['self-discovery', 'healing'],
    scene: 'high-school',
    depth: 'deep',
    source: 'Inspired by self-commitment and future self research by Hal Hershfield'
  },
  {
    id: 'high-026',
    text: 'How do you handle disagreements with people you care about? Write about your style — do you fight, flee, freeze, or talk it through?',
    mood: ['reflective'],
    direction: ['relationships', 'self-discovery'],
    scene: 'high-school',
    depth: 'medium',
    source: 'Based on conflict resolution styles research by Kenneth Thomas & Ralph Kilmann'
  },
  {
    id: 'high-027',
    text: 'What is something you used to believe was the most important thing in the world that you now see differently?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery'],
    scene: 'high-school',
    depth: 'medium',
    source: 'Inspired by belief revision and cognitive development research in adolescence'
  },
  {
    id: 'high-028',
    text: 'If you could guarantee one outcome for your life, what would it be? Why that one above all others?',
    mood: ['reflective', 'curious'],
    direction: ['self-discovery', 'goal-setting'],
    scene: 'high-school',
    depth: 'deep',
    source: 'Based on terminal values and life priority research by Milton Rokeach'
  },
  {
    id: 'high-029',
    text: 'Write about a moment when you felt like you truly belonged somewhere. What made that sense of belonging possible?',
    mood: ['reflective', 'grateful'],
    direction: ['relationships', 'self-discovery'],
    scene: 'high-school',
    depth: 'medium',
    source: 'Inspired by belonging and mattering research by Dr. Gregory Walton'
  },
  {
    id: 'high-030',
    text: 'What is one piece of advice you would give to a freshman just starting high school? Why is that the most important thing to know?',
    mood: ['reflective', 'energized'],
    direction: ['self-discovery', 'relationships'],
    scene: 'high-school',
    depth: 'light',
    source: 'Based on peer mentoring and wisdom-sharing in adolescent development'
  }
];

// ============================================================
// Main script: read, merge, and write
// ============================================================

const existingData = JSON.parse(fs.readFileSync(PROMPTS_PATH, 'utf-8'));

// Validate no duplicate IDs
const existingIds = new Set(existingData.map(p => p.id));
const newIds = newPrompts.map(p => p.id);
const duplicates = newIds.filter(id => existingIds.has(id));
if (duplicates.length > 0) {
  console.error('ERROR: Duplicate IDs found:', duplicates.join(', '));
  process.exit(1);
}

// Validate all scenes covered
const sceneCounts = {};
newPrompts.forEach(p => {
  sceneCounts[p.scene] = (sceneCounts[p.scene] || 0) + 1;
});

const expectedScenes = [
  'gratitude', 'mental-health', 'shadow-work', 'kids', 'daily',
  'teens', 'self-discovery', 'self-love', 'mindfulness', 'morning',
  'fun', 'deep', 'middle-school', 'high-school'
];

let valid = true;
expectedScenes.forEach(scene => {
  const count = sceneCounts[scene] || 0;
  if (count !== 15) {
    console.error(`ERROR: Scene "${scene}" has ${count} new prompts (expected 15)`);
    valid = false;
  }
});

if (!valid) {
  process.exit(1);
}

// Merge and write
const merged = [...existingData, ...newPrompts];
fs.writeFileSync(PROMPTS_PATH, JSON.stringify(merged, null, 2) + '\n');

console.log(`SUCCESS: Added ${newPrompts.length} new prompts.`);
console.log(`Total prompts: ${existingData.length} existing + ${newPrompts.length} new = ${merged.length}`);
console.log('\nBreakdown by scene:');
const finalCounts = {};
merged.forEach(p => {
  finalCounts[p.scene] = (finalCounts[p.scene] || 0) + 1;
});
Object.keys(finalCounts).sort().forEach(scene => {
  console.log(`  ${scene}: ${finalCounts[scene]} prompts`);
});
