import { Link } from "@tanstack/react-router";
import { Heart, MessageCircle, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCount, type Character } from "@/lib/data";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { CharacterArt } from "./CharacterAvatar";

export function FavoriteButton({ id, name, className }: { id: string; name: string; className?: string }) {
  const { isFavorite, toggleFavorite } = useStore();
  const fav = isFavorite(id);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
      }}
      aria-pressed={fav}
      aria-label={fav ? `Quitar a ${name} de favoritos` : `Añadir a ${name} a favoritos`}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur-sm transition hover:bg-background",
        className,
      )}
    >
      <Heart className={cn("size-4", fav && "fill-primary text-primary")} />
    </button>
  );
}

export function CharacterCard({ c }: { c: Character }) {
  return (
    <Link
      to="/personaje/$id"
      params={{ id: c.id }}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition hover:border-primary/50 focus-visible:border-primary"
    >
      <div className="relative">
        <CharacterArt hue={c.hue} glyph={c.glyph} name={c.name} className="aspect-[4/3] w-full transition group-hover:brightness-110" />
        <FavoriteButton id={c.id} name={c.name} className="absolute top-2 right-2" />
        {c.visibility === "private" && (
          <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-xs">
            <Lock className="size-3" /> Privado
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div>
          <h3 className="truncate text-sm font-semibold">{c.name}</h3>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{c.premise}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {c.tags.slice(0, 2).map((t) => (
            <Badge key={t} variant="secondary" className="px-1.5 py-0 text-[10px] font-medium">
              {t}
            </Badge>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-1 text-xs text-muted-foreground">
          <span className="truncate">@{c.creator}</span>
          <span className="flex shrink-0 items-center gap-2">
            <span className="flex items-center gap-0.5" aria-label={`${c.chats} chats`}>
              <MessageCircle className="size-3" /> {formatCount(c.chats)}
            </span>
            <span className="flex items-center gap-0.5" aria-label={`${c.likes} me gusta`}>
              <Heart className="size-3" /> {formatCount(c.likes)}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">{children}</div>;
}
