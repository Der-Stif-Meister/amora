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
