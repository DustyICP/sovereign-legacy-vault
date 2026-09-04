# Design Brief

## Direction
The Vault — a self-sovereign digital inheritance product styled as a physical bank vault door: cold dark steel surfaces with warm gold rim-light.

## Tone
Industrial/utilitarian luxury — machined-metal precision: near-black steel, hairline borders, a single warm gold accent; restrained and deliberate, built to be trusted with a legacy.

## Differentiation
The extruded-metal gold wordmark and vault-door hero make the interface read as a physical strongroom, not a fintech dashboard.

## Color Palette
| Token           | OKLCH        | Role                              |
| --------------- | ------------ | --------------------------------- |
| background      | 0.135 0.012 255 | near-black steel page base     |
| surface         | 0.17 0.014 255  | raised steel card/sidebar      |
| surface-raised  | 0.205 0.016 255 | popovers, menus, hover-raised  |
| foreground      | 0.93 0.012 85   | warm-tinted primary text       |
| muted-foreground| 0.56 0.012 80   | secondary text, quiet labels   |
| border          | 0.26 0.014 255  | hairline steel dividers        |
| primary         | 0.72 0.16 85    | deep gold — CTAs, active states|
| accent          | 0.8 0.14 85     | bright gold — highlights, glow |
| destructive     | 0.55 0.2 25     | errors, revoked access         |
| success         | 0.62 0.15 150   | check-in confirmed states      |
| tab-bar         | 0.15 0.012 255 | tab bar steel strip            |
| tab-foreground  | 0.56 0.012 80   | inactive tab mono text         |
| tab-active      | 0.72 0.16 85    | active tab gold text/indicator |
| beneficiary-card| 0.17 0.014 255 | sidebar contact card surface   |
| asset-row       | 0.17 0.014 255 | wallet asset row surface       |
| qr-panel        | 0.15 0.012 255 | receive-address/QR panel       |
| slider-track    | 0.26 0.014 255 | percentage slider track        |
| slider-fill     | 0.72 0.16 85    | percentage slider gold fill    |
| wallet-badge    | 0.17 0.014 255 | OISY connected badge/send-form surface |
| wallet-badge-accent | 0.72 0.16 85 | OISY account ID gold text      |
| wallet-badge-idle | 0.56 0.012 80  | OISY quiet labels, placeholders |
| send-input      | 0.15 0.012 255 | send form dark steel input      |
| send-input-focus| 0.78 0.15 85    | send input gold focus ring      |
| approval-wait   | 0.8 0.14 85     | waiting-for-approval gold       |
| disconnect      | 0.55 0.2 25     | disconnect destructive red      |

## Typography
- Display: Fraunces — wordmark, hero headline, numerals, status words (ARMED/DISARMED), asset symbols, param values
- Body: Inter — body copy, UI labels, buttons (neutral grotesque, weights 400/500/600 via @fontsource/inter)
- Mono: IBM Plex Mono — timestamps, IDs, audit rows, uppercase micro-labels, tab labels, contact values, receive addresses, USD values (weights 400/500/600 via @fontsource/ibm-plex-mono)
- RTL fallbacks: display stacks Noto Naskh Arabic → Vazirmatn → Noto Nastaliq Urdu; body stacks Noto Sans Arabic → Noto Sans Bengali → Noto Sans Devanagari → Vazirmatn → Noto Nastaliq Urdu; mono stacks Noto Sans Arabic → Noto Sans Mono. System fonts only — no extra bundled files. Latin glyphs keep rendering in the primary faces.
- Scale: hero text-5xl md:text-7xl font-semibold tracking-tight; h2 text-2xl md:text-3xl; label text-[0.6875rem] font-medium uppercase tracking-[0.18em]; body text-sm text-base

## RTL & Direction
- dir="rtl" is set on documentElement for ar/fa/ur; layout flips via CSS logical properties (ms/me/ps/pe/start/end, text-start, border-s/e) wherever components use them.
- [dir=rtl] overrides in index.css mirror LTR-biased utilities: .text-extruded-gold emboss drop-shadows flip to step down-left (upper-right light source), .absolute.left-0 active gold bars and SwitchPage timeline progress flip to right-0, .border-r/.border-l swap, .ml-2/.mr-2/.pl-3/.pr-8 swap, .text-left/.text-right swap, and .tab-item active gold indicator flips from the left to the right edge.
- No copy is translated — direction, layout, and glyph coverage only. Colors and the gold identity are untouched.

