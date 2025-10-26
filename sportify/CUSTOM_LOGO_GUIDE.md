# 🎯 How to Add Your Custom Logo to Sportify

## Your Logo
You have a professional shield logo with:
- 🏏 **Cricket ball** (blue) on top
- ⚽ **Football** (orange) on bottom
- 🛡️ **Shield border** (dark blue)

Perfect for representing both sports in your app!

---

## Step-by-Step Instructions

### ✅ Step 1: Save the Logo Image

1. **Right-click** on the shield logo image (the second image with cricket and football)
2. **Save it** with the exact name: `logo.png`
3. **Place it** in this folder:
   ```
   c:\Users\Mandrini Yashodha\Desktop\Mobile-app\sportify\assets\logo.png
   ```

**Important:** The file MUST be named exactly `logo.png` (lowercase)

---

### ✅ Step 2: Code is Already Updated!

I've already updated the Header component to use your image logo:

**Changes Made:**
- ✅ Added `Image` import from React Native
- ✅ Replaced shield emoji (🛡️) with your custom logo image
- ✅ Set logo size to 36x36 pixels (perfect for mobile header)
- ✅ Used `resizeMode="contain"` to maintain aspect ratio

---

### ✅ Step 3: Test the Logo

After saving `logo.png` to the assets folder:

1. **Reload your app** in Expo Go
   - Shake your device
   - Tap "Reload"

2. **Your custom logo will appear:**
   - Home screen header
   - Players screen header
   - Favorites screen header
   - Profile screen header

---

## If You Get an Error

If you see an error like "Unable to resolve logo.png":

### Option A: Check File Location
Make sure the file is saved as:
```
sportify/
  assets/
    logo.png  ← Must be here!
    icon.png
    splash-icon.png
```

### Option B: Try Different File Name
If it still doesn't work, try:
1. Rename your logo to `app-logo.png`
2. Update the import in Header.tsx:
   ```tsx
   source={require('../../../assets/app-logo.png')}
   ```

### Option C: Use PNG or JPG
- Preferred format: **PNG** with transparent background
- Alternative: **JPG** (but will have white background)

---

## Logo Specifications

- **Size in app:** 36x36 pixels
- **Format:** PNG (recommended) or JPG
- **Background:** Transparent works best
- **Colors:** Blue (#1E88E5) matches your app theme perfectly! 🎨

---

## What You'll See

**Before:**
```
🛡️ Home     ← Shield emoji
```

**After:**
```
[Shield Logo] Home     ← Your custom logo with cricket & football!
```

---

## Ready to Go! 🚀

1. **Save** the logo.png file to assets folder
2. **Reload** your app
3. **Enjoy** your professional custom branding!

Your logo perfectly represents:
- ⚽ **Football** - Orange soccer ball
- 🏏 **Cricket** - Blue cricket ball
- 🛡️ **Sports Protection** - Shield design
- 🎨 **Brand Colors** - Matches your electric blue theme

---

**Need Help?**
If you encounter any issues, just let me know and I'll help you troubleshoot!
