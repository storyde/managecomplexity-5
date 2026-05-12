# Achievements and Progress Plan, Ready for Implementation

## Goal

Replace the current single `progress` bar in `source/scenes/progress.scene.dry` with a small, motivating dashboard that:

- makes progress feel earned
- reinforces the structure of Holistic Management
- adds a few meaningful achievements
- stays simple enough to implement and maintain quickly

This plan is intentionally smaller than the earlier draft. The focus is on features that give clear player value, not on building a large meta-system.

## Design Decision

### Keep in v1

- 3 visible progress tracks
- 4 to 5 meaningful achievements
- 1 "latest knowledge" line
- compact earned-badge display in the left sidebar
- a nice animation

### Cut from v1

- no separate knowledge progress bar
- no large codex unlock system
- no achievement icons as required data
- no final summary card requirement

These can be added later if the simple version works well. They are not needed to get the motivational benefit.

## Why This Simpler Shape Is Better

The game already has strong educational content. What is missing is a clearer feeling of movement and payoff.

A good v1 should therefore:

- show where the player is in the journey
- show that the Holistic Context is being built
- show mastery of the seven checks
- reward a few memorable milestones

That is enough to improve motivation without making the sidebar noisy or the implementation fragile.

## Dendry Constraints To Follow

### Qualities in this project

This project already uses qualities directly in scenes through `on-arrival`, `view-if`, `choose-if`, and inline conditions. For this feature, we should continue that pattern.

Recommendation:

- Add `.quality.dry` files only if necessary
- Use qdisplay files for the progress bars and for example the `hctx_progress` milestones
- keep naming consistent with the current project style

Current project style uses snake_case quality names such as:

- `qol_economic`
- `rb_physical`
- `fltr_cause`

Therefore new helper qualities should also use underscore names. 
Built-in achievement qualities will Dendry expose as `achievement_<achievement_name>`.

### How achievements should be used

Dendry supports:

`achievement: some_name`

When a scene has that property, Dendry exposes:

- `achievement_some_name = 1` (persistent)

Implementation rules for this plan:

- use `achievement_some_name` for checks and sidebar badge display
- treat `achievement_*` as the source of truth for badges
- do not create duplicate custom achievement flags for the same badge
- use helper qualities only for UI support such as recency and counts

Important practical note:

- the achievement is safest to show in the sidebar or on the next scene
- do not depend on same-scene content updating immediately after `achievement: ...` as achievement-qualities are not updated on-arrival.

## Chosen v1 Model

## Visible Sidebar Structure

Top of left sidebar:

1. `Progress` heading
2. Journey track
3. Holistic Context track
4. Decision Checks track
5. latest achievement line, if any
6. latest knowledge line, if any
7. earned badges

Below that, keep the existing lower sections:

- Holistic Context content
- current filter answers

This preserves the useful current sidebar while improving motivation at the top.

## Track 1: Journey

Quality:

- `jrny_progress`

Scale:

- `0..4`

Purpose:

- show narrative movement through the experience

Milestones:

- `0` Not started
- `1` Harbour reached
- `2` Teahouse entered
- `3` Holistic Context completed
- `4` Framework completed

Why this scale:

- short and readable
- tied to memorable moments
- does not duplicate every scene

## Track 2: Holistic Context

Quality:

- `hctx_progress`

Scale:

- `0..9`

Purpose:

- reward the actual construction of the framework

Milestones:

- `1` decision-makers defined
- `2` physical resources defined
- `3` human resources defined
- `4` money defined
- `5` statement of purpose done, or auto-credit for non-org path
- `6` quality of life completed
- `7` future resource base, people
- `8` future resource base, environment
- `9` holistic context written

Why this scale:

- each step is substantive
- enough movement to feel satisfying
- still much simpler than mirroring every current scene

Note on Holistic Management accuracy:

- the track reflects the real structure of the framework:
  - define the whole
  - create the holistic context
  - describe the future resource base

## Track 3: Decision Checks

Quality:

- `fltr_progress`

Scale:

- `0..7`

Purpose:

- make the seven checks feel like mastery, not admin

Milestones:

- `1` Cause and Effect complete
- `2` Weak Link complete
- `3` Marginal Reaction complete
- `4` Gross Profit complete
- `5` Source and Use complete
- `6` Sustainability complete
- `7` Gut Feel complete

