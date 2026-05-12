# Progress Migration Plan

## Goal

Replace the old single `progress` quality as an authored pacing system.

After this migration:

- scene progression should be tracked directly with `jrny_progress`, `hctx_progress`, and `fltr_progress`
- the left sidebar should read those qualities directly
- the right sidebar should unlock knowledge from `knwl_*` qualities, not from numeric `progress` thresholds
- authored scene files should no longer assign `progress = ...`
- old `progress`-based gating in sidebar content should be removed or rewritten

This document is a migration plan, not a feature sketch. It is meant to replace the old implementation approach.

## Audit Summary

The current codebase still uses `progress` in 3 different ways:

1. As a scene milestone counter:
   - many scenes set `on-arrival: progress = ...`
2. As a left-sidebar gate:
   - `source/scenes/progress.scene.dry` still uses `progress` to decide which recap blocks to show
3. As a right-sidebar knowledge gate:
   - `source/scenes/info.scene.dry` still unlocks concept text with `progress > ...`

There is also one legacy display file:

- `source/qdisplays/qprogress.qdisplay.dry`

That file belongs to the old single-track system and should be retired once no scene references it anymore.

## New Source Of Truth

The new source of truth is a small set of direct, monotonic qualities.

### Core progress qualities

- `jrny_progress`: narrative journey milestones, `0..4`
- `hctx_progress`: Holistic Context build milestones, `0..13`
- `fltr_progress`: decision-check milestones, `0..7`

### Knowledge qualities

The right sidebar needs more than the previous minimal knowledge set, because it must replace all old `progress` gates in `info.scene.dry`.

Recommended qualities:

- `knwl_last`
- `knwl_complexity`
- `knwl_whole`
- `knwl_decision_makers`
- `knwl_resource_base`
- `knwl_holtext`
- `knwl_holtext_org`
- `knwl_filters`
- `knwl_filter_failure`
- `knwl_cause_effect`
- `knwl_weak_link`
- `knwl_marginal_reaction`
- `knwl_gross_profit`
- `knwl_source_use`
- `knwl_sustainability`
- `knwl_gut_feel`
- `knwl_gut_feel_last`

### Achievement helper qualities

- `achvm_last`
- `achvm_count`

### Rule for all new progress qualities

The new track qualities should never go backwards on revisits.

Use direct Dendry assignments such as:

- `jrny_progress = 2 if jrny_progress < 2`
- `hctx_progress = 8 if hctx_progress < 8`
- `fltr_progress = 4 if fltr_progress < 4`

This keeps the system Dendry-first, avoids extra JS, and is revisit-safe.

Timing rule for all progress qualities:

- default to `on-departure`
- use `on-display` only for result, arrival, or synthesis milestones where the progress should update when the completed state is being shown
- avoid `on-arrival` for progress updates unless the milestone literally means "the player has now reached this place" and that timing is more important than consistency

Recommended interpretation by track:

- `jrny_progress`: usually `on-display` for arrival beats and `on-departure` for phase-completion beats
- `hctx_progress`: usually `on-departure`
- `fltr_progress`: usually `on-departure`

## Track Definitions

### `jrny_progress`

Use this only for major player journey beats:

- `0` Start state
- `1` Harbour reached
- `2` Knows way to Teahouse
- `3` Teahouse entered
- `4` About to learn the Framework

### `hctx_progress`

Use this for Holistic Context creation beats:

- `0` Start state
- `1` Decision-makers defined
- `2` Physical resources defined
- `3` Human resources defined
- `4` Money defined
- `5` Statement of purpose handled
  - for non-org paths, this step will just be skipped, which is no problem and needs no further handling
- `6` Quality of Life: economic well-being (set progress in the time balance scene to cover both)
- `7` Quality of Life: relationships
- `8` Quality of Life: challenge and growth (set progress in the growth scene to cover both)
- `9` Quality of Life: Purpose and Contribution (set progress in the accomplishment scene to cover all three)
- `10` Quality of Life: complement / add anything that was missing
- `11` Future resource base, people
- `12` Future resource base, environment
- `13` Holistic Context written

