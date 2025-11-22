# ⚽🏏 Sportify - Multi-Sport Mobile Application

A modern, feature-rich React Native mobile application for sports enthusiasts. Track matches, explore players, manage favorites, and stay updated with football and cricket content - all in one beautifully designed app.

![React Native](https://img.shields.io/badge/React_Native-0.81.5-61DAFB?style=flat&logo=react)
![Expo](https://img.shields.io/badge/Expo-~54.0.20-000020?style=flat&logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat&logo=typescript)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.9.2-764ABC?style=flat&logo=redux)

## ✨ Features

### 🎯 Core Functionality
- **Multi-Sport Support**: Seamlessly switch between Football ⚽ and Cricket 🏏
- **Match Tracking**: Browse upcoming and live matches with detailed information
- **Player Database**: Explore comprehensive player profiles with stats and positions
- **Favorites System**: Save your favorite matches and players for quick access
- **Smart Filtering**: Filter content by sport, position, and search by name
- **User Profiles**: Personalized accounts with profile management

### 🔐 Authentication
- **Secure Registration**: Create accounts with encrypted password storage
- **Local Authentication**: Built-in credential management system
- **Session Management**: Persistent login with secure token storage
- **Form Validation**: Real-time validation using Formik and Yup

### 🎨 User Experience
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized for all screen sizes
- **Smooth Navigation**: Intuitive bottom tab navigation
- **Modern UI**: Clean interface with electric blue accent (#1E88E5)
- **Loading States**: Elegant loading spinners and transitions
- **Personalized Header**: Greeting message with user avatar

### 📱 Technical Highlights
- **TypeScript**: Fully typed codebase for reliability
- **Redux State Management**: Centralized state with 5 specialized slices
- **Persistent Storage**: AsyncStorage with encryption
- **Navigation**: React Navigation 7.x with stack and tab navigators
- **Custom Components**: Reusable Button, Input, Card, and Header components
- **Mock Data**: 10 football matches, 10 cricket matches, and 20 players

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Expo Go app on your mobile device ([iOS](https://apps.apple.com/app/apple-store/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- Git installed

### Installation

```bash
# Clone the repository
git clone https://github.com/yashodha-22uom/Mobile-app.git

# Navigate to project directory
cd Mobile-app/sportify

# Install dependencies
npm install

# Start the development server
npm start
```

### Running the App

1. **Start Expo Dev Server**
   ```bash
   npm start
   ```

2. **Open on Your Device**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator

3. **Alternative Commands**
   ```bash
   npm run android  # Run on Android emulator
   npm run ios      # Run on iOS simulator
   npm run web      # Run in web browser
   ```

## 📂 Project Structure

```
sportify/
├── src/
│   ├── components/
│   │   ├── cards/          # MatchCard, PlayerCard
│   │   └── common/         # Button, Input, Header, LoadingSpinner
│   ├── constants/
│   │   ├── colors.ts       # Theme colors
│   │   └── types.ts        # TypeScript interfaces
│   ├── data/
│   │   ├── mockMatches.ts  # Sample match data
│   │   └── mockPlayers.ts  # Sample player data
│   ├── hooks/
│   │   └── useTheme.ts     # Theme hook
│   ├── navigation/
│   │   ├── AppNavigator.tsx       # Root navigator
│   │   ├── AuthNavigator.tsx      # Login/Register stack
│   │   └── BottomTabNavigator.tsx # Main app tabs
│   ├── redux/
│   │   ├── store.ts        # Redux store configuration
│   │   └── slices/         # State slices (auth, matches, players, favorites, theme)
│   ├── screens/
│   │   ├── auth/           # LoginScreen, RegisterScreen
│   │   └── main/           # HomeScreen, PlayersScreen, FavoritesScreen, ProfileScreen
│   ├── services/
│   │   ├── api.ts          # API configuration
│   │   ├── authService.ts  # Authentication logic
│   │   └── storageService.ts # AsyncStorage wrapper
│   └── utils/
│       ├── helpers.ts      # Utility functions
│       └── validation.ts   # Form validation schemas
├── assets/                 # Images and icons
├── App.tsx                 # App entry point
└── package.json           # Dependencies
```

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React Native 0.81.5, Expo SDK 54 |
| **Language** | TypeScript (Strict Mode) |
| **State Management** | Redux Toolkit 2.9.2 |
| **Navigation** | React Navigation 7.x |
| **Forms** | Formik 2.4.6 + Yup 1.7.1 |
| **Storage** | AsyncStorage 2.2.0 |
| **HTTP Client** | Axios 1.12.2 |
| **Icons** | @expo/vector-icons 15.0.3 |
| **Encryption** | Expo Crypto 15.0.7 |

## 📱 Screenshots & Features

### Authentication Flow
- **Registration**: Create account with email, username, and password
- **Login**: Secure authentication with local credential verification
- **Validation**: Real-time form validation with helpful error messages

### Main Screens
- **Home**: Browse matches filtered by sport with upcoming match cards
- **Players**: Searchable player database with position filters
- **Favorites**: Quick access to saved matches and players
- **Profile**: View and manage account settings, toggle dark mode

### UI Components
- **Match Cards**: Display team names, scores, dates, and venues
- **Player Cards**: Show player photos, positions, ratings, and stats
- **Sport Filters**: Toggle between All, Football, and Cricket
- **Search Bar**: Real-time filtering by player name
- **User Avatar**: Personalized header with first initial badge

## 🔧 Configuration

### Environment Setup
No environment variables required - the app uses local mock data and AsyncStorage.

### Customization
- **Colors**: Edit `src/constants/colors.ts` to change theme
- **Mock Data**: Update `src/data/mockMatches.ts` and `mockPlayers.ts`
- **API Integration**: Modify `src/services/api.ts` for backend connection

## 📖 Usage Guide

### Creating an Account
1. Launch the app
2. Tap "Create New Account"
3. Enter email, username, and password
4. Tap "Register" - you'll be logged in automatically

### Browsing Content
1. **Home Screen**: Tap sport filters (All/⚽/🏏) to filter matches
2. **Players Screen**: Use search bar or position filters
3. **Tap any card** to view details (future feature)

### Managing Favorites
1. Tap the heart icon on any match or player card
2. View all favorites in the Favorites tab
3. Tap heart again to remove from favorites

### Dark Mode
1. Go to Profile screen
2. Toggle "Dark Mode" switch
3. Theme persists across app restarts

## 🐛 Troubleshooting

### Common Issues

**Metro bundler errors:**
```bash
npm start -- --clear
```

**Module resolution issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port conflicts:**
```bash
npm start -- --port 19001
```

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed solutions.

## 📋 Requirements Coverage

✅ **React Native Components** (10+): View, Text, Image, FlatList, ScrollView, TouchableOpacity, TextInput, Switch, ActivityIndicator, SafeAreaView  
✅ **React Hooks**: useState, useEffect, useCallback, useMemo, useSelector, useDispatch  
✅ **Navigation**: Stack Navigator, Bottom Tab Navigator, Deep Linking Support  
✅ **State Management**: Redux Toolkit with 5 slices and middleware  
✅ **Form Handling**: Formik with Yup validation schemas  
✅ **Data Persistence**: AsyncStorage with encryption  
✅ **TypeScript**: Strict mode with comprehensive type definitions  
✅ **Custom Components**: Reusable Button, Input, Card, Header, Spinner  
✅ **Advanced Features**: Multi-sport filtering, search, favorites, dark mode, authentication  

See [REQUIREMENTS_CHECKLIST.md](REQUIREMENTS_CHECKLIST.md) for detailed verification.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Yashodha Mandrini**
- GitHub: [@yashodha-22uom](https://github.com/yashodha-22uom)
- University of Moratuwa

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- Icons from [@expo/vector-icons](https://icons.expo.fyi/)
- Mock API from [DummyJSON](https://dummyjson.com/)
- Inspired by modern sports applications

## 📞 Support

If you encounter any issues or have questions:
- Check the [Troubleshooting Guide](TROUBLESHOOTING.md)
- Review [Completion Guide](COMPLETION_GUIDE.md)
- Open an issue on GitHub

---

⭐ If you found this project helpful, please give it a star!
