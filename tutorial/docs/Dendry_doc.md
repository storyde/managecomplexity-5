# Scene

## id
*Required*

Each scene must have an id, but you don't set this manually. For scene
files, the id will be taken from the filename, so a file called
`farm.scene.dry` will contain a scene with the id of `farm`. To avoid
filenames getting out of synch with their contents, defining an `id`
property in the file will raise an error.

Within a scene file you can define further scenes with a line starting with
the `@` symbol, followed by its id. So if the following example is the file
`farm.scene.dry`, there will be three scenes, with ids of `farm`, `barn`,
and `stables`:

    title: The Farm

    You enter the abandoned farm...

    - @barn: Visit the barn.
    - @stables: Visit the stables.

    @barn

    You enter the old hay barn...

    @stables

    You enter the tumbledown stables...

## type
*Required*

The type for a scene must be `scene`. You normally don't set this manually.
For filenames with three components (such as `fairground.scene.dry`), Dendry
takes the second component and interprets it as the type.

If you use a filename with just an id and the `dry` file extension
(`fairground.dry`, for example), then Dendry wouldn't know what type it is,
and you'd have to specify it in the file with the type property. This isn't
recommended, it is easier to organise your project if files clearly show
what type they contain. The starter project Dendry creates for you uses this
three-component naming.

If you did go for two component filenames, a file called `fairground.dry`
could contain:

    type: scene
    title: Investigate the Fairground

    At night the ferris wheel is a spiders web silhouetted against the city...

If the type is contained in the filename, it is an error to also include it
as a property in the file.

In a scene file, you can define multiple scenes with lines beginning with
the `@` symbol. You do not use the type parameter: whether you've specified
the type in the filename or in a type property at the top level, Dendry
knows that only scenes can appear in the file.


## signal

## style


## tags

Tags allow a group of scenes to be offered as choices to the player without specifying them one by one. If there are a series of scenes with the tags property:

    tags: mall-shop

Then in another scene, you can give the option as:

    - #mall-shop

and rather than one option appear, each shop will be listed for the player
to choose. The options will be in order of each scene's order property. If
two scenes have the same order property, then they may appear in any order,
it depends on the whim of the computer. If an order property isn't set, it
is assumed to be zero.

