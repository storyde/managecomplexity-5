# Plan: Improve Quality of Life Answer Choices

This plan outlines the changes required to update the answer choices in the specified `.dry` files. The goal is to improve the answers and to ensure that the variable values fit grammatically and tonally into the "Holistic Context" sentence template defined below.

## Template Context
  
 I want [+ qol-economic +] in a balanced life with [+ qol-balance +]. My relationships will be grounded in [+ qol-relationships +]. I thrive on [+ qol-challenge +] and want to be free to [+ qol-growth +]. I find purpose in [+ qol-purpose +]. I seek to be [+ qol-aspiration +] and want to contribute to [+ qol-accomplish +]. <br>[+ textarea +] <br><br>I will act in ways that are [+ frb-people +]. <br><br>All to be ensured, for many generations to come, on a foundation of [+ frb-environment +]. 

## Template Context Group

 We want [+ qol-economic +] in balanced lives with [+ qol-balance +]. Our relationships will be grounded in [+ qol-relationships +]. We thrive on [+ qol-challenge +] and want to be free to [+ qol-growth +]. We find purpose in [+ qol-purpose +]. We seek to be [+ qol-aspiration +] and want to contribute to [+ qol-accomplish +]. <br>[+ textarea +] <br><br>We will act in ways that are [+ frb-people +]. <br><br>All to be ensured, for many generations to come, on a foundation of [+ frb-environment +]. 

## Tone Target (Harbour + Teahouse)
The first scenes establish a world that is strained and dusty, but still intimate and quietly hopeful: metallic water, storm grit, paper lanterns, steam, amber light. The answer choices should feel like they belong in that voice.

**Guidelines for rewrites**
- Prefer warm, concrete language over abstract or corporate phrasing.
- Use simple words that carry texture: steadiness, warmth, shelter, trust, craft, patience, repair, learning, belonging.
- Avoid buzzwords (e.g., "optimize", "stakeholders", "deliver value") unless already present and necessary.
- Keep meaning close where useful, but prioritize the strongest final answer over staying near the original wording.
- Do not add pronouns (no I, we, our, my, your).
- Titles and `Me:` text can begin with capital letters; variable values should begin lower-case (unless a proper noun).
- The title, `Me:` text, and variable value should match (case-only differences).

## File-by-File Changes

For each file, I will update the `title`, `Me:` text, and the variable assignment to ensure they match and fit the template. Titles and `Me:` text will be Sentence case. Variable values will be lower-case (unless proper nouns) and grammatically fitted.

Please do these things in your response:
A. Improve answers that sound too flat or generic. 
B. Make sure, the answers match the overall tone 

Focus especially on fixing these problems:
- make the answers more distinguishable from one another
- the answers should sound like real world answers, not like textbook answers
- the answers should cover, what is really important. That could be more in some answers or less in others
- if needed, prefer a better end result over preserving closeness to the current answer text

### 1. `source\scenes\12_statement_of_purpose.scene.dry`
**Variable:** `st-purpose` (Used as `qol-purpose` for orgs: "We find purpose in...")
**Grammar:** Gerund phrase or noun phrase fitting after "in".

*   `Growing food that nourishes communities` -> `growing food that keeps communities fed and well`
*   `Backing farmers and strengthening rural communities` -> `backing farmers and strengthening rural communities`
*   `Stewarding land for future generations` -> `tending land so future generations can thrive`
*   `Making daily life simpler and more reliable` -> `making daily life easier, steadier and more dependable`
*   `Reducing financial risk for people and organisations` -> `helping people and organisations weather financial risk with confidence`
*   `Creating welcoming places and experiences for travellers` -> `creating welcoming places and experiences for travellers`
*   `Crafting services and products that genuinely help` -> `crafting useful services and products people can truly rely on`
*   `Making space for culture, expression and creativity` -> `keeping culture, expression and creativity alive`
*   `Preserving and sharing cultural heritage` -> `preserving and sharing cultural heritage with care`
*   `Informing the public through accurate, independent reporting` -> `keeping the public informed through accurate, independent reporting`
*   `Creating a safe, nurturing place where young children learn and grow` -> `creating a safe, nurturing place where young children can learn and grow`
*   `Preparing students for the future and helping them reach potential` -> `helping students grow, learn and step into their future with confidence`
*   `Advancing knowledge through research and preparing leaders for tomorrow` -> `advancing knowledge through research and preparing thoughtful leaders`
*   `Making useful products that improve everyday life` -> `making useful products that earn a place in everyday life`
*   `Building safe, durable structures and infrastructure that serve communities` -> `building safe, lasting structures and infrastructure communities can depend on`
*   `Providing timber responsibly to meet society's needs` -> `providing timber in ways that care for land and long-term need`
*   `Meeting community needs and facing social challenges` -> `meeting community needs and standing with people through hardship`
*   `Standing up for positive change and social justice` -> `standing up for dignity, fairness and social justice`
*   `Protecting the living world and confronting climate change` -> `protecting the living world and responding to climate change`
*   `Connecting communities through safe, accessible transport` -> `keeping communities connected through safe, accessible transport`
*   `Healing, preventing illness and restoring health` -> `healing, preventing illness and helping people recover well`
*   `Serving the public interest and common good` -> `serving the public interest with care for the common good`
*   `Protecting and sharing natural heritage for current and future generations` -> `protecting and sharing natural heritage for generations to come`
*   `Representing citizens and shaping public policy for the common good` -> `representing citizens and shaping policy that serves the common good`
*   `Governing local communities and providing municipal services` -> `caring for local communities through good governance and dependable municipal services`
*   `Building international cooperation and diplomacy` -> `building cooperation across borders through diplomacy`

