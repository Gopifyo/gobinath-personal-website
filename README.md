# VibeOS - Gobinath Portfolio

This portfolio is built with React 19 and Vite. It is configured for high-performance deployment on **Vercel**.

## 1. Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 2. Deploy to Vercel

1. **Push to GitHub**: Ensure your latest code is pushed to your repository.
2. **Connect to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard).
   - Click **Add New > Project**.
   - Import your GitHub repository.
3. **Configure**:
   - Vercel automatically detects the **Vite** framework.
   - Build Command: `npm run build` (default)
   - Output Directory: `dist` (default)
4. **Deploy**: Click Deploy.

## 3. Project Structure
- **Vite Config**: Optimized for root domain hosting (no base path).
- **Vercel Config**: `vercel.json` included for SPA routing.

---
*Created by the Vibe Agent for Gobinath.*