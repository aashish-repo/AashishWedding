# Aashish & Amisha — Wedding Invitation (v1)

Invite-only wedding microsite for **Aashish Jain & Amisha Jain**  
**Saturday, 21 November 2026 · Bandhan Resort, Bundi**

Inspired by scroll-driven invitation sites (portal → Namokar mantra → story sections). Built with Next.js for easy **Vercel** hosting.

## Run locally

```bash
cd AashishWedding
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this folder to a GitHub repo  
2. Import the repo at [vercel.com/new](https://vercel.com/new)  
3. Deploy (framework preset: Next.js)

## v1 includes

- Digambar Jain **णमोकार मंत्र** gate + audio  
- Open invitation portal  
- Hero, formal family invite (Thola × Kotiya)  
- Date lockup + live countdown  
- Story placeholders, schedule, attire, venue map link  
- Ambient music toggle, petals, scroll progress  

## Replace / add later

| Item | Path / file |
|------|-------------|
| Better Namokar recording | `public/audio/namokar.m4a` (+ retune timings in `src/data/wedding.ts`) |
| Theme music | `public/audio/theme.m4a` |
| Photos | story cards in `InviteExperience` |
| Phone numbers | `src/data/wedding.ts` → `host.contacts` |
| Exact muhurat / events | `schedule` in `src/data/wedding.ts` |
| Stay / travel tips | new section |

Current mantra audio is a **macOS Hindi TTS placeholder** — swap it for a proper Digambar Path recording when you have one.
