import { useState } from "react"
import { events } from "../data/events"

const eventDate = new Intl.DateTimeFormat("en-ZW", {
  dateStyle: "long",
  timeZone: "Africa/Harare",
})
const eventTime = new Intl.DateTimeFormat("en-ZW", {
  timeStyle: "short",
  timeZone: "Africa/Harare",
})

export default function EventListing({
  preview = false,
}: {
  preview?: boolean
}) {
  const [archive, setArchive] = useState(false)
  const now = Date.now()
  const filtered = events
    .filter((event) =>
      archive
        ? Date.parse(event.endsAt) < now
        : Date.parse(event.endsAt) >= now,
    )
    .sort((a, b) =>
      archive
        ? Date.parse(b.startsAt) - Date.parse(a.startsAt)
        : Date.parse(a.startsAt) - Date.parse(b.startsAt),
    )
  const visible = preview ? filtered.slice(0, 2) : filtered

  return (
    <div>
      {!preview && (
        <div
          className="mb-6 flex flex-wrap gap-3"
          role="group"
          aria-label="Event schedule"
        >
          <button
            type="button"
            aria-pressed={!archive}
            onClick={() => setArchive(false)}
            className={!archive ? "primary-button" : "secondary-button"}
          >
            Upcoming events
          </button>
          <button
            type="button"
            aria-pressed={archive}
            onClick={() => setArchive(true)}
            className={archive ? "primary-button" : "secondary-button"}
          >
            Past events
          </button>
        </div>
      )}
      <div aria-live="polite" className="grid gap-5">
        {visible.length === 0 && (
          <div className="content-card rounded-2xl bg-[#eef0ef] p-6 sm:p-8">
            <h3 className="font-display text-xl text-[#064b7b]">
              {archive
                ? "No past events published yet."
                : "New event dates will be announced here."}
            </h3>
            <p className="mt-3 leading-7 text-[#5c7889]">
              {archive
                ? "Previous ZAPD events will remain available here as the calendar grows."
                : "Conferences, courses, workshops, webinars, CPD activities, professional meetings and association events."}
            </p>
          </div>
        )}
        {visible.map((event) => (
          <article
            key={event.id}
            className="content-card rounded-2xl bg-[#eef0ef] p-6 sm:p-8"
          >
            <p className="eyebrow">{event.category}</p>
            <h3 className="mt-3 font-display text-2xl text-[#064b7b]">
              {event.title}
            </h3>
            <p className="mt-3 font-semibold">
              <time dateTime={event.startsAt}>
                {eventDate.format(new Date(event.startsAt))} ·{" "}
                {eventTime.format(new Date(event.startsAt))}
              </time>{" "}
              (Zimbabwe time)
            </p>
            <p className="mt-2 text-[#5c7889]">{event.venue}</p>
            {!preview && (
              <dl className="mt-5 space-y-4 text-[#5c7889]">
                {[
                  ["Speakers", event.speakers?.join(", ")],
                  ["Programme", event.programme],
                  ["Registration", event.registrationInformation],
                  ["CPD information", event.cpdInformation],
                ].map(
                  ([label, value]) =>
                    value && (
                      <div key={label}>
                        <dt className="font-bold text-[#315d79]">{label}</dt>
                        <dd className="mt-1 whitespace-pre-line leading-7">
                          {value}
                        </dd>
                      </div>
                    ),
                )}
              </dl>
            )}
            {!preview && !archive && event.registrationUrl && (
              <a href={event.registrationUrl} className="primary-button mt-6">
                Register for this event
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
