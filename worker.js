// Cloudflare Worker for TMDB API Proxy
// This worker serves a documentation homepage and proxies requests to TMDB API

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'e2f36edd5828037f897c065caca5156f';

// HTML template for the homepage
const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Indian TMDB Proxy</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            background: 'hsl(0 0% 3.9%)',
            foreground: 'hsl(0 0% 98%)',
            card: 'hsl(0 0% 3.9%)',
            'card-foreground': 'hsl(0 0% 98%)',
            muted: 'hsl(0 0% 14.9%)',
            'muted-foreground': 'hsl(0 0% 63.9%)',
            border: 'hsl(0 0% 14.9%)',
          }
        }
      }
    }
  </script>
  <style>
    body {
      background-color: hsl(0 0% 3.9%);
      color: hsl(0 0% 98%);
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }
    .code-block {
      background-color: hsl(0 0% 14.9% / 0.5);
      border-radius: 0.5rem;
      padding: 0.75rem;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin: 0.5rem 0;
    }
    .code-block code {
      color: hsl(0 0% 98%);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;
    }
    .code-block a {
      color: hsl(0 0% 98%);
      text-decoration: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;
    }
    .code-block a:hover {
      text-decoration: underline;
    }
    .copy-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: hsl(0 0% 63.9%);
      padding: 0.25rem;
      border-radius: 0.375rem;
      transition: all 0.2s;
      flex-shrink: 0;
    }
    .copy-btn:hover {
      color: hsl(0 0% 98%);
    }
    .copy-btn.copied {
      color: #22c55e;
    }
    .section {
      background-color: hsl(0 0% 3.9%);
      border: 1px solid hsl(0 0% 14.9%);
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
    }
  </style>
