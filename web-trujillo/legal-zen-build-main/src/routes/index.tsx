import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { VideoHero } from "@/components/VideoHero";
import { Header, WhatsAppFloat } from "@/components/sections/Header";
import { SocialProof, ProblemSolution, Services, Notary } from "@/components/sections/Offerings";
import { Process, Team, Testimonials, FAQ } from "@/components/sections/Credibility";
import { FinalCTA, Contact, Footer } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trujillo - Abogadas y Escribanas en Maldonado | Consultas y Escribanía" },
      { name: "description", content: "Estudio jurídico y notarial en el centro de Maldonado. Atención cercana, transparente y eficiente. 5.0★ con más de 125 reseñas. Agendá tu consulta." },
      { property: "og:title", content: "Trujillo - Abogadas y Escribanas en Maldonado" },
      { property: "og:description", content: "Estudio jurídico y notarial. Responsabilidad, transparencia y eficiencia." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LegalService",
          name: "Trujillo - Abogadas y Escribanas",
          alternateName: "Trujillo y Asociadas",
          description: "Estudio jurídico y notarial en Maldonado, Uruguay.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Rafael Pérez del Puerto 627",
            addressLocality: "Maldonado",
            addressRegion: "Maldonado",
            addressCountry: "UY",
          },
          telephone: ["+59895797084", "+59892446792"],
          openingHours: "Mo-Fr 09:00-19:00",
          aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "125" },
          sameAs: [
            "https://www.instagram.com/trujilloyasociadas",
            "https://www.facebook.com/Trujilloyasociadas",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Toaster theme="light" position="top-center" />
      <Header />
      <main>
        <VideoHero />
        <SocialProof />
        <ProblemSolution />
        <Services />
        <Notary />
        <Process />
        <Team />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
