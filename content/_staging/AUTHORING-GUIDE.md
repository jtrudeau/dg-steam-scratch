# DG-STEAM Scratch Hub · Authoring Guide

## Content Structure

All content lives in `content/dg-steam-scratch/`:
- `sessions/` - Session guides
- `resources/` - Micro-tutorials
- `worksheets/` - Printable worksheets
- `teacher-notes/` - Facilitation guides

---

## File Formats

### Markdown (`.md`) - Default
Use for standard content without interactive components.

**Example: `session-03.md`**
```markdown
---
id: session-03
title: "Variables & Score Tracking"
phase: "ideation"
meetingNumber: 3
---

## Learning Objectives

Students will learn to use variables to track game state.
```

### MDX (`.mdx`) - For Scratch Blocks
Use when you need to display Scratch code blocks visually.

**Example: `session-01.mdx`**
````markdown
---
id: session-01
title: "Kickoff Session"
---

## Your First Script

Here's how to make a sprite say hello:

```scratch
when green flag clicked
say [Hello, DG!] for (2) secs
move (10) steps
```

Students should remix this to add their own message!
````

---

## Scratch Code Blocks

### Syntax

Use triple backticks with `scratch` language tag:

````markdown
```scratch
when green flag clicked
say [Hello!] for (2) secs
```
````

### Renders As

Beautiful visual Scratch blocks (SVG), not plain text!

### Block Syntax Guide

**Events:**
```
when green flag clicked
when this sprite clicked
when [space v] key pressed
when backdrop switches to [backdrop1 v]
```

**Motion:**
```
move (10) steps
turn right (15) degrees
go to x: (0) y: (0)
glide (1) secs to x: (0) y: (0)
```

**Looks:**
```
say [Hello!] for (2) secs
think [Hmm...] for (2) secs
switch costume to [costume1 v]
change size by (10)
```

**Control:**
```
wait (1) secs
repeat (10)
  move (10) steps
end
forever
  move (10) steps
end
if <touching [edge v]?> then
  bounce
end
```

**Sensing:**
```
<touching [mouse-pointer v]?>
<key [space v] pressed?>
(answer)
ask [What's your name?] and wait
```

**Operators:**
```
(join [hello ] [world])
((10) + (5))
((score) > (50))
```

**Variables:**
```
set [score v] to (0)
change [score v] by (1)
(score)
```

---

## Frontmatter Fields

### Sessions

**Required:**
```yaml
id: session-01
title: "Session Title"
phase: "onboarding" | "ideation" | "build" | "refine" | "showcase"
meetingNumber: 1
studentObjective: "What students will learn"
teacherGoal: "What teachers should achieve"
scratchFocus: ["Events", "Motion"]
artifacts: ["team charter", "project link"]
```

**Optional:**
```yaml
delivery:
  worksheets: ["team-charter"]
  resources: ["scratch-interface-tour"]
flow:
  - title: "Activity name"
    duration: "15 min"
    description: "What happens"
teacherMoves:
  - "Facilitation tip 1"
  - "Facilitation tip 2"
```

### Resources

**Required:**
```yaml
id: debug-like-a-scientist
title: "Debug Like a Scientist"
type: "micro-tutorial"
length: "5-min" | "10-min" | "15-min"
scratchTags: ["debugging", "testing"]
relatedSessions: ["session-02"]
summary: "Brief description"
```

**Optional:**
```yaml
steps:
  - title: "Step 1"
    description: "What to do"
```

### Worksheets

**Required:**
```yaml
id: team-charter
title: "Team Charter"
audience: "student" | "teacher"
format: "worksheet"
sessionRefs: ["session-01"]
outputs: ["team norms", "role assignments"]
```

---

## Content Guidelines

### Writing Style

- **Direct and active:** "Click the green flag" not "The green flag should be clicked"
- **Student-focused:** Write as if speaking to 6th graders
- **Concrete examples:** Show don't tell
- **Bite-sized chunks:** Keep paragraphs short

### Scratch Block Examples

**✅ Good:**
- Show complete, runnable scripts
- Include comments explaining tricky parts
- Start simple, build complexity
- Use realistic variable/sprite names

**❌ Avoid:**
- Incomplete code snippets
- Overly complex examples for beginners
- Syntax errors (test in Scratch first!)
- Generic names like "sprite1" or "var"

### Session Structure

Recommended flow:
1. **Hook** (2-5 min) - Story spark or challenge
2. **Teach** (10-15 min) - Core concept with demo
3. **Practice** (20-30 min) - Hands-on building
4. **Reflect** (5-10 min) - Share and connect to SDGs

---

## Staging Workflow

### 1. Draft in Staging

Create new files in `content/_staging/`:
```
content/_staging/
├── session-04-DRAFT.mdx
├── resource-loops-DRAFT.md
└── worksheet-sprint-log-v2.md
```

### 2. Checklist Before Production

- [ ] Frontmatter complete and valid
- [ ] Scratch blocks tested in actual Scratch
- [ ] No broken internal links
- [ ] Appropriate reading level (6th grade)
- [ ] Related resources linked
- [ ] Follows style guide

### 3. Move to Production

When ready:
```bash
mv content/_staging/session-04-DRAFT.mdx content/dg-steam-scratch/sessions/session-04.mdx
```

### 4. Test Build

```bash
npm run build:local
# Check http://localhost:8000
```

---

## Common Patterns

### Session with Scratch Examples

```markdown
---
id: session-05
title: "Loops & Repetition"
---

## Understanding Loops

Instead of this:

```scratch
move (10) steps
move (10) steps
move (10) steps
move (10) steps
```

Use this:

```scratch
repeat (4)
  move (10) steps
end
```

**Challenge:** Make your sprite draw a square!
```

### Resource with Steps

```markdown
---
id: variables-101
title: "Variables 101"
type: micro-tutorial
length: 10-min
---

## What Are Variables?

Variables store information your program needs to remember.

### Step 1: Create a Variable

```scratch
set [score v] to (0)
```

### Step 2: Change It

```scratch
when this sprite clicked
change [score v] by (1)
```

### Step 3: Display It

```scratch
say (join [Score: ] (score))
```
```

---

## Troubleshooting

### Scratch Blocks Not Rendering

**Problem:** Blocks show as plain text instead of visual blocks.

**Fix:** Check your syntax:
- Must use triple backticks: ` ```scratch `
- Proper Scratch syntax (test in Scratch first)
- No extra indentation inside code block

### Build Fails on MDX File

**Problem:** `npm run build` fails with React error.

**Current Limitation:** We're using markdown-style Scratch blocks (` ```scratch `) instead of JSX `<ScratchBlock>` components due to Next.js 15 compatibility issues.

**Future:** See Epic 8 for planned JSX component support.

---

## Need Help?

- **Scratch syntax reference:** https://en.scratch-wiki.info/wiki/Blocks
- **Test your blocks:** https://scratch.mit.edu
- **Markdown guide:** https://www.markdownguide.org/cheat-sheet/
- **Project context:** See `apps/dg-steam-scratch/DEPLOYMENT.md`
