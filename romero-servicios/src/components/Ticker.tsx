import React from 'react';

const styles = `
  @keyframes ticker-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .ticker-container {
    width: 100%;
    overflow: hidden;
    background-color: #0f172a;
    color: #facc15;
    padding: 12px 0;
    display: flex;
    white-space: nowrap;
    border-top: 1px solid rgba(250, 204, 21, 0.2);
    border-bottom: 1px solid rgba(250, 204, 21, 0.2);
  }
  .ticker-track {
    display: inline-flex;
    animation: ticker-scroll 35s linear infinite;
    gap: 2rem;
    padding-right: 2rem;
  }
  .ticker-track:hover {
    animation-play-state: paused;
  }
  .ticker-item {
    font-family: monospace;
    font-weight: bold;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .ticker-dot {
    color: #64748b;
    margin: 0 1rem;
  }
`;

export function Ticker() {
  const services = [
    "Cortocircuitos",
    "Tableros eléctricos",
    "Salta la térmica",
    "Fugas de corriente",
    "Recableados",
    "Cambio de llaves y tomas",
    "Iluminación LED",
    "Urgencias 24hs",
    "Mantenimiento",
    "Instalaciones"
];
  const duplicated = [...services, ...services, ...services, ...services];

  return (
    <>
      <style>{styles}</style>
      <div className="ticker-container z-20 relative">
        <div className="ticker-track">
          {duplicated.map((svc, i) => (
            <div key={i} className="flex items-center">
              <span className="ticker-item">{svc}</span>
              <span className="ticker-dot">•</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
