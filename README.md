# JourneyLog

<div align="center">
  <img src="public/images/logoFull.png" alt="JourneyLog Logo" width="300"/>
  
  <p>
    <strong>Turn your habits into a diary!</strong>
  </p>

 https://github.com/user-attachments/assets/c3375c8b-09b6-4c7d-ad2c-da3a36a254fa


  [![Website](https://img.shields.io/badge/Website-journeylog.app-green?style=for-the-badge&logo=vercel)](https://journeylog.app)
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
- 📊 Add more detailed analytics and insights
- 🤖 Implement AI-powered habit suggestions
- 🔄 Add data export/import functionality

## 📱 Connect With Us

- Website: [journeylog.app](https://journeylog.app)

## 🛠️ Tech Stack

- Next.js
- TypeScript
- Supabase
- Framer Motion
- Tailwind CSS

## 📁 Project Structure

```
journeylog-app/
├── app/                    # Next.js app directory
├── components/            # React components
├── lib/                   # Utility functions and shared code
├── server/               # Server-side code
│   ├── db/              # Database related files
│   │   ├── migrations/  # Database migrations
│   │   └── README.md    # Database documentation
│   ├── cron_notification.sql  # Notification cron job
│   ├── cron_subscription.sql  # Subscription cron job
│   └── reminder.ts      # Reminder functionality
└── public/              # Static files
```

## 🗄️ Database Structure

The database is managed through migrations in the `server/db/migrations` directory. Each migration file is numbered sequentially and contains the changes needed to update the database structure.

### Tables

- **journey**: Stores user's journal journeys
  - Settings like theme, font, and notification frequency
  - Each journey belongs to a user
  - Has RLS policies to ensure users can only access their own journeys

- **log**: Stores individual journal entries
  - Each log belongs to a journey and a user
  - Contains content and type (e.g., BULLET)
  - Has RLS policies to ensure users can only access their own logs

- **notification**: Stores notification settings
  - Delivery preferences (email/phone)
  - Tracks last and next notification times
  - Has RLS policies to ensure users can only access their own notifications

- **feedback**: Stores user feedback
  - Contains feedback content and optional email

### Security

All tables have Row Level Security (RLS) enabled with appropriate policies to ensure data privacy and security. Users can only access their own data.

### Current Migrations

- `000_initial_schema.sql`: Initial database schema with tables, policies, and triggers

### Database Best Practices

1. Always use `IF NOT EXISTS` when creating tables and objects
2. Include appropriate indexes for frequently queried columns
3. Use RLS policies for all tables
4. Keep migrations idempotent (can be run multiple times safely)
5. Document any complex queries or database functions

### How to Apply Database Changes

1. Create a new migration file in `server/db/migrations/` with a sequential number prefix
2. Add your SQL changes to the new file
3. Apply the changes to your Supabase database using the Supabase dashboard or CLI

## ⚙️ Server Components

### Database Migrations

Located in `server/db/migrations/`:
- `000_initial_schema.sql`: Initial database schema with tables, policies, and triggers

### Cron Jobs

Located in `server/`:
- `cron_notification.sql`: Handles notification scheduling
- `cron_subscription.sql`: Manages subscription status
- `reminder.ts`: Implements reminder functionality

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. This means you are free to use, modify, and distribute the code, even for commercial purposes, as long as you include the original copyright notice and license.
