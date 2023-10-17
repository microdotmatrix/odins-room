# About Odin's Room

Odin's Room is a website created using SvelteKit that utilizes Google Photos. I designed this website because I'm too busy, forgetful and easily distracted to keep up with sending all of the photos taken of my son by myself and his mother to our family by text or email... and as an aspiring web developer, I was excited by the challenge of coding a unique solution to improve my skills.

## The Challenge:

Our son was born September 15th, 2022, and like most new parents we have been snapping photos of him constantly. Both of us have Google Photos accounts that automatically backup and index our photos and videos, and to make sharing these photos with each other easier, we created a shared album accessible from either account that we could both contribute photos of Odin to. This was convenient for us, but not so much for our family. It was tricky to keep up with who sent which photos to grandma, who sent which ones to grandpa, and weeks or months would go by with both of us forgetting to send photos to anyone; we didn't want to simply invite everyone to the shared album we had, and not everyone in our family has a Google account or knows how to use Google Photos.

### Solutions Used:

- [SvelteKit](https://kit.svelte.dev) - my new favorite Javascript meta-framework. This site uses a unique blend of client and server-side rendering, a normally challenging task which SvelteKit made insanely simple.
- [Google Photos Api](https://photos.google.com) - possibly Google's least intuitive API, its no longer surprising to me that so few practical examples exist on Github of integrations built with Google Photos. 
- [Supabase](https://supabase.com) - currently just using this for basic email/password user authentication - Supabase was the simplest solution I've found for implementing this without configuring an ORM like Prisma. Their admin dashboard UI is excellent, and has encouraged me to learn more about Postgres to utilize more of it. I've always been a MySQL guy, the last time I used a GUI based DB manager was phpMyAdmin... if you've used this before, you already know how impressive Supabase's admin is by comparison. Admittedly, I've been out of touch with database integrations for a while... but with everything happening with server rendering/components, serverless/edge functions, etc. I'm getting pulled back in.
- [Vercel](https://vercel.com) - thanks for the free hosting, lets see how this thing runs.

## Form & Function

- [Svelte](https://svelte.dev)
- [TailwindCSS](https://tailwindcss.com)
- [DaisyUI](https://daisyui.com)
- [PostCSS](https://postcss.org)
- [Node.js v18](https://nodejs.org)
