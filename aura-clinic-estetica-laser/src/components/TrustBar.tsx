import { ClipboardCheck, LineChart, ShieldCheck, UserCheck } from 'lucide-react';
import { TRUST_ITEMS } from '../data';

const icons = [UserCheck, ClipboardCheck, ShieldCheck, LineChart];

export default function TrustBar() {
  return (
    <section aria-label="Pilares de confianza" className="border-y border-brand-dark/10 bg-brand-paper">
      <div className="section-shell grid gap-0 py-4 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST_ITEMS.map((item, index) => {
          const Icon = icons[index];

          return (
            <div
              key={item}
              className="flex min-h-16 items-center gap-3 border-brand-dark/10 py-3 sm:odd:border-r lg:border-r lg:last:border-r-0 lg:px-5"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-sand-light text-brand-dark">
                <Icon size={18} strokeWidth={1.8} />
              </span>
              <span className="text-sm font-semibold leading-snug text-brand-dark">{item}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
