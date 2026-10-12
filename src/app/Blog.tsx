import { Link } from "react-router"
import HeroArtwork from "./HeroArtwork"

const topics = [
  {
    title: "For Parents",
    text: "Accessible information about children’s oral health.",
  },
  {
    title: "For Professionals",
    text: "Clinical updates, educational articles and professional perspectives.",
  },
  {
    title: "Association News",
    text: "ZAPD announcements, initiatives, membership news and activities.",
  },
  {
    title: "Community & Oral Health",
    text: "Information about activities and initiatives aimed at improving children’s oral health in Zimbabwe.",
  },
]

export default function Blog() {
  return (
    <>
      <section className="art-hero relative isolate overflow-hidden bg-[#062f4a]">
        <HeroArtwork />
        <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <p className="eyebrow !text-[#ffed00]">Blog & News</p>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6 border-b border-white/20 pb-8">
            <h1 className="font-display text-4xl tracking-tight text-white sm:text-6xl">
              The ZAPD Journal.
            </h1>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#ffed00] px-4 py-2 text-sm font-bold text-[#064b7b]">
              <span
                className="size-2 rounded-full bg-[#00733f]"
                aria-hidden="true"
              />
              Coming soon
            </span>
          </div>
          <div className="mt-10 lg:max-w-2xl">
            <div className="hero-copy">
              <h2 className="max-w-xl font-display text-3xl leading-tight text-[#064b7b] sm:text-4xl">
                Educational and professional content.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#4d6e82]">
                Accessible information about children’s oral health. Clinical
                updates, educational articles and professional perspectives.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/parents" className="primary-button">
                  Explore parent resources
                </Link>
                <Link to="/events" className="secondary-button">
                  View events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20"
        aria-labelledby="journal-topics"
      >
        <p className="eyebrow">Blog & News</p>
        <h2
          id="journal-topics"
          className="mt-4 font-display text-3xl text-[#064b7b] sm:text-4xl"
        >
          The ZAPD Journal
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic) => (
            <div
              key={topic.title}
              className="border-t-2 border-[#00733f]/30 pt-5"
            >
              <h3 className="font-display text-xl text-[#064b7b]">
                {topic.title}
              </h3>
              <p className="mt-3 leading-7 text-[#5c7889]">{topic.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
