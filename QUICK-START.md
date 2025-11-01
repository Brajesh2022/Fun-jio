# ?? Quick Start - Deploy in 2 Minutes!

## Fastest Way to Deploy (No Code Required!)

### Step 1: Login to Cloudflare
1. Go to https://dash.cloudflare.com/
2. Create a free account or login

### Step 2: Create Worker
1. Click **"Workers & Pages"** in the left menu
2. Click **"Create application"**
3. Select **"Create Worker"**
4. Name it: `tmdb-proxy` (or any name you like)
5. Click **"Deploy"**

### Step 3: Add the Code
1. Click **"Edit code"** button
2. **Delete** all existing code
3. Open the `worker.js` file from this folder
4. **Copy all** the code from `worker.js`
5. **Paste** it into the Cloudflare editor
6. Click **"Save and Deploy"**

### Step 4: You're Done! ??

You'll get a URL like:
```
https://tmdb-proxy.YOUR-NAME.workers.dev
```

**Test it:**
- Visit your URL to see the homepage
- Try: `https://tmdb-proxy.YOUR-NAME.workers.dev/tmdb/movie/popular?api_key=e2f36edd5828037f897c065caca5156f`

---

## ?? Files You Need

Only these 3 files are required:
- ? **worker.js** - Main application code (THIS IS THE MOST IMPORTANT FILE!)
- ?? **wrangler.toml** - Configuration (only needed for CLI deployment)
- ?? **package-cloudflare.json** - Dependencies (only needed for CLI deployment)

---

## ?? What You Get

? Full TMDB API proxy  
? Beautiful documentation page  
? Works in India (bypass ISP blocks)  
? Free 100,000 requests/day  
? Fast CDN delivery  
? No maintenance required  

---

## ?? Need Help?

See **DEPLOYMENT-GUIDE.md** for detailed instructions and troubleshooting!
