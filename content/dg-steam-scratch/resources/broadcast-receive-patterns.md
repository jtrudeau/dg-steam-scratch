---
id: "broadcast-receive-patterns"
title: "Broadcast + Receive Patterns"
type: "micro-tutorial"
length: "short"
scratchTags:
  - "broadcast"
  - "events"
  - "coordination"
relatedSessions:
  - "session-03"
  - "session-10"
summary: "Coordinate sprites and scenes using named messages so your story stays in sync."
steps:
  - title: "Name messages clearly"
    description: "Use labels like `start-level`, `win`, `game-over`, or `scene-2` instead of generic names."
  - title: "One source of truth"
    description: "Keep scene changes in one script that broadcasts; other sprites just listen and react."
  - title: "Chain sequences"
    description: "Broadcast from within a listener to trigger the next step (e.g., intro → gameplay → outro)."
  - title: "Handle duplicates"
    description: "If two things fire at once, add small waits (0.2s) or separate messages to avoid clashes."
  - title: "Debug with logs"
    description: "Temporarily `say` the message name inside each listener to verify everyone hears it."
---
