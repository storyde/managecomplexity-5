# Plan: Improve Quality of Life Answer Choices

This plan outlines the changes required to update the answer choices in the specified `.dry` files. The goal is to ensure that the variable values fit grammatically and tonally into the "Holistic Context" sentence template defined in `Notes\answers_promt.md`.

## Template Context
  <h1>Holistic Context:</h1><br>We want [+ qol-economic +] in balanced lives with [+ qol-balance +]. Our relationships will be grounded in [+ qol-relationships +]. We thrive on [+ qol-challenge +] and want to be free to [+ qol-growth +]. We find purpose in [+ qol-purpose +]. We seek to be [+ qol-aspiration +] and want to contribute to [+ qol-accomplish +]. <br>[+ textarea +] <br><br>We will act in ways that are [+ frb-people +]. <br><br>All to be ensured, for many generations to come, on a foundation of [+ frb-environment +].

## Tone Target (Harbour + Teahouse)
The first scenes establish a world that is strained and dusty, but still intimate and quietly hopeful: metallic water, storm grit, paper lanterns, steam, amber light. The answer choices should feel like they belong in that voice.

**Guidelines for rewrites**
- Prefer warm, concrete language over abstract or corporate phrasing.
- Use simple words that carry texture: steadiness, warmth, shelter, trust, craft, patience, repair, learning, belonging.
- Avoid buzzwords (e.g., "optimize", "stakeholders", "deliver value") unless already present and necessary.
- Keep meaning close, but choose wording that reads like a human sentence when inserted into the fixed template.
- Do not add pronouns (no I, we, our, my, your).
- Titles and `Me:` text can begin with capital letters; variable values should begin lower-case (unless a proper noun).
- The title, `Me:` text, and variable value should match (case-only differences).

## File-by-File Changes

For each file, I will update the `title`, `Me:` text, and the variable assignment to ensure they match and fit the template. Titles and `Me:` text will be Sentence case. Variable values will be lower-case (unless proper nouns) and grammatically fitted.

### 1. `source\scenes\12_statement_of_purpose.scene.dry`
**Variable:** `st-purpose` (Used as `qol-purpose` for orgs: "We find purpose in...")
**Grammar:** Gerund phrase or noun phrase fitting after "in".

*   `We produce food to nourish communities` -> `growing food that nourishes communities`
*   `We support farmers and strengthen rural communities` -> `backing farmers and strengthening rural communities`
*   `We steward the land for future generations` -> `stewarding land for future generations`
*   `We make life more convenient and efficient` -> `making daily life simpler and more reliable`
*   `We protect people and organisations from financial risk` -> `reducing financial risk for people and organisations`
*   `We provide welcoming spaces and experiences for travellers` -> `creating welcoming places and experiences for travellers`
*   `We provide value through our professional services and products` -> `crafting services and products that genuinely help`
*   `We foster cultural expression and creativity` -> `making space for culture, expression and creativity`
*   `We preserve and share cultural heritage` -> `preserving and sharing cultural heritage`
*   `We inform the public with accurate, independent reporting` -> `informing the public through accurate, independent reporting`
*   `We provide a safe, nurturing environment where young children can learn and grow` -> `creating a safe, nurturing place where young children learn and grow`
*   `We prepare students for their future and help them reach their potential` -> `preparing students for the future and helping them reach potential`
*   `We advance knowledge through research and prepare leaders for tomorrow` -> `advancing knowledge through research and preparing leaders for tomorrow`
*   `We make useful products that improve people's lives` -> `making useful products that improve everyday life`
*   `We create safe, durable structures and infrastructure that serve communities` -> `building safe, durable structures and infrastructure that serve communities`
*   `We provide timber resources responsibly to meet society's needs` -> `providing timber responsibly to meet society's needs`
*   `We address community needs and social challenges` -> `meeting community needs and facing social challenges`
*   `We advocate for positive change and social justice` -> `standing up for positive change and social justice`
*   `We protect the environment and fight climate change` -> `protecting the living world and confronting climate change`
*   `We connect communities with safe and accessible transport` -> `connecting communities through safe, accessible transport`
*   `We heal, prevent illness, and restore health` -> `healing, preventing illness and restoring health`
*   `We serve the public interest and common good` -> `serving the public interest and common good`
*   `We protect and share our natural heritage for current and future generations` -> `protecting and sharing natural heritage for current and future generations`
*   `We represent citizens and shape public policy for the common good` -> `representing citizens and shaping public policy for the common good`
*   `We govern local communities and provide municipal services` -> `governing local communities and providing municipal services`
*   `We promote international cooperation and diplomacy` -> `building international cooperation and diplomacy`

