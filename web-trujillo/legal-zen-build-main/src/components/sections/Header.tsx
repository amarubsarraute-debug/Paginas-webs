import { useEffect, useState } from "react";
import { Menu, X, MessageCircle, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV, WA1, waLink } from "@/data/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight - 90);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Light treatment while floating over the dark video hero.
  const overHero = !solid && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        overHero ? "bg-transparent" : "border-b border-border bg-background/85 backdrop-blur-xl",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <img
            src="/logo-trujillo.png"
            alt="Logo Trujillo"
            className="h-9 w-9 rounded-md object-cover border border-white/20"
          />
          <span className="flex flex-col leading-none">
            <span
              className={cn(
                "font-display text-[17px] font-semibold tracking-tight transition-colors",
                overHero ? "text-white" : "text-foreground",
              )}
            >
              Trujillo
            </span>
            <span
              className={cn(
                "text-[10px] uppercase tracking-[0.18em] transition-colors",
                overHero ? "text-white/70" : "text-muted-foreground",
              )}
            >
              Abogadas y Escribanas
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={cn(
                "text-sm transition-colors",
                overHero ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className={overHero ? "text-white hover:bg-white/15 hover:text-white" : ""}
          >
            <a href={waLink(WA1)} target="_blank" rel="noopener">
              <MessageCircle /> WhatsApp
            </a>
          </Button>
          <Button asChild size="sm">
            <a href="#contacto">Agendar consulta</a>
          </Button>
        </div>

        <button
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className={cn(
            "grid h-10 w-10 place-items-center rounded-md border transition-colors lg:hidden",
            overHero ? "border-white/30 text-white" : "border-border text-foreground",
          )}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur lg:hidden">
          <div className="container-page flex flex-col gap-3 py-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-2 text-foreground"
              >
                {n.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <Button asChild variant="outline" className="flex-1">
                <a href={waLink(WA1)} target="_blank" rel="noopener">
                  <MessageCircle /> WhatsApp
                </a>
              </Button>
              <Button asChild className="flex-1">
                <a href="#contacto" onClick={() => setOpen(false)}>Agendar</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={waLink(WA1)}
      target="_blank"
      rel="noopener"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-3 text-gold-foreground shadow-lg shadow-black/15 transition-transform hover:-translate-y-0.5"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden text-sm font-medium sm:inline">¿Necesitás orientación?</span>
    </a>
  );
}
