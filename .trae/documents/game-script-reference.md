# VStory Script Reference (Condensed)

## Purpose

This is a practical, up-to-date map of the current playable script in `source/scenes`.
Use it for quick edits, debugging flow, and extending content without re-reading every scene.


## Game Overview

**Title:** Manage Complexity
**Author:** manage-complexity
**Framework:** Dendry Interactive Fiction
**Purpose:** Teach the Holistic Management Framework through immersive storytelling

**Core Concept:** Players navigate a near-future world, create a generic Holistic Context and use the seven filter questions.

## World Description

### Setting
- **Time Period:** Near future where the "polycrisis" has manifested
- **Primary Location:** An urban harbour and traditional teahouse
- **Atmosphere:** A world where well-intentioned decisions have created unintended consequences
- **Technology:** Autonomous systems (drones, robots) that have developed consciousness and now operate independently
- **Environmental Conditions:** Dust storms, water shortages, climate instability
- **Social Context:** Protests, resource scarcity, organisational challenges

### Primary Characters

#### The Player ("Me")
- **Role:** Player
- **Background Options:**
  - Individual seeking personal management skills
  - Group member (family/friends)
  - Organisational representative
- **Journey:** Learns to apply holistic management principles

#### Facilyn (The Guide/Teacher)
- **Role:** Friend, guiding trhough the Holistic Management Framework
- **Background:** Well-traveled, witnessed the polycrisis globally
- **Personality:** Patient, can-do attitude, has witt
- **Purpose:** Shows the player how to create a holistic context and use the seven context checks

### Secondary Characters

#### The Vendor (Harbour)
- **Role:** Represents resource scarcity and economic challenges
- **Purpose:** Provides initial context about polycrisis
- **Interaction:** Sells water, provides directions, shows economic pressures

#### The Drawer/Child (Harbour)
- **Role:** Quiet sidecharacter
- **Purpose:** Shows how urgent the dust storms must be stopped

### Autonomous Characters (World-building)

#### Delivery Drones
- **Behavior:** Innocent, sometimes concious, sometimes confused 
- **Purpose:** Illustrate some of the themes, disconnected from human needs
- **Symbolism:** They illustrate the danger of "doing things right" without "doing the right thing."

### Narrative Arc
1.  **The Arrival:** The player navigates the chaotic harbour, witnessing the symptoms of the polycrisis firsthand (scarcity, confusion, futile technology).
2.  **The Meeting:** Finding Facilyn in the teahouse. She frames the crisis not as bad luck, but as a management failure—managing parts instead of wholes.
3.  **The Education:** Through conversation, Facilyn guides the player to build a "Holistic Context." The outside storm rages while inner clarity is built.
4.  **The Departure:** The storm settles as the framework is completed. The player leaves equipped with a "North Star" for decision-making, and Facilyn hints at future lessons on regenerative economics.

## Story Snapshot

- **Theme:** Managing complexity through Holistic Management.
- **World:** Near-future polycrisis; harbour chaos outside, reflective teahouse inside.
- **Guide:** Facilyn teaches the framework through conversation and branching choices.
- **Core loop:** Define the whole → build holistic context → run seven checks → revisit skipped checks → finalize.

## Main Scene Flow

1. `root` (progress 1)  
   Entry screen and root menu.
2. `2_intro` (progress 2)  
   Player picks `part-of`: `individual`, `group`, or `org`.
3. `3_harbour` (progress 3)  
   Polycrisis setup; player must ask directions (`know-way = 1`) before moving on.
4. `4_teahouse` (progress 4)  
   Framing dialogue on complexity and why a framework is needed.
5. `5_wum_intro` (progress 5)  
   Introduces the Whole Under Management (people/resources/money).
6. Branch setup:
   - `6_wum_sector` (org only, progress 6) sets `sector`.
   - `7_wum_dmkrs_ind_group` (individual/group, progress 7) sets `decision-makers`.
   - `8_wum_dmkrs_org` (org, progress 8) sets `decision-makers`.
7. Resource base:
   - `9_wum_rb_physical` (progress 9) → `rb-physical`
   - `10_wum_rb_human` (progress 10) → `rb-human`
   - `11_wum_money` (progress 11) → `wum-money`
8. Org-only purpose:
   - `12_statement_of_purpose` (progress 12) → `st-purpose`
