const SPREADSHEET_ID = "1QlOgqqNny1Pln1SoN1UOjSqot3oT2nuaq11I0mQBB8g";
const SHEET_NAME = "Sheet1";

function doPost(event) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) {
      throw new Error(`Sheet "${SHEET_NAME}" was not found.`);
    }

    const application = JSON.parse(event.postData.contents);
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
      application.submittedAt,
      application.firstName,
      application.lastName,
      application.email,
      application.phone,
      application.registrationNumber,
      application.practice,
      application.city,
      application.category,
      application.motivation,
      application.consent,
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
