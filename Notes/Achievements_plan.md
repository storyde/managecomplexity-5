# Achievements and Multi-Track Progress Plan

## Goal

Replace the single visible progress bar in the scene progress.scene with a small progress dashboard that feels more like a game system while still fitting the reflective tone of the project.

Introduce separate track variables and qdisplay files for the visible progression system.

## Recommended Track Model

### Add

- `jrny-progress` for **Journy**
- `hctx-progress` for **Holistic Context**
- `fltr-progress` for **Decision Checks**
- `knwl-progress` for **Known Concepts**
- `knwl-progress-bar` for progress bar

## New Qdisplay Files

Create one qdisplay per track:

- `source/qdisplays/qjrny-progress.qdisplay.dry`
- `source/qdisplays/qhctx-progress.qdisplay.dry`
- `source/qdisplays/qfltr-progress.qdisplay.dry`
- `source/qdisplays/qknwl-progress.qdisplay.dry`
- `source/qdisplays/qknwl-progress-bar.qdisplay.dry`

The current `qprogress.qdisplay.dry` can remain temporarily during migration and then be removed after the new sidebar layout is stable.

## Track Definitions

### 1. Voyage Through Complexity

Variable: `jrny-progress`

Purpose:

- track narrative travel and chapter completion
- replace the current single story bar with something more thematic

Recommended scale:

- `0..5`

Milestones:

- `0` Not started
- `1` First Landing
- `2` Tea Companion
- `3` Context Keeper
- `4` Filter Navigator
- `5` Long View

Why a short scale works:

- it feels like a chapter map, not an admin counter
- it aligns naturally with the strongest milestone achievements
- it avoids mirroring the old `progress` system too literally

### 2. Holistic Context Forged

Variable: `hctx-progress`

Purpose:

- reward the player for building the actual framework
- make the left sidebar reflect real construction, not just story order

Recommended scale:

- `0..12`

Recommended increments:

- `1` decision-makers defined
- `2` physical resources defined
- `3` human resources defined
- `4` money defined
- `5` statement of purpose complete for organisations, or no award for non-org play
- `6` quality of life economy 
- `7` quality of life relationships 
- `8` quality of life challenge 
- `9` quality of life growth 
- `10` quality of life purpose 
- `11` quality of life contribution or accomplishment 
- `12` future resource base 

Implementation note:

The exact split can be adjusted, but the bar should track substantive framework-building steps rather than every small scene transition.

### 3. Decision Checks Mastered

Variable: `fltr-progress`

Purpose:

- show mastery of the seven filter questions in a clean, meaningful way

Recommended scale:

- `0..7`

Recommended increments:

- `1` Cause and Effect
- `2` Weak Links 
- `3` Marginal Reaction
- `4` Gross Profit
- `5` Source and Use 
- `6` Sustainability 
- `7` Gut Feel 

Important design choice:

This track should count conceptual filter completion, not every individual sub-answer.

That means:

- Weak Link advances only when all required weak-link parts are done
- Source and Use advances only when both source and use are done
- Sustainability advances only when both behaviour and environment are done

This is much better than a raw `0..11` counter because it matches the framework and feels more meaningful.

### 4. Concepts Understood

Variable: `knwl-progress`

Purpose:

- reward learning moments
- make the educational side of the story feel collectible and visible

Recommended knowledge beats:

- `1` Complexity introduced
- `2` Whole Under Management introduced
- `3` Decision makers introduced
- `4` Quality of life introduced
- `5` Resource base introduced
- `6` Holistic context introduced
- `7` Filter questions introduced
- `8` Dust storms explained (scene will be created in the future)
- `9` Plant oxidation explained (scene will be created in the future)
- `10` Additional things explained

Recommended scale:

- `0..15`

Recommended qknwl-progress qdisplay beats:

(0..0) <progress value="0" max="10">0</progress>
(1..1) <progress value="1" max="10">1</progress>
(2..2) <progress value="2" max="10">2</progress>

(10..10) <progress value="10" max="10">10</progress>

## Recommendation for Knowledge Progress

