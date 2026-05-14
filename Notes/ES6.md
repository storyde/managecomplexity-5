# Safe ES6 Transition Plan For Dendry Browser UI

## Purpose

This note documents a safe migration strategy for adopting ES6+ in the Dendry browser UI layer without breaking the legacy runtime model used by the current engine.

Primary analysis inputs:

- `p:\Documents\GitHub\dendry-chat\lib\ui\browser.js`
- `p:\Documents\GitHub\dendry-chat\lib\engine.js`
- `p:\Documents\GitHub\dendry-chat\lib\ui\content\html.js`
- existing project note history in this file

This document is written for future AI-assisted refactoring. Treat the compatibility rules below as constraints, not suggestions.

## Executive Summary

`browser.js` is not a pure ES5 browser file anymore, but it still depends on a legacy Dendry execution model:

- source structure is old-style CommonJS + IIFE + constructor/prototype inheritance
- game logic and story code are revived from JSON and executed via `new Function('state', 'Q', source)`
- runtime customization depends on globals attached to `window`
- several UI hooks are looked up dynamically on `window`
- prototype methods and some callbacks still rely on dynamic `this`
- the file already assumes a fairly modern browser because it uses APIs such as `Array.from`, `String.prototype.startsWith`, `Array.prototype.includes`, `Element.closest`, `Element.matches`, `classList`, `requestAnimationFrame`, and `performance.now`

This means the real migration challenge is not "ES5 to ES6 syntax". The actual challenge is preserving:

- the engine's dynamic execution model
- global hook visibility
- browser compatibility for the shipped bundle
- the DOM contract expected by the UI

The safest path is:

1. keep the distributed browser bundle ES5-compatible
2. allow ES6+ in source files only after introducing transpilation
3. preserve all engine-facing globals and dynamic-`this` call sites
4. introduce compatibility shims before converting syntax aggressively
5. modernize in phases, with runtime regression checks after each phase

## Audit Summary

### 1. Runtime Environment Constraints

`browser.js` is browser-only and assumes the following globals and platform capabilities exist at runtime:

- `window`
- `document`
- DOM readiness via `DOMContentLoaded`
- `localStorage`
- `Audio`
- `Image`
- `requestAnimationFrame`
- `performance.now`
- modern DOM selector APIs

It is also bundled from CommonJS modules:

- `require('./content/html')`
- `require('../engine')`

This indicates the source is authored for a Browserify-style bundle, not for native ES modules in the browser.

Additional toolchain signal from `dendry-chat/package.json`:

- Browserify is present
- JSHint/JSCS-era lint tooling is present
- Node engine target is `>= 0.10`

That does not mean the browser bundle must run in IE-era browsers today, but it does mean the build pipeline and code organization were originally designed around an older JavaScript baseline.

### 2. ES5-Style Syntax And Structural Patterns In `browser.js`

The file still uses many pre-ES6 patterns:

- IIFE wrapper: `(function() { 'use strict'; ... }());`
- `var` everywhere
- constructor function pattern: `var BrowserUserInterface = function(game, content) { ... }`
- prototype method assignments: `BrowserUserInterface.prototype.displayContent = function(...) { ... }`
- pseudo-inheritance via `engine.UserInterface.makeParentOf(BrowserUserInterface)`
- callback aliasing with `var self = this` and `var that = this`
- classic `for` loops for choice rendering and slot population
- CommonJS `require(...)`

These are safe candidates for source-level modernization, but only after compatibility rules are in place.

### 3. Engine-Specific Dependencies

The browser UI is tightly coupled to engine behavior and engine data structures.

#### Engine execution model

In `engine.js`, Dendry turns JSON `$code` blocks into executable functions via:

```js
var fn = new Function('state', 'Q', source);
```

Those functions are later invoked with:

```js
fn.call(context, state, state.qualities);
```

Implications:

- story/runtime code executes in a dynamic context
- `this` may matter
- `Q` is passed as a function parameter, not imported
- code that expects global objects still depends on `window`
- any migration that changes how callbacks bind `this` can break behavior

#### UI inheritance contract

`browser.js` depends on the engine's UI interface surface:

- `displayContent`
- `displayChoices`
- `displayGameOver`
- `removeChoices`
- `beginOutput`
- `endOutput`
- `newPage`
- `setStyle`
- `signal`
- `setBg`
- `setSprites`
- `setSpriteStyle`
- `audio`

This is not just presentation code. It is the engine's concrete browser implementation.

#### Engine state coupling

`browser.js` directly reads and mutates engine state:

- creates `this.dendryEngine = new engine.DendryEngine(this, game)`
- reads `this.dendryEngine.state.sceneId`
- exports save data from `this.dendryEngine.getExportableState()`
- restores state via `this.dendryEngine.setState(...)`
- mutates `this.dendryEngine.state.sprites[loc]`
- triggers story progression via `this.dendryEngine.choose(choice)`

