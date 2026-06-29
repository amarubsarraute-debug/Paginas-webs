import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight, Clock, Facebook, Instagram, MapPin, MessageCircle, Phone, Scale,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { SectionLabel } from "@/components/Reveal";
import {
  NAV, WA1, WA2, PHONE1_LABEL, PHONE2_LABEL, ADDRESS, CITY, HOURS,
  IG, FB, MAPS_LINK, MAPS_EMBED, waLink,
} from "@/data/content";

/* ---------------- Final CTA (ink) ---------------- */
export function FinalCTA() {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="container-page py-20 text-center md:py-28">
        <h2 className="mx-auto max-w-3xl text-balance font-display text-4xl font-medium leading-[1.08] md:text-5xl">
          Tu confianza, <span className="italic font-normal text-gold">nuestro compromiso</span>.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-white/70">
          Contanos tu situación y te orientamos con claridad. Información honesta,
          seguimiento y trato humano en cada paso.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-12 px-7">
            <a href="#contacto">
              Agendar consulta <ArrowRight />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 border-white/25 bg-white/5 px-7 text-white hover:bg-white/15 hover:text-white"
          >
            <a href={waLink(WA1)} target="_blank" rel="noopener">
              <MessageCircle /> Hablar por WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
export function Contact() {
  return (
    <section id="contacto" className="container-page py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionLabel>Contacto</SectionLabel>
          <h2 className="mt-4 text-balance font-display text-3xl font-medium leading-tight md:text-[2.6rem]">
            Estamos a un mensaje de distancia
          </h2>
          <p className="mt-5 text-pretty text-muted-foreground">
            Elegí el canal que prefieras. Te respondemos con claridad y a la brevedad.
          </p>

          <div className="mt-8 space-y-4">
            <InfoRow icon={MapPin} title="Dirección">
              {ADDRESS}
              <br />
              {CITY} · Plus Code 32QV+WX
            </InfoRow>
            <InfoRow icon={Phone} title="Teléfono y WhatsApp">
              <a className="hover:text-gold" href={`tel:+${WA1}`}>{PHONE1_LABEL}</a>
              <br />
              <a className="hover:text-gold" href={`tel:+${WA2}`}>{PHONE2_LABEL}</a>
            </InfoRow>
            <InfoRow icon={Clock} title="Horario">
              {HOURS}
            </InfoRow>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <a href={MAPS_LINK} target="_blank" rel="noopener">
                <MapPin /> Abrir en Google Maps
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={waLink(WA1)} target="_blank" rel="noopener">
                <MessageCircle /> WhatsApp 1
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={waLink(WA2)} target="_blank" rel="noopener">
                <MessageCircle /> WhatsApp 2
              </a>
            </Button>
          </div>

          <div className="mt-8 aspect-video overflow-hidden rounded-xl border border-border">
            <iframe
              title="Ubicación del estudio en Maldonado"
              src={MAPS_EMBED}
              className="h-full w-full"
              loading="lazy"
            />
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

function InfoRow({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-gold/25 bg-gold/10">
        <Icon className="h-4 w-4 text-gold" />
      </span>
      <div>
        <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{title}</div>
        <div className="mt-1 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!accepted) {
      toast.error("Debés aceptar la política de privacidad.");
      return;
    }
    setLoading(true);
    const form = e.currentTarget;
    setTimeout(() => {
      setLoading(false);
      form.reset();
      setAccepted(false);
      toast.success("Listo, te contactamos a la brevedad.");
    }, 900);
  };

  return (
    <form onSubmit={onSubmit} className="card-elevated h-fit p-7 md:p-9 lg:sticky lg:top-28">
      <h3 className="font-display text-2xl font-medium">Agendar consulta</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Completá el formulario y te respondemos a la brevedad.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Nombre y apellido" required>
          <Input name="name" required placeholder="Tu nombre" />
        </Field>
        <Field label="Teléfono (WhatsApp)" required>
          <Input name="phone" required type="tel" placeholder="+598 ..." />
        </Field>
        <Field label="Email" required className="sm:col-span-2">
          <Input name="email" required type="email" placeholder="tu@email.com" />
        </Field>
        <Field label="Motivo de consulta" required className="sm:col-span-2">
          <Select name="reason" required>
            <SelectTrigger>
              <SelectValue placeholder="Seleccioná una opción" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="juridica">Consulta jurídica</SelectItem>
              <SelectItem value="escribania">Trámite notarial / escribanía</SelectItem>
              <SelectItem value="documentos">Documentación / contratos</SelectItem>
              <SelectItem value="otro">Otro</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Mensaje" className="sm:col-span-2">
          <Textarea name="message" rows={4} placeholder="Contanos brevemente tu situación..." />
        </Field>
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
        <Checkbox checked={accepted} onCheckedChange={(v) => setAccepted(!!v)} className="mt-0.5" />
        <span>Acepto la política de privacidad. Mis datos se usan solo para responder esta consulta.</span>
      </label>

      <Button type="submit" disabled={loading} className="mt-6 h-11 w-full">
        {loading ? "Enviando..." : <>Enviar consulta <ArrowRight /></>}
      </Button>
    </form>
  );
}

function Field({
  label, required, children, className = "",
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="mb-2 block text-xs uppercase tracking-[0.14em] text-muted-foreground">
        {label}
        {required && <span className="text-gold"> *</span>}
      </Label>
      {children}
    </div>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo-trujillo.png"
              alt="Logo Trujillo"
              className="h-9 w-9 rounded-md object-cover border border-white/20"
            />
            <span className="font-display text-base font-semibold">Trujillo y Asociadas</span>
          </div>
          <p className="mt-4 text-sm text-white/60">
            Estudio jurídico y notarial en Maldonado. Tu confianza, nuestro compromiso.
          </p>
        </div>

        <FooterCol title="Navegación" links={NAV} />

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-gold">Contacto</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li>{ADDRESS}</li>
            <li>{CITY}</li>
            <li><a className="hover:text-white" href={`tel:+${WA1}`}>{PHONE1_LABEL}</a></li>
            <li><a className="hover:text-white" href={`tel:+${WA2}`}>{PHONE2_LABEL}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-gold">Redes</h4>
          <div className="mt-4 flex gap-3">
            <a
              href={IG}
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-md border border-white/15 text-white/70 transition-colors hover:border-gold/50 hover:text-white"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={FB}
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-md border border-white/15 text-white/70 transition-colors hover:border-gold/50 hover:text-white"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
          <h4 className="mt-8 text-xs uppercase tracking-[0.2em] text-gold">Legal</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li><a className="hover:text-white" href="#">Política de privacidad</a></li>
            <li><a className="hover:text-white" href="#">Términos</a></li>
            <li><a className="hover:text-white" href="#">Aviso legal</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-8">
          <p className="text-xs text-white/50">
            La información de este sitio es de carácter general y no sustituye asesoramiento legal personalizado.
          </p>
          <p className="mt-2 text-xs text-white/50">
            © {new Date().getFullYear()} Trujillo, Abogadas y Escribanas. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-[0.2em] text-gold">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm text-white/60">
        {links.map((l) => (
          <li key={l.href}>
            <a className="transition-colors hover:text-white" href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