### `fltr_progress`

Use this for the seven decision checks:

- `0` Start state
- `1` Cause and Effect
- `2` Weak Link
- `3` Marginal Reaction
- `4` Gross Profit
- `5` Source and Use
- `6` Sustainability
- `7` Gut Feel

`Skipped` still counts as completion for the decision-check track. The track represents completed checks, not only passed checks.

## Initialization Plan

Update `source/scenes/root.scene.dry` so all new helper qualities initialize once per run.

Keep the existing one-time guard pattern:

- `home_visited = 0/1`
- `source/scenes/1_home.scene.dry`: `on-arrival: home_visited = 1`
- `source/scenes/root.scene.dry`: initialize only if `home_visited != 1`

Recommended initial values:

- `jrny_progress = 0`
- `hctx_progress = 0`
- `fltr_progress = 0`
- `achvm_count = 0`
- `achvm_last = 0`
- `knwl_last = 0`
- every `knwl_*` flag = `0`

Do not initialize `progress` anymore once the migration is complete.

## Scene Migration Plan

This is the core of the rewrite: remove old `progress = ...` lines from scenes and replace only the major ones with the new qualities.

## 1) Journey scenes

These scenes should set `jrny_progress` directly:

- `source/scenes/3_harbour.scene.dry`
  - set `jrny_progress = 1 if jrny_progress < 1`
- the `know_way` branch in `source/scenes/3_harbour.scene.dry`
  - set `jrny_progress = 2 if jrny_progress < 2`
- `source/scenes/4_teahouse.scene.dry`
  - set `jrny_progress = 3 if jrny_progress < 3`
- `source/scenes/5_wum_intro.scene.dry`
  - set `jrny_progress = 4 if jrny_progress < 4`

The following old journey-only `progress` bumps should simply be removed, with no new replacement:

- `source/scenes/2_intro.scene.dry`
- `source/scenes/6_wum_sector.scene.dry`
- `source/scenes/32_fq_revisit.scene.dry`

`source/scenes/31_fq_result.scene.dry` should keep `fltr_result = "visited"` but should stop assigning `progress = 40`.

## 2) Holistic Context scenes

These scenes should set `hctx_progress` directly.

Timing rule:

- default to `on-departure` for `hctx_progress`
- use `on-display` only for result or synthesis scenes where showing the completed state is the milestone
- do not use `on-arrival` unless there is a very specific reason
- use the timing on the scene or subscene where the relevant Holistic Context step is actually complete
- this keeps the displayed progress aligned with what the player has just finished

Recommended pattern:

- `hctx_progress = N if hctx_progress < N`

These scenes should set `hctx_progress` directly:

- `source/scenes/7_wum_dmkrs_one_group.scene.dry`
  - set `hctx_progress = 1 if hctx_progress < 1`
- `source/scenes/8_wum_dmkrs_org.scene.dry`
  - set `hctx_progress = 1 if hctx_progress < 1`
- `source/scenes/9_wum_rb_physical.scene.dry`
  - set `hctx_progress = 2 if hctx_progress < 2`
- `source/scenes/10_wum_rb_human.scene.dry`
  - set `hctx_progress = 3 if hctx_progress < 3`
- `source/scenes/11_wum_money.scene.dry`
  - set `hctx_progress = 4 if hctx_progress < 4`
- `source/scenes/12_statement_of_purpose.scene.dry`
  - set `hctx_progress = 5 if hctx_progress < 5`
- for non-org paths:
  - step `5` is skipped and needs no replacement milestone
- `source/scenes/14_qol_economic_wellbeing.scene.dry`
  - set `hctx_progress = 6 if hctx_progress < 6` on the time-balance / `qolewb_balance` scene to cover both economic well-being and time balance
- `source/scenes/15_qol_relationships.scene.dry`
  - set `hctx_progress = 7 if hctx_progress < 7`