`knwl-progress += 1`

So the planning assumption should be:

- `knwl-progress` needs a qdisplay file and does not increase repeatedly on revisiting filter questions, because it is not used in the filter questions. It is only used before and in the filter questions introduction

### Additional variables for knowledge unlocks

We should introduce more variables for knowledge timing.

The four track variables are not enough on their own, because the game also needs to know:

- whether knowledge has already been unlocked
- which knowledge was unlocked most recently so the left sidebar can echo it
- which right-sidebar codex entry should become available after the left sidebar records discovery

Recommended additional knowledge-state variables:

- `knwl-last`
- `knwl-complexity`
- `knwl-whole`
- `knwl-decision-makers`
- `knwl-resource-base`
- `knwl-holistic-context`
- `knwl-dust-storms`
- `knwl-filters`
- `knwl-cause-effect`
- `knwl-weak-link`
- `knwl-marginal-reaction`
- `knwl-gross-profit`
- `knwl-source-use`
- `knwl-sustainability`
- `knwl-gut-feel`

Recommended use:

- each `knwl-*` variable acts as a one-time unlock flag
- `knwl-last` stores the label for the latest unlocked knowledge

This allows the left sidebar to cleanly show lines such as:

- `New knowledge: Weak Link`
- `New knowledge: Cause and Effect`
- `New knowledge: Whole Under Management`

And it also allows the right sidebar to unlock the matching codex entry only after the left sidebar has registered that knowledge.

## Achievement System

### How Dendry Achievements Work (Implementation Detail)

The scene property:

`achievement: some_name`

is handled automatically by the runtime engine:

- It records the achievement in `state.achievements[some_name] = 1`
- It also exposes it as a quality `achievement_some_name = 1` so it can be used in `view-if`, `choose-if`, and `[? if ... ?]` conditions.
- Achievements persist in the browser via localStorage and are rehydrated on startup, which re-populates the `achievement_*` qualities.

Important UI timing note:
the engine applies `scene.achievement` after the current scene content is rendered. If you want to display “Achievement unlocked” reliably, show it on the next scene (or in a sidebar scene like `progress.scene.dry`) rather than expecting it to appear in the same scene on first render.

### Core achievement state

Use Dendry’s built-in achievement mechanism as the source of truth:

- Award via a scene property: `achievement: <achievement_name>`
- The engine automatically sets and persists the quality `achievement_<achievement_name> = 1`
- In text/conditions, always check `achievement_<achievement_name>` (not separate custom flags)

Recommendation: keep `achievement_name` values consistent and easy to query (prefer `lower_snake_case`, e.g. `first_landing`).

Add a small set of helper qualities for UI/recency display (maintained by our own guarded logic so they don’t increment on revisits):

- `achvm_last` (text): last unlocked achievement label
- `achvm_icon` (text): icon for the last unlocked achievement
- `achvm_count` (number): total unlocked achievements (one-time increments)

Planned achievement names (become qualities like `achievement_first_landing`):

- `first_landing`
- `tea_companion`
- `holtext_created`
- `filter_navigator`
- `weak_link_spotter`

Optional:

- `framework_finished`

### Badge philosophy

Avoid arcade-style achievements.

Use achievements as moments of recognition for understanding, completion, and good stewardship.

### Improved milestone achievements

#### First Landing

Unlock when:

- the harbour is reached

Narrative role:

- first sense of arrival and entry into the world

Suggested icon:

- `⚓`

Sidebar line:

- `New achievement: First Landing`

#### Tea Companion

Unlock when:

- the teahouse is reached

Narrative role:

- marks entry into guided learning and conversation

Suggested icon:

- `☕`

Sidebar line:

- `New achievement: Tea Companion`

#### Holtext created

Unlock when:

- the Holistic Context is fully completed

Narrative role:

- the player has moved from information gathering to coherent design

Suggested icon:

- `✧`

Sidebar line:

- `New achievement: Holistic context created`

#### Filter Navigator

Unlock when:

- all seven filter-question clusters are complete

