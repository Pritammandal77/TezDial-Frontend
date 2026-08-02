# TezDial - Frontend

Next.js frontend for **TezDial**, a JustDial-style local business directory.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4

## Features

- **Landing page** — hero, categories, how it works, featured businesses, stats, testimonials, list-your-business CTA
- **Explore page** — image slider, search bar, category & city filters (image-backed), 2-column listings grid
- **Business detail page** — image gallery, full listing info, call / WhatsApp actions, Google Maps directions
- **List Business page** — validated form for submitting a new listing, with image upload
- **Delete listing** — pin-protected delete flow via a dropdown menu on each business card

## Environment Variables

Create a `.env.local` file in the root:

    NEXT_PUBLIC_API_URL=http://localhost:8000

Set this to your deployed backend URL in production.

## Getting Started

    npm install
    npm run dev

Runs at `http://localhost:3000`.

## Deployment

Deployed on Vercel. Set `NEXT_PUBLIC_API_URL` as an environment variable pointing to the live backend.