### 2. `source\scenes\13_qol_intro.scene.dry`
*   **Analysis:** This is an introductory scene. No variables related to the holistic context are set here. No changes required.

### 3. `source\scenes\14_qol_economic_wellbeing.scene.dry`
**Variable:** `qol-economic` ("We want...")
**Grammar:** Noun phrase, lower-case.

*   `Nourishing food, clean water, warm clothing, safe shelter, good health and security` -> `nourishing food, clean water, safe shelter, warm clothing, dependable care and a deep sense of safety`
*   `A comfortable home, secure health care and steady access to food, water, clothing and safety` -> `a comfortable home, dependable health care and enough money for daily needs without constant strain`
*   `Resources for good health and security, with reliable food, clean water, clothing and shelter` -> `robust health, personal safety and the means to meet essential needs without scraping by`
*   `Resources to travel and see the world` -> `the means for travel and discovery, with food, shelter, health and security well covered`

**Variable:** `qol-balance` ("...in balanced lives with...")
**Grammar:** Noun phrase, lower-case.

*   `Good education and time for family, friends and community` -> `time for family, friends and community, with learning woven into everyday life`
*   `Room for rest, meaningful leisure and time for family and friends` -> `room for rest, unhurried leisure and time with family and friends`
*   `Quality time with family and friends, plus learning and space for culture and leisure` -> `time with family and friends, chances to keep learning and space for culture and play`
*   `Cultural and artistic pursuits, supported by learning and time for family and friends` -> `room for art, culture and creative life, held up by learning and time with loved ones`
*   `Community wellbeing, with time for family and friends, learning and room for culture` -> `community wellbeing, with time to show up for one another and room for culture`
*   `Member wellbeing, with learning, community connection and time for family and leisure` -> `member wellbeing, with time to learn, contribute, connect and have a life beyond work`

### 4. `source\scenes\15_qol_relationships.scene.dry`
**Variable:** `qol-relationships` ("Our relationships will be grounded in...")
**Grammar:** Noun phrase (qualities), lower-case.

*   `Harmony, care and ease in one another's presence` -> `warmth, care and ease in one another's presence`
*   `Open communication, mutual trust and enjoying each other's company` -> `open communication, mutual trust and real enjoyment of each other's company`
*   `Good collaboration, mutual understanding and shared laughter` -> `good teamwork, shared understanding and laughter that makes hard things lighter`
*   `Calm support, mutual respect and repair after conflict` -> `mutual respect, steady support and honest communication`

### 5. `source\scenes\16_qol_challenge_growth.scene.dry`
**Variable:** `qol-challenge` ("We thrive on...")
**Grammar:** Noun phrase, lower-case.

*   `Stewardship that offers hope to future generations` -> `long-term stewardship that carries real responsibility`
*   `Work that keeps curiosity alive and asks patience and craft` -> `work that keeps curiosity alive and rewards patience and craft`
*   `Cultivating patience and growing into deeper capability` -> `patience, practice and growing into deeper capability`
*   `Fearless experimentation and learning from nature's wisdom` -> `experimentation, shared learning and listening to nature's wisdom`
*   `Bringing clarity and direction where none existed before` -> `bringing clarity and direction where confusion once reigned`
*   `The exhilaration of autonomy, where freedom and responsibility meet in creative flow` -> `autonomy, responsibility and the charge of creative flow`

**Variable:** `qol-growth` ("...want to be free to...")
**Grammar:** Verb phrase (base form), lower-case.

*   `Expand horizons through learning and discovery` -> `keep learning, exploring and widening horizons`
*   `Preserve and celebrate shared traditions` -> `carry shared traditions forward and celebrate them well`
*   `Find balance and harmony between work, life and nature` -> `find our rhythm between work, life and the living world`
*   `Practice spiritual or religious beliefs that offer guidance and meaning` -> `practice spiritual or religious beliefs that give guidance and meaning`
*   `Cultivate inner peace and emotional resilience` -> `build inner peace and emotional resilience`
*   `Act with integrity and according to conviction` -> `live by conviction and act with integrity`
*   `Deepen connection and trust within community` -> `deepen trust and belonging within community`
*   `Share wisdom and mentor one another` -> `share hard-won wisdom and mentor one another`
*   `Evolve collective purpose in service of a greater good` -> `let collective purpose deepen in service of something larger`
*   `Foster a culture of innovation and steady improvement` -> `build a culture that keeps learning, inventing and getting better`

