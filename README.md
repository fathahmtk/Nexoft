# AURA - AI-Powered Personal Growth Platform

A beautiful, modern web application for tracking habits, setting goals, and unlocking your full potential with AI-powered insights.

## Features

### Core Features
- **Dashboard** - Overview of your daily progress, habits, and goals
- **Habit Tracking** - Build consistency with daily habit tracking and streak monitoring
- **Goal Management** - Set, track, and achieve your long-term objectives
- **Journal** - Document your thoughts and reflect on your journey
- **Analytics** - Visualize your progress with beautiful charts and insights
- **AI Insights** - Get personalized recommendations powered by Gemini AI

### Design Highlights
- Modern, aesthetic UI with smooth animations
- Full dark/light mode support
- Responsive design for all devices
- Custom animated cursor (desktop only)
- Gradient backgrounds and glass morphism effects
- Smooth page transitions

### Tech Stack
- React 19 with TypeScript
- Framer Motion for animations
- TailwindCSS for styling
- React Router for navigation
- Lucide React for icons
- Google Gemini AI for intelligent insights
- Supabase ready for database integration

## Getting Started

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set your Gemini API key in `.env.local`:
   ```
   GEMINI_API_KEY=your_key_here
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
├── pages/
│   ├── Landing.tsx      - Landing page with hero section
│   ├── Dashboard.tsx    - Main dashboard overview
│   ├── Habits.tsx       - Habit tracking interface
│   ├── Goals.tsx        - Goal management system
│   ├── Journal.tsx      - Personal journal entries
│   ├── Analytics.tsx    - Progress visualization
│   └── AIInsights.tsx   - AI-powered recommendations
├── utils/
│   └── supabase.ts      - Database utilities
└── App.tsx              - Main app component with routing
```

## Features in Detail

### Habit Tracking
- Create unlimited habits with custom icons
- Track daily completion
- Monitor streaks
- Visual progress indicators

### Goal Management
- Set goals with deadlines
- Track progress percentage
- Categorize by type (Personal, Career, Learning, etc.)
- Visual progress bars

### AI-Powered Insights
- Ask AI coach for personalized advice
- Get smart insights based on your patterns
- Growth score calculation
- Quick wins and focus areas

### Analytics Dashboard
- Weekly activity charts
- Category breakdown
- Achievement badges
- Consistency metrics

## Customization

The app uses a modern violet/purple color scheme. You can easily customize the colors by modifying the Tailwind classes throughout the components.
