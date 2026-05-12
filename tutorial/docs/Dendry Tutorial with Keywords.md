### A short Dendry syntax reference:

All of these are elements that can be used in the body text.

```    *some words* - emphasis

    **some words** - strong emphasis

    > paragraph - quotation

    >> paragraph - attribution

    = paragraph - heading

    // + <newline> - manual line break

    <blank line> - paragraph break

    --- - horizontal rule / break

    [some words] - hidable section

    [+ foo : bar +] - insert quality value with optional qdisplay

    [? if condition: text ?] - conditional display of text

    {!<span class="foo">aaa</span>!} - raw html

    #comment - comment

```

### Examples

Displaying variables in text: [+ var +]

Varying text based on a condition: [? if var = 1 : something ?]

Basic scene example:

```title: scene0

go-to: scene1

# this is the start of the .scene.dry file.

@scene1

title: Scene

subtitle: subtitle of the scene

unavailable-subtitle: scene cannot be selected

view-if: var1 = 1 and (var2 = 2 or var3 = 3)

choose-if: var4 = 4

on-arrival: v2 = 1; v3 = 3; vs = "abc"

tags: start, tag1, tag2

new-page: true

max-visits: 2

Content goes here.

var1: [+ var1 +]

vs: [+ vs +]

[? if var1 = 1 : aaaaa ?]

# these are links

- @scene2: Choice 1

- @scene3: Choice 2

@scene2

Content for scene2 goes here.

@scene3

Content for scene3 goes here.

```

Including javascript in on-arrival: {! Q['var1'] = Math.cos(Math.PI/4); !}

Including javascript in view-if: {! return ((Q['a'] || 0)===(Q['b'] || 0)); !}





This game will help users to experience and apply Holistic Management in an entertaining way.

The focus is on a facilitation session in a chat like style, in which the player develops his holistic context. The player will be guided by the questions of the facilitator. The player can also learn some background information in side-conversations or side-branches.

The process is similar to a choose-your-own-adventure game, in which the user is asked a question and is being offered several possible answers. 

The story should be engaging and interesting for a broad audience and should branch in a meaningful way.

Narration should be kept to a minimum. Instead, there should be direct speech with other characters in the game and by the facilitator, and meaningful options for the player to choose from. 










# Getting started with Dendry

Dendry is a choice-based storylet-native narrative engine. 

This tutorial will walk you through the creation of a simple game. To get an idea of where we’re going, the full tutorial game is playable at https://smwhr.github.io/dendry-tutorial/



### Setup a project (10’)