- `source/scenes/16_qol_challenge_growth.scene.dry`
  - set `hctx_progress = 8 if hctx_progress < 8` on the growth / `qolg_growth` scene to cover both challenge and growth
- `source/scenes/18_qol_contribution.scene.dry`
  - set `hctx_progress = 9 if hctx_progress < 9` on the accomplishment / `qolac_accomplish` scene to cover purpose, aspiration, and accomplishment
- `source/scenes/19_qol_complement.scene.dry`
  - set `hctx_progress = 10 if hctx_progress < 10`
- `source/scenes/20_frb_people.scene.dry`
  - set `hctx_progress = 11 if hctx_progress < 11`
- `source/scenes/21_frb_environment.scene.dry`
  - set `hctx_progress = 12 if hctx_progress < 12`
- `source/scenes/22_holtext.scene.dry`
  - set `hctx_progress = 13 if hctx_progress < 13`

The following old pacing-only `progress` bumps should be removed without replacement:

- `source/scenes/5_wum_intro.scene.dry`
- `source/scenes/6_wum_sector.scene.dry`

The intention is clear separation:

- `jrny_progress` tracks major narrative movement until player begins to learn the framework
- `hctx_progress` tracks major framework-building milestones

Within `hctx_progress`, some authored sections intentionally collapse multiple prompts into one milestone so the track stays close to the framework instead of mirroring every screen:

- economic well-being + time balance -> one milestone
- challenge + growth -> one milestone
- purpose + aspiration + accomplishment -> one milestone

Not every scene needs to touch either quality.

## 3) Filter question scenes

These scenes should set `fltr_progress` directly:

- `source/scenes/24_fq_cause_effect.scene.dry`
  - set `fltr_progress = 1 if fltr_progress < 1`
- `source/scenes/25_fq_weak_link.scene.dry`
  - set `fltr_progress = 2 if fltr_progress < 2` only on the final weak-link subscene, not the intro subscene
- `source/scenes/26_fq_marginal_reaction.scene.dry`
  - set `fltr_progress = 3 if fltr_progress < 3`
- `source/scenes/27_fq_gross_profit.scene.dry`
  - set `fltr_progress = 4 if fltr_progress < 4`
- `source/scenes/28_fq_energy_money.scene.dry`
  - set `fltr_progress = 5 if fltr_progress < 5` only after both source and use are handled
- `source/scenes/29_fq_sustainability.scene.dry`
  - set `fltr_progress = 6 if fltr_progress < 6` only after both behaviour and environment are handled
- `source/scenes/30_fq_gut_feel.scene.dry`
  - set `fltr_progress = 7 if fltr_progress < 7`

Revisit flow must also update the same conceptual milestones when the player completes a previously skipped filter later. The same monotonic rule applies there.

For revisit safety:

- use the direct quality guard `if fltr_progress < N`
- keep `fltr_result = "visited"` as the signal that the player has already seen results
- award `filter_navigator` on revisit with `achievement: filter_navigator if fltr_result = "visited"`

The following old pacing-only `progress` bumps should be removed:

- `source/scenes/23_fq_intro.scene.dry`
- intermediate `progress` lines in `source/scenes/25_fq_weak_link.scene.dry`
- intermediate `progress` lines in `source/scenes/28_fq_energy_money.scene.dry`
- intermediate `progress` lines in `source/scenes/29_fq_sustainability.scene.dry`
- `source/scenes/31_fq_result.scene.dry`
- `source/scenes/32_fq_revisit.scene.dry`

## Knowledge Migration Plan

The right sidebar should stop using numeric `progress` thresholds and instead unlock each knowledge block from a dedicated `knwl_*` flag.

Use one consistent pattern everywhere:

- `knwl_<concept> = 1` (no if check needed here)
- `knwl_last = "<Label>" if knwl_<concept> = 0`

That gives one-time unlocks and keeps the latest-concept line working.

## `info.scene.dry` rewrite map

Replace each old `progress > ...` check in the info.scene with a matching `knwl_*` check.

Recommended mapping:

