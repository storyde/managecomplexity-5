# Completed: converting choice scenes to shared answer scenes

## Status

Completed and verified.

- The listed scene files now use shared `*_answer` scenes.
- Shared answer scenes no longer use `_custom` in their names.
- `17_qol_purpose.scene.dry` was normalized to one shared `@qolp_answer`.
- `11_wum_money.scene.dry` uses one shared `@wumm_answer` with conditional `go-to:` routing.
- `14_qol_economic_wellbeing.scene.dry` was corrected so `@qolew_travel_and_experience` writes to `qol_balance`.
- The project build succeeded with `bun run ../dendry-chat/lib/cli/main.js make-html`.

## Goal

Convert the listed scenes so that written answers are no longer repeated inside each predefined choice subscene.

Use the pattern from `source/scenes/8_wum_dmkrs_org.scene.dry`:

- predefined choices store the answer in `title` and `on-arrival`
- predefined choices use `go-to:` to jump to one shared answer scene
- the shared answer scene is the only place that displays `Me: [+ variable +]`
- custom text input still ends with a `Save` choice, and that `Save` choice also leads to the same shared answer scene

## Reference pattern from `8_wum_dmkrs_org.scene.dry`

### What to preserve

- Each predefined choice keeps:
  - `title: ...`
  - `on-arrival: variable = "..."`
  - `go-to: *_answer`
- Each predefined choice removes its inline `Me: ...`
- The custom textarea remains in its own scene
- The custom textarea is followed by a `- @*_answer: Save` choice
- The answer scene contains:
  - `@*_answer`
  - `title: Answer`
  - `go-to: <next scene>`
  - `Me: [+ variable +]`

### Preferred migration strategy

Use the existing `*_custom_answer` scene as the shared answer scene wherever possible, but rename it to `*_answer` since it will now serve both custom and predefined answers.

This keeps the edit small:
- point predefined choices to the renamed `*_answer`
- change the bullet before that scene to `- @...: Save`
- rename the scene label from `*_custom_answer` to `*_answer`
- change the scene title from `Save` to `Answer`
- keep the existing `go-to:` and `Me: [+ variable +]` in that answer scene

Use a new answer scene only when one variable needs more than one downstream destination.

## Global checklist for every file

1. Remove inline written answers from predefined option subscenes.
2. Route predefined option subscenes to a shared answer scene.
3. Keep the custom textarea scene.
4. Make the custom textarea end with `- @*_answer: Save`.
5. Put the displayed answer only in the shared answer scene as `Me: [+ variable +]`.
6. Keep downstream navigation unchanged.
7. Keep tags, `view-if`, `order`, and `on-arrival` logic unchanged unless needed for consistency.

---

## File-by-file plan

## 1. `source/scenes/9_wum_physical_res.scene.dry`

### Variable
`rb_physical`

### Target answer scene
Rename `@rbph_custom_answer` to `@rbph_answer`

### Changes
- Change every predefined `@rbph_*` option so `go-to: 10_wum_human_res` becomes `go-to: rbph_answer`
- Remove every predefined `Me: ...` line
- Change `- @rbph_custom_answer` to `- @rbph_answer: Save`
- Change `@rbph_answer` from `title: Save` to `title: Answer`
- Keep inside `@rbph_answer`:
  - `go-to: 10_wum_human_res`
  - `Me: [+ rb_physical +]`

### Result
All predefined and custom physical-resource answers display through one answer scene before moving to `10_wum_human_res`.

---

## 2. `source/scenes/10_wum_human_res.scene.dry`

### Variable
`rb_human`

### Target answer scene
Rename `@rbhm_custom_answer` to `@rbhm_answer`

### Changes
- Change every predefined `@rbhm_*` option so `go-to: 11_wum_money` becomes `go-to: rbhm_answer`
- Remove every predefined `Me: ...` line
- Change `- @rbhm_custom_answer` to `- @rbhm_answer: Save`
- Change `@rbhm_answer` from `title: Save` to `title: Answer`
- Keep inside `@rbhm_answer`:
  - `go-to: 11_wum_money`
  - `Me: [+ rb_human +]`

### Result
All predefined and custom human-resource answers display through one answer scene before moving to `11_wum_money`.

---

## 3. `source/scenes/11_wum_money.scene.dry`

### Variable
`wum_money`

### Routing note
This file has two different downstream destinations, but they can still be handled by a single shared answer scene with conditional `go-to:` logic:
- non-org path goes to `13_qol_intro`
- org path goes to `12_statement_of_purpose`

### Target answer scene
Rename `@wumm_custom_answer` to `@wumm_answer`

### Changes
- For player-based non-org choices (`@wumm_ind_*`, `@wumm_grp_*`):
  - change `go-to:` to `wumm_answer`
  - remove inline `Me: ...`
