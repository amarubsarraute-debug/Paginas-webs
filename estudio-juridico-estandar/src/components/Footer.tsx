import { Scale } from 'lucide-react';
import { NAV, DIRECCION, ZONA, TELEFONO_LABEL, TELEFONO_TEL } from '../lib/constants';

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-md border border-white/20 bg-white/5">
              <Scale className="h-4 w-4 text-bordeaux-bright" />
            </span>
            <span className="font-display text-base font-semibold">Estudio Jurídico Cairo Duaso</span>
          </div>
          <p className="mt-4 text-sm text-white/60">
            Asesoramiento y representación legal en {ZONA} Centro.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-bordeaux-bright">Navegación</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            {NAV.map((l) => (
              <li key={l.href}>
                <a className="transition-colors hover:text-white" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-bordeaux-bright">Contacto</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li>{DIRECCION}</li>
            <li>{ZONA}</li>
            <li>
              <a className="hover:text-white" href={TELEFONO_TEL}>
                {TELEFONO_LABEL}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-8">
          <p className="text-xs text-white/50">
            La información de este sitio es de carácter general y no sustituye asesoramiento legal personalizado.
          </p>
          <p className="mt-2 text-xs text-white/50">
            © {new Date().getFullYear()} Estudio Jurídico Cairo Duaso. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
