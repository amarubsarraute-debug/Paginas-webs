import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SocialProof } from './components/SocialProof';
import { Trust } from './components/Trust';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingContact } from './components/FloatingContact';

export default function App() {
  return (
    <div className="min-h-screen bg-paper font-sans">
      <Header />
      <Hero />
      <SocialProof />
      <Trust />
      <Services />
      <Process />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Contact />
      <Footer />
      <FloatingContact />
    </div>
  );
}
