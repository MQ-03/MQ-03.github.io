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

## Easy edits
- **Add a profile photo:** replace the `MM` initials block (`.about__avatar` in `index.html`)
  with `<img src="photo.jpg" alt="Mubaraque M" />`.
- **LinkedIn / GitHub:** add links to the `.cta__contacts` list in the `#contact` section.
- **Brand colors:** the `:root` block at the top of `styles.css` (`--azure`, `--cyan`, …).
- **Resume PDF download:** drop the PDF in this folder and add a button linking to it in `#about`.

### Contact form
The form opens the visitor's mail client (no backend needed). To capture submissions instead,
point it at a service like **Azure Static Web Apps Functions**, **Formspree**, or **Power Automate**
and replace the `mailto:` logic in `script.js`.

## Deploy
- **Azure Static Web Apps:** `swa deploy`, or connect the repo in the Azure Portal.
- **Netlify / Vercel / GitHub Pages:** drop the folder in — it's already static.
- **Azure Blob Storage static website:** upload the files, set `index.html` as the index document.
