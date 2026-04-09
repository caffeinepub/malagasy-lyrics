# Design Brief — Malagasy Lyrics

## Direction
Editorial + lyrical + commercial: A warm, welcoming music magazine aesthetic for Malagasy lyrics discovery and music sales. Dark immersive baseline with golden amber accents evoking cultural warmth. Lyrics treated as hero content; music store extends the aesthetic into commerce with full-bleed cover art, minimal text, and clear purchase CTAs.

## Palette

| Token | OKLCH | Purpose |
|:------|:------|:--------|
| Primary | 0.72 0.175 65 | Warm golden amber — action, highlights, accents |
| Secondary | 0.35 0.09 30 | Deep warm brown — supporting hierarchy |
| Success | 0.65 0.13 85 | Positive actions, purchase confirmations |
| Muted | 0.28 0 0 | Charcoal neutral — subdued text, metadata |
| Foreground | 0.92 0 0 | Near-white for body text |
| Background | 0.12 0 0 | Deep charcoal base |
| Card | 0.165 0 0 | Slightly elevated card surfaces |
| Border | 0.22 0 0 | Subtle card edges |
| Destructive | 0.63 0.22 18 | Warm red for actions requiring care |

## Typography
| Scale | Font | Usage |
|:------|:-----|:------|
| Display / H1–H2 | Fraunces (serif) | Song titles, artist names, track titles |
| Body / P | GeneralSans (sans) | Lyrics content, descriptions, interface text |
| Mono | System | Metadata, timestamps, submission IDs, prices |

## Elevation & Depth
| Zone | Surface | Style |
|:-----|:--------|:------|
| Header | Sidebar (0.165) | Minimal border-bottom; logo/nav |
| Music Store Card | Image + Overlay | Full-bleed cover (280–320px); gradient overlay; text at bottom |
| Track Detail | Card (0.165) + Border | Large cover art (400px+); player + purchase button below |
| Lyrics Card | Card (0.165) + Border | Featured floating panel with soft shadow |
| Seller Dashboard | Form + Table | Clean input zones; dashed upload areas; track list table |
| Content | Background (0.12) | Main browsing area; subtle separation via borders |
| Footer | Muted (0.28) | Simplified info + links; border-top accent |

## Component Patterns
- **Music Store Card**: Full-bleed album cover, gradient overlay (transparent→amber→card), serif title + sans artist at bottom, price in mono right-aligned top corner, hover brightens border & lifts shadow.
- **Track Detail**: Large cover art (400px minimum), audio player with custom controls, purchase button (primary amber), seller name + date in muted text below.
- **Upload Zone**: Dashed borders, muted background; hover brightens border & bg; drag-over state raises border opacity.
- **Track List Table**: Minimal header row (serif titles), data rows (sans body), publish toggle, delete action, striped hover.
- **Buttons**: Primary (amber), success (green for purchase), destructive (red); rounded corners, smooth hover.
- **Audio Player**: Custom skin with muted controls, play/pause icon, progress bar, time display in mono.

## Spacing & Rhythm
- **Margin**: 8px (xs), 16px (sm), 24px (md), 32px (lg), 48px (xl)
- **Music Store**: Card padding 16px for overlay text; grid gap 24px (3-col responsive)
- **Track Detail**: Cover 400px width; padding around player 32px; button full-width at bottom
- **Seller Form**: Field margin 16px; upload zone 80px height; table row height 48px

## Structural Zones
- **Header**: Dark sidebar surface with golden accent nav items; sticky; 'Browse Store' / 'My Tracks' links
- **Store Grid**: 3-column responsive layout (sm:1-col, md:2-col, lg:3-col); cards 280–320px width with aspect 1:1.4 ratio
- **Track Detail Page**: Left column cover art (60%); right column metadata + player + CTA (40%)
- **Seller Dashboard**: Sidebar navigation (Manage Tracks, Upload Track); main area form or track table
- **Footer**: Border-top (border/0.3); background card; minimal links + attribution

## Constraints
- Music store cards: full-bleed image with no padding; overlay gradient from transparent to card at bottom
- Seller dashboard: clean form layout, no decorative elements, functional clarity prioritized
- Prices always display in mono font for currency precision
- Audio player uses minimal custom styling; native HTML audio element with CSS skin
- No gradients except overlay on store cards and accent stripe on lyric cards
- Purchase button always primary (amber) to signal commercial action
- Success confirmations use green (--success) token exclusively

## Signature Detail
**Music Store Cards**: Album cover as full-bleed hero, semi-transparent gradient overlay (warm amber at bottom), track title in serif positioned at bottom-left, artist in smaller sans above, price in monospace top-right corner. Hover state lifts shadow and brightens border, signaling interactivity. **Seller Dashboard**: Clean, functional form interface with drag-drop upload zones styled as dashed borders; track management table with toggle for publish/unpublish state. No visual decoration—clarity and usability paramount.