### 2. `source\scenes\13_qol_intro.scene.dry`
*   **Analysis:** This is an introductory scene. No variables related to the holistic context are set here. No changes required.

### 3. `source\scenes\14_qol_economic_wellbeing.scene.dry`
**Variable:** `qol-economic` ("We want...")
**Grammar:** Noun phrase, lower-case.

*   `Nutritious food, clean water...` -> `nourishing food, clean water, warm clothing, safe shelter, good health and security`
*   `Reliable food, clean water...` -> `reliable food, clean water, safe shelter, good health, security and the capacity to help others`
*   `A comfortable home, secure health care...` -> `a comfortable home, secure health care and steady access to food, water, clothing and safety`
*   `Resources for good health and security...` -> `resources for good health and security, with reliable food, clean water, clothing and shelter`
*   `Resources for food, clean water... plus travel...` -> `resources for food, clean water, health and security, plus travel and lived experience`

**Variable:** `qol-balance` ("...in balanced lives with...")
**Grammar:** Noun phrase, lower-case.

*   `Good health, good education, and time...` -> `good health, education and time for family, friends and community`
*   `A balanced life with leisure...` -> `room for rest, meaningful leisure and time for family and friends`
*   `Quality time with family and friends...` -> `quality time with family and friends, plus learning and space for culture and leisure`
*   `Cultural and artistic pursuits...` -> `cultural and artistic pursuits, supported by learning and time for family and friends`
*   `Community wellbeing...` -> `community wellbeing, with time for family and friends, learning and room for culture`
*   `Member wellbeing...` -> `member wellbeing, with learning, community connection and time for family and leisure`

### 4. `source\scenes\15_qol_relationships.scene.dry`
**Variable:** `qol-relationships` ("Our relationships will be grounded in...")
**Grammar:** Noun phrase (qualities), lower-case.

*   `Harmony, care and enjoying our time together` -> `harmony, care and ease in one another's presence`
*   `Open communication, mutual trust...` -> `open communication, mutual trust and enjoying each other's company`
*   `Effective collaboration, mutual understanding...` -> `good collaboration, mutual understanding and shared laughter`
*   `Remaining calm, supporting each other...` -> `calm support, mutual respect and repair after conflict`

### 5. `source\scenes\16_qol_challenge_growth.scene.dry`
**Variable:** `qol-challenge` ("We thrive on...")
**Grammar:** Noun phrase, lower-case.

*   `Stewardship and offering hope...` -> `stewardship that offers hope to future generations`
*   `Work that keeps us curious...` -> `work that keeps curiosity alive and asks patience and craft`
*   `Cultivating patience and fostering personal development` -> `cultivating patience and growing into deeper capability`
*   `A fearless space for experimentation...` -> `fearless experimentation and learning from nature's wisdom`
*   `Creating clarity and direction...` -> `bringing clarity and direction where none existed before`
*   `The exhilaration of autonomy...` -> `the exhilaration of autonomy, where freedom and responsibility meet in creative flow`

**Variable:** `qol-growth` ("...want to be free to...")
**Grammar:** Verb phrase (base form), lower-case.

*   `Expanding horizons...` -> `expand horizons through learning and discovery`
*   `Preserving and celebrating...` -> `preserve and celebrate shared traditions`
*   `Finding balance and harmony...` -> `find balance and harmony between work, life and nature`
*   `Spiritual or religious beliefs...` -> `practice spiritual or religious beliefs that offer guidance and meaning`
*   `Cultivating inner peace...` -> `cultivate inner peace and emotional resilience`
*   `Free to act with integrity...` -> `act with integrity and according to conviction`
*   `Deepening connection...` -> `deepen connection and trust within community`
*   `Sharing wisdom...` -> `share wisdom and mentor one another`
*   `Evolving our collective purpose...` -> `evolve collective purpose in service of a greater good`
*   `Fostering a culture...` -> `foster a culture of innovation and steady improvement`

