// All site images live in public/images. Respect Vite preview base paths.
const image = (name: string) => `${import.meta.env.BASE_URL}images/${name}`

export const images = {
  logo: image("zapd-logo.png"),
  squareLogo: image("zapd-logo-square.png"),
  drSheetal: image("dr-sheetal-bhaskar.jpg"),
  drViki: image("dr-viki-portrait.jpeg"),
  drChipo: image("dr-chipo-farirayi.jpg"),
  drMadziwa: image("dr-rumbidzo-madziwa-manana.jpg"),
  drNyoni: image("dr-nyoni-updated.jpeg"),
  drChingwena: image("dr-chingwena.png"),
  dentalToolsPink: image("dental-tools-pink.jpg"),
  happyChild: image("happy-child.jpeg"),
  joinZapdChild: image("children-smiling-together.jpeg"),
  childrenTogether: image("children-together.jpg"),
  aboutZapd: image("client-who-we-are.jpg"),
  healthySmiles: image("client-healthy-smiles.jpg"),
  contactPhoto: image("client-contact.jpg"),
  childrenBrushing: image("client-children-brushing.jpg"),
  familyBrushing: image("client-family-brushing.jpg"),
  dentalVisit: image("client-dental-visit.jpg"),
  smilingBoy: image("smiling-boy.jpg"),
}

export const heroArtwork: Record<string, string> = {
  "/blog": image("hero-blog.svg"),
  "/about": image("hero-about.svg"),
  "/parents": image("hero-parents.svg"),
  "/membership": image("hero-membership.svg"),
  "/join": image("hero-join.svg"),
  "/directory": image("hero-directory.svg"),
  "/events": image("hero-events.svg"),
  "/contact": image("hero-contact.svg"),
}
