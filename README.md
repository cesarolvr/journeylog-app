# Journeylog App

A habit and goal tracking application that helps users transform their habits and goals into a consistent journey.

## Security Considerations

This repository contains sensitive information that should be properly secured before making it public:

1. **Environment Variables**
   - Copy `.env.example` to `.env` and fill in your actual values
   - Never commit the `.env` file
   - All sensitive API keys and credentials should be stored in environment variables

2. **API Keys and Secrets**
   - Supabase credentials
   - Stripe API keys
   - Google Analytics ID
   - Facebook Pixel ID

3. **Contact Information**
   - Update the contact email in `.env` file
   - The default contact email is 'contact@journeylog.app'

## Setup Instructions

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Required environment variables are documented in `.env.example`. Make sure to set up all the following:

- Supabase configuration
- Stripe configuration
- Analytics IDs
- Contact information

## Contributing

When contributing to this repository, please ensure:

1. Never commit sensitive information
2. Use environment variables for all configuration
3. Follow the security guidelines above

## License

[Your chosen license]
