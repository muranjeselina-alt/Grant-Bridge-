# Grant Bridge Agent Guide

## Project Shape

- This is a static, multi-page HTML/CSS/JavaScript site; there is no package manager, build step, or test runner.
- The page entry points are `index.html`, `about.html`, `offer.html`, `contacts.html`, and `experience.html`.
- Keep shared presentation in `style.css` and shared interactive behavior in `script.js`.
- `offer.html` owns the proposal generator markup; `script.js` guards its selectors so it can be loaded safely on other pages.
- Local image assets live at the repository root or in `images/`; some decorative and icon assets are loaded from external CDNs or image URLs.

## Extending The Site

- Reuse the existing class names, CSS variables, navigation, footer, and section patterns before adding new abstractions.
- When adding a page, add it to the primary navigation and each footer link list, and include the shared stylesheet and required scripts.
- When adding interactive behavior, use semantic controls and accessible labels, scope DOM queries to elements that may exist, and preserve the existing no-build browser execution model.
- Keep user-facing content and generated proposal text in the relevant HTML or `script.js` template data rather than duplicating it across pages.
- Prefer local assets for stable production content; if an external asset is necessary, keep its URL explicit and provide meaningful `alt` text or accessible labeling.

## Validation

- Preview locally with `python -m http.server 8000` from the repository root, then open `http://localhost:8000/`.
- Check every changed page in a browser at desktop and narrow widths, including navigation links and any form states.
- For proposal-generator changes, verify template switching, live preview updates, reset actions, copy, print, and PDF save behavior. PDF save depends on the jsPDF CDN being available.
- For contact-form changes, verify native validation and the visible status message; the current form is client-side only and does not send data to a server.
- Check the browser console for JavaScript errors and confirm external CDN failures do not break unrelated pages.