</head>
<body class="antialiased">
  <main class="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-24">
    <div class="w-full max-w-4xl space-y-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">Indian TMDB Proxy</h1>
        <p class="mt-4 text-lg" style="color: hsl(0 0% 63.9%)">
          A simple, open-source reverse proxy for The Movie Database API. which helps to load TMDB api in India ????? jio isp blocking bypass and fast loading cdn json response <br> 
          made by <a href="https://t.me/+_lJ14CGAOgkxNGM9" class="font-bold">DHANJEE RIDER</a> in 1 sep 2025
        </p>
      </div>
      
      <div class="section space-y-6">
        <div class="space-y-2">
          <h2 class="font-semibold text-2xl">API Documentation</h2>
          <p class="text-sm" style="color: hsl(0 0% 63.9%)">
            Use this application's URL as a proxy to the TMDB API. Click any endpoint to open it in a new tab, or use the copy button.
          </p>
        </div>

        <div class="space-y-2">
          <h3 class="font-semibold">Base Proxy URL</h3>
          <p class="text-sm" style="color: hsl(0 0% 63.9%)">
            All TMDB API requests should be prefixed with this path. if you have a TMDB streaming script then search for tmdb js and add this as base url to load your website in India ?????
          </p>
          <div class="code-block">
            <code id="base-url">https://YOUR-WORKER-NAME.workers.dev/tmdb</code>
            <button class="copy-btn" onclick="copyToClipboard('base-url', this)">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="font-semibold">Movie Endpoints</h3>
          <div>
            <h4 class="font-medium text-sm">Get Movie Details:</h4>
            <div class="code-block">
              <a href="/tmdb/movie/609681?api_key=${API_KEY}" target="_blank" rel="noopener noreferrer">/tmdb/movie/609681?api_key=${API_KEY}</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/movie/609681?api_key=${API_KEY}', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-sm">Popular Movies:</h4>
            <div class="code-block">
              <a href="/tmdb/movie/popular?api_key=${API_KEY}" target="_blank" rel="noopener noreferrer">/tmdb/movie/popular?api_key=${API_KEY}</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/movie/popular?api_key=${API_KEY}', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-sm">Top Rated Movies:</h4>
            <div class="code-block">
              <a href="/tmdb/movie/top_rated?api_key=${API_KEY}" target="_blank" rel="noopener noreferrer">/tmdb/movie/top_rated?api_key=${API_KEY}</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/movie/top_rated?api_key=${API_KEY}', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-sm">Upcoming Movies:</h4>
            <div class="code-block">
              <a href="/tmdb/movie/upcoming?api_key=${API_KEY}" target="_blank" rel="noopener noreferrer">/tmdb/movie/upcoming?api_key=${API_KEY}</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/movie/upcoming?api_key=${API_KEY}', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-sm">Now Playing Movies:</h4>
            <div class="code-block">
              <a href="/tmdb/movie/now_playing?api_key=${API_KEY}" target="_blank" rel="noopener noreferrer">/tmdb/movie/now_playing?api_key=${API_KEY}</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/movie/now_playing?api_key=${API_KEY}', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="font-semibold">TV Show Endpoints</h3>
          <div>
            <h4 class="font-medium text-sm">Get TV Show Details:</h4>
            <div class="code-block">
              <a href="/tmdb/tv/66573?api_key=${API_KEY}" target="_blank" rel="noopener noreferrer">/tmdb/tv/66573?api_key=${API_KEY}</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/tv/66573?api_key=${API_KEY}', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-sm">Popular TV Shows:</h4>
            <div class="code-block">
              <a href="/tmdb/tv/popular?api_key=${API_KEY}" target="_blank" rel="noopener noreferrer">/tmdb/tv/popular?api_key=${API_KEY}</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/tv/popular?api_key=${API_KEY}', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-sm">Top Rated TV Shows:</h4>
            <div class="code-block">
              <a href="/tmdb/tv/top_rated?api_key=${API_KEY}" target="_blank" rel="noopener noreferrer">/tmdb/tv/top_rated?api_key=${API_KEY}</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/tv/top_rated?api_key=${API_KEY}', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-sm">On The Air TV Shows:</h4>
            <div class="code-block">
              <a href="/tmdb/tv/on_the_air?api_key=${API_KEY}" target="_blank" rel="noopener noreferrer">/tmdb/tv/on_the_air?api_key=${API_KEY}</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/tv/on_the_air?api_key=${API_KEY}', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-sm">Airing Today TV Shows:</h4>
            <div class="code-block">
              <a href="/tmdb/tv/airing_today?api_key=${API_KEY}" target="_blank" rel="noopener noreferrer">/tmdb/tv/airing_today?api_key=${API_KEY}</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/tv/airing_today?api_key=${API_KEY}', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="font-semibold">Discover Endpoints</h3>
          <div>
            <h4 class="font-medium text-sm">Discover Movies:</h4>
            <div class="code-block">
              <a href="/tmdb/discover/movie?api_key=${API_KEY}&with_genres=28&sort_by=popularity.desc" target="_blank" rel="noopener noreferrer">/tmdb/discover/movie?api_key=${API_KEY}&with_genres=28&sort_by=popularity.desc</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/discover/movie?api_key=${API_KEY}&with_genres=28&sort_by=popularity.desc', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-sm">Discover TV Shows:</h4>
            <div class="code-block">
              <a href="/tmdb/discover/tv?api_key=${API_KEY}&with_genres=35&sort_by=first_air_date.desc" target="_blank" rel="noopener noreferrer">/tmdb/discover/tv?api_key=${API_KEY}&with_genres=35&sort_by=first_air_date.desc</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/discover/tv?api_key=${API_KEY}&with_genres=35&sort_by=first_air_date.desc', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="font-semibold">Genre Endpoints</h3>
          <div>
            <h4 class="font-medium text-sm">Movie Genres:</h4>
            <div class="code-block">
              <a href="/tmdb/genre/movie/list?api_key=${API_KEY}" target="_blank" rel="noopener noreferrer">/tmdb/genre/movie/list?api_key=${API_KEY}</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/genre/movie/list?api_key=${API_KEY}', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-sm">TV Show Genres:</h4>
            <div class="code-block">
              <a href="/tmdb/genre/tv/list?api_key=${API_KEY}" target="_blank" rel="noopener noreferrer">/tmdb/genre/tv/list?api_key=${API_KEY}</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/genre/tv/list?api_key=${API_KEY}', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="font-semibold">Person Endpoints</h3>
          <div>
            <h4 class="font-medium text-sm">Person Details:</h4>
            <div class="code-block">
              <a href="/tmdb/person/287?api_key=${API_KEY}" target="_blank" rel="noopener noreferrer">/tmdb/person/287?api_key=${API_KEY}</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/person/287?api_key=${API_KEY}', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-sm">Person Images:</h4>
            <div class="code-block">
              <a href="/tmdb/person/287/images?api_key=${API_KEY}" target="_blank" rel="noopener noreferrer">/tmdb/person/287/images?api_key=${API_KEY}</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/person/287/images?api_key=${API_KEY}', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-sm">Person Movie Credits:</h4>
            <div class="code-block">
              <a href="/tmdb/person/287/movie_credits?api_key=${API_KEY}" target="_blank" rel="noopener noreferrer">/tmdb/person/287/movie_credits?api_key=${API_KEY}</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/person/287/movie_credits?api_key=${API_KEY}', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-sm">Person TV Credits:</h4>
            <div class="code-block">
              <a href="/tmdb/person/287/tv_credits?api_key=${API_KEY}" target="_blank" rel="noopener noreferrer">/tmdb/person/287/tv_credits?api_key=${API_KEY}</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/person/287/tv_credits?api_key=${API_KEY}', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="font-semibold">Trending Endpoints</h3>
          <div>
            <h4 class="font-medium text-sm">Trending All (Daily):</h4>
            <div class="code-block">
              <a href="/tmdb/trending/all/day?api_key=${API_KEY}" target="_blank" rel="noopener noreferrer">/tmdb/trending/all/day?api_key=${API_KEY}</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/trending/all/day?api_key=${API_KEY}', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-sm">Trending Movies (Daily):</h4>
            <div class="code-block">
              <a href="/tmdb/trending/movie/day?api_key=${API_KEY}" target="_blank" rel="noopener noreferrer">/tmdb/trending/movie/day?api_key=${API_KEY}</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/trending/movie/day?api_key=${API_KEY}', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-sm">Trending TV (Daily):</h4>
            <div class="code-block">
              <a href="/tmdb/trending/tv/day?api_key=${API_KEY}" target="_blank" rel="noopener noreferrer">/tmdb/trending/tv/day?api_key=${API_KEY}</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/trending/tv/day?api_key=${API_KEY}', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-sm">Trending People (Weekly):</h4>
            <div class="code-block">
              <a href="/tmdb/trending/person/week?api_key=${API_KEY}" target="_blank" rel="noopener noreferrer">/tmdb/trending/person/week?api_key=${API_KEY}</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/trending/person/week?api_key=${API_KEY}', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="font-semibold">Advanced Details</h3>
          <div>
            <h4 class="font-medium text-sm">Get All Movie Details:</h4>
            <div class="code-block">
              <a href="/tmdb/movie/609681?api_key=${API_KEY}&append_to_response=credits,images,videos,keywords,reviews,recommendations,similar,release_dates,watch/providers" target="_blank" rel="noopener noreferrer">/tmdb/movie/609681?api_key=${API_KEY}&append_to_response=credits,images,videos,keywords,reviews,recommendations,similar,release_dates,watch/providers</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/movie/609681?api_key=${API_KEY}&append_to_response=credits,images,videos,keywords,reviews,recommendations,similar,release_dates,watch/providers', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-sm">Get All TV Show Details:</h4>
            <div class="code-block">
              <a href="/tmdb/tv/66573?api_key=${API_KEY}&append_to_response=credits,images,videos,keywords,reviews,recommendations,similar,content_ratings,watch/providers" target="_blank" rel="noopener noreferrer">/tmdb/tv/66573?api_key=${API_KEY}&append_to_response=credits,images,videos,keywords,reviews,recommendations,similar,content_ratings,watch/providers</a>
              <button class="copy-btn" onclick="copyLink('/tmdb/tv/66573?api_key=${API_KEY}&append_to_response=credits,images,videos,keywords,reviews,recommendations,similar,content_ratings,watch/providers', this)">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <script>
    // Update base URL dynamically
    window.addEventListener('DOMContentLoaded', () => {
      const baseUrlElement = document.getElementById('base-url');
      if (baseUrlElement) {
        baseUrlElement.textContent = window.location.origin + '/tmdb';
      }
    });

    function copyToClipboard(elementId, button) {
      const element = document.getElementById(elementId);
      const text = element.textContent;
      navigator.clipboard.writeText(text).then(() => {
        button.classList.add('copied');
        setTimeout(() => button.classList.remove('copied'), 2000);
      });
    }

    function copyLink(path, button) {
      const fullUrl = window.location.origin + path;
      navigator.clipboard.writeText(fullUrl).then(() => {
        button.classList.add('copied');
        setTimeout(() => button.classList.remove('copied'), 2000);
      });
    }
  </script>
