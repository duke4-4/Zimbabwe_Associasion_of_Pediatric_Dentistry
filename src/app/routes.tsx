import { FormEvent, ReactNode, useEffect, useRef, useState } from "react"

import {
  createBrowserRouter,
  Link,
  NavLink,
  Outlet,
  useLocation,
} from "react-router"

import PageMetadata from "./PageMetadata"

import EventListing from "./EventListing"

import Blog from "./Blog"
import ParentQuestions from "./ParentQuestions"

import BrandNavLink from "./BrandNavLink"
import HeroArtwork from "./HeroArtwork"
import DentalScatter from "./DentalScatter"
import { images } from "./images"

const {
  logo,
  squareLogo,
  drSheetal,
  drViki,
  drChipo,
  drMadziwa,
  drNyoni,
  drChingwena,
  dentalToolsPink,
  happyChild,
  joinZapdChild,
  childrenTogether,
  aboutZapd,
  healthySmiles,
  contactPhoto,
  childrenBrushing,
  familyBrushing,
  dentalVisit,
  smilingBoy,
} = images

type IconName = "arrow" | "heart" | "book" | "people" | "search" | "pin" | "phone" | "mail" | "menu" | "close" | "check" | "instagram" | "facebook"

function Icon({
  name,

  className = "size-5",
}: {
  name: IconName

  className?: string
}) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,

    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),

    book: (
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13Zm0 0V6.5M8 8h8M8 12h6" />
    ),

    people: (
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.9m0-12a4 4 0 0 1 0 7.8" />
    ),

    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),

    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),

    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
    ),

    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),

    menu: <path d="M4 7h16M4 12h16M4 17h16" />,

    close: <path d="m6 6 12 12M18 6 6 18" />,

    check: <path d="m5 12 4 4L19 6" />,

    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),

    facebook: (
      <path d="M14 8h3V4h-3a5 5 0 0 0-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9a1 1 0 0 1 1-1Z" />
    ),
  }

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

const nav = [
  ["About ZAPD", "/about"],

  ["Parents & Caregivers", "/parents"],

  ["Membership", "/membership"],

  ["Events", "/events"],

  ["Blog & News", "/blog"],

  ["Find a dentist", "/directory"],

  ["Contact us", "/contact"],
]