The set of options offered can also be adjusted by only offering a random
subset of the scenes with that tag. See the [Options](#options)
documentation for more details of how this works.

Multiple tags can be comma or semi-colon separated:

    tags: mall-shop, open-sundays

Tags can also be used in custom game code to find scenes, or to determine
how a scene should be displayed. In the **Descend** example game, scenes are
used to determine which dungeon levels a room can be on, and what background
image should be used to display it. For example

    tags: level1, level2, bg-stairs


## title

## subtitle

## unavailable subtitle


## view if

## choose if

## order

## priority

## frequency


## max visits

Controls the maximum number of times a scene can be visited from a choice.
The scene can still be forced if it appears in a go-to property, or by using
the `goToScene` API function from your own code, but Dendry's run time will
honor the maximum visits when displaying the available choices of scene.

    max visits: 1

    You receive a once in a lifetime opportunity...

This value cannot be greater than the count-visits-max property. If
count-visits-max is not set, it will be implicitly set to be equal to
max-visits. If count-visits-max is less than max-visits, Dendry will raise
an error.

## count visits max

Keeps track of the number of times this scene has been visited, up to the
given maximum number. If this property is set, then expressions can find the
current count in by prefixing the id of the scene with the `@` sign. So, for
a scene with an id of `club`, the current visit count will be available as
`@club`.

Successive visits after that will not increase the count. If this property
is not set, then Dendry won't keep track of how often the scene is visited,
so `@club` cannot be used in expressions (it will always be zero).

    count visits max: 2
    go to: newbie if @club = 0; welcome if @club = 1; regular if @club = 2

    @newbie

    Here's your membership for the club...

    @welcome

    Welcome, please enjoy the facilities...

    @regular

    Welcome back, great to see you again...

This value is required by max-visits, so if it is not set, Dendry will
automatically set it to the same value as max-visits. If count-visits-max is
less than max-visits, then max-visits would have no effect. To prevent your
game silently failing, Dendry raises an error in this case.

## on arrival

## on departure

## on display


## go to

If this property is set, Dendry goes to one of the scenes listed,
immediately after displaying this scene's content. Multiple scenes can be
listed in a go-to property, separated by semi-colons. If this scene has
choices to offer to the player, as well as a go-to property, the choices
will be ignored: Dendry moves right on to the new scene.

    go to: flip-heads; flip-tails

Each of the scenes in the go-to property can be followed by an if expression
that allows you to control when a new scene will be chosen:

    go to: flip-heads if luck > 2; flip-tails if luck < 5

In this example, if the `luck` quality is 2 or less, we'll always go to the
`flip-tails` scene. If the quality is 3 or 4, the two scenes will be chosen
at random. If the quality is 5 or more, the `flip-heads` scene will be
chosen.

Dendry chooses one of the valid scenes from a go-to property at random, with
each choice equally likely. To skew the probability, you can repeat a scene
in the property, so:

    go to: roll-pass; roll-fail; roll-fail; roll-fail; roll-fail; roll-fail

would have a five out of six chance of going to the `roll-fail` scene.
Repeated scenes can have different if expressions to further tune the
probabilities.

## go to ref

## go sub

## go sub start

## go sub end

## new page

## game over

## set root

## is top

## is special
Scene such as settings, credits or help that are not part of the main game


## min choices

## max choices

## set jump

## set bg
Url to a filename to set the background image for the scene

## set sprites

## set music
_Experimental_

## achievement

## content
*Required*


# Sub Scenes


# Options
<a name="options"></a>

## id
*Required*

## title

## subtitle

## unavailable subtitle

## view if

## choose if

## order

## priority

## frequency




" Vim syntax file
" Language: Dendry scenes
" Maintainer: Autumn Chen
" Latest Revision: 23 Feb 2021

if exists("b:current_syntax")
  finish
endif

syn match todo 'TODO'

syn match scene_id '^@[a-zA-Z0-9\-_]*$'
syn match link_line '^-\s*[@#][a-zA-Z0-9\-_]*' contains=link_id
syn match link_id contained '@[a-zA-Z0-9\-_]*'
syn match link_id contained '#[a-zA-Z0-9\-_]*'

syn match if_statement contained 'if' nextgroup=colon skipwhite
syn match plaintext contained '[a-zA-Z0-9.?,]*'
syn match colon contained ':' nextgroup=plaintext skipwhite

syn match scene_title contained ' .*$'
syn match boolean contained '[tT]rue'
syn match boolean contained '[fF]alse'
syn match command '^title: .*$' contains=scene_title
syn match command '^subtitle: .*$' contains=scene_title
syn match command '^unavailable-subtitle: .*$' contains=scene_title
syn match command '^new-page: .*$' contains=boolean
syn match command '^is-special: .*$' contains=boolean
syn match command '^view-if:'
syn match command '^choose-if:'
syn match command '^on-arrival:' nextgroup=jsBrackets,jsRegion skipwhite
syn match command '^on-display:' nextgroup=jsBrackets,jsRegion skipwhite
syn match command '^on-departure:' nextgroup=jsBrackets,jsRegion skipwhite
syn match command '^go-to:'
syn match command '^tags:'
syn match command '^max-visits:'
syn match command '^min-choices:'
syn match command '^max-choices:'
syn match command '^order:'
syn match command '^priority:'
syn match command '^frequency:'
syn match command '^signal:'
syn match command '^set-bg:'
syn match command '^set-jump:'
syn match command '^game-over:'
syn match command '^is-card:'
syn match command '^is-hand:'
syn match command '^audio:'
syn match command '^go-to-ref:'
syn match command '^card-image:'


syn match comment '^#.*$'

syn match var_name contained '\w*'
syn match var_replace '\[+\s*\w*\s*+\]' contains=var_name

syn region conditional matchgroup=brackets start='\[?' end='?\]' contains=if_statement,colon,plaintext

syn include @js syntax/javascript.vim
syn include @html syntax/html.vim
syn region jsRegion matchgroup=jsBrackets start='{!' end='!}' fold transparent contains=@js
syn region htmlRegion matchgroup=htmlBrackets start='{!' end='!}' fold transparent contains=@html

hi def link scene_id        Identifier
hi def link scene_title     None
hi def link command         Statement
hi def link boolean         Boolean
hi def link comment         Comment
hi def link link_id         Identifier
hi def link var_name        Identifier
hi def link var_replace     Statement

hi def link brackets        Statement
hi def link if_statement    Statement
hi def link colon           Statement

hi def link jsBrackets      Statement
hi def link htmlBrackets    Statement





# Dry files can have lines beginning with hash for comments. Note
# that, unlike many file formats comments can only be complete lines,
# you can't comment a property (say) by putting a hash at the end of
# the value, followed by some text. In that case, the hash sign will
# be considered part of the property. A dry file is split into
# sections, each of which can begin with some properties:
title: A Title
# Properties are separated from values by a colon.
author: Ms A Uthor
# Different properties may be subject to their own syntax
# requirements.
tags: top-level, bright, silly
# Properties may not contain spaces, and have words separated by a
# hyphen.
view-if: sunny > 1
# Properties may run over multiple lines, but the second and
# successive lines must be indented. Consequently property names
# cannot be indented.
choose-if: sunny > 1 and last-rain < 2 or
   cares-about-weather = 0
# Properties are separated from content by a double blank line.

This is now content. Each section of a dry file can have unlimited
amounts of content. When the dry file is parsed, the content is
accumulated and placed into a 'content' property. For this reason,
'content' is not a valid property name.

# A new section of content is begun with an id started by an at
# symbol. The id is placed in the content's properties, so again 'id'
# is not a valid property name.
@new-id
# There should be no gap between an id and its properties, otherwise,
# the properties will be interpreted as content.
title: A New Section

This is content for the @new-id section. The top-level content doesn't
have a specific id, its id is generated from the part of the filename
before any period, so in this case, the id of the top level content is
'parse-test'. All sections are wrapped into a list in the 'sections'
property. So 'sections' is another reserved word that can't be used
for user-defined properties.

The last bit of content for dry files is an option block. They are
only required in interactive content, and are invalid in any other
context. There can be only one option block per section, and it must
be the last thing in the section, it is illegal to add more content
after an option block. The option block, if it is present is compiled
and added to a 'options' property, making 'options' another reserved
word.

# An option block:  option blocks start each line with a hyphen
- @new-id: The title of this link.
# lines starting with an at sign indicate a link to a named id, the
# text after the colon is the title that will be displayed to overrule
# the title of that section, if any.
- min: 4
# lines starting with just a hyphen declare a property, properties
# belong to the previous link.
- max: 9
- min-priority: 3
- @other-id
# lines starting with a hash indicate a tag, links corresponding to
# that tag will be added. Because this can have multiple links, titles
# aren't allowed.
- #tag
- @new-id3: This option has continuation in its title. These should be
            handled properly.

# Some more specific cases:

@no-properties

This section goes right from id to content, without a property list.

@no-content
description: This section has no content, but goes right to options.

- @no-properties: The no properties section.

@only-options

- @no-properties: This section has only options.