# Dendry Framework Syntax Reference

This is a comprehensive reference for the Dendry interactive fiction framework syntax, compiled from documentation and examples.

## File Types and Structure

### File Naming Convention

Dendry uses a three-component naming system: `name.type.dry`

* **Scene files**: `filename.scene.dry`

* **Quality files**: `filename.quality.dry`

* **QDisplay files**: `filename.qdisplay.dry`

* **Info file**: `info.dry` (project metadata)

### Project Structure

```
source/
├── info.dry              # Game metadata
├── scenes/               # Scene files
│   ├── root.scene.dry   # Required starting scene
│   └── *.scene.dry      # Other scenes
├── qualities/            # Quality definitions
│   └── *.quality.dry
└── qdisplays/           # Quality display definitions
    └── *.qdisplay.dry
```

## File Format Basics

### Comments

```
# This is a comment (must be on its own line)
```

### Properties

```
title: Scene Title
subtitle: Optional subtitle
view-if: condition > 0
tags: tag1, tag2, tag3
```

**Note**: Scene files start with a `title` property. They do not need an `@scene_id` property. The @scene_id is automatically derived from the filename.

### Multi-line Properties

```
choose-if: sunny > 1 and last_rain < 2 or
   cares_about_weather = 0
```

### Content Separation

Properties are separated from content by a **double blank line**.

## Scene Files (.scene.dry)

### Basic Scene Structure

```
title: Scene Title
subtitle: Optional subtitle
new-page: true

This is the scene content.

- @other_scene: Link to another scene
- @another_scene: Link to yet another scene
```

Or using tag choices:

```
This is the scene content.

- #tag_name

@another_scene
title: Scene with tags
tags: tag_name

Add this scene to the choices by giving it the tag tag_name
```

### Scene Properties

#### Required Properties

* **id**: At the top, this is automatically derived from filename

* **type**: This is automatically set to "scene"

* **content**: The main text content

#### Display Properties

* `title: Scene Title`

* `subtitle: Optional subtitle`

* `unavailable-subtitle: Shown when scene unavailable`

* `new-page: true/false` - Clear previous content

#### Conditional Properties

* `view-if: condition` - When scene is visible

* `choose-if: condition` - When scene is selectable

#### Navigation Properties

* `go-to: scene1; scene2 if condition` - Automatic navigation
* `go-to-ref: variable_name` - Navigate to scene stored in variable

* `go-sub: subscene` - Call subscene

#### Visit Control

* `max-visits: 1` - Maximum times scene can be visited

* `count-visits-max: 5` - Track visits up to this number

#### Event Handlers

* `on-arrival: variable = value; other_var = 2` - Often used to set quality variables

* `on-departure: cleanup_code` - Executes when leaving this scene 

* `on-display: display_code` - Executes when scene content is displayed/redisplayed 

#### Organization

* `tags: tag_one, tag_two` - Group scenes by tags

* `order: 10` - Display order for tagged scenes

* `priority: 5` - Selection priority (starts at 1, higher pushes out lower)

* `frequency: 100` - Frequency weight (default 100, higher = more likely)

* `signal: signal_name` - Signal identifier for the scene

* `style: css_class` - CSS class for styling

#### Choice Control

* `min-choices: 2` - Minimum choices to show

* `max-choices: 5` - Maximum choices to show

#### Special Properties

* `game-over: true` - End game at this scene

* `is-special: true` - Mark as special (credits, settings)

* `is-top: true` - Mark as top-level scene

* `set-root: true` - Set as new root scene

* `set-bg: image.png` - Set background image

* `set-sprites: sprite_config` - Set sprite configuration

* `set-music: music_file` - Set background music (experimental)

* `set-jump: scene_id` - Set jump point

* `achievement: achievement_name` - Unlock achievement

### Sub-scenes

Define multiple scenes in one file using `@scene_id`:

```
title: Main Scene

Main scene content.

- @subscene1: Go to subscene 1
- @subscene2: Go to subscene 2

@subscene1
title: Subscene 1

Subscene 1 content.

@subscene2
title: Subscene 2

Subscene 2 content.
```

#### Special scene names

prevScene - always goes to the previous scene.

jumpScene - always goes to the scene designated by the last set-jump command.

backSpecialScene - goes to the previous scene visited before entering the last visited special scene (a special scene is designated by is-special: true).

### Dialogue Formatting Guidelines

