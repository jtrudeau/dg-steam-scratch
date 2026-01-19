# DG-STEAM Staging Intake

Use this folder for commit-ready drafts copied from the writing vault. Files here
should already follow the app schema and be ready for final review before moving
into `content/dg-steam-scratch/...`.

## Workflow
1. Draft in the writing vault (ideation space).
2. Copy/export into `_staging/` when ready for review.
3. Review against the checklist below.
4. Move into production folders:
   - `content/dg-steam-scratch/sessions/`
   - `content/dg-steam-scratch/resources/`
   - `content/dg-steam-scratch/worksheets/`
   - `content/dg-steam-scratch/teacher-notes/`

## Checklist
- Frontmatter uses **camelCase** keys.
- File naming matches conventions (session-XX.mdx, variables-101.mdx, etc).
- Scratch blocks use `<ScratchBlock />` (no screenshots for code).
- Video embeds are **links only** (no local assets yet).
- Teacher notes are separate files (no inline teacher content in sessions).

## Frontmatter Templates

Session (MDX):
```yaml
---
id: "session-05"
title: "Session Title"
phase: "build"
meetingNumber: 5
studentObjective: "One clear goal for the student."
teacherGoal: "One clear pedagogical goal."
scratchFocus:
  - "motion"
artifacts:
  - "prototype checkpoint"
delivery:
  worksheets:
    - "sprint-log"
  resources:
    - "variables-101"
---
```

Resource (MDX):
```yaml
---
id: "variables-101"
title: "Variables 101"
type: "micro-tutorial"
length: "short"
scratchTags:
  - "variables"
relatedSessions:
  - "session-07"
summary: "Short explainer on creating, setting, and changing variables."
steps:
  - title: "Create the variable"
    description: "Use the Variables menu and name it."
---
```

Worksheet (MD):
```yaml
---
id: "sprint-log"
title: "Sprint Log"
audience: "student"
format: "printable"
sessionRefs:
  - "session-06"
outputs:
  - "sprint goal"
blocks:
  - type: "section"
    title: "Sprint Goal"
  - type: "paragraph"
    text: ""
---
```

Teacher Notes (MD):
```yaml
---
id: "teacher-note-session-05"
title: "Session 05 · Session Title"
audience: "teacher"
sessionRefs:
  - "session-05"
agenda:
  - block: "Warm-up"
    duration: "5 min"
    notes: "Quick prompt to activate prior knowledge."
misconceptions:
  - "Common confusion to watch for."
assessments:
  - "Evidence to capture."
---
```

## Video Links
Use a simple Markdown link in the session body, for example:
`Video: [Storyboarding in Scratch](https://example.com)`
