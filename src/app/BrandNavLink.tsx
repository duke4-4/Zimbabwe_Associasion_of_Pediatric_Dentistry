import { useState, type CSSProperties } from "react"
import { NavLink } from "react-router"

// Restrict the interaction to the colours in the supplied ZAPD logo.
const logoColours = ["#ff0000", "#ffff00", "#006b3b", "#064b7b", "#1b1b19"]

export default function BrandNavLink({
  label,
  to,
  mobile = false,
  onNavigate,
}: {
  label: string
  to: string
  mobile?: boolean
  onNavigate?: () => void
}) {
  const [colour, setColour] = useState(logoColours[2])
  function chooseColour() {
    const alternatives = logoColours.filter((value) => value !== colour)
    setColour(alternatives[Math.floor(Math.random() * alternatives.length)])
  }
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      onPointerEnter={chooseColour}
      onFocus={chooseColour}
      style={{ "--nav-underline": colour } as CSSProperties}
      className={({ isActive }) =>
        `brand-nav-link ${mobile ? "brand-nav-mobile" : ""} ${
          isActive ? "brand-nav-active" : ""
        }`
      }
    >
      {label}
    </NavLink>
  )
}