- `Complexity` -> `knwl_complexity = 1`
- `Whole Under Management` -> `knwl_whole = 1`
- `Decision makers` -> `knwl_decision_makers = 1`
- `Resource base` -> `knwl_resource_base = 1`
- `Holistic context` -> `knwl_holtext = 1`
- `Holistic context for organisations` -> `knwl_holtext_org = 1 and player = "org"`
- `Filter questions` -> `knwl_filters = 1`
- `When an action fails a check` -> `knwl_filter_failure = 1`
- `Cause and effect` -> `knwl_cause_effect = 1`
- `Weak link` -> `knwl_weak_link = 1`
- `Marginal reaction` -> `knwl_marginal_reaction = 1`
- `Gross profit analysis` -> `knwl_gross_profit = 1`
- `Energy/money source and use` -> `knwl_source_use = 1`
- `Sustainability` -> `knwl_sustainability = 1`
- `Gut feel` -> `knwl_gut_feel = 1`
- `Why gut feel is last` -> `knwl_gut_feel_last = 1`

## Knowledge hook locations

Recommended first-teach locations: prefer explicit explanation subscenes where they exist; otherwise use the first scene or subscene that clearly teaches or shows the concept.

- `source/scenes/4_teahouse.scene.dry` -> `@what_complexity`
  - `knwl_complexity`
- `source/scenes/5_wum_intro.scene.dry` -> `@wum_explanation`
  - `knwl_whole`
- `source/scenes/7_wum_dmkrs_one_group.scene.dry` -> `@dmkrs_explanation`
  - `knwl_decision_makers`
  - explicit explanation hook for the non-org path is not needed, since the same @dmkrs_explanation scene will be displayed regardles if player is one, group or org. the scene has no view-if property for exactly this reason
- `source/scenes/9_wum_rb_physical.scene.dry` -> `@rbph_explanation`
  - `knwl_resource_base`
  - this is the first explicit resource-base explanation; `10_wum_rb_human.scene.dry` and `11_wum_money.scene.dry` also explain later sub-parts, but they are not the first teach
- `source/scenes/22_holtext.scene.dry` -> scene intro / completed Holistic Context display
  - `knwl_holtext`
  - there is no earlier dedicated "what is a holistic context?" explanation node; this is the first place the full concept is shown as a finished whole
- `source/scenes/12_statement_of_purpose.scene.dry` -> `@stmp_explanation`
  - `knwl_holtext_org`
  - this is the closest current org-path teaching hook for the extra Statement of Purpose component
- `source/scenes/23_fq_intro.scene.dry` -> `@xmpl_explanation`
  - `knwl_filters`
- `source/scenes/24_fq_cause_effect.scene.dry` -> `@fqce_fail`
  - `knwl_filter_failure`
  - hook this failure filter in all the explicit failed-filter outcome subscenes
- `source/scenes/24_fq_cause_effect.scene.dry` -> `@fqce_explanation`
  - `knwl_cause_effect`
- `source/scenes/25_fq_weak_link.scene.dry` -> `@fqwl_explanation`
  - `knwl_weak_link`
- `source/scenes/26_fq_marginal_reaction.scene.dry` -> `@fqmr_explanation`
  - `knwl_marginal_reaction`
- `source/scenes/27_fq_gross_profit.scene.dry` -> `@fqgp_explanation`
  - `knwl_gross_profit`
- `source/scenes/28_fq_energy_money.scene.dry` -> scene intro
  - `knwl_source_use`
  - the intro is the first place that frames source and use as one combined check; the detailed explanation is then split into separate source/use subscenes
- `source/scenes/29_fq_sustainability.scene.dry` -> scene intro
  - `knwl_sustainability`
  - the intro is the first place that frames sustainability as the social and environmental future-resource-base check; the detailed explanation is then split into behavior/environment subscenes
- `source/scenes/30_fq_gut_feel.scene.dry` -> `@fqgut_explanation`
  - `knwl_gut_feel`
- `source/scenes/30_fq_gut_feel.scene.dry` -> scene intro
  - `knwl_gut_feel_last`
  - this is where the text explicitly says gut feel comes after the other checks, so it is a better source than the result screen

