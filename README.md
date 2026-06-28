# Mubaraque M — Portfolio

A fast, responsive, single-page portfolio for **Mubaraque M**, IT Engineer (L2) specializing in
Microsoft Azure, identity & access management, and cross-platform endpoint management
(**Intune · Jamf · Apple Business Manager**).

Pure HTML/CSS/JS — no build step, no dependencies, hosts anywhere.

## Files
- `index.html` — content & structure
- `styles.css` — Azure-themed design system
- `script.js` — sticky nav, mobile menu, scroll reveals, contact form

## Sections
Hero · Certifications · Services (with a featured **Endpoint Management** card) · Skills ·
Experience timeline · Featured project · About · Contact.

All content is sourced from the resume — no placeholder/sample data remains.

## Run locally
Open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Profile photo
The About section shows a photo named **`photo.jpg`** in this folder, and falls back to the
"MM" monogram if it's missing. To add yours:

1. Drop a square-ish image here named exactly `photo.jpg` (≈600×600px).
2. Commit & push: `git add photo.jpg && git commit -m "Add profile photo" && git push`.

## Contact form (Web3Forms)
The form is wired to **Web3Forms** — no backend or dashboard needed. To switch it on:

1. Go to **https://web3forms.com**, enter `mubaraque3@gmail.com`, copy the **access key** it emails you.
2. In `script.js`, replace `YOUR_ACCESS_KEY_HERE` with that key (near the top).
3. Commit & push. Submissions then arrive in your inbox.

Until the key is set, the form gracefully falls back to opening the visitor's mail client.

## Other easy edits
- **LinkedIn / GitHub:** links live in the `.cta__contacts` list in the `#contact` section.
- **Brand colors:** the `:root` block at the top of `styles.css` (`--azure`, `--cyan`, …).
- **Resume PDF download:** drop the PDF in this folder and add a button linking to it in `#about`.

## Deploy
- **Azure Static Web Apps:** `swa deploy`, or connect the repo in the Azure Portal.
- **Netlify / Vercel / GitHub Pages:** drop the folder in — it's already static.
- **Azure Blob Storage static website:** upload the files, set `index.html` as the index document.