Direct speech in the game should follow these formatting rules:

1. Do not use quotation marks ("") for dialogue
2. Each line of dialogue should start after a blank line on a new line
3. Begin dialogue lines with the speaker's name followed by a colon
4. Maintain consistent spacing after the colon

Examples:

Facilyn: Welcome to the teahouse. Please, make yourself comfortable.

Me: Thank you for having me here.

Common speakers:
- Facilyn (The Guide)
- Me (The Player)
- Vendor (Harbour NPC)
- Child (Harbour NPC)

Note: This format helps maintain clarity and consistency throughout the narrative while making it easy to identify who is speaking.

### Choice Syntax

#### Basic Choices

```
- @scene_id: Choice text
- @scene_id  # Uses scene's own title
```

#### Tagged Choices

```
# Shows all scenes with this tag

- #tag_name  
```

**Important**: Tag choices (`#tag_name`) cannot have custom titles. They automatically use the titles of the scenes they reference.

#### Choice Properties

Choice properties like `view-if`, `choose-if`, `order`, `priority`, and `frequency` are defined as scene-level properties, not as indented properties under individual choices. See the "Scene Properties" section for details on how to use these properties.

```
- @scene_id: Choice text
- @another_scene
```

## Text Formatting

### Basic Formatting

```
*emphasis* - italic text
**strong emphasis** - bold text
> paragraph - quotation
>> paragraph - attribution  
= paragraph - heading
--- - horizontal rule
<br> - line break
<newline> - manual line break
<blank line> - paragraph break
```

### Conditional Text

```
[? if condition : text to show ?]
[? if var = 1 : This shows when var equals 1 ?]
```

### Quality Display

```
[+ quality_name +] - Display quality variable value
[+ quality_name : qdisplay_name +] - Display with custom format
```

### Hidden Text

```
[some text] - Creates hidden/grayed out text
```

### Raw HTML

```
{!<span class="custom">HTML content</span>!}
{!<img src="path/to/image.jpg">!} - Include images
```

**Note**: Anything within `{! ... !}` is treated as arbitrary HTML and passed through to the output.

## JavaScript Integration

### In Properties

#### on-arrival, on-departure, on-display
```
on-arrival: {! Q['variable'] = Math.random() * 10; !}
on-arrival: Q.quality1 = 10; Q.quality2 = Q.quality1 * 2
```

#### view-if, choose-if
```
view-if: {! return Q['health'] > Q['damage']; !}
choose-if: {! return ((Q['a'] || 0) === (Q['b'] || 0)); !}
```

**Important**: In view-if/choose-if JavaScript blocks, you must end with `return [boolean];`

### In Content

```
{! 
  // JavaScript code here
  Q['calculated_value'] = Q['base'] * Q['multiplier'];
!}
```

### Quality Access

* `Q['variable_name']` - Access/set quality values

* `Q.variable_name` - Alternative syntax when the name is a valid JavaScript identifier

## Quality Files (.quality.dry)

### Basic Structure

```
name: quality_name
initial: 5
min: 0
max: 100

Description of this quality.
```

### Properties

* `name: quality_name` - Required

* `initial: 0` - Starting value

* `min: 0` - Minimum value

* `max: 100` - Maximum value

* `signal: signal_name` - Signal identifier

* `is-valid: condition` - Validation rule

* `default-display: qdisplay_name` - Default display format

## QDisplay Files (.qdisplay.dry)

### Basic Structure

```
(0..2) : Beginner level
(3..5) : Intermediate level  
(6..10) : Expert level
```

### Range Syntax

* `(min..max) : description` - Value range display
* `(1-5) : description` - Range from 1 to 5 (alternative syntax)
* `(--5) : description` - Values up to -5 (half-open range)
* `(6-) : description` - Values from 6 and above (half-open range)

* `(exact) : description` - **NOT IMPLEMENTED** - Exact value display is not supported in parser 

## Info File (info.dry)

### Required Properties

```
title: Game Title
author: Author Name
```

### Optional Properties

```
ifid: 12345ABC-67DE-F8A9-B01C-234567890CDE
first-scene: starting_scene
```

## Expressions and Conditions

### Operators

* `=` - Equals

* `!=` - Not equals

* `>`, `<`, `>=`, `<=` - Comparisons

* `and`, `or` - Logical operators

* `not` - Negation

### Variables

* `variable_name` - Quality value

* `@scene_id` - Scene visit count (requires count-visits-max)

