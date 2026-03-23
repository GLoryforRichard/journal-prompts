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
    slug: "gratitude-journal-prompts",
    promptScene: "gratitude",
    title: "Gratitude",
    h1: "Gratitude Journal Prompts",
    metaTitle:
      "50+ Gratitude Journal Prompts for Daily Reflection",
    metaDescription:
      "Discover thoughtful gratitude journal prompts backed by positive psychology. We match you with the perfect prompt for your mood and goals.",
    heroSubtitle:
      "Cultivate appreciation and rewire your brain for positivity with research-backed gratitude prompts tailored to your mood.",
    whyTitle: "Why Gratitude Journal Prompts Work",
    whyContent: [
      "Research by Dr. Robert Emmons (UC Davis) shows that people who use gratitude journal prompts regularly experience 25% greater well-being, better sleep, and more consistent exercise. Gratitude journaling rewires your brain's attentional bias — shifting focus from what's missing to what's present, activating dopamine and serotonin pathways.",
      "The key to effective gratitude journaling is specificity. Writing 'I'm grateful my colleague covered for me in the meeting' is far more impactful than 'I'm grateful for my job.' The best gratitude journal prompts guide you toward these concrete, detailed moments of appreciation.",
    ],
    howToUse: [
      "Choose a prompt that resonates with your current mood — don't force positivity if you're having a hard day.",
      "Write for at least 5 minutes without editing. Let your thoughts flow naturally onto the page.",
      "Be specific: instead of 'I'm grateful for my family,' describe a particular moment or gesture.",
      "Try the same prompt on different days to see how your perspective shifts over time.",
      "Consider ending your entry with one action step — a thank-you text, a kind gesture, or simply a pause to appreciate.",
    ],
    psychologySource:
      "Based on gratitude research by Dr. Robert Emmons (UC Davis), Dr. Martin Seligman (University of Pennsylvania), and the Greater Good Science Center at UC Berkeley.",
    faqs: [
      {
        question: "How often should I write in a gratitude journal?",
        answer:
          "Research suggests 2-3 times per week is optimal for most people. Daily gratitude journaling can sometimes lead to habituation, where you start writing the same things on autopilot. Spacing it out keeps the practice fresh and meaningful.",
      },
      {
        question: "What if I can't think of anything to be grateful for?",
        answer:
          "Start with the basics: clean water, a roof, a working body. Gratitude doesn't require grand gestures — noticing a warm cup of coffee or a kind text counts. On especially hard days, try the prompt 'What didn't go wrong today?' to shift your frame.",
      },
      {
        question: "Does gratitude journaling really work for mental health?",
        answer:
          "Yes. Multiple peer-reviewed studies have found that gratitude journaling reduces symptoms of depression and anxiety, improves sleep quality, and increases overall life satisfaction. It works by training your brain to notice positive experiences more readily.",
      },
      {
        question: "Can gratitude journaling replace therapy?",
        answer:
          "Gratitude journaling is a helpful complement to therapy but not a replacement. If you're experiencing clinical depression, anxiety, or other mental health conditions, please work with a licensed professional. Journaling can be a powerful tool within a broader treatment plan.",
      },
      {
        question:
          "What's the difference between a gratitude journal and a regular journal?",
        answer:
          "A regular journal captures any thoughts or events, while a gratitude journal specifically focuses on what you appreciate. The intentional focus on positive aspects is what creates the documented psychological benefits. Many people keep both — a regular journal for processing and a gratitude journal for perspective.",
      },
      {
        question: "Is it better to write gratitude prompts by hand or digitally?",
        answer:
          "Research by Dr. Virginia Berninger suggests handwriting engages different neural circuits than typing, potentially deepening the emotional processing. However, the best method is whichever one you'll actually stick with. Consistency matters more than medium.",
      },
    ],
    relatedScenes: ["mindfulness-journal-prompts", "self-love-journal-prompts", "morning-journal-prompts"],
    emoji: "🙏",
    defaultMood: "grateful",
  },
  {
    slug: "journal-prompts-for-mental-health",
    promptScene: "mental-health",
    title: "Mental Health",
    h1: "Journal Prompts for Mental Health",
    metaTitle:
      "Journal Prompts for Mental Health & Anxiety Relief",
    metaDescription:
      "Explore journal prompts for mental health designed with CBT and DBT principles. Matched prompts to support your emotional well-being journey.",
    heroSubtitle:
      "Support your mental health with evidence-based journaling prompts drawn from CBT, DBT, and expressive writing research.",
    whyTitle: "Why Journal Prompts for Mental Health Work",
    whyContent: [
      "Dr. James Pennebaker's groundbreaking research at the University of Texas demonstrated that journal prompts for mental health produce measurable improvements in both mental and physical well-being. Participants who wrote about difficult experiences for just 15-20 minutes over 3-4 days showed reduced anxiety, fewer doctor visits, and improved immune function.",
      "Journal prompts for mental health have been integrated into Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), and Acceptance and Commitment Therapy (ACT) as structured interventions. They are particularly effective for identifying thought patterns, tracking mood fluctuations, and building emotional vocabulary — all skills that enhance therapeutic outcomes.",
    ],
    howToUse: [
      "Find a quiet, private space where you feel safe to write honestly.",
      "Choose a prompt based on what you're feeling right now — not what you think you should feel.",
      "Write without censoring yourself. No one else needs to read this.",
      "If a prompt brings up intense emotions, pause and use grounding techniques (5-4-3-2-1 senses exercise) before continuing.",
      "After writing, read what you wrote with self-compassion, as if a trusted friend wrote it.",
    ],
    psychologySource:
      "Based on expressive writing research by Dr. James Pennebaker, CBT by Dr. Aaron Beck, DBT by Dr. Marsha Linehan, and ACT by Dr. Steven Hayes.",
    faqs: [
      {
        question: "Can journaling help with anxiety?",
        answer:
          "Yes. Research shows that writing about anxious thoughts for 15-20 minutes can reduce worry and rumination. The act of putting anxious thoughts on paper externalizes them, making them feel more manageable. It also activates the brain's rational processing centers, helping counteract the emotional hijack of anxiety.",
      },
      {
        question: "How is journaling different from ruminating?",
        answer:
          "Rumination is repetitive, circular, and doesn't lead to new insights — you replay the same thoughts without resolution. Journaling is structured, progressive, and aims for understanding. Using prompts helps direct your writing toward insight and growth rather than getting stuck in loops.",
      },
      {
        question:
          "What should I do if journaling brings up overwhelming emotions?",
        answer:
          "This is normal and can be a sign of meaningful processing. If it feels too intense, try grounding techniques: name 5 things you can see, 4 you can hear, 3 you can touch, 2 you can smell, and 1 you can taste. If overwhelming emotions persist, consider working with a therapist who can guide your journaling practice.",
      },
      {
        question: "How long should I journal for mental health benefits?",
        answer:
          "Research suggests 15-20 minutes is the sweet spot for expressive writing. Shorter sessions may not allow enough depth, while significantly longer sessions can sometimes lead to over-processing. Quality and honesty matter more than length.",
      },
      {
        question:
          "Is journaling a replacement for professional mental health support?",
        answer:
          "No. Journaling is a valuable self-help tool and can enhance therapy outcomes, but it is not a substitute for professional support. If you're experiencing persistent mental health challenges, crisis situations, or thoughts of self-harm, please reach out to a mental health professional or crisis helpline.",
      },
      {
        question: "What type of journal is best for mental health?",
        answer:
          "Any format works — lined notebook, blank sketchbook, or digital app. The key is privacy and accessibility. Choose something you can write in honestly without worrying about others reading it. Some people prefer physical journals for the tactile experience; others prefer digital for convenience.",
      },
      {
        question: "Can kids and teens benefit from mental health journaling?",
        answer:
          "Absolutely. Journaling helps young people develop emotional vocabulary, process complex feelings, and build self-awareness. For younger children, combining drawing with writing can be especially effective. For teens, journaling provides a private outlet during a developmentally intense period.",
      },
    ],
    relatedScenes: ["shadow-work-journal-prompts", "healing", "mindfulness-journal-prompts"],
    emoji: "🧠",
    defaultMood: "anxious",
  },
  {
    slug: "shadow-work-journal-prompts",
    promptScene: "shadow-work",
    title: "Shadow Work",
    h1: "Shadow Work Journal Prompts",
    metaTitle:
      "Shadow Work Journal Prompts for Deep Self Discovery",
    metaDescription:
      "Dive into shadow work journal prompts rooted in Jungian psychology. Uncover hidden patterns, integrate your shadow self, and transform inner conflict.",
    heroSubtitle:
      "Explore the hidden parts of yourself with Jungian-inspired shadow work prompts designed to bring unconscious patterns into the light.",
    whyTitle: "Why Shadow Work Journal Prompts Lead to Transformation",
    whyContent: [
      "Carl Jung introduced the concept of the 'shadow' — the parts of ourselves we suppress, deny, or project onto others. Shadow work journal prompts bring these hidden aspects into awareness, not to eliminate them, but to integrate them into a more whole, authentic self. Writing about jealousy, shame, anger, or fear without judgment transforms unconscious patterns into conscious choices.",
      "Dr. Brene Brown's research on vulnerability demonstrates that the willingness to face uncomfortable truths is the foundation of genuine self-acceptance and emotional resilience. Shadow work journal prompts guide that process safely — helping you explore what your difficult emotions are protecting and build stronger relationships through radical honesty.",
    ],
    howToUse: [
      "Approach these prompts with curiosity, not judgment. You're exploring, not fixing.",
      "Write in a private space where you feel emotionally safe. Shadow work can bring up intense feelings.",
      "Start with lighter prompts if you're new to shadow work. Build up to deeper ones gradually.",
      "After writing, practice self-compassion. Acknowledge your courage in facing difficult truths.",
      "Consider pairing shadow work journaling with therapy, especially if trauma surfaces.",
    ],
    psychologySource:
      "Based on shadow theory by Carl Jung, shame resilience by Dr. Brene Brown, Internal Family Systems by Dr. Richard Schwartz, and psychodynamic therapy principles.",
    faqs: [
      {
        question: "What is shadow work in simple terms?",
        answer:
          "Shadow work is the process of exploring parts of yourself that you've hidden, suppressed, or denied — like jealousy, anger, shame, or insecurity. It's based on Carl Jung's idea that these 'shadow' aspects don't disappear when ignored; they influence your behavior unconsciously. Shadow work brings them into awareness so you can choose how to respond.",
      },
      {
        question: "Is shadow work dangerous?",
        answer:
          "Shadow work is generally safe when done mindfully, but it can surface intense emotions, especially if you have unresolved trauma. If you feel overwhelmed, pause and use grounding techniques. For deep trauma work, partnering with a qualified therapist is recommended. Start with lighter prompts and work your way deeper.",
      },
      {
        question: "How do I know if I need shadow work?",
        answer:
          "Signs include repeating the same relationship patterns, strong emotional reactions that seem disproportionate, judging others harshly for traits you secretly recognize in yourself, or feeling disconnected from your authentic self. If certain topics trigger defensiveness, that often points to shadow material worth exploring.",
      },
      {
        question: "How often should I do shadow work journaling?",
        answer:
          "Once or twice a week is enough for most people. Shadow work is emotionally intensive, and you need time to process what comes up. Over-doing it can lead to emotional exhaustion. Balance shadow work sessions with lighter journaling practices like gratitude or fun prompts.",
      },
      {
        question: "What's the difference between shadow work and therapy?",
        answer:
          "Shadow work journaling is a self-directed exploration of unconscious patterns, while therapy provides professional guidance, clinical tools, and a trained perspective. They complement each other well — journaling can deepen therapy insights, and therapy can provide safe containment for what journaling uncovers.",
      },
      {
        question: "Can shadow work improve relationships?",
        answer:
          "Yes. Many relationship conflicts stem from projecting our shadow onto others — criticizing in them what we can't accept in ourselves. When you integrate your shadow through journaling, you reduce projection, increase empathy, and show up more authentically in your relationships.",
      },
    ],
    relatedScenes: ["deep-journal-prompts", "journal-prompts-for-mental-health", "self-discovery-journal-prompts"],
    emoji: "🌑",
    defaultMood: "reflective",
  },
  {
    slug: "journal-prompts-for-kids",
    promptScene: "kids",
    title: "Kids",
    h1: "Journal Prompts for Kids",
    metaTitle:
      "Journal Prompts for Kids: Fun Creative Writing Ideas",
    metaDescription:
      "Fun and age-appropriate journal prompts for kids that build emotional intelligence, creativity, and self-expression. Smart prompt matching.",
    heroSubtitle:
      "Spark your child's imagination and emotional growth with fun, age-appropriate journal prompts designed by child development experts.",
    whyTitle: "Why Journal Prompts for Kids Build Emotional Intelligence",
    whyContent: [
      "Journal prompts for kids help children develop critical literacy skills while building emotional intelligence. Research by Dr. Marc Brackett at the Yale Center for Emotional Intelligence shows that children who can name and express their emotions perform better academically, build stronger friendships, and demonstrate greater resilience when facing challenges.",
      "For kids, journal prompts don't have to look like traditional writing. They can include drawing, lists, stories, or even single sentences. The key is creating a safe space where children feel free to express themselves without grades or corrections. The best journal prompts for kids build confidence in self-expression and teach children that their thoughts and feelings matter.",
    ],
    howToUse: [
      "Let kids choose their own prompts — autonomy makes journaling feel like play, not homework.",
      "Keep it short: 5-10 minutes is plenty for younger kids. Let older kids write longer if they want to.",
      "Offer colored pens, stickers, or drawing materials to make the journal feel special and personal.",
      "Never read a child's journal without permission — trust is essential for honest expression.",
      "Celebrate the practice, not the product. Praise effort and bravery in sharing feelings, not spelling or grammar.",
    ],
    psychologySource:
      "Based on emotional intelligence research by Dr. Marc Brackett (Yale), social-emotional learning frameworks, and creative expression research in child development.",
    faqs: [
      {
        question: "At what age should kids start journaling?",
        answer:
          "Kids can start journaling as early as age 4-5 with drawing-based prompts. By age 7-8, most children can handle simple writing prompts. The key is matching the complexity to the child's developmental stage. Even pre-literate children benefit from 'dictated journals' where they tell a story and an adult writes it down.",
      },
      {
        question: "How do I get my child interested in journaling?",
        answer:
          "Make it fun, not forced. Let them pick a cool notebook, use colorful pens, and choose prompts that excite them. Start with creative and imaginative prompts rather than reflective ones. Model journaling yourself — kids are more likely to journal when they see adults doing it too.",
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
        question: "Can journaling help kids with anxiety?",
        answer:
          "Yes. Research shows that expressive writing helps children process worries and develop coping strategies. Drawing or writing about fears can externalize them, making them feel less overwhelming. For children with clinical anxiety, journaling works well alongside professional support.",
      },
      {
        question:
          "How long should kids spend journaling?",
        answer:
          "For kids aged 5-8, 5 minutes is a great start. For ages 9-12, aim for 10-15 minutes. The goal is consistency over duration. A child who writes three sentences happily every day benefits more than one who writes a full page reluctantly once a month.",
      },
    ],
    relatedScenes: ["journal-prompts-for-middle-school", "fun-journal-prompts", "daily-journal-prompts"],
    emoji: "🧒",
    defaultMood: "curious",
  },
  {
    slug: "daily-journal-prompts",
    promptScene: "daily",
    title: "Daily",
    h1: "Daily Journal Prompts",
    metaTitle:
      "Daily Journal Prompts to Spark Your Writing Habit",
    metaDescription:
      "Fresh daily journal prompts to build a consistent writing habit. Matched prompts for reflection, growth, and self-awareness every day.",
    heroSubtitle:
      "Build a life-changing journaling habit with fresh daily prompts that help you reflect, grow, and stay grounded — one day at a time.",
    whyTitle: "Why Daily Journal Prompts Build Lasting Change",
    whyContent: [
      "A study published in the Harvard Business Review found that employees who spent 15 minutes reflecting on lessons learned performed 23% better than those who didn't. Daily journal prompts create a similar feedback loop for your personal life — helping you notice patterns, celebrate progress, and course-correct before small issues become big problems.",
      "The key to sustainable use of daily journal prompts is lowering the bar. You don't need to write pages — a few sentences capturing your mood, one insight, or a single moment of gratitude is enough. Daily journal prompts remove the 'blank page' paralysis that stops most people from building a consistent habit.",
    ],
    howToUse: [
      "Pick a consistent time — morning for intention-setting, evening for reflection, or whenever works for your schedule.",
      "Start with just 5 minutes. You can always write more, but a low commitment prevents burnout.",
      "Use a different prompt each day, or revisit favorites to see how your answers evolve.",
      "Don't judge your writing — this is a practice, not a performance.",
      "Track your streak. The habit itself is more valuable than any individual entry.",
    ],
    psychologySource:
      "Based on reflective practice research, habit formation science by Dr. BJ Fogg, and the daily reflection study published in Harvard Business Review by Di Stefano et al.",
    faqs: [
      {
        question: "When is the best time to journal daily?",
        answer:
          "There's no universally 'best' time. Morning journaling helps set intentions and prioritize your day. Evening journaling supports reflection and emotional processing. The best time is whichever time you'll actually do consistently. Many people find pairing it with an existing habit (like morning coffee) helps it stick.",
      },
      {
        question: "How long should daily journaling take?",
        answer:
          "Even 5 minutes daily produces measurable benefits. Research suggests 10-20 minutes is ideal for deeper reflection, but consistency matters far more than duration. Start small and let your practice naturally expand as it becomes a habit.",
      },
      {
        question: "What if I miss a day of journaling?",
        answer:
          "Don't aim for perfection — aim for consistency. Missing a day doesn't erase the benefits of previous entries. Simply pick up where you left off. Habit research by Dr. BJ Fogg shows that self-compassion after a missed day is more effective than guilt for maintaining long-term habits.",
      },
      {
        question: "Should I use the same prompt every day or switch them up?",
        answer:
          "Both approaches work. Repeating prompts (like 'What am I grateful for today?') builds depth and reveals patterns over time. Switching prompts keeps the practice fresh and prevents staleness. A good strategy is to have 2-3 'anchor' prompts you rotate with new ones.",
      },
      {
        question: "Do I need a special journal for daily writing?",
        answer:
          "No. Any notebook, document, or app works. Some people prefer dedicated journals for the ritual aspect, while others use their phone's notes app. The medium matters less than the act of writing. Choose whatever removes friction from the process.",
      },
      {
        question: "Can daily journaling improve productivity?",
        answer:
          "Yes. Research shows that daily reflection improves performance by helping you identify what's working, what's not, and where to focus your energy. Journaling also reduces decision fatigue by helping you clarify priorities before your day begins.",
      },
    ],
    relatedScenes: ["morning-journal-prompts", "gratitude-journal-prompts", "mindfulness-journal-prompts"],
    emoji: "📝",
    defaultMood: "reflective",
  },
  {
    slug: "journal-prompts-for-teens",
    promptScene: "teens",
    title: "Teens",
    h1: "Journal Prompts for Teens",
    metaTitle:
      "Journal Prompts for Teens: Self Expression Ideas",
    metaDescription:
      "Engaging journal prompts for teens designed to support identity exploration, emotional growth, and self-expression during the teenage years.",
    heroSubtitle:
      "Navigate the complexity of teenage life with journal prompts that meet you where you are — no judgment, just honest self-exploration.",
    whyTitle: "Why Journal Prompts for Teens Matter Now",
    whyContent: [
      "Adolescence is one of the most neurologically active periods of human development. The prefrontal cortex — responsible for decision-making, impulse control, and self-awareness — is literally being rewired. Journal prompts for teens give young people a tool to process the intensity of their experiences while their brain is still developing the capacity to do so internally.",
      "Dr. Jean Twenge's research shows that today's teens face unprecedented levels of social comparison, academic pressure, and digital overwhelm. Journal prompts for teens provide a rare screen-free space for authentic self-expression — helping them develop emotional vocabulary, practice perspective-taking, and build the self-awareness that forms the foundation of healthy adult identity.",
    ],
    howToUse: [
      "Browse the prompts and pick one that feels relevant — skip anything that feels forced.",
      "Write honestly. This journal is for you, not for teachers, parents, or social media.",
      "There's no right answer and no wrong length. One sentence counts. So does five pages.",
      "Try revisiting older entries occasionally — it's powerful to see how you've changed.",
      "If a prompt brings up something heavy, talk to someone you trust. Journaling is a starting point, not the whole solution.",
    ],
    psychologySource:
      "Based on adolescent identity development by Erik Erikson, digital well-being research by Dr. Jean Twenge, and self-determination theory by Deci & Ryan.",
    faqs: [
      {
        question: "Why should teens journal?",
        answer:
          "Journaling helps teens process complex emotions, develop self-awareness, and build communication skills during a critical period of brain development. It provides a private, non-judgmental space to explore identity, work through social challenges, and develop the reflective capacity that supports healthy decision-making.",
      },
      {
        question: "How can I encourage a teen to start journaling?",
        answer:
          "Don't force it. Offer it as a tool, not a chore. Let them choose their own journal and writing tools. Start with creative or fun prompts rather than heavy emotional ones. Model journaling yourself. Most importantly, guarantee their privacy — teens need to know their journal won't be read without permission.",
      },
      {
        question: "What if a teen doesn't like writing?",
        answer:
          "Journaling doesn't have to mean paragraphs. Teens can use bullet points, voice memos, drawings, collages, or even single-word responses. Some teens prefer digital journaling through apps. The goal is self-expression, not writing practice. Meet them in whatever medium feels natural.",
      },
      {
        question: "Are these prompts appropriate for all teens?",
        answer:
          "These prompts are designed for teens aged 13-18 and cover a range of depths. Some are light and fun, others go deeper into identity and emotions. We recommend starting with lighter prompts and letting teens choose their own level of depth. Parents and educators can preview prompts to ensure they're appropriate for specific developmental stages.",
      },
      {
        question:
          "Can journaling help teens with social media and comparison issues?",
        answer:
          "Yes. Journaling helps teens develop internal validation rather than relying on external metrics like likes and followers. Prompts that explore identity, values, and authentic self-expression can counteract the curated perfection of social media by grounding teens in who they really are.",
      },
      {
        question: "Should parents read their teen's journal?",
        answer:
          "No, unless the teen invites you to or there's a genuine safety concern. Privacy is essential for honest self-expression. If you're worried about your teen, have direct, caring conversations instead. Reading a teen's journal without permission can damage trust and make them stop journaling altogether.",
      },
    ],
    relatedScenes: ["journal-prompts-for-high-school", "journal-prompts-for-middle-school", "self-discovery-journal-prompts"],
    emoji: "🎯",
    defaultMood: "curious",
  },
  {
    slug: "self-discovery-journal-prompts",
    promptScene: "self-discovery",
    title: "Self-Discovery",
    h1: "Self Discovery Journal Prompts",
    metaTitle:
      "Self Discovery Journal Prompts for Personal Growth",
    metaDescription:
      "Uncover who you really are with self discovery journal prompts. Smart matching helps you explore values, identity, purpose, and personal growth.",
    heroSubtitle:
      "Peel back the layers and uncover your authentic self with prompts designed to explore your values, desires, fears, and hidden strengths.",
    whyTitle: "Why Self Discovery Journal Prompts Reveal Your True Self",
    whyContent: [
      "Most people operate on autopilot, making decisions based on inherited beliefs and unchecked assumptions. Self discovery journal prompts interrupt this pattern by asking questions you've never thought to ask. Dr. Tasha Eurich's research found that only 10-15% of people are truly self-aware, despite 95% believing they are — and the right self discovery journal prompts close that gap.",
      "Narrative identity research by Dr. Dan McAdams shows that the stories we tell about ourselves shape our behavior, relationships, and life satisfaction. Self discovery journal prompts let you examine those stories, keep the ones that serve you, and rewrite the ones that don't. It's not navel-gazing — it's the foundation of intentional living.",
    ],
    howToUse: [
      "Choose prompts that make you slightly uncomfortable — that's often where the richest insights are.",
      "Write without an agenda. Let the prompt guide you somewhere unexpected.",
      "Revisit your answers after a few weeks. Growth becomes visible in the distance between entries.",
      "If a prompt stumps you, write about why it stumps you. That resistance is information.",
      "Pair self-discovery journaling with conversations — sharing insights with a trusted friend deepens the learning.",
    ],
    psychologySource:
      "Based on self-awareness research by Dr. Tasha Eurich, narrative identity by Dr. Dan McAdams, flow theory by Dr. Mihaly Csikszentmihalyi, and values clarification in ACT.",
    faqs: [
      {
        question: "What is self-discovery journaling?",
        answer:
          "Self-discovery journaling is a reflective practice that uses targeted prompts to explore your values, beliefs, desires, fears, and identity. Unlike free-writing, the prompts guide you toward specific areas of self-exploration, helping you uncover patterns and insights you might miss through ordinary reflection.",
      },
      {
        question: "How is self-discovery journaling different from regular journaling?",
        answer:
          "Regular journaling often documents events and feelings as they happen. Self-discovery journaling goes deeper — it asks 'why' and 'what does this mean about who I am?' The prompts are designed to challenge assumptions, reveal blind spots, and help you understand the beliefs driving your behavior.",
      },
      {
        question:
          "Can self-discovery journaling help me figure out my career path?",
        answer:
          "Absolutely. Prompts that explore what makes you lose track of time, what environments bring out your best, and what you'd do without financial pressure can reveal vocational interests that standard career assessments miss. It's a tool for understanding what you actually want, not just what seems practical.",
      },
      {
        question: "How long does self-discovery take?",
        answer:
          "Self-discovery is a lifelong process, not a destination. However, most people experience significant 'aha moments' within the first few weeks of consistent journaling. The value compounds over time as you build a rich archive of self-knowledge to draw on during major life decisions.",
      },
      {
        question:
          "What if I don't like what I discover about myself?",
        answer:
          "This is a natural and important part of the process. Self-discovery isn't about confirming a flattering self-image — it's about seeing yourself clearly so you can grow. Meeting uncomfortable truths with self-compassion, rather than judgment, is what transforms awareness into change.",
      },
      {
        question: "Is self-discovery journaling the same as therapy?",
        answer:
          "No, but they complement each other well. Journaling is self-directed and exploratory, while therapy provides professional guidance and evidence-based interventions. Many therapists encourage journaling between sessions as a way to deepen therapeutic work.",
      },
    ],
    relatedScenes: ["deep-journal-prompts", "shadow-work-journal-prompts", "self-love-journal-prompts"],
    emoji: "🔍",
    defaultMood: "curious",
  },
  {
    slug: "self-love-journal-prompts",
    promptScene: "self-love",
    title: "Self-Love",
    h1: "Self Love Journal Prompts",
    metaTitle:
      "Self Love Journal Prompts for Confidence & Self Care",
    metaDescription:
      "Build genuine self-love with journal prompts grounded in self-compassion research. Smart matching for your unique emotional needs.",
    heroSubtitle:
      "Cultivate a kinder relationship with yourself through self-love prompts rooted in self-compassion research and authentic acceptance.",
    whyTitle: "Why Self Love Journal Prompts Actually Work",
    whyContent: [
      "Self love journal prompts aren't about affirmations you don't believe or pretending everything is fine. They help you build a relationship with yourself that mirrors the kindness you'd offer a good friend. Dr. Kristin Neff's research at the University of Texas shows that self-compassion — treating yourself with the same care you'd give others — is more strongly linked to well-being than self-esteem.",
      "The difference matters: self-esteem crumbles during failure, while self-compassion holds steady because it doesn't require you to be special — just human. Self love journal prompts build this muscle by giving you space to acknowledge struggles without drowning in them. Contrary to the myth that self-compassion leads to laziness, Dr. Neff's research demonstrates it actually increases the willingness to try again after failure.",
    ],
    howToUse: [
      "Notice your inner dialogue before you start writing. What tone does it take? Then choose a prompt that offers balance.",
      "Write to yourself the way you'd write to someone you love. If that feels foreign, notice that gap — it's information.",
      "Focus on small, specific moments of self-kindness rather than grand declarations of self-love.",
      "If resistance comes up (thoughts like 'this is selfish' or 'I don't deserve this'), write about the resistance itself.",
      "Practice regularly — self-love is built through repetition, not single breakthroughs.",
    ],
    psychologySource:
      "Based on self-compassion research by Dr. Kristin Neff (UT Austin), shame resilience by Dr. Brene Brown, and self-acceptance in humanistic psychology by Carl Rogers.",
    faqs: [
      {
        question: "What is self-love journaling?",
        answer:
          "Self-love journaling is a structured practice of writing prompts that help you develop a kinder, more accepting relationship with yourself. It's grounded in self-compassion research and focuses on recognizing your worth, acknowledging your struggles with kindness, and building internal validation rather than depending on external approval.",
      },
      {
        question: "Isn't self-love just being narcissistic?",
        answer:
          "No. Research clearly distinguishes self-love (self-compassion) from narcissism. Narcissism involves an inflated sense of superiority over others. Self-compassion involves treating yourself with the same kindness you'd offer anyone, especially during difficult times. It actually increases empathy and connection with others.",
      },
      {
        question: "How can journaling help with negative self-talk?",
        answer:
          "Journaling makes your inner dialogue visible. When you write down negative self-talk, you can examine it objectively and ask: 'Would I say this to a friend?' This awareness is the first step toward change. Over time, writing compassionate responses rewires the automatic self-criticism pattern.",
      },
      {
        question: "How long does it take to build self-love through journaling?",
        answer:
          "Self-love is a practice, not a switch. Most people notice shifts in their inner dialogue within 2-4 weeks of regular journaling. Deeper changes in self-perception typically emerge over 2-3 months. The key is consistency and genuine engagement with the prompts, not just going through the motions.",
      },
      {
        question: "Can self-love journaling help with body image?",
        answer:
          "Yes. Prompts that focus on body gratitude, function over appearance, and challenging internalized beauty standards can meaningfully shift your relationship with your body. Research in feminist therapy shows that written exercises exploring body image improve body satisfaction and reduce appearance-based anxiety.",
      },
      {
        question:
          "What if I feel uncomfortable with self-love prompts?",
        answer:
          "Discomfort is normal and expected, especially if you're not used to being kind to yourself. The discomfort itself is valuable — it reveals internalized beliefs about your worthiness. Start with lighter prompts and gradually work toward deeper ones. The discomfort usually softens with practice.",
      },
    ],
    relatedScenes: ["gratitude-journal-prompts", "self-discovery-journal-prompts", "mindfulness-journal-prompts"],
    emoji: "💗",
    defaultMood: "reflective",
  },
  {
    slug: "mindfulness-journal-prompts",
    promptScene: "mindfulness",
    title: "Mindfulness",
    h1: "Mindfulness Journal Prompts",
    metaTitle:
      "Mindfulness Journal Prompts for Inner Peace",
    metaDescription:
      "Ground yourself in the present with mindfulness journal prompts based on MBSR research. Matched prompts for awareness, calm, and clarity.",
    heroSubtitle:
      "Anchor yourself in the present moment with mindfulness prompts that combine the science of MBSR with the reflective power of journaling.",
    whyTitle: "Why Mindfulness Journal Prompts Ground You",
    whyContent: [
      "Dr. Jon Kabat-Zinn, the creator of Mindfulness-Based Stress Reduction (MBSR), defines mindfulness as 'paying attention, on purpose, in the present moment, non-judgmentally.' Mindfulness journal prompts extend this practice onto the page — instead of observing your breath, you observe your thoughts, sensations, and surroundings through writing.",
      "Research shows that mindfulness practices reduce cortisol levels, lower blood pressure, and decrease activity in the amygdala (the brain's fear center). When you combine mindfulness with journaling, you get the benefits of both: present-moment awareness and cognitive processing. Mindfulness journal prompts are particularly effective for people who find sitting meditation difficult.",
    ],
    howToUse: [
      "Take three slow breaths before you begin writing. Arrive in the present moment first.",
      "Choose a prompt and write in present tense — describe what is, not what was or might be.",
      "Engage your senses. The best mindfulness writing is grounded in physical sensations, not abstract thoughts.",
      "Write slowly and deliberately. This is not a race to fill a page.",
      "If your mind wanders while writing, note where it went — that's valuable data, not a failure.",
    ],
    psychologySource:
      "Based on Mindfulness-Based Stress Reduction (MBSR) by Dr. Jon Kabat-Zinn, mindful awareness research at UCLA, and interoception research by Dr. A.D. Craig.",
    faqs: [
      {
        question: "What is mindfulness journaling?",
        answer:
          "Mindfulness journaling combines mindfulness meditation principles with reflective writing. Instead of clearing your mind, you observe your thoughts, sensations, and environment through writing prompts. It's a way to practice present-moment awareness that many people find more accessible than silent meditation.",
      },
      {
        question: "How is mindfulness journaling different from regular journaling?",
        answer:
          "Regular journaling often focuses on narrating events or processing emotions from the past. Mindfulness journaling focuses specifically on present-moment experience — what you're sensing, feeling, and thinking right now. It trains attention and awareness rather than analysis.",
      },
      {
        question: "Can mindfulness journaling reduce anxiety?",
        answer:
          "Yes. Anxiety lives in the future — 'what if' thinking. Mindfulness journaling anchors you in the present, which naturally reduces anxious thoughts. Research shows that mindfulness practices decrease amygdala reactivity and increase prefrontal cortex activity, directly counteracting the neural patterns of anxiety.",
      },
      {
        question: "Do I need meditation experience to try mindfulness journaling?",
        answer:
          "Not at all. Mindfulness journaling is actually a great entry point for people who find sitting meditation challenging. The act of writing gives your mind something to do, making it easier to stay focused. Many meditation teachers recommend journaling as a stepping stone to formal practice.",
      },
      {
        question: "How long should a mindfulness journaling session last?",
        answer:
          "Start with 5-10 minutes. The quality of attention matters more than the duration. A focused 5-minute session where you're truly present is more valuable than 30 minutes of distracted writing. You can gradually extend the time as your mindfulness muscle develops.",
      },
      {
        question:
          "When is the best time for mindfulness journaling?",
        answer:
          "Any time you feel disconnected from the present moment. Many people find it helpful during transitions — between meetings, after arriving home, or before bed. Morning mindfulness journaling can set a grounded tone for the day, while evening sessions help you decompress and let go.",
      },
    ],
    relatedScenes: ["morning-journal-prompts", "gratitude-journal-prompts", "journal-prompts-for-mental-health"],
    emoji: "🧘",
    defaultMood: "reflective",
  },
  {
    slug: "morning-journal-prompts",
    promptScene: "morning",
    title: "Morning",
    h1: "Morning Journal Prompts",
    metaTitle:
      "Morning Journal Prompts to Start Your Day Right",
    metaDescription:
      "Start your day with purpose using morning journal prompts. Smart prompt matching to set intentions, boost clarity, and build momentum.",
    heroSubtitle:
      "Start each morning with clarity and purpose using prompts designed to set intentions, clear mental clutter, and energize your day.",
    whyTitle: "Why Morning Journal Prompts Set Your Day",
    whyContent: [
      "Your brain is in a unique state during the first 30-60 minutes after waking — theta and alpha brainwave activity is elevated, creating a window of heightened creativity and reduced mental resistance. Morning journal prompts tap into this window, which is why Julia Cameron's famous 'Morning Pages' practice has helped millions access their creative and reflective potential.",
      "Research on implementation intentions by Peter Gollwitzer shows that people who use morning journal prompts to write down specific intentions are 2-3 times more likely to follow through compared to those who simply think about them. Morning journal prompts front-load self-awareness — before the reactive demands of the day take over, you proactively choose what matters.",
    ],
    howToUse: [
      "Journal before checking your phone or email. Protect the morning window of clarity.",
      "Keep your journal by your bed or coffee station — remove friction from the habit.",
      "Write for 5-10 minutes. Morning journaling works best when it's brief and focused.",
      "Alternate between intention-setting prompts (looking forward) and awareness prompts (how you feel right now).",
      "Don't overthink it — morning journaling is about capturing honest first thoughts, not polished writing.",
    ],
    psychologySource:
      "Based on Morning Pages by Julia Cameron, implementation intentions research by Peter Gollwitzer, and circadian neuroscience research on morning cognition.",
    faqs: [
      {
        question: "What should I write in a morning journal?",
        answer:
          "Morning journals work best when they combine awareness (how you feel right now, what you dreamed about) with intention (what matters today, how you want to show up). Some people also include a quick gratitude note. The key is capturing your authentic morning state before the day's agenda takes over.",
      },
      {
        question: "How early do I need to wake up for morning journaling?",
        answer:
          "You don't need to wake up extra early. Five minutes before your normal routine begins is enough. The goal is to journal before consuming external input (news, email, social media), not necessarily at dawn. Even journaling over your first cup of coffee counts.",
      },
      {
        question: "What's the difference between morning pages and morning journaling?",
        answer:
          "Julia Cameron's Morning Pages are a specific practice: three pages of stream-of-consciousness writing every morning. Morning journaling is broader — it can include prompted reflection, intention-setting, gratitude, or any structured writing done in the morning. Both are valuable; choose the format that suits your style.",
      },
      {
        question: "Can morning journaling replace meditation?",
        answer:
          "They serve different purposes but can complement each other. Meditation trains focused attention and awareness. Morning journaling trains reflective thinking and intention-setting. Many people find that journaling after a short meditation combines the benefits of both practices.",
      },
      {
        question: "What if I'm not a morning person?",
        answer:
          "Morning journaling still works even if you're groggy. In fact, the slightly unfocused morning state can produce more honest, less filtered writing. Keep it short (3-5 minutes) and simple. If mornings truly don't work, try journaling at whatever transition point starts your 'real' day.",
      },
      {
        question: "How long before I see benefits from morning journaling?",
        answer:
          "Most people report feeling more focused and intentional within the first week. Deeper benefits — better self-awareness, reduced morning anxiety, clearer decision-making — typically emerge after 2-4 weeks of consistent practice. The habit itself becomes rewarding quickly.",
      },
    ],
    relatedScenes: ["daily-journal-prompts", "mindfulness-journal-prompts", "gratitude-journal-prompts"],
    emoji: "🌅",
    defaultMood: "energized",
  },
  {
    slug: "fun-journal-prompts",
    promptScene: "fun",
    title: "Fun",
    h1: "Fun Journal Prompts",
    metaTitle:
      "Fun Journal Prompts: Creative Ideas for Any Mood",
    metaDescription:
      "Lighten up your journal with fun, creative, and playful prompts. Smart matching for when you want to write without pressure and just enjoy it.",
    heroSubtitle:
      "Because journaling should sometimes just be fun. Playful, creative, no-pressure prompts for when you want to write and actually enjoy it.",
    whyTitle: "Why Fun Journal Prompts Are Secretly Powerful",
    whyContent: [
      "Not every journal entry needs to be deep or therapeutic. Research on positive emotions by Dr. Barbara Fredrickson shows that experiences of joy, amusement, and playfulness broaden your cognitive resources, build psychological resilience, and undo the physiological effects of stress. Fun journal prompts create these positive emotional experiences through creative expression.",
      "Fun journal prompts also activate divergent thinking — the cognitive process behind creativity and problem-solving. When you write a fake restaurant menu or imagine a conversation with your pet, you're strengthening the same neural pathways used for innovation, flexible thinking, and lateral problem-solving in other areas of life.",
    ],
    howToUse: [
      "Drop all expectations of 'good writing.' Fun prompts are about play, not performance.",
      "Set a timer for 10 minutes and write without stopping — the sillier, the better.",
      "Share your responses with friends or family if you want — fun prompts make great conversation starters.",
      "Use fun prompts on days when serious journaling feels like too much. They keep the habit alive without the heaviness.",
      "Combine fun prompts with creative materials — colored pens, doodles, or voice memos add another layer of playfulness.",
    ],
    psychologySource:
      "Based on the broaden-and-build theory by Dr. Barbara Fredrickson, divergent thinking research, and play theory by Dr. Stuart Brown.",
    faqs: [
      {
        question: "Can fun journal prompts actually be beneficial?",
        answer:
          "Absolutely. Research shows that playful activities reduce cortisol, build creative thinking skills, and increase emotional resilience. Fun journaling keeps your writing habit alive on days when heavy reflection feels like too much. It also reveals surprising things about your personality and preferences.",
      },
      {
        question: "Are fun prompts appropriate for adults?",
        answer:
          "Yes! Play isn't just for children. Dr. Stuart Brown's research shows that adults who maintain playful activities in their lives report greater life satisfaction, creativity, and stress resilience. Fun journaling is a legitimate adult wellness practice — not a juvenile one.",
      },
      {
        question: "How can I use fun prompts with a journaling group?",
        answer:
          "Fun prompts are perfect for groups. Choose a prompt, give everyone 5-10 minutes to write, then share responses. The playful nature lowers the vulnerability barrier that can make group journaling intimidating. It builds connection through shared laughter and creativity.",
      },
      {
        question: "Can kids use these fun prompts too?",
        answer:
          "Most fun prompts work well for ages 8 and up. Younger children might need slight simplification. Fun prompts are actually a great way to introduce kids to journaling because they remove the pressure of 'getting it right' and make writing feel like a game.",
      },
      {
        question:
          "What if I can't think of creative responses?",
        answer:
          "That's the beauty of fun prompts — there are no wrong answers. Write the first thing that comes to mind, even if it's absurd. Creativity research shows that lowering your standards initially actually produces more creative output. Let yourself be silly and imperfect.",
      },
      {
        question:
          "How often should I use fun prompts vs. serious ones?",
        answer:
          "There's no formula, but a good rhythm is to mix fun prompts in 1-2 times per week alongside deeper ones. Think of it like a workout routine — you need recovery days. Fun prompts are the journaling equivalent of a light, enjoyable workout that still builds the habit.",
      },
    ],
    relatedScenes: ["journal-prompts-for-kids", "daily-journal-prompts", "journal-prompts-for-teens"],
    emoji: "🎨",
    defaultMood: "energized",
  },
  {
    slug: "deep-journal-prompts",
    promptScene: "deep",
    title: "Deep",
    h1: "Deep Journal Prompts",
    metaTitle:
      "Deep Journal Prompts for Meaningful Reflection",
    metaDescription:
      "Challenge yourself with deep journal prompts that explore identity, mortality, purpose, and meaning. Smart matching for profound self-reflection.",
    heroSubtitle:
      "Go beyond the surface with prompts that challenge you to explore life's biggest questions — identity, purpose, mortality, and meaning.",
    whyTitle: "Why Deep Journal Prompts Change How You Think",
    whyContent: [
      "Existential psychologist Irvin Yalom identified four 'ultimate concerns' that shape human experience — death, freedom, isolation, and meaninglessness. Deep journal prompts invite you to engage with these themes directly, rather than letting them operate as background anxiety. They confront the questions most people avoid: Who am I really? What am I afraid of? What gives my life meaning?",
      "Research in transformative learning theory by Jack Mezirow shows that genuine personal growth requires 'disorienting dilemmas' — moments where your existing worldview is challenged. Deep journal prompts create these moments safely, on your own terms, in a space where you can explore without social pressure or performance anxiety.",
    ],
    howToUse: [
      "Set aside at least 20 minutes. Deep prompts need space — rushing defeats the purpose.",
      "Write in a place where you feel safe and uninterrupted. These prompts can surface intense emotions.",
      "Don't aim for answers. Aim for honesty. The best deep journaling explores questions without forcing conclusions.",
      "If you feel stuck, write about the stuckness itself. Resistance is often the doorway to insight.",
      "Follow up deep sessions with something nourishing — a walk, a conversation, or a lighter journaling prompt.",
    ],
    psychologySource:
      "Based on existential psychology by Irvin Yalom, narrative identity by Dr. Dan McAdams, transformative learning by Jack Mezirow, and meaning-making research by Dr. Viktor Frankl.",
    faqs: [
      {
        question: "What makes a journal prompt 'deep'?",
        answer:
          "Deep prompts go beyond daily events and surface emotions to explore fundamental questions about identity, values, mortality, meaning, and relationships. They challenge assumptions, invite vulnerability, and often don't have simple answers. The depth comes from the willingness to sit with complexity.",
      },
      {
        question: "Is deep journaling the same as therapy?",
        answer:
          "No. Deep journaling is self-directed exploration, while therapy provides professional guidance, diagnostic tools, and evidence-based interventions. However, they complement each other well. Many therapists assign deep journaling between sessions to deepen self-awareness and process therapeutic insights.",
      },
      {
        question: "How often should I do deep journaling?",
        answer:
          "Once or twice a week is sufficient for most people. Deep journaling is emotionally intensive and requires processing time. Balance it with lighter practices like gratitude or daily reflection. Think of it as strength training — you need recovery between sessions.",
      },
      {
        question: "What if deep journaling makes me feel worse?",
        answer:
          "It's normal to feel temporarily unsettled after deep journaling — you're touching raw material. This discomfort usually passes within a day and is often followed by clarity. However, if distress persists or feels overwhelming, take a break and consider working with a therapist. Deep journaling should challenge you, not harm you.",
      },
      {
        question: "Can beginners start with deep prompts?",
        answer:
          "It's better to build a journaling foundation with lighter prompts first. Once you're comfortable with the practice and have developed trust in the process, gradually introduce deeper prompts. Think of it as learning to swim — start in the shallow end before diving deep.",
      },
      {
        question: "How do I know if I'm journaling deeply enough?",
        answer:
          "If your writing surprises you — if you write something you didn't know you thought — you're going deep enough. Depth isn't about word count or tears. It's about honesty and discovery. If every entry confirms what you already knew, try pushing past your first answer to the question underneath it.",
      },
    ],
    relatedScenes: ["shadow-work-journal-prompts", "self-discovery-journal-prompts", "journal-prompts-for-mental-health"],
    emoji: "🌊",
    defaultMood: "reflective",
  },
  {
    slug: "journal-prompts-for-middle-school",
    promptScene: "middle-school",
    title: "Middle School",
    h1: "Journal Prompts for Middle School",
    metaTitle:
      "Journal Prompts for Middle School Students",
    metaDescription:
      "Age-appropriate journal prompts for middle school students that support identity development, peer navigation, and emotional growth.",
    heroSubtitle:
      "Navigate the ups and downs of middle school with journal prompts that get what you're going through — no lectures, just real questions.",
    whyTitle: "Why Journal Prompts for Middle School Students Matter",
    whyContent: [
      "Middle school (ages 10-14) marks the beginning of 'formal operational thinking' — the ability to think abstractly and reflect on your own thought processes. Journal prompts for middle school help students develop metacognition — thinking about thinking — which research links to better academic performance, emotional regulation, and social skills.",
      "This age is also when peer relationships become intensely important. Dr. Roy Baumeister's belonging research shows that social exclusion during early adolescence can have lasting effects on self-worth. Journal prompts for middle school give students a private space to process social challenges, build self-awareness, and develop coping strategies without the vulnerability of sharing publicly.",
    ],
    howToUse: [
      "Start with prompts that are fun or creative — build the habit before going deep.",
      "Write for 5-10 minutes. Short, consistent sessions work better than occasional long ones.",
      "Your journal is private — write honestly without worrying about grades or judgment.",
      "If a prompt doesn't click, skip it and try another. Not every prompt is for everyone.",
      "Look back at old entries occasionally. You'll be surprised how much you've changed and grown.",
    ],
    psychologySource:
      "Based on metacognitive development research, belonging theory by Dr. Roy Baumeister, and social-emotional learning frameworks for early adolescence.",
    faqs: [
      {
        question: "Why is journaling good for middle school students?",
        answer:
          "Middle school is a period of rapid cognitive and emotional development. Journaling helps students process social complexity, develop emotional vocabulary, and build self-awareness during a time when these skills are actively forming. It also improves writing skills as a natural byproduct.",
      },
      {
        question:
          "How can teachers incorporate journal prompts in the classroom?",
        answer:
          "Start with 5-minute warm-up writes at the beginning of class. Use fun or low-stakes prompts to build the habit. Allow students to choose from 2-3 prompts so they have autonomy. Most importantly, establish clear privacy norms — not every journal entry should be graded or shared.",
      },
      {
        question: "What if a student refuses to journal?",
        answer:
          "Don't force it. Offer alternatives like drawing, bullet points, or dictating to a voice recorder. Some students resist because of writing anxiety, not because they don't want to reflect. Remove the 'wrong answer' pressure by emphasizing that content and grammar won't be graded.",
      },
      {
        question: "Are these prompts appropriate for 10-14 year olds?",
        answer:
          "Yes. These prompts are specifically designed for the middle school developmental stage. They address age-relevant topics like friendships, school stress, growing up, and identity without touching on themes more appropriate for older teens or adults.",
      },
      {
        question: "How can parents support their middle schooler's journaling?",
        answer:
          "Provide materials (a cool notebook and pens), create space (time and a quiet spot), and then step back. Don't read their journal without permission, don't critique their writing, and don't ask 'What did you write about?' Instead, model journaling yourself and be available if they want to share.",
      },
      {
        question:
          "Can journaling help with middle school bullying?",
        answer:
          "Journaling gives bullied students a safe outlet to process their experiences and maintain self-worth. It can also help students who bully examine their behavior's impact. However, journaling alone doesn't stop bullying — it's a coping and reflection tool, not an intervention. Schools need comprehensive anti-bullying programs alongside individual supports.",
      },
    ],
    relatedScenes: ["journal-prompts-for-teens", "journal-prompts-for-kids", "journal-prompts-for-high-school"],
    emoji: "📚",
    defaultMood: "curious",
  },
  {
    slug: "journal-prompts-for-high-school",
    promptScene: "high-school",
    title: "High School",
    h1: "Journal Prompts for High School",
    metaTitle:
      "Journal Prompts for High School Students & Teens",
    metaDescription:
      "Meaningful journal prompts for high school students exploring identity, pressure, and purpose. Smart prompt matching for teens ready to go deep.",
    heroSubtitle:
      "Process the pressure, explore your identity, and figure out what actually matters to you — with prompts designed for the high school experience.",
    whyTitle: "Why Journal Prompts for High School Students Help",
    whyContent: [
      "The American Psychological Association consistently finds that teens report stress levels higher than adults, yet have fewer developed coping tools. Journal prompts for high school students bridge that gap — addressing academic performance anxiety, social comparison amplified by social media, college admissions stress, and the fundamental question of identity formation.",
      "Erik Erikson identified the core psychological task of adolescence as 'identity vs. role confusion' — figuring out who you are. Journal prompts for high school provide the reflective space to explore identity questions without the social risk of doing so publicly. It's where students can be honest about confusion, contradiction, and growth.",
    ],
    howToUse: [
      "Choose prompts that feel relevant to your life right now. If nothing fits perfectly, adapt it.",
      "Write for at least 10 minutes. Give yourself space to get past the surface-level answer.",
      "Be radically honest. This journal is for you — not your teacher, your parents, or your social media followers.",
      "Use journaling to process decisions, conflicts, and stress before they build up.",
      "Keep your journal private and respect others' privacy too.",
    ],
    psychologySource:
      "Based on identity development by Erik Erikson, adolescent stress research by the American Psychological Association, and academic reflection research in educational psychology.",
    faqs: [
      {
        question: "Why should high school students journal?",
        answer:
          "High school is a period of intense identity formation, social complexity, and academic pressure. Journaling provides a private space to process all of this, develop self-awareness, and build coping strategies. It also strengthens writing and critical thinking skills that directly benefit academic performance.",
      },
      {
        question: "How can journaling help with college application stress?",
        answer:
          "Journaling helps you clarify who you are and what matters to you — which directly feeds into stronger personal essays. It also reduces the anxiety of the admissions process by giving you a private outlet for fears and pressures. Many students find that their journal entries become the raw material for compelling application essays.",
      },
      {
        question: "What if I don't consider myself a 'journal person'?",
        answer:
          "Journaling doesn't require a certain personality type. It's simply a tool for thinking on paper. If traditional journaling doesn't appeal to you, try bullet-point reflections, voice memos, or even texting your thoughts to yourself. The format matters less than the practice of regular self-reflection.",
      },
      {
        question: "How do I find time to journal with a busy schedule?",
        answer:
          "Start with just 5 minutes — before bed, during a study break, or while eating breakfast. You don't need a dedicated 'journaling hour.' Even brief, consistent sessions build the self-awareness muscle. Many busy students find that journaling actually saves time by helping them think more clearly and stress less.",
      },
      {
        question: "Can teachers use these prompts in class?",
        answer:
          "Yes! These prompts work well as warm-up exercises, reflective assignments, or discussion starters. For classroom use, let students choose from multiple prompts and establish that reflective journals won't be graded on content — only participation. This preserves the honesty that makes journaling effective.",
      },
      {
        question:
          "What's the difference between middle school and high school journal prompts?",
        answer:
          "High school prompts address more complex themes: identity formation, existential questions, relationship depth, future planning, and systemic pressures like college admissions and social media. They assume greater cognitive maturity and invite deeper self-analysis than middle school prompts.",
      },
      {
        question: "How can journaling help with mental health in high school?",
        answer:
          "Journaling reduces rumination, improves emotional regulation, and provides an outlet for stress. For high school students dealing with anxiety, depression, or social challenges, journaling creates a safe processing space. It's not a replacement for professional support, but a valuable complement to it.",
      },
    ],
    relatedScenes: ["journal-prompts-for-teens", "journal-prompts-for-middle-school", "self-discovery-journal-prompts"],
    emoji: "🎓",
    defaultMood: "reflective",
  },
];
