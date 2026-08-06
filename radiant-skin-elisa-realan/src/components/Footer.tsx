import {brand, legal, nav, waLink} from '../data';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-porcelain">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-[1.9rem] leading-none tracking-[-0.03em]">
              Radiant<span className="text-sage">Skin</span>
            </p>
            <p className="t-label mt-3">
              {brand.professional} · {brand.role}
            </p>
            <p className="mt-6 max-w-[34ch] text-[0.95rem] leading-relaxed text-graphite">
              Estética facial con diagnóstico previo en Salinas, Canelones y
              Montevideo.
            </p>
          </div>

          <nav aria-label="Pie de página" className="md:col-span-3">
            <p className="t-label">Secciones</p>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="link-underline text-[0.95rem]">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="t-label">Contacto</p>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              <li>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline">
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={brand.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline">
                  {brand.instagramHandle}
                </a>
              </li>
              <li>
                <a href={`mailto:${brand.email}`} className="link-underline">
                  {brand.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-label">
            © {year} {brand.name} · {brand.tagline}
          </p>
          <ul className="flex flex-wrap gap-6">
            {legal.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="t-label link-underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
