# Plan: Add custom answer choices

## Goal

Add a reusable custom-answer path anywhere the player currently picks from a list of authored answers, while keeping the existing authored answers in place.

Important constraint:

- In most scenes, the custom option should be visible without any `view-if`, regardless of `sector` or `player`.
- The only likely exception in the requested set is `17_qol_purpose.scene.dry`, because org players are auto-routed past the normal choice list.

## Recommended pattern

For scenes that currently use a tag choice such as `- #st_purpose`, use a consistent two-step pattern:

1. A tagged entry scene that appears in the existing choice list.
2. A follow-up scene that echoes the entered value and then continues to the next scene.

Recommended shape:

```dry
@example_custom
title: Custom answer
order: 20
tags: example_tag

Me: Custom answer

<textarea class="textarea" data-quality="example-quality" placeholder="Write your custom answer." oninput="window.dendryUI && window.dendryUI.dendryEngine && (window.dendryUI.dendryEngine.state.qualities[this.dataset.quality] = this.value);"></textarea>

- @example_custom_answer: Save

@example_custom_answer
title: Save
go-to: next_scene

Me: [+ example-quality +]
```

Notes on the pattern:

- Use the existing quality variable for that question, not a new `*-custom` variable.
- Use `[+ quality-name +]` when echoing the value back.
- `order: 20` keeps the custom option at the bottom of the list. 
- The entry scene should usually have the same `tags:` value as the authored options it joins.
- No `view-if` is needed on the custom entry scenes.

## Textarea recommendation

Do not reuse `id="textarea"` across scenes.

Recommended approach:

- Use a shared class such as `class="textarea"`.
- Store the destination quality in `data-quality`.
- Keep the inline `oninput` handler, but point it at `this.dataset.quality`.
- Avoid an `id` unless there is a real DOM reason for one.

Reason:

- Multiple custom-answer scenes may exist across the same playthrough.
- Reusing the same `id` would create invalid duplicate IDs in the DOM.
- The current handler already works off `this`, so an `id` is not needed.

This same cleanup should also be applied to the existing textarea in `19_qol_textarea.scene.dry` if this feature is implemented.

## View-if investigation

### No `view-if` needed

These scenes can show the custom option to everyone who reaches that choice list:

- `12_statement_of_purpose.scene.dry`
- `14_qol_economic_wellbeing.scene.dry`
- `15_qol_relationships.scene.dry`
- `16_qol_challenge_growth.scene.dry`
- `18_qol_contribution.scene.dry`
- `20_frb_people.scene.dry`
- `21_frb_environment.scene.dry`

Why:

- They already present a normal tag-driven choice list.
- The custom answer should simply join that list as one more option.
- Sector-specific or player-specific stock answers can keep their own `view-if`, but the custom option itself does not need one.

### No special handling needed

`17_qol_purpose.scene.dry` is different because it currently starts with:

```dry
go-to: qolp_organisation if player = "org"
```

That means org players never see the `- #qol_purpose` choice list, the custom option will not be visible to them.

But org players had a custom option in scene `12_statement_of_purpose.scene.dry`, so there is really no need to do anything special here but to show the custom option as in every other scene, so that non-org players can choose it. 

Recommended plan for scene 17:

- Keep the current fast path for org players.
- use the same custom choice pattern as in the other scenes


## Scene-by-scene plan

### `12_statement_of_purpose.scene.dry`

- Tag list: `st_purpose`
- Quality to write: `st-purpose`
- Next scene after confirmation: `13_qol_intro`
- Planned scenes:
  - `@stmp_custom`
  - `@stmp_custom_answer`

- Note: keep this custom option visible across all sectors; do not add `sector` conditions

### `13_qol_intro.scene.dry`

- No custom-answer scene needed here
- Reason: this scene is an introduction and explanation step, not a choice list for storing a value
- Action in implementation:
  - leave the scene unchanged
  - only make sure `12_statement_of_purpose.scene.dry` still routes here after custom confirmation