Important rule:

This track must count conceptual completion, not raw sub-questions.

`Skipped` answers count as valid completion in v1.
Progress should advance once each required check has any recorded answer. 

## Lightweight Knowledge Signal

Do not build a fourth visible knowledge track in v1.

Instead, add:

- `knwl_last`

Purpose:

- show the most recent concept the player learned
- add a feeling of discovery without another full bar

Recommended one-time concept unlocks:

- `Complexity`
- `Whole Under Management`
- `Holistic Context`
- `Seven Checks`
- `Weak Link`

Recommended helper qualities:

- `knwl_last`
- `knwl_complexity`
- `knwl_whole`
- `knwl_holtext`
- `knwl_filters`
- `knwl_weak_link`

This is enough for v1. Do not build a larger concept flag set unless later testing shows a real need.

## Achievement Set

Keep the achievement set memorable.

### Player-facing achievements (keep this small)

- `first_landing`
- `tea_companion`
- `holtext_created`
- `filter_navigator`
- `framework_finished`

## Achievement meanings

### `first_landing`

Unlock when:

- the player reaches `3_harbour.scene.dry`

Purpose:

- first sense of arrival

### `tea_companion`

Unlock when:

- the player enters `4_teahouse.scene.dry`

Purpose:

- marks the shift into guided learning

### `holtext_created`

Unlock when:

- the player completes `22_holtext.scene.dry`

Purpose:

- recognizes the moment the framework becomes coherent

### `filter_navigator`

Unlock when:

- the player revisits at least one skipped filter question after seeing the results
- implement by awarding in the revisit flow (not on the results scene)

achievement: filter_navigator if fltr_result = "visited"

Purpose:

- rewards navigating the method by circling back to skipped checks (a real part of using the framework)

### `framework_finished`

Unlock when:

- the player reaches `33_framework_outro.scene.dry`

Purpose:

- gives final closure

## Helper UI State

Use a very small helper layer for sidebar display:

- `achvm_last`
- `achvm_count`
- `knwl_last`
- `knwl_complexity`
- `knwl_whole`
- `knwl_holtext`
- `knwl_filters`
- `knwl_weak_link`

Recommended meanings:

- `achvm_last`: latest unlocked achievement label
- `achvm_count`: count of earned achievements (helper for display only; badges remain `achievement_*`)
- `knwl_last`: latest unlocked concept label

Do not add `achvm-icon` in v1. Text is enough.

## Types + Defaults

Keep types consistent so conditions stay simple and reliable.

- Progress tracks: numbers
  - `jrny_progress`: `0..4`
  - `hctx_progress`: `0..9`
  - `fltr_progress`: `0..7`
- Latest lines: `0` (unset) or string
  - `achvm_last`: `0` or `"First Landing"` etc.
  - `knwl_last`: `0` or `"Complexity"` etc.
- Knowledge flags: numbers
  - `knwl_*`: `0` (not unlocked) or `1` (unlocked)
- Filter answers: `0` (unset) or string
  - `fltr_*`, `wl_*`, `em_*`, `sus_*`: `0` or `"Passed"|"Failed"|"Skipped"`

## Minimal Ruleset (No Big Guard System)

We do not need a large set of guard qualities.

Instead of incrementing progress in many scenes and trying to protect it from revisits, compute the 3 track values from the existing core qualities whenever the progress sidebar renders.

This is simpler, avoids double-counting, and automatically treats `Skipped` as valid completion.

## Initialization Plan

Update `source/scenes/root.scene.dry`.

Add `on-arrival` initialization for all new helper qualities, but only once per run.

Minimal one-time guard:

- add `home_visited` (0/1)
- in `source/scenes/1_home.scene.dry`: `on-arrival: home_visited = 1`
- in `source/scenes/root.scene.dry`: wrap the whole initialization assignment so it only runs if `home_visited = 0`

Recommended initial values:

- `jrny_progress = 0`
- `hctx_progress = 0`
- `fltr_progress = 0`
- `achvm_count = 0`
- `achvm_last = 0`
- `knwl_last = 0`
- `knwl_complexity = 0`
- `knwl_whole = 0`
- `knwl_holtext = 0`
- `knwl_filters = 0`
- `knwl_weak_link = 0`

No other guard qualities are required for v1.

## Scene Hook Plan