* String values in quotes: `name = "John"`

**Naming Convention for Quality Variables**
To make quality variables easily distinguishable from scene names and tag names in your code:
- Use snake_case for quality names: `player_health`, `magic_power`
- Use underscores (_) for scene names: `forest_entrance`, `castle_gate`
- Use underscores (_) for tag names: `the_forest`, `the_castle`

This consistent naming pattern helps prevent confusion and makes code more readable.

### Examples

```
view-if: health > 0 and stamina >= 10
choose-if: has_key = 1 or lockpick_skill > 5
go-to: victory_scene if score_quality >= 100; defeat_scene if health_quality <= 0
```

### Priority and Frequency Details

#### Priority System
* Priority starts at 1 and goes up
* Higher priority options will push out lower-priority ones
* If more than `min-choices` options exist at a higher priority level, lower-priority choices won't be processed

#### Frequency System
* Default frequency is 100 (like a percentage)
* Higher frequencies make options more likely to appear
* Lower frequencies make options less likely
* When there are more options than `max-choices`, they're sorted randomly weighted by frequency (`random()/frequency` ascending) and the first `max-choices` are shown

```
# Example: This option appears twice as often
frequency: 200

# Example: This option appears half as often  
frequency: 50
```

## Advanced Features

### Random Selection

```
go-to: outcome1; outcome2; outcome2; outcome3
# outcome2 has 2x probability
```

### Conditional Navigation

```
go-to: scene1 if condition1; scene2 if condition2; default_scene
```

### Visit Tracking

```
count-visits-max: 3
# Now @scene_id contains visit count (0-3)
view-if: @tavern < 2  # Show if visited tavern less than 2 times
```

### Tags for Dynamic Content

```
# In multiple scene files:
tags: shop, available

# In another scene:
- #shop  # Shows all scenes tagged 'shop'
```

## Best Practices

### File Organization

* Use descriptive filenames

* Group related scenes in the same file using sub-scenes

* Keep the root scene simple and focused

### Content Structure

* Use `new-page: true` for major scene transitions

* Provide meaningful choice text

* Use conditional text to create dynamic content

### Variable Management

* Use qualities for persistent game state

* Initialize important variables in early scenes

* Use visit counters for location-based logic

### Performance

* Avoid complex JavaScript in frequently-called scenes

* Use view-if and choose-if to optimize choice display

* Keep choice lists manageable with min/max-choices

## Common Patterns

### Hub Scene

```
title: Town Square

You stand in the bustling town square.

- #location

@tavern
title: The Rusty Anchor Tavern
tags: location

A dimly lit tavern filled with the sound of clinking mugs and hushed conversations.

@market
title: Merchant's Market
tags: location

Bustling stalls line the cobblestone square, vendors calling out their wares.
```

**Note**: Tag choices (`#tag`) cannot have titles - they use the titles of the scenes they reference.

### Choice Syntax Examples

```
# Basic scene choice with title
- @scene_id: Custom choice text

# Scene choice using scene's own title
- @scene_id

# Tag choice (shows all scenes with this tag)
- #tag_name
```

**Note**: Choice properties are defined as scene-level properties, not as indented properties under individual choices. See the scene properties section for details on `view-if`, `choose-if`, `order`, `priority`, and `frequency`.

### Conditional Unlock

```
title: Locked Door

[? if has_key = 1 : The door is unlocked. ?]
[? if has_key = 0 : The door is locked tight. ?]
```

**Note**: Text content in conditionals doesn't require quotes unless the text itself contains quoted dialogue, e.g., `[? if s1_meal = "none" : "I'll manage." ?]` (quotes only when the text itself contains quoted dialogue).

- @enter_room: Enter
- @find_key: Look for key

@enter_room
title: Enter
view-if: has_key = 1

@find_key
title: Look for key
view-if: has_key = 0
```

### State Tracking

```
title: Character Meeting
count-visits-max: 3
on-arrival: met_character = 1

[? if @character_meeting = 0 : "Hello, stranger!" ?]
[? if @character_meeting = 1 : "Good to see you again." ?]
[? if @character_meeting >= 2 : "You're becoming a regular!" ?]
```

## Build Command

For this project specifically:

```bash
bun run ../dendry-chat/lib/cli/main.js make-html
```

***

*This reference covers the core Dendry framework syntax. For advanced features and custom implementations, look through existing Dendry games.*