Narrative role:

- the player can now evaluate decisions instead of just naming goals

Suggested icon:

- `🧭`

Sidebar line:

- `New achievement: Filter Navigator`

### Knowledge achievements

These already fit well and should remain:

- **Weak Link Spotter** — unlock after the weak-link explanation is unlocked

Good additions:

- **Intuition** — unlock when the gut-feel explanation is unlocked after the previous filter arc
- Maybe some more about the filters?

## Sidebar Layout Plan

Replace the current single top block in `progress.scene.dry` with a compact dashboard.

### Left sidebar

The left sidebar should remain the player-state and decision-support area.

Recommended contents:

- progress tracks
- latest achievement
- Holistic Context (after it is created)
- current decision or current filter status
- latest unlocked knowledge line

Example latest knowledge lines:

- `New knowledge: Weak Link`
- `New knowledge: Cause and Effect`
- `New knowledge: Whole Under Management`

### Right sidebar

The right sidebar should remain the knowledge and reference area.

Recommended contents:

- full knowledge codex
- unlocked explanations
- deeper concept descriptions
- optional grouped sections such as `Foundations`, `Holistic Context`, and `Filters`

### Recommended order

1. dashboard title
2. four track cards
3. latest achievement line
4. latest unlocked knowledge line
5. earned achievement badges
6. Holistic Context
7. current decision or current filter status
8. optional concept chips
9. final summary card once the framework is complete

### Dashboard title

- `Progress`

### Track cards

Each card should contain:

- track title
- qdisplay-rendered progress bar
- short status text
- completed state styling when full

### Achievement line

Show a short line directly under the tracks:

- `New achievement: Holistic Context created`

### Latest knowledge line

Show a short line for the most recently unlocked knowledge beat:

- `New knowledge: Weak Link`
- `New knowledge: Cause and Effect`
- `New knowledge: Whole Under Management`

Keep this simple:

- one line only
- replaced whenever newer knowledge unlocks
- driven by `knwl-last`

### Earned badges

Show compact earned badges only for unlocked achievements.

Badges should be short and elegant:

- `⚓ First Landing`
- `☕ Tea Companion`
- `✧ Holistic Context created`
- `🧭 Filter Navigator`

### Relationship to right sidebar

The left sidebar and right sidebar should not duplicate each other.

- the left sidebar is the place that tracks and signals the unlock
- the right sidebar holds the full unlocked explanation
- both should use the same concept name so the connection is immediate
- the right sidebar should never preview locked knowledge before the left sidebar unlocks it

## Completed State and Animation

The completion effect should be subtle and celebratory.

### Visual behavior

- when a track reaches its max value, append `✦ Complete`
- apply a short shimmer effect to that card or bar
- do not animate continuously after the initial moment

### CSS approach

Add classes for:

- track card
- track card complete state
- achievement badge
- new achievement line
- shimmer effect

The shimmer should be:

- short
- elegant
- aligned with the existing glass-and-harbour aesthetic

No confetti, no looping sparkle storm, and no loud arcade treatment.

## Stronger Naming Changes

Replace utilitarian labels where possible.

### Replace

- `Creation Prozess`
- `Filter Questions`

### With

- `Voyage Through Complexity`
- `Holistic Context Created`
- `Decision Checks finished`
- `Known Concepts`

These should appear in the visible dashboard even if the underlying scene structure stays the same.

## Final Summary Card

When the player reaches the end, show a summary card in the outro section that answers:

- who is the whole under management
- what quality of life they defined
- what future resource base they committed to
- what action they tested
- what achievements they earned

Suggested card title:

- `What You Built`

This gives closure and makes the final state feel earned.

## File-by-File Implementation Plan

### 1. `source/scenes/root.scene.dry`

Initialize all new visible-progress variables and achievement variables.

Recommended initial values:

- `jrny-progress = 0`
- `hctx-progress = 0`
- `fltr-progress = 0`
- `knwl-progress = 0`
- `achievement-count = 0`
- `knwl-last = 0`

Initialize achievement flags to `0` only if needed for clarity.

