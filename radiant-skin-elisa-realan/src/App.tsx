import Faq from './components/Faq';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import Goals from './components/Goals';
import Hero from './components/Hero';
import Insight from './components/Insight';
import Method from './components/Method';
import Nav from './components/Nav';
import Process from './components/Process';
import Profile from './components/Profile';
import Results from './components/Results';
import Session from './components/Session';
import Testimonials from './components/Testimonials';
import Treatments from './components/Treatments';
import WhatsAppFab from './components/WhatsAppFab';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Insight />
        <Profile />
        <Goals />
        <Method />
        <Treatments />
        <Process />
        <Results />
        <Session />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