### 6. `source\scenes\17_qol_purpose.scene.dry`
**Variable:** `qol-purpose` (Individual/Group) ("We find purpose in...")
**Grammar:** Noun phrase or Gerund phrase, lower-case.

*   `Continuous learning, growth and development` -> `continuous learning, growth and becoming`
*   `Holistic health, vitality and wellbeing` -> `holistic health, vitality and wellbeing`
*   `Creativity, innovation and meaningful expression` -> `creativity, innovation and meaningful expression`
*   `Service, connection and community support` -> `service, connection and community support`
*   `Environmental stewardship and sustainability` -> `stewardship of land and lasting sustainability`
*   `Mutual support, care and solidarity` -> `mutual support, care and solidarity`

### 7. `source\scenes\18_qol_contribution.scene.dry`
**Variable:** `qol-aspiration` ("We seek to be...")
**Grammar:** Noun phrase (identity), lower-case.

*   `A grounded source of strength and stability` -> `a grounded source of strength and stability`
*   `A positive and transformative force for change` -> `a positive and transformative force for change`
*   `A collaborative, supportive and inspiring partner` -> `a collaborative, supportive and inspiring partner`
*   `A balanced, joyful and fulfilled person` -> `a balanced, joyful and fulfilled person`
*   `A curious, lifelong learner and explorer` -> `a curious, lifelong learner and explorer`
*   `A loving, caring and inclusive community` -> `a loving, caring and inclusive community`
*   `A resilient, adaptive and thriving organization` -> `a resilient, adaptive and thriving organisation`
*   `An innovative pioneer exploring new frontiers` -> `an innovative pioneer exploring new frontiers`

**Variable:** `qol-accomplish` ("...want to contribute to...")
**Grammar:** Noun phrase or Gerund phrase, lower-case.

*   `Create lasting positive impact...` -> `creating lasting positive impact for future generations`
*   `Regenerate damaged social and ecological systems` -> `regenerating damaged social and ecological systems`
*   `Empower others to reach their full potential` -> `empowering others to reach their full potential`
*   `Live a life of deep meaning and joy` -> `living a life of deep meaning and quiet joy`
*   `Realize and express my unique potential` -> `realising and expressing unique potential`
*   `Build a resilient, supportive and vibrant community` -> `building a resilient, supportive and vibrant community`
*   `Bridge divides and foster deep understanding` -> `bridging divides and fostering deep understanding`
*   `Solve meaningful problems that truly matter` -> `solving meaningful problems that truly matter`
*   `Lead the way in ethical and responsible innovation` -> `leading the way in ethical and responsible innovation`

### 8. `source\scenes\19_qol_textarea.scene.dry`
*   **Analysis:** This file displays the textarea. The text displayed is constructed from the variables. No changes to answer choices are needed here, but I will verify the summary text matches the template in `answers_promt.md` (which seems to be the case based on the file content).

### 9. `source\scenes\20_frb_people.scene.dry`
**Variable:** `frb-people` ("We will act in ways that are...")
**Grammar:** Adjective phrase, lower-case.

*   `Honest, responsive and respectful` -> `honest, attentive and respectful`
*   `Collaborative, fair and supportive` -> `collaborative, fair and supportive`
*   `Professional, innovative and committed` -> `steady, skilful and committed`
*   `Ethical, responsible and dedicated` -> `ethical, responsible and dedicated`
*   `Empathetic, prepared and transparent` -> `empathetic, prepared and transparent`
*   `Adaptive, proactive and open-minded` -> `adaptive, practical and open-minded`

### 10. `source\scenes\21_frb_environment.scene.dry`
**Variable:** `frb-environment` ("...on a foundation of...")
**Grammar:** Noun phrase, lower-case.

*   `Maximized water and mineral cycles...` -> `renewed water and mineral cycles, thriving community dynamics, resilient energy flow and rich biodiversity`
*   `Healthy, biologically diverse land...` -> `healthy, biologically diverse land with covered soils and clear, perennial streams; strong community dynamics and energy flow through complex webs of life`
*   `Stable, productive surroundings...` -> `stable, productive surroundings with clean water, covered fertile soils, restored water and mineral cycles, and biodiversity that supports resilient community dynamics`