A dendry starter-pack project exists on github : [Use the Dendry Starter Pack](https://www.notion.so/Use-the-Dendry-Starter-Pack-17699e255fc445a193555b65b3b566fd?pvs=21)

For more advanced installs, you can read [Full project setup](https://www.notion.so/Full-project-setup-0648b7f218e84a7483ab1eb3d1aac120?pvs=21) 

The game we will create takes place on Treasure Island, so make sure your `info.dry` (found in the `source` folder) looks something like this :

```markdown
title: Treasure Island
author: Dendry tutorial
ifid: 12345ABC-67DE-F8A9-B01C-234567890CDE
```

<aside>
💡 **What is an ifid ?**

An **interactive fiction identifier** (**IFID**) is a specific type of [UUID](http://en.wikipedia.org/wiki/Universally_Unique_Identifier) used for uniquely identifying both new and legacy works of interactive fiction. It is not mandatory but if you intend to publish your game, it is good practice to have one. You can use [this generator](https://uuidonline.com/).
When using the `dendry new` command, an ifid is automatically generated.

</aside>

Navigate or open your game file : *Et voilà !*

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7035ce0f-97d6-4a55-9da6-7e80f7a96811/Untitled.png)

<aside>
⚙ Depending of your method of install, whenever I will instruct you to ***build the game*** it will mean :
- if you’re using the GitHub pages method : just commit and wait a few seconds for the action to publish the build game and navigate to the page.
- if you’re making a game locally, run the `npm run dendry make-html` command and open `out/html/index.html`

</aside>

### First concept : a simple scene and some choices (15’)

The first important concept on a Dendry project is that of a `scene`.

In concrete terms, a scene is a text file named `scene_name.scene.dry`. It is a unit of content.

The most simple scene consists simply of a `title` and some content.

```markdown
title: Welcome to the island
new-page: true

A secret island with rocky cliffs, sandy beaches, and clear blue water. 
Old wooden houses line the shore, with colorful flags waving. Pirates and
treasure hunters gather here for excitement and stories of hidden treasure.
```

<aside>
💡 The `root.scene.dry` scene will be the initial scene when your player launch your game, it is mandatory.
The `new-page` keyword means (when set to `true`) the content of the game will be cleared upon displaying this scene. Otherwise, it will be appended to the already visible text. (default is `false`)

</aside>

If you build and run the game with only this root scene, it will displays the following message :

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/04e738a2-3d07-4ea9-89c2-144d51503c49/Untitled.png)

<aside>
⚠️ If you’re using GitHub Pages, a hard-refresh is sometimes needed to see your changes.
[How to do a hard refresh ?](https://www.gavel.io/resources/what-is-a-hard-refresh-how-to-do-a-hard-refresh-in-any-browser)

</aside>

Indeed, there are nowhere else to go ! Let’s create a scene to describe the hut of the Harbor Master :

```markdown
title: Harbour Master's Hut
new-page: true

The Harbour Master's hut is a small house near the water's edge, 
where boats and ships come. It's a simple building made of wood, 
with a thatched roof on top. Inside, there are maps on the walls 
and a big table where the Harbour Master plans and watches over 
the port.
```

We need to tell Dendry that the Hut is accessible from the root scene. Let’s add a simple choice after the root scene content.

```markdown
treasure hunters gather here for excitement and stories of hidden treasure.

# choices
- @harbour_master_hut: Visit the Harbour Master's Hut
```

<aside>
💡 Lines beginning with a `#` are simple comments, and are ignored by dendry

</aside>

Now, build the game :

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e3b20345-2d4a-46d9-a402-1133ecac8f98/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2d5f9a36-e16f-49c0-b0e6-ea1f5d8e8a44/Untitled.png)

<aside>
⚠️ This “Continue…” choice was added automatically by Dendry because the root scene is still accessible (we’ll see what that means later) and there are no other alternative choices. 
If you want to declare the Hut’s as a dead end, add the `game-over: true` metadata at the top.

</aside>

### Gathering destinations : tags and conditions (20’)

Imagine we have multiple destination we can go from the island’s main square. A simple way would simply be to just pile choices at the end of the root scene like that.

```markdown
- @shipyard : Visit the shipyard
- @tavern : Visit the tavern
- @market : Visit the market
```

But as the list grow longer, this becomes fastidious. Worse, if you have to repeat this in multiple location (say, if from any location inside the harbour you want to link to every other), this becomes impossible to *not* forget a choice here and there.

For that we will use **tags**.
Tags are a way to categorize the contents, Dendry is built on a clever system that allows it to find the related content to a scene using those tags.
Let’s add a `tags` in the metadata at the top of the hut scene.

```markdown
title: Harbour Master's Hut
new-page: true
tags: harbour
```

And inform the root scene that it needs to gather all this “harbour” content and present them as choices on the root page (you can replace the choice that was there previously).

```markdown
treasure hunters gather here for excitement and stories of hidden treasure.

- #harbour
```

Feel free to add some other locations.

Now build the game :

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5242c636-ad65-44bc-b888-f5e85eb0f4ab/Untitled.png)

There ! Dendry gathered all the content tagged with `harbour` and automatically created the choices. The labels of the choices are the `title` of the linked scenes.

<aside>
👀 I’ve also added a `subtitle` metadata to the `secret_passage.scene.dry` scene, to trigger the display of some more descriptive text to the choice.

</aside>

**Wait !** That secret passage is not supposed to appear until you’ve seen the map in the Harbour Master’s Hut !!! Let’s add a conditional on the scene to hide it !

```markdown
title: Secret passage
subtitle: A secret passage to the fortress
tags: harbour
view-if: know_of_map = "seen"

High above the pirate island, there's a strong fort with soldiers 
and walls. It looks big and tough, with flags waving in the wind. 
From there, guards keep watch to keep the island safe from danger.
```

Rebuild and test : the secret passage is now hidden from the view of the player. That’s good.
The `know_of_map` variable is known in Dendry as a ***quality***. Qualities can be numbers, text or boolean.

Let’s set that quality to “seen” when you examine the map in the Harbour Master’s Hut :

