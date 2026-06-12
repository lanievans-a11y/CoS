# Private & Confidential — Operations Platform

## Overview
A luxury UHNW household operating system. Clean HTML/CSS/JS — no backend, no framework, no login required.

---

## File Structure
```
ops-platform/
├── index.html          ← All sections and content live here
├── css/
│   └── style.css       ← Design system, tokens, responsive layout
├── js/
│   └── app.js          ← Navigation, modals, toast, interactions
└── README.md
```

---

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g., `household-operations`)
2. Upload all files, preserving the folder structure
3. Go to **Settings → Pages**
4. Under **Source**, select `Deploy from a branch`
5. Choose `main` branch, `/ (root)` folder → **Save**
6. Your site will be live at:
   `https://yourusername.github.io/household-operations`

---

## How to Edit Content

### Find Editable Fields
Search for `[` in `index.html` — every bracket placeholder is designed to be replaced.

```
[Family Name]       → Replace with actual family/estate name
[Primary Residence] → Your main property name
[Principal Name]    → The principal's name
[Date]              → Specific dates
[Vendor Name]       → Actual vendor names
[N]                 → Numbers (guest count, staff count, etc.)
```

### Key Things to Customize

**1. Sidebar logo** (top of `index.html`):
```html
<div class="logo-eyebrow">Private Residence Operations</div>
<div class="logo-name">The [Family Name]<br>Household Office</div>
```

**2. Properties** (search for `stat-tile` cards and table rows):
Replace `[Primary Residence]`, `[Aspen Residence]`, `[Beach House]`, `[NYC Apartment]`

**3. Principal profile preferences** — Section 02, all `data-editable` divs

**4. Staff directory** — Section 05, the `<tbody>` in the staff table

**5. Budget figures** — Dashboard and Reports sections

**6. Schedule** — Dashboard Today's Schedule and Planning Suite

---

## In-Browser Editing

All fields marked `data-editable` can be edited live:
- **Double-click** any field to edit it inline
- Click away to save
- Changes persist until page reload

To make changes permanent, edit `index.html` directly.

---

## Customizing the Design

All design tokens are in `css/style.css` at the top under `:root`:

```css
:root {
  --cream:    #F7F4EF;   ← background
  --sand:     #EAE4D9;   ← subtle fills
  --taupe:    #C8BFB0;   ← borders
  --stone:    #A09080;   ← muted text
  --olive:    #7A7A60;
  --charcoal: #2E2C28;   ← body text
  --ink:      #1A1916;   ← headings
  --accent:   #6B5E4C;   ← buttons, highlights
}
```

---

## Adding New Sections

1. Add a nav item in the sidebar:
```html
<div class="nav-item" data-section="section-YOURNAME" onclick="showSection('section-YOURNAME','Title','Category')">
  <span class="nav-icon">◎</span> My Section
</div>
```

2. Add the section content:
```html
<div class="section-page" id="section-YOURNAME">
  <div class="section-label">Category</div>
  <h1 class="page-title">My Section</h1>
  <!-- your content here -->
</div>
```

---

## Status Tags

Click any status tag to cycle through statuses (Pending → Active → Complete → Urgent).

Available tag classes:
- `tag-urgent` — red/alert
- `tag-active` — green
- `tag-pending` — amber
- `tag-complete` — grey
- `tag-thisweek` — warm brown
- `tag-upcoming` — neutral

---

## Print / Export

Click **⎙ Print** in the top bar. The sidebar hides automatically for clean output.

---

## Notes for Directors

- All sections accessible within 3 clicks from any page
- Global search: type keywords in the sidebar search bar and press Enter
- Quick action buttons in the top bar: `+ Task`, `+ Request`, `⎙ Print`
- Double-click any editable field to modify inline
- Approval cards: Approve / Decline / Delegate track actions with visual feedback
- Option A/B/C cards: click to select principal's choice
