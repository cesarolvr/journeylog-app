# JourneyLog

<div align="center">
  <img src="public/images/logoFull.png" alt="JourneyLog Logo" width="300"/>
  
  <p>
    <strong>Turn your habits into a diary!</strong>
  </p>

  [![Website](https://img.shields.io/badge/Website-journeylog.app-green?style=for-the-badge&logo=vercel)](https://journeylog.app)
  [![Twitter](https://img.shields.io/badge/Twitter-@journeylogapp-blue?style=for-the-badge&logo=twitter)](https://twitter.com/journeylogapp)
  [![Instagram](https://img.shields.io/badge/Instagram-@journeylogapp-purple?style=for-the-badge&logo=instagram)](https://instagram.com/journeylogapp)
</div>

## 🌟 About

JourneyLog helps you track your daily habits and routines, turning them into a beautiful diary of your progress. Stay motivated with reminders and watch your streaks grow!

## ✨ Features

- 📱 Multiple notification channels (WhatsApp, Email, SMS)
- 📊 Beautiful habit tracking interface
- 🔔 Customizable reminders
- 📈 Progress insights and statistics
- 🎯 Goal setting and achievement tracking
- 🔒 Secure and private

## 🚀 Getting Started

1. Visit [journeylog.app](https://journeylog.app)
2. Sign up for a free account
3. Start tracking your habits!

## 💻 Local Development

### Prerequisites

- Node.js 18+ and npm/yarn
- Git
- Supabase account
- Stripe account (for payments)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/cesarolvr/journeylog-app.git
   cd journeylog-app
   ```

2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

3. Create environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then fill in your environment variables in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret

4. Start the development server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Testing

Run the test suite:
```bash
yarn test
# or
npm test
```

### Building for Production

```bash
yarn build
# or
npm run build
```

## 💡 Use Cases

- 🏋️‍♂️ Fitness and workout tracking
- 📚 Reading and learning goals
- 💧 Hydration and health habits
- 📝 Daily journaling
- 🎨 Creative practice tracking
- And much more!

## 🗺️ Roadmap

Here are some planned improvements for the project:

- 🧪 Add unit tests to ensure code reliability
- 🧪 Implement end-to-end tests for critical user flows
- 🔄 Remove duplicate logic and improve code abstraction
- 🎨 Optimize SVG assets for better performance
- 🧩 Improve component responsibility separation
- ✨ Refine microinteractions for better user experience

Suggestions for future improvements:
- 🌐 Add internationalization support
- 📱 Improve mobile responsiveness
- 🎨 Implement a dark/light theme toggle
- 📊 Add more detailed analytics and insights
- 🤖 Implement AI-powered habit suggestions
- 🔄 Add data export/import functionality

## 📱 Connect With Us

- Website: [journeylog.app](https://journeylog.app)
- Twitter: [@journeylogapp](https://twitter.com/journeylogapp)
- Instagram: [@journeylogapp](https://instagram.com/journeylogapp)

## 🛠️ Tech Stack

- Next.js
- TypeScript
- Supabase
- Framer Motion
- Tailwind CSS

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. This means you are free to use, modify, and distribute the code, even for commercial purposes, as long as you include the original copyright notice and license.
