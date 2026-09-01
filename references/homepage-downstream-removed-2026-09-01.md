# Homepage downstream removed — 2026-09-01

**STATUS: REMOVED / REFERENCE ONLY / NOT APPROVED DESIGN**

This document mechanically records the pre-deletion homepage source truth. It is not imported, loaded, fetched, or used at runtime.

## 1. HOW → WHY transition

### Relevant DOM selectors

- `.why-ground-transition`
- `.why-transition-edge`
- `.why-spaces`, `[data-chapter="why-spaces"]`
- `.why-spaces-ground`
- `.why-spaces-grid`
- `.why-signal`, `[data-why-signal="why-signal-continuous"]`
- `.sig-halo`, `.sig-glow`, `.sig-core`

### Camera seam

The How journey ends and the Why journey begins at `(960,5870)`.

```js
cameraStart: { x: 960, y: 5870 },
cameraEnd: { x: 1160, y: 6970 },
cameraPath: "M 960 5870 L 960 6313 Q 960 6355 1002 6355 L 1160 6355 L 1160 6970",
```

### Signal seam/path

The pre-deletion How continuation metadata and visible path continued to `(1100,6180)`:

```js
continuation: { x: 1100, y: 6180 }
```

```svg
M 1160 5220 V 5358 Q 1160 5400 1202 5400 H 1918 Q 1960 5400 1960 5442 V 5918 Q 1960 5960 1918 5960 H 1142 Q 1100 5960 1100 6002 V 6180
```

The live DOM Why signal began at `(1100,6180)` and ended at `(1160,7230)`:

```svg
M 1100 6180 L 1100 6410 C 1100 6450 1135 6470 1180 6470 C 1220 6470 1240 6500 1240 6530 C 1240 6560 1215 6585 1170 6600 C 1135 6612 1120 6635 1120 6665 C 1120 6695 1145 6715 1190 6725 C 1235 6735 1260 6760 1260 6790 C 1260 6820 1235 6840 1190 6850 C 1145 6860 1120 6885 1120 6915 C 1120 6945 1145 6965 1190 6975 C 1235 6985 1250 7010 1230 7035 C 1215 7055 1185 7070 1160 7090 L 1160 7230
```

The pre-deletion configuration recorded this Why signal path (with its existing coordinate discrepancy) verbatim:

```js
d: "M 1100 6370 L 1100 6600 C 1100 6640 1135 6660 1180 6660 C 1220 6660 1240 6690 1240 6720 C 1240 6750 1215 6775 1170 6790 C 1135 6802 1120 6825 1120 6855 C 1120 6885 1145 6905 1190 6915 C 1235 6925 1260 6950 1260 6980 C 1260 7010 1235 7030 1190 7040 C 1145 7050 1120 7075 1120 7105 C 1120 7135 1145 7155 1190 7165 C 1235 7175 1250 7200 1230 7225 C 1215 7245 1185 7260 1160 7280 L 1160 7420",
start: { x: 1100, y: 6180 },
end: { x: 1160, y: 7230 }
```

### Background/transition elements

```html
<div class="why-ground-transition" aria-hidden="true"><svg viewBox="0 0 2340 180" preserveAspectRatio="none"><defs><linearGradient id="whyDarkGround" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#150826"></stop><stop offset="1" stop-color="#0b0413"></stop></linearGradient></defs><rect width="2340" height="180" fill="#eae3eb"></rect><path d="M 0 88 C 290 104 520 72 790 92 C 1050 110 1300 116 1570 94 C 1830 73 2080 105 2340 87 L 2340 180 L 0 180 Z" fill="url(#whyDarkGround)"></path><path class="why-transition-edge" d="M 0 88 C 290 104 520 72 790 92 C 1050 110 1300 116 1570 94 C 1830 73 2080 105 2340 87"></path></svg></div>
```

It was positioned at `left:0; top:640rem; width:234rem; height:18rem`. The Why ground was `radial-gradient(38rem 34rem at 50% 42%,rgba(90,45,138,.13),transparent 72%),linear-gradient(180deg,#150826,#0b0413 72%)`; the grid used 4rem × 4rem lines and a radial mask.