This section is the implementation-ready minimal mapping.

## 1) Compute track values in `progress.scene.dry`

Add an `on-display` block at the top of `source/scenes/progress.scene.dry` that sets:

- `jrny_progress` from `progress` thresholds
- `hctx_progress` from whether key framework qualities are filled in
- `fltr_progress` from whether each conceptual check has any recorded answer (including `Skipped`)

### Journey computation

Use the existing `progress` pacing number:

- `jrny_progress = 0` if `progress < 3`
- `jrny_progress = 1` if `progress >= 3`
- `jrny_progress = 2` if `progress >= 5`
- `jrny_progress = 3` if `progress >= 26`
- `jrny_progress = 4` if `progress >= 42`

This works even if the player revisits later scenes, because it always reflects the furthest milestone reached.

### Holistic Context computation (0..9)

Compute by counting completed framework parts (presence checks, not “quality of answer”):

- decision-makers: `decision_makers != 0`
- physical resources: `rb_physical != 0`
- human resources: `rb_human != 0`
- money: `wum_money != 0`
- statement of purpose: count as complete if `player != "org"` OR `st_purpose != 0`
- quality of life complete: check that the 8 `qol_*` text fields are all non-zero
- FRB people: `frb_people != 0`
- FRB environment: `frb_environment != 0`
- holtext written: `holtext != 0`

Set `hctx_progress` to that count, capped to `9`.

### Decision Checks computation (0..7), no skip penalty

Each conceptual check counts as complete if its stored answer quality is not `0`. `Skipped` counts as complete.

- Cause and Effect: `fltr_cause != 0`
- Weak Link cluster: `wl_social != 0` AND `wl_biological != 0` AND `wl_financial != 0`
- Marginal Reaction: `fltr_marginal != 0`
- Gross Profit: `fltr_profit != 0`
- Source and Use cluster: `em_source != 0` AND `em_use != 0`
- Sustainability cluster: `sus_behaviour != 0` AND `sus_environment != 0`
- Gut Feel: `fltr_gut != 0`

Set `fltr_progress` to the number of completed conceptual checks, capped to `7`.

This automatically ignores revisit double-counting and treats `Skipped` as valid completion.

## 2) Award only the player-facing achievements in key scenes

These are badges, so use persistent `achievement: ...` and let `reset_achievements.scene.dry` clear them.

- `3_harbour.scene.dry`: `achievement: first_landing`
- `4_teahouse.scene.dry`: `achievement: tea_companion`
- `22_holtext.scene.dry`: `achievement: holtext_created`
- `32_fq_revisit.scene.dry`: award `filter_navigator` when the player chooses any “Revisit …” option (put `achievement: filter_navigator if fltr_result = "visited"` on the filter scenes; the achievement is persistent so it effectively only unlocks once)
- `33_framework_outro.scene.dry`: `achievement: framework_finished`

Also set the “latest” and count helper qualities in the same scenes (do not wait for `achievement_*` to appear on the same scene):

- `achvm_last = "First Landing"` etc.
- `achvm_count` either:
  - computed in `progress.scene.dry` (recommended, minimal JS in one place), or
  - incremented alongside the achievement unlock (only safe if the awarding scene cannot be revisited; use `max-visits: 1` if needed)

## 3) Minimal “latest knowledge” line (optional but recommended)

Keep the existing minimal `knwl_last` idea, but do not build a large unlock system.

Use 3 to 5 one-time flags (`knwl_complexity`, `knwl_whole`, `knwl_holtext`, `knwl_filters`, `knwl_weak_link`) to update `knwl_last` only the first time each concept is introduced.

Implementation note (keep it Dendry-first):

- Use one consistent pattern everywhere (gate on the concept flag itself):
  - `on-arrival: knwl_<concept> = 1 if knwl_<concept> = 0; knwl_last = "<Label>" if knwl_<concept> = 0`
- Optional extra safety: also make the specific “teaching node” scene/subscene `max-visits: 1` where appropriate.

## 4. Knowledge signal hooks

Keep these minimal.

### `source/scenes/4_teahouse.scene.dry`

Unlock:

- `Complexity`

### `source/scenes/5_wum_intro.scene.dry`

Unlock:

- `Whole Under Management`

### `source/scenes/22_holtext.scene.dry`

Unlock:

- `Holistic Context`

