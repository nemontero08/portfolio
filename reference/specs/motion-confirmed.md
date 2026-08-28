# Confirmed behavior — observed on the live site

Source: direct observation of the live original site by its owner (not extracted from static HTML or DevTools). **These observations are authoritative and override any conflicting value in `reference/specs/component-motion-spec.html` or `reference/specs/motion-reveals.md`.** Where a static-HTML extraction agrees, it's noted as confirmed. Where this list doesn't give a concrete number (color, duration, easing), that value is still unknown — don't invent one; get it from DevTools against the live site.

## 1. Page load — whole page rise + fade

- Whole page rises ~150px and fades in **once, on load** — not scroll-triggered.
- **Confirms** `reference/specs/motion-reveals.md`'s `8z2bhi` ("Body") row: `opacity 0.001→1`, `translateY(150px)→0`. That file's spring params (`duration: 0.8s, bounce: 0.3`) and "at 768/tablet: no reveal" note stand — nothing here contradicts them.
- Resolves the one open question that file flagged as runtime-only: trigger is **load, not `whileInView`**.

## 2. "Sobre mí" / about section — no reveal, photo on hover only

- **No reveal animation on load or scroll.** The section is simply present/static.
- Its only motion is interactive: **hovering it reveals a photo.**
- **Overrides `reference/specs/motion-reveals.md`'s `r55wmc` ("Seccion 4") row.** That row was extracted from the `__framer__appearAnimationsContent` JSON and describes a `opacity 0.001→1` spring fade for that container. Per this observation, whatever that JSON entry produces is **not perceptible as a reveal** on the live site — treat `r55wmc` as visually static and do **not** implement a fade-in for this section. (Possible explanation, not confirmed: the spring is fast/subtle enough — `stiffness 400, damping 30` — to read as instant; or the animated container isn't the visible "sobre mí" content itself. Don't guess further — if the reveal needs reproducing at all, re-verify against the live site first.)
- The hover-triggered photo itself (which photo, crossfade vs. slide-in, duration, trigger element bounds) is **not yet observed in detail — needs DevTools.**

## 3. CV / Resume button — document animation on hover

- On hover, **a document animation appears** — described only as "a document animation appears," not merely a background/color shift.
- **Overrides/extends** `reference/specs/component-motion-spec.html`'s "Resume tile hover" row (`120`), which describes only `bg-2 → bg-3` background change plus arrow translating ~2px. That background/arrow shift may still happen alongside the document animation, but the spec is missing the document animation entirely — it's the dominant hover effect and needs to be added to the component spec.
- Candidate source: the site mirrors `lottie.host` in `reference/framer-original/assets/` — this is very likely a Lottie animation, not a CSS/Motion keyframe effect. Confirm the exact asset and trigger (play-on-hover vs. play-once-on-first-hover vs. loop) in DevTools before implementing.
- Exact animation content, duration, and loop behavior: **not yet observed — needs DevTools.**

## 4. "Let's talk" card (violet) — hover swaps text to "copy mail"

- On hover, the email text **swaps to "copy mail."**
- **Overrides** `reference/specs/component-motion-spec.html` line 110, which states: *"Hover: no visible hover treatment change beyond the browser's default pointer cursor is present in static markup."* That's now confirmed false — there is a hover-triggered text swap.
- This is a distinct interaction from the click behavior the same spec documents at line 125 (click → email replaced by "Copied!" for ~1.5s). Both appear to be real: **hover** shows a "copy mail" affordance label in place of the email, **click** shows a "Copied!" confirmation. The transition style between these three text states (email / "copy mail" / "Copied!") — crossfade, instant swap, etc. — is **not yet observed — needs DevTools.**

## 5. LinkedIn card — hover changes color

- On hover, **the card changes color.**
- **Extends** `reference/specs/component-motion-spec.html` line 121, which documents only the flourish stroke-draw animation on hover (`stroke-dashoffset` full → 0) and says nothing about a color change. Both are likely real simultaneously (color shift + flourish draw-in) — the spec is missing the color change and needs updating.
- Which element(s) recolor (card background vs. LinkedIn mark vs. label text), the target color, and duration/easing: **not yet observed — needs DevTools.**

## Summary of open items for a future DevTools pass

- "Sobre mí" hover-photo: which photo, reveal style, timing.
- Resume button: identify the actual Lottie/document asset and its hover trigger behavior.
- "Let's talk": transition style between email / "copy mail" / "Copied!" states.
- LinkedIn card: target color(s) and timing for the hover recolor.