### Route activation behavior

At the final How stage, positive accumulated input called `activateWhyJourney()`. That function settled How at stage 5, enabled the Why journey, changed `activeRoute` from `howWork` to `whySpaces`, removed `route-how-work`, and added `route-why-spaces`. Negative input at the beginning of Why called `restoreHowHandover()`, which reset Why, restored the full How signal and Handover emphasis, changed the route back to `howWork`, and moved the camera to the Why `cameraStart` `(960,5870)`.

## 2. WHY SPACES SOLUTIONS

### Exact content

Kicker:

> WHY SPACES SOLUTIONS

Headline:

> One partner.  
> Multiple disciplines.  
> One accountable delivery model.

Support copy:

> Engineer the right solution, execute it with control, and leave the customer with a system they can operate with confidence.

Proof/value items (verbatim):

```text
01
One Partner,
Multiple Disciplines
Data center facilities, IT infrastructure and AV can be coordinated under one accountable delivery model.

02
Design-to-Operation
Capability
Support can start from assessment and design and continue through build, commissioning and lifecycle support.

03
Governed Project
Delivery
Scope, prerequisites, risks, changes, evidence and acceptance are managed throughout the engagement.

04
Evidence-Based
Handover
Customers receive practical documentation, validation outputs, open actions and closure confirmation.
```

### Chapter origin/size

```js
{ key: "why-spaces", type: "dark", x: 0, y: 6220, w: 2340, h: 1000 }
```

### Camera path/stops

```js
cameraStart: { x: 960, y: 5870 },
cameraEnd: { x: 1160, y: 6970 },
cameraPath: "M 960 5870 L 960 6313 Q 960 6355 1002 6355 L 1160 6355 L 1160 6970",
cameraStops: [
  { key: "entry", x: 960, y: 5870 },
  { key: "intro", x: 1160, y: 6455 },
  { key: "proof", x: 1160, y: 6755 },
  { key: "exit", x: 1160, y: 6970 }
]
```

### Signal path

See “Signal seam/path” above. The DOM key was `why-signal-continuous`; it had halo, glow, and core paths. CSS used `whyHaloGradient`, `whyGlowGradient`, and `whyCoreGradient`.

### Content coordinates

```css
.why-kicker{left:84rem;top:4.5rem}
.why-headline{left:84rem;top:8.5rem;width:25rem}
.why-support{left:84rem;top:20rem;width:25rem}
.why-proof-01{left:84rem;top:34.5rem}
.why-proof-02{left:129.5rem;top:34.5rem;width:20.5rem}
.why-proof-03{left:84rem;top:53rem}
.why-proof-04{left:129.5rem;top:53rem;width:20.5rem}
```

### Reveal behavior

`renderWhyJourney(progress)` clamped progress to 0–1. Signal reveal distance was `0` through progress `0.02`, linearly mapped from `0.02` to `0.98`, and forced to the full SVG `getTotalLength()` at `0.98`. Each run received `strokeDashoffset = run.length - revealDistance`. Camera rendering used sampled `cameraPath` length and `runtime.moveCameraTo(getPointAtLength(...), 0, "none")`.

## 3. CURRENT FINAL CTA

### Exact content

Kicker:

> START A PROJECT

Headline:

> Let us build the right  
> solution for your space.

Support copy:

> Share your scope, site, timeline, technical environment and business objective.

CTA text/href:

```html
<a class="final-cta-action" href="contact.html">START A PROJECT&nbsp; →</a>
```

Five brief items (verbatim):

```text
01 · SCOPE
02 · SITE
03 · TIMELINE
04 · TECHNICAL ENVIRONMENT
05 · BUSINESS OBJECTIVE
```

Header labels were `PROJECT BRIEF` and `05 INPUTS`.

### Chapter origin/size

```js
{ key: "final-cta", type: "dark", x: 0, y: 7220, w: 2340, h: 360 }
```

### Camera path/stops

```js
cameraStart: { x: 1160, y: 6970 },
cameraEnd: { x: 1160, y: 7440 },
cameraPath: "M 1160 6970 L 1160 7440",
cameraStops: [
  { key: "entry", x: 1160, y: 6970 },
  { key: "cta", x: 1160, y: 7440 }
]
```

