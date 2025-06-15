# AI Itinerary - Group Trip Planning Made Easy

A modern web application for coordinating group trips, built with React, TypeScript, and Supabase.

## 🚀 Features

- **Collaborative Planning**: Invite friends and plan together
- **Trip Organization**: Manage accommodations, activities, and meals
- **Cost Splitting**: Automatic expense calculations
- **Real-time Updates**: See changes as they happen
- **Mobile Friendly**: Works great on all devices

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **State Management**: Zustand
- **Routing**: React Router
- **Build Tool**: Vite
- **Icons**: Lucide React

## 🏃‍♂️ Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment**:
   ```bash
   cp .env.example .env
   ```
   Then update the Supabase credentials in `.env`

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Input, etc.)
│   └── layout/         # Layout components (Header, Layout)
├── pages/              # Page components
├── stores/             # Zustand state stores
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── lib/                # External library configurations
```

## 🔧 Development

- **Linting**: `npm run lint`
- **Building**: `npm run build`
- **Preview**: `npm run preview`

## 🌐 Deployment

This project is optimized for deployment on modern hosting platforms:

- **Netlify**: Connect your repo and deploy automatically
- **Vercel**: Zero-config deployment
- **Supabase**: Database and auth are already cloud-hosted

## 📊 System Diagnostics

Visit `/diagnostics` to check system health and troubleshoot issues.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details