### `14_qol_economic_wellbeing.scene.dry`

Two separate custom-answer points are needed.

Economic well-being:

- Tag list: `economic_aspects`
- Quality to write: `qol-economic`
- Next scene after confirmation: `qolewb_balance`
- Planned scenes:
  - `@qolew_custom`
  - `@qolew_custom_answer`

Balance:

- Tag list: `balance_aspects`
- Quality to write: `qol-balance`
- Next scene after confirmation: `15_qol_relationships`
- Planned scenes:
  - `@qolewb_custom`
  - `@qolewb_custom_answer`

### `15_qol_relationships.scene.dry`

- Tag list: `relationship_aspects`
- Quality to write: `qol-relationships`
- Next scene after confirmation: `16_qol_challenge_growth`
- Planned scenes:
  - `@qolr_custom`
  - `@qolr_custom_answer`

### `16_qol_challenge_growth.scene.dry`

Two separate custom-answer points are needed.

Challenge:

- Tag list: `challenge_aspects`
- Quality to write: `qol-challenge`
- Next scene after confirmation: `qolg_growth`
- Planned scenes:
  - `@qolc_custom`
  - `@qolc_custom_answer`

Growth:

- Tag list: `growth_aspects`
- Quality to write: `qol-growth`
- Next scene after confirmation: `17_qol_purpose`
- Planned scenes:
  - `@qolg_custom`
  - `@qolg_custom_answer`

### `17_qol_purpose.scene.dry`

Non-org players:

- Tag list: `qol_purpose`
- Quality to write: `qol-purpose`
- Next scene after confirmation: `18_qol_contribution`
- Planned scenes:
  - `@qolp_custom`
  - `@qolp_custom_answer`

Org players:

- Current flow auto-routes to `@qolp_organisation`
- No change

### `18_qol_contribution.scene.dry`

Two separate custom-answer points are needed.

Aspiration:

- Tag list: `qol_aspiration`
- Quality to write: `qol-aspiration`
- Next scene after confirmation: `qolac_accomplish`
- Planned scenes:
  - `@qolas_custom`
  - `@qolas_custom_answer`

Accomplishment:

- Tag list: `qol_accomplish`
- Quality to write: `qol-accomplish`
- Next scene after confirmation: `19_qol_textarea`
- Planned scenes:
  - `@qolac_custom`
  - `@qolac_custom_answer`

### `19_qol_textarea.scene.dry`

- No separate custom-answer scene needed here
- Reason: this scene already is the freeform catch-all input step
- Planned action if implemented:
  - keep the existing free-text behavior
  - replace `id="textarea"` with the same class/data-quality pattern used elsewhere
- change the current quality name `textarea` to `complement` in this scene and in other scenes that displays `[+ textarea +]`

### `20_frb_people.scene.dry`

- Tag list: `behavior_aspects`
- Quality to write: `frb-people`
- Next scene after confirmation: `21_frb_environment`
- Planned scenes:
  - `@frbp_custom`
  - `@frbp_custom_answer`

### `21_frb_environment.scene.dry`

- Tag list: `environment_aspects`
- Quality to write: `frb-environment`
- Next scene after confirmation: `22_holtext`
- Planned scenes:
  - `@frbe_custom`
  - `@frbe_custom_answer`

## Implementation order

When implementing later, this order should be safest:

1. Standardize the textarea markup pattern.
2. Add the paired custom flows in `12`, `14`, `15`, `16`, `17`, `18`, `20`, and `21`.
3. Review `19_qol_textarea.scene.dry` for textarea markup consistency.

## Validation checklist

- Each custom entry scene appears in the intended tagged list.
- Each textarea writes into the correct existing quality.
- Each confirmation scene echoes the value with Me: `[+ quality +]`.
- Each confirmation scene routes to the same next scene as the authored answers for that question.
- No `id="textarea"` remains if the class/data-quality approach is adopted.
- Org players still get the intended statement-of-purpose shortcut