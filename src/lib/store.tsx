import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  SEED_CHARACTERS,
  SEED_CONVERSATIONS,
  DEMO_USER,
  type Character,
  type Conversation,
  type Message,
} from "./data";

export type Blocked = { id: string; name: string; type: "personaje" | "usuario" };
export type Settings = {
  language: "es";
  privateProfile: boolean;
  showActivity: boolean;
  allowFollows: boolean;
  contentLevel: "estandar" | "estricto";
  hideRomance: boolean;
  blurUnknown: boolean;
  reduceMotion: boolean;
  typingIndicator: boolean;
};
export type Profile = { name: string; handle: string; bio: string };

type State = {
  theme: "dark" | "light";
  favorites: string[];
  custom: Character[];
  conversations: Conversation[];
  blocked: Blocked[];
  settings: Settings;
  profile: Profile;
};

const INITIAL: State = {
  theme: "dark",
  favorites: ["aurelia", "kiri", "selene"],
  custom: [],
  conversations: SEED_CONVERSATIONS,
  blocked: [
    { id: "b1", name: "spam_bot_99", type: "usuario" },
    { id: "b2", name: "Personaje de prueba reportado", type: "personaje" },
  ],
  settings: {
    language: "es",
    privateProfile: false,
    showActivity: true,
    allowFollows: true,
    contentLevel: "estandar",
    hideRomance: false,
    blurUnknown: true,
    reduceMotion: false,
    typingIndicator: true,
  },
  profile: { name: DEMO_USER.name, handle: DEMO_USER.handle, bio: DEMO_USER.bio },
};

const KEY = "lumeko-demo-v1";

type Ctx = State & {
  hydrated: boolean;
  characters: Character[];
  getCharacter: (id: string) => Character | undefined;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  setTheme: (t: State["theme"]) => void;
  saveCharacter: (c: Character) => void;
  deleteCharacter: (id: string) => void;
  startConversation: (characterId: string, fresh?: boolean) => string;
  appendMessage: (convId: string, msg: Message) => void;
  replaceLastCharMessage: (convId: string, msg: Message) => void;
  resetConversation: (convId: string) => void;
  deleteConversation: (convId: string) => void;
  block: (b: Blocked) => void;
  unblock: (id: string) => void;
  updateSettings: (s: Partial<Settings>) => void;
  updateProfile: (p: Partial<Profile>) => void;
  resetAll: () => void;
  exportData: () => string;
};

const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(INITIAL);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...INITIAL, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(state));
    document.documentElement.classList.toggle("dark", state.theme === "dark");
  }, [state, hydrated]);

  const characters = useMemo(() => {
    const blocked = new Set(state.blocked.map((b) => b.id));
    return [...state.custom, ...SEED_CHARACTERS].filter((c) => !blocked.has(c.id));
  }, [state.custom, state.blocked]);

  const getCharacter = useCallback(
    (id: string) => [...state.custom, ...SEED_CHARACTERS].find((c) => c.id === id),
    [state.custom],
  );

  const patch = (fn: (s: State) => State) => setState(fn);

  const value: Ctx = {
    ...state,
    hydrated,
    characters,
    getCharacter,
    isFavorite: (id) => state.favorites.includes(id),
    toggleFavorite: (id) =>
      patch((s) => ({
        ...s,
        favorites: s.favorites.includes(id) ? s.favorites.filter((f) => f !== id) : [...s.favorites, id],
      })),
    setTheme: (theme) => patch((s) => ({ ...s, theme })),
    saveCharacter: (c) =>
      patch((s) => ({
        ...s,
        custom: s.custom.some((x) => x.id === c.id) ? s.custom.map((x) => (x.id === c.id ? c : x)) : [c, ...s.custom],
      })),
    deleteCharacter: (id) => patch((s) => ({ ...s, custom: s.custom.filter((c) => c.id !== id) })),
    startConversation: (characterId, fresh) => {
      const existing = state.conversations.find((c) => c.characterId === characterId && c.kind === "individual");
      if (existing && !fresh) return existing.id;
      const ch = getCharacter(characterId);
      const id = `c-${characterId}-${Date.now()}`;
      const conv: Conversation = {
        id,
        characterId,
        kind: "individual",
        updatedAt: Date.now(),
        messages: ch ? [{ id: `${id}-g`, role: "char", text: ch.greeting, at: Date.now() }] : [],
      };
      patch((s) => ({ ...s, conversations: [conv, ...s.conversations] }));
      return id;
    },
    appendMessage: (convId, msg) =>
      patch((s) => ({
        ...s,
        conversations: s.conversations.map((c) =>
          c.id === convId ? { ...c, messages: [...c.messages, msg], updatedAt: msg.at } : c,
        ),
      })),
    replaceLastCharMessage: (convId, msg) =>
      patch((s) => ({
        ...s,
        conversations: s.conversations.map((c) => {
          if (c.id !== convId) return c;
          const msgs = [...c.messages];
          if (msgs.length && msgs[msgs.length - 1].role === "char") msgs.pop();
          return { ...c, messages: [...msgs, msg], updatedAt: msg.at };
        }),
      })),
    resetConversation: (convId) =>
      patch((s) => ({
        ...s,
        conversations: s.conversations.map((c) => {
          if (c.id !== convId) return c;
          const ch = getCharacter(c.characterId);
          return {
            ...c,
            updatedAt: Date.now(),
            messages: [
              { id: `${convId}-scene-${Date.now()}`, role: "char", text: ch ? `*Nueva escena* ${ch.greeting}` : "*Nueva escena*", at: Date.now() },
            ],
          };
        }),
      })),
    deleteConversation: (convId) =>
      patch((s) => ({ ...s, conversations: s.conversations.filter((c) => c.id !== convId) })),
    block: (b) => patch((s) => ({ ...s, blocked: s.blocked.some((x) => x.id === b.id) ? s.blocked : [...s.blocked, b] })),
    unblock: (id) => patch((s) => ({ ...s, blocked: s.blocked.filter((b) => b.id !== id) })),
    updateSettings: (p) => patch((s) => ({ ...s, settings: { ...s.settings, ...p } })),
    updateProfile: (p) => patch((s) => ({ ...s, profile: { ...s.profile, ...p } })),
    resetAll: () => setState({ ...INITIAL, theme: state.theme }),
    exportData: () => JSON.stringify(state, null, 2),
  };

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
