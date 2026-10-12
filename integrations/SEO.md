# Search metadata

Page titles, descriptions and the public canonical domain are maintained in `src/seo.json`.

`npm run build` creates HTML with distinct metadata for all eight pages, plus `dist/sitemap.xml` and `dist/robots.txt`. These tags are available before JavaScript runs. Client-side navigation updates the title, description, sharing tags and canonical link as visitors change pages.

The public domain is currently `https://zapdnew.vercel.app`. If you connect a custom domain, change `siteUrl` in `src/seo.json` to that HTTPS origin without a trailing slash and rebuild. Redirect the old domain to the new one in your hosting settings.

After deployment, verify the domain in Google Search Console and submit `/sitemap.xml`. The previous global `noindex` and crawl restriction have been removed. Metadata helps search engines understand pages but does not guarantee a particular ranking.

References:
- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/appearance/snippet
