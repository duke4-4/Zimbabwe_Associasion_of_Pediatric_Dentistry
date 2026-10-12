# Website brief alignment

Reference: `ZAPD Website Project.docx (1).pdf`, reviewed 12 October 2026.

Scope follows the owner's instruction to work only on existing pages: Home, About, Parents & Caregivers, Membership, Join, Member Directory, Events and Contact. The supplied brief informs content and features; it does not override the owner's later image, navigation or design preferences.

## Applied to existing pages

- Home: supplied association introduction, campaign heading, Learn More / Join ZAPD actions, four focus areas including Professional Development, and upcoming events.
- About: supplied vision, mission, objectives and values. The existing portrait grid is labelled as the member directory; the supplied headshots alone do not confirm executive committee appointments. Committee titles and positions await confirmation.
- Parents: all 12 suggested topics, presented as non-interactive cards pending approved article content.
- Membership: eight proposed categories, benefits and the notice that final eligibility, voting rights and fees await confirmation.
- Directory: name search, result count and empty state. City, practice and location filters await verified listing data; all current contact routes remain through ZAPD.
- Events: upcoming schedule and past-event archive using `src/data/events.ts`. Only add confirmed events. Each entry supports title, category, start/end with timezone, venue, speakers, programme, registration information/link and CPD information. No dates or events have been fabricated. Homepage uses the same data.
- Contact: name, email, optional telephone, enquiry type and message. Submission opens an email draft with these fields; it does not claim to send mail automatically.
- Navigation: direct access to the existing directory; no links to unbuilt pages.

## Deferred pages

Dental Professionals, Privacy Policy, Terms of Use, and standalone articles/resources. No routes or placeholder links added for these. Their related homepage feeds are deferred too.

The owner subsequently requested a static Blog & News page. `/blog` now presents The ZAPD Journal with a coming-soon design and the four planned content categories. Publishing articles and a homepage news feed remain deferred.

## Information and services still needed

- Confirm committee appointments, professional designations, practice/location details, listing approval and any direct contacts before publishing those fields.
- Confirm membership fees, rights and final eligibility.
- Supply confirmed event dates, programmes, CPD details and registration/payment destinations. Payment processing is not implemented.
- Deploy the membership Apps Script and configure `MEMBERSHIP_SHEETS_ENDPOINT` in Vercel, as described in `SETUP.md`; live sheet delivery has not been verified.
- Contact and newsletter forms currently use email drafts. Automatic email delivery/subscriptions require a configured service.
- The brief's intended domain is `zapd.org.zw`. SEO remains on the current `zapdnew.vercel.app` deployment until the custom domain is connected; update `src/seo.json` when it is live.

The excluded advocacy topics in the brief are not introduced.

## Copy and visual audit, 12 October 2026

Marketing headings, descriptions, image captions and Journal categories now use the supplied brief's wording or short extracts. Removed invented slogans, generic doctor biographies, a first-visit recommendation absent from the brief, and unconfirmed newsletter/follow-up promises. Functional UI text (field labels, consent, validation, search results, empty states, email-draft explanations, image descriptions and the requested coming-soon status) remains necessary to explain the implemented interface.

SAAPD reference: https://saapd.co.za/ — used for clear parent/professional paths, visible membership access, event access and a restrained association presentation. No SAAPD prose, professional claims or excluded advocacy positions are imported. ZAPD's existing layout, typography and user-approved photos remain.

Header underline colours are randomly selected on pointer entry or keyboard focus from the supplied logo's red, yellow, green, blue and charcoal. A new interaction chooses a different colour; active links have no background or persistent underline. The footer uses the same palette in a narrow colour band, with a green membership panel and existing blue background.
