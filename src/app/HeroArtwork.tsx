import { useLocation } from "react-router"
import home from "../assets/heroes/home.svg"
import about from "../assets/heroes/about.svg"
import parents from "../assets/heroes/parents.svg"
import membership from "../assets/heroes/membership.svg"
import join from "../assets/heroes/join.svg"
import directory from "../assets/heroes/directory.svg"
import events from "../assets/heroes/events.svg"
import blog from "../assets/heroes/blog.svg"
import contact from "../assets/heroes/contact.svg"

const artwork: Record<string, string> = {
  "/": home, "/about": about, "/parents": parents, "/membership": membership,
  "/join": join, "/directory": directory, "/events": events, "/blog": blog, "/contact": contact,
}

export default function HeroArtwork() {
  const { pathname } = useLocation()
  const src = artwork[pathname.replace(/\/+$/, "") || "/"]
  if (!src) return null
  return <div className="hero-artwork" aria-hidden="true">
    <img src={src} alt="" decoding="async" className="hero-artwork-image" />
    <div className="hero-artwork-overlay" />
  </div>
}
