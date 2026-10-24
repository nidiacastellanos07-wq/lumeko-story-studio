import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Info, RefreshCw, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useStore } from "@/lib/store";
import { demoReply, DEMO_LATENCY_MS } from "@/lib/demo-engine";
import { CharacterArt, CharacterAvatar } from "@/components/lumeko/CharacterAvatar";
import { FavoriteButton } from "@/components/lumeko/CharacterCard";
import { ReportDialog } from "@/components/lumeko/ReportDialog";
import { DemoNote } from "@/components/lumeko/AppShell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  validateSearch: (s: Record<string, unknown>) => ({ c: typeof s.c === "string" ? s.c : undefined }),
  head: () => ({
    meta: [
      { title: "Chat — Lumeko" },
      { name: "description", content: "Conversa con tus personajes en Lumeko." },
      { property: "og:title", content: "Chat — Lumeko" },
      { property: "og:description", content: "Conversa con tus personajes en Lumeko." },
    ],
  }),
  component: Chat,
});

function Chat() {
  const { c: selected } = Route.useSearch();
  const navigate = useNavigate();
  const s = useStore();
  const [tab, setTab] = useState("individual");
  const [filter, setFilter] = useState("");
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);

  const list = [...s.conversations]
    .filter((c) => c.kind === tab)
    .filter((c) => (c.title ?? s.getCharacter(c.characterId)?.name ?? "").toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.updatedAt - a.updatedAt);
  const conv = s.conversations.find((c) => c.id === selected);
  const ch = conv ? s.getCharacter(conv.characterId) : undefined;

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [conv?.messages.length, typing]);

  const respond = (userText: string, regenerate = false) => {
    if (!conv || !ch) return;
    setTyping(true);
    setTimeout(() => {
      const msg = { id: crypto.randomUUID(), role: "char" as const, text: demoReply(ch, userText), at: Date.now() };
      regenerate ? s.replaceLastCharMessage(conv.id, msg) : s.appendMessage(conv.id, msg);
      setTyping(false);
    }, DEMO_LATENCY_MS);
  };
  const send = () => {
    const t = text.trim();
    if (!t || !conv || typing) return;
    s.appendMessage(conv.id, { id: crypto.randomUUID(), role: "user", text: t, at: Date.now() });
    setText("");
    respond(t);
  };
  const lastUser = conv?.messages.filter((m) => m.role === "user").at(-1)?.text ?? "";

  return (
    <div className="flex h-full">
      <aside className={cn("w-full shrink-0 flex-col border-r md:flex md:w-72", conv ? "hidden" : "flex")}>
        <div className="space-y-3 p-3">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="w-full"><TabsTrigger value="individual" className="flex-1">Individuales</TabsTrigger><TabsTrigger value="group" className="flex-1">Grupos</TabsTrigger></TabsList>
          </Tabs>
          <Input placeholder="Buscar chats…" aria-label="Buscar chats" value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
        <ul className="flex-1 overflow-y-auto px-2 pb-16 scrollbar-thin md:pb-2">
          {list.length === 0 && <li className="p-4 text-center text-sm text-muted-foreground">No hay chats aquí todavía.</li>}
          {list.map((cv) => {
            const c = s.getCharacter(cv.characterId);
            if (!c) return null;
            return (
              <li key={cv.id}>
                <Link to="/chat" search={{ c: cv.id }} className={cn("flex items-center gap-3 rounded-lg p-2", cv.id === selected ? "bg-accent" : "hover:bg-muted")}>
                  <CharacterAvatar hue={c.hue} glyph={c.glyph} name={c.name} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{cv.title ?? c.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{cv.messages.at(-1)?.text}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {conv && ch ? (
        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 border-b px-4 py-2.5">
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Volver a la lista" onClick={() => navigate({ to: "/chat", search: {} })}><X className="size-4" /></Button>
            <CharacterAvatar hue={ch.hue} glyph={ch.glyph} name={ch.name} className="size-8" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{conv.title ?? ch.name}</p>
              <DemoNote><Sparkles className="size-3" /> Respuestas demo locales, sin IA real</DemoNote>
            </div>
            <Button variant="outline" size="sm" onClick={() => s.resetConversation(conv.id)}>Nueva escena</Button>
            <Button variant="ghost" size="icon" aria-label="Información del personaje" aria-pressed={showInfo} onClick={() => setShowInfo((v) => !v)}><Info className="size-4" /></Button>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 scrollbar-thin">
            {conv.messages.map((m) => (
              <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                <p className={cn("max-w-[75%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap", m.role === "user" ? "rounded-br-sm bg-bubble-user text-bubble-user-foreground" : "rounded-bl-sm bg-bubble-char")}>{m.text}</p>
              </div>
            ))}
            {typing && (
              <div className="flex gap-1 rounded-2xl bg-bubble-char px-4 py-3 w-fit" aria-label={`${ch.name} está escribiendo`}>
                {[0, 1, 2].map((i) => <span key={i} className="typing-dot size-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: `${i * 0.15}s` }} />)}
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div className="border-t p-3 pb-16 md:pb-3">
            <div className="mb-2 flex">
              <Button variant="ghost" size="sm" disabled={typing || conv.messages.at(-1)?.role !== "char"} onClick={() => respond(lastUser, true)}>
                <RefreshCw className="size-3.5" /> Regenerar respuesta
              </Button>
            </div>
            <form className="flex items-end gap-2" onSubmit={(e) => { e.preventDefault(); send(); }}>
              <Textarea value={text} onChange={(e) => setText(e.target.value)} maxLength={1000} rows={1} aria-label="Escribe tu mensaje" placeholder={`Escribe a ${ch.name.split(" ")[0]}…`} className="min-h-10 resize-none"
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} />
              <Button type="submit" size="icon" disabled={!text.trim() || typing} aria-label="Enviar"><Send className="size-4" /></Button>
            </form>
          </div>
        </section>
      ) : (
        <section className="hidden flex-1 items-center justify-center p-6 text-center md:flex">
          <div><p className="font-medium">Elige una conversación</p><p className="mt-1 text-sm text-muted-foreground">O <Link to="/" className="text-primary underline">explora personajes</Link> para empezar una nueva.</p></div>
        </section>
      )}

      {conv && ch && showInfo && (
        <aside className="hidden w-80 shrink-0 overflow-y-auto border-l p-4 scrollbar-thin xl:block">
          <CharacterArt hue={ch.hue} glyph={ch.glyph} name={ch.name} className="aspect-square w-full rounded-xl" />
          <div className="mt-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{ch.name}</h2>
            <FavoriteButton id={ch.id} name={ch.name} className="border" />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{ch.premise}</p>
          <div className="mt-3 flex flex-wrap gap-1">{ch.tags.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}</div>
          {[["Persona", ch.personality], ["Escenario", ch.scenario], ["Lorebook", ch.background]].map(([t, v]) => (
            <Collapsible key={t} defaultOpen={t === "Persona"} className="mt-3 rounded-lg border">
              <CollapsibleTrigger className="flex w-full items-center justify-between p-3 text-sm font-medium">{t}<ChevronDown className="size-4" /></CollapsibleTrigger>
              <CollapsibleContent className="px-3 pb-3 text-sm text-muted-foreground">{v}</CollapsibleContent>
            </Collapsible>
          ))}
          <div className="mt-4 flex flex-col gap-1">
            <Button asChild variant="ghost" size="sm" className="justify-start"><Link to="/personaje/$id" params={{ id: ch.id }}>Ver ficha completa</Link></Button>
            <Button asChild variant="ghost" size="sm" className="justify-start"><Link to="/historial">Historial de chats</Link></Button>
            <ReportDialog targetId={ch.id} targetName={ch.name} />
          </div>
        </aside>
      )}
    </div>
  );
}
