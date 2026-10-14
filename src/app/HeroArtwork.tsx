import { useLocation } from "react-router"
import { heroArtwork } from "./images"

export default function HeroArtwork() {
  const { pathname } = useLocation()
  const src = heroArtwork[pathname.replace(/\/+$/, "") || "/"]
  if (!src) return null
  return <div className="hero-artwork" aria-hidden="true">
    <img src={src} alt="" decoding="async" className="hero-artwork-image" />
    <div className="hero-artwork-overlay" />
  </div>
}