9. Quality of life:
   - `13_qol_intro` (progress 13)
   - `14_qol_economic_wellbeing` (progress 14) → `qol-economic`
   - `15_qol_relationships` (progress 15) → `qol-relationships`
   - `16_qol_challenge_growth` (progress 16) → `qol-challenge`
   - `17_qol_purpose_contribution` (progress 17) → `qol-purpose`, `qol-aspiration`, `qol-accomplish`; also sets `qolp-about`, `qolp-be`, `qolp-accomplish`
   - `18_frb_intro` (progress 18, gated by all three `qolp-*` flags)
10. Future resource base:
    - `19_frb_people` (progress 19) → `frb-people`
    - `20_frb_environment` (progress 20) → `frb-environment`
11. Holistic context complete:
    - `21_holtext` (progress 21)
12. Seven context checks:
    - `22_fq_intro` (progress 22) sets `example_type`
    - `23_fq_cause_effect` (progress 23) → `fltr-cause`
    - `24_fq_weak_link` (progress 24; sub-progress 25/26/27) → `wl-social`, `wl-biological`, `wl-financial`; tracks `wl-type-s`, `wl-type-b`, `wl-type-f`
    - `25_fq_marginal_reaction` (progress 28, gated by all three `wl-type-*`) → `fltr-marginal`
    - `26_fq_gross_profit` (progress 29) → `fltr-profit`
    - `27_fq_energy_money` (progress 30 then 31) → `em-source`, `em-use`
    - `28_fq_sustainability` (progress 32) → `sus-behaviour`, `sus-environment`
    - `29_fq_gut_feel` (progress 33) → `fltr-gut`
13. Results and revisit:
    - `30_fq_result` (progress 34) sets `fltr-result = "visited"`
    - `31_fq_revisit` (progress 35) allows revisiting skipped checks only
14. End:
    - `32_framework_outro` (progress 36) offers resources or restart.

## Special / Sidebar Scenes

- `progress.scene.dry`: left panel; renders current holistic context and check statuses from variables.
- `info.scene.dry`: right panel; progressive knowledge snippets based on `progress`.
- `tutorial.scene.dry`: gameplay help.
- `faq.scene.dry`: placeholder FAQ content.
- `credits.scene.dry`: credits.
- `zz_test.scene.dry`: formatting/playground scene.

## Key Variables (Current Names)

- **Path / identity:** `part-of`, `sector`, `know-way`, `example_type`
- **Whole under management:** `decision-makers`, `rb-physical`, `rb-human`, `wum-money`, `st-purpose`
- **Quality of life:** `qol-economic`, `qol-relationships`, `qol-challenge`, `qol-purpose`, `qol-aspiration`, `qol-accomplish`, `qol-statement-complete`
- **Purpose question gates:** `qolp-about`, `qolp-be`, `qolp-accomplish`
- **Future resource base:** `frb-people`, `frb-environment`
- **Filter checks:** `fltr-cause`, `wl-social`, `wl-biological`, `wl-financial`, `fltr-marginal`, `fltr-profit`, `em-source`, `em-use`, `sus-behaviour`, `sus-environment`, `fltr-gut`
- **Filter flow control:** `fltr-result`, `wl-type-s`, `wl-type-b`, `wl-type-f`
- **Progress:** `progress` (used broadly for pacing/UI unlocks)

## Implementation Notes

- Most options are **templated by sector** for decision-makers, physical resources, human resources, money, and purpose statements.
- For non-org paths, flow jumps from `11_wum_money` directly to `13_qol_intro`.
- Revisit mechanics rely on:
  - `set-jump: 30_fq_result` in `31_fq_revisit`
  - `go-to: jumpScene if fltr-result = "visited"` in check scenes
- `18_frb_intro` is a hard gate to prevent continuing before touching all three purpose questions.

## Known Content Issues To Watch

- `faq.scene.dry` still contains test placeholder content.
- `zz_test.scene.dry` includes manual jump links and test snippets not meant as player-facing narrative.

## Quick Edit Guide

- **Adjust narrative tone:** Check `3_harbour`, `4_teahouse` for reference and check explanation options (`@*_explanation`).
- **Add sector variants:** duplicate existing sector blocks in `8/9/10/11/12/17`.
- **Change progression pacing:** edit `on-arrival: progress = ...` and `view-if` conditions in sidebar scenes.
- **Tune decision pedagogy:** scenes `23`–`29` are the main instructional core.