## Elevation & Depth
Cards float on the dark background via surface + hairline border + shadow-subtle; raised layers use shadow-elevated; gold elements carry a restrained gold-glow; primary buttons get a machined metal-edge inset; the active tab indicator carries a soft upward gold glow (shadow-tab-indicator).

## Structural Zones
| Zone         | Background  | Border        | Notes                                                                 |
| ------------ | ----------- | ------------- | --------------------------------------------------------------------- |
| Header       | background  | border-b hairline | sticky; gold wordmark left, mono badge right                       |
| Tab Bar      | tab-bar     | border-b hairline | horizontal strip under header; 4 tabs OVERVIEW · WALLET · BENEFICIARY · TIMELINES; gold indicator under active; scrollable on mobile |
| Sidebar      | surface     | border-r hairline | narrowed to beneficiary contact card + Settings link; gold active indicator |
| Content      | background  | —             | floating surface cards, no alternating bands                          |
| Footer       | surface     | border-t hairline | mono quiet small text                                               |

## Spacing & Rhythm
Section gaps 24–32px, card padding 20–24px, page gutter 24px (lg: 32px); micro-spacing 4/8px inside cards for label-to-value pairs; tab bar items padded 14px vertical / 16px horizontal with 0.18em mono letter-spacing.

## Component Patterns
- Buttons: primary gold-gradient fill (bg-gradient-gold), dark text, shadow-metal-edge, shadow-gold-glow on hover; secondary transparent with gold hairline border, gold text + border-brighten on hover
- Cards: bg-surface, hairline border, radius 8px (lg), shadow-subtle; hover border-brighten + shadow-gold-glow
- Badges: mono uppercase gold text on surface-raised with hairline border, radius 4px
- Tab bar: mono uppercase inactive tabs (tab-foreground) → gold on hover/active; gold gradient indicator bar + upward glow under active tab
- Sidebar beneficiary card: surface-raised, hairline border, mono contact labels + values; Settings as mono uppercase link
- Snapshot cards: surface-raised, hairline border, gold hover border + glow; Fraunces numerals
- Wallet asset rows: surface-raised, hairline border, gold hover; Fraunces symbol + mono USD value
- QR panel: dark steel panel, hairline border, mono receive address, bordered QR frame
- Percentage slider: gold gradient fill on steel track, gold-gradient thumb; paired mono percent input
- Timeline params: surface-raised card, mono label + Fraunces value per parameter
- Connect Wallet: gold-gradient primary CTA (bg-gradient-gold), dark text, metal-edge inset + gold-glow hover, mono uppercase label
- Connected OISY badge: steel surface, hairline border, gold pulsing dot + mono account ID in gold, mono uppercase label
- Disconnect: transparent destructive-tinted button, red hairline border, red text; red fill wash on hover
- Send form: steel surface card, hairline border, dark steel inputs (send-field) with gold focus ring; Fraunces amount, mono labels + balance hint; invalid inputs get red border
- Waiting-for-approval: gold approval-panel with gold hairline border + glow, mono uppercase label, gold spinner + pulsing gold dot

## Motion
- Entrance: fade + 4px rise (animate-fade-rise 0.5s cubic-bezier(0.22,1,0.36,1) both), staggered ~60ms per card
- Hover: gold glow + border-brighten, 0.3s transition-smooth; tab color shift 0.3s
- Waiting-for-approval: gold spinner (approval-spin 1s linear infinite) + pulsing gold dot (approval-pulse 1.6s ease-in-out) — the only looping motion, reserved for the live OISY approval wait so it reads as an active pending state, not decoration
- Decorative: none — static vault imagery and wordmark, no ambient animation

## Constraints
- Dark mode only — no light or parchment variant; no parchment/cream/oxblood/paper-grain texture
- All colors via OKLCH tokens — no hex or named colors in code
- Max 3 fonts (Fraunces, Inter, IBM Plex Mono)
- Static, deliberate motion — no looping/ambient animation
- Preserve legal/terms/probate copy wording
- Navigation is a horizontal tab bar under the header; sidebar narrows to beneficiary contact info + Settings only

## Signature Detail
The 'Sovereign Legacy' wordmark renders as extruded gold metal — gradient fill with stepped multi-layer drop-shadow lit from the upper-left — a physical strongroom plaque in an otherwise digital UI.
