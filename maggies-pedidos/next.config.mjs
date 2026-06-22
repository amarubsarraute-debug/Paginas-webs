/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Las imágenes de productos pueden venir de URLs externas (Google Drive,
  // Instagram, etc.). Para evitar configurar dominios uno por uno usamos
  // etiquetas <img> normales con fallback en ProductCard, así que no hace
  // falta tocar la config de next/image.
};

export default nextConfig;