The exact hook line can still be adjusted during implementation, but each knowledge block in `info.scene.dry` should have one clearly chosen teach point, and the plan should note when that teach point is a best-fit intro/result scene rather than a dedicated explanation subscene.

## Left Sidebar Rewrite Plan

`source/scenes/progress.scene.dry` should stop deriving anything from the old `progress` quality.

## Top dashboard

Keep the new 3-track layout:

- `[+ jrny_progress : qjrny_progress +]`
- `[+ hctx_progress : qhctx_progress +]`
- `[+ fltr_progress : qfltr_progress +]`

The qdisplay files should be simple renderers only. On 0...0 they should be empty, and on the other numbers they should use the html as they do now. They should not calculate anything from old `progress`.

## Sidebar recap section

Rewrite the lower recap conditions so they depend on the new qualities or on actual content fields, not on `progress`.

Recommended rules:

- show full Holistic Context text when `holtext != 0` or `hctx_progress = 13`
- show in-progress Whole Under Management, Quality of Life, and Future Resource Base summaries when `hctx_progress > 0 and hctx_progress < 13`
- show filter answers whenever the corresponding answer qualities are non-zero
- show the "Finalize Filter Questions" note when `fltr_result = "visited" and jrny_progress < 4`

This removes the old split:

- `progress > 25`
- `progress < 26`

and replaces it with meaning-based conditions.

## Right Sidebar Rewrite Plan

`source/scenes/info.scene.dry` should become a pure knowledge sidebar.

Rules:

- no numeric `progress > ...` checks
- use only `knwl_*` flags plus path checks like `player = "org"` where needed
- keep the same content text unless a wording improvement is desired separately

The right sidebar should reflect what the player has learned, not what numeric scene counter they have passed.

## Achievements

Keep the current player-facing badge set:

- `first_landing`
- `tea_companion`
- `holtext_created`
- `filter_navigator`
- `framework_finished`

Recommended hook pattern:

- `achievement: first_landing` in `source/scenes/3_harbour.scene.dry`
- `achievement: tea_companion` in `source/scenes/4_teahouse.scene.dry`
- `achievement: holtext_created` in `source/scenes/22_holtext.scene.dry`
- `achievement: filter_navigator if fltr_result = "visited"` in revisit filter flow
- `achievement: framework_finished` in `source/scenes/33_framework_outro.scene.dry`

Use `achvm_last` and `achvm_count` for sidebar display only.

Recommended Dendry-first helper pattern:

- `achvm_last = "First Landing" if achievement_first_landing = 0`
- `achvm_count += 1 if achievement_first_landing = 0`

The same pattern can be repeated for each achievement.

## Legacy Cleanup Checklist

The migration is not complete until all authored dependencies on `progress` are resolved.

### Remove from scene logic

Delete `progress = ...` assignments from:

- `source/scenes/2_intro.scene.dry`
- `source/scenes/3_harbour.scene.dry`
- `source/scenes/4_teahouse.scene.dry`
- `source/scenes/5_wum_intro.scene.dry`
- `source/scenes/6_wum_sector.scene.dry`
- `source/scenes/7_wum_dmkrs_one_group.scene.dry`
- `source/scenes/8_wum_dmkrs_org.scene.dry`
- `source/scenes/9_wum_rb_physical.scene.dry`
- `source/scenes/10_wum_rb_human.scene.dry`
- `source/scenes/11_wum_money.scene.dry`
- `source/scenes/12_statement_of_purpose.scene.dry`
- `source/scenes/13_qol_intro.scene.dry`
- `source/scenes/14_qol_economic_wellbeing.scene.dry`
- `source/scenes/15_qol_relationships.scene.dry`
- `source/scenes/16_qol_challenge_growth.scene.dry`
- `source/scenes/17_qol_purpose.scene.dry`
- `source/scenes/18_qol_contribution.scene.dry`
- `source/scenes/19_qol_complement.scene.dry`
- `source/scenes/20_frb_people.scene.dry`
- `source/scenes/21_frb_environment.scene.dry`
- `source/scenes/22_holtext.scene.dry`
- `source/scenes/23_fq_intro.scene.dry`
- `source/scenes/24_fq_cause_effect.scene.dry`
- `source/scenes/25_fq_weak_link.scene.dry`
- `source/scenes/26_fq_marginal_reaction.scene.dry`
- `source/scenes/27_fq_gross_profit.scene.dry`
- `source/scenes/28_fq_energy_money.scene.dry`
- `source/scenes/29_fq_sustainability.scene.dry`
- `source/scenes/30_fq_gut_feel.scene.dry`
- `source/scenes/31_fq_result.scene.dry`
- `source/scenes/32_fq_revisit.scene.dry`
- `source/scenes/33_framework_outro.scene.dry`

