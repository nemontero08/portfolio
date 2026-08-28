# Motion reveals — `reference/framer-original/index.html`

Extracted directly from the captured HTML — no values were guessed. Every number below is either an inline `style` attribute on an element with `data-framer-appear-id`, or a value read out of the `__framer__appearAnimationsContent` JSON blob that Framer embeds in the page itself. Line numbers refer to `reference/framer-original/index.html` as captured (the file is minified; these three lines each hold most of the document).

**Correction to `reference/specs/component-motion-spec.html`:** that spec's reveal row (line ~124) states the spring constants are "not recoverable... no JS spring constants exposed." That's not accurate for this page — the exact spring parameters for both reveals *are* present in static HTML, in the `__framer__appearAnimationsContent` `<script type="framer/appear">` tag (line 231). Per `CLAUDE.md`, the HTML wins where it disagrees with a spec — treat the "Spring params" values below as source of truth for these two reveals.

## How the mechanism works

- Every animated element is rendered twice into the SSR HTML: once with an inline `style="opacity:0.001;transform:translateY(...)"` (the pre-animation frame, so there's no flash of fully-visible content), and it carries `data-framer-appear-id="<id>"`.
- Line 231: `<script type="framer/appear" id="__framer__appearAnimationsContent">` — a JSON object keyed by appear-id, then by breakpoint hash (or `"default"`), holding `initial` and `animate` keyframes plus the `transition` (spring params) for that id at that breakpoint. A breakpoint key set to `null` means that id has **no** reveal animation at that breakpoint — the element just renders in its final state.
- Line 232: `<script type="framer/appear" id="__framer__breakpoints">` — maps each breakpoint hash to its media query (same table the page already uses for its `hidden-<hash>` responsive classes):

  | hash | media query | ~ viewport label |
  |---|---|---|
  | `72rtr7` | `(min-width: 1440px)` | 1440 desktop |
  | `7oye4y` | `(min-width: 1024px) and (max-width: 1439.98px)` | 1024 laptop |
  | `5u7pj5` | `(min-width: 768px) and (max-width: 1023.98px)` | 768 tablet |
  | `jz6qyq` | `(min-width: 425px) and (max-width: 767.98px)` | 425 mobile-L |
  | `ozure3` | `(min-width: 375px) and (max-width: 424.98px)` | 375 mobile |
  | `1h9x2qg` | `(max-width: 374.98px)` | <375 mobile-S |

- Also on line 232, an inline bootstrap script runs on load, reads `window.__framer__appearAnimationsContent`, resolves the active breakpoint hash, and calls `animator.animateAppearEffects(...)` / `animator.startOptimizedAppearAnimation(...)` — that's Framer's internal wrapper around Motion's spring animator. **What is *not* in this script:** the trigger condition (page-load vs. scroll-into-view / `whileInView`, any IntersectionObserver `margin`/`amount`, and `once` vs. repeat). That logic lives compiled into the `.mjs` bundles under `assets/framerusercontent.com/sites/.../`, not in this bootstrap. Treat trigger type as **runtime-only — needs DevTools**.

## Reveal table

| Appear ID | `data-framer-name` | Targets / content | Initial opacity | Initial transform | Final opacity | Final transform | Animation type | Duration | Spring params | Delay | Breakpoint notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `8z2bhi` | `Body` | Top-level page wrapper — the entire main content column (all numbered "Seccion N" blocks nest inside it) | `0.001` | `translateY(150px)` | `1` | `translateY(0)` (i.e. `y: 0`) | spring (`type: "spring"`) | `0.8`s (Motion duration+bounce spring form) | `bounce: 0.3` | `0` | Identical at `72rtr7`, `7oye4y`, `jz6qyq`, `ozure3`, `1h9x2qg`. **At `5u7pj5` (768 tablet) the entry is `null` — no reveal at this breakpoint; the tablet SSR variant of this element renders with no `style` attribute at all (confirmed in markup), i.e. it's simply visible immediately.** |
| `r55wmc` | `Seccion 4` | "Seccion 4" block containing the "sobre mi" (about-me) sub-section — a `DESIGNER` text badge and a cursor-follow container (`data-framer-cursor="11i8zds"`) | `0.001` | `none` (fade only, no translate) | `1` | `none` | spring (`type: "spring"`) | not fixed — physics-resolved (see spring params) | `stiffness: 400`, `damping: 30`, `mass: 1` | `0` | Identical across **all six** breakpoints, including `5u7pj5` — unlike `8z2bhi`, this reveal is active on tablet too. |
| `n0ccwk` | `Light` | Framer's own "Made in Framer" watermark badge (`#__framer-badge-container`, links to framer.com) — platform chrome, not portfolio content | `0.001` | `translateY(10px)` | runtime-only — needs DevTools | runtime-only — needs DevTools | runtime-only — needs DevTools | runtime-only — needs DevTools | runtime-only — needs DevTools | runtime-only — needs DevTools | No entry for `n0ccwk` exists in `__framer__appearAnimationsContent` (only `8z2bhi` and `r55wmc` are keyed there) — this badge's reveal is driven by a separate Framer badge script bundle, not by the JSON this page exposes. Out of scope for the rebuild per `CLAUDE.md` (reproduce the *site*, not Framer's watermark), included here only for completeness. |

## Stagger

No orchestrated stagger exists on this page: only two content reveals (`8z2bhi`, `r55wmc`) are defined, each with its own independent `data-framer-appear-id` and `delay: 0`. There's no shared parent transition or per-child delay offset in the JSON — each element's reveal fires on its own trigger, not as part of a sequenced group. If the live site *looks* staggered when scrolling (e.g. child text inside "Seccion 4" appearing after the badge/heading), that's most likely a separate scroll-linked effect not represented by `data-framer-appear-id` at all — confirm in DevTools before assuming it's part of this mechanism.

## Motion (React) equivalents (for implementation reference only — not verified against the live runtime)

```jsx
// 8z2bhi — Body
<motion.div
  initial={{ opacity: 0.001, y: 150 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ type: "spring", duration: 0.8, bounce: 0.3, delay: 0 }}
/>
// NOTE: apply only at 1440/1024/425/375/<375 — at 768 (tablet) render final state directly, no animation.

// r55wmc — Seccion 4 / "sobre mi"
<motion.div
  initial={{ opacity: 0.001 }}
  animate={{ opacity: 1 }}
  transition={{ type: "spring", stiffness: 400, damping: 30, mass: 1, delay: 0 }}
/>
```

Trigger (`whileInView` vs. load-only `animate`) still needs confirming from the live site in DevTools before wiring these up — see the "runtime-only" note above.
