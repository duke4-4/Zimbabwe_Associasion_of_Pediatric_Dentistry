import { useEffect } from "react";
import { useLocation } from "react-router";
import seo from "../seo.json";

export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname.replace(/\/+$/, "") || "/";
    const page = seo.pages[path as keyof typeof seo.pages];
    const title = page?.title ?? "Page not found | ZAPD";
    const description = page?.description ?? "This page could not be found. Explore the Zimbabwe Association of Paediatric Dentistry website.";
    const url = seo.siteUrl + path;
    document.title = title;
    const updateMeta = (key: string, value: string, attribute = "name") => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.append(element);
      }
      element.content = value;
    };
    updateMeta("description", description);
    updateMeta("robots", page ? "index, follow, max-image-preview:large" : "noindex, follow");
    updateMeta("og:title", title, "property");
    updateMeta("og:description", description, "property");
    updateMeta("og:url", url, "property");
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!page) {
      canonical?.remove();
    } else {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.append(canonical);
      }
      canonical.href = url;
    }
  }, [pathname]);
  return null;
}
