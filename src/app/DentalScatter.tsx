const icons = [
  { name: "tooth", viewBox: "-4 0 58 66" },
  { name: "mirror", viewBox: "-3 -3 40 92" },
  { name: "brush", viewBox: "-3 -3 34 90" },
  { name: "floss", viewBox: "-4 -16 60 76" },
  { name: "paste", viewBox: "0 0 50 82" },
  { name: "probe", viewBox: "0 -4 44 92" },
  { name: "tooth", viewBox: "-4 0 58 66" },
  { name: "mirror", viewBox: "-3 -3 40 92" },
]

export default function DentalScatter() {
  return (
    <div className="dental-scatter" aria-hidden="true">
      {icons.map((icon, index) => (
        <svg key={index} className={`dental-decoration dental-decoration-${index + 1}`} viewBox={icon.viewBox} fill="none" stroke="#63818b" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" focusable="false">
          <use href={`${import.meta.env.BASE_URL}images/dental-band.svg#${icon.name}`} />
        </svg>
      ))}
    </div>
  )
}
