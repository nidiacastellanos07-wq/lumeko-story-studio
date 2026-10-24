import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { formatCount } from "@/lib/data";
import { CharacterArt } from "@/components/lumeko/CharacterAvatar";
import { FavoriteButton } from "@/components/lumeko/CharacterCard";
import { ReportDialog } from "@/components/lumeko/ReportDialog";
import { PageContainer } from "@/components/lumeko/AppShell";

export const Route = createFileRoute("/personaje/$id")({
  head: () => ({
    meta: [
      { title: "Personaje — Lumeko" },
      { name: "description", content: "Conoce al personaje antes de empezar tu historia." },
      { property: "og:title", content: "Personaje — Lumeko" },
      { property: "og:description", content: "Conoce al personaje antes de empezar tu historia." },
    ],
  }),
  component: Detail,
});

function Detail() {
  const { id } = Route.useParams();
  const { getCharacter, startConversation } = useStore();
  const navigate = useNavigate();
  const c = getCharacter(id);
  if (!c)
    return (
      <PageContainer className="text-center">
        <p className="py-20">Este personaje no existe o fue eliminado. <Link to="/" className="text-primary underline">Volver</Link></p>
      </PageContainer>
    );
  return (
    <PageContainer className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <CharacterArt hue={c.hue} glyph={c.glyph} name={c.name} size="lg" className="aspect-square w-full rounded-2xl" />
      <div className="space-y-5">
        <div>
          <h1 className="text-3xl font-semibold">{c.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">por @{c.creator} · {formatCount(c.chats)} chats · {formatCount(c.likes)} me gusta</p>
          <p className="mt-3">{c.premise}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">{[...c.categories, ...c.tags].map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}</div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="lg" onClick={() => navigate({ to: "/chat", search: { c: startConversation(c.id) } })}>
            <MessageCircle className="size-4" /> Empezar chat
          </Button>
          <FavoriteButton id={c.id} name={c.name} className="size-10 border" />
          <ReportDialog targetId={c.id} targetName={c.name} />
        </div>
        {[["Personalidad", c.personality], ["Historia", c.background], ["Escenario", c.scenario], ["Primer mensaje", c.greeting]].map(([t, v]) => (
          <section key={t} className="rounded-xl border bg-card p-4">
            <h2 className="text-sm font-semibold">{t}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{v}</p>
          </section>
        ))}
      </div>
    </PageContainer>
  );
}