</body>
</html>`;

// CORS headers configuration - COMPLETELY UNRESTRICTED
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Expose-Headers': '*',
  'Access-Control-Max-Age': '86400', // 24 hours
  'Access-Control-Allow-Credentials': 'true',
  'X-Frame-Options': 'ALLOWALL',
  'Content-Security-Policy': 'frame-ancestors *',
  'X-Content-Type-Options': 'nosniff',
};

// Main fetch event handler
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle CORS preflight requests (OPTIONS)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    // Serve homepage for root path
    if (url.pathname === '/' || url.pathname === '') {
      return new Response(HTML_TEMPLATE, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          ...CORS_HEADERS,
        },
      });
    }

    // Handle TMDB proxy requests
    if (url.pathname.startsWith('/tmdb/')) {
      // Extract the TMDB API path
      const tmdbPath = url.pathname.replace(/^\/tmdb\//, '');
      
      // Check for API key
      const apiKey = url.searchParams.get('api_key');
      if (!apiKey) {
        return new Response(
          JSON.stringify({ error: 'api_key query parameter is required.' }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              ...CORS_HEADERS,
            },
          }
        );
      }

      // Build the TMDB URL
      const tmdbUrl = `${TMDB_BASE_URL}/${tmdbPath}${url.search}`;

      try {
        // Fetch from TMDB API
        const tmdbResponse = await fetch(tmdbUrl, {
          method: request.method,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Get the response data
        const data = await tmdbResponse.json();

        // Return the proxied response with CORS headers
        return new Response(JSON.stringify(data), {
          status: tmdbResponse.status,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=300',
            ...CORS_HEADERS,
          },
        });
      } catch (error) {
        return new Response(
          JSON.stringify({ 
            error: 'An error occurred while proxying the request to TMDB.',
            details: error.message 
          }),
          {
            status: 502,
            headers: {
              'Content-Type': 'application/json',
              ...CORS_HEADERS,
            },
          }
        );
      }
    }

    // Return 404 for unknown paths
    return new Response('Not Found', { 
      status: 404,
      headers: CORS_HEADERS,
    });
  },
};
