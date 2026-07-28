import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ConcernsSection from './components/ConcernsSection';
import BeforeAfter from './components/BeforeAfter';
import Timeline from './components/Timeline';
import Professionals from './components/Professionals';
import TechnologySection from './components/TechnologySection';
import ClinicExperience from './components/ClinicExperience';
import Testimonials from './components/Testimonials';
import Locations from './components/Locations';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import TreatmentDetail from './components/TreatmentDetail';
import { getTreatmentBySlug } from './treatmentContent';

const HOME_TITLE = 'Aura Clinic | Clínica estética láser y facial';
const HOME_DESCRIPTION =
  'Aura Clinic. Clínica estética láser y facial en Montevideo y Punta del Este. Tratamientos corporales, Botox y labios con ácido hialurónico con evaluación profesional.';

function getCurrentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/';
}

function usePathname() {
  const [path, setPath] = useState(getCurrentPath);

  useEffect(() => {
    const updatePath = () => setPath(getCurrentPath());
    window.addEventListener('popstate', updatePath);

    return () => window.removeEventListener('popstate', updatePath);
  }, []);

  return path;
}

function updateMeta(title: string, description: string) {
  document.title = title;

  const metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (metaDescription) {
    metaDescription.content = description;
  }
}

function scrollToCurrentHash() {
  if (!window.location.hash) return false;

  const scroll = () => {
    try {
      document.querySelector(window.location.hash)?.scrollIntoView();
    } catch {
      // Ignore malformed hashes; the current page still renders normally.
    }
  };

  window.requestAnimationFrame(scroll);
  window.setTimeout(scroll, 120);
  window.setTimeout(scroll, 450);
  window.setTimeout(scroll, 1000);

  return true;
}

export default function App() {
  const path = usePathname();
  const treatment = useMemo(() => {
    const match = path.match(/^\/tratamientos\/([^/]+)$/);
    return getTreatmentBySlug(match?.[1]);
  }, [path]);

  useEffect(() => {
    if (treatment) {
      updateMeta(`${treatment.title} | Aura Clinic`, treatment.metaDescription);
      window.scrollTo({ top: 0, left: 0 });
      return;
    }

    updateMeta(HOME_TITLE, HOME_DESCRIPTION);
    if (scrollToCurrentHash()) {
      return;
    }

    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [treatment]);

  useEffect(() => {
    if (treatment) return;

    window.addEventListener('hashchange', scrollToCurrentHash);

    return () => window.removeEventListener('hashchange', scrollToCurrentHash);
  }, [treatment]);

  return (
    <div className="luxury-page relative overflow-x-clip scroll-smooth">
      <Header />
      <main>
        {treatment ? (
          <TreatmentDetail treatment={treatment} />
        ) : (
          <>
            <Hero />
            <ConcernsSection />
            <Professionals />
            <BeforeAfter />
            <TechnologySection />
            <ClinicExperience />
            <Timeline />
            <Testimonials />
            <Locations />
            <FAQ />
            <FinalCTA />
          </>
        )}
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
