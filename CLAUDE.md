# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` — run dev server (`ng serve`)
- `npm run build` — production build; runs `scripts/set-env.js` first, then `ng build --configuration production`
- `npm run build:dev` — build without env-var injection or production optimizations
- `npm run watch` — dev-config build with `--watch`
- `npm test` — Karma/Jasmine unit tests (single run: add `--watch=false`; single file: use Karma's `--include` or focus with `fdescribe`/`fit` in the spec)

## Architecture

Single-page Angular 18 portfolio (standalone components, no NgModules). `AppComponent` composes one page by stacking feature sections in order: `NavBar → Hero → Experience → Projects → TechStack → Certificates → Education → AboutMe → Footer`. There is no routing (`app.routes.ts` is an empty array) — navigation is same-page anchor scrolling handled by `nav-bar`/`menu.service.ts`.

Each feature lives in its own folder under `src/app/<feature>/` as a self-contained standalone component (`.ts` + `.html` + `.scss`), e.g. `projects`, `experience`, `tech-stack`. Content-heavy components (e.g. `ProjectsComponent`) hardcode their data as TS arrays typed against `src/models/*.ts` (`Project`, `Experience`, `Education`, `Techology`) rather than fetching from a backend — this is a static content site, there is no API layer.

Cross-cutting state lives in root-provided services using Angular signals + an `effect()` that syncs to `localStorage` and applies DOM side effects:
- `DarkModeService` (`dark-mode.service.ts`) — toggles the `dark` class on `<html>`.
- `MultiLangService` (`multi-lang.service.ts`) — wraps `@ngx-translate/core`, drives `TranslateService.use()`. Translation strings live in `src/assets/i18n/{en,es}.json`; templates use the `translate` pipe/directive from `TranslateModule`.
- `menu.service.ts` — mobile nav open/close state.

`ScrollAnimateDirective` (`src/app/directives/scroll-animate.directive.ts`) uses `IntersectionObserver` to add fade/animation classes on scroll-into-view; applied declaratively via `appScrollAnimate` attribute in templates. `HighlightKeywordsPipe` highlights a hardcoded keyword list inside translated project descriptions.

Styling: Tailwind + SCSS per-component, dark mode via the `dark` class strategy (see `tailwind.config.js`), Angular Material only for its prebuilt theme CSS (`azure-blue`).

### Environment variables (EmailJS)

The contact form's EmailJS credentials are injected at build time, not committed as real values:
- `src/environments/environment.ts` (dev) and `environment.prod.ts` (prod) hold `emailjs.{serviceId,templateId,publicKey}`.
- `scripts/set-env.js` runs before every production build, reading `EMAILJS_SERVICE_ID` / `EMAILJS_TEMPLATE_ID` / `EMAILJS_PUBLIC_KEY` from the environment and overwriting `environment.prod.ts` with real values (falls back to placeholder strings if unset).
- Angular's `fileReplacements` (see `angular.json`) swaps `environment.ts` for `environment.prod.ts` only in the `production` configuration.
- On Vercel, these three vars are set in the dashboard; see `VERCEL_SETUP.md` for the full setup and for locally excluding the environment files from git tracking via `git update-index --assume-unchanged`.
