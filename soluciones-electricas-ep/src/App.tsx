/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Ticker } from './components/Ticker';
import { Problem } from './components/Problem';
import { Services } from './components/Services';
import { ClientTypes } from './components/ClientTypes';

import { Differentiator } from './components/Differentiator';

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
      <Header />
      <Hero />
      <Ticker />
      <Problem />
      <Services />
      <ClientTypes />
      
      <Differentiator />
      
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
