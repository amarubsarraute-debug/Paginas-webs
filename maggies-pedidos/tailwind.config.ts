import type { Config } from "tailwindcss";

/**
 * Paleta cálida de Maggie's.
 * Crema / beige / café / bordó (CTA) / verde (disponible) / gris oscuro (texto).
 * Los valores se exponen también como CSS variables en globals.css por si se
 * quieren reutilizar fuera de Tailwind.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FAF5EC",
          50: "#FDFBF6",
          100: "#FAF5EC",
          200: "#F3E9D7",
        },
        beige: {
          DEFAULT: "#EFE3CE",
          dark: "#E4D3B6",
        },
        coffee: {
          DEFAULT: "#5A4233",
          light: "#7A5C49",
          dark: "#3C2A20",
        },
        bordo: {
          DEFAULT: "#8A2E2E",
          light: "#A23C3C",
          dark: "#6E2222",
        },
        sage: {
          DEFAULT: "#4F7A52",
          light: "#E4EFE2",
          dark: "#3C5E3E",
        },
        ink: {
          DEFAULT: "#2C2622",
          soft: "#5C534B",
          faint: "#8A8076",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(60, 42, 32, 0.06)",
        card: "0 6px 24px rgba(60, 42, 32, 0.08)",
        lift: "0 14px 40px rgba(60, 42, 32, 0.14)",
        drawer: "-12px 0 40px rgba(44, 38, 34, 0.16)",
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
        "slide-in": "slide-in 0.3s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slide-up": "slide-up 0.32s cubic-bezier(0.22, 1, 0.36, 1) both",
        "scale-in": "scale-in 0.2s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