This means refactors cannot treat the UI as independent from the engine.

### 4. Global Window Hook Dependencies

The UI supports extension by reading optional globals from `window`:

- `window.game.compiled`
- `window.dendryUI`
- `window.dendryModifyUI(ui)`
- `window.onDisplayContent()`
- `window.onNewPage()`
- `window.handleSignal(signal, event, scene_id)`
- `window.setSprites(data)`
- `window.setSprite(loc, img)`
- `window.setSpriteStyle(loc, style)`

The content renderer also checks:

- `window.displayText(contentObj)`
- `window.displayParagraphHTML(paragraphHTML)`

These hooks are the strongest reason not to assume module-local scope is enough. If a helper is needed by Dendry runtime code or by inline HTML/event code, it must remain reachable from `window` or from another intentionally exposed compatibility namespace.

### 5. Browser-Feature Dependencies Already Present

Although the source looks old, the runtime baseline is already modern in several places. `browser.js` depends on:

- `Object.keys(...).forEach(...)`
- `window.getComputedStyle(...)`
- `performance.now()`
- `requestAnimationFrame(...)`
- `Array.from(...)`
- `NodeList.prototype.forEach(...)`
- `String.prototype.startsWith(...)`
- `Array.prototype.includes(...)`
- `Element.prototype.matches(...)`
- `Element.prototype.closest(...)`
- `Element.prototype.remove(...)`
- `classList`

This matters for migration planning:

- some ES6+ source syntax can be transpiled safely
- but transpilation alone is not enough if older browsers must still run the output
- polyfills are required for API-level compatibility

### 6. DOM Contract Expected By `browser.js`

The UI assumes specific elements already exist in the page:

- `#content`
- `#bg1`
- `#bg2`
- `#topLeftSprite`
- `#topRightSprite`
- `#bottomLeftSprite`
- `#bottomRightSprite`
- `#save`
- `#options`
- save/load controls such as `#save_info_*`, `#save_button_*`, `#delete_button_*`

This means syntax migration must not be mixed with markup-contract changes in the same phase.

### 7. Functional Capabilities Provided By The Current Engine/UI Pair

The current implementation supports all of the following and depends on current engine capabilities to do so:

- parse compiled game JSON from `window.game.compiled`
- instantiate the engine and begin the game
- render paragraphs and inline content via `contentToHTML`
- render choices with availability and subtitles
- remove old choices and hidden spans between steps
- mark the current read position and animate scrolling
- support page transitions with optional fade animation
- trigger lifecycle hooks for new page and content display
- apply style classes to the content container
- pass through engine signals to optional external handlers
- manage backgrounds, colors, gradients, and image URLs
- manage portrait/sprite rendering and sprite styles
- play, queue, loop, fade, and stop audio
- persist UI settings in `localStorage`
- autosave, quick save/load, save slots, load slots, and delete slots
- populate options and save/load dialogs
- handle delegated choice clicks from the content area

Any migration plan must preserve this full capability set unless a later phase explicitly retires one of these features.

## Compatibility Risks

### High Risk

#### 1. Breaking global visibility with `const`/`let`

Top-level `const` and `let` do not become `window` properties. If custom game code, browser hooks, or Dendry-evaluated code expects a symbol on `window`, the symbol will disappear after a naive refactor.

Safe rule:

- if the runtime must discover something globally, assign it explicitly

```js
const hooks = { onDisplayContent() {} };
window.onDisplayContent = hooks.onDisplayContent;
```

#### 2. Breaking dynamic `this` with arrow functions

Arrow functions capture lexical `this`. They must not replace:

- prototype methods that may rely on instance `this`
- callbacks intentionally using `.call(...)`
- engine/runtime functions that depend on Dendry's call context
- DOM/event handlers where `this` or rebinding semantics matter

Safe rule:

- use arrow functions only for callbacks that do not depend on dynamic `this`
- use normal functions or method shorthand when rebinding is required

#### 3. Assuming transpilation solves everything

Babel can transform syntax, but it does not automatically add support for missing browser APIs such as:

- `Array.from`
- `includes`
- `startsWith`
- `closest`
- `matches`
- `remove`
- `requestAnimationFrame`

If older browsers are still in scope, polyfills remain mandatory.

#### 4. Refactoring globals into modules without a compatibility bridge

Moving all helpers into module scope can break:

- inline HTML event handlers
- Dendry-evaluated story code
- UI customization hooks
- global access to `window.dendryUI`

Safe rule:

- migrate implementation internals to modules, but keep a stable browser-facing compatibility layer

### Medium Risk

#### 5. Migrating to native ES modules too early

The current bundle flow is CommonJS + Browserify. A premature switch to native `import`/`export` changes the build pipeline and increases risk. Syntax modernization should happen before module-system modernization.

