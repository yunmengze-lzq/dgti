# OPC Registration Prototype Plan

## Product Scope

This prototype is a runnable front-end project for the OPC competition registration platform. It covers five reviewable surfaces:

- Public portal: premium first screen, competition information, schedule, tracks, and entry points.
- Registration flow: account verification, project information, material upload, and confirmation.
- Participant workbench: application number, status, missing materials, and review feedback.
- Admin console: registration list, filters, review actions, exports, and status overview.
- H5 preview: mobile-first entry and compact registration/status experience.

The current build is a high-fidelity interactive prototype. It does not include production authentication, real upload storage, SMS, or database writes yet.

## Visual Direction

- No decorative icon rows, generic AI illustrations, or rough 3D porcelain objects.
- Public portal first viewport uses a real Jingdezhen image, restrained editorial typography, transparent navigation, and clear registration actions.
- Page rhythm follows a commercial event site: notice priority, showcase credibility, schedule clarity, track selection, news/contact, and formal organization footer.
- Palette: clean white, deep navy, official blue, Jingdezhen brick red, and small gold accents.
- Motion should remain lightweight and secondary; content hierarchy and photographic quality carry the page.

## Reference Direction

- Mature references: Apple Events, Stripe Sessions, Vercel Ship, Awwwards event sites, and the Jiangxi competition reference site.
- Skill references used for refinement: `web-typography`, `modern-web-design`, and frontend browser QA.
- Avoided direction: decorative icon grids, generic three-card feature sections, stock-like AI images, simplified porcelain cartoons, purple-blue AI glow palettes, and overbuilt 3D ornaments.

## Project Management Rules

- Keep product content in `src/data/content.js`.
- Keep integration stubs in `src/services/mockApi.js`.
- Keep reusable UI and visual systems in `src/components`.
- Keep page-level surfaces in `src/views`.
- Keep future back-end contracts in `docs/api`.
- Do not merge real backend logic into page components.

## Milestones

1. Prototype shell: routes, navigation, visual system, and responsive layout.
2. Registration MVP: form state, material checklist, draft/submit states.
3. Admin MVP: filterable table, review state drawer, export action placeholder.
4. H5 MVP: mobile flow parity and QR/share entry placeholder.
5. Backend integration: auth, SMS, file upload, application CRUD, audit logging.

## Reserved Development

- Authentication: phone/SMS login and admin RBAC.
- Storage: OSS upload, resumable upload, virus scan, preview generation.
- Notifications: SMS and email confirmation with unique application number.
- Admin review: approve, return, comment, batch export, and audit log.
- Data export: Excel export by status, track, date range, and material completeness.
- Analytics: traffic source, conversion, material completion, and review throughput.

## Current QA Notes

- Desktop, long-page, admin, H5, and 390px mobile screenshots are saved in `output/playwright/`.
- `npm run build` passes.
- The previous Three.js/React Three Fiber hero has been removed. The current public portal uses a real Jingdezhen hero image and CSS-only layout.
- The favicon is now local SVG, avoiding the previous 404.
- Latest public portal screenshots: `output/playwright/opc-redesign-home-final.png`, `output/playwright/opc-redesign-full-final.png`, and `output/playwright/opc-redesign-mobile-final.png`.