Each deleted `progress` assignment should either:

- be replaced by one of the new milestone qualities, or
- be removed entirely because it only belonged to the old pacing counter

### Remove from sidebar logic

Rewrite:

- `source/scenes/progress.scene.dry`
- `source/scenes/info.scene.dry`

### Retire old display file

After references are gone:

- delete `source/qdisplays/qprogress.qdisplay.dry`

### Keep as text only

These files mention "progress" in normal prose, not as logic:

- `source/scenes/tutorial.scene.dry`
- `source/scenes/faq.scene.dry`

They do not block the migration unless the wording should change for clarity.

## Reset Plan

Update `source/scenes/reset_achievements.scene.dry` so it resets only the achievement-related state that survives a browser refresh.

Do not use it as a full story-state reset.

The rest of the authored run state will be cleared by refreshing the browser, so the reset scene only needs to clear the persistent achievement sidebar helpers and achievement flags:

- `achvm_count`
- `achvm_last`
- achievement flags such as `achievement_first_landing`, `achievement_tea_companion`, `achievement_holtext_created`, `achievement_filter_navigator`, and `achievement_framework_finished`

Any non-achievement state that currently gets reset there should be removed unless it is proven to persist across browser refreshes.

`progress`, `jrny_progress`, `hctx_progress`, `fltr_progress`, `knwl_*`, `home_visited`, and authored content qualities should not need explicit reset there if browser refresh already clears them.

## Implementation Order

### Phase 1

- expand initialization in `root.scene.dry`
- define the full `knwl_*` set needed by `info.scene.dry`
- keep the naming consistent before editing scenes

### Phase 2

- replace old milestone assignments in major journey, Holistic Context, and filter scenes
- remove old pacing-only `progress` assignments from non-major scenes

### Phase 3

- rewrite `progress.scene.dry` to use only new qualities
- rewrite `info.scene.dry` to use only `knwl_*`
- verify the qdisplay files are direct renderers only

### Phase 4

- update achievements and helper labels where needed
- update reset scene
- delete `qprogress.qdisplay.dry` if no longer referenced

### Phase 5

- run a codebase search for `\bprogress\b`
- confirm only non-logic prose references remain, if any

## Acceptance Criteria

The migration is done when all of the following are true:

- no authored scene still depends on `progress` for milestone tracking
- `jrny_progress`, `hctx_progress`, and `fltr_progress` are set directly in major scenes
- revisits never reduce or double-count any of the 3 new track qualities
- `progress.scene.dry` does not calculate from `Q.progress`
- the left sidebar reads the new qualities directly
- `info.scene.dry` uses only `knwl_*` flags and no `progress > ...` gates
- every knowledge block in the right sidebar has one explicit source scene
- `qprogress.qdisplay.dry` is unused and removed
- a final codebase search shows no logic relying on old `progress`
- `hctx_progress` reaches `13` when the full Holistic Context path is complete

## Non-Goals

This migration does not require:

- a new knowledge progress bar
- a more complex badge system
- a large codex UI
- auto-calculating tracks from old `progress`

The point of this rewrite is to make the new qualities the actual authored system, not a second layer on top of the old one.