- For org/sector choices (`@wumm_agr_*`, `@wumm_bus_*`, `@wumm_cul_*`, `@wumm_edu_*`, `@wumm_ind_*`, `@wumm_nonprofit_*`, `@wumm_pub_*`, `@wumm_pol_*`):
  - change `go-to:` to `wumm_answer`
  - remove inline `Me: ...`
- Change `- @wumm_custom_answer` to `- @wumm_answer: Save`
- Change `@wumm_answer` from `title: Save` to `title: Answer`
- Keep inside `@wumm_answer`:
  - `go-to: 13_qol_intro if player != "org"; 12_statement_of_purpose if player = "org"`
  - `Me: [+ wum_money +]`

### Result
The file follows the shared-answer pattern with one answer scene and preserves both next-step destinations through conditional routing.

---

## 4. `source/scenes/14_qol_economic_wellbeing.scene.dry`

This file contains two separate question blocks, so it needs two answer scenes.

### Variables
- `qol_economic`
- `qol_balance`

### Target answer scenes
- Rename `@qolew_custom_answer` to `@qolew_answer` for the economic-wellbeing block
- Rename `@qolewb_custom_answer` to `@qolewb_answer` for the balance block

### Changes for the economic-wellbeing block
- Change predefined `@qolew_*` choices so `go-to: qolewb_balance` becomes `go-to: qolew_answer`
- Remove inline `Me: ...`
- Change `- @qolew_custom_answer` to `- @qolew_answer: Save`
- Change `@qolew_answer` from `title: Save` to `title: Answer`
- Keep:
  - `go-to: qolewb_balance`
  - `Me: [+ qol_economic +]`

### Changes for the balance block
- Change predefined `@qolewb_*` choices so `go-to: 15_qol_relationships` becomes `go-to: qolewb_answer`
- Remove inline `Me: ...`
- Change `- @qolewb_custom_answer` to `- @qolewb_answer: Save`
- Change `@qolewb_answer` from `title: Save` to `title: Answer`
- Keep:
  - `go-to: 15_qol_relationships`
  - `Me: [+ qol_balance +]`

### Review note
Check `@qolew_travel_and_experience` carefully:
- it appears in the Balance section
- but its `on-arrival` sets `qol_economic`
- confirm whether that is intentional before refactoring

### Result
Each question block gets its own shared answer scene.

---

## 5. `source/scenes/15_qol_relationships.scene.dry`

### Variable
`qol_relationships`

### Target answer scene
Rename `@qolr_custom_answer` to `@qolr_answer`

### Changes
- Change predefined `@qolr_*` options so `go-to: 16_qol_challenge_growth` becomes `go-to: qolr_answer`
- Remove inline `Me: ...`
- Change `- @qolr_custom_answer` to `- @qolr_answer: Save`
- Change `@qolr_answer` from `title: Save` to `title: Answer`
- Keep:
  - `go-to: 16_qol_challenge_growth`
  - `Me: [+ qol_relationships +]`

### Result
All relationship answers flow through one answer scene.

---

## 6. `source/scenes/16_qol_challenge_growth.scene.dry`

This file contains two separate question blocks, so it needs two answer scenes.

### Variables
- `qol_challenge`
- `qol_growth`

### Target answer scenes
- Rename `@qolc_custom_answer` to `@qolc_answer` for the challenge block
- Rename `@qolg_custom_answer` to `@qolg_answer` for the growth block

### Changes for the challenge block
- Change predefined `@qolc_*` options so `go-to: qolg_growth` becomes `go-to: qolc_answer`
- Remove inline `Me: ...`
- Change `- @qolc_custom_answer` to `- @qolc_answer: Save`
- Change `@qolc_answer` from `title: Save` to `title: Answer`
- Keep:
  - `go-to: qolg_growth`
  - `Me: [+ qol_challenge +]`

### Changes for the growth block
- Change predefined `@qolg_*` options so `go-to: 17_qol_purpose` becomes `go-to: qolg_answer`
- Remove inline `Me: ...`
- Change `- @qolg_custom_answer` to `- @qolg_answer: Save`
- Change `@qolg_answer` from `title: Save` to `title: Answer`
- Keep:
  - `go-to: 17_qol_purpose`
  - `Me: [+ qol_growth +]`

### Result
Each question block gets its own shared answer scene, matching the reference pattern.

---

## 7. `source/scenes/17_qol_purpose.scene.dry`

### Variable
`qol_purpose`

### Structure note
This file has:
- predefined individual/group purpose choices
- a general custom answer scene
- an organisation-specific statement-of-purpose textarea scene and save scene

### Preferred target structure
Use one shared answer scene for `qol_purpose` across the whole file.

### Preferred target answer scene
Rename `@qolp_custom_answer` to `@qolp_answer`