### `source/scenes/23_fq_intro.scene.dry`

Unlock:

- `Seven Checks`

Note:

- this scene is reached before `31_fq_result.scene.dry` sets `fltr_result = "visited"`, so it is safe to set `knwl_filters` here without any `fltr_result` conditional

### `source/scenes/25_fq_weak_link.scene.dry`

Unlock:

- `Weak Link`

Rule:

- each concept only updates `knwl_last` once, the first time it is taught

## Qdisplay Plan

Replace the single all-purpose qdisplay with 3 focused qdisplays:

- `source/qdisplays/qjrny_progress.qdisplay.dry`
- `source/qdisplays/qhctx_progress.qdisplay.dry`
- `source/qdisplays/qfltr_progress.qdisplay.dry`

Each qdisplay should render:

- a short title
- one `<progress>` element
- one short status line

Recommended track titles:

- `Journey`
- `Holistic Context`
- `Decision Checks`

Do not add a knowledge qdisplay in v1.

## `progress.scene.dry` Composition Plan

Refactor only the top block. Keep the existing lower recap sections.

Recommended order:

1. `Progress` heading
2. `[+ jrny_progress : qjrny_progress +]`
3. `[+ hctx_progress : qhctx_progress +]`
4. `[+ fltr_progress : qfltr_progress +]`
5. latest achievement line if `achvm_last != 0`
6. latest concept line if `knwl_last != 0`
7. earned badges list driven by `achievement_*`
8. existing Holistic Context and filter recap

Recommended text:

- `Latest achievement: [+ achvm_last +]`
- `Latest concept: [+ knwl_last +]`

Badge rendering should be conditional, for example:

- First Landing
- Tea Companion
- Holistic Context Created
- Filter Navigator
- Framework Finished

## Styling Plan

Edit:

- `out/html/game.css`

Reason:

- this project currently styles the UI directly there
- README already points to `out/html/game.css` for stylesheet changes

Add only the styles needed for:

- dashboard container
- track cards
- latest achievement line
- latest concept line
- earned badges

If you want a nice animation in v1, keep it subtle and one-time (no looping), and tie it to a “track completed” state (e.g. when a track hits max).

## Reset Plan

Update:

- `source/scenes/reset_achievements.scene.dry`

It should also clear:

- `achvm_last`
- `achvm_count`
- `knwl_last`
- `knwl_complexity`, `knwl_whole`, `knwl_holtext`, `knwl_filters`, `knwl_weak_link`
- `home_visited`
and any other new helper qualities added for v1.


## Implementation Order

### Phase 1

- add helper qualities in `root.scene.dry`
- add the 3 qdisplay files
- refactor the top of `progress.scene.dry`
- add minimal CSS for the dashboard

### Phase 2

- wire Journey progression
- wire Holistic Context progression
- wire Decision Checks progression

### Phase 3

- add the achievement properties
- add `achvm_last`, `achvm_count`, and `knwl_last` updates
- update reset scene

### Phase 4

- test revisit behavior carefully
- remove old `qprogress` usage once the new dashboard is stable

## Acceptance Criteria

The feature is done when all of the following are true:

- a fresh run shows all 3 new tracks at zero
- the Journey track reflects the furthest milestone reached (based on `progress`)
- the Holistic Context track reaches `9` for both org and non-org paths when all required fields are filled; otherwise it stays below `9` (so the player can see something is missing)
- the Decision Checks track reaches `7` once each conceptual check has any stored answer (including `Skipped`)
- skipped sub-checks count as valid completion and do not block track progress
- revisiting scenes never duplicates track progress (tracks are computed, not incremented)
- achievements appear in the sidebar through `achievement_*` conditions
- `filter_navigator` unlocks when the player revisits at least one skipped filter after results
- the latest achievement line and latest concept line update correctly
- the left sidebar remains readable on desktop and mobile

## Explicit Non-Goals

To prevent scope creep, do not include these in the initial implementation:

- a fourth knowledge bar
- a large right-sidebar unlock tree
- complex badge metadata
- summary cards with lots of generated text

## Final Recommendation

The right v1 is not "more systems."

The right v1 is:

- 3 bars
- a few well-chosen achievements
- one concept-discovery line
- solid one-time guard logic

That will improve motivation and fun while staying faithful to the framework and keeping implementation risk low.
