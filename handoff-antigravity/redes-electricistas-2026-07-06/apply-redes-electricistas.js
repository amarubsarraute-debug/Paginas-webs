const fs = require("fs");
const path = require("path");

const handoffDir = __dirname;
const workspaceRoot = path.resolve(handoffDir, "..", "..");
const dataPath = path.join(handoffDir, "redes-electricistas.json");
const dryRun = process.argv.includes("--dry-run");

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

function eolOf(text) {
  return text.includes("\r\n") ? "\r\n" : "\n";
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function addToNamedImport(text, moduleName, names) {
  const re = new RegExp(`import\\s*\\{([^}]+)\\}\\s*from\\s*["']${escapeRegExp(moduleName)}["'];`);
  if (!re.test(text)) {
    throw new Error(`Could not find named import from ${moduleName}`);
  }

  return text.replace(re, (_match, body) => {
    const parts = body
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);

    for (const name of names) {
      if (!parts.includes(name)) parts.push(name);
    }

    return `import { ${parts.join(", ")} } from "${moduleName}";`;
  });
}

function socialConstants(links, eol) {
  const lines = [
    "export type SocialLink = {",
    '  label: "Instagram" | "Facebook" | "LinkedIn" | "Web";',
    "  href: string;",
    "};",
    "",
    "export const SOCIAL_LINKS: SocialLink[] = [",
  ];

  for (const link of links) {
    lines.push(`  { label: "${link.label}", href: "${link.href}" },`);
  }

  lines.push("];");
  return lines.join(eol);
}

function patchConstants(filePath, site) {
  let text = fs.readFileSync(filePath, "utf8");
  const eol = eolOf(text);

  if (typeof site.email === "string") {
    if (/export const EMAIL = "[^"]*";/.test(text)) {
      text = text.replace(/export const EMAIL = "[^"]*";/, `export const EMAIL = "${site.email}";`);
    } else {
      text = text.replace(
        /(export const WHATSAPP_LINK = "[^"]*";\r?\n)/,
        `$1export const EMAIL = "${site.email}";${eol}`,
      );
    }
  }

  text = text.replace(
    /\r?\n?export type SocialLink = \{[\s\S]*?\};\r?\n\r?\nexport const SOCIAL_LINKS: SocialLink\[] = \[[\s\S]*?\];\r?\n?/m,
    eol,
  );

  const block = socialConstants(site.socialLinks, eol);
  const marker = `${eol}export const GOOGLE_REVIEW_LINK`;
  const idx = text.indexOf(marker);

  if (idx >= 0) {
    text = text.slice(0, idx).trimEnd() + eol + eol + block + eol + text.slice(idx);
  } else {
    text = text.trimEnd() + eol + eol + block + eol;
  }

  return text;
}

function patchFooter(filePath) {
  let text = fs.readFileSync(filePath, "utf8");
  const eol = eolOf(text);

  text = addToNamedImport(text, "../lib/constants", ["SOCIAL_LINKS"]);
  text = addToNamedImport(text, "lucide-react", ["Instagram", "Facebook", "Linkedin", "ExternalLink"]);

  if (!text.includes("const socialIcons =")) {
    const helper = [
      "const socialIcons = {",
      "  Instagram,",
      "  Facebook,",
      "  LinkedIn: Linkedin,",
      "  Web: ExternalLink,",
      "} as const;",
    ].join(eol);

    text = text.replace(/\r?\nexport function Footer\(\)/, `${eol}${eol}${helper}${eol}${eol}export function Footer()`);
  }

  if (!text.includes("SOCIAL_LINKS.length > 0")) {
    const socialBlock =
      [
        '              {SOCIAL_LINKS.length > 0 && (',
        '                <li className="pt-2">',
        '                  <div className="flex flex-wrap items-center gap-3">',
        "                    {SOCIAL_LINKS.map((link) => {",
        "                      const Icon = socialIcons[link.label] ?? ExternalLink;",
        "",
        "                      return (",
        "                        <a",
        "                          key={link.href}",
        "                          href={link.href}",
        '                          target="_blank"',
        '                          rel="noopener noreferrer"',
        "                          aria-label={link.label}",
        "                          title={link.label}",
        '                          className="w-9 h-9 rounded-full border border-border-subtle bg-paper flex items-center justify-center text-muted hover:text-gold hover:border-gold transition-colors"',
        "                        >",
        '                          <Icon className="w-4 h-4" />',
        "                        </a>",
        "                      );",
        "                    })}",
        "                  </div>",
        "                </li>",
        "              )}",
      ].join(eol) + eol;

    const start = text.indexOf("WHATSAPP_NUMBER");
    const close = text.indexOf("            </ul>", start);

    if (start < 0 || close < 0) {
      throw new Error("Could not find contact list in Footer.tsx");
    }

    text = text.slice(0, close) + socialBlock + text.slice(close);
  }

  return text;
}

const results = [];

for (const site of data.sites) {
  const projectDir = path.join(workspaceRoot, site.slug);
  const constantsPath = path.join(projectDir, "src", "lib", "constants.ts");
  const footerPath = path.join(projectDir, "src", "components", "Footer.tsx");

  if (!fs.existsSync(constantsPath) || !fs.existsSync(footerPath)) {
    results.push({ slug: site.slug, status: "missing-files" });
    continue;
  }

  const nextConstants = patchConstants(constantsPath, site);
  const nextFooter = patchFooter(footerPath);

  if (!dryRun) {
    fs.writeFileSync(constantsPath, nextConstants, "utf8");
    fs.writeFileSync(footerPath, nextFooter, "utf8");
  }

  results.push({
    slug: site.slug,
    status: dryRun ? "checked" : "updated",
    email: site.email,
    socials: site.socialLinks.length,
  });
}

console.table(results);

const missing = results.filter((result) => result.status === "missing-files");
if (missing.length > 0) {
  process.exitCode = 1;
}
