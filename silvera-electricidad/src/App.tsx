/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { Services } from './components/Services';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { Differentiator } from './components/Differentiator';
import { Clients } from './components/Clients';
import { Process } from './components/Process';
import { Trust } from './components/Trust';
import { CTA } from './components/CTA';
import { Gallery } from './components/Gallery';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  return (
    <div className="min-h-screen bg-transparent font-sans selection:bg-gold selection:text-navy relative z-10">
      <Hero />
      <Problem />
      <Services />
      <BeforeAfterSection />
      <Differentiator />
      <Clients />
      <Process />
      <Trust />
      <CTA />
      <Gallery />
      <FAQ />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
