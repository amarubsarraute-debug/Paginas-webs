import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MenuExperience from "@/components/MenuExperience";
import HowItWorks from "@/components/HowItWorks";
import DeliverySection from "@/components/DeliverySection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import { getMenu } from "@/lib/data/catalog";

export default async function HomePage() {
  // Menú del negocio (Supabase → respaldo local menu.json), en el servidor.
  const fallbackMenu = await getMenu();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <MenuExperience fallbackMenu={fallbackMenu} />
        <HowItWorks />
        <DeliverySection />
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}