### Changes
- Change predefined `@qolp_ind_*` and `@qolp_grp_*` choices so `go-to: 18_qol_contribution` becomes `go-to: qolp_answer`
- Remove inline `Me: ...`
- Change the general custom save bullet to `- @qolp_answer: Save`
- Change the organisation save bullet to `- @qolp_answer: Save`
- Rename `@qolp_custom_answer` to `@qolp_answer`
- Remove `@qolp_org_custom_answer` after repointing its save bullet to `@qolp_answer`
- Keep the shared answer scene with:
  - `title: Answer`
  - `go-to: 18_qol_contribution`
  - `Me: [+ qol_purpose +]`

### Consistency note
`17_qol_purpose.scene.dry` should use one answer scene, not two:
- both existing save scenes display the same variable, `qol_purpose`
- both existing save scenes already go to the same next scene, `18_qol_contribution`
- the organisation branch does not need conditional routing, only its save bullet needs to point to `@qolp_answer`

### Recommendation
Prefer the single-scene version for consistency with `8_wum_dmkrs_org.scene.dry` and with the naming rule used in the rest of this plan.

### Result
Purpose answers become centralised instead of repeated in each predefined option.

---

## 8. `source/scenes/18_qol_contribution.scene.dry`

This file contains two separate question blocks, so it needs two answer scenes.

### Variables
- `qol_aspiration`
- `qol_accomplish`

### Target answer scenes
- Rename `@qolas_custom_answer` to `@qolas_answer` for the aspiration block
- Rename `@qolac_custom_answer` to `@qolac_answer` for the accomplishment block

### Changes for the aspiration block
- Change predefined `@qolas_*` options so `go-to: qolac_accomplish` becomes `go-to: qolas_answer`
- Remove inline `Me: ...`
- Change `- @qolas_custom_answer` to `- @qolas_answer: Save`
- Change `@qolas_answer` from `title: Save` to `title: Answer`
- Keep:
  - `go-to: qolac_accomplish`
  - `Me: [+ qol_aspiration +]`

### Changes for the accomplishment block
- Change predefined `@qolac_*` options so `go-to: 19_qol_complement` becomes `go-to: qolac_answer`
- Remove inline `Me: ...`
- Change `- @qolac_custom_answer` to `- @qolac_answer: Save`
- Change `@qolac_answer` from `title: Save` to `title: Answer`
- Keep:
  - `go-to: 19_qol_complement`
  - `Me: [+ qol_accomplish +]`

### Result
Each contribution question displays its answer in one shared place.

---

## 9. `source/scenes/20_frb_people.scene.dry`

### Variable
`frb_people`

### Target answer scene
Rename `@frbp_custom_answer` to `@frbp_answer`

### Changes
- Change predefined `@frbp_*` options so `go-to: 21_frb_environment` becomes `go-to: frbp_answer`
- Remove inline `Me: ...`
- Change `- @frbp_custom_answer` to `- @frbp_answer: Save`
- Change `@frbp_answer` from `title: Save` to `title: Answer`
- Keep:
  - `go-to: 21_frb_environment`
  - `Me: [+ frb_people +]`

### Result
All people/behaviour answers flow through one answer scene.

---

## 10. `source/scenes/21_frb_environment.scene.dry`

### Variable
`frb_environment`

### Target answer scene
Rename `@frbe_custom_answer` to `@frbe_answer`

### Changes
- Change predefined `@frbe_*` options so `go-to: 22_holtext` becomes `go-to: frbe_answer`
- Remove inline `Me: ...`
- Change `- @frbe_custom_answer` to `- @frbe_answer: Save`
- Change `@frbe_answer` from `title: Save` to `title: Answer`
- Keep:
  - `go-to: 22_holtext`
  - `Me: [+ frb_environment +]`

### Result
All environment answers flow through one answer scene.

---

## Recommended implementation order

1. `9_wum_physical_res.scene.dry`
2. `10_wum_human_res.scene.dry`
3. `11_wum_money.scene.dry`
4. `15_qol_relationships.scene.dry`
5. `20_frb_people.scene.dry`
6. `21_frb_environment.scene.dry`
7. `14_qol_economic_wellbeing.scene.dry`
8. `16_qol_challenge_growth.scene.dry`
9. `17_qol_purpose.scene.dry`
10. `18_qol_contribution.scene.dry`

Rationale:
- start with simple single-answer files
- then handle files with multiple question blocks
- leave the special cases in `17` and `18` until the pattern is established

## Validation checklist after editing

- No predefined answer choice still contains a written `Me: ...`
- Every predefined answer choice routes to a shared answer scene
- Every custom textarea still ends with a visible `Save` choice
- Every shared answer scene uses `title: Answer`
- Every shared answer scene displays the correct variable
- Every shared answer scene preserves the original downstream `go-to:`
- Scene flow still works for both predefined and custom answers
- Special-case review completed for `@qolew_travel_and_experience`

## Naming rule

Apply this consistently in every converted file:
- rename any reused `*_custom_answer` scene to the matching `*_answer`
- keep the `Save` label only in the bullet line, not as the answer-scene title
- make the renamed answer scenes visually match `8_wum_dmkrs_org.scene.dry`
