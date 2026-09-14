export interface SceneConfig {
  slug: string;
  promptScene: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  whyTitle: string;
  whyContent: string[];
  howToUse: string[];
  psychologySource: string;
  faqs: { question: string; answer: string }[];
  relatedScenes: string[];
  emoji: string;
  defaultMood?: string;
}

export const scenes: SceneConfig[] = [
  {
    slug: 'gratitude-journal-prompts',
    promptScene: 'gratitude',
    title: 'Gratitude',
    h1: 'Gratitude Journal Prompts',
    metaTitle: '30 Gratitude Journal Prompts for Daily Reflection',
    metaDescription:
      'Explore 30 gratitude journal prompts for everyday appreciation. Notice small moments, try a specific writing example, and start your own reflection for free.',
    heroSubtitle:
      'Notice a small kindness, a useful lesson, or an ordinary moment you appreciate. Choose a gratitude prompt and put the details into words.',
    whyTitle: 'Make Gratitude Journal Prompts Specific',
    whyContent: [
      'Gratitude journal prompts give you a place to record what you appreciate without needing an extraordinary day. A shared meal, a helpful message, or a few quiet minutes can each become a short entry. You can acknowledge a good moment while also writing honestly about a difficult day.',
      "Try moving from a broad statement to a particular memory: instead of 'I am grateful for my job,' write 'My colleague covered the meeting while I finished a difficult task.' Add what happened and why it mattered to you. These details make the entry something you can revisit.",
    ],
    howToUse: [
      "Choose a prompt that resonates with your current mood — don't force positivity if you're having a hard day.",
      'Try a few sentences or a short five-minute session. You can stop when you have said what you want to say.',
      "Be specific: instead of 'I'm grateful for my family,' describe a particular moment or gesture.",
      'Try the same prompt on different days to see how your perspective shifts over time.',
      'Consider ending your entry with one action step — a thank-you text, a kind gesture, or simply a pause to appreciate.',
    ],
    psychologySource:
      'Appreciation does not require forced positivity. If a question does not fit today, skip it or write about what would help instead.',
    faqs: [
      {
        question: 'How often should I write in a gratitude journal?',
        answer:
          'Choose a schedule you can return to, whether that is daily or a few times a week. If your answers start to feel automatic, choose a different prompt or describe a more specific moment. There is no required frequency for using this collection.',
      },
      {
        question: "What if I can't think of anything to be grateful for?",
        answer:
          'Look for something small that you actually noticed, such as a pleasant taste, a useful tool, or a kind message. You do not have to feel grateful on demand. If nothing fits today, write about what has been difficult or choose another kind of prompt.',
      },
      {
        question: 'Does gratitude journaling really work for mental health?',
        answer:
          'These prompts offer a way to record appreciation and reflect on your experiences. They do not promise a change in anxiety, depression, sleep, or other health outcomes. If you are looking for mental health treatment, speak with a qualified professional.',
      },
      {
        question: 'Can gratitude journaling replace therapy?',
        answer:
          'No. This collection is for personal reflection, not diagnosis or treatment. If you already work with a therapist, you can ask whether any writing exercise fits your care. Do not replace professional support with a journaling routine.',
      },
      {
        question:
          "What's the difference between a gratitude journal and a regular journal?",
        answer:
          'A regular journal can cover any event or thought. A gratitude journal focuses on what you appreciate and why it matters. You can keep separate notebooks or include a short gratitude section alongside other reflections.',
      },
      {
        question:
          'Is it better to write gratitude prompts by hand or digitally?',
        answer:
          'Choose the format that feels convenient and private to you. A notebook works offline; writing here lets you start from a prompt without copying it first. You can also switch between paper and digital writing as your routine changes.',
      },
    ],
    relatedScenes: [
      'mindfulness-journal-prompts',
      'self-love-journal-prompts',
      'morning-journal-prompts',
      'daily-journal-prompts',
      'journal-prompts-for-mental-health',
      'deep-journal-prompts',
    ],
    emoji: '🙏',
    defaultMood: 'grateful',
  },
  {
    slug: 'journal-prompts-for-mental-health',
    promptScene: 'mental-health',
    title: 'Mental Health',
    h1: 'Journal Prompts for Mental Health',
    metaTitle: 'Journal Prompts for Mental Health and Self-Reflection',
    metaDescription:
      'Explore 30 journal prompts for mental health reflection. Name feelings, describe daily challenges, and consider support or next steps at a pace that suits you.',
    heroSubtitle:
      'Find a starting point for naming feelings, describing a difficult day, or thinking about the support you need. These prompts are for reflection, not treatment.',
    whyTitle: 'Use Mental Health Journal Prompts for a Check-In',
    whyContent: [
      'A check-in can begin with three concrete details: what happened, what you noticed, and what you need next. The prompts on this page give you questions to work from when a blank page feels difficult. You do not have to explain every feeling or find a solution in one entry.',
      'You might describe a stressful interaction, list what is within your control, or write down something you want to discuss with a trusted person. Choose a topic that feels manageable today. Skip questions that leave you feeling pressured to revisit difficult experiences.',
    ],
    howToUse: [
      'Find a quiet, private space where you feel safe to write honestly.',
      "Choose a prompt based on what you're feeling right now — not what you think you should feel.",
      'Write only what you want to record. You can leave details out or stop at any point.',
      'If a question feels overwhelming, stop writing and choose whether to return to it another time.',
      'After writing, read what you wrote with self-compassion, as if a trusted friend wrote it.',
    ],
    psychologySource:
      'This is a collection of reflection questions, not a clinical program. You can pause or stop any exercise and seek professional support when you need it.',
    faqs: [
      {
        question: 'Can journaling help with anxiety?',
        answer:
          'Writing can give you a place to describe a worry and consider what you need next, but these prompts are not an anxiety treatment. You do not need to keep writing if it increases your distress. For ongoing anxiety, ask a qualified mental health professional about support.',
      },
      {
        question: 'How is journaling different from ruminating?',
        answer:
          'Writing can also become repetitive. If you notice yourself replaying the same worry without wanting to continue, pause or switch to a concrete question such as what happened and what support you need. A prompt does not guarantee that writing will feel helpful.',
      },
      {
        question:
          'What should I do if journaling brings up overwhelming emotions?',
        answer:
          'Stop the exercise rather than pushing through. Put the writing aside and return to a familiar activity or someone you trust. If distress continues or you feel unsafe, seek professional or urgent support. Feeling overwhelmed is not a requirement for useful reflection.',
      },
      {
        question: 'How long should I journal for mental health benefits?',
        answer:
          'There is no required session length for this collection. Start with one sentence or a few minutes and decide whether you want to continue. Longer or more intense writing is not automatically better, and stopping early is always an option.',
      },
      {
        question:
          'Is journaling a replacement for professional mental health support?',
        answer:
          'No. This website does not provide mental health diagnosis or treatment. Contact a qualified professional for persistent mental health concerns. If you are in immediate danger or may harm yourself, contact local emergency services or a crisis helpline.',
      },
      {
        question: 'What type of journal is best for mental health?',
        answer:
          'Any format works — lined notebook, blank sketchbook, or digital app. The key is privacy and accessibility. Choose something you can write in honestly without worrying about others reading it. Some people prefer physical journals for the tactile experience; others prefer digital for convenience.',
      },
      {
        question: 'Can kids and teens benefit from mental health journaling?',
        answer:
          'Young people can use age-appropriate questions to write or draw about their day. Use the kids, teens, or school collections rather than assuming every question here fits every age. An adult should help choose suitable material, and writing should not replace needed professional support.',
      },
    ],
    relatedScenes: [
      'shadow-work-journal-prompts',
      'mindfulness-journal-prompts',
      'deep-journal-prompts',
      'self-discovery-journal-prompts',
      'self-love-journal-prompts',
      'gratitude-journal-prompts',
    ],
    emoji: '🧠',
    defaultMood: 'anxious',
  },
  {
    slug: 'shadow-work-journal-prompts',
    promptScene: 'shadow-work',
    title: 'Shadow Work',
    h1: 'Shadow Work Journal Prompts',
    metaTitle: 'Shadow Work Journal Prompts for Deep Self Discovery',
    metaDescription:
      'Explore 30 shadow work journal prompts about reactions, assumptions, and patterns. Choose a manageable question and reflect without forcing a breakthrough.',
    heroSubtitle:
      'Reflect on reactions, assumptions, and parts of your experience you tend to avoid. Start with a manageable question and keep the depth up to you.',
    whyTitle: 'Explore Reactions with Shadow Work Journal Prompts',
    whyContent: [
      'You might notice a reaction that you want to understand: feeling left out, becoming defensive, or judging someone quickly. A shadow work journal prompt gives you a question to explore that moment. Describe the situation first, then consider what you felt and what you assumed.',
      'Keep interpretations open. One entry does not prove that you have found a hidden cause or a fixed pattern in your personality. You can ask what you would like to do differently next time without blaming yourself or deciding what another person must be thinking.',
    ],
    howToUse: [
      "Approach these prompts with curiosity, not judgment. You're exploring, not fixing.",
      'Write in a private space where you feel emotionally safe. Shadow work can bring up intense feelings.',
      'Start with a lighter question if you want to. There is no requirement to move to more intense topics.',
      'After writing, decide whether you want to keep the entry, leave it unfinished, or return another day.',
      'If a topic involves trauma or persistent distress, consider professional support instead of exploring it alone.',
    ],
    psychologySource:
      'You do not need to uncover a hidden truth or revisit trauma to use these questions. Skip any prompt that feels too intense.',
    faqs: [
      {
        question: 'What is shadow work in simple terms?',
        answer:
          'Here, shadow work means reflecting on feelings, reactions, or assumptions that you usually avoid or find hard to admit. The questions are invitations to write, not a test that reveals your unconscious mind or a diagnosis of why you behave a certain way.',
      },
      {
        question: 'Is shadow work dangerous?',
        answer:
          'Personal writing about difficult experiences can feel upsetting. There is no need to push through distress or revisit trauma alone. Stop when you want to, choose a lighter topic, and discuss difficult experiences with a qualified professional if you need support.',
      },
      {
        question: 'How do I know if I need shadow work?',
        answer:
          'You do not need shadow work to qualify as self-aware or healthy. You might try a question if there is a reaction or repeated situation you want to describe. If this style of reflection does not suit you, daily, gratitude, or creative prompts are other options.',
      },
      {
        question: 'How often should I do shadow work journaling?',
        answer:
          'Use these questions when you have the time and want to reflect. Start with a short entry and notice whether you want to return to it. There is no required weekly schedule, and you can balance it with lighter writing or take a break.',
      },
      {
        question: "What's the difference between shadow work and therapy?",
        answer:
          'Shadow work journaling here is a self-directed writing activity. It does not provide assessment, diagnosis, treatment, or a professional relationship. If you are working with a therapist, ask them whether this kind of writing is appropriate for you.',
      },
      {
        question: 'Can shadow work improve relationships?',
        answer:
          'You can use a prompt to describe your own reaction, consider another possible interpretation, or prepare something you want to say. That reflection does not guarantee a change in a relationship, and it does not replace direct communication or needed support.',
      },
    ],
    relatedScenes: [
      'deep-journal-prompts',
      'journal-prompts-for-mental-health',
      'self-discovery-journal-prompts',
      'self-love-journal-prompts',
      'mindfulness-journal-prompts',
      'gratitude-journal-prompts',
    ],
    emoji: '🌑',
    defaultMood: 'reflective',
  },
  {
    slug: 'journal-prompts-for-kids',
    promptScene: 'kids',
    title: 'Kids',
    h1: 'Journal Prompts for Kids',
    metaTitle: 'Journal Prompts for Kids: Fun Creative Writing Ideas',
    metaDescription:
      'Browse 30 journal prompts for kids with drawing and short writing ideas. Find simple ways for parents and teachers to invite creativity without pressure.',
    heroSubtitle:
      'Give kids a fun question to answer in a drawing, a story, or a few sentences. Parents and teachers can help choose prompts that fit the child.',
    whyTitle: 'Give Kids More Than One Way to Answer',
    whyContent: [
      'A child can answer a journal prompt by drawing a made-up animal, listing favorite things, or telling a short story. A specific question gives the activity a starting point. Let the child choose between a few prompts rather than requiring a personal disclosure.',
      'Keep the focus on expression instead of a polished result. A picture, a dictated sentence, or a list can all count as a response. If this is a classroom activity, explain who will see the work before anyone writes and offer a less personal alternative.',
    ],
    howToUse: [
      'Let kids choose a prompt or skip the activity; keep it an invitation rather than an assignment about private feelings.',
      'Keep it short: 5-10 minutes is plenty for younger kids. Let older kids write longer if they want to.',
      'Offer colored pens, stickers, or drawing materials to make the journal feel special and personal.',
      'Agree in advance on who can read the journal. Respect privacy while being clear about adult responsibilities when safety is a concern.',
      "Acknowledge the effort to draw or write without grading a child's feelings or requiring them to share.",
    ],
    psychologySource:
      'Adults should preview prompts for the individual child. Offer drawing or storytelling, allow skipping, and explain privacy expectations before starting.',
    faqs: [
      {
        question: 'At what age should kids start journaling?',
        answer:
          'Start when a child is interested in drawing, storytelling, or recording something about their day. There is no required starting age. An adult can write down a story the child wants to tell, while children who enjoy writing can try a sentence or a short list.',
      },
      {
        question: 'How do I get my child interested in journaling?',
        answer:
          'Make it optional and playful. Let your child choose the notebook, materials, or prompt, and begin with an imaginary story rather than a personal question. You can write alongside them without asking them to share their answer.',
      },
      {
        question: "Should I read my child's journal?",
        answer:
          "Only if your child invites you to. Journal privacy is crucial for building trust and encouraging honesty. If you're concerned about your child's well-being, have open conversations rather than reading their private writing. The exception is if you have serious safety concerns.",
      },
      {
        question: "What if my child says 'I don't know what to write'?",
        answer:
          "This is normal! Start with very specific, concrete prompts like 'What did you eat for lunch and did you like it?' rather than abstract ones. You can also try 'finish the sentence' starters like 'Today I felt happy when...' Removing pressure to write 'a lot' helps too — even one sentence counts.",
      },
      {
        question: 'Can journaling help kids with anxiety?',
        answer:
          'A drawing or short entry can be a way for a child to describe a worry, if they want to. These prompts do not treat anxiety. If worries are persistent or affect daily life, speak with a qualified professional instead of relying on a writing activity.',
      },
      {
        question: 'How long should kids spend journaling?',
        answer:
          'Try a short session, such as five minutes, and let the child decide whether to continue. A picture or one sentence can be enough. Adjust the activity to the child rather than requiring a time or word count based only on age.',
      },
    ],
    relatedScenes: [
      'journal-prompts-for-middle-school',
      'fun-journal-prompts',
      'daily-journal-prompts',
      'journal-prompts-for-teens',
      'gratitude-journal-prompts',
      'mindfulness-journal-prompts',
    ],
    emoji: '🧒',
    defaultMood: 'curious',
  },
  {
    slug: 'daily-journal-prompts',
    promptScene: 'daily',
    title: 'Daily',
    h1: 'Daily Journal Prompts',
    metaTitle: 'Daily Journal Prompts to Spark Your Writing Habit',
    metaDescription:
      'Use 30 daily journal prompts to record your day, reflect on a choice, or plan a next step. Pick a free question and start a short entry right on the page.',
    heroSubtitle:
      "Pick a free prompt, write for five minutes, and make room for today's thoughts. Copy a question into your notebook or start writing right here.",
    whyTitle: 'Make Daily Journal Prompts Easy to Return To',
    whyContent: [
      'A daily prompt gives you one question to answer when you sit down to write. You might record a moment from the day, a lesson you want to remember, or something to try tomorrow. A few sentences are enough to leave a record that you can revisit.',
      'Choose a small routine that fits your day rather than a word count you have to meet. Repeating a favorite prompt can show how your answers change; choosing a new one can give you another starting point. Both approaches leave room for busy days and breaks.',
    ],
    howToUse: [
      'Pick a consistent time — morning for intention-setting, evening for reflection, or whenever works for your schedule.',
      'Start with a few sentences or five minutes so the activity fits the time you have.',
      'Use a different prompt each day, or revisit favorites to see how your answers evolve.',
      "Don't judge your writing — this is a practice, not a performance.",
      'Look back when you want to notice what you have recorded. A streak is optional, and breaks are allowed.',
    ],
    psychologySource:
      'Start with one question and a few sentences. Missing a day does not erase your earlier entries; continue when it fits your life.',
    faqs: [
      {
        question: 'When is the best time to journal daily?',
        answer:
          "There's no universally 'best' time. Morning journaling helps set intentions and prioritize your day. Evening journaling supports reflection and emotional processing. The best time is whichever time you'll actually do consistently. Many people find pairing it with an existing habit (like morning coffee) helps it stick.",
      },
      {
        question: 'How long should daily journaling take?',
        answer:
          'Try one sentence or a five-minute session to see what fits your day. You can write more when you want to, but there is no required duration or promise of a particular benefit from writing for a set number of minutes.',
      },
      {
        question: 'What if I miss a day of journaling?',
        answer:
          'Return whenever you are ready. You do not need to catch up, explain the gap, or protect a perfect streak. Pick a question about today and continue from there.',
      },
      {
        question: 'Should I use the same prompt every day or switch them up?',
        answer:
          "Both approaches work. Repeating prompts (like 'What am I grateful for today?') builds depth and reveals patterns over time. Switching prompts keeps the practice fresh and prevents staleness. A good strategy is to have 2-3 'anchor' prompts you rotate with new ones.",
      },
      {
        question: 'Do I need a special journal for daily writing?',
        answer:
          "No. Any notebook, document, or app works. Some people prefer dedicated journals for the ritual aspect, while others use their phone's notes app. The medium matters less than the act of writing. Choose whatever removes friction from the process.",
      },
      {
        question: 'Can daily journaling improve productivity?',
        answer:
          'You can use a daily entry to list a priority, reflect on a task, or decide what to try next. That makes the page a place for planning and review. It does not guarantee that you will become more productive or finish more work.',
      },
    ],
    relatedScenes: [
      'morning-journal-prompts',
      'gratitude-journal-prompts',
      'mindfulness-journal-prompts',
      'self-love-journal-prompts',
      'fun-journal-prompts',
      'journal-prompts-for-mental-health',
    ],
    emoji: '📝',
    defaultMood: 'reflective',
  },
  {
    slug: 'journal-prompts-for-teens',
    promptScene: 'teens',
    title: 'Teens',
    h1: 'Journal Prompts for Teens',
    metaTitle: 'Journal Prompts for Teens: Self Expression Ideas',
    metaDescription:
      'Explore 30 journal prompts for teens about school, friendships, interests, and everyday choices. Try a response, choose what to share, and skip any question.',
    heroSubtitle:
      'Navigate the complexity of teenage life with journal prompts that meet you where you are — no judgment, just honest self-exploration.',
    whyTitle: "Journal Prompts for the Things on a Teen's Mind",
    whyContent: [
      'Friends, school, family expectations, and plans for the future can all give you something to write about. These journal prompts offer starting points for describing a situation in your own words. You can explore a question without having to settle on a final answer about who you are.',
      'A list, a sketch, or a few sentences can be enough. Choose which details you want to record and which you would rather leave private. If an adult is using these prompts in a group, they should explain who will read the work and allow less personal alternatives.',
    ],
    howToUse: [
      'Browse the prompts and pick one that feels relevant — skip anything that feels forced.',
      'Write honestly. This journal is for you, not for teachers, parents, or social media.',
      "There's no right answer and no wrong length. One sentence counts. So does five pages.",
      'Revisit an older entry if you want to compare what you thought then with what you think now.',
      'If a prompt brings up something heavy, talk to someone you trust. Journaling is a starting point, not the whole solution.',
    ],
    psychologySource:
      'Keep sharing optional. For classroom or family use, agree on privacy before writing and offer a different question when a prompt feels too personal.',
    faqs: [
      {
        question: 'Why should teens journal?',
        answer:
          'A journal is a place to record a day, try out an idea, or describe something you have not decided how to talk about. Prompts provide a starting question. You can use them for personal reflection or simply because you enjoy writing.',
      },
      {
        question: 'How can I encourage a teen to start journaling?',
        answer:
          'Offer journaling as an option, not a duty. Let the teen choose the format and begin with creative or everyday topics. Discuss privacy honestly, including any safety responsibilities, and do not require personal entries to be shared.',
      },
      {
        question: "What if a teen doesn't like writing?",
        answer:
          "Journaling doesn't have to mean paragraphs. Teens can use bullet points, voice memos, drawings, collages, or even single-word responses. Some teens prefer digital journaling through apps. The goal is self-expression, not writing practice. Meet them in whatever medium feels natural.",
      },
      {
        question: 'Are these prompts appropriate for all teens?',
        answer:
          'Not every question will suit every teen. This collection covers school, identity, relationships, and everyday experiences at different levels of depth. Let the teen skip questions; parents and educators should preview material for their specific situation.',
      },
      {
        question:
          'Can journaling help teens with social media and comparison issues?',
        answer:
          'A prompt can invite a teen to describe how they feel after using social media, what they notice about comparison, or a boundary they want to try. It is a reflection exercise, not a guarantee of improved confidence or a solution to harmful online experiences.',
      },
      {
        question: "Should parents read their teen's journal?",
        answer:
          "No, unless the teen invites you to or there's a genuine safety concern. Privacy is essential for honest self-expression. If you're worried about your teen, have direct, caring conversations instead. Reading a teen's journal without permission can damage trust and make them stop journaling altogether.",
      },
    ],
    relatedScenes: [
      'journal-prompts-for-high-school',
      'journal-prompts-for-middle-school',
      'self-discovery-journal-prompts',
      'deep-journal-prompts',
      'shadow-work-journal-prompts',
      'fun-journal-prompts',
    ],
    emoji: '🎯',
    defaultMood: 'curious',
  },
  {
    slug: 'self-discovery-journal-prompts',
    promptScene: 'self-discovery',
    title: 'Self-Discovery',
    h1: 'Self Discovery Journal Prompts',
    metaTitle: 'Self Discovery Journal Prompts for Personal Growth',
    metaDescription:
      'Explore 30 self discovery journal prompts about values, interests, and choices. Record a specific experience, ask a question, and reflect at your own pace.',
    heroSubtitle:
      'Explore your values, interests, and choices through a specific experience. You can leave questions open and revisit your answers another day.',
    whyTitle: 'Explore Values with Self Discovery Journal Prompts',
    whyContent: [
      'Self discovery journal prompts give you questions about the choices, interests, and relationships that matter to you. Start with a concrete example: a decision you felt good about, an activity you wanted more time for, or a situation in which you changed your mind.',
      'You can use an entry to compare what you say matters with how you spent your time, or to consider a choice you have been postponing. Treat what you write as one perspective from today. Returning to an entry later can show where your view has stayed the same or changed.',
    ],
    howToUse: [
      'Choose a question you are curious about. Discomfort is not a requirement for a useful entry.',
      'Write without an agenda. Let the prompt guide you somewhere unexpected.',
      'Revisit your answers when you want to compare your current perspective with an earlier one.',
      'If a prompt stumps you, leave it unfinished or try a more concrete question.',
      'If you want another perspective, discuss an idea with someone you trust without sharing the full entry.',
    ],
    psychologySource:
      'Your entry is an exploration, not a personality test or a verdict. You can leave a question open and revisit it later.',
    faqs: [
      {
        question: 'What is self-discovery journaling?',
        answer:
          'Self-discovery journaling is a reflective practice that uses targeted prompts to explore your values, beliefs, desires, fears, and identity. Unlike free-writing, the prompts guide you toward specific areas of self-exploration, helping you uncover patterns and insights you might miss through ordinary reflection.',
      },
      {
        question:
          'How is self-discovery journaling different from regular journaling?',
        answer:
          "Regular journaling often documents events and feelings as they happen. Self-discovery journaling goes deeper — it asks 'why' and 'what does this mean about who I am?' The prompts are designed to challenge assumptions, reveal blind spots, and help you understand the beliefs driving your behavior.",
      },
      {
        question:
          'Can self-discovery journaling help me figure out my career path?',
        answer:
          'You can use prompts to list interests, working conditions you prefer, and experiences you would like to try. These notes can inform a conversation or a small experiment, such as talking to someone in a field. Journaling cannot tell you which career is right for you.',
      },
      {
        question: 'How long does self-discovery take?',
        answer:
          'There is no completion date or expected week when an insight should appear. Some entries may clarify a small question, and others may simply record what you are thinking. Use the practice when it is useful rather than measuring it by breakthroughs.',
      },
      {
        question: "What if I don't like what I discover about myself?",
        answer:
          'One entry is not a complete or permanent account of who you are. Describe the situation without turning it into a label, and consider what you want to do next. You can pause if the writing becomes harsh or upsetting and seek support for concerns you find difficult to work through alone.',
      },
      {
        question: 'Is self-discovery journaling the same as therapy?',
        answer:
          'No. These are self-directed questions for exploring preferences and experiences, not therapy or a clinical assessment. If you already work with a therapist, ask whether any of the prompts would be appropriate to discuss with them.',
      },
    ],
    relatedScenes: [
      'deep-journal-prompts',
      'shadow-work-journal-prompts',
      'self-love-journal-prompts',
      'journal-prompts-for-mental-health',
      'mindfulness-journal-prompts',
      'gratitude-journal-prompts',
    ],
    emoji: '🔍',
    defaultMood: 'curious',
  },
  {
    slug: 'self-love-journal-prompts',
    promptScene: 'self-love',
    title: 'Self-Love',
    h1: 'Self Love Journal Prompts',
    metaTitle: 'Self Love Journal Prompts for Confidence & Self Care',
    metaDescription:
      'Try 30 self love journal prompts about self-kindness, boundaries, and everyday care. Write a thoughtful response to yourself without forcing positive feelings.',
    heroSubtitle:
      'Practice writing to yourself with care. Explore everyday needs, boundaries, and small moments of self-kindness without forcing positive affirmations.',
    whyTitle: 'Write a Kinder Response with Self Love Journal Prompts',
    whyContent: [
      'Self love journal prompts can begin with an ordinary moment: a mistake, a hard conversation, or a day when you needed rest. Describe what happened, then consider what a fair and caring response to yourself could sound like. You do not have to pretend that everything went well.',
      'A useful entry can stay practical. You might name a need, decide on a boundary, or write one small action you want to take for yourself. Choose words you can honestly stand behind rather than an affirmation you feel obliged to believe.',
    ],
    howToUse: [
      'Notice your inner dialogue before you start writing. What tone does it take? Then choose a prompt that offers balance.',
      "Write to yourself the way you'd write to someone you love. If that feels foreign, notice that gap — it's information.",
      'Focus on small, specific moments of self-kindness rather than grand declarations of self-love.',
      'If a question brings up resistance, you can name it briefly, choose a neutral question, or stop.',
      'Return when you want to reflect; you do not have to produce a breakthrough or a positive entry.',
    ],
    psychologySource:
      'Kindness does not require a positive mood. Use language that feels honest, and skip questions that make you feel pressured or judged.',
    faqs: [
      {
        question: 'What is self-love journaling?',
        answer:
          'Self-love journaling uses questions about how you treat yourself, what you need, and where you want to set boundaries. You can write a caring response to a difficult moment or record a small action you want to take for yourself.',
      },
      {
        question: "Isn't self-love just being narcissistic?",
        answer:
          'In this collection, self-love means considering your needs and treating yourself with care while respecting other people. You do not need to compare your worth with anyone else or use a personality label to try these questions.',
      },
      {
        question: 'How can journaling help with negative self-talk?',
        answer:
          "You can write down a critical thought and consider a more specific, fair response. For example, separate 'I missed a deadline' from a sweeping judgment about your worth. The exercise offers a different way to phrase an experience; it does not promise to change automatic thoughts.",
      },
      {
        question:
          'How long does it take to build self-love through journaling?',
        answer:
          'There is no fixed timeline. You might find a particular question useful today, or decide that another kind of writing suits you better. Look for responses that feel honest and practical instead of expecting a change after a set number of weeks.',
      },
      {
        question: 'Can self-love journaling help with body image?',
        answer:
          'You can use a prompt to consider comfort, care, or boundaries around appearance-related comments. You do not have to feel grateful for your body or write about appearance. If body image concerns are distressing or affect daily life, seek qualified support.',
      },
      {
        question: 'What if I feel uncomfortable with self-love prompts?',
        answer:
          'You do not have to push through discomfort or interpret it as progress. Choose a more neutral question, such as what would make today easier, or take a break. You decide whether this style of reflection is helpful for you.',
      },
    ],
    relatedScenes: [
      'gratitude-journal-prompts',
      'self-discovery-journal-prompts',
      'mindfulness-journal-prompts',
      'morning-journal-prompts',
      'journal-prompts-for-mental-health',
      'deep-journal-prompts',
    ],
    emoji: '💗',
    defaultMood: 'reflective',
  },
  {
    slug: 'mindfulness-journal-prompts',
    promptScene: 'mindfulness',
    title: 'Mindfulness',
    h1: 'Mindfulness Journal Prompts',
    metaTitle: 'Mindfulness Journal Prompts for Everyday Awareness',
    metaDescription:
      'Explore 30 mindfulness journal prompts for noticing sounds, sensations, and everyday moments. Try a short observation exercise and write at your own pace.',
    heroSubtitle:
      'Describe what you notice right now: a sound, a sensation, or a passing thought. Start with one observation and let a short entry be enough.',
    whyTitle: 'Start with an Observation in Mindfulness Journaling',
    whyContent: [
      'Mindfulness journal prompts on this page ask you to describe your present experience. You might note the sound outside your window, the temperature of a drink, or where your attention wandered. There is no need to empty your mind or produce an insightful answer.',
      'Try separating an observation from a judgment: write what you heard or felt before deciding what it means. If noticing your body or thoughts feels uncomfortable, choose something neutral around you or stop. The page is a writing exercise, not a mindfulness treatment program.',
    ],
    howToUse: [
      'Choose a comfortable place and notice one neutral detail around you before writing.',
      'Choose a prompt and write in present tense — describe what is, not what was or might be.',
      'Try describing a sound, sight, or texture. You can choose an external observation instead of focusing on your body.',
      'Write slowly and deliberately. This is not a race to fill a page.',
      'If your attention moves elsewhere, you can write down what you noticed or return to the question.',
    ],
    psychologySource:
      'One neutral observation is enough. You do not need to feel calm, focus on your breathing, or continue an exercise that feels uncomfortable.',
    faqs: [
      {
        question: 'What is mindfulness journaling?',
        answer:
          'Mindfulness journaling is writing about what you notice in the present moment, such as sounds, sensations, surroundings, or thoughts. These prompts offer a starting point for observation without requiring meditation experience.',
      },
      {
        question:
          'How is mindfulness journaling different from regular journaling?',
        answer:
          'A regular journal can cover past events, plans, or any other topic. Mindfulness journaling puts attention on what you notice now. You might record a sound or a passing thought instead of explaining an entire day.',
      },
      {
        question: 'Can mindfulness journaling reduce anxiety?',
        answer:
          'These questions invite present-moment observation; they do not treat anxiety or guarantee calm. If inward attention feels uncomfortable, you can describe a neutral object around you or stop. Seek qualified support for anxiety that is persistent or affects your daily life.',
      },
      {
        question:
          'Do I need meditation experience to try mindfulness journaling?',
        answer:
          'No. Start with a simple question about something you can notice, such as a sound or an object nearby. You do not need to clear your mind, meditate, or follow a breathing practice to write a short answer.',
      },
      {
        question: 'How long should a mindfulness journaling session last?',
        answer:
          'Try one observation or a few minutes. You can continue if you want to, but there is no required duration and no need to compare a short session with a longer one.',
      },
      {
        question: 'When is the best time for mindfulness journaling?',
        answer:
          'Try a moment that fits your routine: between tasks, after arriving home, or before bed. Choose one thing you can observe and write a short note about it. There is no required time of day.',
      },
    ],
    relatedScenes: [
      'morning-journal-prompts',
      'gratitude-journal-prompts',
      'journal-prompts-for-mental-health',
      'self-love-journal-prompts',
      'daily-journal-prompts',
      'deep-journal-prompts',
    ],
    emoji: '🧘',
    defaultMood: 'reflective',
  },
  {
    slug: 'morning-journal-prompts',
    promptScene: 'morning',
    title: 'Morning',
    h1: 'Morning Journal Prompts',
    metaTitle: 'Morning Journal Prompts to Start Your Day Right',
    metaDescription:
      'Try 30 morning journal prompts to note a priority, check in with yourself, or plan your day. Write a few sentences and adapt the routine to your schedule.',
    heroSubtitle:
      'Start your morning with a few lines about what is on your mind and what matters today. Choose a question and make a small, practical plan.',
    whyTitle: 'Make a Small Plan with Morning Journal Prompts',
    whyContent: [
      'A morning journal prompt can give you a moment to decide what you want to pay attention to today. You might name one priority, note how much time you have, or record something left on your mind from yesterday. The entry can be a few lines alongside your usual morning routine.',
      'Make an intention concrete enough to use: what will you do, and when could it fit? You can also write about a likely obstacle and a smaller alternative. This creates a written plan to refer to; it does not guarantee that the day will go as expected.',
    ],
    howToUse: [
      'If it suits your routine, try writing before email or social media so you have a moment for your own notes.',
      'Keep your journal by your bed or coffee station — remove friction from the habit.',
      'Try a few sentences or five minutes, and adjust the length to the morning you actually have.',
      'Alternate between intention-setting prompts (looking forward) and awareness prompts (how you feel right now).',
      "Don't overthink it — morning journaling is about capturing honest first thoughts, not polished writing.",
    ],
    psychologySource:
      'There is no special hour you need to catch. Write when your day begins, and adapt the routine to your sleep, work, and family schedule.',
    faqs: [
      {
        question: 'What should I write in a morning journal?',
        answer:
          'Try a note about how you feel, one priority for the day, or a question you want to think about. You could also record a dream or a moment you appreciate. Choose one topic rather than trying to include everything each morning.',
      },
      {
        question: 'How early do I need to wake up for morning journaling?',
        answer:
          "You don't need to wake up extra early. Five minutes before your normal routine begins is enough. The goal is to journal before consuming external input (news, email, social media), not necessarily at dawn. Even journaling over your first cup of coffee counts.",
      },
      {
        question:
          "What's the difference between morning pages and morning journaling?",
        answer:
          "Julia Cameron's Morning Pages are a specific practice: three pages of stream-of-consciousness writing every morning. Morning journaling is broader — it can include prompted reflection, intention-setting, gratitude, or any structured writing done in the morning. Both are valuable; choose the format that suits your style.",
      },
      {
        question: 'Can morning journaling replace meditation?',
        answer:
          'Writing and meditation are different activities. You can use a prompt to plan or reflect without needing to meditate first. Choose the activity that fits what you want to do that morning; this page does not offer a substitute for a clinical program.',
      },
      {
        question: "What if I'm not a morning person?",
        answer:
          'Try a brief note later in the morning or at another transition in your day. You do not need to wake up earlier or write while tired. Evening or daily prompts are other options if mornings do not suit you.',
      },
      {
        question: 'How long before I see benefits from morning journaling?',
        answer:
          'There is no promised timeline. After a few entries, you can review whether the questions helped you record priorities or remember what was on your mind. Adjust the routine based on that experience rather than expecting a particular change within a week or month.',
      },
    ],
    relatedScenes: [
      'daily-journal-prompts',
      'mindfulness-journal-prompts',
      'gratitude-journal-prompts',
      'self-love-journal-prompts',
      'fun-journal-prompts',
      'journal-prompts-for-mental-health',
    ],
    emoji: '🌅',
    defaultMood: 'energized',
  },
  {
    slug: 'fun-journal-prompts',
    promptScene: 'fun',
    title: 'Fun',
    h1: 'Fun Journal Prompts',
    metaTitle: 'Fun Journal Prompts: Creative Ideas for Any Mood',
    metaDescription:
      'Browse 30 fun journal prompts for playful stories, imaginary situations, and creative lists. Pick a free idea to write about without needing a serious topic.',
    heroSubtitle:
      'Because journaling should sometimes just be fun. Playful, creative, no-pressure prompts for when you want to write and actually enjoy it.',
    whyTitle: 'Use Fun Journal Prompts to Play with an Idea',
    whyContent: [
      'A journal entry does not have to explain your feelings or solve a problem. Fun prompts invite you to invent a character, imagine an unlikely situation, or make an amusing list. You can write for enjoyment without finding a lesson in the result.',
      'Try answering with the first playful idea that comes to mind. A fake restaurant menu, a conversation with a pet, or a made-up holiday can become a few lines, a sketch, or a longer story. You decide when the activity is finished and whether to share it.',
    ],
    howToUse: [
      "Drop all expectations of 'good writing.' Fun prompts are about play, not performance.",
      'Set a timer for 10 minutes and write without stopping — the sillier, the better.',
      'Share your responses with friends or family if you want — fun prompts make great conversation starters.',
      'Use fun prompts on days when serious journaling feels like too much. They keep the habit alive without the heaviness.',
      'Combine fun prompts with creative materials — colored pens, doodles, or voice memos add another layer of playfulness.',
    ],
    psychologySource:
      'Keep the activity optional and low pressure. A silly answer is enough; it does not have to reveal anything about you or improve a skill.',
    faqs: [
      {
        question: 'Can fun journal prompts actually be beneficial?',
        answer:
          'They give you an enjoyable starting point for a story, a list, or an imaginary situation. That can be useful when you want to write without a serious topic. You do not need to justify a playful entry with a health or productivity benefit.',
      },
      {
        question: 'Are fun prompts appropriate for adults?',
        answer:
          'Yes. Adults can use imaginative or humorous prompts for their own enjoyment. Adapt the situation to your interests, or use it as a starting point for a story rather than a personal reflection.',
      },
      {
        question: 'How can I use fun prompts with a journaling group?',
        answer:
          'Offer a few prompts, give people a short period to write, and invite sharing without requiring it. Explain who will see the responses and let participants choose a different question if they prefer.',
      },
      {
        question: 'Can kids use these fun prompts too?',
        answer:
          'An adult should preview each question for the individual child. For material selected specifically for younger writers, start with the kids collection. A child can draw or tell a story instead of writing a full response.',
      },
      {
        question: "What if I can't think of creative responses?",
        answer:
          'Start with one simple or deliberately silly answer. You can borrow a familiar setting, make a short list, or draw something. There is no need to be original, funny, or polished for the activity to count.',
      },
      {
        question: 'How often should I use fun prompts vs. serious ones?',
        answer:
          'Choose whichever kind of question you want to answer today. You can write playful entries every time, mix them with personal reflection, or take a break. There is no required ratio of fun to serious writing.',
      },
    ],
    relatedScenes: [
      'journal-prompts-for-kids',
      'daily-journal-prompts',
      'journal-prompts-for-teens',
      'morning-journal-prompts',
      'gratitude-journal-prompts',
      'journal-prompts-for-middle-school',
    ],
    emoji: '🎨',
    defaultMood: 'energized',
  },
  {
    slug: 'deep-journal-prompts',
    promptScene: 'deep',
    title: 'Deep',
    h1: 'Deep Journal Prompts',
    metaTitle: 'Deep Journal Prompts for Meaningful Reflection',
    metaDescription:
      'Explore 30 deep journal prompts about values, identity, relationships, and meaning. Choose a question, write at your own pace, and leave room for uncertainty.',
    heroSubtitle:
      "Go beyond the surface with prompts that challenge you to explore life's biggest questions — identity, purpose, mortality, and meaning.",
    whyTitle: 'Leave Room for Open Questions with Deep Journal Prompts',
    whyContent: [
      'Deep journal prompts focus on questions about values, identity, relationships, and meaning. You might consider a belief you have changed, a choice you still think about, or what matters to you now. A question can stay open; an entry does not need a final answer.',
      'Start with a specific situation rather than trying to explain your whole life. You can describe what you thought then, what you think now, and what remains uncertain. Choose how far you want to explore, and leave out details that you do not want to revisit.',
    ],
    howToUse: [
      'Choose a short period you can comfortably set aside. There is no minimum session length.',
      'Write in a place where you feel safe and uninterrupted. These prompts can surface intense emotions.',
      "Don't aim for answers. Aim for honesty. The best deep journaling explores questions without forcing conclusions.",
      'If you feel stuck, leave the question open or choose a lighter prompt rather than pushing for an insight.',
      'Follow up deep sessions with something nourishing — a walk, a conversation, or a lighter journaling prompt.',
    ],
    psychologySource:
      'Intensity is not a measure of a good entry. You can stop, switch to a lighter prompt, or seek support without finishing a difficult question.',
    faqs: [
      {
        question: "What makes a journal prompt 'deep'?",
        answer:
          "Deep prompts go beyond daily events and surface emotions to explore fundamental questions about identity, values, mortality, meaning, and relationships. They challenge assumptions, invite vulnerability, and often don't have simple answers. The depth comes from the willingness to sit with complexity.",
      },
      {
        question: 'Is deep journaling the same as therapy?',
        answer:
          'No. These prompts are self-directed reflection questions, not clinical assessment or treatment. If you work with a therapist and want to bring in personal writing, ask them whether the exercise is appropriate for you.',
      },
      {
        question: 'How often should I do deep journaling?',
        answer:
          'There is no required schedule. Choose a time when you want to reflect and can stop without pressure to finish. You can use lighter prompts, write less often, or leave a question alone.',
      },
      {
        question: 'What if deep journaling makes me feel worse?',
        answer:
          'Stop the exercise and take a break. You do not need to keep writing, wait a set period for discomfort to pass, or treat distress as evidence of progress. If distress persists, feels overwhelming, or raises safety concerns, seek appropriate professional support.',
      },
      {
        question: 'Can beginners start with deep prompts?',
        answer:
          'Yes, if a question feels manageable and you want to explore it. Start with a specific example and leave the entry unfinished if you prefer. Daily or fun prompts are alternatives; you do not have to progress toward more intense writing.',
      },
      {
        question: "How do I know if I'm journaling deeply enough?",
        answer:
          'There is no depth standard to meet. A concrete, honest note can be enough, even if it confirms something you already knew. You do not need tears, a surprising revelation, or a long entry to justify the time spent writing.',
      },
    ],
    relatedScenes: [
      'shadow-work-journal-prompts',
      'self-discovery-journal-prompts',
      'journal-prompts-for-mental-health',
      'mindfulness-journal-prompts',
      'self-love-journal-prompts',
      'gratitude-journal-prompts',
    ],
    emoji: '🌊',
    defaultMood: 'reflective',
  },
  {
    slug: 'journal-prompts-for-middle-school',
    promptScene: 'middle-school',
    title: 'Middle School',
    h1: 'Journal Prompts for Middle School',
    metaTitle: 'Journal Prompts for Middle School Students',
    metaDescription:
      'Browse 30 journal prompts for middle school about school, friendships, and everyday choices. Find short writing ideas with guidance for teachers and parents.',
    heroSubtitle:
      "Navigate the ups and downs of middle school with journal prompts that get what you're going through — no lectures, just real questions.",
    whyTitle: 'Make Middle School Journal Prompts Flexible',
    whyContent: [
      'A middle school journal can hold a short account of the day, a question about friendship, or an idea for a story. These prompts offer specific starting points around school and everyday experiences. Students can choose a question that fits instead of being asked to share their most personal thoughts.',
      'For classroom use, explain the audience before writing: is the response private, submitted to a teacher, or shared with a group? Offer a fictional or less personal alternative. A short list or drawing can be an option when a paragraph does not fit the student or the activity.',
    ],
    howToUse: [
      'Start with prompts that are fun or creative — build the habit before going deep.',
      'Try a short session, such as five minutes, with a smaller or longer response available as needed.',
      'Before writing in a group or class, check who will read the response and choose details you are comfortable recording.',
      "If a prompt doesn't click, skip it and try another. Not every prompt is for everyone.",
      'Look back at an earlier entry if you want to compare your experiences or interests over time.',
    ],
    psychologySource:
      'Preview prompts for the class or individual. Explain who can read the response, keep personal sharing optional, and offer another question when needed.',
    faqs: [
      {
        question: 'Why is journaling good for middle school students?',
        answer:
          'Prompts give students a starting point for describing an experience, considering a choice, or trying an idea in writing. The activity can be short and optional. It does not need to involve private feelings or promise a change in academic performance.',
      },
      {
        question:
          'How can teachers incorporate journal prompts in the classroom?',
        answer:
          'Start with 5-minute warm-up writes at the beginning of class. Use fun or low-stakes prompts to build the habit. Allow students to choose from 2-3 prompts so they have autonomy. Most importantly, establish clear privacy norms — not every journal entry should be graded or shared.',
      },
      {
        question: 'What if a student refuses to journal?',
        answer:
          "Don't force it. Offer alternatives like drawing, bullet points, or dictating to a voice recorder. Some students resist because of writing anxiety, not because they don't want to reflect. Remove the 'wrong answer' pressure by emphasizing that content and grammar won't be graded.",
      },
      {
        question: 'Are these prompts appropriate for 10-14 year olds?',
        answer:
          'This collection focuses on school, friendships, and everyday choices, but no prompt is suitable for every student. Parents and educators should preview questions and let students choose a less personal or fictional response when needed.',
      },
      {
        question: "How can parents support their middle schooler's journaling?",
        answer:
          "Provide materials (a cool notebook and pens), create space (time and a quiet spot), and then step back. Don't read their journal without permission, don't critique their writing, and don't ask 'What did you write about?' Instead, model journaling yourself and be available if they want to share.",
      },
      {
        question: 'Can journaling help with middle school bullying?',
        answer:
          'A student may want to write down what happened or what they want to tell a trusted adult, but writing does not stop bullying. Involve an appropriate adult or school contact to address the situation and safety concerns instead of relying on a journal as the response.',
      },
    ],
    relatedScenes: [
      'journal-prompts-for-teens',
      'journal-prompts-for-kids',
      'journal-prompts-for-high-school',
      'fun-journal-prompts',
      'daily-journal-prompts',
      'self-discovery-journal-prompts',
    ],
    emoji: '📚',
    defaultMood: 'curious',
  },
  {
    slug: 'journal-prompts-for-high-school',
    promptScene: 'high-school',
    title: 'High School',
    h1: 'Journal Prompts for High School',
    metaTitle: 'Journal Prompts for High School Students & Teens',
    metaDescription:
      'Explore 30 journal prompts for high school about interests, friendships, school, and future plans. Choose a reflection with optional sharing and no grades.',
    heroSubtitle:
      'Process the pressure, explore your identity, and figure out what actually matters to you — with prompts designed for the high school experience.',
    whyTitle: 'Use High School Journal Prompts for Choices and Reflection',
    whyContent: [
      'High school journal prompts can start a reflection about a class, friendship, decision, or future plan. You might list the options you are considering, describe an experience you want to remember, or note a question to discuss with someone you trust.',
      'The writing does not have to become an assignment or an application essay. Choose what you want to keep for yourself and what you are comfortable sharing. For a group activity, offer more than one prompt and make the audience clear before anyone starts.',
    ],
    howToUse: [
      'Choose prompts that feel relevant to your life right now. If nothing fits perfectly, adapt it.',
      'Begin with a few sentences and write more only if you want to.',
      'Record only the details you want to keep. For class activities, check who will read your response first.',
      'Use journaling to process decisions, conflicts, and stress before they build up.',
      "Keep your journal private and respect others' privacy too.",
    ],
    psychologySource:
      'A personal entry is not a performance or an application requirement. Students should know who can read it and be able to choose less personal material.',
    faqs: [
      {
        question: 'Why should high school students journal?',
        answer:
          'A journal can be a place to record an experience, organize options, or explore a question without writing a polished essay. Prompts provide a starting point when you do not know what to write. Use the format and level of detail that suit you.',
      },
      {
        question: 'How can journaling help with college application stress?',
        answer:
          "You can list questions about courses, write down experiences you might discuss, or separate your own priorities from other people's expectations. These notes may be useful for planning, but they do not guarantee a stronger application or less anxiety. Seek help from a counselor or trusted adult when needed.",
      },
      {
        question: "What if I don't consider myself a 'journal person'?",
        answer:
          "Journaling doesn't require a certain personality type. It's simply a tool for thinking on paper. If traditional journaling doesn't appeal to you, try bullet-point reflections, voice memos, or even texting your thoughts to yourself. The format matters less than the practice of regular self-reflection.",
      },
      {
        question: 'How do I find time to journal with a busy schedule?',
        answer:
          'Try one sentence during a break or a few minutes at a time that fits your schedule. You can leave an entry unfinished and return later. You do not need to add another demanding task to an already busy day.',
      },
      {
        question: 'Can teachers use these prompts in class?',
        answer:
          "Yes! These prompts work well as warm-up exercises, reflective assignments, or discussion starters. For classroom use, let students choose from multiple prompts and establish that reflective journals won't be graded on content — only participation. This preserves the honesty that makes journaling effective.",
      },
      {
        question:
          "What's the difference between middle school and high school journal prompts?",
        answer:
          'The high school collection puts more emphasis on future plans, personal priorities, and choices around school and relationships. The middle school collection centers more on everyday school experiences. Preview individual questions rather than using the age label as a guarantee of fit.',
      },
      {
        question: 'How can journaling help with mental health in high school?',
        answer:
          'A short entry can help a student describe what is happening or prepare what they want to tell a trusted adult. These prompts are not a treatment for anxiety, depression, or other mental health concerns, and should not replace qualified support.',
      },
    ],
    relatedScenes: [
      'journal-prompts-for-teens',
      'journal-prompts-for-middle-school',
      'self-discovery-journal-prompts',
      'deep-journal-prompts',
      'shadow-work-journal-prompts',
      'daily-journal-prompts',
    ],
    emoji: '🎓',
    defaultMood: 'reflective',
  },
];