function BrandLogo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" aria-label="ZAPD home">
      <img
        decoding="async"
        loading="eager"
        fetchPriority="high"
        src={logo}
        alt="Zimbabwe Association of Paediatric Dentistry"
        className={`h-14 w-auto object-contain sm:h-16 ${
          light ? "brightness-0 invert" : ""
        }`}
      />
    </Link>
  )
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() =>
        document

          .getElementById(decodeURIComponent(hash.slice(1)))

          ?.scrollIntoView({ block: "start" }),
      )

      return
    }

    window.scrollTo({ top: 0, behavior: "auto" })
  }, [pathname, hash])

  return null
}

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  const menuButton = useRef<HTMLButtonElement>(null)

  const { pathname } = useLocation()

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    if (!menuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)

        menuButton.current?.focus()
      }
    }

    const desktop = window.matchMedia("(min-width: 1280px)")

    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }

    document.addEventListener("keydown", closeOnEscape)

    desktop.addEventListener("change", closeOnDesktop)

    return () => {
      document.removeEventListener("keydown", closeOnEscape)

      desktop.removeEventListener("change", closeOnDesktop)
    }
  }, [menuOpen])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#e6e9e8] text-[#123f60]">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <ScrollToTop />
      <PageMetadata />
      <header className="sticky top-0 z-50 border-b border-[#064b7b]/10 bg-[#e6e9e8]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <BrandLogo />
          <nav
            className="hidden items-center gap-1 xl:flex"
            aria-label="Main navigation"
          >
            {nav.map(([label, path]) => (
              <BrandNavLink key={path} to={path} label={label} />
            ))}
          </nav>
          <NavLink
            to="/join"
            className={({ isActive }) =>
              `hidden rounded-xl px-5 py-3 text-sm font-bold transition xl:inline-flex ${
                isActive
                  ? "bg-[#ffed00] text-[#064b7b] ring-2 ring-[#00733f]"
                  : "bg-[#064b7b] text-white hover:bg-[#00733f]"
              }`
            }
          >
            Join ZAPD
          </NavLink>
          <button
            ref={menuButton}
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-[#dde3e3] xl:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="max-h-[calc(100dvh-90px)] overflow-y-auto border-t border-[#064b7b]/10 bg-[#e6e9e8] px-5 py-5 xl:hidden"
          >
            <div className="flex flex-col gap-1">
              {nav.map(([label, path]) => (
                <BrandNavLink
                  key={path}
                  to={path}
                  label={label}
                  mobile
                  onNavigate={() => setMenuOpen(false)}
                />
              ))}
              <NavLink
                to="/join"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `mt-2 rounded-xl px-5 py-3 text-center font-bold ${
                    isActive
                      ? "bg-[#ffed00] text-[#064b7b] ring-2 ring-[#00733f]"
                      : "bg-[#064b7b] text-white"
                  }`
                }
              >
                Join ZAPD
              </NavLink>
            </div>
          </nav>
        )}
      </header>
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function Footer() {
  return (
    <footer className="brand-footer relative overflow-hidden bg-[#062f4a] text-white">
      <div className="brand-footer-colours" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="relative mb-14 flex flex-col items-start justify-between gap-7 overflow-hidden rounded-3xl bg-[#006b3b] p-7 sm:p-10 lg:flex-row lg:items-center">
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffed00]">
              Join ZAPD
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl sm:text-4xl">
              Become part of a professional community committed to improving
              children’s oral health.
            </h2>
          </div>
          <Link
            to="/join"
            className="relative shrink-0 rounded-xl bg-[#e31e24] px-7 py-4 font-bold text-white transition hover:bg-[#bd171c]"
          >
            Join ZAPD
          </Link>
        </div>
        <div className="relative grid gap-12   pb-14 lg:grid-cols-[1.25fr_0.75fr_0.75fr]">
          <div>
            <div className="inline-flex rounded-2xl bg-[#eef0ef] p-4">
              <BrandLogo />
            </div>
            <p className="mt-5 max-w-md leading-7 text-white/65">
              Promoting healthy smiles and positive dental experiences for
              Zimbabwe’s children.
            </p>
            <div className="mt-7 flex gap-3">
              <a
                href="https://www.instagram.com/zim.paeds.dentistryassociation/"
                target="_blank"
                rel="noreferrer"
                aria-label="ZAPD on Instagram"
                className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-[#ffed00] hover:bg-[#ffed00] hover:text-[#064b7b]"
              >
                <Icon name="instagram" />
              </a>
              <a
                href="https://www.facebook.com/ZAPD"
                target="_blank"
                rel="noreferrer"
                aria-label="ZAPD on Facebook"
                className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-[#ffed00] hover:bg-[#ffed00] hover:text-[#064b7b]"
              >
                <Icon name="facebook" />
              </a>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffed00]">
              Explore
            </p>
            <div className="mt-5 grid gap-3 text-sm text-white/70">
              {nav.map(([label, path]) => (
                <Link
                  key={path}
                  to={path}
                  className="transition-colors hover:text-white hover:underline underline-offset-4"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffed00]">
              Contact
            </p>
            <div className="mt-5 grid gap-4 text-sm text-white/70">
              <a
                href="mailto:info@zapd.org.zw"
                className="flex gap-3 hover:text-white"
              >
                <Icon name="mail" className="size-4 shrink-0" />
                info@zapd.org.zw
              </a>
              <a
                href="tel:+263773785860"
                className="flex gap-3 hover:text-white"
              >
                <Icon name="phone" className="size-4 shrink-0" />
                +263 773 785 860
              </a>
              <p className="flex gap-3">
                <Icon name="pin" className="size-4 shrink-0" />
                47 Churchill Ave, Alexandra Park, Harare
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-7 text-xs text-white/45 sm:flex-row">
          <p>© 2026 Zimbabwe Association of Paediatric Dentistry</p>
        </div>
      </div>
    </footer>
  )
}

const focusAreas = [
  {
    icon: "heart" as IconName,

    title: "Prevention",

    text: "Promoting good oral-health practices and early preventive care to give every child the best possible start.",
  },

  {
    icon: "book" as IconName,

    title: "Education",

    text: "Providing parents, caregivers and dental professionals with accessible, evidence-based information about children’s oral health.",
  },

  {
    icon: "book" as IconName,

    title: "Professional Development",

    text: "Creating opportunities for dental professionals to develop their knowledge and skills in the care of children.",
  },

  {
    icon: "people" as IconName,

    title: "Collaboration",

    text: "Building a community of dental professionals who can learn from one another and work together to improve children’s oral health in Zimbabwe.",
  },
]

function PageHero({
  eyebrow,

  title,

  text,
}: {
  eyebrow: string

  title: string

  text: string
}) {
  return (
    <section className="art-hero relative isolate overflow-hidden bg-[#062f4a]">
      <HeroArtwork />
      <div className="hero-copy relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight tracking-tight text-[#064b7b] sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4d6e82]">
          {text}
        </p>
      </div>
    </section>
  )
}

function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState("")

  function requestNewsletterSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const subject = encodeURIComponent("ZAPD newsletter subscription")

    const body = encodeURIComponent(
      `Please add ${newsletterEmail} to the ZAPD newsletter mailing list.`,
    )

    window.location.href = `mailto:info@zapd.org.zw?subject=${subject}&body=${body}`
  }

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#dde3e3]">
        <div className="mx-auto grid lg:min-h-[720px] max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.06fr_0.94fr] lg:px-8 lg:py-20">
          <div className="relative z-10 max-w-2xl">
            <p className="eyebrow mb-5">Zimbabwe Association of Paediatric Dentistry</p>
            <h1 className="font-display text-4xl leading-[1.08] tracking-tight text-[#064b7b] sm:text-6xl">Caring for Zimbabwe’s Children,<br /><em className="font-normal text-[#e31e24]">One Smile at a Time</em></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#4d6e82]">ZAPD brings dental professionals together to promote children’s oral health and wellbeing in Zimbabwe through education, professional development and collaboration.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/about" className="primary-button">Learn More <Icon name="arrow" /></Link>
              <Link to="/join" className="secondary-button">Join ZAPD</Link>
            </div>

          </div>
          <div className="relative mx-auto w-full max-w-xl lg:mr-0">
            <div aria-hidden="true" className="absolute -right-6 -top-6 size-40 rounded-full bg-[#ffed00] sm:-right-10 sm:-top-10 sm:size-52" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[45%_45%_32px_32px] shadow-2xl shadow-[#064b7b]/15"><img decoding="async" loading="eager" fetchPriority="high" src={healthySmiles} alt="Three children smiling together, showing their teeth" className="size-full object-cover object-top" /></div>
          </div>
        </div>
      </section>

      <section className="about-feature">
          <img decoding="async" loading="lazy" src={aboutZapd} alt="A smiling child holding a toothbrush" className="about-feature-image" />
          <div className="about-feature-copy">
            <p className="eyebrow !text-[#ffed00]">About ZAPD</p>
            <h2 className="mt-5 font-display text-4xl leading-tight tracking-tight sm:text-5xl">Who We Are</h2>
            <p className="mt-6 text-lg leading-8 text-white/90">
              ZAPD seeks to support children, families and dental professionals through education, collaboration and the promotion of quality paediatric dental care.
            </p>
            <Link to="/about" className="mt-8 inline-flex min-h-12 items-center gap-3 border-b border-[#ffed00] pb-2 font-bold text-white transition-colors hover:text-[#ffed00]">Who we are <Icon name="arrow" /></Link>
          </div>
      </section>
      <section className="dental-accent dental-accent-tools">
        <DentalScatter />
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><FocusGrid /></div>
      </section>

      <section className="bg-[#064b7b] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 lg:grid-cols-2 lg:px-8">
          <div className="relative min-h-[360px] sm:min-h-[500px] overflow-hidden rounded-3xl">
            <img
              decoding="async"
              loading="lazy"
              src={healthySmiles}
              alt="Three children smiling together"
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[calc(100%-3rem)] bg-[#ffed00] p-5 text-[#064b7b]">
              <p className="text-xs font-bold uppercase tracking-widest">
                For Parents & Caregivers
              </p>
              <strong className="mt-1 block font-display text-2xl">
                When should my child first see a dentist?
              </strong>
            </div>
          </div>
          <div>
            <p className="eyebrow !text-[#ffed00]">Parents & caregivers</p>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              Your Child’s Smile Starts Early
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/70">
              Practical information to help you understand and care for your
              child’s oral health.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "First dental visits",

                "Baby teeth matter",

                "Brushing & fluoride",

                "Preventing decay",
              ].map((topic) => (
                <div
                  key={topic}
                  className="rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold"
                >
                  {topic}
                </div>
              ))}
            </div>
            <Link
              to="/parents"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-4 font-bold text-[#064b7b]"
            >
              Explore parent resources <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="dental-accent section-mist oral-health-section">
        <DentalScatter />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <p className="eyebrow">Why children’s oral health matters</p>
          <h2 className="section-title mt-4">
            Good oral-health habits begin early.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5c7889]">
            A child’s oral health is an important part of their overall health,
            development and quality of life. Good oral-health habits begin
            early. Regular dental care, prevention and timely management of
            dental problems can help children grow with healthy smiles and
            establish positive attitudes towards oral health that last into
            adulthood.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              "Prevention",

              "Education",

              "Collaboration",
            ].map((item, index) => (
              <li key={item} className="rounded-2xl border border-[#064b7b]/25 bg-[#dde3e3] p-5">
                <span className="font-display text-2xl text-[#e31e24]">0{index + 1}</span>
                <p className="mt-3 font-bold text-[#064b7b]">{item}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-full border-4 border-[#ffed00]">
          <img
            decoding="async"
            loading="lazy"
            src={happyChild}
            alt="A smiling child with colourful painted hands"
            className="size-full object-cover"
          />
        </div>
              </div>
      </section>

      <section className="bg-[#dce2e1]">
        <div className="mx-auto grid max-w-7xl overflow-hidden lg:grid-cols-2">
          <div className="px-5 py-20 lg:px-8 lg:py-24">
            <p className="eyebrow">Membership</p>
            <h2 className="section-title mt-4">Join ZAPD</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#5c7889]">
              Become part of a professional community committed to improving
              children’s oral health.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Professional networking",

                "CPD opportunities",

                "Paediatric dentistry resources",
              ].map((benefit) => (
                <span
                  key={benefit}
                  className="rounded-full border border-[#064b7b]/15 bg-white px-4 py-2 text-sm font-semibold"
                >
                  {benefit}
                </span>
              ))}
            </div>
            <Link to="/membership" className="primary-button mt-9">
              Explore membership <Icon name="arrow" />
            </Link>
          </div>
          <img
            decoding="async"
            loading="lazy"
            src={dentalVisit}
            alt="A dentist caring for a child seated with a parent"
            className="aspect-[3/2] w-full self-center object-contain"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Find a paediatric dentist</p>
            <h2 className="section-title mt-4">ZAPD Member Directory</h2>
          </div>
          <Link
            to="/directory"
            className="inline-flex items-center gap-3 font-bold text-[#e31e24]"
          >
            View full directory <Icon name="arrow" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {members.slice(0, 3).map((member) => (
            <Link
              key={member.name}
              to="/directory"
              className="content-card group overflow-hidden rounded-3xl bg-[#eef0ef]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#dde3e3]">
                <img
                  decoding="async"
                  loading="lazy"
                  src={member.image}
                  alt={member.name}
                  className={`size-full transition duration-500 group-hover:opacity-95 ${member.imageClass ?? "object-cover object-top"}`}
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#e31e24]">
                  {member.role ?? "ZAPD Member"}
                </p>
                <h3 className="mt-2 font-display text-2xl text-[#064b7b]">
                  {member.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">ZAPD events</p>
            <h2 className="section-title mt-4">Upcoming events</h2>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 font-bold text-[#bc2027]"
          >
            View events <Icon name="arrow" />
          </Link>
        </div>
        <EventListing preview />
      </section>

      <section className="dental-accent dental-accent-tools bg-[#dce2e1]">
        <DentalScatter />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="eyebrow">Stay informed</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-[#064b7b] sm:text-5xl">
              Association news and updates
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#5c7889]">
              Newsletter/email subscription
            </p>
          </div>
          <form
            onSubmit={requestNewsletterSignup}
            className="content-card rounded-3xl bg-[#eef0ef] p-6 shadow-sm sm:p-8"
          >
            <label
              htmlFor="home-newsletter-email"
              className="text-sm font-bold text-[#064b7b]"
            >
              Email address
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id="home-newsletter-email"
                type="email"
                required
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-full border border-[#064b7b]/15 bg-[#e6e9e8] px-5 py-4 text-[#123f60] outline-none transition focus:border-[#064b7b] focus:ring-4 focus:ring-[#064b7b]/10"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#e31e24] px-7 py-4 font-bold text-white transition hover:bg-[#bd171c]"
              >
                Subscribe <Icon name="arrow" />
              </button>
            </div>
            <p className="mt-4 text-xs leading-5 text-[#6f8a9b]">
              This opens an email draft to info@zapd.org.zw. Send the draft to
              request a subscription.
            </p>
          </form>
        </div>
      </section>

      <section className="home-contact">
        <div className="home-contact-layout mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="home-contact-image contact-photo-frame">
            <img src={contactPhoto} alt="A woman speaking on the phone" loading="lazy" decoding="async" />
          </div>
          <div className="home-contact-copy">
            <p className="eyebrow">Contact ZAPD</p>
            <h2 className="section-title mt-4">Get in Touch</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#4d6e82]">We would be pleased to hear from you.</p>
            <div className="home-contact-details">
              <a href="mailto:info@zapd.org.zw" className="home-contact-link">
                <Icon name="mail" /><span><span className="home-contact-label">Email</span><span>info@zapd.org.zw</span></span><Icon name="arrow" />
              </a>
              <a href="tel:+263773785860" className="home-contact-link">
                <Icon name="phone" /><span><span className="home-contact-label">Phone</span><span>+263 773 785 860</span></span><Icon name="arrow" />
              </a>
            </div>
            <p className="mt-6 flex items-start gap-3 leading-7 text-[#4d6e82]"><Icon name="pin" className="mt-1 size-5 shrink-0" />47 Churchill Ave, Alexandra Park, Harare</p>
            <Link to="/contact" className="primary-button mt-8">Send an enquiry <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>
    </>
  )
}

function FocusGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {focusAreas.map((area) => (
        <article key={area.title} className="content-card rounded-3xl bg-[#eef0ef] p-6 lg:p-7">
          <div className="flex items-center justify-between">
            <span className="grid size-12 place-items-center rounded-full bg-[#00733f]/10 text-[#00733f]">
              <Icon name={area.icon} />
            </span>

          </div>
          <h3 className="mt-8 font-display text-2xl text-[#064b7b]">
            {area.title}
          </h3>
          <p className="mt-3 leading-7 text-[#5c7889]">{area.text}</p>
        </article>
      ))}
    </div>
  )
}

function About() {
  const objectives = [
    "Promote the importance of oral health from infancy through adolescence.",

    "Encourage prevention and early intervention in children’s oral healthcare.",

    "Promote evidence-based approaches to paediatric dental care.",

    "Provide opportunities for continuing professional development.",

    "Facilitate the sharing of knowledge and clinical experience among dental professionals.",

    "Support education of parents, caregivers and communities about children’s oral health.",

    "Encourage collaboration between dental professionals and other healthcare professionals involved in the care of children.",

    "Support initiatives that contribute to improved oral-health outcomes for children in Zimbabwe.",

    "Create a professional network for individuals with an interest in paediatric dentistry.",
  ]

  const values = [
    "Child-centred care",

    "Prevention",

    "Excellence",

    "Collaboration",

    "Integrity",

    "Inclusivity",
  ]

  return (
    <>
      <PageHero
        eyebrow="About ZAPD"
        title="Who We Are"
        text="The Zimbabwe Association of Paediatric Dentistry (ZAPD) is a professional association dedicated to improving the oral health of children in Zimbabwe."
      />
      <section className="dental-accent">
        <DentalScatter />
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow">Who we are</p>
            <h2 className="section-title mt-4">Children’s Oral Health</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-[#5c7889]">
            <p>
              The Zimbabwe Association of Paediatric Dentistry (ZAPD) is a
              professional association dedicated to improving the oral health of
              children in Zimbabwe.
            </p>
            <p>
              The Association provides a platform for dental professionals with
              an interest in paediatric dentistry to connect, share knowledge,
              support professional development and contribute to improved
              oral-health outcomes for children.
            </p>
            <p>
              We recognise that caring for children requires an approach that
              considers not only their teeth, but also their growth,
              development, emotional wellbeing, family environment and
              individual needs.
            </p>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <article className="relative mt-16 min-h-[440px] overflow-hidden rounded-3xl bg-[#064b7b] p-9 text-white">
            <img
              decoding="async"
              loading="lazy"
              src={smilingBoy}
              alt=""
              className="absolute inset-0 size-full object-cover object-[center_25%] opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#064b7b] via-[#064b7b]/75 to-[#064b7b]/25" />
            <div className="relative flex h-full flex-col justify-end">
              <p className="eyebrow !text-[#ffed00]">Our vision</p>
              <h2 className="mt-5 font-display text-3xl">
                A Zimbabwe where every child has the opportunity to grow with
                good oral health and a positive relationship with dental care.
              </h2>
            </div>
          </article>
          <article className="mt-16 overflow-hidden rounded-3xl bg-[#dde3e3]">
            <img
              decoding="async"
              loading="lazy"
              src={familyBrushing}
              alt="A mother helping her child brush their teeth"
              className="h-64 w-full object-cover object-[center_35%]"
            />
            <div className="p-9">
              <p className="eyebrow">Our mission</p>
              <h2 className="mt-5 font-display text-3xl text-[#064b7b]">
                To promote excellence in the prevention, education and provision
                of paediatric dental care through professional development,
                collaboration and public education.
              </h2>
            </div>
          </article>
        </div>
              </div>
      </section>
      <section className="objectives-section" aria-labelledby="objectives-title">
        <div className="objectives-layout mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="objectives-overview">
            <p className="eyebrow">Objectives</p>
            <h2 id="objectives-title" className="section-title mt-4">ZAPD aims to:</h2>
            <figure className="objectives-photo">
              <img src={dentalVisit} alt="A dentist examining a child seated with a parent" loading="lazy" decoding="async" />
              <figcaption>Quality Paediatric Dental Care</figcaption>
            </figure>
            <div className="objectives-values">
              <h3 className="font-display text-xl text-[#064b7b]">Our values</h3>
              <ul>{values.map((value) => <li key={value}>{value}</li>)}</ul>
            </div>
          </div>
          <ul className="objectives-list">
            {objectives.map((objective) => <li key={objective}>{objective}</li>)}
          </ul>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="relative grid overflow-hidden rounded-2xl bg-[#064b7b] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative flex max-w-3xl flex-col items-start justify-center p-8 text-white sm:p-12">
            <p className="eyebrow !text-[#ffed00]">Become a member</p>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              Join ZAPD
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
              Membership of the Zimbabwe Association of Paediatric Dentistry
              provides an opportunity to connect with colleagues who share an
              interest in children’s oral health.
            </p>
            <Link
              to="/membership"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#e31e24] px-7 py-4 font-bold text-white transition hover:bg-[#bd171c]"
            >
              Explore membership <Icon name="arrow" />
            </Link>
          </div>
          <img
            src={joinZapdChild}
            alt="A smiling young girl in a floral blue shirt against a turquoise background"
            loading="lazy"
            decoding="async"
            className="aspect-square w-full self-center object-cover object-[20%_center]"
          />
        </div>
      </section>
      <section id="committee" className="scroll-mt-20 bg-[#dde3e3]">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Membership</p>
              <h2 className="mt-4 font-display text-4xl text-[#064b7b] sm:text-5xl">
                ZAPD Member Directory
              </h2>
            </div>
            <Link
              to="/directory"
              className="inline-flex items-center gap-2 font-bold text-[#e31e24]"
            >
              View member directory <Icon name="arrow" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 min-[400px]:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <article
                key={member.name}
                className="group overflow-hidden rounded-2xl bg-[#eef0ef]"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#dfeaf0]">
                  <img
                    decoding="async"
                    loading="lazy"
                    src={member.image}
                    alt={member.name}
                    className={`size-full transition duration-500 group-hover:opacity-95 ${member.imageClass ?? "object-cover object-top"}`}
                  />
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#e31e24]">
                    {member.role ?? "ZAPD Member"}
                  </p>
                  <h3 className="mt-1 font-display text-lg text-[#064b7b]">
                    {member.name}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function Parents() {
  return (
    <>
      <PageHero
        eyebrow="Parents & caregivers"
        title="Your Child’s Smile Starts Early"
        text="Children’s dental care begins long before the first permanent teeth appear."
      />
      <section className="dental-accent section-mist">
        <DentalScatter />
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="parent-intro">
            <img src={childrenBrushing} alt="Two children brushing their teeth together" loading="lazy" decoding="async" className="parent-intro-image" />
            <div>
              <p className="eyebrow">Parents &amp; Caregivers</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-[#064b7b] sm:text-4xl">Baby teeth matter</h2>
              <p className="mt-5 leading-8 text-[#4d6e82]">Healthy baby teeth are important for eating, speaking, development and maintaining space for permanent teeth.</p>
              <p className="mt-4 leading-8 text-[#4d6e82]">Establishing good oral-health habits early can also help children develop a positive attitude towards dental care.</p>
            </div>
          </div>
          <ParentQuestions />
        </div>
      </section>
      <ParentGallery />
    </>
  )
}

function ParentGallery() {
  const cards = [
    {
      image: familyBrushing,

      title: "Toothbrushing",

      alt: "A mother and child brushing their teeth together",

      text: "Establishing good oral-health habits early can also help children develop a positive attitude towards dental care.",
    },

    {
      image: dentalVisit,

      title: "Dental anxiety",

      alt: "A dentist helping a child feel comfortable during a dental visit",

      text: "Practical information to help you understand and care for your child’s oral health.",
    },

    {
      image: childrenBrushing,

      title: "Baby teeth matter",

      alt: "Children caring for their teeth with daily brushing",

      text: "Healthy baby teeth are important for eating, speaking, development and maintaining space for permanent teeth.",
    },
  ]

  return (
    <section className="parent-gallery mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.title}
            className="content-card overflow-hidden rounded-3xl bg-[#eef0ef]"
          >
            <img
              loading="lazy"
              decoding="async"
              src={card.image}
              alt={card.alt}
              className="aspect-[4/3] w-full object-cover object-center"
            />
            <div className="p-6">
              <h3 className="font-display text-2xl text-[#064b7b]">
                {card.title}
              </h3>
              <p className="mt-3 leading-7 text-[#5c7889]">{card.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Membership() {
  const categories = [
    {
      title: "Paediatric Dentist Member",

      text: "For dentists with recognised postgraduate training/qualification in paediatric dentistry.",
    },

    {
      title: "Dentist Member",

      text: "For registered dentists with an interest in paediatric dentistry and children’s oral health.",
    },

    {
      title: "Trainee / Registrar Member",

      text: "For dentists undertaking recognised postgraduate training in paediatric dentistry.",
    },

    {
      title: "Student Member",

      text: "For undergraduate dental students.",
    },

    {
      title: "Allied Oral Health Professional",

      text: "For appropriately registered dental therapists, oral health therapists, oral hygienists and other relevant oral-health professionals.",
    },

    {
      title: "Retired / Emeritus Member",

      text: "For retired members or suitably recognised senior members of the profession.",
    },

    {
      title: "International / Affiliate Member",

      text: "For professionals outside Zimbabwe who have an interest in paediatric dentistry or a professional relationship with ZAPD.",
    },

    {
      title: "Honorary Member",

      text: "For individuals recognised by ZAPD for an outstanding contribution to children’s oral health or to the Association.",
    },
  ]

  const benefits = [
    "Professional networking",

    "Educational activities",

    "Conferences, workshops and webinars",

    "CPD opportunities",

    "Professional and clinical discussions",

    "Paediatric dentistry resources",

    "Association news and updates",

    "Opportunities to participate in ZAPD initiatives",
  ]

  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="Become Part of ZAPD"
        text="Membership of the Zimbabwe Association of Paediatric Dentistry provides an opportunity to connect with colleagues who share an interest in children’s oral health."
      />
      <section className="dental-accent">
        <DentalScatter />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="eyebrow">Membership</p>
          <h2 className="section-title mt-4">Join ZAPD</h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-[#5c7889]">
            <p>
              Membership of the Zimbabwe Association of Paediatric Dentistry
              provides an opportunity to connect with colleagues who share an
              interest in children’s oral health.
            </p>
            <p>
              Whether you are involved extensively in paediatric dentistry or
              simply have a strong interest in improving the dental care of
              children, ZAPD provides a platform for learning, collaboration and
              professional engagement.
            </p>
          </div>
          <Link to="/join" className="primary-button mt-9">
            Start your application <Icon name="arrow" />
          </Link>
        </div>
        <figure className="content-card overflow-hidden rounded-3xl bg-[#eef0ef]">
          <img
            decoding="async"
            loading="lazy"
            src={dentalToolsPink}
            alt="Tooth models, a dental teaching model and care tools on a pastel pink background"
            className="aspect-[5/4] w-full object-cover object-center"
          />
          <figcaption className="flex flex-wrap items-baseline justify-between gap-3   px-6 py-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e31e24]">
              Collaboration
            </p>
            <p className="font-display text-xl text-[#064b7b]">
              Professional networking
            </p>
          </figcaption>
        </figure>
              </div>
      </section>

      <section className="bg-[#064b7b] text-white">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="eyebrow !text-[#ffed00]">Member benefits</p>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
                Membership Benefits
              </h2>
              <p className="mt-5 leading-7 text-white/65">
                Become part of a professional community committed to improving
                children’s oral health.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-4 rounded-2xl   bg-[#eef0ef]/[0.06] p-5"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-[#00733f]">
                    <Icon name="check" className="size-4" />
                  </span>
                  <p className="font-semibold text-white/90">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#dde3e3]">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="eyebrow">Proposed membership categories</p>
            <h2 className="section-title mt-4">
              Proposed Membership Categories
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#5c7889]">
              The final eligibility requirements, voting rights and membership
              fees will be confirmed by the Association and incorporated into
              the membership application system.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {categories.map((category) => (
              <article
                key={category.title}
                className="rounded-2xl   bg-[#eef0ef] p-6"
              >
                <div className="flex items-start gap-5">
                  <div>
                    <h3 className="font-display text-xl text-[#064b7b]">
                      {category.title}
                    </h3>
                    <p className="mt-2 leading-7 text-[#5c7889]">
                      {category.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="relative min-h-[360px] sm:min-h-[500px] overflow-hidden rounded-[2rem]">
          <img
            decoding="async"
            loading="lazy"
            src={dentalVisit}
            alt="A dentist speaking with a parent and child during a dental visit"
            className="absolute inset-0 size-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#042f4d]/95 via-[#064b7b]/75 to-transparent" />
          <div className="relative flex min-h-[360px] sm:min-h-[500px] max-w-2xl flex-col items-start justify-center p-8 text-white sm:p-12 lg:p-16">
            <p className="eyebrow !text-[#ffed00]">Ready to join?</p>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              Join ZAPD
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/75">
              Become part of a professional community committed to improving
              children’s oral health.
            </p>
            <Link
              to="/join"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#e31e24] px-7 py-4 font-bold text-white transition hover:bg-[#bd171c]"
            >
              Apply for membership <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

const members = [
  { name: "Dr Advance Chingwena", image: drChingwena, email: "info@zapd.org.zw", role: "President" },
  { name: "Dr RL Madziwa-Manana", image: drMadziwa, email: "info@zapd.org.zw", role: "President Elect" },
  { name: "Dr S Bhaskar", image: drSheetal, email: "info@zapd.org.zw", role: "Secretary" },
  { name: "Dr C Viki", image: drViki, email: "info@zapd.org.zw", role: "Treasurer" },
  { name: "Dr C Farirayi", image: drChipo, email: "info@zapd.org.zw", role: "CPD & Education Delegate" },
  { name: "Dr R Nyoni", image: drNyoni, email: "info@zapd.org.zw", role: "Board Member", imageClass: "object-cover object-[center_22%]" },
]

function Directory() {
  const [search, setSearch] = useState("")

  const matchingMembers = members.filter((member) =>
    member.name.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()),
  )

  const [selectedDoctor, setSelectedDoctor] =
    useState<typeof members[number] | null>(null)

  const profileDialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!selectedDoctor) return

    const opener = document.activeElement as HTMLElement | null

    const previousOverflow = document.body.style.overflow

    profileDialog.current?.showModal()

    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow

      opener?.focus()
    }
  }, [selectedDoctor])

  return (
    <>
      <PageHero
        eyebrow="Member directory"
        title="Finding the Right Dental Care for Your Child"
        text="ZAPD Member Directory"
      />
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mb-8 max-w-xl">
          <label className="form-label" htmlFor="member-search">
            Search members by name
          </label>
          <input
            id="member-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="form-input"
            placeholder="Enter a dentist’s name"
          />
          <p role="status" className="mt-3 text-sm text-[#5c7889]">
            {matchingMembers.length}{" "}
            {matchingMembers.length === 1 ? "member" : "members"} found
          </p>
        </div>
        {matchingMembers.length === 0 && (
          <div className="rounded-2xl   bg-[#eef0ef] p-8">
            <h2 className="font-display text-xl">No matching members</h2>
            <p className="mt-2 text-[#5c7889]">
              Try another name or contact ZAPD for help finding care.
            </p>
            <button
              className="secondary-button mt-5"
              onClick={() => setSearch("")}
            >
              Clear search
            </button>
          </div>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {matchingMembers.map((member) => (
            <article
              key={member.name}
              className="content-card overflow-hidden rounded-3xl bg-[#eef0ef]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#dde3e3]">
                <img
                  src={member.image}
                  alt={`${member.name}, ZAPD member doctor`}
                  className={`size-full ${member.imageClass ?? "object-cover object-top"}`}
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#e31e24]">
                  {member.role ?? "ZAPD Member"}
                </p>
                <h2 className="mt-2 font-display text-2xl text-[#064b7b]">
                  {member.name}
                </h2>
                <button
                  onClick={() => setSelectedDoctor(member)}
                  className="mt-5 inline-flex items-center gap-2 font-bold text-[#064b7b]"
                >
                  View profile <Icon name="arrow" className="size-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedDoctor && (
        <dialog
          ref={profileDialog}
          className="profile-dialog"
          aria-labelledby="doctor-name"
          onCancel={() => setSelectedDoctor(null)}
          onKeyDown={(event) => {
            if (event.key !== "Tab") return

            const controls =
              event.currentTarget.querySelectorAll<HTMLElement>(
                "button, a[href]",
              )

            const first = controls[0]

            const last = controls[controls.length - 1]

            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault()

              last?.focus()
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault()

              first?.focus()
            }
          }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedDoctor(null)
          }}
        >
          <section className="relative w-full overflow-hidden rounded-3xl bg-white">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-white text-[#064b7b] shadow-lg"
              aria-label="Close profile"
            >
              <Icon name="close" />
            </button>
            <div className="grid md:grid-cols-[0.85fr_1.15fr]">
              <div className="min-h-80 bg-[#dde3e3] md:min-h-[380px] sm:min-h-[520px]">
                <img
                  decoding="async"
                  loading="lazy"
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className={`size-full ${selectedDoctor.imageClass ?? "object-cover object-top"}`}
                />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e31e24]">
                  {selectedDoctor.role ?? "ZAPD Member Doctor"}
                </p>
                <h2
                  id="doctor-name"
                  className="mt-3 font-display text-4xl text-[#064b7b]"
                >
                  {selectedDoctor.name}
                </h2>
                <div className="mt-8   pt-7">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6f8a9b]">
                    How to reach this doctor
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#5c7889]">
                    Enquiries about {selectedDoctor.name}: contact ZAPD using
                    the details below.
                  </p>
                  <a
                    href={`mailto:${selectedDoctor.email}?subject=Enquiry for ${selectedDoctor.name}`}
                    className="mt-5 flex items-center gap-3 rounded-2xl bg-[#dde3e3] p-4 font-semibold text-[#064b7b]"
                  >
                    <Icon name="mail" /> {selectedDoctor.email}
                  </a>
                  <a
                    href="tel:+263773785860"
                    className="mt-3 flex items-center gap-3 rounded-2xl bg-[#dde3e3] p-4 font-semibold text-[#064b7b]"
                  >
                    <Icon name="phone" /> +263 773 785 860
                  </a>
                </div>
              </div>
            </div>
          </section>
        </dialog>
      )}
    </>
  )
}

function Join() {
  const [status, setStatus] =
    useState<"idle" | "sending" | "success" | "error">("idle")

  const [errorMessage, setErrorMessage] = useState("")

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (status === "sending") return

    setStatus("sending")

    setErrorMessage("")

    const form = event.currentTarget

    const payload = Object.fromEntries(new FormData(form).entries())

    try {
      const response = await fetch("/api/membership", {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(payload),

        signal: AbortSignal.timeout(25000),
      })

      const result = await response.json()

      if (!response.ok || result.ok !== true)
        throw new Error(
          result.error ||
            "We could not confirm your application. Please contact info@zapd.org.zw.",
        )

      setStatus("success")

      form.reset()
    } catch (error) {
      setErrorMessage(
        error instanceof Error &&
          error.name !== "TimeoutError" &&
          error.name !== "SyntaxError"
          ? error.message
          : "We could not confirm that your application was saved. Your details are still in the form. Please contact info@zapd.org.zw before resubmitting.",
      )

      setStatus("error")
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Membership application"
        title="Join ZAPD"
        text="Membership of the Zimbabwe Association of Paediatric Dentistry provides an opportunity to connect with colleagues who share an interest in children’s oral health."
      />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 lg:grid-cols-2 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem]   bg-[#dce2e1] p-7  sm:p-10">
          <p className="eyebrow">Before you apply</p>
          <h2 className="section-title mt-4">Online membership applications</h2>
          <p className="mt-6 text-lg leading-8 text-[#5c7889]">
            The final eligibility requirements, voting rights and membership
            fees will be confirmed by the Association and incorporated into the
            membership application system.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Your contact details",

              "Practice or institution",

              "Professional registration number",

              "Your membership category",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl bg-[#dde3e3] p-4 font-semibold text-[#315d79]"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white text-[#00733f]">
                  <Icon name="check" className="size-4" />
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[360px] sm:min-h-[500px] overflow-hidden rounded-3xl">
          <img
            decoding="async"
            loading="lazy"
            src={childrenTogether}
            alt="Two children sharing cheerful smiles"
            className="h-72 w-full object-cover object-center sm:absolute sm:inset-0 sm:size-full"
          />
          <div className="relative bg-[#eef0ef] p-6 sm:absolute sm:inset-x-5 sm:bottom-5 sm:rounded-2xl sm:bg-[#eef0ef]/95 sm:shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e31e24]">
              Join ZAPD
            </p>
            <p className="mt-2 font-display text-2xl text-[#064b7b]">
              Become part of a professional community committed to improving
              children’s oral health.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#dde3e3]">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-5 py-24 lg:grid-cols-[0.65fr_1.35fr] lg:px-8">
          <aside className="lg:sticky lg:top-28">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-4 font-display text-4xl text-[#064b7b]">
              Membership application
            </h2>
            <div className="mt-8 grid gap-4">
              {[
                [
                  "01",

                  "Choose your category",

                  "Select the membership category that best reflects your current professional stage.",
                ],

                [
                  "02",

                  "Complete your details",

                  "Tell us how to contact you and about your interest in children’s oral health.",
                ],

                [
                  "03",

                  "Submit application",

                  "Submit your completed application to ZAPD.",
                ],
              ].map(([number, title, text]) => (
                <article
                  key={number}
                  className="rounded-2xl   bg-[#eef0ef] p-5"
                >
                  <span className="text-xs font-bold tracking-widest text-[#e31e24]">
                    {number}
                  </span>
                  <h3 className="mt-2 font-display text-lg text-[#064b7b]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#5c7889]">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </aside>

          <form
            onSubmit={submit}
            aria-busy={status === "sending"}
            className="min-w-0 rounded-3xl   bg-[#eef0ef] p-6 shadow-sm sm:p-10"
          >
            <div className="mb-8   pb-6">
              <p className="eyebrow">Your application</p>
              <h2 className="mt-3 font-display text-3xl text-[#064b7b]">
                Membership application
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#5c7889]">
                All fields are required except professional registration number.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="form-label">
                First name
                <input
                  name="firstName"
                  autoComplete="given-name"
                  maxLength={200}
                  required
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Last name
                <input
                  name="lastName"
                  autoComplete="family-name"
                  maxLength={200}
                  required
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Email address
                <input
                  name="email"
                  autoComplete="email"
                  maxLength={200}
                  type="email"
                  required
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Phone number
                <input
                  name="phone"
                  autoComplete="tel"
                  maxLength={200}
                  type="tel"
                  required
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Professional registration number
                <input name="registrationNumber" className="form-input" />
              </label>
              <label className="form-label">
                Practice or institution
                <input
                  name="practice"
                  autoComplete="organization"
                  maxLength={200}
                  required
                  className="form-input"
                />
              </label>
              <label className="form-label">
                City
                <input
                  name="city"
                  autoComplete="address-level2"
                  maxLength={200}
                  required
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Membership category
                <select name="category" required className="form-input">
                  <option value="">Select a category</option>
                  <option>Paediatric Dentist Member</option>
                  <option>Dentist Member</option>
                  <option>Trainee / Registrar Member</option>
                  <option>Student Member</option>
                  <option>Allied Oral Health Professional Member</option>
                  <option>Retired / Emeritus Member</option>
                  <option>International / Affiliate Member</option>
                </select>
              </label>
            </div>
            <label className="form-label mt-5">
              Tell us about your interest in children’s oral health
              <textarea
                name="motivation"
                maxLength={3000}
                required
                rows={5}
                className="form-input resize-y"
              />
            </label>
            <label className="mt-5 flex items-start gap-3 text-sm text-[#4d6e82]">
              <input
                name="consent"
                type="checkbox"
                required
                className="mt-1 size-4 accent-[#064b7b]"
              />
              I confirm that the information provided is accurate and consent to
              ZAPD contacting me about this application.
            </label>
            {status === "success" && (
              <div
                role="status"
                className="mt-6 flex items-center gap-3 rounded-2xl bg-[#e6f4ec] p-4 font-semibold text-[#00733f]"
              >
                <Icon name="check" />
                Application received.
              </div>
            )}
            {status === "error" && (
              <div
                role="alert"
                className="mt-6 rounded-2xl bg-[#fee9e7] p-4 text-sm font-semibold text-[#b7191f]"
              >
                {errorMessage}
              </div>
            )}
            <button
              disabled={status === "sending"}
              type="submit"
              className="primary-button mt-7 w-full justify-center disabled:opacity-60"
            >
              {status === "sending" ? "Submitting…" : "Submit application"}{" "}
              <Icon name="arrow" />
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#064b7b] p-8 text-white sm:p-12">
          <div className="relative max-w-2xl">
            <p className="eyebrow !text-[#ffed00]">Need help applying?</p>
            <h2 className="mt-4 font-display text-4xl">Get in Touch</h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              We would be pleased to hear from you.
            </p>
            <a
              href="mailto:info@zapd.org.zw?subject=ZAPD%20membership%20application%20enquiry"
              className="mt-7 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-4 font-bold text-[#064b7b]"
            >
              Email the membership team <Icon name="mail" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

function Contact() {
  const [emailOpened, setEmailOpened] = useState(false)

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Get in Touch"
        text="We would be pleased to hear from you. Whether you are a parent seeking information about children’s oral health, a dental professional interested in membership, or an organisation interested in collaborating with ZAPD, please contact us."
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <div className="space-y-5">
            <a href="mailto:info@zapd.org.zw" className="contact-item">
              <Icon name="mail" />
              info@zapd.org.zw
            </a>
            <a href="tel:+263773785860" className="contact-item">
              <Icon name="phone" />
              +263 773 785 860
            </a>
            <p className="contact-item">
              <Icon name="pin" />
              47 Churchill Ave, Alexandra Park, Harare
            </p>
          </div>
          <div className="contact-portrait contact-photo-frame mt-8 aspect-[4/5] w-full rounded-2xl">
            <img
              decoding="async"
              loading="lazy"
              src={contactPhoto}
              alt="A woman speaking on the phone"
            />
          </div>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault()

            const fields = Object.fromEntries(new FormData(event.currentTarget))

            window.location.href = `mailto:info@zapd.org.zw?subject=${encodeURIComponent(fields.enquiryType + " enquiry from " + fields.name)}&body=${encodeURIComponent("Name: " + fields.name + "\nEmail: " + fields.email + "\nTelephone: " + fields.phone + "\nEnquiry type: " + fields.enquiryType + "\n\n" + fields.message)}`

            setEmailOpened(true)
          }}
          className="rounded-3xl bg-[#dde3e3] p-7"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="form-label">
              Your name
              <input
                name="name"
                autoComplete="name"
                required
                className="form-input"
              />
            </label>
            <label className="form-label">
              Email address
              <input
                name="email"
                autoComplete="email"
                maxLength={200}
                type="email"
                required
                className="form-input"
              />
            </label>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="form-label">
              Telephone (optional)
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                className="form-input"
              />
            </label>
            <label className="form-label">
              Enquiry type
              <select
                name="enquiryType"
                required
                defaultValue=""
                className="form-input"
              >
                <option value="" disabled>
                  Select an enquiry type
                </option>
                <option>Parent or caregiver</option>
                <option>Membership</option>
                <option>Events</option>
                <option>Collaboration</option>
                <option>General</option>
              </select>
            </label>
          </div>
          <label className="form-label mt-5">
            Message
            <textarea
              name="message"
              required
              rows={5}
              className="form-input resize-y"
            />
          </label>
          {emailOpened && (
            <p role="status" className="mt-5 text-sm leading-6 text-[#00733f]">
              Your email app should open with your enquiry. Send the email there
              to contact ZAPD. If it does not open, email info@zapd.org.zw
              directly.
            </p>
          )}
          <button className="primary-button mt-6" type="submit">
            Open email enquiry <Icon name="arrow" />
          </button>
        </form>
      </section>
    </>
  )
}

function Events() {
  return (
    <>
      <PageHero
        eyebrow="ZAPD Events"
        title="ZAPD Events"
        text="Conferences, courses, workshops, webinars and other ZAPD activities."
      />
      <section className="dental-accent section-mist">
        <DentalScatter />
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="mb-12">
          <h2 className="section-title mb-8">Events calendar</h2>
          <EventListing />
        </div>
        <div className="relative min-h-[380px] sm:min-h-[560px] overflow-hidden rounded-[2rem]">
          <img
            decoding="async"
            loading="lazy"
            src={childrenBrushing}
            alt="Two children brushing their teeth together"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#042f4d]/95 via-[#064b7b]/80 to-[#064b7b]/25" />
          <div className="relative flex min-h-[380px] sm:min-h-[560px] max-w-2xl flex-col items-start justify-center p-8 text-white sm:p-12 lg:p-16">
            <span className="text-sm font-semibold text-[#ffed00]">
              Stay connected
            </span>
            <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
              Conferences, courses, workshops and webinars
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
              Conferences, courses, workshops, webinars and other ZAPD activities.
            </p>
            <a
              href="mailto:info@zapd.org.zw?subject=ZAPD%20events%20enquiry"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#e31e24] px-7 py-4 font-bold text-white transition hover:bg-[#bd171c]"
            >
              Enquire about events <Icon name="mail" />
            </a>
          </div>
        </div>
              </div>
      </section>
    </>
  )
}

function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-32 text-center">
      <img
        decoding="async"
        loading="lazy"
        src={squareLogo}
        alt=""
        className="mx-auto size-24"
      />
      <h1 className="mt-8 font-display text-5xl text-[#064b7b]">
        Page not found
      </h1>
      <Link to="/" className="primary-button mt-8">
        Return home
      </Link>
    </section>
  )
}

export const router = createBrowserRouter([
  {
    path: "/",

    Component: Layout,

    children: [
      { index: true, Component: Home },

      { path: "about", Component: About },

      { path: "parents", Component: Parents },

      { path: "membership", Component: Membership },

      { path: "join", Component: Join },

      { path: "directory", Component: Directory },

      { path: "events", Component: Events },

      { path: "blog", Component: Blog },

      { path: "contact", Component: Contact },

      { path: "*", Component: NotFound },
    ],
  },
])