### Signal geometry

Live DOM:

```svg
M 1160 7230 L 1160 7270 C 1160 7292 1175 7310 1200 7320
```

Pre-deletion configuration (verbatim, including its existing coordinate discrepancy):

```js
d: "M 1160 7420 L 1160 7460 C 1160 7482 1175 7500 1200 7510",
start: { x: 1160, y: 7230 },
end: { x: 1200, y: 7320 }
```

`renderCtaJourney(progress)` revealed no signal through `0.08`, linearly revealed it from `0.08` to `0.62`, and forced full SVG `getTotalLength()` at `0.62`.

## 4. CURRENT HOMEPAGE FOOTER

### Complete visible copy

```text
NO LIMITS TO YOUR OWN SPACE
Build the space you need.
Spaces Solutions connects Data Center Facilities, IT Infrastructure and Audiovisual Solutions under one coordinated delivery model.
START A PROJECT
DATA CENTER FACILITIES · IT INFRASTRUCTURE · AUDIOVISUAL SOLUTIONS
© 2026 SPACES SOLUTIONS
```

### Navigation labels/hrefs

```text
Home — index.html
Services — services.html
Control & Command Rooms — service-control-command-rooms.html
About — about.html
Contact — contact.html
START A PROJECT — contact.html
```

### Selector/class and layout structure

```html
<footer class="final-footer">
  <div class="final-footer-inner">
    <div class="final-footer-copy">
      <p class="final-footer-eyebrow">...</p>
      <p class="final-footer-headline">...</p>
      <p class="final-footer-lead">...</p>
    </div>
    <nav class="final-footer-nav" aria-label="Footer navigation">...</nav>
    <a class="final-footer-project" href="contact.html">...</a>
    <div class="final-footer-row final-footer-row-secondary">
      <p>...</p>
      <p>...</p>
    </div>
  </div>
</footer>
```

Desktop layout: footer at `left:0; top:29rem; width:234rem; height:7rem`; inner content at `left:83.5rem; top:0; width:66rem; height:7rem`; copy at left, navigation and project link at right, and the secondary row at `top:5rem`. Mobile layout changed the footer and nested elements to relative flow.

## 5. Runtime selectors/configuration/functions removed

### DOM/selectors

- `[data-chapter="why-spaces"]`, `.why-spaces*`, `.why-proof*`
- `.why-ground-transition`, `.why-transition-edge`
- `[data-why-signal="why-signal-continuous"]`, `.why-signal`
- `[data-chapter="final-cta"]`, `.final-cta*`
- `.project-brief*`
- `[data-cta-signal="cta-signal-continuous"]`, `.cta-signal`
- `footer.final-footer`, `.final-footer*`
- `#footerMark`, `.final-footer-wordmark` lookup/copy script
- `#whyCoreGradient`, `#whyGlowGradient`, `#whyHaloGradient`
- `body.route-why-spaces*`, `body.route-final-cta*`

### Configuration

- `SPACES_HOME.chapters.whySpaces`
- `SPACES_HOME.chapters.finalCta`
- `SPACES_HOME.branchJourneys.whySpaces`
- `SPACES_HOME.branchJourneys.finalCta`
- old overall world height `7580`
- old How continuation `(1100,6180)` and downstream tail metadata

### Functions and runtime branches

- `bindWhyJourney`, `renderWhyJourney`, `killWhyRenderTween`, `renderWhyDistance`, `tweenWhyRenderedDistance`
- `activateWhyJourney`, `restoreHowHandover`, `moveWhyJourney`
- `bindCtaJourney`, `renderCtaJourney`, `killCtaRenderTween`, `renderCtaDistance`, `tweenCtaRenderedDistance`
- `activateFinalCtaJourney`, `restoreWhyExit`, `moveCtaJourney`
- Why/CTA reverse-to-hub animation branches and state resets
- wheel/touch routing for `activeRoute === "whySpaces"` and `activeRoute === "finalCta"`
- initialization calls `bindWhyJourney()` and `bindCtaJourney()`
- route class cleanup for `route-why-spaces` and `route-final-cta`

