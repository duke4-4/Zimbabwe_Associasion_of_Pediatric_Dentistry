import { readFile, writeFile, mkdir } from "node:fs/promises";

const seo = JSON.parse(await readFile(new URL("../src/seo.json", import.meta.url), "utf8"));
const dist = new URL("../dist/", import.meta.url);
const shell = await readFile(new URL("index.html", dist), "utf8");
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const image = seo.siteUrl + seo.image;
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${seo.siteUrl}/#organization`, name: seo.siteName, alternateName: "ZAPD", url: seo.siteUrl + "/", logo: seo.siteUrl + "/brand-assets/zapd-favicon-512.png", email: "info@zapd.org.zw", telephone: "+263772351666", address: { "@type": "PostalAddress", streetAddress: "47 Churchill Ave, Alexandra Park", addressLocality: "Harare", addressCountry: "ZW" }, sameAs: ["https://www.instagram.com/zim.paeds.dentistryassociation/", "https://www.facebook.com/ZAPD"] },
    { "@type": "WebSite", "@id": `${seo.siteUrl}/#website`, name: seo.siteName, alternateName: "ZAPD", url: seo.siteUrl + "/", inLanguage: "en-ZW", publisher: { "@id": `${seo.siteUrl}/#organization` } }
  ]
};

for (const [route, page] of Object.entries(seo.pages)) {
  const canonical = seo.siteUrl + route;
  // Replace the scaffold's metadata so crawlers receive one consistent set before JavaScript runs.
  let html = shell.replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta\s+(?:name|property)="(?:description|robots|og:[^"]+|twitter:[^"]+)"[^>]*>/g, "");
  const metadata = [
    `<title>${escape(page.title)}</title>`,
    `<meta name="description" content="${escape(page.description)}">`,
    '<meta name="robots" content="index, follow, max-image-preview:large">',
    `<link rel="canonical" href="${canonical}">`,
    '<meta property="og:type" content="website">',
    '<meta property="og:locale" content="en_ZW">',
    `<meta property="og:site_name" content="${escape(seo.siteName)}">`,
    `<meta property="og:title" content="${escape(page.title)}">`,
    `<meta property="og:description" content="${escape(page.description)}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:image:alt" content="${escape(seo.siteName)} — ZAPD">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${escape(page.title)}">`,
    `<meta name="twitter:description" content="${escape(page.description)}">`,
    `<meta name="twitter:image" content="${image}">`,
    `<meta name="twitter:image:alt" content="${escape(seo.siteName)} — ZAPD">`,
    `<script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>`
  ].join("\n    ");
  html = html.replace("</head>", `    ${metadata}\n  </head>`);
  const directory = new URL(route === "/" ? "./" : `${route.slice(1)}/`, dist);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL("index.html", directory), html);
}
await writeFile(new URL("sitemap.xml", dist), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(seo.pages).map((route) => `  <url><loc>${seo.siteUrl}${route}</loc></url>`).join("\n")}\n</urlset>\n`);
await writeFile(new URL("robots.txt", dist), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${seo.siteUrl}/sitemap.xml\n`);
console.log(`SEO: generated metadata for ${Object.keys(seo.pages).length} pages, sitemap.xml and robots.txt.`);
