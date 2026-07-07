import Header from './components/Header';
import Hero from './components/Hero';
import Treatments from './components/Treatments';
import NaturalVsExagerado from './components/NaturalVsExagerado';
import About from './components/About';
import Timeline from './components/Timeline';


import Locations from './components/Locations';
import MidCTA from './components/MidCTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <div className="relative scroll-smooth">
      <Header />
      <main>
        <Hero />
        <About />
        <Treatments />
        <NaturalVsExagerado />
        <Timeline />
        
        
        <Locations />
        <MidCTA />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
