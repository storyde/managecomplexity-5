# Roadmap

This roadmap turns the current implementation notes into concrete work items for the next development passes.

## 2. Variable and Tag Collision Check

### Goal

Avoid situations where a tag name is exactly the same as a quality variable name.

### Tasks

- Keep quality variable names unchanged where practical.
- Rename colliding tags so tag names are always distinct from quality variable names.
- Update all `#tag` references and `tags:` declarations that use the renamed tags.
- Replace the current `*_aspects` tag pattern with the same new tag suffix used for grouped answer options.

### Known Collisions

- `decision_makers` variable collides with the `decision_makers` tag in `7_wum_dmkrs_one_group.scene.dry`.
- `qol_purpose` variable collides with the `qol_purpose` tag in `17_qol_purpose.scene.dry`.
- `qol_aspiration` variable collides with the `qol_aspiration` tag in `18_qol_contribution.scene.dry`.
- `qol_accomplish` variable collides with the `qol_accomplish` tag in `18_qol_contribution.scene.dry`.

### Proposed Tag Naming Convention

- Use `_sel` for tags that group selectable answer options.
- Reason: `_sel` is very short and still suggests a selection group.
- Keep quality variable names as they are, and rename only the tags.
- For tag names, drop the `qol_` prefix where it is only mirroring the quality variable namespace.
- Shorten long tag stems where the meaning remains obvious, so tags stay distinct from variable-style names.
- Apply the same suffix to former `*_aspects` tags so grouped option tags follow one pattern.

### Proposed Rename Plan

- `decision_makers` tag -> `dmakers_sel`
- `qol_purpose` tag -> `purpose_sel`
- `qol_aspiration` tag -> `aspiration_sel`
- `qol_accomplish` tag -> `accomplish_sel`
- `economic_aspects` tag -> `economic_sel`
- `balance_aspects` tag -> `balance_sel`
- `relationship_aspects` tag -> `relationship_sel`
- `challenge_aspects` tag -> `challenge_sel`
- `growth_aspects` tag -> `growth_sel`
- `behavior_aspects` tag -> `behavior_sel`
- `environment_aspects` tag -> `environment_sel`

### Implementation Notes

- Update both the tag declarations and every `- #...` reference that points to them.
- Check for related grouped-answer tags that should follow the same pattern, even when they do not collide yet.
- Keep non-colliding tags such as `whole_u_mgmt`, `human_rcs`, `physical_rcs`, `monetary_rcs`, and `holtext_complete` unchanged unless a broader naming cleanup is planned.

### Acceptance Criteria

- All known variable and tag name collisions are listed in this roadmap item.
- A tag-first rename convention is chosen and documented.
- Every colliding tag has a proposed replacement name.
- The `*_aspects` grouped-answer tags have proposed replacement names using the same suffix.
- Follow-up implementation can be completed without renaming the quality variables.

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



# Done

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