Also initialize the one-time knowledge unlock flags only if explicit initialization makes the implementation easier to read.

### 2. Narrative milestone scenes

Update key scenes to award journey progress and milestone achievements:

- `3_harbour.scene.dry`
- `4_teahouse.scene.dry`
- `22_holtext.scene.dry`
- `31_fq_result.scene.dry` or `32_fq_revisit.scene.dry`
- `33_framework_outro.scene.dry`

### 3. Knowledge scenes

Add guarded one-time knowledge unlock logic to the scenes where explanation beats happen.

Primary candidates:

- `4_teahouse.scene.dry`
- `5_wum_intro.scene.dry`
- `23_fq_intro.scene.dry`
- `24_fq_cause_effect.scene.dry`
- `25_fq_weak_link.scene.dry`
- `26_fq_marginal_reaction.scene.dry`
- `27_fq_gross_profit.scene.dry`
- `28_fq_energy_money.scene.dry`
- `29_fq_sustainability.scene.dry`
- `30_fq_gut_feel.scene.dry`

### 4. Context scenes

Increment context progress only at meaningful completion points rather than every scene entry.

Primary candidates:

- `7_wum_dmkrs_one_group.scene.dry`
- `8_wum_dmkrs_org.scene.dry`
- `9_wum_rb_physical.scene.dry`
- `10_wum_rb_human.scene.dry`
- `11_wum_money.scene.dry`
- `12_statement_of_purpose.scene.dry`
- `14_qol_economic_wellbeing.scene.dry`
- `15_qol_relationships.scene.dry`
- `16_qol_challenge_growth.scene.dry`
- `17_qol_purpose.scene.dry`
- `18_qol_contribution.scene.dry`
- `20_frb_people.scene.dry`
- `21_frb_environment.scene.dry`
- `22_holtext.scene.dry`

### 5. Filter scenes

Update filter progress when each conceptual filter cluster is complete.

Primary candidates:

- `24_fq_cause_effect.scene.dry`
- `25_fq_weak_link.scene.dry`
- `26_fq_marginal_reaction.scene.dry`
- `27_fq_gross_profit.scene.dry`
- `28_fq_energy_money.scene.dry`
- `29_fq_sustainability.scene.dry`
- `30_fq_gut_feel.scene.dry`

### 6. `source/scenes/progress.scene.dry`

Refactor the top of the sidebar into the new dashboard and keep the lower written recap.

This file becomes the main composition layer for:

- track cards
- latest achievement line
- earned badges
- final summary card

### 7. New qdisplay files

Implement one display file per visible track.

Each should output:

- title
- `<progress>` element
- short status line
- `✦ Complete` when maxed

### 8. CSS layer

Add styling for the new dashboard elements in the project stylesheet used by the generated HTML.

Main targets:

- progress dashboard container
- track cards
- complete state
- shimmer animation
- achievement badges
- final summary card

## Recommended Delivery Order

### Phase 1

- add new variables
- add four qdisplay files
- replace the single progress display in the sidebar

### Phase 2

- wire up journey, context, filter, and knowledge progression
- add milestone achievements

### Phase 3

- add knowledge achievements
- add latest-achievement line
- add earned-badge rendering

### Phase 4

- add complete-state shimmer styling
- add final summary card
- remove old single-bar UI once everything is stable

## Validation Checklist

After implementation, verify:

- all new variables initialize correctly on a fresh run
- revisiting scenes does not duplicate progress or achievements
- non-organisation runs still complete the context track correctly
- weak link, source/use, and sustainability only award filter progress when their clusters are complete
- knowledge progress only increments once per concept
- the sidebar remains readable in both themes
- completion shimmer appears only on full completion states
- the final summary card renders meaningful content for all player modes

## Final Recommendation

The most important design choice is this:

Do not treat the new system as four decorative copies of the old progress bar.

Each track should represent a different kind of accomplishment:

- narrative travel
- framework construction
- decision mastery
- learning and knowledge

That difference is what will make the experience feel exciting instead of merely more crowded.
