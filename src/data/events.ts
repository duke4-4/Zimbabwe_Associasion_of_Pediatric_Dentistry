export type ZapdEvent = {
  id: string
  title: string
  category: "Conference" | "Course" | "Workshop" | "Webinar" | "CPD activity" | "Professional meeting" | "Association event"
  startsAt: string // ISO date/time with explicit timezone, e.g. +02:00 for Zimbabwe.
  endsAt: string
  venue: string
  speakers?: string[]
  programme?: string
  registrationInformation?: string
  cpdInformation?: string
  registrationUrl?: string
}

// Publish confirmed events only. Finished events remain available in the archive.
export const events: ZapdEvent[] = []
