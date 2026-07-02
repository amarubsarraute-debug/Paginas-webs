import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { CtaButton } from "./CtaButton";

const links = [
  { href: "#dra", label: "Dra. Luisa" },
  { href: "#tratamientos", label: "Tratamientos" },
  { href: "#resultados", label: "Resultados" },
  { href: "#sedes", label: "Sedes" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacto", label: "Contacto" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#inicio" className="flex flex-col leading-none">
          <span
            className={`font-serif text-xl leading-none transition-colors ${scrolled ? "text-foreground" : "text-white"}`}
          >
            Dra. Luisa Cedeño
          </span>
          <span
            className={`mt-1 font-mono text-[0.6rem] font-medium uppercase tracking-widest transition-colors ${scrolled ? "text-muted-foreground" : "text-white/50"}`}
          >
            Medicina estética regenerativa
          </span>
        </a>

        <div className="hidden items-center gap-7 xl:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden xl:block">
          <CtaButton>{scrolled ? "Agendar valoración" : "Agendar"}</CtaButton>
        </div>

        <button
          className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-colors xl:hidden ${
            scrolled
              ? "border-border bg-card text-foreground"
              : "border-white/20 bg-white/10 text-white backdrop-blur-sm"
          }`}
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {l.label}
              </a>
            ))}
            <CtaButton className="mt-2 w-full">Agendar valoración</CtaButton>
          </div>
        </div>
      )}
    </header>
  );
}
