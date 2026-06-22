import perfilAntes from "@/assets/results/perfil_facial_antes_01.jpg";
import perfilDespues from "@/assets/results/perfil_facial_despues_01.jpg";
import labiosAntes from "@/assets/results/labios_surcos_antes_01.jpg";
import labiosDespues from "@/assets/results/labios_surcos_despues_01.jpg";
import mentonAntes from "@/assets/results/relleno_menton_antes_01.jpg";
import mentonDespues from "@/assets/results/relleno_menton_despues_01.jpg";
import menton2Antes from "@/assets/results/relleno_menton_antes_02.jpg";
import menton2Despues from "@/assets/results/relleno_menton_despues_02.jpg";
import acneAntes from "@/assets/results/acne_peeling_antes_01.jpg";
import acneDespues from "@/assets/results/acne_peeling_despues_01.jpg";
import acne2Antes from "@/assets/results/acne_peeling_antes_02.jpg";
import acne2Despues from "@/assets/results/acne_peeling_despues_02.jpg";
import capilarAntes from "@/assets/results/capilar_antes_01.jpg";
import capilarDespues from "@/assets/results/capilar_despues_01.jpg";
import capilar2Antes from "@/assets/results/capilar_antes_02.jpg";
import capilar2Despues from "@/assets/results/capilar_despues_02.jpg";

export interface ResultCase {
  id: string;
  label: string;
  category: string;
  note: string;
  before: string;
  after: string;
}

export const resultCases: ResultCase[] = [
  {
    id: "perfil-facial",
    label: "Perfil facial",
    category: "Facial",
    note: "Definición de contorno y descanso facial manteniendo la naturalidad del perfil.",
    before: perfilAntes,
    after: perfilDespues,
  },
  {
    id: "labios-surcos",
    label: "Labios y surcos",
    category: "Facial",
    note: "Hidratación y soporte en surcos con volumen medido, sin sobrecargar la zona.",
    before: labiosAntes,
    after: labiosDespues,
  },
  {
    id: "relleno-menton",
    label: "Relleno de mentón",
    category: "Facial",
    note: "Proyección de mentón con ácido hialurónico para equilibrar la proporción del rostro.",
    before: mentonAntes,
    after: mentonDespues,
  },
  {
    id: "relleno-menton-2",
    label: "Relleno de mentón II",
    category: "Facial",
    note: "Otro caso de armonización del tercio inferior con indicación médica previa.",
    before: menton2Antes,
    after: menton2Despues,
  },
  {
    id: "acne-peeling",
    label: "Acné y peeling",
    category: "Facial",
    note: "Mejora de textura y manchas tras un plan de peelings con seguimiento.",
    before: acneAntes,
    after: acneDespues,
  },
  {
    id: "acne-peeling-2",
    label: "Acné y peeling II",
    category: "Facial",
    note: "Renovación de la calidad de piel en un segundo caso trabajado por etapas.",
    before: acne2Antes,
    after: acne2Despues,
  },
  {
    id: "capilar",
    label: "Tratamiento capilar",
    category: "Capilar",
    note: "Densidad y estímulo del crecimiento tras un abordaje capilar personalizado.",
    before: capilarAntes,
    after: capilarDespues,
  },
  {
    id: "capilar-2",
    label: "Tratamiento capilar II",
    category: "Capilar",
    note: "Evolución de densidad en un segundo caso con medicina capilar.",
    before: capilar2Antes,
    after: capilar2Despues,
  },
];
