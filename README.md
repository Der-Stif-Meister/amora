# Amora — Vite + React E‑Commerce (Frontend)

This repo contains the Amora frontend (Vite + React + TypeScript) and a small example `server/` folder for local dev. You can deploy the frontend to Vercel via GitHub and run the `server` on any host (Render, Railway, or a separate Vercel project if you convert it to serverless functions).

Quick steps to deploy frontend to Vercel (GitHub → Vercel):

1. Push your code to GitHub (create repo `Der-Stif-Meister/amora` if you haven't already).

2. On Vercel:
   - Sign in and choose **Import Project** → **From Git** → select your GitHub repo `amora`.
   - For Build settings, confirm:
     - Framework Preset: **Vite** (or `npm run build`)
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Add an Environment Variable `VITE_API_BASE` pointing to your backend URL (if you host a backend).
   - Deploy.

Notes about the backend (DAS proxy):

- The `server/` folder is an Express app used locally for `POST /api/das` and `GET /api/health`.
- Vercel's static deploy will only host the frontend. To run the Express server you can:
  - Host it on Render, Railway, or a separate Vercel project (converted to serverless functions). Then set `VITE_API_BASE` in Vercel to the server URL.

Security:

- Do NOT commit `server/.env`. This repo's `.gitignore` ignores it.
- If you committed an API key earlier, rotate it from your OpenAI dashboard immediately.

Local dev:

```powershell
# frontend
npm install
npm run dev

# server (in a separate terminal)
cd server
npm install
node index.js

# check health
Invoke-RestMethod -Method Get -Uri http://localhost:4000/api/health
```

If you want, I can:
- Add a GitHub Actions workflow that builds and deploys `dist` to GitHub Pages (alternative).
- Add a small `vercel` server setup to convert the `server` into serverless functions.
# Amora — PDF Viewer PWA

This is the Amora e-commerce frontend (React + Vite + TypeScript).

Quick start (Windows PowerShell):

```powershell
npm install
npm run dev
```

Open the app in the browser and explore product listings, cart, and the DAS chatbot.

Server (DAS / Checkout placeholders)

1. The repository includes a small Express server in `server/` that exposes:
	- `POST /api/das` — proxy to OpenAI's Chat Completions. Add your `OPENAI_API_KEY` in `server/.env` (copy `server/.env.example`).
	- `POST /api/create-checkout-session` — placeholder endpoint for Stripe checkout (mock response).

2. To run the server (install deps in the `server` folder first):

```powershell
cd server
npm install
node index.js
```

Security: Keep your OpenAI and Stripe keys out of source control. Use environment variables.