```markdown
title: Harbour Master's Hut
new-page: true
tags: harbour

The harbor master's hut is a small house near the water's edge, 
where boats and ships come. It's a simple building made of wood, 
with a thatched roof on top. Inside, there are maps on the walls 
and a big table where the harbor master plans and watches over 
the harbor.

-@look_map: Examine the map

@look_map
view-if: know_of_map != "seen"
on-arrival: know_of_map = "seen"

The map shows the harbor and the surrounding area. You notice a
**secret passage** marked on the map that leads to the **fortress**.
```

Let’s take a closer look at this code here. I’ve created a sub-scene inside of the `harbour_master_hut` that I’ve named `@look_map`. All sub-scenes must begin with a `@`.

Then I’ve added an explicit choice with a label at the end of the main content.

The sub-scene has two metadata :

- a `view-if` to prevent the display of this choice if you've already seen the map
- a `on-arrival` instruction that defines what happen when you enter the scene (the `on-departure` keyword also exists to define what happen when you *leave* the scene, it doesn’t matter much here)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d521eeb3-0100-45a5-bca4-48056e4be676/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3a054f51-4fcb-471d-82eb-817ee0685dae/Untitled.png)

Now, when you get back to the main square *after* examining the map in the Hut, the choice to follow the secret passage is available.

Let’s add one last subtlety : a choice can be visible *but* unavailable.
First, we’ll hint that you need a key to access the secret passage in the hut scene

```markdown
The map shows the harbor and the surrounding area. You notice a
**secret passage** marked on the map that leads to the **fortress**.
A symbol of a **key** is marked next to the passage.
```

<aside>
👀 You can use basic markdown formatting in the content
- `*some words*` - *emphasis*
- `**some words**` - **strong emphasis**
- `> paragraph` - quotation
- `>> some name` - attribution
- `= header` - heading

</aside>

And then in the `secret_passage.scene.dry` we’ll add two new metadata :

```markdown
title: Secret passage
subtitle: A secret passage to the fortress
tags: harbour
view-if: know_of_map = "seen"
**choose-if: has_key = true**
**unavailable-subtitle: You need a key to access the passage.**
```

Now, when you get back to the main square you get this :

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/71467bd8-f9bb-4193-b652-8d2368b79c2b/Untitled.png)

### About qualities and how to display them (20’)

A **quality** is essentially a variable. 
If you try to use a quality you never defined before, it is automatically is initialised at 0.

To define a quality at startup, define it in a `myquality.quality.dry` file.

```markdown
name: know_of_map
initial: 0
```

<aside>
💡 It is a good practice to regroup the scenes in a `scenes` folder and the qualities in a `qualities` folder but it is in no way mandatory and, as your game grow, or if multiple authors contribute to the story, it may be interesting to change the structure to something more fitting to your needs.

</aside>

An interesting feat of qualities, is their ability to numerically track the value of something. 
Here, let’s try with the `hunger` of our character.

```markdown
name: hunger
initial: 3
min: 0
max: 5
```

When you start the game, you debark on the island with an hunger level of 3. You can never go beyond 5 and after a good meal, you’ll be at 1 unless you eat too much, and reach 0.

We can display your level of hunger when you visit the Tavern.

```markdown
title: Tavern
new-page: true
tags: harbour

The pirate island's tavern is a cozy place by the sea where 
pirates and travelers come together. Inside, there are wooden 
tables, lanterns hanging, and the smell of food. Laughter and 
stories fill the air as people eat, drink, and have a good time.

You hunger level is [+ hunger +].
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e034b889-631a-4ae4-a841-9b9e031faf1b/Untitled.png)

We’ll now define two sub-scenes [like we did before](https://www.notion.so/Getting-started-with-Dendry-188e7e39a961497fb2d0a0deee0c21a0?pvs=21) to explore what we can do :

- a `@eat` sub-scene that decreases your hunger
- a `@brawl` sub-scene that increases your hunger after you trigger a bar brawl

```markdown
stories fill the air as people eat, drink, and have a good time.

You hunger level is [+ hunger +].

- @eat : Eat something
- @brawl : Start a fight

@eat
new-page: false
choose-if: hunger > 0
unavailable-subtitle: You are not hungry.
on-departure: hunger -= 1
go-to: @end-activity

You eat something and feel slightly better.

@brawl
new-page: false
choose-if: hunger < 5
unavailable-subtitle: You are too hungry to fight.
on-departure: hunger += 1
go-to: @end-activity

You start a fight with a random pirate. You get a litle more hungry.

@end-activity

