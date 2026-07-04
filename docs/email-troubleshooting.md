# Email Configuration Troubleshooting Guide

## Common Issues and Solutions

### 1. **"Invalid login" or "Authentication failed" Error**

**Problem**: Gmail is rejecting the login credentials.

**Solution**:
1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate a new App Password**:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - Select "Mail" as the app
   - Generate a new 16-character password
   - Replace the current password in `src/pages/api/contact.ts`

### 2. **"Network error" or "Connection refused"**

**Problem**: Network connectivity issues or firewall blocking.

**Solution**:
- Check your internet connection
- Try using a different network
- If on corporate network, check if SMTP ports (465, 587) are blocked

### 3. **"All email configurations failed"**

**Problem**: None of the email configurations are working.

**Solution**:
1. **Verify Gmail Settings**:
   - Make sure "Less secure app access" is enabled (if not using App Password)
   - Check if your Gmail account has any restrictions

2. **Try Alternative Email Services**:
   - Consider using services like SendGrid, Mailgun, or Resend
   - These are more reliable for production use

### 4. **Testing Your Configuration**

Visit `/api/test-email` in your browser to test all email configurations:I
- Shows which configurations work/fail
- Provides detailed error messages
- Helps identify the specific issue

### 5. **Alternative Solutions**

#### Option A: Use Environment Variables
Create a `.env` file in your project root:
```
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
```

#### Option B: Use a Third-Party Email Service
Consider using services like:
- **SendGrid**: Free tier with 100 emails/day
- **Mailgun**: Free tier with 5,000 emails/month
- **Resend**: Free tier with 3,000 emails/month

#### Option C: Use a Form Service
Instead of handling emails yourself, use:
- **Formspree**: Free tier with 50 submissions/month
- **Netlify Forms**: Free with Netlify hosting
- **Getform**: Free tier with 50 submissions/month

### 6. **Quick Fix Steps**

1. **Generate new App Password**:
   ```
   1. Go to Google Account Settings
   2. Security → 2-Step Verification → App passwords
   3. Generate new password for "Mail"
   4. Copy the 16-character password
   5. Replace in contact.ts file
   ```

2. **Test the configuration**:
   ```
   1. Start your dev server: npm run dev
   2. Visit: http://localhost:4321/api/test-email
   3. Check which configurations work
   ```

3. **If still failing**:
   ```
   1. Check browser console for detailed errors
   2. Try using a different email service
   3. Consider using a form service instead
   ```

### 7. **Security Best Practices**

- Never commit email passwords to version control
- Use environment variables for sensitive data
- Consider using OAuth2 instead of App Passwords
- Regularly rotate your App Passwords

### 8. **Production Deployment**

For production, consider:
- Using a dedicated email service (SendGrid, Mailgun, etc.)
- Setting up proper environment variables
- Implementing rate limiting
- Adding spam protection

## Need Help?

If you're still having issues:
1. Check the browser console for error messages
2. Visit `/api/test-email` to see detailed configuration results
3. Try the alternative email services mentioned above
4. Consider using a form service as a quick solution

