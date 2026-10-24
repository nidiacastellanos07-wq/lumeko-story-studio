# Lumeko Story Studio

Build the first complete UI prototype for **Lumeko**, a Spanish-language AI character and interactive storytelling web app. This is the actual product prototype, not a landing page and not a single-screen mockup. Use a responsive desktop-first web app that adapts well to tablet and mobile. Reference the user's Hi Waifu screenshots for information architecture only: full discovery/catalog screen, a three-column chat layout, and a profile/character collection screen. Do NOT copy its branding, exact layout details, names, or artwork.

BRAND AND VISUAL DIRECTION
- Product name: Lumeko. Studio name: Modo Studio (small, discreet footer/about credit only).
- Balanced minimalism: polished and expressive, never empty or overloaded. Dark charcoal/near-black surfaces, restrained violet accents, soft borders, readable typography, balanced spacing, modest radius. Avoid excessive gradients, glow, neon, glassmorphism, heavy shadows, or overly futuristic effects.
- Use suitable placeholder illustrations/avatars from safe, generic sources or CSS treatments; do not rely on copyrighted existing anime character art. The catalog should feel alive and varied.
- All interface copy in natural Spanish. Use accessible contrast, visible focus states, meaningful labels, loading/empty/error states, and responsive behavior.

BUILD THE FULL APP SHELL AND THESE SCREENS, WITH NAVIGATION BETWEEN THEM:
1) **Explorar / Inicio**: full left navigation rail/sidebar with Lumeko wordmark and icons; top bar with search, notifications or activity, language/profile controls; welcome/featured banner; category chips (Originales, Fantasía, Misterio, Aventura, Amistad, Romance, Anime-inspired, Juegos); sections such as Recomendados, Tendencias, Nuevos personajes and Continue your stories. Use a responsive grid of complete character cards with avatar/art, name, short premise, tags, creator and realistic-looking demo engagement counts. Include working search, category filters, sort/filter controls, card click to open character detail/chat, and favorite toggles.
2) **Chat**: fully composed three-panel desktop layout inspired by reference: left conversation list with individual/group tabs, search and recent chats; center conversation with selected character, message history, distinct user/character bubbles, typing/loading state, composer with send button, regenerate response, and start-new-scene action; right character info panel with avatar, description, tags, favorite, character details, Persona/Scenario/Lorebook-style collapsible sections, chat settings, history, report action. Side panels should collapse on smaller screens. Use a clearly labeled local demo response engine with a few contextual canned replies; do not claim this is connected to a real AI model. Send and other primary controls should work locally.
3) **Mi perfil / Colección**: profile banner, avatar, display name, following/follower/demo activity stats, tabs for created characters, favorites, persona, voice and lorebooks where sensible; character cards, create-new-character entry point, edit profile and filters/sorting.
4) **Crear personaje**: complete form for name, short description, avatar/image placeholder, tags/categories, personality, background, greeting/first message, scenario, visibility (private/public), save/cancel; field validation, helpful character limits, preview panel and successful local save to the collection.
5) **Character detail / pre-chat**: character hero/avatar, premise, personality, tags, creator, start chat button, favorite, report.
6) **Settings / safety**: appearance (dark/light toggle), language placeholder, privacy controls, blocked characters/users demo, content preferences, report/safety information, delete/export demo data controls with confirmation UI. Include age-appropriate content boundaries, reporting and blocking UI. Do not implement sexual content. Avoid adult-only or explicit categories.
7) **Conversation history / saved stories**: list/search previous chats, continue or delete with confirmation; empty states.
8) **Not found / general dialogs** where appropriate.

INTERACTIONS AND IMPLEMENTATION
- Build a coherent frontend with reusable components and a clean route/state architecture. Use the default Lovable stack, TypeScript, Tailwind and shadcn/ui.
- No backend, API keys, or real auth required in this first pass. Use mock/demo data and local persistence where practical, clearly label demo behavior, and make navigation, search, category filters, favorites, chat send/regenerate, create/save/edit character, tabs, collapsible panels, theme toggle, and confirmation dialogs functional.
- Ensure buttons are not decorative: every visible control should work or be explicitly disabled with a clear explanation.
- Seed enough varied fictional character data to make the catalog feel complete (at least 12 cards across categories) and enough conversations to populate the chat list.
- Prioritize a cohesive, polished full interface across screens, not just the home page. Verify responsiveness and avoid placeholder lorem ipsum.
- Do not publish/deploy automatically. Return a preview and summary of what was built and any limitations.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6c731e2a-bb1c-4936-82f5-0eb6147b2d98).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
