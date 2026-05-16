# Roadmap

This roadmap turns the current implementation notes into concrete work items for the next development passes.

## 1. Custom Answer variable

### Goal

Improve facilyns sentence, if custom answers were used by the player.

- Quality of Life
- Future Resource Base

### Tasks

- Add the on-arrival variable update `customised += 1` to all custom answers in these areas.
- Add a `qdisplay` file for this quality flow.
- Use the score to customise what Facilyn says after she fills in a few words in the holistic context: P:\Documents\GitHub\managecomplexity-5\source\scenes\22_holtext.scene.dry

### Proposed Score Display Rules

- `0`: no message
- `1..3`: "You might need to improve a few words."
- `4..6`: "These words might not fit your custom text."
- `7..9`: "Improve these words with AI."

### Acceptance Criteria

- Every relevant custom answer increases the `customised` value on arrival.
- The new `qdisplay` layer is wired into the quality flow.
- Her text changes based on the score ranges above.

## 2. Variable and Tag Collision Check

### Goal

Avoid situations where a variable name is exactly the same as a tag.

### Tasks

- Check the project for variables that match tag names exactly.
- Record each collision that is found.
- Rename or refactor the affected variables where needed.

### Acceptance Criteria

- All known variable and tag name collisions are listed.
- Problematic names are updated or queued for follow-up changes.

## 3. Heading Style Improvements

### Goal

Improve the heading signs in CSS to match the TV heading style.

### Tasks

- Review the current heading styles.
- Update the CSS so heading signs use the intended TV heading appearance.
- Verify the new styling across the main screens where headings appear.

## 4. Internationalization

### Goal

Prepare the project for multilingual content. P:\Documents\GitHub\managecomplexity-5\Notes\i18n.md

### Tasks

- Introduce an i18n structure for user-facing text.
- Identify hard-coded text that should move into translation resources.
- Start with the most visible screens and guidance text.

## 5. Browser Script Modernization

### Goal

Upgrade `browser.js` to ES6 style. P:\Documents\GitHub\managecomplexity-5\Notes\ES6.md

### Tasks

- Review the current `browser.js` implementation.
- Replace outdated patterns with ES6 syntax where safe.
- Verify that the build still works after the update.

## Suggested Order

1. Custom Answer Quality Feedback
2. Variable and Tag Collision Check
3. Browser Script Modernization
4. Heading Style Improvements
5. Internationalization