#### 6. Combining syntax refactor with behavioral refactor

`browser.js` contains UI logic, animation timing, persistence, DOM assumptions, and engine bridging. Converting syntax and changing behavior in the same commit will make regressions hard to isolate.

#### 7. Implicit browser baseline mismatch

The file already uses modern APIs, so the real browser support baseline may be narrower than the legacy coding style suggests. Without an explicit support matrix, the project can accidentally ship code that is "modern in source, partially modern in runtime, and undefined in support policy."

### Low Risk But Worth Tracking

#### 8. Prototype-to-class conversion side effects

Converting constructor/prototype code to `class` is usually safe, but it may change details that old tooling, tests, or monkey-patching rely on. Do this only after the compatibility harness exists.

#### 9. Existing implementation defects becoming harder to trace

`browser.js` includes areas that already deserve targeted review independent of ES6 adoption. Example: `setSprites` contains an object branch that references `sprites` without defining it and iterates `for (var key in Object.keys(data))`, which does not read object keys correctly. Migration work should not mask existing defects.

## Non-Negotiable Migration Rules

Future refactors should follow these rules:

1. Do not remove `window.dendryUI`.
2. Do not remove `window.game.compiled` consumption without coordinating a broader engine/bootstrap rewrite.
3. Do not replace Dendry-executed or hook-facing dynamic functions with arrows unless proven safe.
4. Do not assume module-local bindings are visible to story code or HTML event code.
5. Do not ship ES6+ source directly to the browser without a transpilation decision.
6. Do not mix DOM contract changes with syntax modernization.
7. Do not modernize engine-evaluated string code and browser UI source under the same risk envelope.

## Recommended Transition Architecture

Adopt a three-layer model:

### Layer A: Modern source

Allow ES6+ in source files for maintainability:

- `const` / `let`
- template literals
- destructuring
- default parameters
- method shorthand
- optional use of `class` after compatibility stabilization

### Layer B: Compatibility bridge

Expose only the required global surface:

- `window.dendryUI`
- bootstrap hooks needed by the engine
- any helper namespace that story code or inline handlers must call

Example:

```js
const dendryHooks = {
  onDisplayContent() {},
  onNewPage() {},
  handleSignal(signal, eventName, sceneId) {}
};

window.onDisplayContent = dendryHooks.onDisplayContent;
window.onNewPage = dendryHooks.onNewPage;
window.handleSignal = dendryHooks.handleSignal;
```

### Layer C: Transpiled browser bundle

Ship an ES5-compatible output bundle unless the project explicitly raises the browser support baseline and verifies every deployed environment.

## Phased Implementation Roadmap

### Phase 0: Freeze The Contract

Goal: define what must not break.

Tasks:

1. Inventory all global hooks and globals used by runtime code.
2. Document the required DOM IDs and modal/sprite/background elements.
3. Record the current browser support target for the shipped game.
4. Add a regression checklist for:
   - game startup
   - content rendering
   - choice selection
   - new-page behavior
   - save/load
   - audio
   - backgrounds
   - sprite rendering
   - custom window hooks
5. Keep `browser.js` behavior unchanged in this phase.

Milestone:

- a written compatibility matrix exists and the current bundle is the known-good baseline

### Phase 1: Introduce Build Safety Nets

Goal: allow ES6+ source without changing shipped runtime behavior.

Tasks:

1. Add Babel to the browser bundle pipeline.
2. Keep Browserify for now.
3. Transpile UI source to ES5 output.
4. Add polyfills for APIs already used by `browser.js` if older browser support is required.
5. Build the bundle and verify that `window`-based hooks still work unchanged.

Milestone:

- source may use limited ES6+, shipped output remains compatible with the current runtime contract

### Phase 2: Low-Risk Syntax Modernization

Goal: improve readability without touching runtime contracts.

Allowed changes:

- `var` to `const` / `let`
- method shorthand in plain objects
- template literals for string construction
- destructuring in local-only code
- arrows only for callbacks that do not use dynamic `this`

Forbidden changes in this phase:

- removing any `window.*` hook
- converting prototype methods that may rely on instance context
- replacing dynamic callbacks with arrows blindly
- changing module format

Milestone:

- source readability improves, bundle behavior stays identical

### Phase 3: Extract A Compatibility Layer

Goal: isolate legacy assumptions.

Tasks:

1. Create a dedicated browser-compat module that owns all `window` exposure.
2. Move optional hook lookups behind small wrapper functions.
3. Centralize bootstrapping of:
   - `window.dendryUI`
   - `window.game`
   - content-renderer hooks
   - sprite/background/audio extension hooks
4. Keep the public global names stable even if the internal implementation moves.

Milestone:

- legacy global behavior is preserved by a single, explicit adapter layer

