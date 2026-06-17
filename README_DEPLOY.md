# Bognár Katalin Photography — GitHub Pages deployment

This package is a static, GitHub Pages compatible, trilingual website starter for Bognár Katalin Photography.

## 1. Replace placeholders
Search the whole project for:

- `DOMAIN`
- `GOOGLE_SCRIPT_WEBAPP_URL`
- `RECIPIENT_EMAIL`
- `GOOGLE_SHEET_ID`
- `PHONE`
- `EMAIL`
- `ADDRESS`
- `VAT_ID`
- `FULL_LEGAL_NAME`
- `BUSINESS_FORM`
- `GOOGLE_BUSINESS_URL`
- `INSTAGRAM_URL`
- `FACEBOOK_URL`
- `LINKEDIN_URL`

Replace only with verified data.

## 2. Images
Original images are stored in `assets/img/original/`.
Optimized WebP and AVIF files are already generated. To regenerate them locally:

```bash
npm install
npm run optimize:images
```

The images are mood / brand atmosphere images, not portfolio images. The portfolio may contain only Bognár Katalin's own photos with valid image usage consent.

## 3. Google Apps Script form
1. Open script.google.com.
2. Create a new Apps Script project.
3. Copy `scripts/google-apps-script-contact-form.gs` into the editor.
4. Replace `RECIPIENT_EMAIL` and optionally `GOOGLE_SHEET_ID`.
5. Deploy as Web App.
6. Set access according to your Google Workspace setup.
7. Copy the Web App URL.
8. Replace `GOOGLE_SCRIPT_WEBAPP_URL` in the HTML files.

## 4. GitHub Pages
1. Create a GitHub repository.
2. Upload all files from this folder to the repository root.
3. Go to Settings → Pages.
4. Select source branch, usually `main` and `/root`.
5. Add custom domain if needed.
6. Enforce HTTPS.

## 5. Search Console / Bing
1. Verify the domain in Google Search Console.
2. Submit `https://DOMAIN/sitemap.xml`.
3. Submit `https://DOMAIN/image-sitemap.xml`.
4. Repeat in Bing Webmaster Tools.
5. Inspect `/de/`, `/hu/`, `/en/` after launch.

## 6. Launch checklist
- Domain replaced everywhere.
- Legal pages reviewed by Austrian lawyer / Datenschutz expert.
- Impressum complete.
- Contact form tested.
- No public page has `noindex` except `404.html`.
- Hreflang and canonical checked.
- Schema validated with Schema Markup Validator.
- Rich Results Test run on homepage.
- Mobile layout tested.
- Images compressed and loading fast.
- No AI-generated / mood image is presented as real portfolio.
- Model release process ready before publishing real portfolio images.
- Child photography consent process ready before any child image publication.
- Google Business Profile prepared with truthful categories and no fake reviews.
