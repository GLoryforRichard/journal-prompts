/**
 * The routes for the application
 */
export enum Routes {
  Root = '/',

  // marketing pages
  FAQ = '/#faqs',
  Features = '/#features',
  Pricing = '/pricing',
  Blog = '/blog',
  Docs = '/docs',
  About = '/about',
  Contact = '/contact',
  Waitlist = '/waitlist',
  Changelog = '/changelog',
  Roadmap = '/roadmap',
  CookiePolicy = '/cookie',
  PrivacyPolicy = '/privacy',
  TermsOfService = '/terms',

  FindYourPrompt = '/find-your-prompt',

  // technique pages
  Techniques = '/techniques',
  TechniqueFreeWriting = '/techniques/free-writing',
  TechniqueGratitudeJournaling = '/techniques/gratitude-journaling',
  Technique5MinuteJournal = '/techniques/5-minute-journal',
  TechniqueMorningPages = '/techniques/morning-pages',
  TechniqueBulletJournaling = '/techniques/bullet-journaling',
  TechniqueCbtJournaling = '/techniques/cbt-journaling',
  TechniqueForBeginners = '/techniques/for-beginners',

  // scene pages
  Gratitude = '/gratitude-journal-prompts',
  MentalHealth = '/journal-prompts-for-mental-health',
  ShadowWork = '/shadow-work-journal-prompts',
  Kids = '/journal-prompts-for-kids',
  Daily = '/daily-journal-prompts',
  Teens = '/journal-prompts-for-teens',
  SelfDiscovery = '/self-discovery-journal-prompts',
  SelfLove = '/self-love-journal-prompts',
  Mindfulness = '/mindfulness-journal-prompts',
  Morning = '/morning-journal-prompts',
  Fun = '/fun-journal-prompts',
  Deep = '/deep-journal-prompts',
  MiddleSchool = '/journal-prompts-for-middle-school',
  HighSchool = '/journal-prompts-for-high-school',

  // auth routes
  Login = '/auth/login',
  Register = '/auth/register',
  AuthError = '/auth/error',
  ForgotPassword = '/auth/forgot-password',
  ResetPassword = '/auth/reset-password',

  // journal (logged-in home)
  Dashboard = '/my-journal',

  // admin routes
  AdminUsers = '/admin/users',

  // settings routes
  SettingsProfile = '/settings/profile',
  SettingsBilling = '/settings/billing',
  SettingsCredits = '/settings/credits',
  SettingsSecurity = '/settings/security',
  SettingsNotifications = '/settings/notifications',
  SettingsApiKeys = '/settings/apikeys',

  // payment processing
  Payment = '/payment',
}

/**
 * The routes that can not be accessed by logged in users
 */
export const routesNotAllowedByLoggedInUsers = [Routes.Login, Routes.Register];

/**
 * The routes that are protected and require authentication
 */
export const protectedRoutes = [
  Routes.Dashboard,
  Routes.AdminUsers,
  Routes.SettingsProfile,
  Routes.SettingsBilling,
  Routes.SettingsCredits,
  Routes.SettingsSecurity,
  Routes.SettingsNotifications,
  Routes.SettingsApiKeys,
  Routes.Payment,
];

/**
 * The default redirect path after logging in
 */
export const DEFAULT_LOGIN_REDIRECT = Routes.Dashboard;
