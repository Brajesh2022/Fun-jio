# TMDB Proxy - Cloudflare Workers Deployment Guide

This is a complete Cloudflare Workers application that serves as a reverse proxy for The Movie Database (TMDB) API. It helps bypass ISP blocking in India and provides fast CDN-based JSON responses.

## ?? What's Included

- **worker.js** - Main Cloudflare Worker script (handles both homepage and API proxy)
- **wrangler.toml** - Cloudflare Workers configuration
- **package-cloudflare.json** - NPM dependencies for deployment

## ?? Quick Deployment Guide

### Method 1: Deploy via Cloudflare Dashboard (Easiest - No Installation Required)

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com/
   - Login to your account (or create one for free)

2. **Navigate to Workers & Pages**
   - Click on "Workers & Pages" in the left sidebar
   - Click "Create application"
   - Select "Create Worker"

3. **Create Your Worker**
   - Give it a name (e.g., `tmdb-proxy`)
   - Click "Deploy"

4. **Upload the Code**
   - After deployment, click "Edit code"
   - Delete all existing code
   - Copy the entire content of `worker.js` and paste it
   - Click "Save and Deploy"

5. **Your Worker is Live! ??**
   - You'll get a URL like: `https://tmdb-proxy.YOUR-SUBDOMAIN.workers.dev`
   - Visit the URL to see your homepage
   - Use `/tmdb/` endpoints to proxy TMDB API

### Method 2: Deploy via Wrangler CLI (For Developers)

1. **Install Node.js**
   - Download from: https://nodejs.org/
   - Install version 16.x or higher

2. **Install Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

3. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

4. **Deploy the Worker**
   ```bash
   # Navigate to the directory containing worker.js
   cd /path/to/your/worker/files
   
   # Deploy
   wrangler deploy
   ```

5. **Your Worker is Live! ??**
   - Wrangler will show you the deployed URL
   - Visit the URL to see your homepage

## ?? Configuration

### Customizing Worker Name

Edit `wrangler.toml` and change the name:
```toml
name = "your-custom-name"
```

### Using Custom Domain

1. Add your domain to Cloudflare
2. Edit `wrangler.toml` and uncomment the routes section:
   ```toml
   routes = [
     { pattern = "yourdomain.com/*", zone_name = "yourdomain.com" }
   ]
   ```
3. Deploy again with `wrangler deploy`

## ?? Testing Your Deployment

Once deployed, test these endpoints:

1. **Homepage**: 
   - `https://your-worker.workers.dev/`

2. **Popular Movies**:
   - `https://your-worker.workers.dev/tmdb/movie/popular?api_key=e2f36edd5828037f897c065caca5156f`

3. **TV Shows**:
   - `https://your-worker.workers.dev/tmdb/tv/popular?api_key=e2f36edd5828037f897c065caca5156f`

## ?? Features

- ? Complete TMDB API proxy
- ? Beautiful dark-themed documentation homepage
- ? CORS enabled (works in browsers and iframes)
- ? Copy-to-clipboard functionality for all endpoints
- ? Responsive design (mobile-friendly)
- ? No caching issues (fresh data)
- ? Fast CDN delivery
- ? Free tier available (100,000 requests/day)

## ?? API Usage

Replace `https://api.themoviedb.org/3/` with your worker URL + `/tmdb/`:

**Before:**
```
https://api.themoviedb.org/3/movie/popular?api_key=YOUR_KEY
```

**After:**
```
https://your-worker.workers.dev/tmdb/movie/popular?api_key=YOUR_KEY
```

## ?? API Key

The default API key included is: `e2f36edd5828037f897c065caca5156f`

**Note**: This is a demo key. For production use, get your own free API key from:
https://www.themoviedb.org/settings/api

To change the API key displayed on the homepage, edit the `API_KEY` constant in `worker.js`.

## ??? Advanced Configuration

### Environment Variables (Optional)

You can store your TMDB API key as a secret:

1. Add secret via CLI:
   ```bash
   wrangler secret put TMDB_API_KEY
   ```

2. Use it in worker.js:
   ```javascript
   const apiKey = env.TMDB_API_KEY || 'fallback-key';
   ```

### Rate Limiting

Free tier includes:
- 100,000 requests per day
- 1000 requests per minute

For higher limits, upgrade to Workers Paid plan ($5/month for 10M requests).

## ?? Monitoring

View your worker's analytics:
1. Go to Cloudflare Dashboard
2. Click "Workers & Pages"
3. Select your worker
4. View requests, errors, and performance metrics

## ?? Troubleshooting

**Issue**: Worker not deploying
- **Solution**: Make sure you're logged in with `wrangler login`

**Issue**: API requests failing
- **Solution**: Check that the API key is included in the URL

**Issue**: CORS errors
- **Solution**: The worker already includes CORS headers. Clear your browser cache.

**Issue**: Old data showing
- **Solution**: The worker has caching disabled. If still seeing old data, it might be browser cache.

## ?? Use Cases

1. **Streaming Apps**: Replace TMDB API base URL in your streaming website
2. **Movie Apps**: Use for movie/TV show discovery apps
3. **Learning Projects**: Great for learning API proxying
4. **ISP Bypass**: Access TMDB API in regions with ISP blocking

## ?? Support

Created by **DHANJEE RIDER** on September 1, 2025

Telegram: https://t.me/+_lJ14CGAOgkxNGM9

## ?? License

MIT License - Feel free to use, modify, and distribute!

## ?? Next Steps

After deployment:
1. Test all endpoints on the homepage
2. Update your streaming/movie app to use the new proxy URL
3. Monitor usage in Cloudflare Dashboard
4. Consider upgrading to paid plan if you exceed free tier

---

**Enjoy your TMDB proxy! ????**
