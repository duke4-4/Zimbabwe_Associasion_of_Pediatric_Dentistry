# Site images

All 29 active images are stored directly in `public/images`.

- React image URLs and route artwork are defined in `src/app/images.ts`.
- `src/app/DentalScatter.tsx` uses the dental icons in `dental-band.svg`; their size and placement are set in `src/index.css`.
- Favicon and social-sharing paths are set in `.figma/make/site.json`, `src/seo.json`, and `scripts/build-seo.mjs`.
- Use a descriptive filename and update the relevant reference when replacing an image. Remove the previous file if it is no longer used.

Images here are copied once into `dist/images` during the production build. Do not put source-photo archives or review screenshots in `public`.

## Credits and provenance

The ZAPD logos, doctor portraits and dental photographs were supplied with the project. The six `client-*.jpg` photographs were extracted from the client's website-change document. The SVG hero illustrations and dental icons were created for this site.

Complementary stock photographs:

- `children-together.jpg`: C?Pho Ngondo R.Rouge, [smiling children](https://www.pexels.com/photo/joyful-portrait-of-smiling-african-children-11276483/), Pexels license.
- `smiling-boy.jpg`: Adera Abdoulaye Dolo, [smiling boy outdoors](https://www.pexels.com/photo/a-cute-little-boy-smiling-15538193/), Pexels license.
- `join-zapd-pointing-child.jpg`: Jessica Pope, [child pointing against a yellow background](https://www.pexels.com/photo/kid-pointing-his-finger-13198541/), free under the Pexels license. Downloaded at 1600 x 2286 pixels for the About page's Join ZAPD section; displayed mirrored with CSS so the child points to the viewer's right.

Stock photographs are illustrative and do not identify ZAPD members or actual ZAPD events. The original source notes are retained alongside this document for reference.
