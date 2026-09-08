# Landing page refresh

- Captures use the actual development preview components with fictional sample data.
- Mobile source images: 390 x 844 CSS pixels at 2x device scale; optimized WebP copies are in src/frontend/public/landing (dashboard-mobile-v2.webp, applications-mobile-v2.webp, public-status-updates-mobile.webp).
- The public page is scrolled to the next interview and recent applications so the screenshot shows the information visitors can read.
- Preview controls and the Next.js development indicator are hidden for capture only.
- capture.cjs recreates product images against the local development server at http://localhost:3000.
- verify.cjs captures the landing page at 390, 768, and 1440 pixels and checks image loading, overflow, navigation, keyboard menu dismissal, reduced motion, browser errors, and axe WCAG A/AA rules.
- Verification results are recorded in browser-report.json. Automated accessibility checks do not replace the visual and keyboard review.
- Frontend validation: lint, typecheck, all 49 tests, and production build passed. The production build required network access to download the existing Google Fonts.
