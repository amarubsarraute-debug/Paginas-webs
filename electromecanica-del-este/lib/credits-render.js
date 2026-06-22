(function () {
  "use strict";

  const escHTML = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, c =>
    ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[c]);

  fetch("assets/credits.json")
    .then(r => r.json())
    .then(credits => {
      const list = document.querySelector("[data-credits]");
      if (!list) return;

      list.innerHTML = Object.entries(credits).map(([id, c]) => `
        <li class="credits-item">
          <img src="${escHTML(c.src)}" alt="${escHTML(c.title)}" class="credits-thumb">
          <div class="credits-info">
            <h3 class="credits-img-title">${escHTML(c.title)}</h3>
            <p class="credits-author">
              Por: ${c.creator_url && c.creator_url !== "#" ? `<a href="${escHTML(c.creator_url)}" target="_blank" rel="noopener noreferrer">${escHTML(c.creator)}</a>` : escHTML(c.creator)}
            </p>
            <span class="credits-tag">${escHTML(c.source)} - ${escHTML(c.license)}</span>
          </div>
        </li>
      `).join("");
      
      // Re-trigger Lucide icons for any dynamically added icons
      if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
      }
    })
    .catch(err => {
      console.warn("Failed to load credits.json:", err);
      const list = document.querySelector("[data-credits]");
      if (list) {
        list.innerHTML = `<li class="credits-item">No se pudieron cargar los créditos en este momento.</li>`;
      }
    });
})();
