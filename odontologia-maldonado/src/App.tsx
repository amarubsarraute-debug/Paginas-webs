import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EmotionalSection } from './components/EmotionalSection';
import { Treatments } from './components/Treatments';
import { Differentials } from './components/Differentials';
import { About } from './components/About';
import { HowWeWork } from './components/HowWeWork';
import { Reviews } from './components/Reviews';
import { Cases } from './components/Cases';
import { CTABanner, FinalCTA } from './components/CTAs';
import { FAQ } from './components/FAQ';
import { Location } from './components/Location';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <EmotionalSection />
        <Treatments />
        <Differentials />
        <About />
        <HowWeWork />
        <Reviews />
        <Cases />
        <CTABanner />
        <FAQ />
        <Location />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

