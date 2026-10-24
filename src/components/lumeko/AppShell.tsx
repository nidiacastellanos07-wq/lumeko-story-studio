import { useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Bell, Compass, History, Languages, MessageSquare, Moon, PanelLeftClose, PanelLeftOpen, PlusCircle, Search,
  Settings, Sun, User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Explorar", icon: Compass },
  { to: "/chat", label: "Chat", icon: MessageSquare },
  { to: "/historial", label: "Historias", icon: History },
  { to: "/crear", label: "Crear", icon: PlusCircle },
  { to: "/perfil", label: "Mi perfil", icon: User },
  { to: "/ajustes", label: "Ajustes", icon: Settings },
] as const;

const ACTIVITY = [
  { text: "Kiri Hoshino tiene 1.200 nuevos chats hoy", when: "hace 1 h" },
  { text: "marea_azul publicó un nuevo personaje", when: "hace 3 h" },
  { text: "A 14 personas les gustó tu historia con Aurelia", when: "ayer" },
];

export function Wordmark({ compact }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2 rounded-md" aria-label="Lumeko, inicio">
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary font-display text-base font-bold text-primary-foreground">
        L
      </span>
      {!compact && <span className="font-display text-lg font-semibold tracking-tight">Lumeko</span>}
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));
  const isChat = pathname.startsWith("/chat");

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex h-dvh w-full overflow-hidden bg-background">
        <aside
          className={cn(
            "hidden shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] md:flex",
            collapsed ? "w-16" : "w-56",
          )}
        >
          <div className={cn("flex h-14 items-center", collapsed ? "justify-center" : "justify-between px-4")}>
            <Wordmark compact={collapsed} />
          </div>
          <nav aria-label="Navegación principal" className="flex flex-1 flex-col gap-1 px-2 py-2">
            {NAV.map((n) => {
              const link = (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                    collapsed && "justify-center px-0",
                    isActive(n.to)
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                  )}
                  aria-current={isActive(n.to) ? "page" : undefined}
                >
                  <n.icon className={cn("size-4.5 shrink-0", isActive(n.to) && "text-primary")} />
                  {!collapsed && n.label}
                </Link>
              );
              return collapsed ? (
                <Tooltip key={n.to}>
                  <TooltipTrigger asChild>{link}</TooltipTrigger>
                  <TooltipContent side="right">{n.label}</TooltipContent>
                </Tooltip>
              ) : (
                link
              );
            })}
          </nav>
          <div className="space-y-2 border-t border-sidebar-border p-2">
            <Button
              variant="ghost"
              size="sm"
              className={cn("w-full text-muted-foreground", collapsed ? "justify-center px-0" : "justify-start")}
              onClick={() => setCollapsed((v) => !v)}
              aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
            >
              {collapsed ? <PanelLeftOpen className="size-4" /> : <><PanelLeftClose className="size-4" /> Contraer</>}
            </Button>
            {!collapsed && (
              <p className="px-3 pb-1 text-[11px] text-muted-foreground">Prototipo · por Modo Studio</p>
            )}
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main id="contenido" className={cn("min-h-0 flex-1", isChat ? "overflow-hidden" : "overflow-y-auto scrollbar-thin pb-16 md:pb-0")}>
            {children}
          </main>
        </div>

        <nav
          aria-label="Navegación móvil"
          className="fixed inset-x-0 bottom-0 z-40 flex h-14 border-t bg-sidebar md:hidden"
        >
          {NAV.slice(0, 5).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px]",
                isActive(n.to) ? "text-primary" : "text-muted-foreground",
              )}
            >
              <n.icon className="size-5" />
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </TooltipProvider>
  );
}

function TopBar() {
  const navigate = useNavigate();
  const { theme, setTheme, profile } = useStore();
  const [q, setQ] = useState("");
  const [read, setRead] = useState(false);

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b px-3 md:px-5">
      <div className="md:hidden">
        <Wordmark compact />
      </div>
      <form
        role="search"
        className="relative max-w-md flex-1"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/", search: { q: q.trim() || undefined } });
        }}
      >
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar personajes, etiquetas o creadores…"
          aria-label="Buscar personajes"
          className="h-9 bg-surface pl-9"
        />
      </form>
      <div className="ml-auto flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          aria-label={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
        <Popover onOpenChange={(o) => o && setRead(true)}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Actividad y notificaciones" className="relative">
              <Bell className="size-4" />
              {!read && <span className="absolute top-2 right-2 size-2 rounded-full bg-primary" />}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="border-b px-4 py-3">
              <p className="text-sm font-semibold">Actividad</p>
              <p className="text-xs text-muted-foreground">Notificaciones de demostración</p>
            </div>
            <ul className="divide-y">
              {ACTIVITY.map((a) => (
                <li key={a.text} className="px-4 py-3 text-sm">
                  {a.text}
                  <span className="block text-xs text-muted-foreground">{a.when}</span>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 px-1.5" aria-label="Menú de perfil">
              <span className="flex size-7 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                {profile.name.charAt(0)}
              </span>
              <span className="hidden text-sm lg:inline">{profile.name.split(" ")[0]}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="font-normal">
              <p className="text-sm font-medium">{profile.name}</p>
              <p className="text-xs text-muted-foreground">@{profile.handle}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => navigate({ to: "/perfil" })}><User /> Mi perfil</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => navigate({ to: "/historial" })}><History /> Mis historias</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => navigate({ to: "/ajustes" })}><Settings /> Ajustes</DropdownMenuItem>
            <DropdownMenuItem disabled><Languages /> Idioma: Español (único disponible)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export function PageContainer({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1400px] px-4 py-6 md:px-6", className)}>{children}</div>;
}

export function DemoNote({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-accent/40 px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
      {children}
    </span>
  );
}
