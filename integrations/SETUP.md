# Connect member registration to Google Sheets

The website now sends applications to `/api/membership` on Vercel. That server function forwards them to your Google Apps Script and shows success only when the script confirms the save.

## 1. Set up the sheet and script

1. Open your membership spreadsheet: https://docs.google.com/spreadsheets/d/1QlOgqqNny1Pln1SoN1UOjSqot3oT2nuaq11I0mQBB8g/edit
2. Check that the destination tab is named **Sheet1**. If you use another tab, change `SHEET_NAME` at the top of `google-apps-script.gs`.
3. Select **Extensions → Apps Script**.
4. Replace the contents of `Code.gs` with the complete contents of this folder's `google-apps-script.gs`, then save.
5. Choose **Deploy → New deployment → Web app**.
6. Set **Execute as: Me** and **Who has access: Anyone**. Approve the requested spreadsheet access with the account that owns or can edit the sheet.
7. Click **Deploy** and copy the web-app URL ending in **/exec**. Do not use the editor URL or the test URL ending in `/dev`.
8. Open the `/exec` URL in a private browser window. It should show `{"ok":true,"service":"ZAPD membership"}`. This checks sheet access without inserting a row.

The script creates column headings when the tab is empty. For an existing populated tab, ensure its first eleven columns are: Submitted at, First name, Last name, Email, Phone, Registration number, Practice or institution, City, Membership category, Motivation, Consent. Use a new empty tab if the existing columns differ.

## 2. Connect Vercel

1. Open the ZAPD project in Vercel.
2. Go to **Settings → Environment Variables**.
3. Add **MEMBERSHIP_SHEETS_ENDPOINT** with your complete `/exec` URL as the value.
4. Enable it for **Production** and **Preview** (and Development if using `vercel dev`).
5. Commit and push these website changes, then redeploy. If the commit is already deployed, redeploy it after saving the variable.

Use the variable name exactly as written. The old `VITE_MEMBERSHIP_SHEETS_ENDPOINT` variable is no longer used. The endpoint lives on the server and requires no `VITE_` prefix.

## 3. Verify the connection

1. Open `/join` on the new Vercel deployment.
2. Submit one clearly labelled test application with an email address you control.
3. Confirm the success message appears and a matching row exists in Sheet1.
4. Remove your test row if desired.

If submission fails, the form keeps the entered details. Check the environment variable, the script's access setting, the spreadsheet ID and tab name. If the response is uncertain, check the sheet before trying again to avoid duplicate applications.

After editing Apps Script later, use **Deploy → Manage deployments → Edit → New version → Deploy** to update the existing `/exec` endpoint.

Plain `vite dev` serves the website but does not execute Vercel functions. Test the form on a Vercel Preview deployment or with `vercel dev` and the environment variable set.

Google's deployment reference: https://developers.google.com/apps-script/guides/web
