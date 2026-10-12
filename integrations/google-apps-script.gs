const SPREADSHEET_ID = "1QlOgqqNny1Pln1SoN1UOjSqot3oT2nuaq11I0mQBB8g";
const SHEET_NAME = "Sheet1";

function doPost(event) {
  const lock = LockService.getScriptLock();
  let acquired = false;

  try {
    lock.waitLock(10000);
    acquired = true;

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) {
      throw new Error(`Sheet "${SHEET_NAME}" was not found.`);
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

    sheet.appendRow([
      new Date().toISOString(),
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

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    if (acquired) lock.releaseLock();
  }
}

// Keep user-entered values as text, including phone numbers and formula-like text.
function safeCell(value) {
  const text = String(value || "").trim().slice(0, 3000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

// Check deployment and sheet access without adding a test application.
function doGet() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error("Membership sheet not found.");
    return ContentService.createTextOutput(JSON.stringify({ ok: true, service: "ZAPD membership" })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(error) })).setMimeType(ContentService.MimeType.JSON);
  }
}
