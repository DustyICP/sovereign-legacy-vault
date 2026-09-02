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

## Typography
- Display: Fraunces — wordmark, hero headline, numerals, status words (ARMED/DISARMED)
- Body: Inter — body copy, UI labels, buttons (neutral grotesque, weights 400/500/600 via @fontsource/inter)
- Mono: IBM Plex Mono — timestamps, IDs, audit rows, uppercase micro-labels (weights 400/500/600 via @fontsource/ibm-plex-mono)
- RTL fallbacks: display stacks Noto Naskh Arabic → Vazirmatn → Noto Nastaliq Urdu; body stacks Noto Sans Arabic → Noto Sans Bengali → Noto Sans Devanagari → Vazirmatn → Noto Nastaliq Urdu; mono stacks Noto Sans Arabic → Noto Sans Mono. System fonts only — no extra bundled files. Latin glyphs keep rendering in the primary faces.
- Scale: hero text-5xl md:text-7xl font-semibold tracking-tight; h2 text-2xl md:text-3xl; label text-[0.6875rem] font-medium uppercase tracking-[0.18em]; body text-sm text-base

## RTL & Direction
- dir="rtl" is set on documentElement for ar/fa/ur; layout flips via CSS logical properties (ms/me/ps/pe/start/end, text-start, border-s/e) wherever components use them.
- [dir=rtl] overrides in index.css mirror LTR-biased utilities: .text-extruded-gold emboss drop-shadows flip to step down-left (upper-right light source), .absolute.left-0 active gold bars and SwitchPage timeline progress flip to right-0, .border-r/.border-l swap, .ml-2/.mr-2/.pl-3/.pr-8 swap, .text-left/.text-right swap.
- No copy is translated — direction, layout, and glyph coverage only. Colors and the gold identity are untouched.

## Elevation & Depth
Cards float on the dark background via surface + hairline border + shadow-subtle; raised layers use shadow-elevated; gold elements carry a restrained gold-glow; primary buttons get a machined metal-edge inset.

## Structural Zones
| Zone    | Background  | Border        | Notes                                                                 |
| ------- | ----------- | ------------- | --------------------------------------------------------------------- |
| Header  | background  | border-b hairline | sticky; gold wordmark left, mono badge right                       |
| Sidebar | surface     | border-r hairline | gold active indicator; Dashboard · Beneficiaries · Legacy & Assets · The Switch · Audit Logs · Settings |
| Content | background  | —             | floating surface cards, no alternating bands                          |
| Footer  | surface     | border-t hairline | mono quiet small text                                               |

## Spacing & Rhythm
Section gaps 24–32px, card padding 20–24px, page gutter 24px (lg: 32px); micro-spacing 4/8px inside cards for label-to-value pairs.

## Component Patterns
- Buttons: primary gold-gradient fill (bg-gradient-gold), dark text, shadow-metal-edge, shadow-gold-glow on hover; secondary transparent with gold hairline border, gold text + border-brighten on hover
- Cards: bg-surface, hairline border, radius 8px (lg), shadow-subtle; hover border-brighten + shadow-gold-glow
- Badges: mono uppercase gold text on surface-raised with hairline border, radius 4px

## Motion
- Entrance: fade + 4px rise (animate-fade-rise 0.5s cubic-bezier(0.22,1,0.36,1) both), staggered ~60ms per card
- Hover: gold glow + border-brighten, 0.3s transition-smooth
- Decorative: none — static vault imagery and wordmark, no looping/ambient animation

## Constraints
- Dark mode only — no light or parchment variant; no parchment/cream/oxblood/paper-grain texture
- All colors via OKLCH tokens — no hex or named colors in code
- Max 3 fonts (Fraunces, Inter, IBM Plex Mono)
- Static, deliberate motion — no looping/ambient animation
- Preserve legal/terms/probate copy wording

## Signature Detail
The 'Sovereign Legacy' wordmark renders as extruded gold metal — gradient fill with stepped multi-layer drop-shadow lit from the upper-left — a physical strongroom plaque in an otherwise digital UI.