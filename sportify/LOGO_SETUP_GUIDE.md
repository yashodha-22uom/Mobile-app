# How to Add Your Custom Logo

## Step 1: Save the Logo Image

1. Save the shield logo image (the one you attached) with the name `logo.png`
2. Place it in the `assets` folder of your project:
   ```
   c:\Users\Mandrini Yashodha\Desktop\Mobile-app\sportify\assets\logo.png
   ```

## Step 2: What's Been Updated

✅ **Header.tsx** - Updated to use `<Image>` component instead of emoji
- Now imports `Image` from 'react-native'
- Uses `require('../../../assets/logo.png')` to load your logo
- Logo displays at 36x36 pixels (perfect for header)
- Uses `resizeMode="contain"` to maintain aspect ratio

## Step 3: Test the Logo

After saving the logo image to the assets folder:

1. Reload your app in Expo Go (shake device and tap "Reload")
2. Your custom shield logo with cricket ball and football will appear in the header
3. The logo will show on all main screens (Home, Players, Favorites, Profile)

## Alternative: If the image path doesn't work

If you get an error, you can also:

1. Use a URL-based image (if hosted online):
   ```tsx
   <Image
     source={{ uri: 'https://your-url.com/logo.png' }}
     style={styles.logoImage}
   />
   ```

2. Or use a different format (PNG, JPG, or SVG)

## Logo Specifications

- **Current size in header**: 36x36 pixels
- **Format**: PNG (with transparent background recommended)
- **Colors**: Matches your app theme (Blue and Orange)
- **Design**: Shield with cricket ball and football - perfect for Sportify!

---

**Next Steps:**
1. Save the logo.png file to the assets folder
2. Reload the app
3. Enjoy your professional custom logo! 🎯