### Phase 4: Modernize Internal Structure

Goal: reduce maintenance cost after the adapter exists.

Candidate refactors:

- constructor/prototype to `class`
- extracted modules for audio, save system, rendering, animation, and sprite handling
- removal of `var self = this` patterns in favor of safe lexical captures
- clearer state/config objects

Guardrails:

- public browser/global API must remain unchanged
- regression checklist must pass after each sub-refactor

Milestone:

- internal code is modernized while external behavior remains stable

### Phase 5: Reassess Browser Baseline

Goal: decide whether ES5 output is still required.

Tasks:

1. Review actual deployment browsers.
2. If only evergreen browsers are supported, reduce polyfills selectively.
3. Only after that, consider raising the transpilation target above ES5.
4. Do not remove the compatibility bridge until inline/game/runtime dependencies are eliminated.

Milestone:

- browser support policy is explicit and reflected in the build target

## Required Transpilation And Polyfill Configuration

### Recommended Initial Build Strategy

Keep the existing bundling model and add Babel in front of the shipped browser bundle.

Recommended baseline:

- Browserify remains the bundler
- Babel handles syntax transforms
- the output bundle targets ES5
- polyfills are added only for actually required APIs

### Recommended Babel Configuration

Example `.babelrc`:

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": [
            "defaults"
          ]
        },
        "modules": "commonjs",
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ]
}
```

Notes:

- if Browserify already consumes CommonJS source directly, keeping `modules: "commonjs"` is safe and simple
- if a later bundler change is made, revisit the module setting
- if the project supports only evergreen browsers, the target can later be raised, but not during the initial migration

### Recommended Browserify Integration

Example direction:

```bash
browserify lib/ui/browser.js -t [ babelify --extensions .js ] -o out/html/core.js
```

Keep this conservative:

- do not replace Browserify and add Babel in the same phase
- do not introduce native browser ESM in the first migration pass

### Polyfills To Consider

If backward browser support is required, verify and polyfill as needed for:

- `Array.from`
- `Array.prototype.includes`
- `String.prototype.startsWith`
- `Element.prototype.closest`
- `Element.prototype.matches`
- `Element.prototype.remove`
- `NodeList.prototype.forEach`
- `requestAnimationFrame`
- `performance.now`

If the support policy is evergreen-only, document that explicitly and omit unnecessary polyfills intentionally.

### Backward-Compatibility Layer Requirements

The compatibility layer must guarantee:

1. required globals are attached to `window`
2. hook names stay stable
3. Dendry-executed code can still reach whatever helpers it expects
4. dynamic `this` behavior is preserved where required
5. inline HTML handlers continue to resolve global references

Example pattern:

```js
const compat = {
  expose(name, value) {
    window[name] = value;
    return value;
  }
};

const ui = compat.expose('dendryUI', new BrowserUserInterface(game, contentNode));
compat.expose('onDisplayContent', onDisplayContent);
compat.expose('onNewPage', onNewPage);
compat.expose('handleSignal', handleSignal);
```

## Safe ES6 Usage Rules

### Safe by default

- `const` / `let` inside modules and local scopes
- template literals
- destructuring for local variables
- object method shorthand
- arrow functions for purely local callbacks with no dynamic `this`

### Use with care

- `class` conversion for engine-facing objects
- default exports / named exports if Browserify remains in place
- async abstractions if they change load order or hook timing

### Avoid until proven safe

- replacing `window` globals with module-local bindings only
- arrow functions for prototype methods, hook functions, or Dendry-executed callbacks
- immediate migration to native `import`/`export` across the browser UI
- simultaneous syntax rewrite and behavioral cleanup

## AI Execution Checklist

Any future AI making changes in this area should follow this sequence:

1. Read `lib/ui/browser.js`, `lib/engine.js`, and `lib/ui/content/html.js`.
2. List every `window.*` dependency before editing.
3. Check whether the target function relies on dynamic `this`.
4. Distinguish syntax changes from behavior changes.
5. Preserve `window.dendryUI` and bootstrap behavior unless explicitly redesigning the engine contract.
6. Verify save/load, choices, scrolling, and content hooks after every phase.
7. If a helper must be callable from Dendry runtime code, expose it explicitly on `window`.
8. If browser support below evergreen is required, verify polyfills as well as transpilation.

## Final Recommendation

The correct migration strategy is not "rewrite `browser.js` into modern syntax and hope the engine tolerates it." The correct strategy is:

- modernize source incrementally
- keep the shipped runtime contract stable
- add transpilation before broad syntax adoption
- expose globals deliberately
- preserve dynamic `this` where engine/runtime semantics require it
- isolate legacy assumptions behind a compatibility layer

That approach allows ES6+ authoring while preventing disruptions to the legacy Dendry engine model that the current codebase still depends on.
