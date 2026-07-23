export function scrollToSection(sectionId: string) {
  if (typeof window === "undefined") return;

  const element = document.getElementById(sectionId);
  if (!element) return;

  const headerOffset = window.innerWidth < 768 ? 92 : 78;
  const targetTop = element.getBoundingClientRect().top + window.scrollY - headerOffset;

  window.scrollTo({
    top: Math.max(targetTop, 0),
    behavior: "smooth",
  });
}
