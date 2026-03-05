# Vercel Environment Variables Checklist

Add these in Vercel Dashboard → Project → Settings → Environment Variables.

## Required for build and runtime

### DATABASE (neon.tech)
- Step 1: Go to neon.tech, sign up free, create project "uttar-kesri", region Mumbai
- Step 2: Copy Connection string (pooled) as DATABASE_URL
- Step 3: Copy Direct connection as DIRECT_URL

DATABASE_URL  → neon.tech → Project → Connection string (pooled)
DIRECT_URL    → neon.tech → Project → Direct connection

### NEXTAUTH
NEXTAUTH_URL    → https://YOUR-PROJECT.vercel.app (set after first deploy)
NEXTAUTH_SECRET → Run: openssl rand -base64 32

### SITE URL
NEXT_PUBLIC_SITE_URL → https://YOUR-PROJECT.vercel.app

## Optional

### REDIS (upstash.com)
UPSTASH_REDIS_REST_URL   → upstash.com → DB → REST API → URL
UPSTASH_REDIS_REST_TOKEN → upstash.com → DB → REST API → Token

### GOOGLE OAUTH (console.cloud.google.com)
Create OAuth 2.0 Client ID, add redirect URI: https://YOUR-PROJECT.vercel.app/api/auth/callback/google
GOOGLE_CLIENT_ID     → Credentials → Client ID
GOOGLE_CLIENT_SECRET → Credentials → Client Secret

### CLOUDINARY (cloudinary.com)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_UPLOAD_PRESET

### FIREBASE (console.firebase.google.com)
NEXT_PUBLIC_FIREBASE_* and FIREBASE_ADMIN_* from project config and service account JSON.

### CRON
CRON_SECRET → openssl rand -base64 32

### MSG91, OPENWEATHERMAP, ADMIN_EMAIL, ADMIN_PASSWORD
Add when you use those features.
