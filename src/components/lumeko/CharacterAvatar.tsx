import {
  BookOpen, Cat, Compass, Dices, Flame, Flower2, Gamepad2, Hammer, KeyRound, Music, Rocket, Search, Sparkles, Star,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const GLYPHS: Record<string, LucideIcon> = {
  compass: Compass, search: Search, star: Star, hammer: Hammer, rocket: Rocket, flower: Flower2, dice: Dices,
  book: BookOpen, cat: Cat, music: Music, gamepad: Gamepad2, flame: Flame, sparkles: Sparkles, key: KeyRound,
};

/** Generated illustration treatment: per-character hue drives a soft layered art panel. */
export function artStyle(hue: number): React.CSSProperties {
  return {
    background: `radial-gradient(120% 90% at 20% 10%, oklch(0.62 0.12 ${hue}) 0%, transparent 55%),
      radial-gradient(90% 80% at 90% 100%, oklch(0.45 0.1 ${(hue + 40) % 360}) 0%, transparent 60%),
      oklch(0.3 0.05 ${hue})`,
  };
}

export function CharacterArt({
  hue, glyph, name, className, size = "md",
}: { hue: number; glyph: string; name: string; className?: string; size?: "sm" | "md" | "lg" }) {
  const Icon = GLYPHS[glyph] ?? Sparkles;
  const initial = name.trim().charAt(0).toUpperCase();
  return (
    <div
      role="img"
      aria-label={`Ilustración de ${name}`}
      className={cn("relative isolate overflow-hidden", className)}
      style={artStyle(hue)}
    >
      <Icon
        aria-hidden
        className={cn(
          "absolute -right-3 -bottom-3 opacity-25",
          size === "lg" ? "size-40" : size === "md" ? "size-24" : "size-8",
        )}
        style={{ color: `oklch(0.92 0.05 ${hue})` }}
        strokeWidth={1.25}
      />
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 flex items-center justify-center font-display font-semibold",
          size === "lg" ? "text-7xl" : size === "md" ? "text-4xl" : "text-sm",
        )}
        style={{ color: `oklch(0.96 0.03 ${hue})` }}
      >
        {initial}
      </span>
    </div>
  );
}

export function CharacterAvatar({
  hue, glyph, name, className,
}: { hue: number; glyph: string; name: string; className?: string }) {
  return <CharacterArt hue={hue} glyph={glyph} name={name} size="sm" className={cn("size-10 shrink-0 rounded-full", className)} />;
}
