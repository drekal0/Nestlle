# 🦁 Nestlle: The Stellar Community Engagement Hub

Nestlle is a premium, **verifiable community engagement hub** built exclusively for the **Stellar Ecosystem**. It bridges the gap between community social action and on-chain rewards, creating a circular economy for creators, gamers, and developers.

![Nestlle Banner](https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200)

## 🌟 Core Features

### 🎮 Gaming & Quests hub
- **Play-to-Earn**: Integrated gaming directory featuring Soroban-native titles.
- **Dynamic Tasks**: Complete social, educational, and on-chain tasks to earn XP and badges.
- **Leaderboards**: Real-time community rankings based on verifiable engagement.

### 🏦 Fiat Off-ramp (Linkio Integration)
- **Direct-to-Bank**: seamlessly withdraw earned rewards to fiat via the **Linkio Global Bridge**.
- **ACH/Domestic Support**: Secure bank transfers including routing and account verification.
- **XP Swap**: Convert gaming XP into mintable USDC rewards instantly.

### 🛡️ Role-Based Access Control (RBAC)
- **Whitelist Security**: Admin portal access is restricted to verified wallet addresses.
- **Guarded Routes**: Professional route shielding for management and moderation panels.
- **Admin Switcher**: Dynamic UI transitions between User and Admin views for authorized wallets.

### 💎 Stellar Integration
- **Stellar Wallets Kit**: Unified support for Albedo, Freighter, Rabe, and xBull.
- **Real-time Balances**: Live horizon-sync for XLM and custom assets (e.g., USDC).
- **Social Tipping**: Support community leaders with instant XLM tips.

---

## 🛠️ Tech Stack

- **Core**: [Vite](https://vitejs.dev/) + [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (Glassmorphic Theme)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Stellar SDK**: `@creit.tech/stellar-wallets-kit`
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- A Stellar wallet (Freighter, Albedo, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dre2809/Nestlle.git
   cd Nestlle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 🔒 Security & RBAC

Nestlle uses a decentralized identity model. To configure admin access:

1. Locate `src/contexts/UserContext.tsx`.
2. Update the `ADMIN_ADDRESSES` array with the public keys of authorized moderators.
3. The platform will automatically unlock the Admin Dashboard for these users upon wallet connection.

---

## 🌍 Social & Culture

Nestlle celebrates **African heritage and global community culture**. Our design system and content narratives are crafted to highlight the vibrancy of the Stellar community while maintaining a premium, "Apple-esque" user experience.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Built with ⚡ on **Stellar**.
