# 🚀 Vercel Deployment Guide

## ✅ **Fixed Configuration**

Your project is now properly configured for Vercel deployment with:
- ✅ `@astrojs/vercel` adapter installed
- ✅ `vercel.json` configuration file
- ✅ Server-side rendering enabled
- ✅ API routes properly configured
- ✅ Environment variables support
- ✅ Debug endpoints for troubleshooting

## 🔧 **CRITICAL: Environment Variables Setup**

**This is required to fix the serverless function crash!**

In your Vercel dashboard, add these environment variables:

1. **Go to your Vercel project dashboard**
2. **Settings** → **Environment Variables**
3. **Add these variables:**

```
GMAIL_APP_PASSWORD=your-actual-gmail-app-password
GMAIL_USER=your-gmail-address@gmail.com
```

**⚠️ Important:** 
- Use your actual Gmail App Password (generate one in Google Account settings)
- Make sure there are no extra spaces
- The password should be exactly 16 characters
- Never commit these values to your repository

## 🐛 **Debugging Serverless Function Crashes**

### **Step 1: Check Environment Variables**
Visit this URL after deployment to check if environment variables are set:
```
https://your-domain.vercel.app/api/debug-env
```

**Expected Response:**
```json
{
  "success": true,
  "environment": {
    "GMAIL_USER": "your-email@gmail.com",
    "GMAIL_APP_PASSWORD": "SET"
  }
}
```

**If you see "NOT SET" for GMAIL_APP_PASSWORD:**
- Go to Vercel dashboard → Settings → Environment Variables
- Add the missing variables
- Redeploy your project

### **Step 2: Test Email Configuration**
Visit this URL to test email setup:
```
https://your-domain.vercel.app/api/test-email
```

### **Step 3: Use Simplified Contact Form**
If the main contact form crashes, try the simplified version:
```
https://your-domain.vercel.app/api/contact-simple
```

### **Step 4: Check Vercel Function Logs**
1. Go to Vercel dashboard → Deployments
2. Click on latest deployment
3. Go to "Functions" tab
4. Look for error messages in the logs

## 📝 **Steps to Deploy**

1. **Push your changes to GitHub:**
   ```bash
   git add .
   git commit -m "Add debugging endpoints and improved error handling"
   git push origin main
   ```

2. **In Vercel Dashboard:**
   - Connect your GitHub repository
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

3. **Set Environment Variables** (see above)
4. **Deploy!**

## 🎯 **What This Fixes**

- ✅ **Serverless Function Crash** - Environment variables now used
- ✅ **404 Errors** - API routes now work properly
- ✅ **Email Functionality** - Contact form will work in production
- ✅ **Server-side Rendering** - All features work as expected
- ✅ **Debugging Tools** - Easy to identify issues

## 🔍 **If Still Getting Function Crashes**

### **Common Issues & Solutions:**

1. **Environment Variables Not Set:**
   - Check `/api/debug-env` endpoint
   - Verify in Vercel dashboard
   - No extra spaces or quotes

2. **Gmail App Password Issues:**
   - Generate new app password in Google Account settings
   - Make sure 2FA is enabled
   - Use the exact 16-character password

3. **Network/Connection Issues:**
   - Check if Gmail SMTP is blocked
   - Try different ports (465, 587)
   - Check firewall settings

4. **Code Errors:**
   - Check Vercel function logs
   - Test locally with `npm run dev`
   - Use simplified endpoints for testing

## 📞 **Contact Form Testing**

After deployment and environment variables setup:

1. **Test environment variables:** `/api/debug-env`
2. **Test email configuration:** `/api/test-email`
3. **Test contact form:** Use the contact form on your site
4. **If main form fails:** Try `/api/contact-simple`

## 🛠 **Troubleshooting Commands**

```bash
# Test locally
npm run dev

# Build locally
npm run build

# Check environment variables locally
curl http://localhost:4321/api/debug-env

# Test email locally
curl http://localhost:4321/api/test-email
```

## 🔐 **Security Note**

- Environment variables are encrypted in Vercel
- Your Gmail password is not exposed in the code
- Only you can see the environment variables in your dashboard
- Debug endpoints only show if variables are set, not their values
- Never commit credentials to your repository
