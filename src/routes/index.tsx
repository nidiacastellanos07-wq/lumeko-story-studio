import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES } from "@/lib/data";
import { useStore } from "@/lib/store";
import { CardGrid, CharacterCard } from "@/components/lumeko/CharacterCard";
import { CharacterAvatar } from "@/components/lumeko/CharacterAvatar";
import { PageContainer } from "@/components/lumeko/AppShell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s.q === "string" ? s.q : undefined }),
  head: () => ({
    meta: [
      { title: "Explorar personajes — Lumeko" },
      { name: "description", content: "Explora personajes originales y empieza historias interactivas." },
      { property: "og:title", content: "Explorar personajes — Lumeko" },
      { property: "og:description", content: "Explora personajes originales y empieza historias interactivas." },
    ],
  }),
  component: Explore,
});

function Explore() {
  const { q } = Route.useSearch();
  const { characters, conversations, getCharacter, settings } = useStore();
  const [cat, setCat] = useState<string | null>(null);
  const [sort, setSort] = useState("populares");

  const filtered = useMemo(() => {
    let list = characters.filter((c) => c.visibility === "public" || c.mine);
    if (settings.hideRomance) list = list.filter((c) => !c.categories.includes("Romance"));
    if (cat) list = list.filter((c) => c.categories.includes(cat as never));
    if (q) {
      const t = q.toLowerCase();
      list = list.filter((c) => [c.name, c.premise, c.creator, ...c.tags].join(" ").toLowerCase().includes(t));
    }
    return [...list].sort((a, b) =>
      sort === "nuevos" ? b.createdAt.localeCompare(a.createdAt) : sort === "gustados" ? b.likes - a.likes : b.chats - a.chats,
    );
  }, [characters, cat, q, sort, settings.hideRomance]);

  const recent = [...conversations].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 4);
  const browsing = !q && !cat;

  return (
    <PageContainer className="space-y-8">
      {browsing && (
        <section className="flex flex-col justify-between gap-4 rounded-2xl border bg-surface p-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold tracking-wide text-primary uppercase">Bienvenida de nuevo</p>
            <h1 className="mt-1 text-2xl font-semibold md:text-3xl">¿Qué historia vas a vivir hoy?</h1>
            <p className="mt-1 max-w-lg text-sm text-muted-foreground">Personajes originales, mundos por descubrir y conversaciones que continúan donde las dejaste.</p>
          </div>
          <div className="flex gap-2">
            <Button asChild><Link to="/personaje/$id" params={{ id: "aurelia" }}>Destacado: Aurelia</Link></Button>
            <Button asChild variant="outline"><Link to="/crear">Crear personaje</Link></Button>
          </div>
        </section>
      )}

      {browsing && recent.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold">Continúa tus historias</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {recent.map((cv) => {
              const c = getCharacter(cv.characterId);
              if (!c) return null;
              return (
                <Link key={cv.id} to="/chat" search={{ c: cv.id }} className="flex items-center gap-3 rounded-xl border bg-card p-3 hover:border-primary/50">
                  <CharacterAvatar hue={c.hue} glyph={c.glyph} name={c.name} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{cv.title ?? c.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{cv.messages.at(-1)?.text}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <h2 className="mr-auto text-lg font-semibold">
            {q ? `Resultados para “${q}”` : cat ?? "Recomendados para ti"}
          </h2>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-40" aria-label="Ordenar"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="populares">Más populares</SelectItem>
              <SelectItem value="gustados">Más gustados</SelectItem>
              <SelectItem value="nuevos">Más nuevos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4 flex gap-2 overflow-x-auto pb-1 scrollbar-thin" role="group" aria-label="Categorías">
          {[null, ...CATEGORIES].map((c) => (
            <button
              key={c ?? "todas"}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 text-sm transition",
                cat === c ? "border-primary bg-primary text-primary-foreground" : "bg-surface text-muted-foreground hover:text-foreground",
              )}
            >
              {c ?? "Todas"}
            </button>
          ))}
        </div>
        {filtered.length ? (
          <CardGrid>{filtered.map((c) => <CharacterCard key={c.id} c={c} />)}</CardGrid>
        ) : (
          <div className="rounded-xl border border-dashed p-10 text-center">
            <p className="font-medium">No encontramos personajes</p>
            <p className="mt-1 text-sm text-muted-foreground">Prueba otra búsqueda o categoría.</p>
            <Button asChild variant="outline" className="mt-4"><Link to="/" search={{}} onClick={() => setCat(null)}>Ver todos</Link></Button>
          </div>
        )}
      </section>
    </PageContainer>
  );
}
