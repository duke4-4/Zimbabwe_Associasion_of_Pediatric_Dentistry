const SPREADSHEET_ID = "1k5uLm1px4kB_HmfFiON75EYFc0pWkr1HyyKwcdSk7K4";
// Matches gid=0 in the supplied spreadsheet URL, even if the tab is renamed.
const SHEET_ID = 0;
const MEMBERSHIP_EMAIL = "info@zapd.org.zw";

function doPost(event) {
  const lock = LockService.getScriptLock();
  let acquired = false;

  try {
    lock.waitLock(10000);
    acquired = true;

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetById(SHEET_ID);
    if (!sheet) {
      throw new Error(`Sheet with gid=${SHEET_ID} was not found.`);
    }

    const application = JSON.parse(event.postData.contents);
    const required = ["firstName", "lastName", "email", "phone", "practice", "city", "category", "motivation"];
    if (required.some((field) => typeof application[field] !== "string" || !application[field].trim() || application[field].length > (field === "motivation" ? 3000 : 200))) {
      throw new Error("Required application details are missing or too long.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(application.email) || (application.consent !== true && application.consent !== "on")) {
      throw new Error("A valid email address and consent are required.");
    }
    const categories = ["Paediatric Dentist Member", "Dentist Member", "Trainee / Registrar Member", "Student Member", "Allied Oral Health Professional Member", "Retired / Emeritus Member", "International / Affiliate Member"];
    if (!categories.includes(application.category)) throw new Error("Invalid membership category.");
    const headers = [
      "Submitted at",
      "First name",
      "Last name",
      "Email",
      "Phone",
      "Registration number",
      "Practice or institution",
      "City",
      "Membership category",
      "Motivation",
      "Consent",
    ];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    }

    const submittedAt = new Date().toISOString();
    sheet.appendRow([
      submittedAt,
      safeCell(application.firstName),
      safeCell(application.lastName),
      safeCell(application.email),
      safeCell(application.phone),
      safeCell(application.registrationNumber),
      safeCell(application.practice),
      safeCell(application.city),
      safeCell(application.category),
      safeCell(application.motivation),
      "Yes",
    ]);

    // A mail failure must not turn a saved application into a failed submission.
    let emailSent = false;
    try {
      sendMembershipNotification(application, submittedAt);
      emailSent = true;
    } catch (error) {
      console.error("Membership email failed; application remains saved. Check mail permissions and quota.");
    }
    try {
      sheet.getRange(sheet.getLastRow(), 1).setNote(emailSent
        ? "Membership notification sent to " + MEMBERSHIP_EMAIL
        : "Email notification failed. Application saved; contact this applicant manually.");
    } catch (error) {
      console.error("Could not record membership email status.");
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, emailSent }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    if (acquired) lock.releaseLock();
  }
}

function sendMembershipNotification(application, submittedAt) {
  const fields = [
    ["First name", "firstName"],
    ["Last name", "lastName"],
    ["Email", "email"],
    ["Phone", "phone"],
    ["Registration number", "registrationNumber"],
    ["Practice or institution", "practice"],
    ["City", "city"],
    ["Membership category", "category"],
    ["Motivation", "motivation"],
  ];
  MailApp.sendEmail({
    to: MEMBERSHIP_EMAIL,
    subject: "New ZAPD membership application",
    name: "ZAPD Membership",
    replyTo: application.email.trim(),
    body: [
      "A new membership application has been saved.",
      "Submitted at (UTC): " + submittedAt,
      "",
      ...fields.map(([label, field]) => label + ": " + (String(application[field] || "").trim().slice(0, 3000) || "Not provided")),
      "Consent: Yes",
      "",
      "Review applications: https://docs.google.com/spreadsheets/d/" + SPREADSHEET_ID + "/edit#gid=" + SHEET_ID,
      "This is an application, not confirmation of membership approval.",
    ].join("\n"),
  });
}

// Run once from the editor to grant email permission without sending a message.
function authoriseMembershipEmail() {
  return MailApp.getRemainingDailyQuota();
}

// Keep user-entered values as text, including phone numbers and formula-like text.
function safeCell(value) {
  const text = String(value || "").trim().slice(0, 3000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

// Check deployment and sheet access without adding a test application.
function doGet() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetById(SHEET_ID);
    if (!sheet) throw new Error("Membership sheet not found.");
    return ContentService.createTextOutput(JSON.stringify({ ok: true, service: "ZAPD membership" })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(error) })).setMimeType(ContentService.MimeType.JSON);
  }
}
