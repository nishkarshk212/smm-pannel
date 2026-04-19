# 🚀 Aviator Game - Crash Betting Platform

A modern, high-performance Aviator crash game platform built with Next.js 14, Prisma, and PostgreSQL. Play, bet, and win big with real-time multiplayer action!

## 🎮 Features

- 🎯 **Aviator Crash Game**: Real-time multiplier game with animated graphics
- 💰 **Wallet System**: Integrated balance management with deposits and withdrawals
- 📊 **Bet Tracking**: Real-time status updates for all your bets and winnings
- 🔐 **Secure Auth**: Powered by NextAuth.js
- 🎨 **Modern UI**: Clean dashboard built with Tailwind CSS
- 📱 **Mobile Responsive**: Play anywhere, anytime on any device
- 🏆 **Referral Program**: Earn bonuses by inviting friends
- ⚡ **Auto Cash Out**: Set target multipliers for automatic payouts

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Auth**: NextAuth.js
- **Styling**: Tailwind CSS
- **Real-time**: Server-Sent Events & Polling

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nishkarshk212/smm-pannel.git
cd smm-pannel
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your database URL and other configuration.

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🎲 How to Play

1. **Place Your Bet**: Choose your bet amount and optional auto cash-out multiplier
2. **Watch Multiplier**: The multiplier starts at 1x and keeps increasing
3. **Cash Out**: Cash out before it crashes to win your bet × multiplier
4. **Win Big!**: Your winnings are instantly added to your balance

## 📦 Deployment

### Deploy to Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables
4. Deploy!

### Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Your app URL
- `NEXTAUTH_SECRET` - NextAuth secret key
- Add more as needed (see `.env.example`)

## 🎯 Game Features

### Provably Fair
- Transparent crash point generation
- Verifiable game outcomes
- Fair play guaranteed

### Real-time Action
- Live multiplayer rounds
- Instant bet placement
- Real-time multiplier updates
- Automatic payouts

### Secure Transactions
- Encrypted payment processing
- Instant deposits
- Fast withdrawals
- Transaction history

## 📊 Admin Features

- User management
- Bet monitoring
- Transaction tracking
- Game statistics
- Revenue analytics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## ⚠️ Disclaimer

Please play responsibly. This is a gambling game and involves financial risk. Must be 18+ to play.

## 📞 Support

For support, please open an issue on GitHub or contact us through the support ticket system in the app.
