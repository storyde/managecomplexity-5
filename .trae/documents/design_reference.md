## Full Style Reference (Future-Proof)

This document is the design source of truth for the chat interface in `out/html/`.  
It captures current implementation details and sets guardrails for future UI work.

## Quick Reference
- Use `Quicksand` for body text and `Cinzel` for display/headings.
- Use only tokenized spacing, radius, motion, and color values.
- Support both themes for every new style; no light-only additions.
- Keep chat centered and constrained (`.chat-container`, `max-width: 680px`).
- Preserve glass shell style on header, sidebars, and utility surfaces.
- Keep player choices right-biased and visually consistent with current chip pattern.
- Maintain bubble taxonomy (`me`, `character`, `elements`, `headline`, `paper`).
- Add narrative voices through JS prefix mapping plus matching CSS classes.
- Keep keyboard support for all actionable UI, including choices.
- Preserve visible focus states and reduced-motion compatibility.
- Keep hover/press motion subtle; avoid heavy animation by default.
- Ensure touch usability with minimum target sizing and mobile sidebar behavior.
- Reuse existing classes and patterns before creating new structure.
- Update both design tokens and this file when visual standards change.

## 1) Design Intent
- Keep the interface calm, readable, and story-first.
- Use a modern glassmorphism shell around a narrative chat core.
- Preserve strong contrast and keyboard/touch accessibility in every state.
- Keep light and dark mode parity; every new visual change must support both.

## 2) Foundations

### 2.1 Typography
- **Body family:** `Quicksand` (`--font-family-body`).
- **Display family:** `Cinzel` (`--font-family-display`).
- **Scale:** Fluid `clamp(...)` tokens `--font-size-xxs` to `--font-size-xxl`.
- **Readability baseline:** `line-height: 1.7`, kerning enabled, smoothing enabled.
- **Narrative default:** Story paragraphs in `#content > p` are centered and large (`--font-size-lg`).

### 2.2 Spacing and Radius
- **Spacing tokens:** `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`, `--space-xxl`.
- **Radius tokens:** `--radius-xs` through `--radius-xl`, plus `--radius-full`.
- **Rule:** Prefer tokens over hardcoded pixel values for any new component.

### 2.3 Motion
- **Transition tokens:** `--transition-fast`, `--transition-medium`, `--transition-smooth`.
- **Entry animation:** `@keyframes messageSlideIn` for chat line appearance.
- **Special animation:** `@keyframes lighthouseGlow` for robot voice accent.
- **Reduced motion:** All non-essential motion is disabled under `prefers-reduced-motion: reduce`.

## 3) Color and Theme System

### 3.1 Theme Architecture
- Light mode tokens live in `:root`.
- Dark mode overrides live in `.theme-dark`.
- Theme classes are applied to both `html` and `body` via `setTheme(...)` in `game.js`.

### 3.2 Semantic Token Groups
- **Surfaces:** `--secondary-bg`, `--header-bg`, `--glass-bg`.
- **Text:** `--text-primary`, `--text-secondary`, `--text-muted`, `--text-light`, `--text-inverse`.
- **Accent:** `--accent-blue`, `--accent-sky`, `--accent-navy`, `--accent-rust`.
- **Status:** `--success-green`, `--warning-coral`, `--danger-rust`, `--info-yellow`.
- **Borders and focus:** `--border-color`, `--border-light`, `--focus-ring`.

### 3.3 Theming Behavior
- Theme preference persists in `localStorage` key `game-theme`.
- Initial render reads stored preference, otherwise respects system color preference.
- `meta[name="theme-color"]` is synced to theme for browser UI consistency.

## 4) Layout and Structure

### 4.1 Shell Layout
- Fixed top header (`.top-header`), fixed left/right sidebars (`.sidebar-left`, `.sidebar-right`), central chat area (`.chat-main`).
- Chat column is centered and constrained (`.chat-container`, `max-width: 680px`).
- Main content starts below fixed header using `--header-height`.

### 4.2 Responsive Rules
- **Desktop (`min-width: 769px`):** Sidebars visible by default; each can be hidden independently.
- **Mobile (`max-width: 768px`):** Sidebars become off-canvas slide panels and open with toggles/swipes.
- Overlay (`#sidebar-overlay`) dims center content while a sidebar is active on mobile.

## 5) Background System
- `.app-bg` uses layered radial and linear gradients to build the harbor aesthetic.
- Dark mode swaps to moonlit/starfield layering through `.theme-dark .app-bg`.
- Background is fixed and non-interactive (`pointer-events: none`) for stability.

## 6) Header and Controls
- Header is frosted glass with blur, soft border, and depth shadow.
- Title (`.game-title h1`) is centered and non-clickable to avoid interaction conflicts.
- Top control buttons (`.header-btn`) and utility buttons (`.sidebar-header-btn`) share interaction language:
  - Hover/focus lift and accent tint.
  - Active press return.
  - Consistent minimum touch target size.

