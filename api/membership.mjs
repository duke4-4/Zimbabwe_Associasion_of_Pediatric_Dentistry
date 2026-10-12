const required = ["firstName", "lastName", "email", "phone", "practice", "city", "category", "motivation"];
export const categories = ["Paediatric Dentist Member", "Dentist Member", "Trainee / Registrar Member", "Student Member", "Allied Oral Health Professional Member", "Retired / Emeritus Member", "International / Affiliate Member"];

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }
  let application;
  try {
    application = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ ok: false, error: "Invalid application." });
  }
  if (!application || required.some((field) => typeof application[field] !== "string" || !application[field].trim() || application[field].length > (field === "motivation" ? 3000 : 200)) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(application.email) || !categories.includes(application.category) || application.consent !== "on") {
    return res.status(400).json({ ok: false, error: "Please complete all required fields and confirm your consent." });
  }
  const endpoint = process.env.MEMBERSHIP_SHEETS_ENDPOINT;
  if (!endpoint || !/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(endpoint)) {
    return res.status(503).json({ ok: false, error: "Online applications are temporarily unavailable. Please contact info@zapd.org.zw." });
  }
  const payload = Object.fromEntries([...required, "registrationNumber"].map((field) => [field, String(application[field] ?? "").trim().slice(0, field === "motivation" ? 3000 : 200)]));
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...payload, consent: true, submittedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(20000),
    });
    const result = await response.json();
    if (!response.ok || result.ok !== true) throw new Error("Save not confirmed");
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false, error: "We could not confirm that your application was saved. Your details are still in the form. Please contact info@zapd.org.zw before resubmitting." });
  }
}
