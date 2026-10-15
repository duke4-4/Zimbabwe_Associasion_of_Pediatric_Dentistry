const topics = [
  { title: "For Parents", text: "Accessible information about children’s oral health." },
  { title: "For Professionals", text: "Clinical updates, educational articles and professional perspectives." },
  { title: "Association News", text: "ZAPD announcements, initiatives, membership news and activities." },
  { title: "Community & Oral Health", text: "Information about activities and initiatives aimed at improving children’s oral health in Zimbabwe." },
]

import HeroArtwork from "./HeroArtwork"

export default function Blog() {
  return (
    <>
    <section className="art-hero relative isolate overflow-hidden bg-[#062f4a]">
      <HeroArtwork />
      <div className="hero-copy relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <p className="eyebrow">Blog & News</p>
      <h1 className="section-title mt-4">Resources</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4d6e82]">Resources will be added here as they become available.</p>
      </div>
    </section>
    <section aria-label="Resource topics" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
      <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
        {topics.map((topic) => (
          <article key={topic.title} className="border-t border-[#064b7b]/20 pt-6">
            <h2 className="font-display text-2xl text-[#064b7b]">{topic.title}</h2>
            <p className="mt-3 max-w-lg leading-7 text-[#4d6e82]">{topic.text}</p>
          </article>
        ))}
      </div>
    </section>
    </>
  )
}