## 7) Chat Message System

### 7.1 Row Types
- `.chat-line.me`: Player content, right aligned.
- `.chat-line`: Standard character line with avatar + sender name.
- `.chat-line.elements`: Centered system/element messages.
- `.chat-line.headline`: Centered headline treatment.
- `.chat-line.paper`: Centered paper/card treatment.

### 7.2 Bubble Base
- `.bubble` sets shared structure: spacing, rounded shape, wrapping behavior, blur, border, and elevation.
- Hover state raises bubble slightly with stronger shadow.

### 7.3 Bubble Variants
- **Player:** `.bubble.me` with warm gradient and stronger contrast.
- **Character:** `.bubble.cfa`, `.bubble.cve`, `.bubble.cst`, `.bubble.cdr`, etc.
- **Robot display:** `.bubble.crd` for centered display text.
- **Robot voice:** `.bubble.crv`, `.bubble.crw` with glowing left rail.
- **Paper:** `.bubble.cpa` paper-like panel for insert-style narrative content.

### 7.4 Headlines
- `.bubble.ch1`: banner with double borders and decorative symbols.
- `.bubble.ch2`: italic editorial style with left rule.
- `.bubble.ch3`: framed all-caps style with decorative symbols.

### 7.5 Sender Labeling
- `.bubble-sender-name` is uppercase micro-label text.
- Character color coding exists for both light and dark modes.
- New character IDs should define both sender-name color and bubble style fallback.

## 8) Choice System
- Choice list is right-biased (`ul.choices`) to align with player action flow.
- Choice chip (`ul.choices li`) is a pill with ghost background in idle state.
- Hover/focus/selected state uses orange gradient with white text and elevated shadow.
- `.unavailable` disables pointer interaction and applies muted visual treatment.
- Subtitle text (`div.subtitle`) inherits choice state color behavior.

## 9) Content Semantics
- `em`: medium-weight italic emphasis with secondary text tone.
- `strong`: semi-bold emphasis with subtle text shadow and overflow protection.
- `blockquote`: accent left rule with inset panel treatment.
- `.attribution`, `cite`: right-aligned uppercase attribution style.
- `details/summary`: styled expandable sections with custom disclosure indicator and focus treatment.

## 10) Utility UI
- **Loading indicator:** Fixed top-center glass chip with spinner (`.loading-indicator`).
- **Notifications:** Right-side toast system with semantic border color (`.notification-*`).
- **Save/Load modal:** Frosted dialog with semantic save/delete buttons and responsive table.
- **Read marker:** `#read-marker` separator with centered anchor label and pulse.

## 11) Accessibility and Input
- Landmarks and labels are applied in markup and reinforced in JS.
- All interactive controls support keyboard activation (`Enter` / `Space` where needed).
- Choice keyboard navigation supports `ArrowUp`/`ArrowDown`.
- Focus-visible rings are defined across primary controls and choices.
- Touch gestures on mobile support edge-swipe open/close for sidebars.

## 12) Prefix-to-Style Mapping (Narrative Renderer)
`displayParagraphHTML(...)` maps leading text prefixes to UI classes:
- `Me:` → `.chat-line.me` + `.bubble.me`
- `Facilyn:` → `.bubble.cfa`
- `Vendor:` → `.bubble.cve`
- `Stranger:` → `.bubble.cst`
- `Drawer:` → `.bubble.cdr`
- `RoboDisplay:` → `.bubble.crd`
- `RoboVoice:` → `.bubble.crv`
- `Headline1:` → `.bubble.ch1`
- `Headline2:` → `.bubble.ch2`
- `Headline3:` → `.bubble.ch3`
- `Paper:` → `.bubble.cpa`

When introducing a new narrative voice:
- Add prefix mapping in JS.
- Add bubble variant in CSS.
- Add sender label styling for light and dark themes.
- Add profile image behavior if it is a character row.

## 13) Future Change Rules
- Always create/adjust design tokens before adding one-off colors or spacing.
- Never add a light-mode-only visual rule without dark-mode equivalent.
- Preserve minimum contrast and focus visibility in all interactive states.
- Keep motion subtle; honor reduced-motion behavior for new animations.
- Reuse existing class patterns before introducing new structural classes.

## 14) Practical Adjustment Recipes
- **Increase choice contrast:** Raise `--choice-border-ghost` opacity and deepen idle text color.
- **Soften glass effect:** Reduce backdrop blur/saturation on `.top-header`, `.sidebar`, and `.bubble`.
- **Densify narrative:** Lower `--space-xl` and `--space-xxl`, and reduce `.chat-messages` gap.
- **Make dark mode gentler:** Lighten `--other-char-bg` and `--elements-bg` in `.theme-dark`.
- **Strengthen hierarchy:** Increase sender-name contrast and/or letter spacing for `.bubble-sender-name`.
