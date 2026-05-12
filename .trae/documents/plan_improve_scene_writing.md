## Goal
Improve the writing in the listed Dendry scene files while preserving:
- Scene structure, tags, branching logic, variables, and educational content
- Existing Dendry syntax conventions
- Facilyn’s character voice (thoughtful, observant, warm; not lecturey)
- A quiet, plausible, near-future teahouse atmosphere, with occasional storm presence
Also refresh background “moments” (not always robots) using the tone/examples in `Notes\Drones_scenes.dry`.

## Scope (Files)
Writing-only pass for:
- `source\scenes\5_wum_intro.scene.dry`
- `source\scenes\6_wum_sector.scene.dry`
- `source\scenes\7_wum_dmkrs_one_group.scene.dry`
- `source\scenes\8_wum_dmkrs_org.scene.dry`
- `source\scenes\9_wum_rb_physical.scene.dry`
- `source\scenes\10_wum_rb_human.scene.dry`
- `source\scenes\11_wum_money.scene.dry`
- `source\scenes\12_statement_of_purpose.scene.dry`
- `source\scenes\13_qol_intro.scene.dry`
- `source\scenes\14_qol_economic_wellbeing.scene.dry`
- `source\scenes\15_qol_relationships.scene.dry`
- `source\scenes\16_qol_challenge_growth.scene.dry`
- `source\scenes\17_qol_purpose.scene.dry`
- `source\scenes\18_qol_contribution.scene.dry`
- `source\scenes\19_qol_textarea.scene.dry`
- `source\scenes\20_frb_people.scene.dry`
- `source\scenes\21_frb_environment.scene.dry`
- `source\scenes\22_holtext.scene.dry`
- `source\scenes\23_fq_intro.scene.dry`
- `source\scenes\24_fq_cause_effect.scene.dry`
- `source\scenes\25_fq_weak_link.scene.dry`
- `source\scenes\26_fq_marginal_reaction.scene.dry`
- `source\scenes\27_fq_gross_profit.scene.dry`
- `source\scenes\28_fq_energy_money.scene.dry`
- `source\scenes\29_fq_sustainability.scene.dry`
- `source\scenes\30_fq_gut_feel.scene.dry`
- `source\scenes\31_fq_result.scene.dry`
- `source\scenes\32_fq_revisit.scene.dry`
- `source\scenes\33_framework_outro.scene.dry`

## Non-Goals (Hard Constraints)
- Do not add/remove nodes, change `@` labels, `go-to` targets, tags, ordering, view-if logic, or variable names.
- Do not change the meaning of the Holistic Management content; only improve how it is delivered.
- Do not significantly increase length; prefer tightening and better rhythm.
- Do not introduce new lore/plot arcs.

## Editorial Approach
### 1) Establish voice + texture rules
- Keep Facilyn’s lines short-to-medium, with pauses and small observations.
- Convert “workshop” phrasing into conversational beats: question → brief explanation → grounded example.
- Add physical grounding via teahouse objects (paper, pen, cups, window, coats, tea steam) and harbor details.
- Replace some robot-only moments with people/kids/weather/harbor activity (still near-future; robots remain background texture; can be humorous).
- Mention the storm subtly 3-7 times across the full arc (already present in places; add only if needed and in-scene appropriate).

### 2) Per-scene revision pass (repeatable checklist)
For each scene file:
- Preserve all structural lines (titles, subtitles, tags, `@` blocks, `view-if`, `on-arrival`, `go-to`, `jumpScene`, inline HTML/JS blocks).
- Rewrite only dialogue/narration text lines to:
  - Improve flow and reduce abstract/lecture tone
  - Increase embodiment (small actions, sensory cues)
  - Keep instructions clear and player-facing
- Audit consistency:
  - Terminology (e.g., “whole under management”, “future resource base”, “context checks”)
  - Spelling (meaningful, always, etc.)
  - Tone alignment across consecutive scenes

### 3) Background “moments” strategy
- Maintain the existing “quiet cutaway” cadence: 1 short moment per explanation-heavy section.
- Rotate types:
  - Robot moments (subtle, plausible tasks; quiet humor)
  - Human moments (kids counting drones, someone shaking off rain, a worker fixing a sign)
  - Weather/harbor moments (wind gusts, tide, distant engines, awning snapping, rain on glass)
- Ensure moments do not distract or add new decisions; they should be single-beat atmosphere lines.

### 4) Special handling notes (known hotspots)
- `19_qol_textarea.scene.dry`: Keep the textarea HTML/JS intact; only adjust surrounding prose and placeholders if needed.
- `22_holtext.scene.dry` and `31_fq_result.scene.dry`: Preserve the “Paper:” blocks and variable inserts exactly.
- `33_framework_outro.scene.dry`: Keep the reload script untouched; focus on outro warmth, closure, and calm tone.
- Checks scenes (`24`–`30`): Keep each check’s core question identical or semantically identical; improve setup and examples around it.

## Implementation Steps (Execution Phase)
1) Create a working list of target scenes and revise in narrative order (5 → 33) to preserve voice continuity.
2) For each scene:
   - Make a first pass tightening and grounding Facilyn’s lines.
   - Make a second pass ensuring the cutaway moment is appropriate, varied, and brief.
   - Confirm no structural keys changed (labels, variables, tags, navigation).
3) Do a final continuity sweep across scenes:
   - Facilyn’s tone consistency
   - Storm mentions count and placement (3–7 total, subtle)
   - Humor level stays understated

## Verification
- Do not build the game, as I will do that manually 

## Acceptance Criteria
- All listed scene files read as a calm, embodied teahouse conversation (not a workshop).
- Facilyn’s voice is consistent: observant, warm, concise, not preachy.
- Background moments feel varied (robots + people + weather), with near-future plausibility.
- Dendry structure and logic remain unchanged and build succeeds.
