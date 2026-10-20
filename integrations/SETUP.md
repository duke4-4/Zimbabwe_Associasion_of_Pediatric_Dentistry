# Connect member registration to Google Sheets

The script now targets your spreadsheet, tab `gid=0`. Live activation still requires the Google deployment and Vercel environment variable below. This is Google Sheets; you can export the records to Excel later.

## 1. Prepare the spreadsheet

1. Open https://docs.google.com/spreadsheets/d/1k5uLm1px4kB_HmfFiON75EYFc0pWkr1HyyKwcdSk7K4/edit?gid=0#gid=0 using an account with edit access.
2. Check the target tab. An empty tab receives column headings automatically. An existing tab must have these first eleven columns in order: Submitted at, First name, Last name, Email, Phone, Registration number, Practice or institution, City, Membership category, Motivation, Consent.
3. If the tab holds unrelated data, create an empty tab and update `SHEET_ID` in the script to its URL's `gid`. Do not overwrite existing records. Renaming a tab does not change its ID.
4. Keep the spreadsheet restricted to membership administrators. Applicants do not need access.

## 2. Deploy Google Apps Script

1. In the spreadsheet choose **Extensions > Apps Script**.
2. Replace `Code.gs` with the full contents of [google-apps-script.gs](google-apps-script.gs), then save.
3. Choose **Deploy > New deployment > Web app** (select the gear icon to choose the type).
4. Set **Execute as: Me** and **Who has access: Anyone**, and authorise spreadsheet access with your editor account. If the organisation disables this option, consult its administrator.
5. Click **Deploy** and copy the web-app URL ending in `/exec`. Do not use the spreadsheet URL or the `/dev` test URL.
6. Open `/exec` in a private browser window. It should show `{"ok":true,"service":"ZAPD membership"}`. This checks access without adding a row.

For an existing deployment, use **Deploy > Manage deployments > Edit > New version > Deploy** after replacing the code. Saving alone does not update the deployed script.

## 3. Connect Vercel

1. Open the ZAPD Vercel project and select **Settings > Environment Variables**.
2. Add or update `MEMBERSHIP_SHEETS_ENDPOINT` with your complete `/exec` URL.
3. Enable it for **Production** and **Preview** as appropriate, and save.
4. Deploy the website changes. Redeploy after changing the environment variable.

This variable is server-side; do not use a `VITE_` prefix. The website posts to `/api/membership`, which forwards the application to Apps Script. A plain Vite preview does not run Vercel functions: verify submissions on a Vercel Preview deployment or with `vercel dev`.

## 4. Verify

1. Open `/join` on the deployed website and submit one clearly labelled test application using an email address you control.
2. Confirm both a success message and a matching row in the spreadsheet tab.
3. If a request times out, check the sheet before resubmitting to avoid duplicates.
4. Remove the test row if desired.

Timestamps are UTC. Submissions are applications, not automatic membership approval. The integration does not send email. Use [MEMBERSHIP-EMAIL.md](MEMBERSHIP-EMAIL.md) as the draft for your mailbox's automatic response.

Reference: [Google Apps Script web-app deployment](https://developers.google.com/apps-script/guides/web).