- @tavern : Continue...
```

It is a slightly elaborate example to show off some more possibilities offered by Dendry

- sub-scenes can have `new-page: false` (we’ve already seen that in the “Examine the map” choice, it can of course be set to true also !)
- scenes can have a `go-to: @scene_name` metadata : dendry will print the text of the scene but then ignore all choices inside that scene/sub-scene and just move to the designated scene. This `go-to` can be conditioned by a quality check of the form `go-to: @somewhere if somequality > otherquality` : if the check fails, the scene behaves as usual.
- You can use `+= n`(increase by n) and `-= n`(decrease by n) operators on qualities

Now, displaying the hunger level as a number is not very satisfying, we’re writing text-based games and our players expect more than just a display of raw numbers. For that we can use a **qdisplay** (quality display). It’s just another type of dendry file of the form `myqdisplay.qdisplay.dry`.

```markdown
# qhunger

(-1..0) : full
(0..1) : satisfied
(1..2) : hungry
(2..3) : famished
(3..4) : starving
(4..5) : ravenous
```

<aside>
⚠️ Due to a bug, a qdisplay file must begin with an empty line, here between the comment and the content itself.

</aside>

And now in the tavern scene, you can replace :

```markdown
~~You hunger level is [+ hunger +].~~
You are [+ hunger : qhunger +].
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9d9247bf-6443-4582-bf60-36259ee5d4ae/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9545a594-de28-43a1-bc7a-24aac04e97b7/Untitled.png)









## Dendry scene keywords

These are elements that can be used following a scene declaration. A scene declaration is a line that contains `@scene_name`.

Note: all of these can be written in camelCase or dash-between-words.

```
    title: string
    subtitle: string
    unavailable-subtitle: string
    view-if: boolean expression
    choose-if: boolean expression
    on-arrival: semicolon-separated list of commands
    on-departure: semicolon-separated list of commands
    go-to: name of scene, or semicolon-separated list of the format 'scene1 if <condition>'
    tags: comma-separated list of tags
    max-visits: int
    priority: int (I'm not sure how this works yet)
    frequency: I'm not sure how this works yet

    is-special: boolean
    set-bg: path to background image, or hex color
    set-jump: name of scene
```

## Special scene names

`prevScene` - always goes to the previous scene.

`jumpScene` - always goes to the scene designated by the last `set-jump` command.

`backSpecialScene` - goes to the previous scene visited before entering the last visited special scene (a special scene is designated by `is-special: true`).


## Dendry syntax reference

All of these are elements that can be used in the body text.

```
    *some words* - emphasis
    **some words** - strong emphasis
    > paragraph - quotation
    >> paragraph - attribution
    = paragraph - heading
    // + <newline> - manual line break
    <blank line> - paragraph break
    --- - horizontal rule / break
    [some words] - hidable section
    [+ foo : bar +] - insert quality value with optional qdisplay
    [? if condition: text ?] - conditional display of text
    {!<span class="foo">aaa</span>!} - raw html
    #comment - comment
```

## Examples

Displaying variables in text: `[+ var +]`

Varying text based on a condition: `[? if var = 1 : something ?]`

Basic scene example:

```
title: scene0
go-to: scene1

# this is the start of the .scene.dry file.

@scene1
title: Scene
subtitle: subtitle of the scene
unavailable-subtitle: scene cannot be selected
view-if: var1 = 1 and (var2 = 2 or var3 = 3)
choose-if: var4 = 4
on-arrival: v2 = 1; v3 = 3; vs = "abc"
tags: start, tag1, tag2
new-page: true
max-visits: 2

Content goes here.

var1: [+ var1 +]

vs: [+ vs +]

[? if var1 = 1 : aaaaa ?]

# these are links

- @scene2: Choice 1
- @scene3: Choice 2


@scene2

Content for scene2 goes here.

@scene3

Content for scene3 goes here.
```

Including javascript in `on-arrival`: `{! Q['var1'] = Math.cos(Math.PI/4); !}`

Including javascript in `view-if`: `{! return ((Q['a'] || 0)===(Q['b'] || 0)); !}`


## Debugging

In the browser, the state is stored as `dendryUI.dendryEngine.state`. Qualities are at `dendryUI.dendryEngine.state.qualities`. You can use these variables in the browser console to inspect or alter the current state of the game.


## Random testing in dendry

To run random tests in dendry, run `dendry random-test -nruns <number of runs> -d game_data --choices_dump choices --scenes_dump scenes`

To see all the command-line options, run `dendry random-test -h`