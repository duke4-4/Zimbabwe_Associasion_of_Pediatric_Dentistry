const topics = [
  { title: "For parents", text: "Practical guides to children’s oral health and everyday dental care." },
  { title: "For professionals", text: "Clinical reading, educational materials and professional updates." },
  { title: "Association news", text: "Updates on ZAPD activities, membership and events." },
  { title: "Community oral health", text: "Materials for schools, families and community programmes." },
]

export default function Blog() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
      <p className="eyebrow">Blog & News</p>
      <h1 className="section-title mt-4">Resources</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4d6e82]">Resources will be added here as they become available.</p>
      <div className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2">
        {topics.map((topic) => (
          <article key={topic.title} className="border-t border-[#064b7b]/20 pt-6">
            <h2 className="font-display text-2xl text-[#064b7b]">{topic.title}</h2>
            <p className="mt-3 max-w-lg leading-7 text-[#4d6e82]">{topic.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
