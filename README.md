# Bloom & Buttercream

Bespoke luxury cake website. Orders email directly to `Bandbuttercream@gmail.com`.

---

## To-do before going live

### 1. Connect email (Formspree — free, 5 mins)
1. Go to **[formspree.io](https://formspree.io)** → sign up free
2. New Form → enter `Bandbuttercream@gmail.com`
3. Copy your Form ID (e.g. `xabcd1234`)
4. Open `order.html`, find `YOUR_FORM_ID` and replace it

### 2. Connect Instagram feed (Behold — free, 5 mins)
1. Go to **[behold.so](https://behold.so)** → sign up free
2. Connect your Instagram account
3. Create a widget → Grid layout
4. Copy your Widget ID
5. Open `index.html`, find `YOUR_BEHOLD_ID` and replace it
6. Update `@bloomandbuttercream` with your real handle (appears twice in `index.html`)

### 3. Add your photos
Create an `images/` folder. Then in `index.html`:
- Find `<div class="hero__image-placeholder">` → replace with `<img src="images/hero.jpg" alt="...">`

In `menu.html`, replace each `<div class="menu-card__image">` with an `<img>` tag.

### 4. Custom domain (optional)
A domain like `bloomandbuttercream.co.uk` costs ~£10/yr on Namecheap.
Then: repo Settings → Pages → Custom domain.

---

## Editing dropdown options

Open `js/config.js` — all the order form options are listed there in plain text.
Add or remove lines freely. Keep the quotes and commas.

## Pushing updates

For a solo site, push straight to `main`. No branching needed.

## File structure

```
├── index.html       Homepage
├── order.html       Order enquiry form
├── menu.html        Cake menu (add photos when ready)
├── thank-you.html   Confirmation page
├── css/styles.css   All styling (colours at the top)
├── js/
│   ├── config.js    Edit dropdown options here
│   ├── main.js      Navigation
│   └── form.js      Form logic
└── images/          Add cake photos here
```
