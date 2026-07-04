# 🔒 Security Checklist

## ✅ **CREDENTIALS SECURITY**

### **Never Commit These to Repository:**
- ❌ Gmail App Passwords
- ❌ API Keys
- ❌ Database Credentials
- ❌ Private Keys
- ❌ Access Tokens
- ❌ Environment Variables with Secrets

### **Safe to Commit:**
- ✅ Public email addresses (for contact info)
- ✅ Public social media links
- ✅ Public GitHub repositories
- ✅ Public portfolio links

## 🔧 **Environment Variables Setup**

### **Local Development (.env.local):**
```bash
GMAIL_APP_PASSWORD=your-actual-app-password
GMAIL_USER=your-email@gmail.com
```

### **Vercel Production:**
- Set in Vercel Dashboard → Settings → Environment Variables
- Never commit these values to Git

## 🛡️ **Security Best Practices**

### **1. Environment Variables**
- ✅ Use `import.meta.env.VARIABLE_NAME` in Astro
- ✅ Set fallbacks to empty strings, not hardcoded values
- ✅ Validate environment variables exist before using

### **2. API Security**
- ✅ Validate all input data
- ✅ Sanitize user inputs to prevent XSS
- ✅ Use HTTPS in production
- ✅ Implement rate limiting (if needed)

### **3. Code Security**
- ✅ No hardcoded passwords in source code
- ✅ No credentials in documentation
- ✅ Use `.gitignore` to exclude sensitive files
- ✅ Regular security audits

## 🚨 **Security Checklist Before Committing**

Before pushing to GitHub, ensure:

- [ ] No passwords in code files
- [ ] No API keys in code files
- [ ] No credentials in documentation
- [ ] `.env` files are in `.gitignore`
- [ ] Environment variables are set in Vercel
- [ ] No sensitive data in console logs
- [ ] No credentials in error messages

## 🔍 **Security Testing**

### **Check for Exposed Credentials:**
```bash
# Search for common credential patterns
grep -r "password\|secret\|key\|token" src/ --exclude-dir=node_modules
grep -r "@gmail.com\|@yahoo.com\|@hotmail.com" src/
```

### **Verify .gitignore:**
```bash
# Check if sensitive files are ignored
git check-ignore .env
git check-ignore credentials.json
```

## 📞 **Contact Information Security**

### **Public Contact Info (Safe to Show):**
- Email address for contact form
- Social media links
- Portfolio links
- GitHub profile

### **Private Information (Never Show):**
- Gmail app passwords
- API keys
- Database credentials
- Private keys

## 🚀 **Deployment Security**

### **Vercel Environment Variables:**
1. Go to Vercel Dashboard
2. Project Settings → Environment Variables
3. Add variables securely
4. Never commit these values

### **Local Development:**
1. Create `.env.local` file
2. Add environment variables
3. File is automatically ignored by Git
4. Use for local testing only

## 🔐 **Emergency Security Actions**

If credentials are accidentally committed:

1. **Immediately:**
   - Revoke/regenerate all exposed credentials
   - Remove from Git history
   - Update environment variables

2. **Git History Cleanup:**
   ```bash
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch path/to/file' \
   --prune-empty --tag-name-filter cat -- --all
   ```

3. **Force Push:**
   ```bash
   git push origin --force --all
   ```

## 📋 **Regular Security Review**

- [ ] Monthly: Review all environment variables
- [ ] Monthly: Check for exposed credentials in code
- [ ] Monthly: Update dependencies for security patches
- [ ] Quarterly: Security audit of the codebase