### 6. `source\scenes\17_qol_purpose.scene.dry`
**Variable:** `qol-purpose` (Individual/Group) ("We find purpose in...")
**Grammar:** Noun phrase or Gerund phrase, lower-case.

*   `Continuous learning, growth and becoming` -> `learning, growing and staying open to what life can teach`
*   `Holistic health, vitality and wellbeing` -> `caring for health, vitality and participation`
*   `Creativity, innovation and meaningful expression` -> `creativity, invention and meaningful expression`
*   `Service, connection and community support` -> `service, connection and showing up for community`
*   `Stewardship of land and lasting sustainability` -> `caring for land and building something that lasts`
*   `Mutual support, care and solidarity` -> `mutual care, solidarity and standing by one another`

### 7. `source\scenes\18_qol_contribution.scene.dry`
**Variable:** `qol-aspiration` ("We seek to be...")
**Grammar:** Noun phrase (identity), lower-case.

*   `A grounded source of strength and stability` -> `a steady source of strength and reassurance`
*   `A positive and transformative force for change` -> `a brave and constructive force for change`
*   `A collaborative, supportive and inspiring partner` -> `a partner people trust, enjoy and feel strengthened by`
*   `A balanced, joyful and fulfilled person` -> `a balanced, joyful and fully alive person`
*   `A curious, lifelong learner and explorer` -> `a curious, lifelong learner with room to keep exploring`
*   `A loving, caring and inclusive community` -> `a loving, dependable and inclusive community`
*   `A resilient, adaptive and thriving organisation` -> `a resilient organisation people can trust to endure and adapt`
*   `An innovative pioneer exploring new frontiers` -> `a bold pioneer exploring new ground`

**Variable:** `qol-accomplish` ("...want to contribute to...")
**Grammar:** Noun phrase or Gerund phrase, lower-case.

*   `Creating lasting positive impact for future generations` -> `building conditions that leave future generations better off`
*   `Regenerating damaged social and ecological systems` -> `restoring damaged social and ecological systems`
*   `Empowering others to reach their full potential` -> `helping others grow into their own strength and potential`
*   `Living a life of deep meaning and quiet joy` -> `building a life of deep meaning and quiet joy`
*   `Realising and expressing unique potential` -> `bringing unique potential into the world`
*   `Building a resilient, supportive and vibrant community` -> `building a resilient, supportive and vibrant community`
*   `Bridging divides and fostering deep understanding` -> `healing divides and fostering deep understanding`
*   `Solving meaningful problems that truly matter` -> `solving hard problems that truly matter`
*   `Leading the way in ethical and responsible innovation` -> `innovation that is ethical, responsible and worthy of trust`

### 8. `source\scenes\19_qol_textarea.scene.dry`
*   **Analysis:** This file displays the textarea. The text displayed is constructed from the variables. No changes to answer choices are needed here, but I will verify the summary text matches the template in `answers_promt.md` (which seems to be the case based on the file content).

### 9. `source\scenes\20_frb_people.scene.dry`
**Variable:** `frb-people` ("We will act in ways that are...")
**Grammar:** Adjective phrase, lower-case.

*   `Honest, attentive and respectful` -> `honest, attentive and respectful`
*   `Collaborative, fair and supportive` -> `collaborative, fair and generous`
*   `Steady, skilful and committed` -> `steady, skilful and dependable`
*   `Ethical, responsible and dedicated` -> `principled, responsible and consistent`
*   `Empathetic, prepared and transparent` -> `empathetic, prepared and transparent`
*   `Adaptive, practical and open-minded` -> `adaptable, practical and open-minded`

### 10. `source\scenes\21_frb_environment.scene.dry`
**Variable:** `frb-environment` ("...on a foundation of...")
**Grammar:** Noun phrase, lower-case.

*   `Renewed water and mineral cycles, thriving community dynamics, resilient energy flow and rich biodiversity` -> `resilient water and mineral cycles, strong community dynamics, steady energy flow and rich biodiversity`
*   `Healthy, biologically diverse land with covered soils and clear, perennial streams; strong community dynamics and energy flow through complex webs of life` -> `healthy, biologically rich land with covered soils, clean running water, active nutrient cycling and webs of life that keep energy moving`
*   `Stable, productive surroundings with clean water, covered fertile soils, restored water and mineral cycles, and biodiversity that supports resilient community dynamics` -> `stable, productive surroundings with fertile covered soils, clean water, functioning water and mineral cycles, and biodiversity that strengthens community dynamics and energy flow`
