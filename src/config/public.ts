export const publicConfig = {
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@journeylog.app',
  siteName: 'Journeylog',
  siteDescription: 'Transform Your Habits and Goals into a Consistent Journey',
  siteUrl: 'https://www.journeylog.app',
  socialLinks: {
    twitter: 'https://twitter.com/journeylogapp',
    github: 'https://github.com/yourusername/journeylog-app',
  },
} as const; 