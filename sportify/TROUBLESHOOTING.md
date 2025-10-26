# 🔧 Sportify App - Troubleshooting Guide

## Issue 1: "java.lang.String cannot be cast to java.lang.Boolean"

### Root Cause
This error occurs when React Native's JavaScript bridge incorrectly marshals boolean values to Android's Java layer as strings.

### ✅ Fixes Applied

1. **Removed React Native New Architecture** (app.json)
   - Disabled `newArchEnabled` flag
   - Removed experimental Android flags

2. **Simplified Navigation Configuration**
   - Used `React.useMemo` for screen options to ensure stable references
   - Replaced string `tabBarLabel` with React component functions
   - Removed redundant option overrides

3. **Added Proper Navigation Theme**
   - NavigationContainer now uses explicit DefaultTheme/DarkTheme
   - Proper color mapping from app theme

### 🚀 How to Fix

**Option 1: Clear Cache and Restart (Try this first)**
```bash
# Stop the server (Ctrl+C)
npx expo start -c

# On your phone:
1. Force close Expo Go app
2. Clear Expo Go app cache (Settings → Apps → Expo Go → Clear Cache)
3. Scan QR code again
```

**Option 2: Complete Reset**
```bash
# Stop the server
# Delete cache folders
rm -rf .expo
rm -rf node_modules
rm -rf %TEMP%\metro-*

# Reinstall
npm install

# Start fresh
npx expo start -c
```

**Option 3: Try Expo Go Update**
```bash
# Update Expo Go app on your phone
- Go to Play Store
- Search "Expo Go"
- Update to latest version
```

**Option 4: Development Build (If nothing else works)**
```bash
# Create a development build
npx expo install expo-dev-client
npx expo prebuild
npx expo run:android
```

---

## Issue 2: "Could not connect to the server"

### Root Cause
Network connectivity issue between your phone and development computer.

### ✅ Solutions

**Check 1: Same Network**
- Ensure both your computer and phone are on the SAME WiFi network
- Disable mobile data on your phone
- Try disabling VPN if you have one

**Check 2: Firewall**
```powershell
# Allow Node.js through Windows Firewall
New-NetFirewallRule -DisplayName "Expo Metro" -Direction Inbound -Program "C:\Program Files\nodejs\node.exe" -Action Allow
```

**Check 3: Use Tunnel Mode**
```bash
# Start with tunnel
npx expo start --tunnel

# This will work even on different networks
```

**Check 4: Manual IP Address**
```bash
# Find your computer's IP address
ipconfig

# Look for "IPv4 Address" under your active network adapter
# Example: 192.168.1.100

# Then in Expo Go app:
1. Tap "Enter URL manually"
2. Enter: exp://YOUR_IP_ADDRESS:8081
```

**Check 5: Restart Metro Bundler**
```bash
# Kill all Node processes
taskkill /F /IM node.exe

# Restart
npm start
```

---

## Issue 3: App Crashes Immediately

### Possible Causes & Fixes

**Cause 1: Metro Bundler Not Running**
- Check terminal - you should see "Metro waiting on exp://..."
- If not, run `npm start`

**Cause 2: JavaScript Bundle Error**
- Check terminal for red error messages
- Look for syntax errors or missing imports

**Cause 3: Native Module Issues**
- Clear Expo Go cache
- Reinstall Expo Go app
- Try on a different phone

**Cause 4: Android Version**
- Sportify requires Android 6.0+ (API 23+)
- Check your phone's Android version

---

## Testing Checklist

After applying fixes, test in this order:

- [ ] Terminal shows "Metro Bundler is running"
- [ ] No red errors in terminal
- [ ] QR code is displayed
- [ ] Phone and computer on same WiFi
- [ ] Expo Go app is updated
- [ ] Expo Go cache is cleared
- [ ] Scan QR code
- [ ] App loads without errors
- [ ] Can see login screen
- [ ] Can navigate between screens

---

## Emergency Reset (Nuclear Option)

If nothing works, start completely fresh:

```bash
# 1. Stop all Node processes
taskkill /F /IM node.exe

# 2. Delete everything
rm -rf node_modules
rm -rf .expo
rm -rf .expo-shared
rm package-lock.json

# 3. Reinstall
npm install

# 4. Clear all caches
npx expo start -c

# 5. On phone: Uninstall and reinstall Expo Go

# 6. Scan QR code
```

---

## Still Having Issues?

### Check System Requirements
- Node.js 18+ installed
- npm 9+ installed
- Expo Go app latest version
- Android 6.0+ or iOS 13+

### Common Error Messages

| Error | Solution |
|-------|----------|
| `EADDRINUSE` | Port 8081 is in use. Kill Node and restart |
| `Module not found` | Run `npm install` |
| `Unable to resolve module` | Clear cache with `npx expo start -c` |
| `Network request failed` | Check WiFi, try tunnel mode |
| `Java.lang.String cannot be cast` | Clear Expo cache, force close app |

---

## Working Configuration

**Package Versions:**
- expo: ~54.0.20
- react: 19.1.0
- react-native: 0.81.5
- @react-navigation/native: ^7.1.18
- @react-navigation/bottom-tabs: ^7.5.0
- @react-navigation/native-stack: ^7.5.1

**App Configuration (app.json):**
- newArchEnabled: DISABLED (removed)
- userInterfaceStyle: automatic
- No experimental Android flags

---

## Issue 8: "Property 'positions' doesn't exist" Error ⚠️

### Root Cause
The `positions` variable in PlayersScreen was defined with `useMemo` but there was a potential race condition or caching issue causing it to be undefined at runtime.

### ✅ Fix Applied

**Updated `PlayersScreen.tsx`:**
Changed the positions memoization to explicitly return array copies:

```typescript
// Get positions based on selected sport
const positions: string[] = useMemo(() => {
  if (selectedSport === 'Cricket') {
    return [...cricketPositions];  // ✅ Return array copy
  } else if (selectedSport === 'Football') {
    return [...footballPositions];  // ✅ Return array copy
  }
  // For 'All' sports, combine both
  const combined = ['All', ...Array.from(new Set([...footballPositions.slice(1), ...cricketPositions.slice(1)]))];
  return combined;  // ✅ Store in variable first
}, [selectedSport]);
```

### How to Apply the Fix:

1. **The code has been updated** - changes are saved
2. **Reload the app**:
   - In Expo Go, shake your device and tap "Reload"
   - OR press `r` in the terminal where Expo is running
   - OR restart Expo: `npx expo start --clear`

### Current Status
✅ TypeScript: **No errors**  
✅ Code fix: **Applied**  
🔄 Next step: **Reload the app in Expo Go**

---

## Need More Help?

1. Check terminal output for error details
2. Look at the stack trace in Expo Go app
3. Try on a different device
4. Use tunnel mode: `npx expo start --tunnel`

Good luck! 🚀

