# snake_case transition plan (qualities)

Qualities should use `snake_case` to be compatible with JavaScript identifier access (e.g., `Q.qol_economic`), because kebab-case (`qol-economic`) isn’t a valid JS identifier, and camelCase is less reader-friendly for this project.

## Scope

- Convert only quality keys (variables stored in `state.qualities`, referenced via `view-if`, `choose-if`, `on-arrival`, `[+ ... +]`, `Q["..."]`, `data-quality="..."`, etc.).
- Do not change Dendry syntax/property names that are intentionally kebab-case (examples: `new-page`, `count-visits-max`, `first-scene`, `on-arrival`, `go-to`, `set-bg`).

## Inventory + mapping (current -> new)

Rule: replace `-` with `_`.

| Current (kebab-case) | New (snake_case) |
|---|---|
| `qol-economic` | `qol_economic` |
| `qol-balance` | `qol_balance` |
| `qol-relationships` | `qol_relationships` |
| `qol-challenge` | `qol_challenge` |
| `qol-growth` | `qol_growth` |
| `qol-purpose` | `qol_purpose` |
| `qol-aspiration` | `qol_aspiration` |
| `qol-accomplish` | `qol_accomplish` |
| `frb-people` | `frb_people` |
| `frb-environment` | `frb_environment` |
| `decision-makers` | `decision_makers` |
| `rb-physical` | `rb_physical` |
| `rb-human` | `rb_human` |
| `wum-money` | `wum_money` |
| `st-purpose` | `st_purpose` |
| `fltr-result` | `fltr_result` |
| `fltr-cause` | `fltr_cause` |
| `wl-social` | `wl_social` |
| `wl-biological` | `wl_biological` |
| `wl-financial` | `wl_financial` |
| `fltr-marginal` | `fltr_marginal` |
| `fltr-profit` | `fltr_profit` |
| `em-source` | `em_source` |
| `em-use` | `em_use` |
| `sus-behaviour` | `sus_behaviour` |
| `sus-environment` | `sus_environment` |
| `fltr-gut` | `fltr_gut` |

## Update locations to cover

In `source/scenes/**/*.scene.dry`:

- Conditions: `view-if:` / `choose-if:` expressions referencing qualities (e.g., `qol-economic != 0`).
- State setting: `on-arrival:` assignments (e.g., `fltr-gut = "Passed"`).
- Quality display: `[+ quality +]` and `[+ quality : qdisplay +]`.
- JavaScript blocks: `Q["quality-name"]` / `Q['quality-name']`.
- Raw HTML bindings: `data-quality="quality-name"` where UI code writes directly into `state.qualities[...]`.

In `source/qdisplays/**/*.qdisplay.dry`:

- Usually no change unless a qdisplay embeds `[+ quality-name +]` (search to confirm).

In `source/info.dry`:

- Do not change `first-scene` or any other Dendry properties.

## Migration strategy

No save-compatibility migration needed (game is still under development). Convert all references in-place so the canonical keys become `snake_case` everywhere.

## Execution steps

1. Create a one-time checklist-driven pass:
   - Update every occurrence of each kebab-case quality in the mapping table to snake_case across `source/`.
   - Pay special attention to `data-quality="..."` and `Q["..."]` strings (these are easy to miss).
2. No need to build the game, that will be done manually
3. Cleanup follow-up (later):
   - Confirm verification searches return zero for the old kebab-case keys.

## Verification searches (should return zero for qualities)

- `Q["...-..."]` / `Q['...-...']`
- `data-quality="...-..."`
- `\[\+\s*...-...` (quality display)
- Prefix checks: `qol-`, `frb-`, `rb-`, `wum-`, `st-`, `fltr-`, `wl-`, `em-`, `sus-`, `decision-makers`
