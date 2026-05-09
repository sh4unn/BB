# Bloom & Buttercream — Website

Bespoke luxury cake website with order enquiry form. Orders are emailed directly to `Bandbuttercream@gmail.com`.

---

## Quick Setup (5 minutes)

### 1. Connect Email via Formspree

Formspree sends every order form submission straight to your inbox — no server, no code.

1. Go to **[formspree.io](https://formspree.io)** and create a free account
2. Click **New Form**
3. Enter `Bandbuttercream@gmail.com` as the email address
4. Copy your **Form ID** (looks like `xabcd1234`)
5. Open `order.html` and find this line (around line 37):
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   Replace `YOUR_FORM_ID` with your actual ID:
   ```html
   action="https://formspree.io/f/xabcd1234"
   ```
6. Save — that's it. Every order now lands in your inbox with all the details.

> **Free plan:** 50 submissions/month. Upgrade for unlimited.

---

### 2. Add Your Photos

Create an `images/` folder and add your cake photos. Then replace the placeholder `<div>` elements in `index.html`:

| Section | Placeholder to find | Replace with |
|---------|--------------------|--------------|
| Hero | `<div class="hero__image-placeholder">` | `<img src="images/hero.jpg" alt="...">` |
| About | `<div class="about__image-placeholder">` | `<img src="images/about.jpg" alt="...">` |
| Gallery | `<div class="gallery__placeholder">` (×5) | `<img src="images/gallery-1.jpg" alt="...">` etc. |

Images are styled automatically — just drop them in.

---

### 3. Update Your Instagram Handle

In `index.html`, find `@bloomandbuttercream` and replace with your real handle.

---

### 4. Deploy (Go Live)

**Netlify** (easiest — free):
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag your entire project folder onto the page
3. You'll get a live URL instantly
4. Optionally connect a custom domain

**GitHub Pages** (free, syncs with this repo):
1. Go to your repo → Settings → Pages
2. Source: Deploy from branch → `main` → `/ (root)`
3. Your site will be at `https://sh4unn.github.io/BB`

---

## Customising the Form

All cake options live in `order.html` inside `<option>` tags — edit freely:
- **Cake types** — Section 02
- **Sponge flavours** — Section 03
- **Buttercream flavours** — Section 03
- **Add-ons** — Section 04 (checkboxes)

## Colours

All colours are CSS variables in `css/styles.css` at the top:

```css
--clr-primary: #7B1A33;   /* Deep burgundy */
--clr-cream:   #F0E8D8;   /* Warm cream    */
--clr-rose:    #C4889A;   /* Muted rose    */
```

## File Structure

```
├── index.html          Landing page
├── order.html          Order enquiry form  
├── thank-you.html      Confirmation page after submission
├── css/
│   └── styles.css      All styling
├── js/
│   ├── main.js         Navigation behaviour
│   └── form.js         Form validation & photo previews
└── images/             Add your cake photos here
```
