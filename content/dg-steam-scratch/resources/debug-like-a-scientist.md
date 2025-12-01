---
id: "debug-like-a-scientist"
title: "Debug Like a Scientist"
type: "micro-tutorial"
length: "short"
scratchTags:
  - "debugging"
  - "events"
  - "logic"
relatedSessions:
  - "session-03"
  - "session-07"
summary: "A quick protocol for hunting bugs: observe, predict, isolate, and retest with intention."
steps:
  - title: "Pause and observe"
    description: "Click the green flag and list what you expected vs. what actually happened before touching any code."
  - title: "Isolate one script"
    description: "Right-click → duplicate a sprite or disable one script at a time to see if the bug follows."
  - title: "Add print-style clues"
    description: "Drop `say` blocks or temporary color changes inside loops so you know which blocks are running."
  - title: "Check events and resets"
    description: "Make sure green flag scripts set starting positions/variables and broadcasts match exactly."
  - title: "Retest and log"
    description: "After each tweak, retest and jot one sentence in your debugging log so you can roll back or teach peers."
---
